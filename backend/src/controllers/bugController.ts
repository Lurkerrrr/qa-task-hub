import { Request, Response, NextFunction } from 'express';
import { bugService } from '../services/bugService';

export interface AuthRequest extends Request {
    userId?: number;
    userRole?: string;
    userName?: string;
}

class BugController {
    public async getBugs(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const bugs = await bugService.getAllBugs();
            res.json(bugs);
        } catch (err) {
            next(err);
        }
    }

    public async createBug(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const newBug = await bugService.createBug(req.body, req.userId!);
            res.status(201).json(newBug);
        } catch (err) {
            next(err);
        }
    }

    public async updateStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id as string, 10);
            const { status } = req.body;
            await bugService.updateBugStatus(id, status);
            res.json({ status: 'success', message: 'Bug status updated' });
        } catch (err) {
            next(err);
        }
    }

    public async deleteBug(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id as string, 10);
            await bugService.deleteBug(id);
            res.json({ status: 'success', message: 'Bug deleted' });
        } catch (err) {
            next(err);
        }
    }

}

export const bugController = new BugController();