import { Router } from 'express';
import { bugController } from '../controllers/bugController';
import { verifyToken } from '../middleware/authMiddleware';
import { validate } from '../middleware/validate';
import { ownerBinding } from '../middleware/ownerBinding';
import { verifyBugOwnership } from '../middleware/verifyBugOwnership';

const router = Router();

router.get('/', verifyToken, bugController.getAllBugs);

router.post('/', verifyToken, ownerBinding, validate('bug'), bugController.createBug);

router.put('/:id', verifyToken, verifyBugOwnership, validate('bugStatus'), bugController.updateBugStatus);

router.delete('/:id', verifyToken, verifyBugOwnership, bugController.deleteBug);

export default router;