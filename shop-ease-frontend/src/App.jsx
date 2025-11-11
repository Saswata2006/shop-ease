"use client"

import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/SignUp.jsx"
import Products from "./pages/Products.jsx"
import Order from "./pages/Order.jsx"
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
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/" element={<Products />} />
      </Routes>
    </div>
  )
}

export default App
