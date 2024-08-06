import './Login.css';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Loader from '../Loader/Loader';
import Alerts from '../Alerts/Alerts';
import { initDatabase, getUser } from '../../Database/Statements'; // Import your SQL.js functions

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [alertVisible, setAlertVisible] = useState(false);
  
  const validate = () => {
    let tempErrors = {};
    tempErrors.email = email ? "" : "Email is required";
    tempErrors.password = password ? "" : "Password is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    if (validate()) {
      try {
        const db = await initDatabase();
        const user = getUser(db, email);

        if (user && user.password === password) {
          localStorage.setItem('token', JSON.stringify({ id: user.id }));
          setAlertMessage('Successfully logged in');
          setAlertType('success');
          setAlertVisible(true);
          navigate('/home');
        } else {
          setAlertMessage('Invalid credentials');
          setAlertType('error');
          setAlertVisible(true);
        }
      } catch (err) {
        setAlertMessage('Login error: ' + err.message);
        setAlertType('error');
        setAlertVisible(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box className="Login">
        <Loader loading={loading} />
        <Alerts
        message={alertMessage}
        severity={alertType}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
      <Box className="leftLogin">
        <Box className="loginImg">
          <img src='./login.png' alt='' />
        </Box>
      </Box>

      <Box className="rightLogin">
        <Typography variant='h4' gutterBottom>Todo List</Typography>
        <Box className="loginForm">
          <form onSubmit={handleSubmit}>
            <Typography variant='h4' gutterBottom>Login</Typography>
            <TextField name='Email' type='email' label='Email' variant='standard' fullWidth margin="normal"
              onChange={(e) => setEmail(e.target.value)} error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              name='password' type='password' label='Password' variant='standard' fullWidth
              margin="normal" onChange={(e) => setPassword(e.target.value)} error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <Button type='submit' variant="contained" fullWidth>
              Login
            </Button>

            <Typography className="signup-link" variant='body2'>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </Typography>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
