import CacheService from '../service/CacheService';
import {NextFunction, Response} from 'express';
import {asyncHandler, CustomRequest} from './utils';
import {UserService} from '../service/UserService';

const authMiddleware = (permission?: string) => async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const userToken = <string>req.headers.authorization;
        if (!userToken) {
            return res.sendStatus(401);
        }

        const user = await CacheService.getUserFromCacheBySecret(userToken);
        if (!user) {
            return res.sendStatus(401);
        }

        if (permission) {
            const userPermissions = await UserService.getPermissions(user);
            if (!userPermissions.find(p => p === permission)) {
                return res.sendStatus(403);
            }
        }

        // @ts-ignore
        req.user = {...user, userToken};
        return next();
    } catch (e) {
        return res.sendStatus(401);
    }
};

export default (permission?: string) => asyncHandler(authMiddleware(permission));
