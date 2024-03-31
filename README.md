# Description

Next 14 E-commerce with integration of Next Auth, Prisma, PayPal, and Cloudinary.

## Run

- Clone the repository.
- Create a copy of `.env.template` and rename it to `.env` then change the environment variables.
  - Add database information
  - Add AUTH_SECRET data
  - Add PayPal data
  - Add Cloudinary data

## Run with Docker

- Run Docker Compose: `docker compose up -d`
- Execute seed: `npm run seed`

## Run manually

- Install dependencies: `npm install`
- Install postgresql
  - Modify DATABASE_URL env
- Run Prisma migrations: ```npx prisma migrate dev````
- Execute seed `npm run seed`
- Run the project: `npm run build` & `npm start`

## Screenshots

![](https://github.com/damian-git-99/e-commerce-next/blob/main/docs/screenshot1.png)
![](https://github.com/damian-git-99/e-commerce-next/blob/main/docs/screenshot2.png)
![](https://github.com/damian-git-99/e-commerce-next/blob/main/docs/screenshot3.png)
![](https://github.com/damian-git-99/e-commerce-next/blob/main/docs/screenshot4.png)
![](https://github.com/damian-git-99/e-commerce-next/blob/main/docs/screenshot5.png)
![](https://github.com/damian-git-99/e-commerce-next/blob/main/docs/screenshot6.png)

## Run infra

#### Configure Env variables for terraform

- `AWS_ACCESS_KEY_ID`
- `AWS_DEFAULT_REGION`
- `AWS_SECRET_ACCESS_KEY`

#### Run Terraform

- `Install terraform`
- `cd infra`
- `terraform apply`

### Generate Pair Keys on AWS

- name: `production_ssh_key`

### Configure Secrets on github actions

- `DOCKER_USER`
- `DOCKER_PASSWORD`
- `HOST_IP`
- `SSH_PRIVATE_KEY`
- `SSH_USERNAME`

### Copy files

- copy docker-compose, prometheus.yml, loki-config.yml y .env
- `scp -i [key.pem] docker-compose.yml  user@host_ip:/home/user`
- `docker-compose up -d --build `

### From here, everything is automated using CI/CD (github actions)

- Generate new versions of the software (docker)
- Upload docker images to a registry
- deploy new versions to the server (EC2)
- Todo: add npx prisma migrate deploy
