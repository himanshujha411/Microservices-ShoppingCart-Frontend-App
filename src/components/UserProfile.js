import React, { useState, useEffect } from 'react'
import { getUserProfile } from '../services/AuthService';
import { getUserShippingAddress } from '../services/DeliveryService';
import './css files/profile.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import profilePicture from '../banner/defaultprofile.jpeg';

const UserProfile = () => {

    const userEmail = sessionStorage.getItem('token');

    const [customer, setCustomer] = useState({});
    const [address, setAddress] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        getUserProfile()
        .then(response => {
            setCustomer(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        })

        getUserShippingAddress()
        .then(response => {
            setAddress(response.data);
            setLoading(false);
        })
        .catch(error => {
            toast.error("Unable to Fetch address")
        })

    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error loading products: {error.message}</p>;

    return (
        <div className="profile-container">
            <ToastContainer />
            <center><h2>Customer Profile</h2></center><br></br>
            <div className="profile-section">
                {/* Profile Picture */}
                <div className="profile-picture">
                    <img 
                        src={profilePicture}
                        alt="Profile" 
                        className="profile-img"
                    />
                </div>
    
                {/* Personal Information */}
                <h4>Personal Information</h4>
                <p><strong>First Name:</strong> {customer.firstName}</p>
                <p><strong>Last Name:</strong> {customer.lastName}</p>
                <p><strong>Email:</strong> {userEmail}</p>
                <p><strong>Phone:</strong> {customer.customerPhone}</p>
            </div>
            <div className="profile-section">
                <h4>Address Information</h4>
                <p><strong>Address:</strong> {address.address}</p>
                <p><strong>City:</strong> {address.city}</p>
                <p><strong>State:</strong> {address.state}</p>
                <p><strong>Zip Code:</strong> {address.zipcode}</p>
                <p><strong>Country:</strong> {address.country}</p>
            </div>
        </div>
    );
};

export default UserProfile;