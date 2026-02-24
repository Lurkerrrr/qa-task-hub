import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../interfaces';
import { UnauthorizedError } from '../utils/AppError';

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return next(new UnauthorizedError('No token provided'));

    const secret = process.env.JWT_SECRET || 'super_secret_key_123';

    jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return next(new UnauthorizedError('Token has expired. Please log in again.'));
            }
            if (err.name === 'JsonWebTokenError') {
                return next(new UnauthorizedError('Invalid token signature.'));
            }
            return next(new UnauthorizedError('Authentication failed.'));
        }

        req.userId = decoded.id;
        req.userName = decoded.name;
        next();
    });
};