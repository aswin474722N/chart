export const validateSignup = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ message: 'Name must be at least 2 characters long' });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  next();
};

export const validateProduct = (req, res, next) => {
  const { name, description, price, image, category, subcategory, stock } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ message: 'Product name is required and must be at least 2 characters' });
  }

  if (!description || description.trim().length < 10) {
    return res.status(400).json({ message: 'Product description is required and must be at least 10 characters' });
  }

  if (!price || isNaN(price) || price <= 0) {
    return res.status(400).json({ message: 'Valid price is required' });
  }

  if (!image || !image.trim()) {
    return res.status(400).json({ message: 'Product image URL is required' });
  }

  if (!category || !['gadgets', 'home-appliances'].includes(category)) {
    return res.status(400).json({ message: 'Valid category is required (gadgets or home-appliances)' });
  }

  if (!subcategory || !subcategory.trim()) {
    return res.status(400).json({ message: 'Subcategory is required' });
  }

  if (stock === undefined || isNaN(stock) || stock < 0) {
    return res.status(400).json({ message: 'Valid stock quantity is required' });
  }

  next();
};

