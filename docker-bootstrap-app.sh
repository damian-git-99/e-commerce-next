#!/bin/sh
# Run migrations
DATABASE_URL="$DATABASE_URL" npx prisma migrate deploy
# start app
DATABASE_URL="$DATABASE_URL" node server.js