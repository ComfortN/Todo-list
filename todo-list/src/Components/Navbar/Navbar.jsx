import './Navbar.css'
import { AppBar, Toolbar, IconButton, Typography,  Box } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import Logout from './Logout';
import Profile from '../Profile/Profile';

import React, {useState} from 'react'

export default function Navbar() {

    const [isProfileOpen, setProfileOpen] = useState(false);
    

    const handleProfileOpen = () => {
        setProfileOpen(true);
    };

    const handleProfileClose = () => {
        setProfileOpen(false);
    };

return (
<AppBar position="static" className="Navbar" sx={{backgroundColor: '#230C33'}}>
    <Toolbar>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Todo List
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={handleProfileOpen}>
        <AccountCircle />
        </IconButton>
        <Logout />
    </Box>
    </Toolbar>
    <Profile open={isProfileOpen} onClose={handleProfileClose} />
</AppBar>
)
}
