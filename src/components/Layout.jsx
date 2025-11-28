import React from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Header from './header/Header.jsx';
import Box from '@mui/material/Box';
import Sidebar from './sidebar/Sidebar.jsx';

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            overflowY: 'auto',
            bgcolor: '#f5f5f5',
            p: 3,
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <Outlet/>
        </Box>
      </Box>
    </>
  );
}
