import React from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            {/* Image Slider */}
            <ImageSlider />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Elevate Your Lifestyle with ShopEase</h1>
                    <p className="hero-subtitle">
                        Discover a curated collection of premium products designed to enhance your everyday life.
                        Quality, style, and innovation delivered to your doorstep.
                    </p>
                    <Link to="/products" className="cta-button">
                        Shop Now
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-title">Why Choose Us</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <span className="feature-icon">🚀</span>
                        <h3 className="feature-title">Fast Shipping</h3>
                        <p className="feature-desc">Get your products delivered with lightning speed, anywhere in the world.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🛡️</span>
                        <h3 className="feature-title">Secure Payment</h3>
                        <p className="feature-desc">Your transactions are protected with state-of-the-art security encryption.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">💎</span>
                        <h3 className="feature-title">Premium Quality</h3>
                        <p className="feature-desc">We source only the finest materials to ensure lasting durability and style.</p>
                    </div>
                </div>
            </section>

            {/* Featured Categories (Visual Only) */}
            <section className="categories-section">
                <h2 className="section-title">Explore Categories</h2>
                <div className="categories-grid">
                    <div className="category-card">
                        <img src="https://5.imimg.com/data5/SELLER/Default/2022/7/YT/LT/CY/71864580/im3-jpg-1000x1000.jpg" alt="Electronics" className="category-image" />
                        <div className="category-overlay">
                            <h3 className="category-name">Electronics</h3>
                        </div>
                    </div>
                    <div className="category-card">
                        <img src="https://www.fashiongonerogue.com/wp-content/uploads/2021/12/Mannequins-Womens-Clothing-Store-Red-Palette.jpg" alt="Fashion" className="category-image" />
                        <div className="category-overlay">
                            <h3 className="category-name">Fashion</h3>
                        </div>
                    </div>
                    <div className="category-card">
                        <img src="https://lwd.co.in/wp-content/uploads/2022/12/LWD-Website-Update-2020_Pure_life-14.jpg" alt="Home" className="category-image" />
                        <div className="category-overlay">
                            <h3 className="category-name">Home & Living</h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;