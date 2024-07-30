import './Home.css'
import Navbar from '../Navbar/Navbar'
import React, {useState, useEffect} from 'react'
import TodoForm from '../TodoForm/TodoForm'
import { Typography } from '@mui/material'
import axios from 'axios'

export default function Home() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      if (token && token.id) {
        try {
          const response = await axios.get(`http://localhost:8888/users/${token.id}`);
          setUserName(response.data.name);
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
