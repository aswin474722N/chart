import { User } from '../models/User.js';
import { Product } from '../models/Product.js';
import { Order } from '../models/Order.js';

// Get dashboard stats
export const getDashboardStats = (req, res) => {
  try {
    const users = User.getAll();
    const products = Product.getAll();
    const orders = Order.getAll();

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const totalUsers = users.length;
    const totalProducts = products.length;

    const recentOrders = orders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    const topProducts = products
      .sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews))
      .slice(0, 5);

    res.json({
      stats: {
        totalRevenue,
        totalOrders,
        totalUsers,
        totalProducts
      },
      recentOrders,
      topProducts
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: error.message || 'Error fetching dashboard stats' });
  }
};

// Get all orders (Admin)
export const getAllOrders = (req, res) => {
  try {
    const { status, limit, offset } = req.query;
    let orders = Order.getAll();

    // Filter by status
    if (status) {
      orders = orders.filter(o => o.status === status);
    }

    // Sort by date (newest first)
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const total = orders.length;
    const start = parseInt(offset) || 0;
    const end = limit ? start + parseInt(limit) : orders.length;
    const paginatedOrders = orders.slice(start, end);

    res.json({
      orders: paginatedOrders,
      total,
      limit: parseInt(limit) || orders.length,
      offset: start
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: error.message || 'Error fetching orders' });
  }
};

// Update order status (Admin)
export const updateOrderStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }

    const order = Order.update(id, { status });
    res.json({ message: 'Order status updated', order });
  } catch (error) {
    console.error('Update order status error:', error);
    if (error.message === 'Order not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || 'Error updating order status' });
  }
};

// Get all users (Admin)
export const getAllUsers = (req, res) => {
  try {
    const users = User.getAll();
    // Remove passwords from response
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    res.json({ users: usersWithoutPasswords });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: error.message || 'Error fetching users' });
  }
};

