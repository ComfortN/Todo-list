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



import initSqlJs from 'sql.js';
import { useState, useEffect } from 'react';

let dbInstance = null;

export const initializeDatabase = async () => {
  if (!dbInstance) {
    const SQL = await initSqlJs({
      locateFile: filename => `https://sql.js.org/dist/${filename}`
    });
    dbInstance = new SQL.Database();
    createTables();
  }
  return dbInstance;
};

const createTables = () => {
  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    );
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      taskName TEXT,
      description TEXT,
      priority TEXT,
      dueDate TEXT,
      userId INTEGER,
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `);
};

export const getDb = () => dbInstance;
