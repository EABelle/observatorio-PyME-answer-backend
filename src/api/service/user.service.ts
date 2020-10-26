import {User} from '../../core/domain/User';
import {UserRepository} from '../repository/user.repository';
import {UserPayload} from '../contract';
import {RoleService} from './role.service';
import bcrypt from 'bcryptjs';

export class UserService {
    static async createUser(userPayload: UserPayload): Promise<User> {
        const hashedUserPayload = {
            ...userPayload,
            password: bcrypt.hashSync(userPayload.password, 8)
        };
        return await UserRepository.create(hashedUserPayload);
    }

    static getUserByEmail(email: string): Promise<User> {
        return UserRepository.getByEmail(email);
    }

    static getPermissions(user: User): Promise<string[]> {
        return RoleService.getPermissionsByRoles(user.roles);
    }
}
