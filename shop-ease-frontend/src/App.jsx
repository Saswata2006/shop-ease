"use client"

import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Products from "./pages/Products"
import Order from "./pages/Order"
import "./App.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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
