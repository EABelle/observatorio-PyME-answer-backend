import {Poll} from '../domain/Poll';
import {PollResponse} from '../../api/contract';
import {transformUser} from './userTransformer';
import {UserService} from '../service/UserService';

export async function transform(poll: Poll): Promise<PollResponse> {
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
    if (poll.userId) {
        response.user = transformUser(await UserService.getUser(poll.userId));
    }
    return response;
}

export function transformList(polls: Poll[]): Promise<PollResponse[]> {
    const promises = polls.map(poll => transform(poll));
    return Promise.all(promises);
}
