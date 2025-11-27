import React, { useEffect } from 'react';
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
  Chip
} from "@mui/material";
import Box from "@mui/material/Box";
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/EditOutlined';
import Delete from '@mui/icons-material/DeleteOutlineOutlined';

export default function ViewProducts() {
  const { state, dispatch } = useApp();

  const { products, loading, error } = state;

  useEffect(() => {
    actions.fetchProducts(dispatch);
  }, [dispatch]);

  console.log(products);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
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
          Products
        </Typography>
        <IconButton
          component="a"
          href="/products/add"
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
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}> {/*my = margin up and bottom*/}
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
      {!loading && !error && products.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center'}}>
          <Typography color="text.secondary">No products found</Typography>
        </Paper>
      )}

      {/* Data Table */}
      {!loading && products.length > 0 && (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'teal.500' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Processor
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  RAM
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Storage
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Buying Price
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Selling Price
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  On Hand
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
              {products.map((product) => (
                <TableRow key={product?._id} hover>
                  <TableCell>{product?.name}</TableCell>
                  <TableCell>{product?.custom_attributes.processor}</TableCell>
                  <TableCell>{product?.custom_attributes.ram}</TableCell>
                  <TableCell>{product?.custom_attributes.storage}</TableCell>
                  <TableCell>Kshs. {product?.pricing.cost_price}</TableCell>
                  <TableCell>Kshs. {product?.pricing.selling_price}</TableCell>
                  <TableCell sx={{textAlign: 'center'}}>{product?.inventory.quantity_on_hand}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      href={`/products/edit/${product._id}`}
                      color="teal"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(product.id)}
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
