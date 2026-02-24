import db from '../database';
import { IBug } from '../interfaces';
import { AppError, NotFoundError } from '../utils/AppError';

class BugService {
    public getAllBugs(): Promise<IBug[]> {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM bugs ORDER BY id DESC`;
            db.all(sql, [], (err: Error | null, rows: IBug[]) => {
                if (err) reject(new AppError('Failed to fetch bugs', 500));
                resolve(rows);
            });
        });
    }

    public getBugById(id: number): Promise<IBug> {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM bugs WHERE id = ?`;
            db.get(sql, [id], (err: Error | null, row: IBug) => {
                if (err) return reject(new AppError('Failed to fetch bug', 500));
                if (!row) return reject(new NotFoundError(`Bug with ID ${id} not found`));
                resolve(row);
            });
        });
    }

    public createBug(bugData: Omit<IBug, 'id'>, userId: number): Promise<IBug> {
        return new Promise((resolve, reject) => {
            const { title, priority, severity, assignee, status, date } = bugData;
            const sql = `INSERT INTO bugs (title, priority, severity, assignee, status, date) VALUES (?,?,?,?,?,?)`;

            db.run(sql, [title, priority, severity, assignee, status, date], function (err: Error | null) {
                if (err) reject(new AppError('Failed to create bug', 500));

                resolve({
                    id: this.lastID,
                    ...bugData
                } as IBug);
            });
        });
    }

    public updateBugStatus(id: number, status: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE bugs SET status = ? WHERE id = ?`;
            db.run(sql, [status, id], function (err: Error | null) {
                if (err) reject(new AppError('Failed to update bug status', 500));
                resolve();
            });
        });
    }

    public deleteBug(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM bugs WHERE id = ?`;
            db.run(sql, [id], function (err: Error | null) {
                if (err) reject(new AppError('Failed to delete bug', 500));
                resolve();
            });
        });
    }
}

export const bugService = new BugService();