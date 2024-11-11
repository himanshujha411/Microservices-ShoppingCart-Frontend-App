import './css files/product.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { getAllProductsAPI, addToCart } from '../services/OrderService';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Fetch products from an API
    useEffect(() => {
        getAllProductsAPI()
        .then(response => {
            setProducts(response.data); // Axios automatically parses the response to JSON
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }, []);

    const getProductById = (productId) => {
       
        // Redirect to login page after logout
        window.location.href = `/product/${productId}`;
    };

    function addItemToCart(productId){

        addToCart(productId)
        .then((response) => {

            if (response.data.success) {
                toast.success("Product added to cart successfully!");
            }
            else{
                toast.error("Failed to add product to cart.");
            }
        })
        .catch(error => {
            toast.error("An error occurred. Please try again.");
        });

    }

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error loading products: {error.message}</p>;

    return (
        <div>
            <div className="products-container">
            <ToastContainer></ToastContainer>
            <h1 className="page-title">Our Products</h1>
            <ul className="products-list">
                {products.map(product => (
                    <li key={product.id} className="product-item">
                        <div className="product-info">
                            <h5 className="product-name">{product.name}</h5>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price"><strong>Price: </strong>₹ {product.price}</p>
                            
                            <div style={{ display: 'flex', gap: '10px' }}>
                                
                                <button className="btn btn-addToCart" onClick={() => addItemToCart(product.productId)}></button>
                                <button className="btn btn-secondary" onClick={() => getProductById(product.productId)}>View Description</button>
                                
                            </div>
                        </div>
                        
                    </li>
                ))}
            </ul>
            </div>
            <div className='form-group mb-3' style={{ display: 'flex', gap: '20px' }}>    
                <button className="dashboard-button" onClick={() => window.location.href = '/dashboard'}>
                    <i className="fas fa-th-list"></i> Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default Products;
