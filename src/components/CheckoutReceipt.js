import React, { useState, useEffect } from "react";
import { getCartFromToken } from "../services/OrderService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserProfile } from "../services/AuthService";
import { getUserBillingAddress } from "../services/DeliveryService";
import './css files/Receipt.css'

const CheckoutReceipt = () => {

    const [cart, setCart] = useState([]);
    const [billingAddress, setBillingAddress] = useState({});
    const [customer, setCustomer] = useState({});
    const currentDate = new Date().toLocaleDateString();

    useEffect(()=> {

        getCartFromToken()
        .then(response => {
            setCart(response.data);
        })
        .catch(error => {
            toast.error("Unable to fetch Cart Items");
        });

        getUserBillingAddress()
        .then(response => {
            setBillingAddress(response.data);
        })
        .catch(error => {
            toast.error("Unable to fetch Billing Address");
        });

        getUserProfile()
        .then(response => {
            setCustomer(response.data);
        })
        .catch(error => {
            toast.error("Unable to fetch user Profile");
        });

    }, []);

    const GrandTotal= () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    const handleSubmit = () => {
        window.location.href='/orderConfirmation';
    };

    const handleCancelCheckout = () => {
        window.location.href='/dashboard';
    };

    const handleCustomerInfo = () => {
        window.location.href = '/checkout/customerInformation';
    };

    return(
        <div className="receipt-container">
        <ToastContainer />

        <h2>Receipt</h2>
        
        <div className="receipt-header">
            
            
        </div>

        <div className="receipt-info">
            <h4>Customer Information</h4>
            <p><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
            <p><strong>Phone:</strong> {customer.customerPhone}</p>
        </div>

        <div className="receipt-date">
            <p><strong>Order Date:</strong>{currentDate}</p>
        </div>

        <div className="receipt-address">
            <h4>Billing Address</h4>
            <p><strong>Address:</strong> {billingAddress.address}</p>
            <p><strong>City:</strong> {billingAddress.city}</p>
            <p><strong>State:</strong> {billingAddress.state}</p>
            <p><strong>Postal Code:</strong> {billingAddress.postalCode}</p>
        </div>

        <table className="receipt-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((item, index) => {
                    const unitPrice = item.price / item.quality;
                    const totalPrice = item.price;

                    return (
                        <tr key={index}>
                            <td>{item.productName}</td>
                            <td>₹ {unitPrice.toFixed(2)}</td>
                            <td>{item.quality}</td>
                            <td>₹ {totalPrice.toFixed(2)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>

        <div className="grand-total">
            <h3>Grand Total: ₹ {GrandTotal().toFixed(2)}</h3>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', width: '100%' }}>
            <button onClick={handleCustomerInfo} className="print-button">Back</button>
            <button onClick={handleCancelCheckout} className="print-button">Cancel</button>
            <button onClick={handleSubmit} className="print-button">Submit Order</button>
        </div>
    
    </div>

    );

};

export default CheckoutReceipt;