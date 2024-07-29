import './Login.css'
import { TextField, Button, Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8888/auth/login',{email, password});
            // console.log(response.data);
            console.log('Successfully logged-in!')
            localStorage.setItem('token', response.data.token);
            navigate('/home');
        } catch (err) {
            console.log('Login error: ', err.response.data);
        }
    };


return (
<Box className="Login">
    <Box className="leftLogin">
        <Box className="loginImg">
            <img src='./login.png' alt='Login' />
        </Box>
    </Box>

    <Box className="rightLogin">
    <Typography variant='h4' gutterBottom>Todo List</Typography>
        <Box className="loginForm">
            <form onSubmit={handleSubmit}>
                <Typography variant='h4' gutterBottom>Login</Typography>
                <TextField name='Email' type='email' label='Email' variant='standard'
                fullWidth margin="normal"
                onChange={(e) => setEmail(e.target.value)} />
                <TextField name='password' type='password' label='Password' variant='standard'
                fullWidth margin="normal"
                onChange={(e) => setPassword(e.target.value)} />
                <Button type='submit' variant="contained" fullWidth>
                    Login
                </Button>
                <Typography className="signup-link" variant='body2'>
                    New here? <Link to="/signup">Sign Up</Link>
                </Typography>
            </form>
        </Box>
    </Box>
</Box>
);
}
