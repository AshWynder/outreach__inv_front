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
import dayjs from 'dayjs';

export default function ViewOrders() {
  const { state, dispatch } = useApp();

  const { orders, products, loading, error } = state;
  const [productMap, setProductMap] = useState({});

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
    await actions.deleteOrder(dispatch, deleteModal.id);
    closeDeleteModal();
  };

  useEffect(() => {
    actions.fetchOrders(dispatch);
    actions.fetchProducts(dispatch)
  }, [dispatch]);

  useEffect(() => {
    const prodMap = {};
    products.forEach((product) => (prodMap[product._id] = product));
    setProductMap(prodMap);
  }, [products]);

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
          Loading order details....
        </Typography>
      </Box>
    );
  }

  console.log(orders, products);

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
          Orders
        </Typography>
        <IconButton
          component="a"
          href="/orders/add"
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
      {!loading && !error && orders.length === 0 && (
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
      )}

      {/* Data Table */}
      {!loading && orders.length > 0 && (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'teal.500' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Order Number
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Order Date
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  items
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Order Total
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
              {orders.map((order) => (
                <TableRow key={order?._id} hover>
                  <TableCell>{order?.order_number}</TableCell>
                  <TableCell>
                    {dayjs(order?.order_date).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {order?.items?.length > 0 ? (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.5,
                        }}
                      >
                        {order.items.map((item, index) => {
                          const productId = item?.productId?.toString();
                          let product = productMap[productId];
                          console.log(product);
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
                    Kshs. {order?.order_total}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() =>
                        openDeleteModal(order?._id, order?.order_number)
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
