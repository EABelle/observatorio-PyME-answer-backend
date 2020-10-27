import {RoleRepository} from '../../data/repository/role.repository';
import {Role} from '../domain/Role';
import {RolePayload} from '../../api/contract';

export class RoleService {

    static getRoles(): Promise<Role[]> {
        return RoleRepository.getAll();
    }

    static getRole(id: string): Promise<Role> {
        return RoleRepository.getById(id);
    }

    static async createRole(rolePayload: RolePayload): Promise<Role> {
        return await RoleRepository.create(rolePayload);
    }

    static async updateRole(id: string, rolePayload: RolePayload): Promise<Role | null> {
        return await RoleRepository.update(id, rolePayload);
    }

    static async deleteRole(id: string): Promise<number> {
        return await RoleRepository.delete(id);
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
