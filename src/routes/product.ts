import express from 'express';
import { createProduct, deleteProductById, getAllProducts, getProductById, getProductsByCategoryId } from '../controllers/productController';

const productRouter = express.Router();

productRouter.get('/getAllProducts', getAllProducts);
productRouter.get('/getProduct/:id', getProductById);
productRouter.post('/createProduct', createProduct);
productRouter.delete('/deleteProduct/:id', deleteProductById);
productRouter.get('/products/category/:categoryId', getProductsByCategoryId);

export default productRouter;
