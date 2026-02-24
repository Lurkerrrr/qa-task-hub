import { Response, NextFunction } from 'express';
import { AuthRequest } from '../interfaces';
import { ForbiddenError } from '../utils/AppError';

export const ownerBinding = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const payloadName = req.userName;
    const requestName = req.body.assignee;

    if (requestName && payloadName !== requestName) {
        return next(new ForbiddenError('You cannot perform actions on behalf of another user'));
    }

    next();
};