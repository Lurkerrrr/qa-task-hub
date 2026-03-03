import { beforeAll, afterAll } from '@jest/globals';
import Database from '../src/database';

// Clear tables and reset IDs before any tests run
beforeAll(async () => {
    await Database.isInitialized;
    await Database.queryAsync('TRUNCATE TABLE users, bugs RESTART IDENTITY CASCADE;');
});

// Close connection pool after tests
afterAll(async () => {
    await Database.close();
});
