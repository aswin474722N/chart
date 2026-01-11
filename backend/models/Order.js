import { readData, writeData } from '../config/database.js';

const ORDERS_FILE = 'orders.json';

export class Order {
  constructor({ id, userId, items, total, status, shippingAddress, paymentMethod, stripePaymentId, createdAt }) {
    this.id = id;
    this.userId = userId;
    this.items = items; // Array of { productId, name, price, quantity, image }
    this.total = total;
    this.status = status || 'pending'; // pending, processing, shipped, delivered, cancelled
    this.shippingAddress = shippingAddress;
    this.paymentMethod = paymentMethod;
    this.stripePaymentId = stripePaymentId;
    this.createdAt = createdAt || new Date().toISOString();
  }

  // Get all orders
  static getAll() {
    return readData(ORDERS_FILE);
  }

  // Find order by ID
  static findById(id) {
    const orders = readData(ORDERS_FILE);
    return orders.find(o => o.id === id);
  }

  // Find orders by user ID
  static findByUserId(userId) {
    const orders = readData(ORDERS_FILE);
    return orders.filter(o => o.userId === userId);
  }

  // Create new order
  static create(orderData) {
    const orders = readData(ORDERS_FILE);
    
    const newOrder = {
      id: orderData.id || `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: orderData.userId,
      items: orderData.items,
      total: orderData.total,
      status: orderData.status || 'pending',
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      stripePaymentId: orderData.stripePaymentId,
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);
    writeData(ORDERS_FILE, orders);
    return newOrder;
  }

  // Update order
  static update(id, updates) {
    const orders = readData(ORDERS_FILE);
    const index = orders.findIndex(o => o.id === id);
    
    if (index === -1) {
      throw new Error('Order not found');
    }

    orders[index] = { ...orders[index], ...updates };
    writeData(ORDERS_FILE, orders);
    return orders[index];
  }

  // Delete order
  static delete(id) {
    const orders = readData(ORDERS_FILE);
    const filtered = orders.filter(o => o.id !== id);
    writeData(ORDERS_FILE, filtered);
    return true;
  }
}

