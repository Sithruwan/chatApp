import Message from "../models/MessageModel.mjs";
import User from "../models/UserModel.mjs";

export const getAllMessages = async () => {
    const messages = await Message.findAll({
            include:[
                {
                    model : User,
                    as : 'user',
                    attributes :['id','name']
                }
            ],
            order : [['createdAt','ASC']]
    });

    return messages;
}

export const createMessage = async (content:string, userId:number) => {
    return await Message.create({
        content,
        userId
    });


}

export const getMessageById = async (id:number) => {
    return await Message.findByPk(id,{
        include:[
            {
                model : User,
                as : 'user',
                attributes :['id','name']
            }
        ]
    });
}
