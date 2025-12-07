import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");
            const response = await axios.get(`${API_URL}/api/products`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProducts(products.filter(p => p.id !== id));
            } catch (err) {
                console.error('Error deleting product:', err);
                alert('Failed to delete product');
            }
        }
    };

    if (loading) return <div className="admin-wrapper">Loading...</div>;
    if (error) return <div className="admin-wrapper error-state">{error}</div>;

    return (
        <div className="admin-wrapper">
            <div className="admin-header-flex">
                <div>
                    <h1 className="admin-title">Product Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage your store inventory</p>
                </div>
                <Link to="/admin/products/new" className="btn-primary">
                    + Add New Product
                </Link>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>
                                    No products found. Add your first product!
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <div className="product-cell">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="product-thumbnail"
                                                onError={(e) => e.target.src = 'https://via.placeholder.com/50'}
                                            />
                                            <span style={{ fontWeight: '500' }}>{product.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ textTransform: 'capitalize' }}>{product.category}</td>
                                    <td style={{ fontWeight: '600', color: 'var(--primary)' }}>
                                        ${Number(product.price).toFixed(2)}
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="btn-secondary"
                                                onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn-danger"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
