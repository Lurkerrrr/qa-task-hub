import db from '../database';
import { IBug } from '../interfaces';
import { AppError } from '../utils/AppError';

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
}

export const bugService = new BugService();