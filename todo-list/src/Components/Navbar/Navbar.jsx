import './Navbar.css'
import { AppBar, Toolbar, IconButton, Typography, Button, Box } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

import React from 'react'

export default function Navbar() {
return (
<AppBar position="static" className="Navbar" sx={{backgroundColor: '#230C33'}}>
    <Toolbar>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Todo List
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton>
        <AccountCircle />
        </IconButton>
        <Button>
        Logout
        </Button>
    </Box>
    </Toolbar>
</AppBar>
)
}
