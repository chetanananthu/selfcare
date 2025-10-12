import { Request, Response } from 'express';
import * as productService from '../services/productService';
import { Product } from '../models/product';

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products: Product[] = await productService.getAllProducts();

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        return res.status(200).json(products);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await productService.getProductById(id);

        return res.status(200).json(product);
    } catch (error: any) {
        if (error.message === 'Product not found') {
            return res.status(404).json({ message: error.message });
        }

        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
