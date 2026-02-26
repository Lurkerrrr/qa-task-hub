import { Router } from 'express';
import { BugController, bugController } from '../controllers/bugController';
import { verifyToken } from '../middleware/authMiddleware';
import { validate } from '../middleware/validate';
import { ownerBinding } from '../middleware/ownerBinding';
import { verifyBugOwnership } from '../middleware/verifyBugOwnership';

export class BugRoutes {
    public router: Router;
    private bugController: BugController;

    constructor(controller: BugController) {
        this.router = Router();
        this.bugController = controller;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', verifyToken, this.bugController.getAllBugs);
        this.router.post('/', verifyToken, ownerBinding, validate('bug'), this.bugController.createBug);
        this.router.put('/:id', verifyToken, verifyBugOwnership, validate('bugStatus'), this.bugController.updateBugStatus);
        this.router.delete('/:id', verifyToken, verifyBugOwnership, this.bugController.deleteBug);
    }
}

export default new BugRoutes(bugController).router;