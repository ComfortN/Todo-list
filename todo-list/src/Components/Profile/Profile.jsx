import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { initDatabase, getUserById, updateUser } from '../../Database/Statements'; // Update the path accordingly


export default function Profile({ open, onClose }) {
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch user data when the modal opens
    if (open) {
      const fetchUser = async () => {
        const user = JSON.parse(localStorage.getItem('token'));
        if (user) {
          try {
            const database = await initDatabase();
            const userData = getUserById(database, user.id);
            setUser(userData);
            setName(userData.name);
            setEmail(userData.email);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      };
      fetchUser();
    }
  }, [open]);

  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem('token'));
    try {
      const database = await initDatabase();
      updateUser(database, user.id, { name, email })
      // Update local storage with new user data
      localStorage.setItem('token', JSON.stringify({ ...user, name, email }));
      onClose();
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modalContainer">
        <Typography variant="h6" gutterBottom>Profile</Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" className="saveButton" fullWidth onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Modal>
  );
}
