import {PollPayload} from '../../api/contract';
import {PollRepository} from '../../data/repository/poll.repository';
import {Poll} from '../domain/Poll';

export class PollService {

    static getPolls(filter?: any): Promise<Poll[]> {
        if (filter) {
            return PollRepository.getBy(filter);
        }
        return PollRepository.getAll();
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

    static async updatePoll(id: string, pollPayload: PollPayload): Promise<Poll | null> {
        return await PollRepository.update(id, pollPayload);
    }

    static async deletePoll(id: string): Promise<number> {
        return await PollRepository.delete(id);
    }
}
