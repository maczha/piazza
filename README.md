# Piazza

Piazza functions just like the real Piazza. Users can create accounts, login, send, update and delete posts.

Follow these instructions to get the app up and running on your local machine.


1. Clone the repository
   ```
   git clone https://github.com/maczha/piazza.git
   cd piazza
   ```

2. Install dependencies
   ```
   npm install
   ```

### Running the App

Start the server:
```
npm start
```
Alternatively, you can use nodemom for a server that refreshed automatically
```
nodemon app.js
```

The server will run on http://localhost:3000

## API Endpoints

### Authentication

- **Register a new user**
  ```
  POST /api/user/register
  Body: name, email, password
  ```

- **Login**
  ```
  POST /api/user/login
  Body: email, password
  ```

### Posts

- **Create a post** (requires authentication)
  ```
  POST /api/posts
  Headers: { "auth-token": <your-auth-token-returned-from-login> }
  Body: title, description
  ```

- **Get all posts**
  ```
  GET /api/posts
  ```

- **Get a specific post**
  ```
  GET /api/posts/:id
  ```


- **Update a post** (only the creator can update)
  ```
  PUT /api/posts/:id
  Headers: { "auth-token": "YOUR_JWT_TOKEN" }
  Body: { "title": "Updated Title", "description": "Updated content" }
  ```
  note that post id is returned when you create a post

- **Delete a post** (only the creator can delete)
  ```
  DELETE /api/posts/:id
  Headers: { "auth-token": "YOUR_JWT_TOKEN" }
  ```

Next, we'll cover this with a nice frontend. For now, please enjoy!
