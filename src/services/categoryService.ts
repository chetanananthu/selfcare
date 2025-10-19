import { Category, CategoryModel } from "../models/category";

export const getAllCategory = async (): Promise<Category[]> => {
    const categories = await CategoryModel.find();

    if (!categories || categories.length === 0) {
        throw new Error("There are no categories");
    }

    return categories;
};

export const getCategoryById = async (id: string): Promise<Category> => {
    const category = await CategoryModel.findOne({ id: id });
    if (!category) {
        throw new Error("Category not found with the given ID");
    }
    return category;
};


export const deleteCategoryById = async (id: string): Promise<string> => {
    const category = await CategoryModel.findOne({ id: id });
    if (!category) {
        throw new Error("Category not found with the given ID");
    }
    await CategoryModel.deleteOne({ id: id });
    return "Category deleted successfully";
};


export const createCategory = async (data: Category): Promise<Category> => {
    // ✅ Validation
    if (!data.name || data.name.trim() === "") {
        throw new Error("Category name is required");
    }

    //  Check for duplicate category name
    const existingCategory = await CategoryModel.findOne({ name: data.name });
    if (existingCategory) {
        throw new Error("Category with this name already exists");
    }

    // Create category
    const category = new CategoryModel(data);

    await category.save();
    return category;
};