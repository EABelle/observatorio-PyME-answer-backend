import {NextFunction, Request, Response} from 'express';
import {User} from '../domain/User';

export interface RequestUser extends User {
    userToken: string;
}

export interface CustomRequest extends Request {
    user: RequestUser;
    files: any;
}

export const asyncHandler = (fn: Function) =>
    (req: Request, res: Response , next: NextFunction) =>
        Promise
            .resolve(fn(req, res, next))
            .catch(next);
