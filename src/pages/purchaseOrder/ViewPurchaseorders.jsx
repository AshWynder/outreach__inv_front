import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { actions } from '../../context/actions.js';
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
  Chip, Button, Snackbar,
} from '@mui/material';
import Box from '@mui/material/Box';
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/EditOutlined';
import Delete from '@mui/icons-material/DeleteOutlineOutlined';
import dayjs from 'dayjs';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalShippingIcon from "@mui/icons-material/LocalShipping";


export default function ViewProducts() {
  const { state, dispatch } = useApp();

  const { purchaseOrders, products, suppliers, currentUser, loading, error } = state;

  const [productMap, setProductMap] = useState({});
  const [suppliersMap, setSuppliersMap] = useState({});

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' | 'error' | 'info'

  useEffect(() => {
    actions.fetchPurchaseorders(dispatch);
    actions.fetchProducts(dispatch);
    actions.fetchSuppliers(dispatch);
  }, [dispatch]);


  useEffect(() => {
    const prodMap = {};
    const supMap = {};
    products.forEach((product) => (prodMap[product._id] = product));
    suppliers.forEach((supplier) => (supMap[supplier._id] = supplier));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProductMap(prodMap);
    setSuppliersMap(supMap);
  }, [products, suppliers]);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  }

  const handleDelete = (id) => {
    if (
      window.confirm('Are you sure you want to delete this purchase order?')
    ) {
      actions.deleteProduct(dispatch, id);
    }
  };
  const handleApprove = (id, email) => {
    const date = new Date(Date.now());

    const purchaseOrderData = {
      status: 'approved',
      approved_by: currentUser.id,
      approved_at: date,
      email
    };

    actions.updatePurchaseOrder(dispatch, id, purchaseOrderData);

    console.log(state)

    if(!error) {
      showSnackbar('Purchase Order approved succesfully', 'success');
      setTimeout(() => window.location.reload(), 1200);
    } else {
      showSnackbar(`Failed: ${error}`);
    }
  }

  const handleReceive = (items, id) => {
    console.log(items)
    items.forEach(item => {
      actions.updateProduct(dispatch, item?.productId._id, {
        quantity_on_hand: item?.quantity,
      });
      
      actions.updatePurchaseOrder(dispatch, id, { receiving_status: true, status: 'received' });
      setTimeout(() => window.location.reload(), 3000);
    })

    if(error) {
      showSnackbar(`Failed: ${error}`);
    } else {
      showSnackbar('Products added to inventory successfully', 'success');
    }
  }

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
        <CircularProgress size={60} thickness={4} color={'primary'}/>
        <Typography variant={'h6'} color={'text.secondary'}>
          Loading purchase order details....
        </Typography>
      </Box>
    );
  }

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
          Purchase Orders
        </Typography>
        <IconButton
          component="a"
          href="/purchase-orders/add"
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

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          {' '}
          {/*my = margin up and bottom*/}
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Empty State */}
      {!loading && !error && (purchaseOrders === undefined || purchaseOrders?.length === 0) && (
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
            Loading purchase order details....
          </Typography>
        </Box>
      )}

      {/* Data Table */}
      {!loading && purchaseOrders?.length > 0 && (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'teal.500' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Purchase Order Number
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Delivery Date
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Items
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Quantity
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Creation Date
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Supplier
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Status
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
              {purchaseOrders.map((purchaseOrder) => (
                <TableRow key={purchaseOrder?._id} hover>
                  <TableCell>{purchaseOrder?.po_number}</TableCell>
                  <TableCell>
                    {dayjs(purchaseOrder?.delivery_due_date).format(
                      'DD/MM/YYYY'
                    )}
                  </TableCell>
                  <TableCell>
                    {purchaseOrder?.items?.length > 0 ? (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.5,
                        }}
                      >
                        {purchaseOrder.items.map((item, index) => {
                          const productId = item?.productId?.toString();
                          let product = productMap[productId];
                          if (!product && item?.productId?._id) {
                            product = productMap[item.productId._id];
                          }
                          if (!product && typeof item?.productId === 'object') {
                            product = productMap[item?.productId?.toString()];
                          }

                          return (
                            <Box
                              key={index}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}
                            >
                              <Typography variant="body2" fontWeight="medium">
                                {product ? product.name : 'Uknown Product'}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    ) : (
                      'No items'
                    )}
                  </TableCell>
                  <TableCell>
                    {purchaseOrder?.items?.length > 0 ? (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.5,
                        }}
                      >
                        {purchaseOrder.items.map((item, index) => (
                          <Typography key={index} variant="body2">
                            {item.quantity}
                          </Typography>
                        ))}
                      </Box>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    {dayjs(purchaseOrder?.created_at).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>{purchaseOrder?.supplier?.company_name}</TableCell>
                  <TableCell>
                    {purchaseOrder?.status === 'pending' && (
                      <Chip
                        label="Pending"
                        size="small"
                        sx={{
                          backgroundColor: '#FFF8E1', // light yellow
                          color: '#F57C00', // dark orange text
                          fontWeight: 'bold',
                          '& .MuiChip-icon': { color: '#F57C00' },
                        }}
                      />
                    )}

                    {purchaseOrder?.status === 'approved' && (
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="Approved"
                        size="small"
                        color="success"
                        sx={{ fontWeight: 'bold' }}
                      />
                    )}
                    {purchaseOrder?.status === 'received' && (
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="Received"
                        size="small"
                        color="success"
                        sx={{ fontWeight: 'bold' }}
                      />
                    )}

                    {(purchaseOrder?.status === 'declined' ||
                      purchaseOrder?.status === 'rejected') && (
                      <Chip
                        icon={<CancelIcon />}
                        label="Declined"
                        size="small"
                        color="error"
                        sx={{ fontWeight: 'bold' }}
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                   {/*approve button*/}
                    {['admin', 'manager'].includes(currentUser?.role) && purchaseOrder?.status === 'pending' && (
                      <Button
                        size='small'
                        variant='contained'
                        color='teal.500'
                        startIcon={<CheckCircleIcon />}
                        onClick={() => handleApprove(purchaseOrder?._id, purchaseOrder?.supplier?.contact_info.email)}
                        sx={{
                          width: '110px'
                        }}
                      > Approve </Button>
                    ) }

                    {/*Confirm delivery button*/}
                    {['admin', 'supplychain'].includes(currentUser?.role) && purchaseOrder?.status === 'approved' && purchaseOrder?.receiving_status !== true && (
                      <Button
                        size='small'
                        variant='contained'
                        color='teal.500'
                        startIcon={<CheckCircleIcon />}
                        onClick={() => handleReceive(purchaseOrder?.items, purchaseOrder?._id)}
                        sx={{
                          width: '110px'
                        }}
                      > Receive </Button>
                    )}


                    <IconButton
                      onClick={() => handleDelete(purchaseOrder.id)}
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}  // 4 seconds
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}  // Bottom-right corner
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
    </Box>
  );
}
