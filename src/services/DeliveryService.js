import axios from "axios";

const DELIVERY_REST_API_BASE_URL = "http://localhost:8083"

const token = sessionStorage.getItem('token');
    
export const getUserBillingAddress = () => {

    const url = DELIVERY_REST_API_BASE_URL+'/controller/userDetailsService/getBillingAddressFromToken';
    const body ={};
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    };

    return axios.post(url, body, { headers });
};
    
export const getUserShippingAddress = () => {

    const url = DELIVERY_REST_API_BASE_URL+'/controller/userDetailsService/getShippingAddressFromToken';
    const body ={};
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    };

    return axios.post(url, body, { headers });
};
