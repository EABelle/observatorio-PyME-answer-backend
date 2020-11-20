import {NextFunction, Response, Request} from 'express';
import {UserService} from '../../core/service/UserService';
import {User} from '../../core/domain/User';
import {UserPayload, UserResponse} from '../contract';
import {validationResult} from 'express-validator';
import {transformUser, transformList} from '../../core/transformer/userTransformer';
import {CustomRequest} from '../../core/middlewares/utils';

export class UserController {

    public static async getUsers(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const users: User[] = await UserService.getUsers(req.query);
            const usersResponse: UserResponse[] = transformList(users);
          return res.json(usersResponse);
        } catch (e) {
          return next(new Error(e.message));
        }
    }

    public static async getUser(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id: string = req.params.id;
        try {
            const user: User = await UserService.getUser(id);
            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }
            const response: UserResponse = transformUser(user);
            return res.json(response);
        } catch (e) {
            return next(new Error(e.message));
        }
    }

    public static async getMyUser(req: CustomRequest, res: Response, next: NextFunction) {
        const id: string = req.user._id;
        try {
            const user: User = await UserService.getUser(id);
            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }
            const response: UserResponse = transformUser(user);
            return res.json(response);
        } catch (e) {
            return next(new Error(e.message));
        }
    }

    public static async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const userRequest: UserPayload = req.body;
            const user: User = await UserService.createUser(userRequest);
            const userResponse: UserResponse = transformUser(user);
          return res.json(userResponse);
        } catch (e) {
          return next(new Error(e.message));
        }
    }

    public static async invite(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const userRequest: UserPayload = req.body;
            const user: User = await UserService.createUserByInvitation(userRequest);
            const userResponse: UserResponse = transformUser(user);
            return res.json(userResponse);
        } catch (e) {
            return next(new Error(e.message));
        }
    }

    public static async updateUser(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        const userRequest: UserPayload = req.body;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id: string = req.params.id;
        try {
            const user: User | null = await UserService.updateUser(id, userRequest);
            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }
            const userResponse: UserResponse = transformUser(user);
            return res.json(userResponse);
        } catch (e) {
            return next(new Error(e.message));
        }
    }

    public static async confirmUser(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        const userRequest: { password: string } = req.body;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id: string = req.params.id;
        try {
            const token: string = await UserService.confirmUser(id, userRequest);
            return res.send(token);
        } catch (e) {
            return next(new Error(e.message));
        }
    }

    public static async deleteUser(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id: string = req.params.id;
        try {
            const deleteCount: number = await UserService.deleteUser(id);
            if (!deleteCount) {
                return res.status(404).json({message: 'user not found to delete'});
            }
            return res.json({message: `deleted`});
        } catch (e) {
            return next(new Error(e.message));
        }
    }
}
