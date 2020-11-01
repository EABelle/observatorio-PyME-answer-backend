import {UserResponse} from '../../api/contract';
import {User} from '../domain/User';

export function transformUser(user: User): UserResponse {
    const response: UserResponse = {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        roles: user.roles
    };
    if (user.company) {
        response.company = {
            id: user.company._id,
            name: user.company.name,
        };
    }
    return response;
}

export function transformList(users: User[]): UserResponse[] {
    return users.map(user => transformUser(user));
}
