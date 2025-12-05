import React, {useEffect, useState} from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { actions } from '../../context/actions.js';

import ProfessionalForm from './purchaseorderForm.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { ArrowBack } from '@mui/icons-material';

export default function PurchaseorderState() {
  const { id } = useParams();
  console.log(typeof id, id);
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const { purchaseOrders, suppliers, products, loading } = state;
  const [purchaseError, setPurchaseError] = useState('');
  console.log(state);

  const isEditMode = !!id;
  const purchaseOrder = isEditMode
    ? purchaseOrders.find((purchaseOrder) => purchaseOrder._id === id)
    : null;
  console.log(purchaseOrder);

  useEffect(() => {
    actions.fetchSuppliers(dispatch);
    actions.fetchProducts(dispatch);
    if(isEditMode) actions.fetchPurchaseorders(dispatch);
  }, [isEditMode, purchaseOrders.length, dispatch]);

  // if still loading
  if (isEditMode && (loading || purchaseOrders.length === 0)) {
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
          Loading purchase order details....
        </Typography>
      </Box>
    );
  }

  // purchaseOrder not found in edit mode
  if (isEditMode && !purchaseOrder) {
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
            <AlertTitle>Purchase order Not Found</AlertTitle>
            Go back
          </Alert>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="teal.500"
              onClick={() => navigate('/purchaseOrders')}
              startIcon={<ArrowBack />}
            >
              Back to Purchaseorders
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
      try {
        await actions.updatePurchaseOrder(dispatch, id, data);
      } catch(err){
        setPurchaseError(err.message);
      }
    } else {
      await actions.createPurchaseOrder(dispatch, data);
    }
  };
  return (
    <ProfessionalForm
      initialData={purchaseOrder}
      onSubmit={handleSubmit}
      fromEdit={!!isEditMode}
      title={isEditMode ? 'Edit Purchase Order' : 'Add Purchase Order'}
      submitLabel={isEditMode ? 'Update Purchase Order' : 'Send Request'}
      suppliers={suppliers}
      products={products}
      PurchaseError
    />
  );
}
