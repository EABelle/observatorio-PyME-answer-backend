import {PollModel} from '../../core/model/poll.model';
import {Poll} from '../../core/domain/Poll';
import {PollPayload} from '../contract';

export class PollRepository {

    static async create(pollPayload: PollPayload): Promise<Poll> {
        const pollModel = new PollModel(pollPayload);
        const poll: Poll = await pollModel.save();
        return poll;
    }

    static async update(id: string, payload: PollPayload): Promise<Poll | null> {
        return new Promise(async (resolve, reject) => {
            await PollModel.update({_id: id}, payload, (err: Error, response: any) => {
                if (err) {
                    reject(err);
                }
                // @ts-ignore
                resolve(response.n ? {_id: id, ...payload} : null);
            });
        });
    }

    static async delete(id: string): Promise<number> {
        const { deletedCount } = await PollModel.deleteOne({_id: id});
        return deletedCount;
    }

    static async getByTags(tags: string[]): Promise<Poll | Poll[]> {
        const polls = await PollModel.find({tags: { $all: tags }});
        return polls;
    }
}
