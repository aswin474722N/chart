import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/cartController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate); // All cart routes require authentication

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:productId', updateCartItem);
// Clear cart must come before :productId to avoid route conflict
router.delete('/clear', clearCart);
router.delete('/:productId', removeFromCart);

export default router;

