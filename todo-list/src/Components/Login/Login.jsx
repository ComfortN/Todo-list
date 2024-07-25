import './Login.css'
import { TextField, Button, Box, Typography } from '@mui/material'
import React from 'react'

export default function Login() {
return (
<Box className="Login">
    <Box className="leftLogin">
    <Box className="loginImg">
        <img src='./login.png' alt='Login' />
    </Box>
    </Box>

    <Box className="rightLogin">
    <Box className="loginForm">
        <form>
        <Typography variant='h4' gutterBottom>Login</Typography>
        <TextField name='Email' type='email' label='Email' variant='standard' fullWidth margin="normal" />
        <TextField name='password' type='password' label='Password' variant='standard' fullWidth margin="normal" />
        <Button type='submit' variant="contained" fullWidth>
            Login
        </Button>
        <Typography className="signup-link" variant='body2'>
            New here? <a href="/signup">Sign Up</a>
        </Typography>
        </form>
    </Box>
    </Box>
</Box>
)
}
