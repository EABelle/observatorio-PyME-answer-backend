import {UserModel} from '../../core/model/user.model';
import {User} from '../../core/domain/User';
import {UserPayload} from '../../api/contract';

export class UserRepository {

    static getUsers(filter: any): Promise<User[]> {
        const { role, ...dbFilter } = filter;
        if (role) {
            dbFilter.roles = { $in: [role] };
        }
        return UserModel.find(dbFilter);
    }

    static async getById(id: string): Promise<User> {
        const user = await UserModel.findOne({_id: id});
        return user?.toObject();
    }

    static create(userPayload: UserPayload): Promise<User> {
        const userModel = new UserModel(userPayload);
        return userModel.save();
    }

    static async update(id: string, payload: UserPayload): Promise<User> {
        return new Promise(async (resolve, reject) => {
            await UserModel.update({_id: id}, { $set: payload }, async (err: Error, response: any) => {
                if (err) {
                    reject(err);
                }
                // @ts-ignore
                resolve(response.n ? (await this.getById(id)) : null);
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
