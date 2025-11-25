import {Route, Routes} from 'react-router-dom';
import './App.css';
import React from 'react';
import Header from './components/header/Header.jsx';
import Box from '@mui/material/Box';
import Sidebar from './components/sidebar/Sidebar.jsx';
import {CssBaseline} from '@mui/material';
import AddProduct from './pages/AddProduct.jsx';
import AddSupplier from './pages/AddSupplier.jsx';
import AddCustomer from './pages/AddCustomer.jsx';
import AddOrder from './pages/AddOrder.jsx';
import AddPurchaseOrder from './pages/AddPurchaseOrder.jsx';

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
          }}
        >

          <Routes>
            {/*<Route path='/' element={<Dashboard />} />*/}

            {/*<Route path='/products' element={<ViewProducts />} />*/}
            <Route path="/products/add" element={<AddProduct/>}/>

            {/*<Route path='/customers/' element={<ViewCustomers />} />*/}
            <Route path="/customers/add" element={<AddCustomer/>}/>

            {/*<Route path='/orders' element={<ViewOrders />} />*/}
            <Route path="/orders/add" element={<AddOrder/>}/>

            {/*<Route path='/purchase-orders/' element={<ViewPurchaseorders />} />*/}
            <Route
              path="/purchase-orders/add"
              element={<AddPurchaseOrder/>}
            />
          </Routes>

        </Box>
        {/*<AddProduct/>*/}
        {/*<AddSupplier />*/}
        {/*<AddCustomer />*/}
        {/*<AddOrder />*/}
        {/*<SelectText />*/}
      </Box>
    </>
  );
}

export default App;
