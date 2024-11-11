import React, { useState, useEffect } from "react";
import { getCartFromToken, addToCart, deleteItemFromCart, deleteFromCart } from "../services/OrderService";
import './css files/Cart.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {


    const [cart, setCart] = useState([]);
    
    useEffect(() => {

        const successMessage = sessionStorage.getItem('cartSuccess');
        
        if (successMessage) {
            // Display the success message
            toast.success(successMessage);

            // Remove the message from sessionStorage
            sessionStorage.removeItem('cartSuccess');
        }

        getCartFromToken()
        .then(response => {
            setCart(response.data);
        })
        .catch(error => {
            console.log(error);
        })

    }, []);

    const handleRemoveItem = (productId) => {
        
        deleteFromCart(productId)
        .then(response => {
            if(response.data.success){
                sessionStorage.setItem('cartSuccess',response.data.success);
                window.location.reload();
            }
            else{
                toast.error("Failed to add product to cart.");
            }
        })
        .catch(error => {
            toast.error("An error occurred. Please try again.");
        });
        
    };

    const handleDecreaseQuantity = (productId) => {

        deleteItemFromCart(productId)
        .then(response => {
            if(response.data.success){
                sessionStorage.setItem('cartSuccess',response.data.success);
                window.location.reload();
            }
            else{
                toast.error("Failed to add product to cart.");
            }
        })
        .catch(error => {
            toast.error("An error occurred. Please try again.");
        });
    }

    const handleIncreaseQuantity = (productId) => {
        
        addToCart(productId)
        .then(response => {
            if (response.data.success) {
                sessionStorage.setItem('cartSuccess',"Product quantity increased in cart successfully!");
                window.location.reload();
            }
            else{
                toast.error("Failed to add product to cart.");
            }
        })
        .catch(error => {
            toast.error("An error occurred. Please try again.");
        });
    }

    const handleEmptycart = () => {
        window.location.href='/products';
    }

    const handleCheckout = () => {
        //sessionStorage.setItem('grandTotal', grandTotal);
        window.location.href = '/checkout/customerInformation';
    }

    return(
        <div className="cart-container">
            <ToastContainer />
            <center><h2>Welcome to Cart Page</h2></center>
            {cart && cart.length > 0 ? (
                <div>
                    <h4>Your Cart Items:</h4>
                    <ul className="cart-list">
                        {cart.map((item, index) => (
                            <li key={index} className="cart-list-item">
                               { /*<img src={item.image} alt={item.name} className="item-image" />*/}
                                <div className="item-details">
                                    <h5>{item.productName}</h5>
                                    <p>Price: ₹ {item.price}</p>
                                    <p>Quantity: {item.quality}</p>
                                    <button 
                                            className="quantity-button" 
                                            onClick={() => handleDecreaseQuantity(item.product_id)}
                                        >-</button>
                                        
                                        <button 
                                            className="quantity-button" 
                                            onClick={() => handleIncreaseQuantity(item.product_id)}
                                        >+</button>
                                    
                                    <button onClick={() => handleRemoveItem(item.product_id)} className="remove-button">
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3>Total Price: ₹ {cart.reduce((total, item) => total + item.price, 0)}</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={(e) => handleEmptycart(e)} className="checkout-button">Continue Shopping</button>
                        <button onClick={() => handleCheckout()} className="checkout-button">Proceed to Checkout</button>
                    </div>
                    
                </div>
            ) : (
                <div>
                    <br></br><h5>Your cart is empty.</h5>
                    <button onClick={(e) => handleEmptycart(e)} className="checkout-button">
                                        Continue Shopping
                                    </button>
                </div>
                
                
            )}
        </div>
    );
};

export default Cart