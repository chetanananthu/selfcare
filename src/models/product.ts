import mongoose, { Schema } from 'mongoose';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    inStock: boolean;
    color: string;
    averageRating: number;
    totalRatings: number;
    createdAt: Date;
    updatedAt: Date;
    brand: string;
    categorieId: string;
}


export const ProductSchema = new Schema<Product>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
    color: { type: String, required: true },
    averageRating: { type: Number, required: true, default: 0 },
    totalRatings: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
    brand: { type: String, required: true },
    categorieId: { type: String, required: true },
});

export const Product = mongoose.model<Product>('Product', ProductSchema);