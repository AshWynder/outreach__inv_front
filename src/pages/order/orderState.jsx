import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { actions } from '../../context/actions.js';

import ProfessionalForm from './OrderForm.jsx';
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

export default function PurchaseorderState() {
  const { id } = useParams();
  console.log(typeof id, id);
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const { orders, customers, products, loading, error } = state;
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  console.log(state);

  const isEditMode = !!id;
  const order = isEditMode ? orders.find((order) => order._id === id) : null;
  console.log(order);

  useEffect(() => {
    actions.fetchCustomers(dispatch);
    actions.fetchProducts(dispatch);
    actions.fetchSuppliers(dispatch);
    if (isEditMode) actions.orders(dispatch);
  }, [isEditMode, orders.length, dispatch]);

  // if still loading
  if (isEditMode && (loading || orders.length === 0)) {
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
          Loading order details....
        </Typography>
      </Box>
    );
  }

  // purchaseOrder not found in edit mode
  if (isEditMode && !order) {
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
            <AlertTitle>Order Not Found</AlertTitle>
            Go back
          </Alert>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="teal.500"
              onClick={() => navigate('/purchaseOrders')}
              startIcon={<ArrowBack />}
            >
              Back to Orders
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  console.log(state);
  //handlers

  const handleSubmit = async (data) => {
    if (isEditMode) {
      actions.updateOrder(dispatch, id, data);
    } else {
      actions.createOrder(dispatch, data);

      if (!error) {
        // Show success snackbar
        setSnackbarSeverity('success');
        setSnackbarMessage(
          'Customer order created successfully! Redirecting...'
        );
        setOpenSnackbar(true);

        // Redirect after 4 seconds (snackbar auto-hides at 4s)
        setTimeout(() => {
          navigate('/orders');
        }, 5000);
      } else {
        console.log(error);
        setSnackbarSeverity('error');
        setSnackbarMessage(`Failed: ${error}`);
        setOpenSnackbar(true);
      }
    }
  };
  return (
    <>
      <ProfessionalForm
        initialData={order}
        onSubmit={handleSubmit}
        fromEdit={!!isEditMode}
        title={isEditMode ? 'Edit Customer Order' : 'Add Customer Order'}
        submitLabel={isEditMode ? 'Update Customer Order' : 'Process order'}
        products={products}
        customers={customers}
        error
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000} // 4 seconds
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Bottom-right corner
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
