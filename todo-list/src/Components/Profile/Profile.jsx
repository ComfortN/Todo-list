import React, {useState, useEffect} from 'react'
import './Profile.css'
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

export default function Profile({ open, onClose }) {
    
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    
    useEffect(() => {
        // Fetch user data for the modal opens
        if (open) {
            const fetchUser = async () => {
                const token = localStorage.getItem('token');
                try {
                    const response = await axios.get('http://localhost:8888/auth/user', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                    setName(response.data.name);
                    setEmail(response.data.email);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            fetchUser();
        }
    }, [open]);


    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put('http://localhost:8888/auth/user', { name, email }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onClose();
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
        <Box className="modalContainer">
            <Typography variant="h6" gutterBottom> Profile</Typography>
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
            <Button variant="contained" className="saveButton"  fullWidth onClick={handleSave}>
                Save
            </Button>
        </Box>
    </Modal>
  )
}
