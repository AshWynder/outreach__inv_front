import React from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

export default function AuthLayout() {
  return (
    <>
      <CssBaseline />
      <Outlet/>
    </>
  );
}
