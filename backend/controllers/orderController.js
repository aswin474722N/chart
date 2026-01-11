import { Order } from '../models/Order.js';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';
import Stripe from 'stripe';

// Initialize Stripe only if key is provided
let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  try {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  } catch (error) {
    console.warn('Stripe initialization failed:', error.message);
  }
}

// Create payment intent
export const createPaymentIntent = async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ message: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to .env file' });
    }

    const { items, shippingAddress } = req.body;
    const user = User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate total
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      orderItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: item.quantity
      });
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        userId: user.id,
        items: JSON.stringify(orderItems)
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      total,
      items: orderItems
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({ message: error.message || 'Error creating payment intent' });
  }
};

// Create order after successful payment
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, stripePaymentId } = req.body;
    const user = User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate total and validate items
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      orderItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: item.quantity
      });

      // Update product stock
      Product.update(product.id, { stock: product.stock - item.quantity });
    }

    // Create order
    const order = Order.create({
      userId: user.id,
      items: orderItems,
      total,
      status: 'processing',
      shippingAddress,
      paymentMethod,
      stripePaymentId
    });

    // Clear user cart
    User.update(user.id, { cart: [] });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: error.message || 'Error creating order' });
  }
};

// Get user orders
export const getUserOrders = (req, res) => {
  try {
    const orders = Order.findByUserId(req.user.id);
    res.json({ orders });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: error.message || 'Error fetching orders' });
  }
};

// Get order by ID
export const getOrderById = (req, res) => {
  try {
    const { id } = req.params;
    const order = Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order or is admin
    if (order.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ order });
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({ message: error.message || 'Error fetching order' });
  }
};

