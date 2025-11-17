import { Router } from "express";
import { createUserController, loginUser } from "../controllers/userController";

export const userRouter=Router();


userRouter.post("/signup",createUserController);
userRouter.post("/login",loginUser);
