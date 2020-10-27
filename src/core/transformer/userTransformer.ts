import {UserResponse} from '../../api/contract';
import {User} from '../domain/User';

export function transform(user: User): UserResponse {
    return {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email
    };
}

export function transformList(users: User[]): UserResponse[] {
    return users.map(user => transform(user));
}
