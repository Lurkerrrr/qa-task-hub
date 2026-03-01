import { Router } from 'express';
import { BugController } from '../controllers/bugController';
import { AuthGuard } from '../middleware/authMiddleware';
import { ValidationMiddleware } from '../middleware/validate';
import { SecurityPolicy } from '../middleware/securityPolicy';

export class BugRoutes {
    public router: Router;
    private bugController: BugController;
    private authGuard: AuthGuard;
    private securityPolicy: SecurityPolicy;
    private validationMiddleware: ValidationMiddleware;

    constructor(
        controller: BugController,
        authGuard: AuthGuard,
        securityPolicy: SecurityPolicy,
        validationMiddleware: ValidationMiddleware
    ) {
        this.router = Router();
        this.bugController = controller;
        this.authGuard = authGuard;
        this.securityPolicy = securityPolicy;
        this.validationMiddleware = validationMiddleware;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', this.authGuard.verifyToken, this.bugController.getAllBugs);
        this.router.post('/', this.authGuard.verifyToken, this.securityPolicy.ownerBinding, this.validationMiddleware.validate('bug'), this.bugController.createBug);
        this.router.put('/:id', this.authGuard.verifyToken, this.securityPolicy.verifyBugOwnership, this.validationMiddleware.validate('bugStatus'), this.bugController.updateBugStatus);
        this.router.delete('/:id', this.authGuard.verifyToken, this.securityPolicy.verifyBugOwnership, this.bugController.deleteBug);
    }
}