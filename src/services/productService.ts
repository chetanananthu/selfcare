import { Request, Response } from 'express';
import { Product } from '../models/product';
import { error } from 'console';

export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const products: Product[] = await Product.find();
        return products;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const getProductById = async (id: string): Promise<Product> => {
    try {
        const product = await Product.findOne({ id: id });
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}
