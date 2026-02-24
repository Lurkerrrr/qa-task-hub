import { Router } from 'express';
import { authController } from '../controllers/authController';
import { loginLimiter, registerLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/register', registerLimiter, authController.register);
router.post('/login', loginLimiter, authController.login);

export default router;