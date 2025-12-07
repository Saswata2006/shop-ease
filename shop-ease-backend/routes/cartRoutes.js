const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require('../controller/cartController');
const { verifyToken } = require('../middleware/authMiddleware');

// All cart routes require authentication
router.get('/', verifyToken, getCart);
router.post('/', verifyToken, addToCart);
router.put('/:id', verifyToken, updateCartItem);
router.delete('/:id', verifyToken, removeFromCart);

module.exports = router;
