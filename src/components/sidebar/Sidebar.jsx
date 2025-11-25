import React, { useState } from 'react';
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
// Additional icons for nested items (example)
import PaymentIcon from '@mui/icons-material/Payment';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import AddIcon from '@mui/icons-material/Add';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function Sidebar() {
  // 1. State for tracking the 'Purchase Orders' expansion
  const [openPurchase, setOpenPurchase] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [openCustomers, setOpenCustomers] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  const [openAccount, setOpenAccount] = useState(true);
  const [openSuppliers, setOpenSuppliers] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);

  const location = useLocation();

  // 2. Click handler to toggle the state
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
      {/* NOTE: Since MenuList is designed for keyboard navigation popovers,
        it's best practice to replace it with a standard <List> for permanent sidebars.
        However, for minimal change, we'll keep the structure and use <ListItemButton>
        which works well within the standard <List> component.
      */}

      <List component="nav">
        {' '}
        {/* Switched MenuList to List for better compatibility */}
        {/* PRODUCTS (Regular Item) */}
        <ListItemButton
          component={NavLink}
          to="/"
          sx={{
            '&.active': {
              // ← This gives blue background when active
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
        <ListItemButton onClick={handleProductsClick}>
          <ListItemIcon>
            <ScatterPlotIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Products" />
          {/* 4. Conditional icon for expand/collapse */}
          {openProducts ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {/* 5. Collapse component for the nested options */}
        <Collapse in={openProducts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Nested Item 1: Invoices */}
            <ListItemButton
              component={NavLink}
              to="/products/add"
              sx={{
                '&.active': {
                  // ← This gives blue background when active
                  bgcolor: 'teal.500',
                  color: 'white',
                  '& .MuiListItemIcon-root': { color: 'white' },
                  fontWeight: 'medium',
                  pl: 4,
                },
              }}
            >
              {/* pl: 4 = padding left for indentation */}
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Add Product</ListItemText>
            </ListItemButton>

            {/* Nested Item 2: Returns */}
            <ListItemButton
              component={NavLink}
              to="/products/add"
              sx={{
                '&.active': {
                  // ← This gives blue background when active
                  bgcolor: 'teal.500',
                  color: 'white',
                  '& .MuiListItemIcon-root': { color: 'white' },
                  fontWeight: 'medium',
                  pl: 4,
                },
              }}
            >
              <ListItemIcon>
                <FormatListNumberedRtlIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Products</ListItemText>
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        {/* SUPPLIERS (Regular Item) */}
        <ListItemButton onClick={handleSuppliersClick}>
          <ListItemIcon>
            <LocalShippingIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Suppliers" />
          {/* 4. Conditional icon for expand/collapse */}
          {openSuppliers ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {/* 5. Collapse component for the nested options */}
        <Collapse in={openSuppliers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Nested Item 1: Invoices */}
            <ListItemButton sx={{ pl: 4 }}>
              {' '}
              {/* pl: 4 = padding left for indentation */}
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Add Supplier</ListItemText>
            </ListItemButton>

            {/* Nested Item 2: Returns */}
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FormatListNumberedRtlIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Suppliers</ListItemText>
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        <ListItemButton onClick={handleCustomersClick}>
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Customers" />
          {/* 4. Conditional icon for expand/collapse */}
          {openCustomers ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {/* 5. Collapse component for the nested options */}
        <Collapse in={openCustomers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Nested Item 1: Invoices */}
            <ListItemButton sx={{ pl: 4 }}>
              {' '}
              {/* pl: 4 = padding left for indentation */}
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Add Customer</ListItemText>
            </ListItemButton>

            {/* Nested Item 2: Returns */}
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FormatListNumberedRtlIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Customers</ListItemText>
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        {/* ORDERS (Regular Item) */}
        <ListItemButton onClick={handleOrdersClick}>
          <ListItemIcon>
            <BorderColorIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Orders" />
          {/* 4. Conditional icon for expand/collapse */}
          {openOrders ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {/* 5. Collapse component for the nested options */}
        <Collapse in={openOrders} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Nested Item 1: Invoices */}
            <ListItemButton sx={{ pl: 4 }}>
              {' '}
              {/* pl: 4 = padding left for indentation */}
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Add Order</ListItemText>
            </ListItemButton>

            {/* Nested Item 2: Returns */}
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FormatListNumberedRtlIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Orders</ListItemText>
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        {/* ------------------------------------------- */}
        {/* 🌟 EXPANDABLE ITEM: PURCHASE ORDERS 🌟 */}
        {/* ------------------------------------------- */}
        {/* 3. The main list item is now a ListItemButton */}
        <ListItemButton onClick={handlePurchaseClick}>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Purchase Orders" />
          {/* 4. Conditional icon for expand/collapse */}
          {openPurchase ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {/* 5. Collapse component for the nested options */}
        <Collapse in={openPurchase} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Nested Item 1: Invoices */}
            <ListItemButton sx={{ pl: 4 }}>
              {' '}
              {/* pl: 4 = padding left for indentation */}
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Add Purchase Order</ListItemText>
            </ListItemButton>

            {/* Nested Item 2: Returns */}
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FormatListNumberedRtlIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Purchase Orders</ListItemText>
            </ListItemButton>
          </List>
        </Collapse>
        {/* Divider goes after the collapsed block */}
        <Divider />
        {/* USERS (Regular Item) */}
        <ListItemButton onClick={handleUsersClick}>
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Users" />
          {/* 4. Conditional icon for expand/collapse */}
          {openUsers ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {/* 5. Collapse component for the nested options */}
        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Nested Item 1: Invoices */}
            <ListItemButton sx={{ pl: 4 }}>
              {' '}
              {/* pl: 4 = padding left for indentation */}
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Add New User</ListItemText>
            </ListItemButton>

            {/* Nested Item 2: Returns */}
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FormatListNumberedRtlIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View All Users</ListItemText>
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        {/* ACCOUNT (Regular Item) */}
        <ListItemButton onClick={handleAccountsClick}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Account" />
          {/* 4. Conditional icon for expand/collapse */}
          {openAccount ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {/* 5. Collapse component for the nested options */}
        <Collapse in={openAccount} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Nested Item 1: Invoices */}
            <ListItemButton sx={{ pl: 4 }}>
              {' '}
              {/* pl: 4 = padding left for indentation */}
              <ListItemIcon>
                <VisibilityIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Profile</ListItemText>
            </ListItemButton>

            {/* Nested Item 2: Returns */}
            <ListItemButton sx={{ pl: 4 }}>
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
