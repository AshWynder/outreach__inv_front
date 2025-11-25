export const initialState = {
  products: [],
  suppliers: [],
  customers: [],
  orders: [],
  purchaseOrders: [],
  users: [],
  categories: [],
  loading: false,
  error: null,
};

export function appReducer(state, action) {
  switch (action.type) {
    // for spinner logic
    case 'SET_LOADING':
      return { ...state, lading: action.payload };

    // error handling
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };

    case 'CLEAR_ERROR':
      return { ...state, error: null };

    // 1. products

    // api calling
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, loading: false };

    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
      };

    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((product) => {
          product._id === action.payload._id ? action.payload : product;
        }),
        loading: false,
      };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
        loading: false,
      };

    // 2. suppliers

    // api calling
    case 'SET_SUPPLIERS':
      return { ...state, suppliers: action.payload, loading: false };

    case 'ADD_SUPPLIER':
      return {
        ...state,
        suppliers: [...state.suppliers, action.payload],
        loading: false,
      };

    case 'UPDATE_SUPPLIER':
      return {
        ...state,
        suppliers: state.suppliers.map((supplier) => {
          supplier._id === action.payload._id ? action.payload : supplier;
        }),
        loading: false,
      };

    case 'DELETE_SUPPLIER':
      return {
        ...state,
        suppliers: state.suppliers.filter(
          (supplier) => supplier._id !== action.payload
        ),
        loading: false,
      };

    // 3. customers

    // api calling
    case 'SET_CUSTOMERS':
      return { ...state, customers: action.payload, loading: false };

    case 'ADD_CUSTOMER':
      return {
        ...state,
        customers: [...state.customers, action.payload],
        loading: false,
      };

    case 'UPDATE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.map((customer) => {
          customer._id === action.payload._id ? action.payload : customer;
        }),
        loading: false,
      };

    case 'DELETE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer._id !== action.payload
        ),
        loading: false,
      };

    // orders

    // api calling
    case 'SET_ORDERS':
      return { ...state, orders: action.payload, loading: false };

    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        loading: false,
      };

    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map((order) => {
          order._id === action.payload._id ? action.payload : order;
        }),
        loading: false,
      };

    case 'DELETE_ORDER':
      return {
        ...state,
        orders: state.orders.filter((order) => order._id !== action.payload),
        loading: false,
      };

    // purchase orders

    // api calling
    case 'SET_PURCHASEORDERS':
      return { ...state, purchaseOrders: action.payload, loading: false };

    case 'ADD_PURCHASEORDER':
      return {
        ...state,
        purchaseOrders: [...state.purchaseOrders, action.payload],
        loading: false,
      };

    case 'UPDATE_PURCHASEORDER':
      return {
        ...state,
        purchaseOrders: state.purchaseOrders.map((purchaseOrder) => {
          purchaseOrder._id === action.payload._id
            ? action.payload
            : purchaseOrder;
        }),
        loading: false,
      };

    case 'DELETE_PURCHASEORDER':
      return {
        ...state,
        purchaseOrders: state.purchaseOrders.filter(
          (purchaseOrder) => purchaseOrder._id !== action.payload
        ),
        loading: false,
      };

      // users
    // api calling
    case 'SET_USERS':
      return { ...state, users: action.payload, loading: false };

    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
        loading: false,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user) => {
          user._id === action.payload._id
            ? action.payload
            : user;
        }),
        loading: false,
      };

    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(
          (user) => user._id !== action.payload
        ),
        loading: false,
      };

    // categories

    // api calling
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload, loading: false };
  }
}
