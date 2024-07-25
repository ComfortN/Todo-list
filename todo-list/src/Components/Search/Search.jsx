import './Search.css'
import React, {useState} from 'react'
import { TextField, Box, Button } from '@mui/material'


export default function Search() {

    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = () => {

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
    
</Box>
  )
}



