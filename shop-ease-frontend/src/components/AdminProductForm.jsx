import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/Admin.css';

const AdminProductForm = ({ initialData, onSubmit, isEditing = false }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        stock: 10
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="admin-form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-input"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Product Name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-textarea"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Product Description"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="price">Price ($)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="form-input"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            className="form-select"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="home">Home & Garden</option>
                            <option value="books">Books</option>
                            <option value="sports">Sports</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        className="form-input"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                {formData.imageUrl && (
                    <div className="image-preview-container" style={{ height: '150px', marginBottom: '1.5rem' }}>
                        <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="image-preview"
                            onError={(e) => e.target.style.display = 'none'}
                        />
                    </div>
                )}

                <div className="action-buttons" style={{ justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => navigate('/admin/dashboard')}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                        {isEditing ? 'Update Product' : 'Create Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminProductForm;
