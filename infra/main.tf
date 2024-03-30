terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

#  the AWS Provider
provider "aws" {
  # region = env variable AWS_DEFAULT_REGION
  # access_key = "" env variable AWS_ACCESS_KEY_ID
  # secret_key = "" env variable AWS_SECRET_ACCESS_KEY
}

# Create VPC
resource "aws_vpc" "main_vpc" {
  cidr_block = var.vpc_cidr_block
  tags = {
    "Name" = "Main VPC"
  }
}

# Create Subnet
resource "aws_subnet" "subnet_web" {
  vpc_id            = aws_vpc.main_vpc.id
  cidr_block        = var.web_subnet_cidr
  availability_zone = var.web_subnet_AZ
  tags = {
    "Name" = "web-subnet"
  }
}

# Creating internet_gateway
resource "aws_internet_gateway" "my_web_igw" {
  vpc_id = aws_vpc.main_vpc.id
  tags = {
    "Name" : "my_web_igw"
  }
}

# Configure default route table and adding igw
resource "aws_default_route_table" "main_vpc_default_rt" {
  default_route_table_id = aws_vpc.main_vpc.default_route_table_id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.my_web_igw.id
  }
  tags = {
    "Name" = "my-default-rt"
  }
}

resource "aws_default_security_group" "default_sec_group" {
  vpc_id = aws_vpc.main_vpc.id
  ingress {
    # SSH
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    # HTTP
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    # HTTP
    from_port   = 3001
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    # DATABASE
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    # All outbound traffic
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    "Name" = "Default Security Group"
  }
}

# Configure EC2 Instance
resource "aws_instance" "my_vm" {
  ami                         = "ami-0d7a109bf30624c99"
  instance_type               = "t2.small"
  subnet_id                   = aws_subnet.subnet_web.id
  vpc_security_group_ids      = [aws_default_security_group.default_sec_group.id]
  associate_public_ip_address = true
  key_name                    = "production_ssh_key" # should exists on aws
  user_data                   = file("entry-script.sh")
  tags = {
    "Name" : "My EC2 Instance - Linux"
  }
}

