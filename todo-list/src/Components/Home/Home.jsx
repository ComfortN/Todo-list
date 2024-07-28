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
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:8888/auth/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserName(response.data.name);
        } catch (error) {
            console.error('Error fetching user name:', error);
        }
    };
    fetchUserName();
}, []);

  return (
    <div>
      
      <Navbar />
      <Typography variant="h4" color="#592E83">
        Welcome, {userName}
      </Typography>

      <TodoForm />
      
    </div>
    
  )
}
