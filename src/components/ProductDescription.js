import './css files/productDescription.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductByIdAPI, addToCart } from '../services/OrderService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDescription = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    // Fetch products from an API or use example products
    useEffect(() => {
        // Uncomment and use the following block if fetching from an API
        
        getProductByIdAPI(productId)
        .then(response => {
            setProduct(response.data); // Axios automatically parses the response to JSON
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
        
    }, [productId]);

    const getAllProducts = () => {
        // Clear any authentication tokens or user data
        // For example, localStorage.clear();
        
        // Redirect to login page after logout
        window.location.href = '/products';
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
        <div className="products-description">
            <ToastContainer></ToastContainer>
            <h1 className="page-heading">{product.manufacturer}</h1>
            <ul className="products-list">
            <div>
                <br></br>
            <h3><b>Name: </b>{product.name}</h3><p></p>
            <h5><b>Model: </b>{product.description}</h5><p></p>
            <h5><b>Operating System: </b>{product.category}</h5><p></p>
            <p><strong>Price: </strong>₹ {product.price}</p>
            <h6><b>In Stock: </b>only {product.unit} left</h6><br></br>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-addToCart" onClick={() => addItemToCart(product.productId)}></button>
                <button className="btn btn-secondary" onClick={(e) => getAllProducts(e)}>Back to Products</button>
            </div>
        </div>
            </ul>
        </div>
    );
};

export default ProductDescription;