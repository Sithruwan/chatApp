import { IMessageRepo, IUserRepo } from "../types/index.mjs";
import * as messageRepo from "../repos/MessageRepo.mjs";
import * as userRepo from "../repos/UserRepo.mjs";
import { Sequelize } from "sequelize";
import { sequelize } from "../configs/database.mjs";

export class MessageService {
    private static instance: MessageService;
    private messageRepo: IMessageRepo; // Replace with the actual type of your message repository
    private userRepo: IUserRepo; // Replace with the actual type of your user repository
    private sequelize: Sequelize; // Replace with the actual type of your Sequelize instance


    private constructor(messageRepo: IMessageRepo, userRepo: IUserRepo, sequelize: Sequelize) {
        this.messageRepo = messageRepo;
        this.userRepo = userRepo;
        this.sequelize =  sequelize// Replace with your actual Sequelize instance
    }



    static getInstance(): MessageService {
        if (!MessageService.instance) {
            MessageService.instance = new MessageService(
                messageRepo,
                userRepo,
                sequelize
            );
        }
        return MessageService.instance;
    }

    async getAllMessages() {
        const messages = await this.messageRepo.getAllMessages();
        return messages.map((message) => message.get({ plain: true }));
    }

    async createMessage(content: string, userId: number) {
        const session = await this.sequelize.transaction();
        try {

            const message = await this.messageRepo.createMessage(content, userId);

            

            await session.commit();

            const newMessage = await this.messageRepo.getMessageById(message.id);

            return newMessage!.get({ plain: true });
            
            
        } catch (error) {
            await session.rollback();
            throw error; // Rethrow the error to be handled by the caller
            
        }
    }
}