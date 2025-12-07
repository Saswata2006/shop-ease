const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true, // Include product details
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const qty = quantity ? parseInt(quantity) : 1;

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: parseInt(productId),
        },
      },
    });

    if (existingItem) {
      // Update quantity
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + qty },
        include: { product: true },
      });
      return res.json(updatedItem);
    }

    // Create new item
    const newItem = await prisma.cartItem.create({
      data: {
        userId,
        productId: parseInt(productId),
        quantity: qty,
      },
      include: { product: true },
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user.userId;

    // Ensure item belongs to user
    const item = await prisma.cartItem.findUnique({
      where: { id: parseInt(id) },
    });

    if (!item || item.userId !== userId) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: parseInt(id) },
      data: { quantity: parseInt(quantity) },
      include: { product: true },
    });

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Ensure item belongs to user
    const item = await prisma.cartItem.findUnique({
      where: { id: parseInt(id) },
    });

    if (!item || item.userId !== userId) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await prisma.cartItem.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};
