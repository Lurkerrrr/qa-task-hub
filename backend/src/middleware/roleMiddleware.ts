import { Response, NextFunction } from 'express';
import { AuthRequest } from '../interfaces';
import { AppError } from '../utils/AppError';

export class RoleGuard {
    public checkIsAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (req.userRole !== 'admin') {
            return next(new AppError('Require Admin Role!', 403));
        }
        next();
    };
}

export const roleGuard = new RoleGuard();