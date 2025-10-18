import express from 'express';
import { createProduct, deleteProductById, getAllProducts, getProductById } from '../controllers/productController';

const productRouter = express.Router();

productRouter.get('/getAllProducts', getAllProducts);
productRouter.get('/getProduct/:id', getProductById);
productRouter.post('/createProduct',createProduct);
productRouter.delete('/deleteProduct/:id',deleteProductById);

export default productRouter;
