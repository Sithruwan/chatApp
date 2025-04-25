import { Router } from "express";
import { Request, Response } from "express";
import { MessageController } from "../controllers/MessageController.mjs";
export const createMessageRouter = (messageController: MessageController) => {
    const messageRouter = Router();
    
    messageRouter.post("/create", messageController.createMessage);
    //messageRouter.get("/:id", messageController.getMessageById);
    messageRouter.get("/", messageController.getMessages);

    messageRouter.get("/test", (req:Request,res:Response)=>{
            console.log("tested....")
            res.status(200).json({message:"Welcome to User API"});
        }); // Assuming you want to handle GET requests as well
    
    return messageRouter;
}