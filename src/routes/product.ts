import express from 'express';
import { getAllProducts, getProductById } from '../controllers/productController';

const productRouter = express.Router();

productRouter.get('/getAllProducts', getAllProducts);
productRouter.get('/getProduct/:id', getProductById);

export default productRouter;
