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

export default function ViewSuppliers() {
  const { state, dispatch } = useApp();

  const { suppliers, loading, error } = state;

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
          Loading supplier details....
        </Typography>
      </Box>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    actions.fetchSuppliers(dispatch);
  }, [dispatch]);

  console.log(suppliers);

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
          Suppliers
        </Typography>
        <IconButton
          component="a"
          href="/suppliers/add"
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
      {!loading && !error && suppliers.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">No products found</Typography>
        </Paper>
      )}

      {/* Data Table */}
      {!loading && suppliers.length > 0 && (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'teal.500' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Company Name
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Contact Person Name
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Contact Person Email
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Contact Person Phone
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Credit Available
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Credit Used
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
              {suppliers.map((supplier) => (
                <TableRow key={supplier?._id} hover>
                  <TableCell>{supplier?.company_name}</TableCell>
                  <TableCell>{supplier?.contact_info.name}</TableCell>
                  <TableCell>{supplier?.contact_info.email}</TableCell>
                  <TableCell>{supplier?.contact_info.phone}</TableCell>
                  <TableCell>
                    Kshs. {supplier?.financial.credit_available}
                  </TableCell>
                  <TableCell>Kshs. {supplier?.financial.credit_used}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      href={`/suppliers/edit/${supplier._id}`}
                      color="teal"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        openDeleteModal(supplier._id, supplier.company_name)
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
        message="This will permanently delete the supplier and all related data."
        itemName={deleteModal.name}
      />
    </Box>
  );
}
