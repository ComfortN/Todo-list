# Todo List Application


## Description

This is a simple Todo List application built using React for the frontend and json-server for simulating a REST API backend. It allows users to create, edit, delete, and search for tasks. Users can sign up, log in, and their tasks are saved in a mock database provided by json-server and persist across sessions.

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


* React
* Material-UI
* Axios
* Day.js
* Json Server


## Installation

1. Clone the repository:

```
    git clone https://github.com/yourusername/todo-app.git
    cd todo-app
```

2. Checkout to using_json_server:

```
    git checkout using_json_server
```

2. Install dependencies:

```
    npm install
```

3. Start the json server:

```
    npm run json-server
```

4. Start the app:

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


## Design Sketch

![Todo list design sketch](https://github.com/user-attachments/assets/f50f3b50-fa2f-44b1-ab8f-b5a807e28219)
