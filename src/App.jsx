import { Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import OrderState from './pages/order/orderState.jsx';
import ViewOrders from './pages/order/ViewOrders.jsx';
import ViewProducts from './pages/product/ViewProducts.jsx';
import ProductState from './pages/product/productState.jsx';
import ViewSuppliers from './pages/supplier/ViewSuppliers.jsx';
import SupplierState from './pages/supplier/supplierState.jsx';
import ViewCustomers from './pages/customer/ViewCustomers.jsx';
import CustomerState from './pages/customer/customerState.jsx';
import PurchaseorderState from './pages/purchaseOrder/purchaseOrderState.jsx';
import ViewPurchaseorders from './pages/purchaseOrder/ViewPurchaseorders.jsx';
import ViewUsers from './pages/user/userState.jsx';
import Dashboard from './components/Dashboard.jsx';
import SignUp from './pages/SignUp.jsx';
import Layout from './components/Layout.jsx';
import { CssBaseline } from '@mui/material';
import AuthLayout from './components/AuthLayout.jsx';
import LoginPage from "./pages/login.jsx";
import Logout from './pages/logout.jsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />

        <Route path="/products" element={<ViewProducts />} />
        <Route path="/products/add" element={<ProductState />} />
        <Route path="/products/edit/:id" element={<ProductState />} />

        <Route path="/suppliers" element={<ViewSuppliers />} />
        <Route path="/suppliers/add" element={<SupplierState />} />
        <Route path="/suppliers/edit/:id" element={<SupplierState />} />

        <Route path="/customers/" element={<ViewCustomers />} />
        <Route path="/customers/add" element={<CustomerState />} />
        <Route path="/customers/edit/:id" element={<CustomerState />} />

        <Route path='/orders' element={<ViewOrders />} />
        <Route path="/orders/add" element={<OrderState />} />

        <Route path="/purchase-orders/" element={<ViewPurchaseorders />} />
        <Route path="/purchase-orders/add" element={<PurchaseorderState />} />
        <Route
          path="/purchase-orders/edit/:id"
          element={<PurchaseorderState />}
        />
        {/*<Route path='/users/add' element={<userState/>} />*/}
        <Route path='/users/add' element={<ViewUsers/>} />
        <Route path='/logout' element={<Logout/>} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
