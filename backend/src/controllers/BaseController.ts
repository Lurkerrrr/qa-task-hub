import { Response } from 'express';
import { IBaseResponse } from '../interfaces';

export abstract class BaseController {
    protected sendSuccess<T>(res: Response, data: T, statusCode: number = 200): void {
        const response: IBaseResponse<T> = {
            status: 'success',
            data
        };
        res.status(statusCode).json(response);
    }

    protected nextError(next: Function, error: unknown): void {
        next(error);
    }
}