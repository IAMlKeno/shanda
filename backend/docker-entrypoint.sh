#!/bin/bash

if $ENV eq 'true' then
  
fi

cd /app
npm install
npm run build && npm run start:debug
