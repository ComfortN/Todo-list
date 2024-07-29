import './Signup.css'
import { TextField, Button, Box, Typography} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom'
import React, {useState} from 'react'
import axios from 'axios';


export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            return alert('Passwords do not match');
        }
        try {
            const response = await axios.post('http://localhost:8888/auth/signup',{name,email, password});
            // console.log(response.data);
            console.log('Successfully Signed-up!')
            localStorage.setItem('token', response.data.token)
            navigate('/');
        } catch (err) {
            console.log('Signup error: ', err.response.data);
        }
    }


return (
<Box className="SignUp">
    <Box className="leftSignUp">
        <Box className="signUpImg">
            <img src='./signup.png' alt='' />
        </Box>
    </Box>
    
    <Box className="rightSignUp">
    <Typography variant='h4' gutterBottom>Todo List</Typography>
        <Box className="signUpForm">
            <form onSubmit={handleSubmit}>
                <Typography variant='h4' gutterBottom>Sign up</Typography>
                <TextField name='name' type='text' label='Name' variant='standard'
                fullWidth margin="normal"
                onChange={(e) => setName(e.target.value)}
                />
                <TextField name='Email' type='email' label='Email' variant='standard'
                fullWidth margin="normal"
                onChange={(e) => setEmail(e.target.value)}
                />
                <TextField name='password' type='password' label='Password' variant='standard'
                fullWidth margin="normal"
                onChange={(e) => setPassword(e.target.value)}
                />
                <TextField name='confirmPassword' type='password' label='Confirm Password' variant='standard'
                fullWidth margin="normal"
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button type='submit' variant="contained" fullWidth>
                    Sign Up
                </Button>

            <Typography className="login-link" variant='body2'>
                Already have an account? <Link to="/">Login</Link>
            </Typography>
            </form>
        </Box>
    </Box>
</Box>
)
}
