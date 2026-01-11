import { Product } from '../models/Product.js';

// Get all products
export const getAllProducts = (req, res) => {
  try {
    const { category, subcategory, search, limit, offset } = req.query;
    let products = Product.getAll();

    // Filter by category
    if (category) {
      products = products.filter(p => p.category === category);
    }

    // Filter by subcategory
    if (subcategory) {
      products = products.filter(p => p.subcategory === subcategory);
    }

    // Search
    if (search) {
      products = Product.search(search);
    }

    // Pagination
    const total = products.length;
    const start = parseInt(offset) || 0;
    const end = limit ? start + parseInt(limit) : products.length;
    const paginatedProducts = products.slice(start, end);

    res.json({
      products: paginatedProducts,
      total,
      limit: parseInt(limit) || products.length,
      offset: start
    });
  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({ message: error.message || 'Error fetching products' });
  }
};

// Get product by ID
export const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Get product by ID error:', error);
    res.status(500).json({ message: error.message || 'Error fetching product' });
  }
};

// Create product (Admin only)
export const createProduct = (req, res) => {
  try {
    const product = Product.create(req.body);
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: error.message || 'Error creating product' });
  }
};

// Update product (Admin only)
export const updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const product = Product.update(id, req.body);
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Update product error:', error);
    if (error.message === 'Product not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || 'Error updating product' });
  }
};

// Delete product (Admin only)
export const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    Product.delete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: error.message || 'Error deleting product' });
  }
};

