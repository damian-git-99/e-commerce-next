#!/bin/bash 
sudo yum -y update

sudo yum -y install docker
sudo systemctl start docker
sudo usermod -aG docker ec2-user
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions