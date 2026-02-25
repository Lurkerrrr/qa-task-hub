import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';

export class ErrorHandler {
    public static handleControllerError(
        err: Error | AppError,
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        let statusCode = 500;
        let message = 'Something went wrong on the server';

        if (err instanceof AppError) {
            statusCode = err.statusCode;
            message = err.message;
        } else {
            console.error('UNEXPECTED ERROR:', err);
        }

        res.status(statusCode).json({
            status: 'error',
            statusCode,
            message
        });
    }
}