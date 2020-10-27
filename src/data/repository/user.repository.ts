import {UserModel} from '../../core/model/user.model';
import {User} from '../../core/domain/User';
import {UserPayload} from '../../api/contract';

export class UserRepository {

    static getAll(): Promise<User[]> {
        return UserModel.find({});
    }

    static async getById(id: string): Promise<User> {
        const user = await UserModel.findOne({_id: id});
        return user?.toObject();
    }

    static async create(userPayload: UserPayload): Promise<User> {
        const userModel = new UserModel(userPayload);
        return await userModel.save();
    }

    static async update(id: string, payload: UserPayload): Promise<User | null> {
        return new Promise(async (resolve, reject) => {
            await UserModel.update({_id: id}, payload, (err: Error, response: any) => {
                if (err) {
                    reject(err);
                }
                // @ts-ignore
                resolve(response.n ? {_id: id, ...payload} : null);
            });
        });
    }

    static async delete(id: string): Promise<number> {
        const { deletedCount } = await UserModel.deleteOne({_id: id});
        return deletedCount;
    }

    static async getByEmail(email: String): Promise<User> {
        const user = await UserModel.findOne({email});
        return user?.toObject();
    }
}
