import axios from 'axios';

// axios instance
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8001/ap/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// add request interceptor for auth tokens

// add response interceptor for error handling

// API methods
export const api = {
  // products
  products: {
    getProduct(id) {
      return axiosInstance.get(`/products/${id}`);
    },
    getProducts() {
      return axiosInstance.get('/products');
    },
    createProduct(data) {
      return axiosInstance.post('/products', data);
    },
    patchProduct(id, data) {
      return axiosInstance.patch(`/products/${id}`, data);
    },
    deleteProduct(id) {
      return axiosInstance.delete(`/products/${id}`);
    },
  },

  // suppliers
  suppliers: {
    getSupplier(id) {
      return axiosInstance.get(`suppliers/${id}`);
    },

    getSuppliers() {
      return axiosInstance.get('/suppliers');
    },

    createSupplier(data) {
      return axiosInstance.post('/suppliers', data);
    },

    patchSupplier(id, data) {
      return axiosInstance.patch(`/suppliers/${id}`, data);
    },

    deleteSupplier(id) {
      return axiosInstance.delete(`/suppliers/${id}`);
    },
  },

  // customers
  customers: {
    getCustomer(id) {
      return axiosInstance.get(`/customers/${id}`);
    },
    getCustomers() {
      return axiosInstance.get();
    },
    createCustomer(data) {
      return axiosInstance.post(data);
    },
    patchCustomer(id, data) {
      return axiosInstance.patch(`/customers/${id}`, data);
    },
    deleteCustomer(id) {
      return axiosInstance.delete(`/customers/${id}`);
    },
  },

  // purchase orders
  purchaseOrders: {
    getPurchaseorder(id) {
      return axiosInstance.get(`/purchaseorders/${id}`);
    },

    getPurchaseorders() {
      return axiosInstance.get('/purchaseorders');
    },

    createPurchaseorder(data) {
      return axiosInstance.post('/purchaseorders', data);
    },

    patchPurchaseorder(id, data) {
      return axiosInstance.patch(`/purchaseorders/${id}`, data);
    },

    deletePurchaseorder(id) {
      return axiosInstance.delete(`/purchaseorders/${id}`);
    },
  },

  // orders
  orders: {
    getOrder(id) {
      return axiosInstance.get(`/orders/${id}`);
    },

    getOrders() {
      return axiosInstance.get('/orders');
    },

    createOrder(data) {
      return axiosInstance.post('/orders', data);
    },

    patchOrder(id, data) {
      return axiosInstance.patch(`/orders/${id}`, data);
    },

    deleteOrder(id) {
      return axiosInstance.delete(`/orders/${id}`);
    },
  },

  //users
  users: {
    getUser(id) {
      return axiosInstance.get(`/users/${id}`);
    },

    getUsers() {
      return axiosInstance.get('/users');
    },

    createUser(data) {
      return axiosInstance.post('/users', data);
    },

    patchUser(id, data) {
      return axiosInstance.patch(`/users/${id}`, data);
    },

    deleteUser(id) {
      return axiosInstance.delete(`/users/${id}`);
    },
  },
};

export default axiosInstance;
