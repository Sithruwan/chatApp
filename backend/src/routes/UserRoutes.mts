import { Router } from "express";
import { UserController } from "../controllers/UserController.mjs";
import { Request, Response } from "express";

export const createUserRouter = (userController: UserController) => {
    const userRouter = Router();

    userRouter.post("/create", userController.findOrCreateUser);
    userRouter.get("/:id", userController.getUserById);
    userRouter.get("/", (req:Request,res:Response)=>{
        console.log("tested....")
        res.status(200).json({message:"Welcome to User API"});
    }); // Assuming you want to handle GET requests as well

    return userRouter;
}
