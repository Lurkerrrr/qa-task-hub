import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { loginLimiter, registerLimiter } from '../middleware/rateLimiter';
import { ValidationMiddleware } from '../middleware/validate';

export class AuthRoutes {
    public router: Router;
    private authController: AuthController;
    private validationMiddleware: ValidationMiddleware;

    constructor(controller: AuthController, validationMiddleware: ValidationMiddleware) {
        this.router = Router();
        this.authController = controller;
        this.validationMiddleware = validationMiddleware;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/register', registerLimiter, this.validationMiddleware.validate('register'), this.authController.register);
        this.router.post('/login', loginLimiter, this.validationMiddleware.validate('login'), this.authController.login);
    }
}