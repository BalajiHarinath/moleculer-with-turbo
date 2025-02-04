# Moleculer with Turbo

This repository is a Turborepo-based monorepo that houses microservices built with Moleculer.js. The architecture consists of two services, user-service and email-service, running on separate Moleculer nodes. Shared functionalities such as error handling, common types, and configurations are modularized in a packages directory for reuse across services.

## Project Structure

 turbo-moleculer/
 |-- apps/
 |   |-- user-service/        # Handles user-related operations
 |   |-- email-service/       # Manages email-related tasks
 |
 |-- packages/
 |   |-- common-types/        # Shared TypeScript types
 |   |-- error-handler/       # Centralized error-handling logic
 |   |-- typescript-config/   # Shared TypeScript configurations
 |
 |-- turbo.json               # Turborepo configuration
 |-- docker-compose.yml       # Docker setup for services
 |-- README.md                # Project documentation

## Services

### User Service(apps/user-service)
Function: Handles user creation.
Endpoint: Accessible via API routes exposed by Moleculer.
Action: addUser
Event: userCreated (triggered after user creation)
Docker Port: 3000.

### Email Service(apps/email-service)
Function: Sends a greeting email after the user is created.
Action: sendGreetingEmail
Triggered By: user-service via event userCreated
Docker Port: 3001.

### Shared Packages

#### Common Types (packages/common-types)
- Contains TypeScript type definitions shared between services.

#### Common Types (packages/common-types)
- Provides a centralized mechanism for handling errors across services.

#### TypeScript Config (packages/typescript-config)
- Centralized TypeScript configuration for consistency across services.

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
npm run dev
```

### Using Docker Compose
```
docker-compose up --build
```

