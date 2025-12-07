import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminProductForm from '../components/AdminProductForm';
import './Admin.css';

const AdminEditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('token');
                const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");
                const response = await axios.get(`${API_URL}/api/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching product:', err);
                alert('Product not found or error fetching data');
                navigate('/admin/dashboard');
            }
        };

        fetchProduct();
    }, [id, navigate]);

    const handleUpdate = async (updatedData) => {
        try {
            const token = localStorage.getItem('token');
            const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");
            await axios.put(`${API_URL}/api/products/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Error updating product:', err);
            alert('Failed to update product. Please try again.');
        }
    };

    if (loading) return <div className="admin-wrapper">Loading...</div>;

    return (
        <div className="admin-wrapper">
            <div className="admin-header-flex">
                <h1 className="admin-title">Edit Product</h1>
            </div>
            <AdminProductForm
                initialData={product}
                onSubmit={handleUpdate}
                isEditing={true}
            />
        </div>
    );
};

export default AdminEditProduct;
