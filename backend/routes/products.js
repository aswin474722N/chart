import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';
import { validateProduct } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authenticate, isAdmin, validateProduct, createProduct);
router.put('/:id', authenticate, isAdmin, validateProduct, updateProduct);
router.delete('/:id', authenticate, isAdmin, deleteProduct);

export default router;

