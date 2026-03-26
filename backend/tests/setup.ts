import { beforeAll, afterAll } from '@jest/globals';
import { sql } from 'drizzle-orm';
import Database from '../src/database';

beforeAll(async () => {
    await Database.isInitialized;
    await Database.db.execute(sql`TRUNCATE TABLE users, bugs RESTART IDENTITY CASCADE;`);
});

afterAll(async () => {
    await Database.close();
});
