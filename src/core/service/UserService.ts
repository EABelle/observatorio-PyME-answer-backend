import {User} from '../domain/User';
import {UserRepository} from '../../data/repository/user.repository';
import {UserPayload} from '../../api/contract';
import {RoleService} from './RoleService';
import bcrypt from 'bcryptjs';
import {EmailService} from './EmailService';
import jwt from 'jsonwebtoken';
import CacheService from './CacheService';
const ONE_DAY = 86400;

export class UserService {

    static getUsers(filter = {}): Promise<User[]> {
        return UserRepository.getUsers(filter);
    }

    static getUser(id: string): Promise<User> {
        return UserRepository.getById(id);
    }

    static async createUser(userPayload: UserPayload): Promise<User> {
        const hashedUserPayload = {
            ...userPayload,
            password: bcrypt.hashSync(<string>userPayload.password, 8),
            confirmed: true
        };
        return await UserRepository.create(hashedUserPayload);
    }

    static async createUserByInvitation(userPayload: UserPayload): Promise<User> {
        const hashedUserPayload = {
            ...userPayload,
            password: '',
            confirmed: false
        };
        const user: User = await UserRepository.create(hashedUserPayload);
        return await EmailService.sendInvitation(user);
    }

    static async updateUser(id: string, userPayload: UserPayload): Promise<User | null> {
        return await UserRepository.update(id, userPayload);
    }

    static async confirmUser(id: string, userPayload: { password: string }): Promise<string> {
        const { password } = userPayload;
        const user: User = await UserRepository.update(id, {
            password: bcrypt.hashSync(<string>password, 8),
            confirmed: true
        });
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

    static async deleteUser(id: string): Promise<number> {
        return await UserRepository.delete(id);
    }

    static getUserByEmail(email: string): Promise<User> {
        return UserRepository.getByEmail(email);
    }

    static getPermissions(user: User): Promise<string[]> {
        return RoleService.getPermissionsByRoles(user.roles);
    }
}
