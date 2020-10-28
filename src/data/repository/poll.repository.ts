import {PollModel} from '../../core/model/poll.model';
import {Poll} from '../../core/domain/Poll';
import {PollPayload} from '../../api/contract';

export class PollRepository {

    static async getAll(): Promise<Poll[]> {
        const polls = await PollModel.find({});
        return polls ? polls.map((p: { toObject: () => any; }) => p.toObject()) : [];
    }

    static async create(pollPayload: PollPayload): Promise<Poll> {
        const pollModel = new PollModel(pollPayload);
        const poll = await pollModel.save();
        return poll.toObject();
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

    static async getById(id: string): Promise<Poll> {
        const poll = await PollModel.findOne({_id: id});
        return poll.toObject();
    }
}
