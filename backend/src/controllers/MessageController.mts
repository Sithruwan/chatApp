import { messageService } from "../server.mjs";
import { MessageService } from "../services/MessageService.mjs";
import { Request, Response, RequestHandler } from 'express';

export class MessageController {
    private static instance : MessageController
    private messageService : MessageService


    public static getInstance(): MessageController {
        if (!MessageController.instance) {
            MessageController.instance = new MessageController(messageService);
        }
        return MessageController.instance;
    }

    private constructor(messageService:MessageService){
        this.messageService = messageService;
    }

    public getMessages : RequestHandler = async (req:Request, res:Response) => {
        try {
            const messages = await this.messageService.getAllMessages();
            res.status(200).json(messages);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public createMessage : RequestHandler = async (req:Request, res:Response) => {
        const {content , userId} = req.body;
        try {
            const messages = await this.messageService.createMessage(content, userId);
            res.status(200).json(messages);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}