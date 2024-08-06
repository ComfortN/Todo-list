// import './Signup.css';
// import { TextField, Button, Box, Typography } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import React, { useState } from 'react';
// import Loader from '../Loader/Loader';
// import Alerts from '../Alerts/Alerts';
// import { initDatabase, insertUser, getUser } from '../../Database/Statements'; // Import your SQL.js functions

// export default function SignUp() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//   const [alertType, setAlertType] = useState('success');
//   const [alertVisible, setAlertVisible] = useState(false);
  
//   const navigate = useNavigate();

//   const validate = () => {
//     let tempErrors = {};
//     tempErrors.name = name ? "" : "Name is required";
//     tempErrors.email = email ? "" : "Email is required";
//     tempErrors.password = password ? "" : "Password is required";
//     tempErrors.confirmPassword = confirmPassword ? "" : "Confirm Password is required";
//     tempErrors.passwordMatch = password === confirmPassword ? "" : "Passwords do not match";
//     setErrors(tempErrors);
//     return Object.values(tempErrors).every(x => x === "");
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (password !== confirmPassword) {
//       setAlertMessage('Passwords do not match');
//       setAlertType('error');
//       setAlertVisible(true);
//         return;
//       }
//       setLoading(true);

//     if (validate()) {
//       try {
//         const db = await initDatabase();
//         const existingUser = getUser(db, email);

//         if (existingUser) {
//           setAlertMessage('User already exists');
//           setAlertType('error');
//           setAlertVisible(true);
//           setLoading(false);
//           return;
//         }

//         const userId = insertUser(db, { name, email, password });
//         localStorage.setItem('token', JSON.stringify({ id: userId }));
//         setAlertMessage('Successfully Signed Up');
//         setAlertType('success');
//         setAlertVisible(true);
//         setTimeout(() => navigate('/'), 2000);
//       } catch (err) {
//         setAlertMessage('Signup error: ' + err.message);
//         setAlertType('error');
//         setAlertVisible(true);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <Box className="SignUp">
//         <Loader loading={loading} />
//         <Alerts
//         message={alertMessage}
//         severity={alertType}
//         visible={alertVisible}
//         onClose={() => setAlertVisible(false)}
//       />
//       <Box className="leftSignUp">
//         <Box className="signUpImg">
//           <img src='./signup.png' alt='' />
//         </Box>
//       </Box>

//       <Box className="rightSignUp">
//         <Typography variant='h4' gutterBottom>Todo List</Typography>
//         <Box className="signUpForm">
//           <form onSubmit={handleSubmit}>
//             <Typography variant='h4' gutterBottom>Sign up</Typography>
//             <TextField
//               name='name' type='text' label='Name' variant='standard' fullWidth
//               margin="normal" onChange={(e) => setName(e.target.value)}
//               error={Boolean(errors.name)} helperText={errors.name}
//             />
//             <TextField
//               name='Email' type='email' label='Email' variant='standard' fullWidth
//               margin="normal" onChange={(e) => setEmail(e.target.value)}
//               error={Boolean(errors.email)} helperText={errors.email}
//             />
//             <TextField
//               name='password' type='password' label='Password'variant='standard' fullWidth
//               margin="normal" onChange={(e) => setPassword(e.target.value)}
//               error={Boolean(errors.password)} helperText={errors.password}
//             />
//             <TextField
//               name='confirmPassword' type='password' label='Confirm Password' variant='standard'
//               fullWidth margin="normal" onChange={(e) => setConfirmPassword(e.target.value)}
//               error={Boolean(errors.confirmPassword)} helperText={errors.passwordMatch || errors.confirmPassword}
//             />
//             <Button type='submit' variant="contained" fullWidth>
//               Sign Up
//             </Button>

//             <Typography className="login-link" variant='body2'>
//               Already have an account? <Link to="/">Login</Link>
//             </Typography>
//           </form>
//         </Box>
//       </Box>
//     </Box>
//   );
// }









import './Signup.css';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { getDb } from '../../Database/Statements';
import Loader from '../Loader/Loader';
import Alerts from '../Alerts/Alerts';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [alertVisible, setAlertVisible] = useState(false);

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

    if (!validate()) return;

    setLoading(true);

    try {
      const db = getDb();
      const result = db.exec(`SELECT * FROM users WHERE email = '${email}'`);
      if (result[0]) {
        setAlertMessage('User already exists');
        setAlertType('error');
        setAlertVisible(true);
        setLoading(false);
        return;
      }

      db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, password]);
      const userId = db.exec(`SELECT id FROM users WHERE email = '${email}'`)[0].values[0][0];
      localStorage.setItem('token', JSON.stringify({ id: userId }));
      setAlertMessage('Successfully Signed Up');
      setAlertType('success');
      setAlertVisible(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setAlertMessage('Signup error: ' + err.message);
      setAlertType('error');
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="SignUp">
      <Loader loading={loading} />
      <Alerts
        message={alertMessage}
        severity={alertType}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
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
