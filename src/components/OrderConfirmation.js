import React, { useState, useEffect } from "react";
import { getOrderConfirmation } from "../services/OrderService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css files/OrderConfirmation.css';

const OrderConfirmation = () => {

    const [order, setOrder] = useState({});

    useEffect(() => {

        getOrderConfirmation()
        .then(response => {
            setOrder(response.data);
            
        })
        .catch(error => {
            toast.error("SOmething went wrong!")
        })
    },[]);

    const handleContinueShopping = () => {
        window.location.href = 'products';
    };
   
    return (
        <div className="order-confirmation-container">
            <ToastContainer />
            <h2>Order Confirmation</h2><br></br>
            <center><h5>Thank you for your purchase!</h5> 
            <h5>Your Order will be delivered in 2-3 days.</h5></center>
            <br></br>
            <p>Your order number is <strong>{order.orderId}</strong>.</p>
            
           
            <button onClick={handleContinueShopping} className="continue-shopping-button">Continue Shopping</button>
        </div>
    );
};

export default OrderConfirmation;
