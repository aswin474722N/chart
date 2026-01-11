import { User } from '../models/User.js';
import { Product } from '../models/Product.js';

// Get user cart
export const getCart = (req, res) => {
  try {
    const user = User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ cart: user.cart || [] });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: error.message || 'Error fetching cart' });
  }
};

// Add item to cart
export const addToCart = (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const user = User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const cart = user.cart || [];
    const existingItemIndex = cart.findIndex(item => item.productId === productId);

    if (existingItemIndex >= 0) {
      // Update quantity
      cart[existingItemIndex].quantity += quantity;
      if (cart[existingItemIndex].quantity > product.stock) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
    } else {
      // Add new item
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }

    User.update(user.id, { cart });
    res.json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: error.message || 'Error adding to cart' });
  }
};

// Update cart item quantity
export const updateCartItem = (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const user = User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const product = Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const cart = user.cart || [];
    const itemIndex = cart.findIndex(item => item.productId === productId);

    if (itemIndex < 0) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart[itemIndex].quantity = quantity;
    User.update(user.id, { cart });
    res.json({ message: 'Cart item updated', cart });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({ message: error.message || 'Error updating cart item' });
  }
};

// Remove item from cart
export const removeFromCart = (req, res) => {
  try {
    const { productId } = req.params;
    const user = User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cart = user.cart || [];
    const filteredCart = cart.filter(item => item.productId !== productId);

    User.update(user.id, { cart: filteredCart });
    res.json({ message: 'Item removed from cart', cart: filteredCart });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: error.message || 'Error removing from cart' });
  }
};

// Clear cart
export const clearCart = (req, res) => {
  try {
    const user = User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    User.update(user.id, { cart: [] });
    res.json({ message: 'Cart cleared', cart: [] });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: error.message || 'Error clearing cart' });
  }
};

