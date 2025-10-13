import { Request, Response } from "express";
import { Product, ProductModel } from "../models/product";
import { error } from "console";

export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const products: Product[] = await ProductModel.find();
        return products;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getProductById = async (id: string): Promise<Product> => {
    try {
        const product = await ProductModel.findOne({ id: id });
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const createProduct = async (product: Product) => {
    const errors: string[] = [];

    if (!product.name || product.name.trim() === "") {
        errors.push("Product name is mandatory.");
    }

    if (!product.description || product.description.trim() === "") {
        errors.push("Description is required.");
    }

    if (product.price === undefined || product.price < 0) {
        errors.push("Price should be greater than 0.");
    }

    if (product.inStock === undefined) {
        errors.push("inStock is a mandatory field.");
    }

    if (!product.brand || product.brand.trim() === "") {
        errors.push("Brand is mandatory.");
    }
    if (errors.length > 0) {
        throw { status: 400, errors };
    }
    const newProduct = new ProductModel(product);
    return await newProduct.save();
};



export const deleteProductById = async (id:string)=>{
    const product = await ProductModel.findOne({id:id});
    if(!product){
        throw new Error("Product not found");
    }
    return ProductModel.findOneAndDelete({id:id});
}
