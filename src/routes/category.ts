import { Router } from "express";
import { createCategory, deleteCategoryById, getAllCategory, getCategoryById } from "../controllers/categoryController";


const categoryRouter = Router();

categoryRouter.post('/createCategory', createCategory);
categoryRouter.get('/getAllCategories', getAllCategory);
categoryRouter.get('/category/:id', getCategoryById);
categoryRouter.delete('/category/:id', deleteCategoryById);

export default categoryRouter;