import React, { useState, useEffect } from "react";
import { getUserBillingAddress } from "../services/DeliveryService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserProfile } from "../services/AuthService";
import './css files/Checkout.css';

const CheckoutInformation = () => {

    const userEmail = sessionStorage.getItem('token');

    const [customer, setCustomer] = useState({});
    const [billingAddress, setBillingAddress] = useState({});
    
    useEffect(() => {
        getUserProfile()
            .then(response => {
                setCustomer(response.data);
            })
            .catch(error => {
                toast.error("Unable to fetch user Profile");
            });

        getUserBillingAddress()
            .then(response => {
                setBillingAddress(response.data);
            })
            .catch(error => {
                toast.error("Unable to fetch Billing Address");
            });

    }, []);

    const handleCancelCheckout = () => {
        window.location.href='/dashboard';
    }

    const handleContinueCheckout = () => {
        window.location.href='/CheckoutReceipt';
    }

    const handleBackToCart = () => {
        window.location.href = '/cart';
    };

    return (
        <div className="checkout-container">
            <ToastContainer />
            <center> <h2>Customer Basic Information</h2> </center>
            <div className="checkout-content">
                <div className="customer-info">
                    <h4>Confirm Contact Information</h4><br></br>
                    <div className="info-group">
                        <strong>Name: </strong>
                        {customer.firstName} {customer.lastName}
                    </div>
                    <div className="info-group">
                        <strong>Email: </strong>
                        {userEmail}
                    </div>
                    <div className="info-group">
                        <strong>Phone: </strong>
                        {customer.customerPhone}
                    </div>
                </div>

                <div className="address-section">
                    <div className="billing-address">
                        <h4>Confirm Billing Address</h4><br></br>
                        <div className="info-group">
                            <strong>Address:    </strong>
                            {billingAddress.address}
                        </div>
                        <div className="info-group">
                            <strong>City:   </strong>
                            {billingAddress.city}
                        </div>
                        <div className="info-group">
                            <strong>State:  </strong>
                            {billingAddress.state}
                        </div>
                        <div className="info-group">
                            <strong>Postal Code: </strong>
                            {billingAddress.zipcode}
                        </div>
                    </div>

                    
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', width: '100%' }}>
                    <button onClick={(e) => handleBackToCart(e)} className="place-order-button">Back</button>
                    <button onClick={(e) => handleCancelCheckout(e)} className="place-order-button">Cancel</button>
                    <button onClick={(e) => handleContinueCheckout(e)} className="place-order-button">Continue Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutInformation;
