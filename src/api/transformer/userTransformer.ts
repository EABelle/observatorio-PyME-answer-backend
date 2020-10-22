import {UserResponse} from '../contract';
import {User} from '../../core/domain/User';

export function transform(user: User): UserResponse {
    return { id: user._id, name: user.name, avatar: user.avatar };
}

