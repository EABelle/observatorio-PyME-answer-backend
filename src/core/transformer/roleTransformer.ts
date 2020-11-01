import {RoleResponse} from '../../api/contract';
import {Role} from '../domain/Role';

export function transform(role: Role): RoleResponse {
    return {
        id: role._id,
        name: role.name,
        permissions: role.permissions
    };
}

export function transformRolesList(roles: Role[]): RoleResponse[] {
    return roles.map(role => transform(role));
}
