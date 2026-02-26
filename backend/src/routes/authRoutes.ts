import { Router } from 'express';
import { AuthController, authController } from '../controllers/authController';
import { loginLimiter, registerLimiter } from '../middleware/rateLimiter';

export class AuthRoutes {
    public router: Router;
    private authController: AuthController;

    constructor(controller: AuthController) {
        this.router = Router();
        this.authController = controller;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/register', registerLimiter, this.authController.register);
        this.router.post('/login', loginLimiter, this.authController.login);
    }
}

export default new AuthRoutes(authController).router;