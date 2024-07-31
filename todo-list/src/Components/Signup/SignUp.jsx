import './Signup.css';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';


export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = name ? "" : "Name is required";
    tempErrors.email = email ? "" : "Email is required";
    tempErrors.password = password ? "" : "Password is required";
    tempErrors.confirmPassword = confirmPassword ? "" : "Confirm Password is required";
    tempErrors.passwordMatch = password === confirmPassword ? "" : "Passwords do not match";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
        return alert('Passwords do not match');
      }
      setLoading(true);

    if (validate()) {
      try {
        const response = await axios.post('http://localhost:8888/users', { name, email, password, todos: [] });
        localStorage.setItem('token', JSON.stringify({ id: response.data.id }));
        navigate('/home');
      } catch (err) {
        console.log('Signup error: ', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box className="SignUp">
        <Loader loading={loading} />
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
            <TextField
              name='name' type='text' label='Name' variant='standard' fullWidth
              margin="normal" onChange={(e) => setName(e.target.value)}
              error={Boolean(errors.name)} helperText={errors.name}
            />
            <TextField
              name='Email' type='email' label='Email' variant='standard' fullWidth
              margin="normal" onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.email)} helperText={errors.email}
            />
            <TextField
              name='password' type='password' label='Password'variant='standard' fullWidth
              margin="normal" onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.password)} helperText={errors.password}
            />
            <TextField
              name='confirmPassword' type='password' label='Confirm Password' variant='standard'
              fullWidth margin="normal" onChange={(e) => setConfirmPassword(e.target.value)}
              error={Boolean(errors.confirmPassword)} helperText={errors.passwordMatch || errors.confirmPassword}
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
  );
}
