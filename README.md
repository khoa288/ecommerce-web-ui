# Simple E-Commerce Web UI with ReactJS

This project is for learning purposes only. It is not intended to be used in production. It implements UI for a simple e-commerce application that uses API endpoints from [Simple E-Commerce Web API](https://github.com/khoa288/ecommerce-web-api).

## Getting Started

1. Clone the repository:

```
git clone https://github.com/khoa288/ecommerce-web-ui
```

2. Install dependencies:

```
npm install
```

3. Run the application:

```
npm start
```

Note: The application will run on port 3001 by default and proxy to port 3000 (the port that the backend is running on).

## Features

- Login and register pages
- Handling authentication using JWT and refresh tokens
- Handling time-based OTP for two-factor authentication
- Paginated product list page
- Product detail page
- Cart and checkout page
- Order history page
- Real-time notification using SignalR
- Using Dependency Injection with useContext hook to provide services to components
