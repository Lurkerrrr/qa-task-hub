import { Router } from 'express';
import { bugController } from '../controllers/bugController';
import { verifyToken } from '../middleware/authMiddleware';
import { validate } from '../middleware/validate';
import { ownerBinding } from '../middleware/ownerBinding';

const router = Router();

router.get('/', verifyToken, bugController.getBugs);

router.post('/', verifyToken, validate('bug'), bugController.createBug);

router.post('/', verifyToken, ownerBinding, validate('bug'), bugController.createBug);

export default router;