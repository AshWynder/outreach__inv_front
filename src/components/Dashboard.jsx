// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
  Avatar
} from '@mui/material';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { teal, red, orange, green, purple, blue } from '@mui/material/colors';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LockIcon from '@mui/icons-material/Lock';
import { actions } from '../context/actions.js';
import { useApp } from '../context/AppContext.jsx';

const COLORS = ['#009688', '#ff7300', '#ff0000', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

export default function InventoryDashboard() {
  const [error, setError] = useState(null);
  const {dispatch, state} = useApp();
  const {stats, loading, currentUser} = state;

  // Role check - only admin and manager can see dashboard
  const canViewDashboard = currentUser?.role === 'admin' || currentUser?.role === 'manager';

  useEffect(() => {
    if (canViewDashboard) {
      actions.fetchProductStats(dispatch);
    }
  }, [dispatch, canViewDashboard]);

  // Show access denied for unauthorized users
  if (!canViewDashboard) {
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
        <LockIcon sx={{ fontSize: 80, color: 'error.main' }} />
        <Typography variant="h5" color="text.secondary">
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You don't have permission to view this page
        </Typography>
      </Box>
    );
  }

  if (loading) return (
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
        Loading....
      </Typography>
    </Box>
  );

  if (error) return <Alert severity="error" sx={{ m: 4 }}>{error}</Alert>;
  if (!stats) return null;

  const { summary, byBrand = [], topValuedItems = [], lowStockItems = [] } = stats;

  const pieData = byBrand.map(item => ({
    name: item._id || 'Unknown',
    value: item.value,
    units: item.units
  }));

  return (
    <Box
      sx={{
        width: '100%',
        p: { xs: 2, md: 4 },
        bgcolor: '#fff',
        minHeight: '100vh',
        borderRadius: '1rem',
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        color="text.secondary"
        sx={{
          mb: 4,
        }}
      >
        Inventory Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid
        container
        spacing={3}
        sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', gap: 2 }}
      >
        <Grid item xs={12} sm={6} md={4} sx={{ width: '23%' }}>
          <Paper sx={{ p: 3, bgcolor: teal[500], color: 'white' }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Total Value
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {summary?.totalValue?.toLocaleString() || 0}
                </Typography>
              </Box>
              <AttachMoneyIcon sx={{ fontSize: 50, opacity: 0.8 }} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ width: '23%' }}>
          <Paper sx={{ p: 3, bgcolor: blue[500], color: 'white' }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Units in Stock
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {summary?.totalUnits || 0}
                </Typography>
              </Box>
              <Inventory2Icon sx={{ fontSize: 50, opacity: 0.8 }} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ width: '23%' }}>
          <Paper
            sx={{
              p: 3,
              bgcolor: summary?.lowStockCount > 0 ? orange[500] : green[600],
              color: 'white',
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Low Stock Items
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {summary?.lowStockCount || 0}
                </Typography>
              </Box>
              <WarningAmberIcon sx={{ fontSize: 50, opacity: 0.8 }} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ width: '23%' }}>
          <Paper
            sx={{
              p: 3,
              bgcolor: summary?.criticalCount > 0 ? red[500] : green[600],
              color: 'white',
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Critically Low
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {summary?.criticalCount || 0}
                </Typography>
              </Box>
              <TrendingUpIcon sx={{ fontSize: 50, opacity: 0.8 }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Bar Chart - Value by Brand */}
        <Grid item xs={12} md={6} sx={{ width: '100%' }}>
          <Paper sx={{ p: 3, height: '70vh' }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ mb: 4 }}
              color="text.secondary"
            >
              Inventory Value by Brand
            </Typography>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={pieData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={90}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tickFormatter={(value) => `Ksh ${value / 1000}k`} />
                  <Tooltip
                    formatter={(value) => `Ksh ${value.toLocaleString()}`}
                    labelStyle={{ color: '#000' }}
                  />
                  <Bar dataKey="value" fill="#8884d8">
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Typography color="text.secondary" align="center" sx={{ mt: 10 }}>
                No brand data available
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', gap: 4}}>
          {/* Top Valued Items */}
          <Grid item xs={12} md={6} sx={{ width: '45%' }}>
            <Paper sx={{ p: 3, height: '103%' }}>
              <Typography variant="h6" gutterBottom>
                Top Valuable Items
              </Typography>
              <TableContainer sx={{ maxHeight: 360 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Product</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Brand</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>Qty</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>Value</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topValuedItems.length > 0 ? (
                      topValuedItems.map((item) => (
                        <TableRow key={item.sku} hover>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.brand || 'N/A'}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell
                            align="right"
                            sx={{ fontWeight: 'bold', color: teal[700] }}
                          >
                            KES {item.totalValue?.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          No data
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Low Stock Alert Table */}
          <Grid item xs={12} sx={{ width: '55%' }}>
            <Paper sx={{ p: 3, height: '103%' }}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <WarningAmberIcon color="error" />
                <Typography variant="h6">
                  Low Stock Alerts (Reorder Needed)
                </Typography>
                <Chip label={lowStockItems.length} color="error" size="small" />
              </Box>

              {lowStockItems.length > 0 ? (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: red[50] }}>
                        <TableCell>
                          <strong>Product</strong>
                        </TableCell>
                        <TableCell>
                          <strong>SKU</strong>
                        </TableCell>
                        <TableCell align="center">
                          <strong>On Hand</strong>
                        </TableCell>
                        <TableCell align="center">
                          <strong>Reorder Level</strong>
                        </TableCell>
                        <TableCell align="center">
                          <strong>Suggested Reorder</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Status</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {lowStockItems.map((item) => (
                        <TableRow
                          key={item.sku}
                          sx={{
                            bgcolor: item.onHand <= 5 ? red[50] : orange[50],
                          }}
                        >
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.sku}</TableCell>
                          <TableCell align="center">
                            <Chip
                              label={item.onHand}
                              color={item.onHand <= 5 ? 'error' : 'warning'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="center">
                            {item.reorderLevel}
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={item.reorderQty || 'N/A'}
                              color="primary"
                              variant="outlined"
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            {item.onHand <= 5 ? (
                              <Chip label="CRITICAL" color="error" size="small" />
                            ) : (
                              <Chip label="Low" color="warning" size="small" />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Alert severity="success">
                  All items are above reorder level
                </Alert>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}