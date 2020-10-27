import {User} from '../domain/User';
import {UserRepository} from '../../data/repository/user.repository';
import {UserPayload} from '../../api/contract';
import {RoleService} from './RoleService';
import bcrypt from 'bcryptjs';

export class UserService {

    static getUsers(): Promise<User[]> {
        return UserRepository.getAll();
    }

    static getUser(id: string): Promise<User> {
        return UserRepository.getById(id);
    }

    static async createUser(userPayload: UserPayload): Promise<User> {
        const hashedUserPayload = {
            ...userPayload,
            password: bcrypt.hashSync(userPayload.password, 8)
        };
        return await UserRepository.create(hashedUserPayload);
    }

    static async updateUser(id: string, userPayload: UserPayload): Promise<User | null> {
        return await UserRepository.update(id, userPayload);
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
