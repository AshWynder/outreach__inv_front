import React, {useEffect} from 'react';
import {useApp} from '../../context/AppContext.jsx';
import {actions} from '../../context/actions.js';

import ProfessionalForm from './customerForm.jsx';
import {useNavigate, useParams} from 'react-router-dom';
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
import {ArrowBack} from "@mui/icons-material";

export default function CustomerState() {
  const { id } = useParams();
  console.log(typeof id, id)
  const navigate = useNavigate();
  const {state, dispatch} = useApp();
  const {customers, loading} = state;
  console.log(state);

  const isEditMode = !!id;
  const customer = isEditMode ? customers.find((customer) => customer._id === id) : null;
  console.log(customer)

  useEffect(() => {
    if(isEditMode && customers.length === 0) {
      actions.fetchCustomers(dispatch);
    }
  }, [isEditMode, customers.length, dispatch]);

  // if still loading
  if (isEditMode && (loading || customers.length === 0)) {
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
        <CircularProgress size={60} thickness={4} color={'primary'}/>
        <Typography variant={'h6'} color={'text.secondary'}>
          Loading customer details....
        </Typography>
      </Box>
    );
  }

  // customer not found in edit mode
  if (isEditMode && !customer) {
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
          <Alert serverity="error" sx={{mt: 2}}>
            <AlertTitle>Customer Not Found</AlertTitle>
            Go back
          </Alert>
          <Box sx={{mt: 3}}>
            <Button
              variant="contained"
              color="teal.500"
              onClick={() => navigate('/customers')}
              startIcon={<ArrowBack/>}
            >
              Back to Customers
            </Button>
          </Box>
        </Paper>
      </Box>
    )
  }

  //handlers
  const handleSubmit = async (data) => {
    if (isEditMode) {
      await actions.updateCustomer(dispatch, id, data);

    } else {
      await actions.createCustomer(dispatch, data);
    }
    navigate('/customers');
  }
  return (
    <ProfessionalForm
      initialData={customer}
      onSubmit={handleSubmit}
      fromEdit={!!isEditMode}
      title={isEditMode ? "Edit Customer" : 'Add Customer'}
      submitLabel={isEditMode ? "Update Customer" : "Create Customer"}
    />
  );
}
