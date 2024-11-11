import axios from "axios";

const AUTH_REST_API_BASE_URL = "http://localhost:8081"

const token = sessionStorage.getItem('token');

export const registerAPICall = (registerObj) => axios.post(AUTH_REST_API_BASE_URL +'/controller/UserRegistrationBeanService/signup', registerObj);
export const loginAPICall = (username, password) => {

    const url = AUTH_REST_API_BASE_URL+'/controller/UserLoginBeanService/login';
    const body = { username, password };
    const headers = {
        'Content-Type': 'application/json'
    };

    return axios.post(url, body, { headers });
};
    
export const getUserProfile = () => {

    const url = AUTH_REST_API_BASE_URL+'/controller/home/userdetails';
    const body ={};
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    };

    return axios.post(url, body, { headers });
};

export const contactUs = (email, subject, message) => {

    const url = AUTH_REST_API_BASE_URL+'/controller/home/contactUs';
    const body ={ email, subject, message };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    };

    return axios.post(url, body, { headers });
};
    
