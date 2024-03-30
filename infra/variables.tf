variable "vpc_cidr_block" {
  default     = "10.0.0.0/16"
  description = "CIDR Block for aws vpc"
  type        = string
}

variable "web_subnet_cidr" {
  default     = "10.0.10.0/24"
  description = "CIDR Block for aws web subnet"
  type        = string
}

variable "web_subnet_AZ" {
  default     = "us-east-1a"
  description = "AZ for subnet"
  type        = string
}