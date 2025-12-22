import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Typography } from '@mui/material';
import axios from 'axios';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Call logout endpoint
        await axios.post('/api/v1/users/logout');

        // Clear any local storage if you're storing anything
        localStorage.clear();

        // Redirect to login
        navigate('/login');
      } catch (error) {
        console.error('Logout error:', error);
        // Still redirect even if there's an error
        navigate('/login');
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 3,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6">Logging out...</Typography>
    </Box>
  );
}