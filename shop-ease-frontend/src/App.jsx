"use client"

import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/SignUp.jsx"
import Products from "./pages/Products.jsx"
import Order from "./pages/Order.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"
import AdminCreateProduct from "./pages/AdminCreateProduct.jsx"
import AdminEditProduct from "./pages/AdminEditProduct.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import Cart from "./pages/Cart.jsx"
import Home from "./pages/Home.jsx"
import "./App.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="app"><p>Loading...</p></div>
  }

  return (
    <div className="app">
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/products" element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <Products />
          </ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <Order />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/products/new" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminCreateProduct />
          </ProtectedRoute>
        } />
        <Route path="/admin/products/edit/:id" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminEditProduct />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App



