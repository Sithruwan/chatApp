// controllers/UserController.mts
import { Request, Response, RequestHandler } from 'express';
import { UserService } from "../services/UserService.mjs";
import { userService } from '../server.mjs';

export class UserController {
    private static instance: UserController;
    private userService: UserService;

    private constructor(userService: UserService) {
        this.userService = userService;
    }

    public static getInstance(): UserController {
        if (!UserController.instance) {
            UserController.instance = new UserController(userService);
        }
        return UserController.instance;
    }

    public findOrCreateUser: RequestHandler = async (req:Request, res:Response) => {
        const { username } = req.body;
        try {
            console.log("Username:", username);
            const user = await this.userService.findOrCreateUser(username);
             res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    public getUserById: RequestHandler = async (req:Request, res:Response) => {
        const { id } = req.params;
        try {
            const user = await this.userService.getUserById(Number(id));
            if (user) {
                 res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
             res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}