import { Request, Response } from "express";
import * as productService from "../services/productService";
import { Product } from "../models/product";
import { error } from "console";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products: Product[] = await productService.getAllProducts();

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        return res.status(200).json(products);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await productService.getProductById(id);

        return res.status(200).json(product);
    } catch (error: any) {
        if (error.message === "Product not found") {
            return res.status(404).json({ message: error.message });
        }

        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const createProduct = async (req: Request, res: Response) => {
    try {
        const product: Product = req.body;

        const newProduct = await productService.createProduct(product);

        return res.status(201).json({
            message: "Product created successfully",
            product: newProduct,
        });
    } catch (error: any) {
        return res.status(error.status || 500).json({
            message: error.message || "Failed to create product",
            errors: error.errors || [],
        });
    }
}


export const deleteProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const product = await productService.deleteProductById(id);
        return res.status(200).json({ message: "Product delted successfully" });
    }
    catch (err: any) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}


export const getProductsByCategoryId = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.categoryId;
        const Products = await productService.getProductsByCategoryId(categoryId);
        return res.status(200).json({
            products: Products
        })
    }
    catch (err: any) {
        if (err.message === "There is no product with given categoryId") {
            return res.status(404).json({
                message: err.message
            });
        }
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}



