import {NextFunction, Response, Request} from 'express';
import {PollPayload, PollResponse} from '../contract';
import {Poll} from '../../core/domain/Poll';
import {PollService} from '../service/poll.service';
import {validationResult} from 'express-validator';
import {transform, transformList} from '../transformer/pollTransformer';

export class PollController {

    public static async getPolls(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const tags: string[] = <string[]>req.query.tag;
        try {
            const polls: Poll[] = await PollService.getPolls(tags);
            const pollsResponse: PollResponse[] = transformList(polls);
            res.json(pollsResponse);
        } catch (e) {
            next(new Error(e.message));
        }
    }

    public static async createPoll(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const pollRequest: PollPayload = req.body;
        try {
            const poll: Poll = await PollService.createPoll(pollRequest);
            const pollResponse: PollResponse = transform(poll);
            res.json(pollResponse);
        } catch (e) {
            next(new Error(e.message));
        }
    }

    public static async editPoll(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        const pollRequest: PollPayload = req.body;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id: string = req.params.id;
        try {
            const poll: Poll | null = await PollService.updatePoll(id, pollRequest);
            if (!poll) {
                return res.status(404).json({message: 'Poll not found'});
            }
            const pollResponse: PollResponse = transform(poll);
            return res.json(pollResponse);
        } catch (e) {
            next(new Error(e.message));
        }
    }

    public static async deletePoll(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id: string = req.params.id;
        try {
            const deleteCount: number = await PollService.deletePoll(id);
            if (!deleteCount) {
                res.status(404);
                res.json({message: 'poll not found to delete'});
            }
            res.json({message: `deleted`});
        } catch (e) {
            next(new Error(e.message));
        }
    }
}

