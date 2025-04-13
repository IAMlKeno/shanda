# Shanda

## Description
Docker implementation of the Shanda organization. The current tech stack is:
* Nestjs
* React Native
* Postgresql
* OpenAPI

### Requirements

* Docker compose

### Docker Compose Application

Project structure:
```
.
├── compose.yaml
├── README.md
├── backend
    ├── server.Dockerfile
    ├── docker-entrypoint.sh
    └── ...
├── frontend
    ├── app.Dockerfile
    ├── docker-entrypoint.sh
    └── ...
└── data
```

[_compose.yaml_](compose.yaml)
```yaml
# Networks let services communicate with each other.
# @see https://docs.docker.com/reference/compose-file/networks/
networks:
  shanda-network:
    driver: bridge

# https://docs.docker.com/reference/compose-file/services/
services:
  # Start a react-native server.
  app:
    # Defines the name of the container.
    container_name: shanda_frontend
    # Specifies the build configuration for creating a
    # container image from source.
    # @see https://docs.docker.com/reference/compose-file/build/
    build:
      context: ./frontend
      args:
        - NODE_ENV=development
        - PORT=4200
      dockerfile: app.Dockerfile
    # Define environment variables for the container.
    # @see https://docs.docker.com/reference/compose-file/services/#environment
    environment:
      - NODE_ENV=development
    # The maps container's ports to the host's ports.
    # ex. {host-port}:{container-port}
    # @see https://docs.docker.com/reference/compose-file/services/#ports
    ports:
      - 4200:4200
    # Binds the host's volumes to the containers'
    # ex. {path/to/host/dir}:{/path/to/container/dir}
    # This acts as a way to persist data and allow
    # local development to be easier
    # @see https://docs.docker.com/reference/compose-file/services/#volumes
    volumes:
      - ./frontend:/app
    # Defines the networks that containers are attached to
    # referencing entries under the networks top-level element.
    # @see https://docs.docker.com/reference/compose-file/services/#networks
    networks:
      - shanda-network
  # Start a nestjs server.
  server:
    container_name: shanda_backend
    build:
      context: ./backend
      dockerfile: server.Dockerfile
    ports:
      - 4201:4201
    # Exposes the container's ports to any other
    # containers defined in this compose orchestration.
    # @see https://docs.docker.com/reference/compose-file/services/#expose
    expose:
      - 4201
    volumes:
      - ./backend:/app
    networks:
      - shanda-network
  # Start a postgresql db server.
  db:
    container_name: shanda_db
    image: postgres
    environment:
      POSTGRES_USER: 'shanda'
      POSTGRES_PASSWORD: 'password'
      POSTGRES_DB: 'shanda'
    ports:
      - 5432:5432
    expose:
      - 5432
    restart: unless-stopped
    volumes:
      - ./data/database/data:/var/lib/postgresql/data
    networks:
      - shanda-network
```

## Local Development
### Running the application with docker compose

1. In the root directory, use `docker compose up -d` to run the application. The `-d` flag prompts the services to run in detached mode.

## Expected result

Listing containers must show one container running and the port mapping as below:
```bash

$ docker ps
CONTAINER ID   IMAGE           COMMAND                  CREATED         STATUS         PORTS                                     NAMES
1211d8b6f206   shanda-app      "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   0.0.0.0:4200->4200/tcp, 19001-19002/tcp   shanda_frontend
48bf9ddef24c   postgres        "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:5432->5432/tcp                    shanda_db
e3ab15866cea   shanda-server   "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   0.0.0.0:4201->4201/tcp                    shanda_backend
```

After the application starts, navigate to `http://localhost:4200` in a browser for the frontend or `http://localhost:4201` for the backend.

#### Stop and remove the containers
If the server was run in detached mode:

```
$ docker compose down
[+] Stopping 3/3
 ✔ Container shanda_backend   Stopped                        10.2s
 ✔ Container shanda_frontend  Stopped                        10.3s
 ✔ Container shanda_db        Stopped                         0.1s
```