import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';

class AuthController {
    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email, password } = req.body;

            const user = await authService.register(name, email, password);

            res.status(201).json({
                status: 'success',
                data: { user }
            });
        } catch (error) {
            next(error);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;

            const result = await authService.login(email, password);

            res.status(200).json({
                status: 'success',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
}

export const authController = new AuthController();