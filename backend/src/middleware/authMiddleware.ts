import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../interfaces';
import { UnauthorizedError } from '../utils/AppError';
import { JWT_SECRET } from '../utils/config';

export class AuthGuard {
    // Arrow function ensures correct context binding in routes
    public verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return next(new UnauthorizedError('No token provided'));
        }

        jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return next(new UnauthorizedError('Token has expired. Please log in again.'));
                }
                return next(new UnauthorizedError('Invalid token signature.'));
            }

            req.userId = decoded.id;
            req.userName = decoded.name;
            req.userRole = decoded.role;

            next();
        });
    };
}

export const authGuard = new AuthGuard();