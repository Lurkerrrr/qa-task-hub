import { Router } from 'express';
import { BugController, bugController } from '../controllers/bugController';
import { authGuard } from '../middleware/authMiddleware';
import { validationMiddleware } from '../middleware/validate';
import { securityPolicy } from '../middleware/securityPolicy';

export class BugRoutes {
    public router: Router;
    private bugController: BugController;

    constructor(controller: BugController) {
        this.router = Router();
        this.bugController = controller;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', authGuard.verifyToken, this.bugController.getAllBugs);
        this.router.post('/', authGuard.verifyToken, securityPolicy.ownerBinding, validationMiddleware.validate('bug'), this.bugController.createBug);
        this.router.put('/:id', authGuard.verifyToken, securityPolicy.verifyBugOwnership, validationMiddleware.validate('bugStatus'), this.bugController.updateBugStatus);
        this.router.delete('/:id', authGuard.verifyToken, securityPolicy.verifyBugOwnership, this.bugController.deleteBug);
    }
}

export default new BugRoutes(bugController).router;