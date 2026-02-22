import { Router } from 'express';
import { bugController } from '../controllers/bugController';
import { verifyToken } from '../middleware/authMiddleware';
import { validate } from '../middleware/validate';

const router = Router();

router.get('/', verifyToken, bugController.getBugs);

router.post('/', verifyToken, validate('bug'), bugController.createBug);

export default router;