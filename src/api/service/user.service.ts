import {User} from '../../core/domain/User';
import {UserRepository} from '../repository/user.repository';
import {UserPayload} from '../contract';

export class UserService {
    static async createUser(userPayload: UserPayload): Promise<User> {
        return await UserRepository.create(userPayload);
    }
}
