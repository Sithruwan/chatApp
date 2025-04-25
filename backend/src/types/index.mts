import MessageModel from "../models/MessageModel.mjs";
import  UserModel from "../models/UserModel.mjs";

export interface User {
    id?:number;
    name:string;
    createdAt? : Date;
    updatedAt?: Date;
}

export interface Message {
    id?:number;
    content:string;
    userId:number;
    createdAt? : Date;
    updatedAt?: Date;
    user?: User;
}



export interface IUserRepo {
    findOrCreateUser(username: string): Promise<any>;
    getUserById(id: number): Promise<UserModel | null>;
}

export interface IMessageRepo {
    getAllMessages(): Promise<MessageModel[]>;
    createMessage(content: string, userId: number): Promise<MessageModel>;
    getMessageById(id: number): Promise<MessageModel | null>;
}
