import {PollPayload} from '../../api/contract';
import {PollRepository} from '../../data/repository/poll.repository';
import {Poll} from '../domain/Poll';

export class PollService {

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
