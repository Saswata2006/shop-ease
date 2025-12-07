import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');
    const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }
        fetchCart();
    }, [token]);

    const fetchCart = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/cart`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching cart:', err);
            setError('Failed to load cart');
            setLoading(false);
        }
    };

    const updateQuantity = async (id, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            // Optimistic update
            const updatedItems = cartItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            );
            setCartItems(updatedItems);

            await axios.put(`${API_URL}/api/cart/${id}`,
                { quantity: newQuantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (err) {
            console.error('Error updating quantity:', err);
            fetchCart(); // Revert on error
        }
    };

    const removeItem = async (id) => {
        if (!confirm('Are you sure you want to remove this item?')) return;

        try {
            const updatedItems = cartItems.filter(item => item.id !== id);
            setCartItems(updatedItems);

            await axios.delete(`${API_URL}/api/cart/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            console.error('Error removing item:', err);
            fetchCart(); // Revert on error
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    };

    if (loading) return <div className="cart-container"><p>Loading cart...</p></div>;

    if (!token) {
        return (
            <div className="cart-container empty-cart">
                <h2>Please Login</h2>
                <p>You need to be logged in to view your cart.</p>
                <Link to="/login" className="shop-now-btn">Login Now</Link>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="cart-container empty-cart">
                <span className="empty-cart-icon">🛒</span>
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added anything yet.</p>
                <Link to="/products" className="shop-now-btn">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1>Shopping Cart</h1>
                <p>{cartItems.length} items in your bag</p>
            </div>

            <div className="cart-grid">
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="cart-item-image"
                                onError={(e) => e.target.src = 'https://via.placeholder.com/100?text=No+Image'}
                            />
                            <div className="cart-item-details">
                                <h3 className="cart-item-title">{item.product.name}</h3>
                                <p className="cart-item-category">{item.product.category}</p>
                                <div className="cart-item-price">${Number(item.product.price).toFixed(2)}</div>
                            </div>
                            <div className="cart-item-actions">
                                <div className="quantity-controls">
                                    <button
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >-</button>
                                    <span className="qty-value">{item.quantity}</span>
                                    <button
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >+</button>
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeItem(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2 className="summary-title">Order Summary</h2>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <button className="checkout-btn" onClick={() => alert('Checkout functionality coming soon!')}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
