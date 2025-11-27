import React, {useEffect} from 'react';
import {useApp} from '../../context/AppContext.jsx';
import {actions} from '../../context/actions.js';

import ProfessionalForm from './supplierForm.jsx';
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

export default function SupplierState() {
  const { id } = useParams();
  console.log(typeof id, id)
  const navigate = useNavigate();
  const {state, dispatch} = useApp();
  const {suppliers, loading} = state;
  console.log(state);

  const isEditMode = !!id;
  const supplier = isEditMode ? suppliers.find((supplier) => supplier._id === id) : null;
  console.log(supplier)

  useEffect(() => {
    if(isEditMode && suppliers.length === 0) {
      actions.fetchSuppliers(dispatch);
    }
  }, [isEditMode, suppliers.length, dispatch]);

  // if still loading
  if (isEditMode && (loading || suppliers.length === 0)) {
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
          Loading product details....
        </Typography>
      </Box>
    );
  }

  // product not found in edit mode
  if (isEditMode && !suppliers) {
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
            <AlertTitle>Product Not Found</AlertTitle>
            Go back
          </Alert>
          <Box sx={{mt: 3}}>
            <Button
              variant="contained"
              color="teal.500"
              onClick={() => navigate('/suppliers')}
              startIcon={<ArrowBack/>}
            >
              Back to Products
            </Button>
          </Box>
        </Paper>
      </Box>
    )
  }

  //handlers
  const handleSubmit = async (data) => {
    if (isEditMode) {
      await actions.updateProduct(dispatch, id, data);

    } else {
      await actions.createProduct(dispatch, data);
    }
    navigate('/suppliers');
  }
  return (
    <ProfessionalForm
      initialData={supplier}
      onSubmit={handleSubmit}
      fromEdit={!!isEditMode}
      title={isEditMode ? "Edit Supplier" : 'Add Supplier'}
      submitLabel={isEditMode ? "Update Supplier" : "Create Supplier"}
    />
  );
}
