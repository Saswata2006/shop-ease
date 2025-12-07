"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "./Navbar.css"

import logo from "../assets/shop-ease-logo.png"

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const isActive = (path) => (location.pathname === path ? "active" : "")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsAuthenticated(false)
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="ShopEase Logo" className="brand-logo" />
          <span className="brand-text">ShopEase</span>
        </Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/products" className={`nav-link ${isActive("/products")}`} onClick={() => setMenuOpen(false)}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/cart" className={`nav-link ${isActive("/cart")}`} onClick={() => setMenuOpen(false)}>
              Cart
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link to="/orders" className={`nav-link ${isActive("/orders")}`} onClick={() => setMenuOpen(false)}>
                Orders
              </Link>
            </li>
          )}
          {isAuthenticated && user.role === 'admin' && (
            <li>
              <Link to="/admin" className={`nav-link ${isActive("/admin")}`} onClick={() => setMenuOpen(false)}>
                Admin
              </Link>
            </li>
          )}
          <li>
            {isAuthenticated ? (
              <button
                className="nav-link logout-btn"
                onClick={() => {
                  handleLogout()
                  setMenuOpen(false)
                }}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className={`nav-link ${isActive("/login")}`} onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
