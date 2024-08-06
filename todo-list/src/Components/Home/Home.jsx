import './Home.css';
import Navbar from '../Navbar/Navbar';
import React, { useState, useEffect } from 'react';
import TodoForm from '../TodoForm/TodoForm';
import { Typography } from '@mui/material';
import { getDb } from '../../Database/Statements';

export default function Home() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const db = getDb();
      const token = JSON.parse(localStorage.getItem('token'));
      if (token && token.id) {
        try {
          const stmt = db.prepare('SELECT name FROM users WHERE id = ?');
          stmt.bind([token.id]);
          if (stmt.step()) {
            const row = stmt.getAsObject();
            setUserName(row.name);
          }
          stmt.free();
        } catch (error) {
          console.error('Error fetching user name:', error);
        }
      } else {
        console.error('No token found in localStorage');
      }
    };
    fetchUserName();
  }, []);

  return (
    <div>
      <Navbar />
      <Typography variant="h4" color="#592E83">
        Hi, {userName}
      </Typography>
      <TodoForm />
    </div>
  );
}
