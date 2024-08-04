import React from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import './Alerts.css';

export default function Alerts({ message, severity, visible, onClose }) {
    if (!visible) return null;

    return (
     <Stack className="custom-alert" spacing={2}>
      <Alert variant="outlined" severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Stack>
  )
}
