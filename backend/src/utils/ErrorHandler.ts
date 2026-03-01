import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';

// Interface for Express body-parser size limit errors
interface IBodyParserError extends Error {
    type?: string;
}

export class ErrorHandler {
    public static handleControllerError(
        err: unknown,
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        let statusCode = 500;
        let message = 'Something went wrong on the server';

        if (err instanceof AppError) {
            statusCode = err.statusCode;
            message = err.message;
        } else if (err instanceof Error) {
            const bpError = err as IBodyParserError;
            if (bpError.type === 'entity.too.large') {
                statusCode = 413;
                message = 'Payload too large. Maximum size allowed is 100kb.';
            }
        }

        res.status(statusCode).json({
            status: 'error',
            statusCode,
            message
        });
    }
}