import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
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
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="products-container">
        <div className="products-header">
          <h1>Our Collection</h1>
          <p>Discover our latest arrivals and best sellers</p>
        </div>
        <div className="loading-skeleton">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="skeleton-card"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Our Collection</h1>
        <p>Discover our latest arrivals and best sellers</p>
      </div>

      <div className="products-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="category-filter"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home & Garden</option>
          <option value="books">Books</option>
          <option value="sports">Sports</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <p>No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=No+Image'}
                />
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <div className="product-price">${Number(product.price).toFixed(2)}</div>
                <button
                  className="btn-small"
                  onClick={() => {
                    const token = localStorage.getItem('token');
                    if (!token) {
                      alert('Please login to add items to cart.');
                      return;
                    }
                    const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");
                    axios.post(`${API_URL}/api/cart`, { productId: product.id, quantity: 1 }, {
                      headers: { Authorization: `Bearer ${token}` }
                    })
                      .then(() => alert('Added to cart!'))
                      .catch(err => {
                        console.error('Error adding to cart:', err);
                        alert('Failed to add to cart.');
                      });
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
