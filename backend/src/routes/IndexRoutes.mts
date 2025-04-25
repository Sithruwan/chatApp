import { Router } from "express";
import { UserController } from "../controllers/UserController.mjs"; // Adjust the import path as necessary
import { createUserRouter } from "./UserRoutes.mjs";
import { createMessageRouter } from "./MessageRoutes.mjs";
import { messageController } from "../server.mjs";

export const createIndexRouter = (userController: UserController) => {
    const indexRouter = Router();

    // Define your routes here
    // indexRouter.post("/findOrCreate", userController.findOrCreateUser);
    // indexRouter.get("/user/:id", userController.getUserById);
    indexRouter.use('/user',createUserRouter(userController)); // Use the user router for user-related routes
    indexRouter.use('/chat',createMessageRouter(messageController));

    return indexRouter;
}