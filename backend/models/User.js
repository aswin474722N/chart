import bcrypt from 'bcryptjs';
import { readData, writeData } from '../config/database.js';

const USERS_FILE = 'users.json';

export class User {
  constructor({ id, name, email, password, role = 'user', createdAt, cart = [] }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt || new Date().toISOString();
    this.cart = cart;
  }

  // Hash password before saving
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  // Compare password
  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  // Get all users
  static getAll() {
    return readData(USERS_FILE);
  }

  // Find user by ID
  static findById(id) {
    const users = readData(USERS_FILE);
    return users.find(u => u.id === id);
  }

  // Find user by email
  static findByEmail(email) {
    const users = readData(USERS_FILE);
    return users.find(u => u.email === email);
  }

  // Create new user
  static async create(userData) {
    const users = readData(USERS_FILE);
    
    // Check if user already exists
    if (User.findByEmail(userData.email)) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await User.hashPassword(userData.password);

    const newUser = {
      id: userData.id || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || 'user',
      createdAt: new Date().toISOString(),
      cart: []
    };

    users.push(newUser);
    writeData(USERS_FILE, users);
    return newUser;
  }

  // Update user
  static update(id, updates) {
    const users = readData(USERS_FILE);
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
      throw new Error('User not found');
    }

    users[index] = { ...users[index], ...updates };
    writeData(USERS_FILE, users);
    return users[index];
  }

  // Delete user
  static delete(id) {
    const users = readData(USERS_FILE);
    const filtered = users.filter(u => u.id !== id);
    writeData(USERS_FILE, filtered);
    return true;
  }

  // Get user without password
  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

