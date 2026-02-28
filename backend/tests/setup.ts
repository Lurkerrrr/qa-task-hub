import Database from '../src/database';

// Clear tables before any tests run to ensure a clean state
beforeAll(async () => {
    await Database.queryAsync('DELETE FROM users');
    await Database.queryAsync('DELETE FROM bugs');
    await Database.queryAsync('DELETE FROM sqlite_sequence WHERE name="users" OR name="bugs"');
});

// Close the database connection after all tests are finished
afterAll(async () => {
    await Database.close();
});