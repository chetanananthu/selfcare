import { Request, Response } from "express"
import * as userService from "../services/userService";

export const createUserController = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);

        res.status(201).json({
            message: "User created successfully",
        });
    } catch (error: any) {
        res.status(400).json({
            message: error.message || "Failed to create user",
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try{
        const {email,password} = req.body;
        const results=await userService.loginUser(email,password);
        return res.status(200).json(results);
    }
    catch(err : any){
        return res.status(500).json({message: err.message || "Login failed"});
    }
}
