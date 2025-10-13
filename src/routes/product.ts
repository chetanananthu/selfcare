import express from 'express';
import { createProduct, getAllProducts, getProductById } from '../controllers/productController';

const productRouter = express.Router();

productRouter.get('/getAllProducts', getAllProducts);
productRouter.get('/getProduct/:id', getProductById);
productRouter.post('/createProduct',createProduct);

export default productRouter;
