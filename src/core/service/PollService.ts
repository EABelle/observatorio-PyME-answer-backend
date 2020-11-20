import {PollPayload} from '../../api/contract';
import {PollRepository} from '../../data/repository/poll.repository';
import {Poll, Status} from '../domain/Poll';
import {transformSections} from '../transformer/pollTransformer';
import {TemplateService} from './TemplateService';
import {Template} from '../domain/Template';
import {UserService} from './UserService';
import {User} from '../domain/User';

export function buildPoll(t: Template, u: User): PollPayload {
    const { name, description, sections } = t;
    const templateId = <string>t._id;
    const poll: PollPayload = {
        name,
        description,
        status: Status.NOT_STARTED,
        templateId,
        sections: transformSections(sections),
        userId: u._id
    };
    if (u.company) {
        poll.company = {
            id: u._id,
            name: u.name,
        };
    }
    return poll;
}

function buildPolls(template: Template, targetUsers: User[]): PollPayload[] {
    return targetUsers.map(user => buildPoll(template, user));
}

export class PollService {

    static getPolls(filter?: any): Promise<Poll[]> {
        if (filter) {
            return PollRepository.getBy(filter);
        }
        return PollRepository.getAll();
    }

    static getPollsCountByTemplateId(templateId: string): Promise<number> {
        return PollRepository.getCountBy({templateId});
    }

    static getCompletePolls(date?: Date): Promise<Poll[]> {
        return PollRepository.getCompletePolls(date);
    }

    static getPoll(id: string): Promise<Poll> {
        return PollRepository.getById(id);
    }

    static async createPoll(pollPayload: PollPayload): Promise<Poll> {
        return await PollRepository.create(pollPayload);
    }

    static async createPolls(templateId: string, userIds: string[]): Promise<Poll[]> {
        const template: Template = await TemplateService.getTemplate(templateId);
        let targetUsers: User[];
        const sentPolls: Poll[] = await this.getPolls({templateId});
        const excludeUserIds: string[] = sentPolls.map(poll => poll.userId);
        if (!userIds) {
            targetUsers = await UserService.getUsers({
                roles: { $in: ['COMPANY'] },
                _id: { $nin: excludeUserIds },
            });
        } else {
            targetUsers = await UserService.getUsers({
                _id: { $in: userIds, $nin: excludeUserIds },
            });
            targetUsers.forEach(user => {
                if (!user.roles.includes('COMPANY')) {
                    throw new Error('One or more users are not allowed to answer polls');
                }
            });
        }
        const newPolls: PollPayload[] = await buildPolls(template, targetUsers);
        const promises = newPolls.map(pollPayload => PollRepository.create(pollPayload));
        return await Promise.all(promises);
    }

    static async updatePoll(id: string, pollPayload: PollPayload): Promise<Poll | null> {
        return await PollRepository.update(id, pollPayload);
    }

    static async deletePoll(id: string): Promise<number> {
        return await PollRepository.delete(id);
    }
}
