import React from 'react';
import './Products.css'; // Reusing products css for basic layout if needed, or just inline styles

const Cart = () => {
    return (
        <div className="products-container" style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Your Cart</h1>
            <p>Your cart is currently empty.</p>
        </div>
    );
};

export default Cart;
