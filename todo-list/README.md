# Todo List Application


## Description

This is a simple Todo List application built using React for the frontend and Node.js with Express and Knex.js for the backend. It allows users to create, edit, delete, and search for tasks. Users can sign up, log in, and their tasks are saved in the database and persist across sessions.

### Features

* User Authentication (Sign Up, Login, Logout)
* Create, Read, Update, Delete (CRUD) operations for tasks
* Task prioritization (High, Medium, Low)
* Task due dates with calendar picker
* Persistent tasks across sessions
* Search functionality
* User-specific tasks display
* User profile with editable details

## Technologies Used

### Frontend

* React
* Material-UI
* Axios
* Day.js

### Backend

* Node.js
* Express
* Knex.js
* SQLite
* JWT for authentication
* bcrypt for password hashing

## Installation

1. Clone the repository:

```
    git clone https://github.com/yourusername/todo-app.git
    cd todo-app
```

2. Install dependencies:

```
    npm install
```

3. Set up the database:

```
    npx knex migrate:latest
    npx knex seed:run
```

4. Navigate to the client directory and install dependencies:

```
    cd todo-server
    npm install
```

5. Start the backend server:

```
    npm run server/start
```

6. Start the frontend:

```
    npm start
```


## API Endpoints

### Auth

* POST /auth/signup - Register a new user
* POST /auth/login - Log in a user

### Users

* GET /auth/user - Get the authenticated user's details

### Tasks

* GET /todo - Get all tasks for the authenticated user
* POST /todo - Create a new task
* PUT /todo/:id - Update a task
* DELETE /todo/:id - Delete a task

## Usage

### User Authentication

* Sign up for a new account
* Log in with your credentials
* Your JWT token will be stored in localStorage for authenticated requests

### Task Management

* Create tasks with a name, description, priority, and due date
* Edit or delete tasks
* Search for tasks by keyword
* Tasks will persist across sessions

### User Profile

* Click the account icon to view and edit your profile details


## Design Sketch

![Todo list design sketch](https://github.com/user-attachments/assets/f50f3b50-fa2f-44b1-ab8f-b5a807e28219)