import CacheService from '../services/CacheService';
import {NextFunction, Response} from 'express';
import {CustomRequest} from './utils';

const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const userToken = <string>req.headers.authorization;
        const user = await CacheService.getUserFromCacheBySecret(userToken);
        if (!user) {
            return res.sendStatus(401);
        }
        // @ts-ignore
        req.user = {user, userToken};
        return next();
    } catch (e) {
        return res.sendStatus(401);
    }
};

export default authMiddleware;
