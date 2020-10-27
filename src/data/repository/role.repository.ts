import {RoleModel} from '../../core/model/role.model';
import {Role} from '../../core/domain/Role';
import {RolePayload} from '../../api/contract';


export class RoleRepository {

    static getAll(): Promise<Role[]> {
        return RoleModel.find({});
    }

    static async getById(id: string): Promise<Role> {
        const role = await RoleModel.findOne({_id: id});
        return role?.toObject();
    }

    static async create(rolePayload: RolePayload): Promise<Role> {
        const roleModel = new RoleModel(rolePayload);
        return await roleModel.save();
    }

    static async update(id: string, payload: RolePayload): Promise<Role | null> {
        return new Promise(async (resolve, reject) => {
            await RoleModel.update({_id: id}, payload, (err: Error, response: any) => {
                if (err) {
                    reject(err);
                }
                // @ts-ignore
                resolve(response.n ? {_id: id, ...payload} : null);
            });
        });
    }

    static async delete(id: string): Promise<number> {
        const { deletedCount } = await RoleModel.deleteOne({_id: id});
        return deletedCount;
    }

    static async getPermissionsByName(name: String): Promise<string[]> {
        const role = await RoleModel.findOne({name});
        return role?.toObject().permissions;
    }
}
