import express from 'express';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { verifyAccessToken } from '../middlewares/token-manager.js';

const router = express.Router();

router.post('/', verifyAccessToken, createProduct);
router.get('/', verifyAccessToken, getProducts);
router.get('/:id', verifyAccessToken, getProduct);
router.put('/:id', verifyAccessToken, updateProduct);
router.delete('/:id', verifyAccessToken, deleteProduct);

export default router;