import { Response, Request } from "express";
import { Category, CategoryModel } from "../models/category";
import * as categoryService from '../services/categoryService';

export const getAllCategory = async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getAllCategory();

        return res.status(200).json({
            categories: categories
        });
    } catch (error: any) {
        if (error.message === "There are no categories") {
            return res.status(404).json({ message: error.message });
        }

        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const category = await categoryService.getCategoryById(id);
        return res.status(200).json({ category });
    } catch (error: any) {
        if (error.message === "Category not found with the given ID") {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const deleteCategoryById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const message = await categoryService.deleteCategoryById(id);
        return res.status(200).json({ message });
    } catch (error: any) {
        if (error.message === "Category not found with the given ID") {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const createCategory = async (req: Request, res: Response) => {
    try {
        const { id, name, description } = req.body;

        const Category = new CategoryModel(
            {
                id: id,
                name: name,
                description: description
            }
        )
        const category = await categoryService.createCategory(Category);

        return res.status(201).json({
            message: "Category created successfully",
            category
        });
    } catch (error: any) {
        if (
            error.message === "Category name is required" ||
            error.message === "Category with this name already exists"
        ) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};