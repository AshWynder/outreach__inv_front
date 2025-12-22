import React, {useEffect, useState} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Collapse,
  List,
  ListItemButton,
} from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PaymentIcon from '@mui/icons-material/Payment';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import AddIcon from '@mui/icons-material/Add';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';
import {actions} from "../../context/actions.js";
import {useApp} from "../../context/AppContext.jsx";

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const [openPurchase, setOpenPurchase] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [openCustomers, setOpenCustomers] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  const [openAccount, setOpenAccount] = useState(true);
  const [openSuppliers, setOpenSuppliers] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);

  const { notifications, loading, currentUser, error } = state;

  // Role-based access checks
  const userRole = currentUser?.role;
  const isAdmin = userRole === 'admin';
  const isManager = userRole === 'manager';
  const isSupplyChain = userRole === 'supplyChain';
  const isSales = userRole === 'sales';
  const isAccounts = userRole === 'accounts';

  // Permission helpers
  const canSeeProducts = isAdmin || isManager || isSupplyChain || isSales || isAccounts;
  const canSeeSuppliers = isAdmin || isManager || isSupplyChain;
  const canSeePurchaseOrders = isAdmin || isManager || isSupplyChain;
  const canSeeCustomers = isAdmin || isManager || isSales;
  const canSeeOrders = isAdmin || isManager || isSales;
  const canSeeUsers = isAdmin || isManager;
  const canSeeAnalytics = isAdmin || isManager;

  useEffect(() => {
    actions.fetchLoggedInUser(dispatch);
  }, [dispatch]);

  const location = useLocation();

  const handlePurchaseClick = () => {
    setOpenPurchase(!openPurchase);
  };

  const handleProductsClick = () => {
    setOpenProducts(!openProducts);
  };

  const handleCustomersClick = () => {
    setOpenCustomers(!openCustomers);
  };

  const handleOrdersClick = () => {
    setOpenOrders(!openOrders);
  };

  const handleAccountsClick = () => {
    setOpenAccount(!openAccount);
  };

  const handleSuppliersClick = () => {
    setOpenSuppliers(!openSuppliers);
  };

  const handleUsersClick = () => {
    setOpenUsers(!openUsers);
  };

  return (
    <Paper sx={{ width: 350, maxWidth: '100%' }}>
      <List component="nav">
        {/* ANALYTICS - Only Admin & Manager */}
        {canSeeAnalytics && (
          <>
            <ListItemButton
              component={NavLink}
              to="/"
              sx={{
                '&.active': {
                  bgcolor: 'teal.500',
                  color: 'white',
                  '& .MuiListItemIcon-root': { color: 'white' },
                  fontWeight: 'medium',
                },
              }}
            >
              <ListItemIcon>
                <BarChartIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItemButton>
            <Divider />
          </>
        )}

        {/* PRODUCTS - Admin, Manager, Supply Chain, Sales, Accounts */}
        {canSeeProducts && (
          <>
            <ListItemButton onClick={handleProductsClick}>
              <ListItemIcon>
                <ScatterPlotIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Products" />
              {openProducts ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openProducts} timeout="auto" unmountOnExit>
              <List component="div" sx={{ ml: 4 }} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/products/add"
                  sx={{
                    '&.active': {
                      bgcolor: 'teal.500',
                      color: 'white',
                      '& .MuiListItemIcon-root': { color: 'white' },
                      fontWeight: 'medium',
                    },
                  }}
                >
                  <ListItemIcon>
                    <AddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add Product</ListItemText>
                </ListItemButton>

                <ListItemButton
                  component={NavLink}
                  to="/products"
                  sx={{
                    '&.active': {
                      bgcolor: 'teal.500',
                      color: 'white',
                      '& .MuiListItemIcon-root': { color: 'white' },
                      fontWeight: 'medium',
                    },
                  }}
                  end
                >
                  <ListItemIcon>
                    <FormatListNumberedRtlIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>View Products</ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
            <Divider />
          </>
        )}

        {/* SUPPLIERS - Admin, Manager, Supply Chain */}
        {canSeeSuppliers && (
          <>
            <ListItemButton onClick={handleSuppliersClick}>
              <ListItemIcon>
                <LocalShippingIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Suppliers" />
              {openSuppliers ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openSuppliers} timeout="auto" unmountOnExit>
              <List component="div" sx={{ ml: 4 }} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/suppliers/add"
                  sx={{
                    '&.active': {
                      bgcolor: 'teal.500',
                      color: 'white',
                      '& .MuiListItemIcon-root': { color: 'white' },
                      fontWeight: 'medium',
                    },
                  }}
                >
                  <ListItemIcon>
                    <AddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add Supplier</ListItemText>
                </ListItemButton>

                <ListItemButton
                  component={NavLink}
                  to="/suppliers"
                  sx={{
                    '&.active': {
                      bgcolor: 'teal.500',
                      color: 'white',
                      '& .MuiListItemIcon-root': { color: 'white' },
                      fontWeight: 'medium',
                    },
                  }}
                  end
                >
                  <ListItemIcon>
                    <FormatListNumberedRtlIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>View Suppliers</ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
            <Divider />
          </>
        )}

        {/* CUSTOMERS - Admin, Manager, Sales */}
        {canSeeCustomers && (
          <>
            <ListItemButton onClick={handleCustomersClick}>
              <ListItemIcon>
                <GroupIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Customers" />
              {openCustomers ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCustomers} timeout="auto" unmountOnExit>
              <List component="div" sx={{ ml: 4 }} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/customers/add"
                  sx={{
                    '&.active': {
                      bgcolor: 'teal.500',
                      color: 'white',
                      '& .MuiListItemIcon-root': { color: 'white' },
                      fontWeight: 'medium',
                    },
                  }}
                >
                  <ListItemIcon>
                    <AddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add Customer</ListItemText>
                </ListItemButton>

                <ListItemButton
                  component={NavLink}
                  to="/customers"
                  sx={{
                    '&.active': {
                      bgcolor: 'teal.500',
                      color: 'white',
                      '& .MuiListItemIcon-root': { color: 'white' },
                      fontWeight: 'medium',
                    },
                  }}
                  end
                >
                  <ListItemIcon>
                    <FormatListNumberedRtlIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>View Customers</ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
            <Divider />
          </>
        )}

        {/* ORDERS - Admin, Manager, Sales */}
        {canSeeOrders && (
          <>
            <ListItemButton onClick={handleOrdersClick}>
              <ListItemIcon>
                <BorderColorIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Orders" />
              {openOrders ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openOrders} timeout="auto" unmountOnExit>
              <List component="div" sx={{ pl: 4 }} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/orders/add"
                  sx={{
                    '&.active': {
                      bgcolor: 'teal.500',
                      color: 'white',
                      '& .MuiListItemIcon-root': { color: 'white' },
                      fontWeight: 'medium',
                    },
                  }}
                >
                  <ListItemIcon>
                    <AddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add Order</ListItemText>
                </ListItemButton>

                <ListItemButton
                  component={NavLink}
                  to="/orders/"
                  sx={{
                    '&.active': {
                      bgcolor: 'teal.500',
                      color: 'white',
                      '& .MuiListItemIcon-root': { color: 'white' },
                      fontWeight: 'medium',
                    },
                  }}
                >
                  <ListItemIcon>
                    <FormatListNumberedRtlIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>View Orders</ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
            <Divider />
          </>
        )}

        {/* PURCHASE ORDERS - Admin, Manager, Supply Chain */}
        {canSeePurchaseOrders && (
          <>
            <ListItemButton onClick={handlePurchaseClick}>
              <ListItemIcon>
                <ShoppingCartIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Purchase Orders" />
              {openPurchase ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openPurchase} timeout="auto" unmountOnExit>
              <List component="div" sx={{ ml: 4 }} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/purchase-orders/add"
                  sx={{
                    '&.active': {
                      bgcolor: 'teal.500',
                      color: 'white',
                      '& .MuiListItemIcon-root': { color: 'white' },
                      fontWeight: 'medium',
                    },
                  }}
                >
                  <ListItemIcon>
                    <AddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add Purchase Order</ListItemText>
                </ListItemButton>

                <ListItemButton
                  component={NavLink}
                  to="/purchase-orders"
                  sx={{
                    '&.active': {
                      bgcolor: 'teal.500',
                      color: 'white',
                      '& .MuiListItemIcon-root': { color: 'white' },
                      fontWeight: 'medium',
                    },
                  }}
                  end
                >
                  <ListItemIcon>
                    <FormatListNumberedRtlIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>View Purchase Orders</ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
            <Divider />
          </>
        )}

        {/* USERS - Only Admin & Manager */}
        {canSeeUsers && (
          <>
            <ListItemButton onClick={handleUsersClick}>
              <ListItemIcon>
                <GroupIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Users" />
              {openUsers ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openUsers} timeout="auto" unmountOnExit>
              <List component="div" sx={{ ml: 4 }} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/users/add"
                  sx={{
                    '&.active': {
                      bgcolor: 'teal.500',
                      color: 'white',
                      '& .MuiListItemIcon-root': { color: 'white' },
                      fontWeight: 'medium',
                    },
                  }}
                >
                  <ListItemIcon>
                    <AddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add New User</ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
            <Divider />
          </>
        )}

        {/* ACCOUNT - Everyone */}
        <ListItemButton onClick={handleAccountsClick}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Account" />
          {openAccount ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAccount} timeout="auto" unmountOnExit>
          <List component="div" sx={{ ml: 4 }} disablePadding>
            <ListItemButton
              component={NavLink}
              to="/logout"
              sx={{
                '&.active': {
                  bgcolor: 'teal.500',
                  color: 'white',
                  '& .MuiListItemIcon-root': { color: 'white' },
                  fontWeight: 'medium',
                },
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Log out</ListItemText>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Paper>
  );
}