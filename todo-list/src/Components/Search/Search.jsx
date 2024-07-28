import './Search.css'
import React, {useState} from 'react'
import { TextField, Box, Button, Typography } from '@mui/material'
import axios from 'axios'


export default function Search({ setTasks }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchStatus, setSearchStatus] = useState('');

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8888/todo/search', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    query: searchQuery
                }
            });

            if (response.data.length === 0) {
            setSearchStatus('No results found');
        } else {
            setSearchStatus('');
        }

        setTasks(response.data);
    } catch (error) {
        console.error('Error searching tasks:', error);
        setSearchStatus('Error occurred while searching');
    }

    };
    return (
    <Box className="searchBarContainer">
        <Box className='searching'>
            <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
    />
    <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
    </Button>
        </Box>

        {searchStatus && (
                <Typography variant="body1" color="error" className="searchStatus">
                    {searchStatus}
                </Typography>
            )}
    
</Box>
    )
}



