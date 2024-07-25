import './Signup.css'
import { TextField, Button, Box, Typography} from '@mui/material';


import React from 'react'


export default function SignUp() {
return (
<Box className="SignUp">
    <Box className="leftSignUp">
    <Box className="signUpImg">
        <img src='./signup.png' alt='' />
    </Box>
    </Box>
    
    <Box className="rightSignUp">
    <Box className="signUpForm">
        <form>
        <Typography variant='h4' gutterBottom>Sign up</Typography>
        <TextField name='name' type='text' label='Name' variant='standard' fullWidth margin="normal" />
        <TextField name='Email' type='email' label='Email' variant='standard' fullWidth margin="normal" />
        <TextField name='password' type='password' label='Password' variant='standard' fullWidth margin="normal" />
        <TextField name='confirmPassword' type='password' label='Confirm Password' variant='standard' fullWidth margin="normal" />
        <Button type='submit' variant="contained" fullWidth>
            Sign Up
        </Button>

        <Typography className="login-link" variant='body2'>
            Already have an account? <a href="/login">Login</a>
        </Typography>
        </form>
    </Box>
    </Box>
</Box>
)
}
