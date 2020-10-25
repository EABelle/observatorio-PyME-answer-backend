import {Poll} from '../../core/domain/Poll';
import {PollResponse} from '../contract';

export function transform(poll: Poll): PollResponse {
    const { _id, company, ...pollDetails } = poll;
    const response: PollResponse = {
        ...pollDetails,
        id: poll._id
    };
    if (company) {
        response.company = company;
    }
    return response;
}

export function transformList(polls: Poll[]): PollResponse[] {
    return polls.map(poll => transform(poll));
}
