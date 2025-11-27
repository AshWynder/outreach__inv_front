import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { actions } from '../../context/actions.js';
import DeleteModal from '../../components/DeleteModal.jsx';
import {
  Alert,
  CircularProgress,
  IconButton,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from '@mui/material';
import Box from '@mui/material/Box';
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/EditOutlined';
import Delete from '@mui/icons-material/DeleteOutlineOutlined';

export default function ViewCustomers() {
  const { state, dispatch } = useApp();

  const { customers, loading, error } = state;

  // modal state
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    id: null,
    name: '',
  });

  const openDeleteModal = (id, companyName) => {
    setDeleteModal({ open: true, id: id, name: companyName });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, id: null, name: '' });
  };

  const confirmDelete = async () => {
    await actions.deleteSupplier(dispatch, deleteModal.id);
    closeDeleteModal();
  };

  useEffect(() => {
    actions.fetchCustomers(dispatch);
  }, [dispatch]);

  if (loading) {
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
          Loading customer details....
        </Typography>
      </Box>
    );
  }

  console.log(customers);

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Customers
        </Typography>
        <IconButton
          component="a"
          href="/customers/add"
          color="primary"
          size="large"
          sx={{
            bgcolor: 'teal.500',
            color: 'white',
            '&:hover': { bgcolor: 'teal.600' },
          }}
        >
          <Add />
        </IconButton>
      </Box>

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Empty State */}
      {!loading && !error && customers.length === 0 && (
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
            Loading customer details....
          </Typography>
        </Box>
      )}

      {/* Data Table */}
      {!loading && customers.length > 0 && (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'teal.500' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Full Name
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  ID Number
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  County
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Credit Limit
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Credit Available
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Total Orders
                </TableCell>
                <TableCell
                  sx={{ color: 'white', fontWeight: 'bold' }}
                  align="right"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer?._id} hover>
                  <TableCell>{customer?.company_name}</TableCell>
                  <TableCell>{customer?.contact_info.name}</TableCell>
                  <TableCell>{customer?.contact_info.email}</TableCell>
                  <TableCell>{customer?.contact_info.phone}</TableCell>
                  <TableCell>
                    Kshs. {customer?.financial.credit_available}
                  </TableCell>
                  <TableCell>Kshs. {customer?.financial.credit_used}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      href={`/customers/edit/${customer._id}`}
                      color="teal"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        openDeleteModal(customer._id, customer.company_name)
                      }
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <DeleteModal
        open={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Confirm delete"
        itemName={deleteModal.name}
      />
    </Box>
  );
}
