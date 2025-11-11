"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./Order.css"

function Order() {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  const getStatusClass = (status) => {
    return `status-${status.toLowerCase().replace(" ", "-")}`
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Your Orders</h1>
        <p>Track and manage your purchases</p>
      </div>

      {orders.length === 0 ? (
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
