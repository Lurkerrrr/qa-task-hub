import { Response, NextFunction } from 'express';
import { AuthRequest } from '../interfaces';
import { IBugService } from '../services/bugService';
import { ForbiddenError, NotFoundError } from '../utils/AppError';

export class SecurityPolicy {
    private bugService: IBugService;

    constructor(bugServiceInstance: IBugService) {
        this.bugService = bugServiceInstance;
    }

    public ownerBinding = (req: AuthRequest, res: Response, next: NextFunction): void => {
        const payloadName = req.userName;
        const requestName = req.body.assignee;

        if (requestName && payloadName !== requestName) {
            return next(new ForbiddenError('You cannot perform actions on behalf of another user'));
        }

        next();
    };

    public verifyBugOwnership = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bugId = parseInt(req.params.id as string, 10);
            if (isNaN(bugId)) {
                return next(new NotFoundError('Invalid bug ID format'));
            }

            if (req.userRole === 'admin') {
                return next();
            }

            const bug = await this.bugService.getBugById(bugId);

            if (bug.assignee && bug.assignee !== req.userName) {
                return next(new ForbiddenError('You do not have permission to modify or delete this bug'));
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}
