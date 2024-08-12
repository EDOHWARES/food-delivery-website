import express from 'express';
import authMiddleWare from '../middleware/auth.js';
import { placeOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleWare, placeOrder);

export default orderRouter;