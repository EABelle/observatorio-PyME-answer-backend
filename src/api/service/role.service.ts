import {RoleRepository} from '../repository/role.repository';
import {Role} from '../../core/domain/Role';
import {RolePayload} from '../contract';

export class RoleService {
    static async createRole(rolePayload: RolePayload): Promise<Role> {
        return await RoleRepository.create(rolePayload);
    }

    static getPermissionsByName(roleName: string): Promise<string[]> {
        return RoleRepository.getPermissionsByName(roleName);
    }

    static async getPermissionsByRoles(roleNames: string[]): Promise<string[]> {
        const getPermissionsByRolesPromises: Promise<string[]>[] = roleNames.map(this.getPermissionsByName);
        const results: string[][] = await Promise.all(getPermissionsByRolesPromises);
        const flattenPermissions: string[] = Array.prototype.concat(...results);
        return [...new Set(flattenPermissions)];
    }
}
