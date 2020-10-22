import {NextFunction, Response, Request} from 'express';
import {UserService} from '../service/user.service';
import {User} from '../../core/domain/User';
import {UserPayload, UserResponse} from '../contract';
import {validationResult} from 'express-validator';
import {transform} from '../transformer/userTransformer';

export class UserController {

    public static async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const userRequest: UserPayload = req.body;
            const user: User = await UserService.createUser(userRequest);
            const userResponse: UserResponse = transform(user);
            res.json(userResponse);
        } catch (e) {
            next(new Error(e.message));
        }
    }
}
