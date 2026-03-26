import Database from '../database';
import { BaseService } from './BaseService';
import { IBug } from '../interfaces';
import { AppError, NotFoundError } from '../utils/AppError';
import { bugs } from '../schema';
import { eq, desc } from 'drizzle-orm';

export interface IBugService {
    getAllBugs(): Promise<IBug[]>;
    getBugById(id: number): Promise<IBug>;
    createBug(bugData: Omit<IBug, 'id'>, userId: number): Promise<IBug>;
    updateBugStatus(id: number, status: string): Promise<void>;
    deleteBug(id: number): Promise<void>;
}

export class BugService extends BaseService implements IBugService {
    public async getAllBugs(): Promise<IBug[]> {
        try {
            return await Database.db.select().from(bugs).orderBy(desc(bugs.id));
        } catch (error) {
            throw new AppError('Failed to fetch bugs', 500);
        }
    }

    public async getBugById(id: number): Promise<IBug> {
        try {
            const result = await Database.db.select().from(bugs).where(eq(bugs.id, id));
            const bug = result[0];

            if (!bug) throw new NotFoundError(`Bug with ID ${id} not found`);

            return bug;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError('Failed to fetch bug', 500);
        }
    }

    public async createBug(bugData: Omit<IBug, 'id'>, userId: number): Promise<IBug> {
        try {
            const title = this.formatString(bugData.title);
            const assignee = this.formatString(bugData.assignee || '');
            const { priority, severity, status, date, steps } = bugData;

            const result = await Database.db
                .insert(bugs)
                .values({
                    title,
                    priority,
                    severity,
                    assignee,
                    status: status || 'Open',
                    date,
                    steps,
                })
                .returning();

            return result[0];
        } catch (error) {
            throw new AppError('Failed to create bug', 500);
        }
    }

    public async updateBugStatus(id: number, status: string): Promise<void> {
        try {
            await Database.db.update(bugs).set({ status }).where(eq(bugs.id, id));
        } catch (error) {
            throw new AppError('Failed to update bug status', 500);
        }
    }

    public async deleteBug(id: number): Promise<void> {
        try {
            await Database.db.delete(bugs).where(eq(bugs.id, id));
        } catch (error) {
            throw new AppError('Failed to delete bug', 500);
        }
    }
}
