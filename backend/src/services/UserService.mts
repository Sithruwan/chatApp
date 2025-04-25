// UserService.ts
import { findOrCreateUser, getUserById } from '../repos/UserRepo.mjs';
import { IUserRepo } from '../types/index.mjs';


export class UserService {
    private static instance: UserService;
    private userRepo: IUserRepo;

    private constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService({
                findOrCreateUser,
                getUserById,
            });
        }
        return UserService.instance;
    }

    findOrCreateUser = async (username: string) => {
        const {user, created} = await this.userRepo.findOrCreateUser(username);
        return user ? user.get({ plain: true }) : null;
      }

    getUserById = async  (id: number) =>{
        const user = await this.userRepo.getUserById(id);
        return user ? user.get({plain:true}) : null;
    }
}