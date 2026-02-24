import { Response, NextFunction } from 'express';
import { AuthRequest } from '../interfaces';
import { bugService } from '../services/bugService';
import { ForbiddenError, NotFoundError } from '../utils/AppError';

export const verifyBugOwnership = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bugId = parseInt(req.params.id as string, 10);
        if (isNaN(bugId)) {
            return next(new NotFoundError('Invalid bug ID format'));
        }

        if (req.userRole === 'admin') {
            return next();
        }

        const bug = await bugService.getBugById(bugId);

        if (bug.assignee && bug.assignee !== req.userName) {
            return next(new ForbiddenError('You do not have permission to modify or delete this bug'));
        }

        next();
    } catch (error) {
        next(error);
    }
};