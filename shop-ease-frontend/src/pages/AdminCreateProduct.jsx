import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminProductForm from '../components/AdminProductForm';
import './Admin.css';

const AdminCreateProduct = () => {
    const navigate = useNavigate();

    const handleCreate = async (productData) => {
        try {
            const token = localStorage.getItem('token');
            const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");
            await axios.post(`${API_URL}/api/products`, productData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/admin');
        } catch (err) {
            console.error('Error creating product:', err);
            alert('Failed to create product. Please try again.');
        }
    };

    return (
        <div className="admin-wrapper">
            <div className="admin-header-flex">
                <h1 className="admin-title">Add New Product</h1>
            </div>
            <AdminProductForm onSubmit={handleCreate} />
        </div>
    );
};

export default AdminCreateProduct;
