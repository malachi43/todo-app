# Todo App - Dockerized

This repository provides a Dockerized setup for a **Todo Application** consisting of a frontend and a backend. The application is containerized using **Docker** and orchestrated using **Docker Compose**.

## Project Structure

```
📦 todo-app
├── 📂 todo-backend          # Backend service
│   ├── dev.Dockerfile      # Dockerfile for backend development
│   ├── ...
├── 📂 todo-frontend         # Frontend service
│   ├── dev.Dockerfile      # Dockerfile for frontend development
│   ├── ...
├── docker-compose.dev.yml  # Dev-specific Docker Compose file
├── nginx.dev.conf          # Nginx configuration file
├── start.sh                # Script to build and start the app
└── README.md               # Project documentation
```

## Services Overview
The `docker-compose.dev.yml` file defines multiple services:

- **app (todo-frontend)**: The frontend service, built from the `todo-frontend` directory.
- **server (todo-backend)**: The backend service, built from the `todo-backend` directory.
- **mongo**: A MongoDB instance for database storage.
- **redis-cache**: A Redis instance used for caching.
- **nginx**: The reverse proxy that routes traffic.

## Prerequisites
Ensure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setting Up the Application

### 1. Clone the Repository
```sh
git clone git@github.com:malachi43/todo-app.git
cd todo-app
```

### 2. Build and Start the Services
Use the `start.sh` script to build and run the containers:
```sh
chmod +x start.sh
./start.sh
```
This script will:
- Stop and remove all running containers and volumes.
- Start all services defined in `docker-compose.dev.yml`.

Alternatively, you can manually run:
```sh
docker-compose -f docker-compose.dev.yml down --volumes

docker-compose -f docker-compose.dev.yml up
```

### 3. Verify Running Containers
Check if all containers are running:
```sh
docker ps
```

### 4. Access the Application
- Application (via Nginx): `http://localhost:8080`

## Stopping the Application
To stop all running containers and remove volumes:
```sh
./start.sh stop
```
Alternatively, run:
```sh
docker-compose -f docker-compose.dev.yml down --volumes
```

## Configuration Details

### Docker Compose (`docker-compose.dev.yml`)
```yaml
services:
  app:
    image: todo-frontend-dev
    build:
      context: ./todo-frontend/dev.Dockerfile
    environment:
      - VITE_BACKEND_URL=http://localhost:8080/api/

  server:
    image: todo-backend-dev
    build:
      context: ./todo-backend/dev.Dockerfile
    environment:
      - MONGO_URL=mongodb://the_username:the_password@mongo:27017/the_database
      - REDIS_URL=redis://redis-cache:6379

  mongo:
    image: mongo
    volumes:
      - ./todo-backend/mongo/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
      MONGO_INITDB_DATABASE: the_database

  redis-cache:
    image: redis

  nginx:
    image: nginx:1.20.1
    ports:
      - "8080:80"
    volumes:
      - ./nginx.dev.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - app
      - server
      - mongo
      - redis-cache
```

### `start.sh` (Script to Build and Start Services)
```sh
#!/bin/bash

if [[ $1 == "stop" ]]; then
   docker compose -f docker-compose.dev.yml down --volumes
   exit 0
fi

docker compose -f docker-compose.dev.yml down --volumes
docker compose -f docker-compose.dev.yml up

exit 0
```

## Debugging Tips
- View container logs:
  ```sh
  docker-compose logs -f
  ```
- Restart a specific service:
  ```sh
  docker-compose restart <service-name>
  ```
- Remove all containers and volumes:
  ```sh
  docker-compose down -v
  ```

## Conclusion
This setup provides a fully containerized **Todo App** using **Docker** and **Docker Compose**, ensuring seamless development and deployment. 🚀

For further enhancements, consider adding **Docker volumes** for persistent data storage or optimizing the **Dockerfiles** for production builds.

