import axios from 'axios';
import {useNavigate} from "react-router-dom";

// axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8001/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// add request interceptor for auth tokens

axiosInstance.interceptors.request.use((config) => {
  console.log('Making request to →', config.baseURL + config.url);
  // → will print: /api/v1/sign-up   ← perfect
  // or: /api/v1/v1/sign-up          ← broken (double v1)
  return config;
}, (error) => {
  if(error.response?.status === 401){
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

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
    getStats(){
      return axiosInstance.get('/products/dashboard/stats');
    }
  },

  // suppliers
  suppliers: {
    getSupplier(id) {
      return axiosInstance.get(`/suppliers/${id}`);
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
      return axiosInstance.get('/customers');
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

    getLoggedInUser(){
      return axiosInstance.get('/users/me');
    },

    createUser(data) {
      return axiosInstance.post('/users/', data);
    },

    signupUser(data) {
      console.log(data);
      return axiosInstance.post('/users/sign-up', data);
    },

    loginUser(data) {
      console.log(data);
      return axiosInstance.post('/users/login', data);
    },

    patchUser(id, data) {
      return axiosInstance.patch(`/users/${id}`, data);
    },

    deleteUser(id) {
      return axiosInstance.delete(`/users/${id}`);
    },
  },

  // notification
  notifications: {
    getNotifications(){
      return axiosInstance.get('/notifications');
    },

    updateNotification(id){
      return axiosInstance.patch(`/notifications/${id}`);
    }
  }
};

export default api;
