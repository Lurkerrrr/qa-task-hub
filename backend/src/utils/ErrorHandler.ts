import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';

export class ErrorHandler {
    public static handleControllerError(
        err: any,
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        let statusCode = 500;
        let message = 'Something went wrong on the server';

        if (err instanceof AppError) {
            statusCode = err.statusCode;
            message = err.message;
        } else if (err.type === 'entity.too.large') {
            statusCode = 413;
            message = 'Payload too large. Maximum size allowed is 100kb.';
        }

        res.status(statusCode).json({
            status: 'error',
            statusCode,
            message
        });
    }
}