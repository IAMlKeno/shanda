#!/bin/bash

cd /app
echo "HELLO NESTJS"
npm install
npm run build && npm run start:dev
