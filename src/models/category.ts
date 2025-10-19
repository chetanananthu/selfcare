import mongoose, { Mongoose, Schema } from "mongoose";

export interface Category extends Document {
    id: string,
    name: string,
    description: string;
}

const Category = new Schema<Category>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true }
});

export const CategoryModel = mongoose.model('Category', Category);