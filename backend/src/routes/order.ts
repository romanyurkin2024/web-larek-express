import { Router } from 'express';
import { validateOrderBody } from '../middlewares/validatons';
import createOrder from '../controllers/orders';

const router = Router();

router.post('/', validateOrderBody, createOrder);

export default router;
