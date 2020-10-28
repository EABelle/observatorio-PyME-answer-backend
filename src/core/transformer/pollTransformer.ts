import {Poll} from '../domain/Poll';
import {PollResponse} from '../../api/contract';

export function transform(poll: Poll): PollResponse {
    const { _id, company, created, modified, ...pollDetails } = poll;
    const response: PollResponse = {
        ...pollDetails,
        created: (new Date(created)).toISOString(),
        modified:  (new Date(modified)).toISOString(),
        id: poll._id
    };
    if (company) {
        response.company = {
            id: company._id,
            name: company.name,
        };
    }
    return response;
}

export function transformList(polls: Poll[]): PollResponse[] {
    return polls.map(poll => transform(poll));
}
