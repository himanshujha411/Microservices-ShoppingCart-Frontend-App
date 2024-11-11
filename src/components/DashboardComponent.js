import React from 'react';
import Slider from 'react-slick';
import './css files/dashboard.css';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import slider1 from '../banner/slider1.jpg'; 
import slider2 from '../banner/slider2.png';

const banners = [
    { id: 1, image: slider1 },
    { id: 2, image: slider2 },
];

const DashboardComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="dashboard-container">
            <h1>Welcome to the Shopping Cart Application</h1>
            

            <div className="slider-container">
                <Slider {...settings}>
                    {banners.map(banner => (
                        <div key={banner.id}>
                            <img src={banner.image} alt={`Banner ${banner.id}`} />
                        </div>
                    ))}
                </Slider>
            </div>

            <div className='form-group mb-3' style={{ display: 'flex', gap: '20px' }}>    
                <button className="product-button" onClick={() => window.location.href = '/products'}>
                    <i className="fas fa-th-list"></i> View All Products
                </button>
                <button className="product-button" onClick={() => window.location.href = '/Cart'}>
                    <i className="fas fa-th-list"></i> View Cart
                </button>
                <button className="product-button" onClick={() => window.location.href = '/profile'}>
                    <i className="fas fa-th-list"></i> View Profile
                </button>
            </div>
        </div>
    );
};

export default DashboardComponent;
