import { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController';
import { IBugService } from '../services/bugService';
import { IBugResponse } from '../interfaces';

export class BugController extends BaseController {
    private bugService: IBugService;

    constructor(bugServiceInstance: IBugService) {
        super();
        this.bugService = bugServiceInstance;
    }

    public getAllBugs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bugs = await this.bugService.getAllBugs();
            // Enforce IBugResponse and utilize the BaseController helper
            this.sendSuccess<IBugResponse>(res, { bugs }, 200);
        } catch (error) {
            this.nextError(next, error);
        }
    };

    public getBugById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id as string, 10);
            const bug = await this.bugService.getBugById(id);
            // Enforce IBugResponse and utilize the BaseController helper
            this.sendSuccess<IBugResponse>(res, { bug }, 200);
        } catch (error) {
            this.nextError(next, error);
        }
    };

    public createBug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = (req as any).userId;
            const newBug = await this.bugService.createBug(req.body, userId);

            this.sendSuccess<IBugResponse>(res, { bug: newBug }, 201);
        } catch (error) {
            this.nextError(next, error);
        }
    };

    public updateBugStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id as string, 10);
            const { status } = req.body;
            await this.bugService.updateBugStatus(id, status);

            // Using inline type for simple message responses
            this.sendSuccess<{ message: string }>(res, { message: 'Bug status updated successfully' }, 200);
        } catch (error) {
            this.nextError(next, error);
        }
    };

    public deleteBug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id as string, 10);
            await this.bugService.deleteBug(id);

            // Using inline type for simple message responses
            this.sendSuccess<{ message: string }>(res, { message: 'Bug deleted successfully' }, 200);
        } catch (error) {
            this.nextError(next, error);
        }
    };
}

