"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./Order.css"

function Order() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/orders`)
      setOrders(response.data)
    } catch (err) {
      setOrders([
        {
          id: 1,
          itemName: "Premium Headphones",
          quantity: 1,
          totalPrice: 149.99,
          status: "Delivered",
          date: "2024-11-05",
        },
        {
          id: 2,
          itemName: "Wireless Mouse",
          quantity: 2,
          totalPrice: 99.98,
          status: "In Transit",
          date: "2024-11-08",
        },
        {
          id: 3,
          itemName: "USB-C Cable",
          quantity: 3,
          totalPrice: 59.97,
          status: "Pending",
          date: "2024-11-10",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const getStatusClass = (status) => {
    return `status-${status.toLowerCase().replace(" ", "-")}`
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Your Orders</h1>
        <p>Track and manage your purchases</p>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner-large"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No Orders Yet</h2>
          <p>Start shopping to see your orders here</p>
          <button className="btn btn-primary" onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="orders-list">
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="order-row">
                    <td className="item-name">{order.itemName}</td>
                    <td className="quantity">{order.quantity}</td>
                    <td className="price">${order.totalPrice.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(order.status)}`}>{order.status}</span>
                    </td>
                    <td className="date">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="orders-footer">
            <button className="btn btn-primary" onClick={() => navigate("/products")}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Order
