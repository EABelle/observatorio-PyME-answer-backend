import { NextFunction, Request, Response } from 'express';

export const fourOFourMiddleware = (_req: Request, res: Response, next: NextFunction): void => {
    if (res.headersSent) {
        return next();
    }
    res.status(404).json({ message: 'Not Found' });
};
