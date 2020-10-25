import { NextFunction, Request, Response } from 'express';

export const authorization = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers['x-api-key'] === process.env.API_KEY) {
        return next();
    }
    const err: Error = new Error('401 Unauthorized: API Key not valid');
    return res.status(401).send({message: err.message});
};
