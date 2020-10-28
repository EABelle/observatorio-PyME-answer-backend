import {Poll} from '../domain/Poll';
import {PollResponse} from '../../api/contract';

export function transform(poll: Poll): PollResponse {
    const { _id, company, created, modified, ...pollDetails } = poll;
    const response: PollResponse = {
        ...pollDetails,
        created: (new Date(Date.parse(created))).toISOString(),
        modified:  (new Date(Date.parse(modified))).toISOString(),
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
