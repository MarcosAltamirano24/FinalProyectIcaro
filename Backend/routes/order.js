import express from 'express';
import {
  createOrder,
  getUserOrders,
  deleteOrder,
  completeOrder,
} from '../controllers/orderController.js';
import { isAuthenticated, isNotAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', isAuthenticated, isNotAdmin, createOrder);
router.get('/', isAuthenticated, getUserOrders);
router.delete('/:orderId', isAuthenticated, deleteOrder);
router.put('/:orderId/complete', isAuthenticated, completeOrder);

export default router;
