import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../utils/AppError';

export class CsrfGuard {
    public verifyDoubleSubmit = (req: Request, res: Response, next: NextFunction): void => {
        if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
            return next();
        }

        const cookieToken = req.cookies['csrf_token'];
        const headerToken = req.headers['x-xsrf-token'];

        if (!cookieToken || !headerToken || cookieToken !== headerToken) {
            return next(new ForbiddenError('CSRF validation failed: Missing or invalid token'));
        }

        next();
    };
}

export const csrfGuard = new CsrfGuard();
