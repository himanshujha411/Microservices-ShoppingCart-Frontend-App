import React, { useState } from 'react'
import axios from 'axios';
import './css files/RegistrationPage.css';
import { toast, ToastContainer } from 'react-toastify';
import { registerAPICall } from '../services/AuthService';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        user: {
            emailId: '',
            password: '',
        },
        customer: {
            firstName: '',
            lastName: '',
            customerPhone: '',
        },
        shipAdd: {
            address: '',
            city: '',
            state: '',
            zipcode: '',
            country: '',
        },
        billAdd: {
            address: '',
            city: '',
            state: '',
            zipcode: '',
            country: '',
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [section, field] = name.split('.');

        setFormData((prevData) => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [field]: value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Make the API request
        //axios.post('/auth/controller/UserRegistrationBeanService/signup', formData)
        registerAPICall(formData)
            .then((response) => {

                if (response.data.success) {
                    sessionStorage.setItem('successMessage', response.data.success);
                    window.location.href = '/login';
                }
                else{
                    toast.error(response.data.error);
                }
            })
            .catch((error) => {
                console.error('Registration error', error);
                // Handle error response
            });
    };

    return (
        <div className="registration-container">
            <div className="card registration-card">
            <ToastContainer></ToastContainer>
                <div className="card-header text-center">
                    <h2>Shopping Cart Registration</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <h4>User Information</h4>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="user.emailId"
                                        className="form-control"
                                        placeholder="Enter email"
                                        value={formData.user.emailId}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="user.password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        value={formData.user.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                
                        <p></p><h4>Basic Information</h4>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="customer.firstName"
                                        className="form-control"
                                        placeholder="Enter first name"
                                        value={formData.customer.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="customer.lastName"
                                        className="form-control"
                                        placeholder="Enter last name"
                                        value={formData.customer.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="customer.customerPhone"
                                className="form-control"
                                placeholder="Enter phone number"
                                value={formData.customer.customerPhone}
                                onChange={handleChange}
                                required
                            />
                        </div>
    
                        <h4>Shipping Address</h4>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="shipAdd.address"
                                        className="form-control"
                                        placeholder="Enter address"
                                        value={formData.shipAdd.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="shipAdd.city"
                                        className="form-control"
                                        placeholder="Enter city"
                                        value={formData.shipAdd.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        name="shipAdd.state"
                                        className="form-control"
                                        placeholder="Enter state"
                                        value={formData.shipAdd.state}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>Zip Code</label>
                                    <input
                                        type="text"
                                        name="shipAdd.zipcode"
                                        className="form-control"
                                        placeholder="Enter zip code"
                                        value={formData.shipAdd.zipcode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label>Country</label>
                            <input
                                type="text"
                                name="shipAdd.country"
                                className="form-control"
                                placeholder="Enter country"
                                value={formData.shipAdd.country}
                                onChange={handleChange}
                                required
                            />
                        </div>
    
                        <h4>Billing Address</h4>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="billAdd.address"
                                        className="form-control"
                                        placeholder="Enter address"
                                        value={formData.billAdd.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="billAdd.city"
                                        className="form-control"
                                        placeholder="Enter city"
                                        value={formData.billAdd.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        name="billAdd.state"
                                        className="form-control"
                                        placeholder="Enter state"
                                        value={formData.billAdd.state}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>Zip Code</label>
                                    <input
                                        type="text"
                                        name="billAdd.zipcode"
                                        className="form-control"
                                        placeholder="Enter zip code"
                                        value={formData.billAdd.zipcode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label>Country</label>
                            <input
                                type="text"
                                name="billAdd.country"
                                className="form-control"
                                placeholder="Enter country"
                                value={formData.billAdd.country}
                                onChange={handleChange}
                                required
                            />
                        </div>
    
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
    
};

export default RegistrationPage;