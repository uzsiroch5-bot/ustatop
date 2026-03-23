# UstaTop Backend

Complete backend for the UstaTop platform, built with Node.js, Express, MongoDB, and Socket.io.

## Features

- **Authentication**: JWT-based login and registration with client/worker roles.
- **Service Management**: Workers can create and manage their services.
- **Order System**: Clients can request services, and workers can accept or reject them.
- **Real-time Chat**: Bi-directional communication between clients and workers via Socket.io.
- **Profile Settings**: Users can update their personal information and notification settings.
- **Security**: Password hashing, protected routes, and centralized error handling.

## Tech Stack

- **Node.js** & **Express.js**
- **MongoDB** (Mongoose)
- **JWT** (JSON Web Tokens)
- **Socket.io**
- **Bcryptjs**

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your environment variables in `.env`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

## Running the Server

- **Development mode** (with nodemon):
  ```bash
  npm run dev
  ```

- **Production mode**:
  ```bash
  npm start
  ```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token

### Services
- `GET /api/services` - Get all services (filterable by category)
- `POST /api/services` - Create a service (Worker only)
- `GET /api/services/:id` - Get service details

### Orders
- `POST /api/orders` - Send order request (Client only)
- `GET /api/orders/my` - Get current user's orders
- `PUT /api/orders/:id` - Update order status (Worker only)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
