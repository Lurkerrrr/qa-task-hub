import { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController';
import { authService, IAuthService } from '../services/authService';
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
            const data = await this.authService.login(email, password);

            this.sendSuccess<IUserResponse>(res, data, 200);
        } catch (error) {
            this.nextError(next, error);
        }
    };
}

export const authController = new AuthController(authService);