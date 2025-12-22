import api from './../services/api.js';

const errorHandler = (dispatch, message) => {
  dispatch({type: 'SET_ERROR', payload: message});
};

export const actions = {
  // products
  async fetchProducts(dispatch) {
    dispatch({type: 'SET_LOADING', payload: true});
    try {
      const response = await api.products.getProducts();
      console.log(response);
      dispatch({type: 'SET_PRODUCTS', payload: response.data.data.data});
    } catch (err) {
      errorHandler(dispatch, err?.message);
    }
  },

  async fetchProductStats(dispatch){
    dispatch({type: 'SET_LOADING', payload: true});
    try {
      const response = await api.products.getStats();
      console.log(response);
      dispatch({type: 'SET_STATS', payload: response.data.data});
    } catch (err) {
      errorHandler(dispatch, err?.message);
    }
  },

  async createProduct(dispatch, data) {
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await api.products.createProduct(data);
      dispatch({type: 'ADD_PRODUCT', payload: response.data});
      return response.data;
    } catch (err) {
      errorHandler(dispatch, err.message);
    }
  },

  async updateProduct(dispatch, id, data) {
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await api.products.patchProduct(id, data);
      dispatch({type: 'UPDATE_PRODUCT', payload: response.data});
    } catch(err){
      errorHandler(dispatch, err?.message);
    }
  },

  async deleteProduct(dispatch, id){
    dispatch({type: 'SET_LOADING', payload: true});

    try{
      await api.products.deleteProduct(id);
      dispatch({type: 'DELETE_PRODUCT', payload: id})
    } catch(err){
      errorHandler(dispatch, err.message);
    }
  },

  // SUPPLIER
  async fetchSuppliers(dispatch) {
    dispatch({type: 'SET_LOADING', payload: true});
    try {
      const response = await api.suppliers.getSuppliers();
      console.log(response)
      dispatch({type: 'SET_SUPPLIERS', payload: response.data.data.data});
    } catch (err) {
      errorHandler(dispatch, err?.message);
    }
  },

  async createSupplier(dispatch, data) {
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await api.suppliers.createSupplier(data);
      dispatch({type: 'ADD_SUPPLIER', payload: response.data});
      return response.data;
    } catch (err) {
      errorHandler(dispatch, err.message);
    }
  },

  async updateSupplier(dispatch, id, data) {
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await api.suppliers.patchSupplier(id, data);
      dispatch({type: 'UPDATE_PRODUCT', payload: response.data});
    } catch(err){
      errorHandler(dispatch, err?.message);
    }
  },

  async deleteSupplier(dispatch, id){
    dispatch({type: 'SET_LOADING', payload: true});

    try{
      await api.suppliers.deleteSupplier(id);
      dispatch({type: 'DELETE_PRODUCT', payload: id})
    } catch(err){
      errorHandler(dispatch, err.message);
    }
  },

  // CUSTOMERS
  async fetchCustomers(dispatch) {
    dispatch({type: 'SET_LOADING', payload: true});
    try {
      const response = await api.customers.getCustomers();
      console.log(response);
      dispatch({type: 'SET_CUSTOMERS', payload: response.data.data.data});
    } catch (err) {
      errorHandler(dispatch, err?.message);
    }
  },

  async createCustomer(dispatch, data) {
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await api.customers.createCustomer(data);
      dispatch({type: 'ADD_CUSTOMER', payload: response.data});
      return response.data;
    } catch (err) {
      errorHandler(dispatch, err.message);
    }
  },

  async updateCustomer(dispatch, id, data) {
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await api.customers.patchCustomer(id, data);
      dispatch({type: 'UPDATE_CUSTOMER', payload: response.data});
    } catch(err){
      errorHandler(dispatch, err?.message);
    }
  },

  async deleteCustomer(dispatch, id){
    dispatch({type: 'SET_LOADING', payload: true});

    try{
      await api.customers.deleteCustomer(id);
      dispatch({type: 'DELETE_CUSTOMER', payload: id})
    } catch(err){
      errorHandler(dispatch, err.message);
    }
  },

  // ORDERS
  async fetchOrders(dispatch) {
    dispatch({type: 'SET_LOADING', payload: true});
    try {
      const response = await api.orders.getOrders();
      console.log(response)
      dispatch({type: 'SET_ORDERS', payload: response.data.data.data});
    } catch (err) {
      errorHandler(dispatch, err?.message);
    }
  },

  async createOrder(dispatch, data) {
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await api.orders.createOrder(data);
      console.log(response)
      dispatch({type: 'ADD_ORDER', payload: response.data});
      return response.data;
    } catch (err) {
      errorHandler(dispatch, err.message);
    }
  },

  async updateOrder(dispatch, id, data) {
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await api.orders.patchOrder(id, data);
      dispatch({type: 'UPDATE_ORDER', payload: response.data});
    } catch(err){
      errorHandler(dispatch, err?.message);
    }
  },

  async deleteOrder(dispatch, id){
    dispatch({type: 'SET_LOADING', payload: true});

    try{
      await api.orders.deleteOrder(id);
      dispatch({type: 'DELETE_ORDER', payload: id})
    } catch(err){
      errorHandler(dispatch, err.message);
    }
  },

  // PURCHASE ORDERS
  async fetchPurchaseorders(dispatch) {
    dispatch({type: 'SET_LOADING', payload: true});
    try {
      const response = await api.purchaseOrders.getPurchaseorders();
      console.log(response);
      dispatch({type: 'SET_PURCHASEORDERS', payload: response.data.data});
    } catch (err) {
      errorHandler(dispatch, err?.message);
    }
  },

  async createPurchaseOrder(dispatch, data) {
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await api.purchaseOrders.createPurchaseorder(data);
      console.log(response)
      dispatch({type: 'ADD_PURCHASEORDER', payload: response.data});
      return response.data;
    } catch (err) {
      errorHandler(dispatch, err.message);
    }
  },

  async updatePurchaseOrder(dispatch, id, data) {
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await api.purchaseOrders.patchPurchaseorder(id, data);
      dispatch({type: 'UPDATE_PURCHASEORDER', payload: response.data});
    } catch(err){
      errorHandler(dispatch, err?.message);
    }
  },

  async deletePurchaseOrder(dispatch, id){
    dispatch({type: 'SET_LOADING', payload: true});

    try{
      await api.purchaseOrders.deletePurchaseorder(id);
      dispatch({type: 'DELETE_PURCHASEORDER', payload: id})
    } catch(err){
      errorHandler(dispatch, err.message);
    }
  },

  // USERS

  async fetchLoggedInUser(dispatch){
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await api.users.getLoggedInUser();
      dispatch({type: 'SET_LOGGED_IN_USER', payload: response.data.data});
    } catch (err){
      errorHandler(dispatch, err.message);
    }
  },

  async fetchUsers(dispatch) {
    dispatch({type: 'SET_LOADING', payload: true});
    try {
      const response = await api.orders.getUsers();
      dispatch({type: 'SET_USERS', payload: response.data});
    } catch (err) {
      errorHandler(dispatch, err?.message);
    }
  },

  async createUser(dispatch, data) {
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await api.users.createUser(data);
      dispatch({type: 'ADD_USER', payload: response.data});
      return response.data;
    } catch (err) {
      errorHandler(dispatch, err.message);
    }
  },


  async updateUser(dispatch, id, data) {
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await api.users.patchUser(id, data);
      dispatch({type: 'UPDATE_USER', payload: response.data});
    } catch(err){
      errorHandler(dispatch, err?.message);
    }
  },

  async deleteUser(dispatch, id){
    dispatch({type: 'SET_LOADING', payload: true});

    try{
      await api.orders.deleteUser(id);
      dispatch({type: 'DELETE_USER', payload: id})
    } catch(err){
      errorHandler(dispatch, err.message);
    }
  },

  // notifications
  async fetchNotifications(dispatch){
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await api.notifications.getNotifications();
      console.log(response)
      dispatch({type: 'SET_NOTIFICATIONS', payload: response.data.data})
    } catch(err){
      errorHandler(dispatch, err.message);
    }
  },

  async updateNotification(dispatch, id){
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await api.notifications.updateNotification(id);
      console.log(response);
      dispatch({type: 'UPDATE_NOTIFICATION', payload: response.data.data});
    } catch(err){
      errorHandler(dispatch, err.message);
    }
  }
};
