import './Search.css';
import React, { useState } from 'react';
import { TextField, Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { initDatabase, searchTasks } from '../../Database/Statements';

export default function Search({ setTasks }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  const handleSearch = async () => {
    const user = JSON.parse(localStorage.getItem('token'));

    if (!user) {
      console.error('No user found in localStorage');
      setSearchStatus('No user logged in');
      return;
    }

    console.log('Searching for:', searchQuery, 'with userId:', user.id);

    try {
      
        const database = await initDatabase();
        const filteredTasks = searchTasks(database, user.id, searchQuery);
  
      console.log('Filtered tasks:', filteredTasks);

      // console.log('Search response:', response.data)

      if (filteredTasks.length === 0) {
        console.log('no data')
        setSearchStatus('No results found');
      } else {
        setSearchStatus('');
      }

      setTasks(filteredTasks);
    } catch (error) {
      console.error('Error searching tasks:', error);
      setSearchStatus('Error occurred while searching');
    }
    
  };

  return (
    <Box className="searchBarContainer">
      <Box className="searching">
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
  );
}


