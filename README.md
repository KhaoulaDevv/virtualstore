# Star Virtual Store

Star Virtual Store is a full-stack e-commerce web application built with an Angular frontend and a Spring Boot backend.

The project includes product browsing, user authentication, cart management, checkout, order history, and an admin dashboard for managing products.

## Features

- Modern responsive storefront
- User registration and login with JWT authentication
- Product catalog with sample seeded products
- Product details page
- Shopping cart
- Checkout flow
- Order history
- Admin dashboard for creating, editing, searching, and deleting products
- Local H2 database for easy development

## Technologies

### Frontend

- Angular
- TypeScript
- Tailwind CSS
- RxJS

### Backend

- Java 17
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- H2 database for local development
- Maven

## Project Structure

```text
virtualstore/
├── Ecommerce-Backend-main/
│   └── Ecommerce-Backend-main/
│       ├── src/
│       ├── pom.xml
│       └── mvnw.cmd
├── ecommerce-frontend-main/
│   └── ecommerce-frontend-main/
│       ├── src/
│       ├── package.json
│       └── angular.json
└── README.md
```

## Run the Backend

Open a terminal:

```powershell
cd Ecommerce-Backend-main\Ecommerce-Backend-main
$env:JAVA_HOME='C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot'
$env:Path="$env:JAVA_HOME\bin;$env:Path"
.\mvnw.cmd spring-boot:run
```

Backend URL:

```text
http://localhost:8080
```

Products API:

```text
http://localhost:8080/api/products
```

## Run the Frontend

Open a second terminal:

```powershell
cd ecommerce-frontend-main\ecommerce-frontend-main
npm.cmd install
npm.cmd start
```

Frontend URL:

```text
http://localhost:4200
```

## Notes

- Keep the backend and frontend terminals running at the same time.
- The local database uses H2 memory storage, so users and orders reset when the backend restarts.
- Sample products are automatically inserted when the backend starts with an empty database.

## Author

Created by Khaoula.
