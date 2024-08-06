# Todo List Application


## Description

This is a simple Todo List application built using React for the frontend. It uses sql.js for database management. It allows users to create, edit, delete, and search for tasks. Users can sign up, log in, and their tasks are saved in the database and persist across sessions.

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
* Sql.js
* Day.js



## Installation

1. Clone the repository:

```
    git clone https://github.com/ComfortN/todo-list.git
    cd todo-list
```

2. Install dependencies:

```
    npm install
```

3. Set up the database:

```
    npm install sql.js
    
```


4. Start the frontend:

```
    npm start
```


## Usage

### User Authentication

* Sign up for a new account
* Log in with your credentials
* Your userId token will be stored in localStorage for authenticated requests

### Task Management

* Create tasks with a name, description, priority, and due date
* Edit or delete tasks
* Search for tasks by keyword
* Tasks will persist across sessions

### User Profile

* Click the account icon to view and edit your profile details


### Database Functions

* initDatabase: Initializes the database and creates tables if necessary.
* saveDatabase: Saves the current state of the database to local storage.
* insertUser: Inserts a new user into the database.
* getUser: Retrieves a user by email.
* getUserById: Retrieves a user by ID.
* insertTask: Inserts a new task into the database.
* updateTask: Updates an existing task.
* deleteTask: Deletes a task from the database.
* getTasksByUser: Retrieves tasks for a specific user.
* searchTasks: Searches for tasks by name.


## Design Sketch

![Todo list design sketch](https://github.com/user-attachments/assets/f50f3b50-fa2f-44b1-ab8f-b5a807e28219)