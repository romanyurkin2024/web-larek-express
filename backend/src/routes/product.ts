import { Router } from 'express';
import { validateObjId, validateProductBody, validateProductUpdateBody } from '../middlewares/validatons';
import { changeProductById, createProduct, getProducts } from '../controllers/products';

const router = Router();

router.get('/', getProducts);
router.post('/', validateProductBody, createProduct);
router.patch('/:id', validateObjId, validateProductUpdateBody, changeProductById);

export default router;
