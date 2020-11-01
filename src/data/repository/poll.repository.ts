import {PollModel} from '../../core/model/poll.model';
import {Poll, Status} from '../../core/domain/Poll';
import {PollPayload} from '../../api/contract';

export class PollRepository {

    static async getAll(): Promise<Poll[]> {
        const polls = await PollModel.find({});
        return polls ? polls.map((p: { toObject: () => any; }) => p.toObject()) : [];
    }

    static async getCompletePolls(date?: Date): Promise<Poll[]> {
        const filter: any = { status: Status.COMPLETE };
        if (date) {
            const dateFrom = date;
            const dateTo = new Date();
            dateTo.setDate(dateFrom.getDate() + 1);

            filter.modified = {
                $gte: dateFrom,
                $lt: dateTo,
            };
        }
        const polls = await PollModel.find(filter);
        return polls ? polls.map((p: { toObject: () => any; }) => p.toObject()) : [];
    }

    static async create(pollPayload: PollPayload): Promise<Poll> {
        const date = new Date(Date.now());
        const preModel = {
            ...pollPayload,
            created: date,
            modified: date,
        };
        const pollModel = new PollModel(preModel);
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

    static getBy(filter: any): Promise<Poll[]> {
        return PollModel.find(filter);
    }

    static getCountBy(filter: any): Promise<number> {
        return PollModel.find(filter).count();
    }
}
