import {UserService} from './user.service';
import CacheService from '../../core/services/CacheService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../../core/domain/User';

const ONE_DAY = 86400;

export class LoginService {

    static async login(userName: string, password: string) {

        const user: User = await UserService.getUserByEmail(userName);

        const userFromCache = await CacheService.getUserFromCacheById(user._id);
        if (userFromCache) {
            return userFromCache.userToken;
        }

        const passwordIsValid = bcrypt.compareSync(user.password, password);
        if (!passwordIsValid) { throw Error('Invalid username/password'); }

        const permissions = UserService.getPermissions(user);

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
