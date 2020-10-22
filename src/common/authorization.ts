import { NextFunction, Request, Response } from 'express';

export const authorization = [
    (req: Request, _res: Response, next: NextFunction) => {
        if (req.headers['x-api-key'] === process.env.API_KEY) {
            next();
        } else {
            const err: Error = new Error('401 Unauthorized: API Key not valid');
            next(err);
        }
    },
    (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
        if (err) {
            res.status(401).send({message: err.message});
        }
    }];
