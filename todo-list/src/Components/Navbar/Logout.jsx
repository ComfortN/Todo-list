import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

export default function Logout() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }


  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  )
}
