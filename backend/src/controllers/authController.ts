import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { BaseController } from './BaseController';
import { IAuthService } from '../services/authService';
import { IUserResponse } from '../interfaces';

export class AuthController extends BaseController {
    private authService: IAuthService;

    constructor(authServiceInstance: IAuthService) {
        super();
        this.authService = authServiceInstance;
    }

    public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, email, password } = req.body;
            const user = await this.authService.register(name, email, password);

            this.sendSuccess<IUserResponse>(res, { user }, 201);
        } catch (error) {
            this.nextError(next, error);
        }
    };

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password } = req.body;
            const { token, user } = await this.authService.login(email, password);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000,
            });

            const csrfToken = crypto.randomBytes(32).toString('hex');
            res.cookie('csrf_token', csrfToken, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000,
            });

            this.sendSuccess(res, { user }, 200);
        } catch (error) {
            this.nextError(next, error);
        }
    };

    public logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
            res.cookie('csrf_token', '', { httpOnly: false, expires: new Date(0) });

            this.sendSuccess(res, { message: 'Logged out successfully' }, 200);
        } catch (error) {
            this.nextError(next, error);
        }
    };
}
