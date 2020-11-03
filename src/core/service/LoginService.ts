import {UserService} from './UserService';
import CacheService from './CacheService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../domain/User';

const ONE_DAY = 86400;

const USR_INVALID_CREDENTIALS = new Error();
USR_INVALID_CREDENTIALS.name = 'USR_INVALID_CREDENTIALS';
USR_INVALID_CREDENTIALS.message = 'Usuario o contraseña incorrectos';

export class LoginService {

    static async login(userName: string, password: string) {

        const user: User = await UserService.getUserByEmail(userName);
        if (!user) { throw USR_INVALID_CREDENTIALS; }

        if (user.confirmed) {
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) { throw USR_INVALID_CREDENTIALS; }
        }

        const permissions = await UserService.getPermissions(user);

        const userToken = jwt.sign({
            id: user._id,
            confirmed: user.confirmed,
            permissions, // @ts-ignore
        }, process.env.SECRET, {
            expiresIn: ONE_DAY,
        });

        await CacheService.saveUserToCache(userToken, user);
        return userToken;
    }
}
