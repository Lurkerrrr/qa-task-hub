import { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController';
import { authService, IAuthService } from '../services/authService';

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

            res.status(201).json({
                status: 'success',
                data: { user }
            });
        } catch (error) {
            next(error);
        }
    };

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const { email, password } = req.body;
            const data = await this.authService.login(email, password);

            res.status(200).json({
                status: 'success',
                data
            });
        } catch (error) {
            next(error);
        }
    };
}

export const authController = new AuthController(authService);