FROM --platform=$BUILDPLATFORM node:22-bookworm-slim

# set our node environment, either development or production
# defaults to dev, compose overrides this to development on build and run
ARG VITE_ENV=production
ENV VITE_ENV=$VITE_ENV

# default to port 4200, it can be overwritten in compose file
ARG VITE_PORT=5713
ENV VITE_PORT=$VITE_PORT
EXPOSE $PORT 19001 19002

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
# The expo cli will need to be replaced as its deprecated.
RUN npm i --unsafe-perm --allow-root -g npm@latest typescript

RUN mkdir /app
WORKDIR /app
ENV PATH=/app/.bin:$PATH

COPY package*.json ./

RUN npm install
COPY . .

COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

##++++++++DEBUG+++++++++####
# keeps container running if it is in a bad state
# ENTRYPOINT ["tail"]
# CMD ["-f","/dev/null"]
##++++++++DEBUG+++++++++####

ENTRYPOINT [ "/docker-entrypoint.sh" ]
