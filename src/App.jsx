import {Route, Routes} from 'react-router-dom';
import './App.css';
import React from 'react';
import Header from './components/header/Header.jsx';
import Box from '@mui/material/Box';
import Sidebar from './components/sidebar/Sidebar.jsx';
import {CssBaseline} from '@mui/material';
import SupplierForm from './pages/supplier/supplierForm.jsx';
import AddCustomer from './pages/customer/AddCustomer.jsx';
import AddOrder from './pages/AddOrder.jsx';
import AddPurchaseOrder from './pages/AddPurchaseOrder.jsx';
import ViewProducts from "./pages/product/ViewProducts.jsx";
import ProductState from "./pages/product/productState.jsx";
import ViewSuppliers from "./pages/supplier/ViewSuppliers.jsx";
import SupplierState from "./pages/supplier/supplierState.jsx";
import ViewCustomers from "./pages/customer/ViewCustomers.jsx";

function App() {
  return (
    <>
      <CssBaseline/>
      <Header/>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Sidebar/>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            overflowY: 'auto',
            bgcolor: '#f5f5f5',
            p: 3,
            justifyContent: 'center',
            minHeight: '100vh'
          }}
        >

          <Routes>
            {/*<Route path='/' element={<Dashboard />} />*/}

            <Route path='/products' element={<ViewProducts />} />
            <Route path="/products/add" element={<ProductState/>}/>
            <Route path="/products/edit/:id" element={<ProductState/>}/>

            <Route path="/suppliers" element={<ViewSuppliers/>}/>
            <Route path="/suppliers/add" element={<SupplierState/>}/>
            <Route path="/suppliers/edit/:id" element={<SupplierState/>}/>

            <Route path='/customers/' element={<ViewCustomers />} />
            <Route path="/customers/add" element={<AddCustomer/>}/>

            {/*<Route path='/orders' element={<ViewOrders />} />*/}
            <Route path="/orders/add" element={<AddOrder/>}/>

            {/*<Route path='/purchase-orders/' element={<ViewPurchaseorders />} />*/}
            <Route
              path="/purchase-orders/add"
              element={<AddPurchaseOrder/>}
            />

            {/*<Route path='/users/add' element={<AddUser/>} />*/}
            {/*<Route path='/users' element={<ViewUsers/>} />*/}
          </Routes>

        </Box>
        {/*<AddProduct/>*/}
        {/*<SupplierForm />*/}
        {/*<AddCustomer />*/}
        {/*<AddOrder />*/}
        {/*<SelectText />*/}
      </Box>
    </>
  );
}

export default App;
