import Database from '../database';
import { BaseService } from './BaseService';
import { IBug } from '../interfaces';
import { AppError, NotFoundError } from '../utils/AppError';

// Interface definition for future Dependency Injection
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
            const sql = `SELECT * FROM bugs ORDER BY id DESC`;
            return await Database.allAsync<IBug>(sql);
        } catch (error) {
            throw new AppError('Failed to fetch bugs', 500);
        }
    }

    public async getBugById(id: number): Promise<IBug> {
        try {
            const sql = `SELECT * FROM bugs WHERE id = ?`;

            // Using allAsync because we need to extract the first row from the array
            const rows = await Database.allAsync<IBug>(sql, [id]);
            const bug = rows[0];

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
            const assignee = this.formatString(bugData.assignee);
            const { priority, severity, status, date, steps } = bugData;

            const sql = `INSERT INTO bugs (title, priority, severity, assignee, status, date) VALUES (?,?,?,?,?,?)`;

            const result = await Database.queryAsync(sql, [title, priority, severity, assignee, status, date]);

            return {
                id: result.id,
                title,
                priority,
                severity,
                status,
                assignee,
                date,
                steps
            } as IBug;
        } catch (error) {
            throw new AppError('Failed to create bug', 500);
        }
    }

    public async updateBugStatus(id: number, status: string): Promise<void> {
        try {
            const sql = `UPDATE bugs SET status = ? WHERE id = ?`;
            await Database.queryAsync(sql, [status, id]);
        } catch (error) {
            throw new AppError('Failed to update bug status', 500);
        }
    }

    public async deleteBug(id: number): Promise<void> {
        try {
            const sql = `DELETE FROM bugs WHERE id = ?`;
            await Database.queryAsync(sql, [id]);
        } catch (error) {
            throw new AppError('Failed to delete bug', 500);
        }
    }
}

