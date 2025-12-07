const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controller/productController');

const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

router.get('/', verifyToken, getAllProducts);
router.get('/:id', verifyToken, getProductById);
router.post('/', verifyToken, verifyAdmin, createProduct);
router.put('/:id', verifyToken, verifyAdmin, updateProduct);
router.delete('/:id', verifyToken, verifyAdmin, deleteProduct);

module.exports = router;
