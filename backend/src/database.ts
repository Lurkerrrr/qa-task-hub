import { Pool } from 'pg';

export class Database {
    private static instance: Database;
    public pool!: Pool;
    public isInitialized: Promise<void>;

    private constructor() {
        this.pool = new Pool({
            user: process.env.POSTGRES_USER || 'testuser',
            password: process.env.POSTGRES_PASSWORD || 'testpassword',
            host: process.env.POSTGRES_HOST || 'localhost',
            database: process.env.POSTGRES_DB || 'qataskdb',
            port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
        });

        this.isInitialized = this.init();
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    private async init(): Promise<void> {
        try {
            await this.pool.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    name VARCHAR(255) NOT NULL
                )
            `);

            await this.pool.query(`
                CREATE TABLE IF NOT EXISTS bugs (
                    id SERIAL PRIMARY KEY,
                    title TEXT NOT NULL,
                    priority VARCHAR(50) NOT NULL,
                    severity VARCHAR(50) NOT NULL,
                    status VARCHAR(50) DEFAULT 'Open',
                    assignee VARCHAR(255),
                    date VARCHAR(255) NOT NULL
                )
            `);
            console.log('Connected to PostgreSQL database and verified tables.');
        } catch (err) {
            console.error('Error initializing PostgreSQL database:', err);
            throw err;
        }
    }

    public async queryAsync(sql: string, params: any[] = []): Promise<any> {
        const result = await this.pool.query(sql, params);
        return {
            id: result.rows[0]?.id,
            changes: result.rowCount,
        };
    }

    public async allAsync<T>(sql: string, params: any[] = []): Promise<T[]> {
        const result = await this.pool.query(sql, params);
        return result.rows as T[];
    }

    public async getAsync<T>(sql: string, params: any[] = []): Promise<T | undefined> {
        const result = await this.pool.query(sql, params);
        return result.rows[0] as T | undefined;
    }

    public async close(): Promise<void> {
        await this.pool.end();
        console.log('PostgreSQL connection pool closed.');
    }
}

export default Database.getInstance();
