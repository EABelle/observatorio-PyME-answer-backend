import {RoleModel} from '../../core/model/role.model';
import {Role} from '../../core/domain/Role';
import {RolePayload} from '../../api/contract';

export class RoleRepository {
    static async create(rolePayload: RolePayload): Promise<Role> {
        const roleModel = new RoleModel(rolePayload);
        return await roleModel.save();
    }

    static async getPermissionsByName(name: String): Promise<string[]> {
        const role = await RoleModel.findOne({name});
        return role.toObject().permissions;
    }
}
