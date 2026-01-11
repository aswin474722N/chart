import { readData, writeData } from '../config/database.js';

const PRODUCTS_FILE = 'products.json';

export class Product {
  constructor({ id, name, description, price, image, category, subcategory, stock, rating = 0, reviews = 0, brand, features = [] }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.category = category; // 'gadgets' or 'home-appliances'
    this.subcategory = subcategory; // 'mobile', 'laptop', 'watch', etc.
    this.stock = stock;
    this.rating = rating;
    this.reviews = reviews;
    this.brand = brand;
    this.features = features;
    this.createdAt = new Date().toISOString();
  }

  // Get all products
  static getAll() {
    return readData(PRODUCTS_FILE);
  }

  // Find product by ID
  static findById(id) {
    const products = readData(PRODUCTS_FILE);
    return products.find(p => p.id === id);
  }

  // Find products by category
  static findByCategory(category) {
    const products = readData(PRODUCTS_FILE);
    return products.filter(p => p.category === category);
  }

  // Find products by subcategory
  static findBySubcategory(subcategory) {
    const products = readData(PRODUCTS_FILE);
    return products.filter(p => p.subcategory === subcategory);
  }

  // Search products
  static search(query) {
    const products = readData(PRODUCTS_FILE);
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.brand?.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.subcategory.toLowerCase().includes(lowerQuery)
    );
  }

  // Create new product
  static create(productData) {
    const products = readData(PRODUCTS_FILE);
    
    const newProduct = {
      id: productData.id || `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: productData.name,
      description: productData.description,
      price: productData.price,
      image: productData.image,
      category: productData.category,
      subcategory: productData.subcategory,
      stock: productData.stock || 0,
      rating: productData.rating || 0,
      reviews: productData.reviews || 0,
      brand: productData.brand,
      features: productData.features || [],
      createdAt: new Date().toISOString()
    };

    products.push(newProduct);
    writeData(PRODUCTS_FILE, products);
    return newProduct;
  }

  // Update product
  static update(id, updates) {
    const products = readData(PRODUCTS_FILE);
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new Error('Product not found');
    }

    products[index] = { ...products[index], ...updates };
    writeData(PRODUCTS_FILE, products);
    return products[index];
  }

  // Delete product
  static delete(id) {
    const products = readData(PRODUCTS_FILE);
    const filtered = products.filter(p => p.id !== id);
    writeData(PRODUCTS_FILE, filtered);
    return true;
  }
}

