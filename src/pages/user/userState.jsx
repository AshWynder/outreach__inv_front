import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { actions } from '../../context/actions.js';
import AdminUserForm from './userForm.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { ArrowBack } from '@mui/icons-material';

export default function UserState() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const { users, loading, error } = state;
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const isEditMode = !!id;
  const user = isEditMode ? users.find((user) => user._id === id) : null;

  useEffect(() => {
    if (isEditMode) {
      actions.fetchUsers(dispatch);
    }
  }, [isEditMode, dispatch]);

  // If still loading
  if (isEditMode && (loading || users.length === 0)) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: 3,
        }}
      >
        <CircularProgress size={60} thickness={4} color={'primary'} />
        <Typography variant={'h6'} color={'text.secondary'}>
          Loading user details...
        </Typography>
      </Box>
    );
  }

  // User not found in edit mode
  if (isEditMode && !user) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: 'center',
            maxWidth: 500,
          }}
        >
          <ErrorIcon
            sx={{
              fontSize: 80,
              color: 'error.main',
              mb: 3,
            }}
          />
          <Alert severity="error" sx={{ mt: 2 }}>
            <AlertTitle>User Not Found</AlertTitle>
            The user you're looking for doesn't exist or has been deleted.
          </Alert>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              onClick={() => navigate('/users')}
              startIcon={<ArrowBack />}
            >
              Back to Users
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  // Handlers
  const handleSubmit = async (data) => {
    try {
      if (isEditMode) {
        await actions.updateUser(dispatch, id, data);
        setSnackbarSeverity('success');
        setSnackbarMessage('User updated successfully! Redirecting...');
        setOpenSnackbar(true);

        setTimeout(() => {
          navigate('/users');
        }, 2000);
      } else {
        await actions.createUser(dispatch, data);

        if (!error) {
          setSnackbarSeverity('success');
          setSnackbarMessage('User created successfully! Redirecting...');
          setOpenSnackbar(true);

          setTimeout(() => {
            navigate('/users');
          }, 2000);
        } else {
          setSnackbarSeverity('error');
          setSnackbarMessage(`Failed: ${error}`);
          setOpenSnackbar(true);
        }
      }
    } catch (err) {
      setSnackbarSeverity('error');
      setSnackbarMessage(
        err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} user`
      );
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <AdminUserForm
        initialData={user}
        onSubmit={handleSubmit}
        fromEdit={!!isEditMode}
        title={isEditMode ? 'Edit User' : 'Create New User'}
        submitLabel={isEditMode ? 'Update User' : 'Create User'}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ zIndex: 9999 }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{
            width: '100%',
            fontWeight: 'bold',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}