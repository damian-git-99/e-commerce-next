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

![](https://github.com/damian-git-99/e-commerce-next/blob/master/docs/screenshot1.png)
![](https://github.com/damian-git-99/e-commerce-next/blob/master/docs/screenshot2.png)
![](https://github.com/damian-git-99/e-commerce-next/blob/master/docs/screenshot3.png)
![](https://github.com/damian-git-99/e-commerce-next/blob/master/docs/screenshot4.png)
![](https://github.com/damian-git-99/e-commerce-next/blob/master/docs/screenshot5.png)
![](https://github.com/damian-git-99/e-commerce-next/blob/master/docs/screenshot6.png)
