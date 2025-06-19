FROM --platform=$BUILDPLATFORM node:22-bookworm-slim

ENV ENV=local
RUN apt-get update && apt-get install procps -y

WORKDIR /app
RUN npm i --unsafe-perm --allow-root -g npm@latest @nestjs/cli@latest typescript

COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT [ "/docker-entrypoint.sh" ]
