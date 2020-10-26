import {UserModel} from '../../core/model/user.model';
import {User} from '../../core/domain/User';
import {UserPayload} from '../contract';

export class UserRepository {
    static async create(userPayload: UserPayload): Promise<User> {
        const userModel = new UserModel(userPayload);
        const user = await userModel.save();
        return user.toObject();
    }

    static async getByEmail(email: String): Promise<User> {
        const user = await UserModel.findOne({email});
        return user.toObject();
    }
}
