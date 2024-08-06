import initSqlJs from 'sql.js';

let dbInstance = null;

const initDatabase = async () => {
  if (!dbInstance) {
    const SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`
    });

    // Check if there is a saved database in localStorage
    const savedDb = localStorage.getItem('sqlite_db');
    if (savedDb) {
      const uintArray = new Uint8Array(JSON.parse(savedDb));
      dbInstance = new SQL.Database(uintArray);
    } else {
      dbInstance = new SQL.Database();
      createTables(dbInstance);
    }
  }
  return dbInstance;
};


//Saves the current state of the database to localStorage.
const saveDatabase = (db) => {
  const data = db.export();
  const buffer = new Uint8Array(data); //converting the binary data of the database
  localStorage.setItem('sqlite_db', JSON.stringify(Array.from(buffer)));
};



const createTables = (db) => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    );
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      taskName TEXT,
      description TEXT,
      priority TEXT,
      dueDate TEXT,
      FOREIGN KEY(userId) REFERENCES users(id)
    );
  `);
};

const insertUser = (db, user) => {
  const { name, email, password } = user;
  const stmt = db.prepare(`
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
  `);
  stmt.run([name, email, password]);
  const userId = db.exec("SELECT last_insert_rowid() AS id")[0].values[0][0];
  console.log('Inserted User:', { name, email, password, userId });
  stmt.free();
  
  // Save the database
  saveDatabase(db);

  return userId; // Return the user ID
}

const getUser = (db, email) => {
  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  stmt.bind([email]);
  let user = null;
  if (stmt.step()) {
    user = stmt.getAsObject();
    console.log('Retrieved User:', user); // Logging retrieved user
  }
  stmt.free();
  return user;
};


const getUserById = (db, id) => {
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  stmt.bind([id]);
  let user = null;
  if (stmt.step()) {
    user = stmt.getAsObject();
    console.log('Retrieved User:', user);
  }
  stmt.free();
  return user;
};


const getAllUsers = (db) => {
  const stmt = db.prepare("SELECT * FROM users");
  const users = [];
  while (stmt.step()) {
    const user = stmt.getAsObject();
    users.push(user);
  }
  stmt.free();
  return users;
};


const updateUser = async (db, userId, { name, email }) => {

  const query = `
    UPDATE users
    SET name = ?, email = ?
    WHERE id = ?
  `;
  
  await db.run(query, [name, email, userId]);

  // Save the database
  saveDatabase(db);
};



const updateTask = async (db, taskId, updatedTask) => {
  const { taskName, description, priority, dueDate } = updatedTask;
  const query = `
    UPDATE tasks
    SET taskName = ?, description = ?, priority = ?, dueDate = ?
    WHERE id = ?
  `;
  await db.run(query, [taskName, description, priority, dueDate, taskId]);
  
  // Save the database
  saveDatabase(db);
};

// Delete Task
const deleteTask = async (db, taskId) => {
  const query = `DELETE FROM tasks WHERE id = ?`;
  await db.run(query, [taskId]);
  
  // Save the database
  saveDatabase(db);
};

const insertTask = (db, task) => {
  const { userId, taskName, description, priority, dueDate } = task;
  const stmt = db.prepare(`
    INSERT INTO tasks (userId, taskName, description, priority, dueDate)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run([userId, taskName, description, priority, dueDate]);
  console.log('Inserted Task:', { userId, taskName, description, priority, dueDate });
  stmt.free();
  
  // Save the database
  saveDatabase(db);
};

const getTasksByUser = (db, userId) => {
  const stmt = db.prepare("SELECT * FROM tasks WHERE userId = ?");
  stmt.bind([userId]);
  const tasks = [];
  while (stmt.step()) {
    const task = stmt.getAsObject();
    tasks.push(task);
  }
  stmt.free();
  return tasks;
};


const searchTasks = (db, userId, query) => {
  const stmt = db.prepare(`
    SELECT * FROM tasks
    WHERE userId = ? AND taskName LIKE ?
  `);
  stmt.bind([userId, `%${query}%`]);

  const tasks = [];
  while (stmt.step()) {
    const task = stmt.getAsObject();
    tasks.push(task);
  }
  stmt.free();
  return tasks;
};


const logDatabaseContent = (db) => {
  const users = getAllUsers(db);
  console.log('All Users:', users);
  users.forEach(user => {
    const tasks = getTasksByUser(db, user.id);
    console.log(`Tasks for User ${user.id}:`, tasks);
  });
};

export { initDatabase, insertUser, getUser, getUserById, getAllUsers, updateUser, insertTask, updateTask, deleteTask, getTasksByUser,searchTasks, logDatabaseContent };





// import initSqlJs from 'sql.js';
// import { useState, useEffect } from 'react';

// let dbInstance = null;

// export const initializeDatabase = async () => {
//   if (!dbInstance) {
//     const SQL = await initSqlJs({
//       locateFile: filename => `https://sql.js.org/dist/${filename}`
//     });
//     dbInstance = new SQL.Database();
//     createTables();
//   }
//   return dbInstance;
// };

// const createTables = () => {
//   dbInstance.run(`
//     CREATE TABLE IF NOT EXISTS users (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       email TEXT UNIQUE,
//       password TEXT
//     );
//     CREATE TABLE IF NOT EXISTS tasks (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       taskName TEXT,
//       description TEXT,
//       priority TEXT,
//       dueDate TEXT,
//       userId INTEGER,
//       FOREIGN KEY (userId) REFERENCES users(id)
//     );
//   `);
// };

// export const getDb = () => dbInstance;
