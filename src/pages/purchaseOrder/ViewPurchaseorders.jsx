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
  Chip,
} from '@mui/material';
import Box from '@mui/material/Box';
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/EditOutlined';
import Delete from '@mui/icons-material/DeleteOutlineOutlined';
import dayjs from 'dayjs';

export default function ViewProducts() {
  const { state, dispatch } = useApp();

  const { purchaseOrders, products, suppliers, loading, error } = state;

  const [productMap, setProductMap] = useState({});
  const [suppliersMap, setSuppliersMap] = useState({});

  useEffect(() => {
    actions.fetchPurchaseorders(dispatch);
    actions.fetchProducts(dispatch);
    actions.fetchSuppliers(dispatch);
  }, [dispatch]);

  console.log(purchaseOrders);

  useEffect(() => {
    const prodMap = {};
    const supMap = {};
    products.forEach((product) => (prodMap[product._id] = product));
    suppliers.forEach((supplier) => (supMap[supplier._id] = supplier));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProductMap(prodMap);
    setSuppliersMap(supMap);
  }, [products, suppliers]);

  console.log(productMap, suppliersMap);

  const handleDelete = (id) => {
    if (
      window.confirm('Are you sure you want to delete this purchase order?')
    ) {
      actions.deleteProduct(dispatch, id);
    }
  };
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
      {!loading && !error && purchaseOrders.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">No products found</Typography>
        </Paper>
      )}

      {/* Data Table */}
      {!loading && purchaseOrders.length > 0 && (
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
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {purchaseOrder.items.map((item, index) => {
                          const product = productMap[item.productId];
                          return (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
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
                  <TableCell>
                    {suppliersMap[purchaseOrder?.supplier]?.company_name ||
                      suppliersMap[purchaseOrder?.supplier]?.name ||
                      'Unknown Supplier'}
                  </TableCell>
                  <TableCell>{purchaseOrder?.status}</TableCell>
                  <TableCell align="center">
                    {/*<IconButton*/}
                    {/*  href={`/purchaseOrders/edit/${purchaseOrder?._id}`}*/}
                    {/*  color="teal"*/}
                    {/*>*/}
                    {/*  <Edit />*/}
                    {/*</IconButton>*/}
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
    </Box>
  );
}
