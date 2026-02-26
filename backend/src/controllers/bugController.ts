import { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController';
import { bugService, IBugService } from '../services/bugService';

export class BugController extends BaseController {
    private bugService: IBugService;

    constructor(bugServiceInstance: IBugService) {
        super();
        this.bugService = bugServiceInstance;
    }

    public getAllBugs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bugs = await this.bugService.getAllBugs();
            res.status(200).json(bugs);
        } catch (error) {
            next(error);
        }
    };

    // Arrow function binds 'this' context for fetching a specific bug
    public getBugById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id as string, 10);
            const bug = await this.bugService.getBugById(id);
            res.status(200).json(bug);
        } catch (error) {
            next(error);
        }
    };

    // Arrow function binds 'this' context for creating a bug
    public createBug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = (req as any).user.id;
            const newBug = await this.bugService.createBug(req.body, userId);

            res.status(201).json(newBug);
        } catch (error) {
            next(error);
        }
    };

    // Arrow function binds 'this' context for updating bug status
    public updateBugStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id as string, 10);
            const { status } = req.body;
            await this.bugService.updateBugStatus(id, status);

            res.status(200).json({
                status: 'success',
                message: 'Bug status updated successfully'
            });
        } catch (error) {
            next(error);
        }
    };

    // Arrow function binds 'this' context for deleting a bug
    public deleteBug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id as string, 10);
            await this.bugService.deleteBug(id);

            res.status(200).json({
                status: 'success',
                message: 'Bug deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    };
}

export const bugController = new BugController(bugService);