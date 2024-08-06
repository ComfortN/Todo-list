import './Home.css'
import Navbar from '../Navbar/Navbar'
import React, {useState, useEffect} from 'react'
import TodoForm from '../TodoForm/TodoForm'
import { Typography } from '@mui/material'
import axios from 'axios'
import { initDatabase, getUserById } from '../../Database/Statements'

export default function Home() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      if (token && token.id) {
        try {
          const db = await initDatabase();
          const user = getUserById(db, token.id);
          if (user) {
            setUserName(user.name);
          } else {
            console.error('User not found');
          }
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
    
  )
}
