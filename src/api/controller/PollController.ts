import {NextFunction, Response, Request} from 'express';
import {PollPayload, PollResponse} from '../contract';
import {Poll} from '../../core/domain/Poll';
import {PollService} from '../../core/service/PollService';
import {validationResult} from 'express-validator';
import {transform, transformList} from '../../core/transformer/pollTransformer';
import {CustomRequest} from '../../core/middlewares/utils';
import {upload} from '../../core/service/ImageService';

export class PollController {

    public static async getPolls(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const polls: Poll[] = await PollService.getPolls(req.query);
            const pollsResponse: PollResponse[] = await transformList(polls);
            return res.json(pollsResponse);
        } catch (e) {
            return next(new Error(e.message));
        }
    }

    public static async getMyPolls(req: CustomRequest, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const polls: Poll[] = await PollService.getPolls({userId: req.user._id, status: req.query.status});
            const pollsResponse: PollResponse[] = await transformList(polls);
            return res.json(pollsResponse);
        } catch (e) {
            return next(new Error(e.message));
        }
    }

    public static async getCompletePolls(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const dateQuery = <String>req.query.date;
        let date;
        if (dateQuery) {
            const [year, month, day] = dateQuery.split('-');
            date = new Date(Number(year), Number(month) - 1, Number(day));
        }
        try {
            const polls: Poll[] = await PollService.getCompletePolls(date);
            const pollsResponse: PollResponse[] = await transformList(polls);
            return res.json(pollsResponse);
        } catch (e) {
            return next(new Error(e.message));
        }
    }

    public static async getPoll(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id: string = req.params.id;
        try {
            const poll: Poll = await PollService.getPoll(id);
            const response: PollResponse = await transform(poll);
          return res.json(response);
        } catch (e) {
          return next(new Error(e.message));
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
            const pollResponse: PollResponse = await transform(poll);
          return res.json(pollResponse);
        } catch (e) {
          return next(new Error(e.message));
        }
    }

    public static async createPollsFromTemplate(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const templateId: string = req.body.templateId;
        const userIds: string[] = req.body.userId;
        try {
            const polls: Poll[] = await PollService.createPolls(templateId, userIds);
            const pollsResponse: PollResponse[] = await transformList(polls);
            return res.json(pollsResponse);
        } catch (e) {
            return next(new Error(e.message));
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
            const pollResponse: PollResponse = await transform(poll);
            return res.json(pollResponse);
        } catch (e) {
          return next(new Error(e.message));
        }
    }

    public static async uploadFiles(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const files = Object.values(req.files);

        try {
            const uploadPromises = files.map(upload);
            await Promise.all(uploadPromises);
            res.send(files);
        } catch (e) {
            return next(new Error(e.message));
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
              return res.json({message: 'poll not found to delete'});
            }
          return res.json({message: `deleted`});
        } catch (e) {
          return next(new Error(e.message));
        }
    }
}

