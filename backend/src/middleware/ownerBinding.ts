import { Response, NextFunction } from 'express';
import { AuthRequest } from '../interfaces';
import { AppError } from '../utils/AppError';

export const ownerBinding = (req: AuthRequest, res: Response, next: NextFunction): void => {
    next();
};