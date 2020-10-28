import {UserService} from './UserService';
import CacheService from './CacheService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../domain/User';

const ONE_DAY = 86400;

export class LoginService {

    static async login(userName: string, password: string) {

        const user: User = await UserService.getUserByEmail(userName);

        const userFromCache = await CacheService.getUserFromCacheById(user._id);
        if (userFromCache) {
            return userFromCache.userToken;
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) { throw Error('Invalid username/password'); }

        const permissions = await UserService.getPermissions(user);

        const userToken = jwt.sign({
            id: user._id,
            permissions, // @ts-ignore
        }, process.env.SECRET, {
            expiresIn: ONE_DAY,
        });

        await CacheService.saveUserToCache(userToken, user);
        return userToken;
    }
}
