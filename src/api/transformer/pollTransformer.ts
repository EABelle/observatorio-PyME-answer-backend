import {Poll} from '../../core/domain/Poll';
import {PollResponse} from '../contract';

export function transform(poll: Poll): PollResponse {
    return {
        ...poll,
        id: poll._id,
        company: {
            ...poll.company,
            id: poll.company._id,
        },
    };
}

export function transformList(polls: Poll[]): PollResponse[] {
    return polls.map(poll => transform(poll));
}
