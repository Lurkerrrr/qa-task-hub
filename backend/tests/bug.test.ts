import request from 'supertest';
import app from '../src/server';
import { describe, it, expect, beforeAll } from '@jest/globals';

describe('Bug API Endpoints (10 QA Scenarios)', () => {
    let tokenUserA: string;
    let tokenUserB: string;
    let tokenAdmin: string;
    let bugIdA: number;

    // SETUP: Register our 3 test users before running the scenarios
    beforeAll(async () => {
        // 1. Register the users
        await request(app).post('/auth/register').send({ name: 'User A', email: 'usera@test.com', password: 'password123', role: 'user' });
        await request(app).post('/auth/register').send({ name: 'User B', email: 'userb@test.com', password: 'password123', role: 'user' });
        await request(app).post('/auth/register').send({ name: 'Admin User', email: 'admin@test.com', password: 'password123', role: 'admin' });

        // 2. Log them in to extract the JWT tokens
        const loginA = await request(app).post('/auth/login').send({ email: 'usera@test.com', password: 'password123' });
        tokenUserA = loginA.body.data.token;

        const loginB = await request(app).post('/auth/login').send({ email: 'userb@test.com', password: 'password123' });
        tokenUserB = loginB.body.data.token;

        const loginAdmin = await request(app).post('/auth/login').send({ email: 'admin@test.com', password: 'password123' });
        tokenAdmin = loginAdmin.body.data.token;
    });

    describe('GET /bugs', () => {
        it('Positive: Should return bugs for valid user', async () => {
            const res = await request(app)
                .get('/bugs')
                .set('Authorization', `Bearer ${tokenUserA}`);

            expect(res.status).toBe(200);
            expect(res.body.status).toBe('success');
            expect(Array.isArray(res.body.data.bugs)).toBe(true);
        });

        it('Negative: Should block request without token (Ghost Request)', async () => {
            const res = await request(app).get('/bugs'); // No Authorization header
            expect(res.status).toBe(401);
            expect(res.body.message).toMatch(/No token provided/i);
        });

        it('Negative: Should block forged token with invalid signature', async () => {
            const res = await request(app)
                .get('/bugs')
                .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.token`);

            expect(res.status).toBe(401);
            expect(res.body.message).toMatch(/Invalid token signature|Authentication failed/i);
        });

        it('Category B: The "User-as-Admin" Trick should fail', async () => {
            const res = await request(app)
                .get('/bugs')
                .set('Authorization', `Bearer ${tokenUserA}`)
                .set('role', 'admin');

            expect(res.status).toBe(200);
            const allBugs = res.body.data.bugs;
            const hasUserBBugs = allBugs.some((bug: any) => bug.assignee === 'User B');
            expect(hasUserBBugs).toBe(false);
        });
    });

    describe('POST /bugs', () => {
        it('Positive: Should create a valid bug', async () => {
            const res = await request(app)
                .post('/bugs')
                .set('Authorization', `Bearer ${tokenUserA}`)
                .send({
                    title: 'Login button missing',
                    priority: 'High',
                    severity: 'Major',
                    status: 'Open',
                    date: '2026-02-28',
                    assignee: 'User A'
                });

            expect(res.status).toBe(201);
            expect(res.body.data.bug).toHaveProperty('id');
            expect(res.body.data.bug.title).toBe('Login button missing');

            bugIdA = res.body.data.bug.id;
        });

        it('Negative: Should block data mismatch (invalid enum value) via Joi Validation', async () => {
            const res = await request(app)
                .post('/bugs')
                .set('Authorization', `Bearer ${tokenUserA}`)
                .send({
                    title: 'Bad Priority Bug',
                    priority: 'SuperHigh', // Invalid enum!
                    severity: 'Major',
                    status: 'Open',
                    date: '2026-02-28'
                });

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/Validation error/i);
        });
        it('Category D: SQL Injection Attempt in Search/Creation', async () => {
            const res = await request(app)
                .post('/bugs')
                .set('Authorization', `Bearer ${tokenUserA}`)
                .send({
                    title: "' OR 1=1 --",
                    priority: 'Medium',
                    severity: 'Low',
                    status: 'Open',
                    date: '2026-03-01'
                });

            expect(res.status).toBe(201);
            expect(res.body.data.bug.title).toBe("' OR 1=1 --");
        });

        it('Category D: XSS Payload Storage Verification', async () => {
            const res = await request(app)
                .post('/bugs')
                .set('Authorization', `Bearer ${tokenUserA}`)
                .send({
                    title: "<script>alert('hack')</script>",
                    priority: 'Medium',
                    severity: 'Low',
                    status: 'Open',
                    date: '2026-03-01'
                });

            expect(res.status).toBe(201);
            expect(res.body.data.bug.title).toBe("<script>alert('hack')</script>");
        });
    });

    describe('PUT /bugs/:id', () => {
        it('Positive: Should successfully update bug status', async () => {
            const res = await request(app)
                .put(`/bugs/${bugIdA}`)
                .set('Authorization', `Bearer ${tokenUserA}`)
                .send({ status: 'In Progress' });

            expect(res.status).toBe(200);
            expect(res.body.data.message).toMatch(/updated successfully/i);
        });

        it('Negative: Should block IDOR Attack (User A modifying User B\'s bug)', async () => {
            const createRes = await request(app).post('/bugs').set('Authorization', `Bearer ${tokenUserB}`).send({
                title: 'Another Bug B', priority: 'Low', severity: 'Low', status: 'Open', date: '2026-02-28', assignee: 'User B'
            });
            const newBugIdB = createRes.body.data.bug.id;

            const attackRes = await request(app)
                .put(`/bugs/${newBugIdB}`)
                .set('Authorization', `Bearer ${tokenUserA}`)
                .send({ status: 'Done' });

            expect(attackRes.status).toBe(403);
            expect(attackRes.body.message).toMatch(/do not have permission/i);
        });
        it('Category C: Unauthorized Multi-Update Attempt', async () => {
            const res = await request(app)
                .put(`/bugs/[${bugIdA}, 999]`)
                .set('Authorization', `Bearer ${tokenUserA}`)
                .send({ status: 'Done' });

            expect(res.status).toBe(404);
            expect(res.body.message).toMatch(/Invalid bug ID format/i);
        });
    });

    describe('DELETE /bugs/:id', () => {
        it('Positive: Should successfully delete own bug', async () => {
            const res = await request(app)
                .delete(`/bugs/${bugIdA}`)
                .set('Authorization', `Bearer ${tokenUserA}`);

            expect(res.status).toBe(200);
            expect(res.body.data.message).toMatch(/deleted successfully/i);
        });

        it('Positive: Admin should override ownership and delete any bug', async () => {
            // Setup: User B creates a bug
            const createRes = await request(app).post('/bugs').set('Authorization', `Bearer ${tokenUserB}`).send({
                title: 'Test Bug B', priority: 'Medium', severity: 'Moderate', status: 'Open', date: '2026-02-28', assignee: 'User B'
            });
            const bugIdB = createRes.body.data.bug.id;

            // Admin deletes User B's bug successfully
            const deleteRes = await request(app)
                .delete(`/bugs/${bugIdB}`)
                .set('Authorization', `Bearer ${tokenAdmin}`);

            expect(deleteRes.status).toBe(200);
        });

        it('Negative: Should safely handle "Phantom Bug" deletion attempt (404)', async () => {
            const res = await request(app)
                .delete('/bugs/9999999') // ID does not exist
                .set('Authorization', `Bearer ${tokenUserA}`);

            expect(res.status).toBe(404);
            expect(res.body.message).toMatch(/not found/i);
        });
    });
});