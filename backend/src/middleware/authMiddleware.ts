import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../interfaces';

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    const secret = process.env.JWT_SECRET || 'super_secret_key_123';

    jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) {
            console.error('JWT Verify Error:', err.message);
            return res.status(401).json({ message: 'Invalid token signature' });
        }
        req.userId = decoded.id;
        req.userName = decoded.name;
        next();
    });
};