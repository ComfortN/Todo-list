import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import Loader from '../Loader/Loader';

export default function Logout() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // setLoading(true);
    setTimeout(() => {
      localStorage.removeItem('token');
      navigate('/');
      setLoading(false);
    }, 2000); // Simulate a logout delay
  };

  return (
    <>
      <Loader loading={loading} />
      <Button onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}
