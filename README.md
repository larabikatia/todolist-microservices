# ✅ TodoList Microservices

A Todo-List application based on microservices architecture, developed with Spring Boot and deployable on Docker and Kubernetes.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation and Configuration](#installation-and-configuration)
- [Running the Application](#running-the-application)
  - [With Docker Compose](#with-docker-compose)
  - [With Kubernetes](#with-kubernetes)
- [API Description](#api-description)
- [Security](#security)
- [Authors](#authors)
- [License](#license)

## 🌐 Overview

This project is a task management application (Todo-List) based on a microservices architecture. It allows users to create, organize, and track their tasks in different lists. The application is designed to be scalable, resilient, and easily deployable in a cloud environment.

## 🏗️ Architecture

The application consists of the following microservices:

- **🧑‍💼 User Service**: User management, authentication
- **📝 Task Service**: Individual task management
- **📋 List Service**: Organization of tasks into lists
- **🔍 Eureka Server**: Service discovery
- **🚪 API Gateway**: Single entry point for clients

The overall architecture is represented in the following diagram:

```
                                      ┌───────────────┐
                                      │ 🔍 Eureka     │
                                      └───────┬───────┘
                                              │
                                              │ Discovery
                                              │
┌──────────┐     ┌─────────────┐      ┌──────┴─────┐
│ 🖥️ Client │────▶│ 🚪 Gateway  │◄────▶│ 🧑‍💼 User   │◄────┐
└──────────┘     └──────┬──────┘      └──────┬─────┘      │
                        │                     │            │
                        ▼                     │            │ MySQL
                ┌───────────────┐             │            │
                │ 📝 Task       │◄────────────┘      ┌─────┴──────┐
                └───────┬───────┘                    │ 🗄️ MySQL   │
                        │                            └────────────┘
                        │ MongoDB
                        │
                ┌───────▼───────┐     ┌────────────┐
                │ 📋 List       │◄────│ 🗄️ MySQL   │
                └───────────────┘     └────────────┘
```

## 💻 Technologies Used

- **🔙 Backend**:
  - ☕ Spring Boot 3.2.4
  - ☁️ Spring Cloud (Eureka, Gateway)
  - 🗃️ Spring Data JPA & MongoDB
  - 🔒 Spring Security with JWT
  
- **🔝 Frontend**:
  - ⚛️ React.js
  - 🎨 Bootstrap 5
  
- **🗄️ Databases**:
  - 🍃 MongoDB (for Task Service)
  - 🐬 MySQL (for User Service and List Service)
  
- **🚢 Deployment**:
  - 🐳 Docker & Docker Compose
  - ☸️ Kubernetes
  
- **🔧 Development Tools**:
  - 🔨 Maven
  - 📚 Git
  - 📮 Postman (for API testing)

## 📁 Project Structure

```
todolist-microservices/
├── 🚪 api-gateway/               # API Gateway Service
├── 🔍 eureka-server/             # Discovery Service
├── 🧑‍💼 user-service/              # User Management Service
├── 📝 task-service/              # Task Management Service
├── 📋 list-service/              # List Management Service
├── 🖥️ todo-frontend/             # React Frontend Application
├── ☸️ kubernetes/                # Kubernetes Configuration Files
│   ├── 🔐 security/              # RBAC Configuration
│   └── ...                       # Other K8s Configurations
├── 🐳 docker-compose.yml         # Docker Compose Configuration
└── 📄 README.md                  # This File
```

## ⚙️ Prerequisites

To run this application, you'll need the following tools:

- ☕ JDK 21
- 🔨 Maven 3.9+
- 🐳 Docker and Docker Compose
- ☸️ Kubernetes (optional, for K8s deployment)
- ⚛️ Node.js and npm (for frontend development)

## 📥 Installation and Configuration

1. 📥 Clone the repository:
   ```bash
   git clone https://github.com/username/todolist-microservices.git
   cd todolist-microservices
   ```

2. 🗄️ Create MySQL databases (if running the application locally):
   ```sql
   CREATE DATABASE userdb;
   CREATE DATABASE listdb;
   ```

3. ⚙️ Configure environment variables or modify the `application.properties` files for database connections.

4. 🔨 Build all services:
   ```bash
   mvn clean package -DskipTests
   ```

## 🚀 Running the Application

### 🐳 With Docker Compose

The easiest way to run the entire application is to use Docker Compose:

```bash
docker-compose up -d
```

This command will start:
- 🔍 Eureka Server on port 8761
- 🐬 MySQL on port 3306
- 🍃 MongoDB on port 27017
- 🧑‍💼 User Service on port 8082
- 📝 Task Service on port 8081
- 📋 List Service on port 8083
- 🚪 API Gateway on port 8080
- 🖥️ Frontend on port 80

To stop all services:
```bash
docker-compose down
```

### ☸️ With Kubernetes

1. 📤 Apply Kubernetes configurations:
   ```bash
   kubectl apply -f kubernetes/
   ```

2. 🔐 Configure RBAC rules if necessary:
   ```bash
   kubectl apply -f kubernetes/security/pod-viewer-role.yaml
   kubectl apply -f kubernetes/security/user-pod-viewer-binding.yaml
   ```

3. 👀 Check that all pods are running:
   ```bash
   kubectl get pods
   ```

4. 🔄 Set up port forwarding to access the application:
   ```bash
   kubectl port-forward service/frontend 8000:80
   ```

The application will then be accessible at http://localhost:8000

## 📡 API Description

### 🧑‍💼 User Service

- `POST /api/users/register` - 📝 Register a new user
- `POST /api/users/login` - 🔑 Authentication
- `GET /api/users/{id}` - 👤 Get user information
- `PUT /api/users/{id}` - 🔄 Update a user
- `DELETE /api/users/{id}` - 🗑️ Delete a user

### 📝 Task Service

- `GET /api/tasks` - 📋 List all tasks
- `GET /api/tasks/{id}` - 🔍 Get task details
- `GET /api/tasks/user/{userId}` - 👤 Get user's tasks
- `POST /api/tasks` - ➕ Create a task
- `PUT /api/tasks/{id}` - 🔄 Update a task
- `DELETE /api/tasks/{id}` - 🗑️ Delete a task

### 📋 List Service

- `GET /api/lists` - 📋 List all lists
- `GET /api/lists/{id}` - 🔍 Get list details
- `GET /api/lists/user/{userId}` - 👤 Get user's lists
- `POST /api/lists` - ➕ Create a list
- `PUT /api/lists/{id}` - 🔄 Update a list
- `DELETE /api/lists/{id}` - 🗑️ Delete a list

## 🔒 Security

The application implements several security layers:

1. **🔑 JWT-based Authentication** - JWT tokens are used to authenticate requests between the client and the API Gateway.
2. **👮 RBAC for Kubernetes** - Specific roles and permissions are defined for access to the Kubernetes cluster.
3. **🔐 Secure Communications** - Proper CORS configuration in the API Gateway.
4. **🛡️ Secure Password Storage** - BCrypt hashing for user passwords.

## 👥 Authors

- **👩‍💻 Katia LARABI**
- **👩‍💻 Lyla FRAOUSSEN**
