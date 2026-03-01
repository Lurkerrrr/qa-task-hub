import { Response, NextFunction } from 'express';
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import { AuthRequest } from '../interfaces';
import { UnauthorizedError } from '../utils/AppError';
import { JWT_SECRET } from '../utils/config';

// Interface defining the expected token payload
interface IDecodedToken extends JwtPayload {
    id: number;
    name: string;
    role: string;
}

export class AuthGuard {
    // Arrow function ensures correct context binding in routes
    public verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return next(new UnauthorizedError('No token provided'));
        }

        jwt.verify(token, JWT_SECRET, (err: VerifyErrors | null, decoded: unknown) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return next(new UnauthorizedError('Token has expired. Please log in again.'));
                }
                return next(new UnauthorizedError('Invalid token signature.'));
            }

            const decodedPayload = decoded as IDecodedToken;
            req.userId = decodedPayload.id;
            req.userName = decodedPayload.name;
            req.userRole = decodedPayload.role;

            next();
        });
    };
}

export const authGuard = new AuthGuard();