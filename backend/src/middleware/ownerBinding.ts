import { Response, NextFunction } from 'express';
import { AuthRequest } from '../interfaces';
import { AppError } from '../utils/AppError';

export const ownerBinding = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const payloadName = req.userName;
    const requestName = req.body.assignee;

    if (requestName && payloadName !== requestName) {
        return next(new AppError('Forbidden: You cannot perform actions on behalf of another user', 403));
    }

    next();
};