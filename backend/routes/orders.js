import express from 'express';
import {
  createPaymentIntent,
  createOrder,
  getUserOrders,
  getOrderById
} from '../controllers/orderController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate); // All order routes require authentication

router.post('/create-payment-intent', createPaymentIntent);
router.post('/', createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrderById);

export default router;

