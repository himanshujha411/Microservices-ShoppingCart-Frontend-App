import axios from "axios";

const ORDER_REST_API_BASE_URL = "http://localhost:8084"

// Retrieve the token from localStorage
const token = sessionStorage.getItem('token');

export const getAllProductsAPI = () => {

    const url = ORDER_REST_API_BASE_URL+'/controller/ProductService/getAllProducts';
    const body = {};
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    };

    return axios.post(url, body, { headers });
};

export const getProductByIdAPI = (productId) => {

    const url = ORDER_REST_API_BASE_URL+`/controller/ProductService/getProductById?productId=${productId}`; // Assuming the ID is passed in the URL
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    };

    return axios.post(url, { headers });
};

export const addToCart = (productId) => {

    const url = ORDER_REST_API_BASE_URL+'/controller/cartService/addToCart'; 
    const body = { productId };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    };

    return axios.post(url, body, { headers }); 
};

export const getCartFromToken =() => {

    const url = ORDER_REST_API_BASE_URL+'/controller/cartItemService/getCartById';
    const body ={};
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    };
    return axios.post(url, body, { headers });
};

export const deleteItemFromCart = (productId) => {

    const url = ORDER_REST_API_BASE_URL+'/controller/cartService/deleteItemFromCart';
    const body = { productId };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    };

    return axios.post(url, body, { headers });
};

export const deleteFromCart = (productId) => {

    const url = ORDER_REST_API_BASE_URL+'/controller/cartService/deleteFromCart';
    const body = { productId };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    };

    return axios.post(url, body, { headers }); 
};

export const getCart =() => {

    const url = ORDER_REST_API_BASE_URL+'/controller/cartService/getCartFromToken';
    const body ={};
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    };
    return axios.post(url, body, { headers });
};

export const getOrderConfirmation =() => {

    const url = ORDER_REST_API_BASE_URL+'/controller/customerOrderServices/submitOrder';
    const body ={};
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    };
    return axios.post(url, body, { headers });
};
