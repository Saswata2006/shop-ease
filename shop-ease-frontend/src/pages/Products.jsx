"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import "./Products.css"

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

  const itemsPerPage = 12

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      // Skip the API call and use mock data directly
      setProducts([
        {
          id: 1,
          title: "Premium Headphones",
          price: 149.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
          category: "electronics",
        },
        { id: 2, title: "Wireless Mouse", price: 49.99, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop", category: "electronics" },
        { id: 3, title: "USB-C Cable", price: 19.99, image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop", category: "accessories" },
        { id: 4, title: "Phone Stand", price: 24.99, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop", category: "accessories" },
        { id: 5, title: "Laptop Bag", price: 79.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop", category: "bags" },
        {
          id: 6,
          title: "Screen Protector",
          price: 14.99,
          image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
          category: "accessories",
        },
        { id: 7, title: "Desk Lamp", price: 59.99, image: "https://images.unsplash.com/photo-1565182999961-4989798f40e8?w=500&h=500&fit=crop", category: "electronics" },
        { id: 8, title: "Keyboard", price: 99.99, image: "https://images.unsplash.com/photo-1587829191301-4a1ff0aa0e69?w=500&h=500&fit=crop", category: "electronics" },
        { id: 9, title: "Webcam", price: 89.99, image: "https://images.unsplash.com/photo-1587593810167-31f35a9b4a2c?w=500&h=500&fit=crop", category: "electronics" },
        { id: 10, title: "Monitor Stand", price: 34.99, image: "https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=500&h=500&fit=crop", category: "accessories" },
        { id: 11, title: "Phone Case", price: 29.99, image: "https://images.unsplash.com/photo-1592286927505-1def25e85d54?w=500&h=500&fit=crop", category: "accessories" },
        { id: 12, title: "Charging Dock", price: 44.99, image: "https://images.unsplash.com/photo-1609042231298-612664531589?w=500&h=500&fit=crop", category: "accessories" },
      ])
      setError("")
    } catch (err) {
      setError("Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  const categories = ["all", "electronics", "accessories", "bags"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIdx, startIdx + itemsPerPage)

  const handleAddToCart = (product) => {
    alert(`${product.title} added to cart!`)
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Discover our curated collection of premium tech products</p>
      </div>

      <div className="products-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="search-input"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value)
            setCurrentPage(1)
          }}
          className="category-filter"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loading-skeleton">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-card"></div>
          ))}
        </div>
      ) : error && products.length === 0 ? (
        <div className="error-state">{error}</div>
      ) : paginatedProducts.length === 0 ? (
        <div className="empty-state">
          <p>No products found. Try adjusting your filters.</p>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image || "/placeholder.svg"} alt={product.title} />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <button className="btn btn-primary btn-small" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Products
