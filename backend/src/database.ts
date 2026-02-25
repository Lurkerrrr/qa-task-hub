import sqlite3 from 'sqlite3';
import path from 'path';

export class Database {
    private static instance: Database;
    public db: sqlite3.Database;

    private constructor() {
        const dbPath = path.join(__dirname, '../database.sqlite');
        this.db = new sqlite3.Database(dbPath, (err: Error | null) => {
            if (err) {
                console.error('Error connecting to SQLite database:', err.message);
            } else {
                console.log('Connected to SQLite database.');
                this.init();
            }
        });
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    private init(): void {
        this.db.serialize(() => {
            this.db.run(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    name TEXT NOT NULL
                )
            `);

            this.db.run(`
                CREATE TABLE IF NOT EXISTS bugs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    priority TEXT NOT NULL,
                    severity TEXT NOT NULL,
                    status TEXT DEFAULT 'Open',
                    assignee TEXT,
                    date TEXT NOT NULL
                )
            `);
        });
    }

    // Legacy wrappers for procedural compatibility
    public run(sql: string, params: any[], callback?: (this: sqlite3.RunResult, err: Error | null) => void): this {
        this.db.run(sql, params, callback);
        return this;
    }

    public get(sql: string, params: any[], callback?: (this: sqlite3.Statement, err: Error | null, row: any) => void): this {
        this.db.get(sql, params, callback);
        return this;
    }

    public all(sql: string, params: any[], callback?: (this: sqlite3.Statement, err: Error | null, rows: any[]) => void): this {
        this.db.all(sql, params, callback);
        return this;
    }

    // Promisified methods for OOP architecture
    public async queryAsync(sql: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, changes: this.changes });
            });
        });
    }

    public async allAsync<T>(sql: string, params: any[] = []): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows: T[]) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    public close(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}

export default Database.getInstance();