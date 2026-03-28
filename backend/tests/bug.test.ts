import request from 'supertest';
import app from '../src/server';
import { describe, it, expect, beforeAll } from '@jest/globals';

describe('Bug API Endpoints (Comprehensive QA Suite)', () => {
    let authUserA: { token: string; csrf: string };
    let authUserB: { token: string; csrf: string };
    let authAdmin: { token: string; csrf: string };
    let bugIdA: number;

    const extractAuthContext = (res: request.Response) => {
        const rawCookies = res.headers['set-cookie'];
        const cookies: string[] = Array.isArray(rawCookies)
            ? rawCookies
            : typeof rawCookies === 'string'
              ? [rawCookies]
              : [];

        let token = '',
            csrf = '';
        cookies.forEach((c) => {
            if (c.startsWith('token=')) token = c.match(/token=([^;]+)/)![1];
            if (c.startsWith('csrf_token=')) csrf = c.match(/csrf_token=([^;]+)/)![1];
        });
        return { token, csrf };
    };

    beforeAll(async () => {
        await request(app)
            .post('/auth/register')
            .send({
                name: 'User A',
                email: 'usera@test.com',
                password: 'password123',
                role: 'user',
            });
        await request(app)
            .post('/auth/register')
            .send({
                name: 'User B',
                email: 'userb@test.com',
                password: 'password123',
                role: 'user',
            });
        await request(app)
            .post('/auth/register')
            .send({
                name: 'Admin User',
                email: 'admin@test.com',
                password: 'password123',
                role: 'admin',
            });

        authUserA = extractAuthContext(
            await request(app)
                .post('/auth/login')
                .send({ email: 'usera@test.com', password: 'password123' })
        );
        authUserB = extractAuthContext(
            await request(app)
                .post('/auth/login')
                .send({ email: 'userb@test.com', password: 'password123' })
        );
        authAdmin = extractAuthContext(
            await request(app)
                .post('/auth/login')
                .send({ email: 'admin@test.com', password: 'password123' })
        );
    });

    describe('GET /bugs (No CSRF Required)', () => {
        it('Positive: Should return bugs for valid user', async () => {
            const res = await request(app).get('/bugs').set('Cookie', `token=${authUserA.token}`);
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.data.bugs)).toBe(true);
        });

        it('Negative: Should block request without token (Ghost Request)', async () => {
            const res = await request(app).get('/bugs');
            expect(res.status).toBe(401);
        });

        it('Negative: Should block forged token with invalid signature', async () => {
            const res = await request(app)
                .get('/bugs')
                .set('Cookie', `token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.token`);
            expect(res.status).toBe(401);
        });

        it('Category B: The "User-as-Admin" Trick should fail', async () => {
            const res = await request(app)
                .get('/bugs')
                .set('Cookie', `token=${authUserA.token}`)
                .set('role', 'admin');
            expect(res.status).toBe(200);
            expect(res.body.data.bugs.some((bug: any) => bug.assignee === 'User B')).toBe(false);
        });
    });

    describe('Category: CSRF Protection Validation', () => {
        it('Valid request: Same-origin request with correct CSRF token succeeds', async () => {
            const res = await request(app)
                .post('/bugs')
                .set('Cookie', [`token=${authUserA.token}`, `csrf_token=${authUserA.csrf}`])
                .set('x-xsrf-token', authUserA.csrf)
                .send({
                    title: 'CSRF Valid Bug',
                    priority: 'High',
                    severity: 'Major',
                    status: 'Open',
                    date: '2026-03-28',
                });

            expect(res.status).toBe(201);
        });

        it('Missing token: Request without X-XSRF-TOKEN header -> 403 Forbidden', async () => {
            const res = await request(app)
                .post('/bugs')
                .set('Cookie', [`token=${authUserA.token}`, `csrf_token=${authUserA.csrf}`])
                .send({
                    title: 'Missing Header Bug',
                    priority: 'High',
                    severity: 'Major',
                    status: 'Open',
                    date: '2026-03-28',
                });

            expect(res.status).toBe(403);
            expect(res.body.message).toMatch(/CSRF validation failed/i);
        });

        it('Invalid token: Header value does not match cookie -> 403 Forbidden', async () => {
            const res = await request(app)
                .post('/bugs')
                .set('Cookie', [`token=${authUserA.token}`, `csrf_token=${authUserA.csrf}`])
                .set('x-xsrf-token', 'completely-wrong-token-value')
                .send({
                    title: 'Mismatch Bug',
                    priority: 'High',
                    severity: 'Major',
                    status: 'Open',
                    date: '2026-03-28',
                });

            expect(res.status).toBe(403);
        });

        it('Cross-origin request / Direct API hit: Fails due to unread cookies -> 403 Forbidden', async () => {
            const res = await request(app)
                .post('/bugs')
                .set('Cookie', [`token=${authUserA.token}`])
                .set('x-xsrf-token', 'attacker-guessed-token')
                .send({
                    title: 'Attacker Bug',
                    priority: 'High',
                    severity: 'Major',
                    status: 'Open',
                    date: '2026-03-28',
                });

            expect(res.status).toBe(403);
        });
    });

    describe('POST /bugs (CRUD & Input Sanitization)', () => {
        it('Positive: Should create a valid bug', async () => {
            const res = await request(app)
                .post('/bugs')
                .set('Cookie', [`token=${authUserA.token}`, `csrf_token=${authUserA.csrf}`])
                .set('x-xsrf-token', authUserA.csrf)
                .send({
                    title: 'Login button missing',
                    priority: 'High',
                    severity: 'Major',
                    status: 'Open',
                    date: '2026-02-28',
                    assignee: 'User A',
                });

            expect(res.status).toBe(201);
            bugIdA = res.body.data.bug.id;
        });

        it('Negative: Should block data mismatch (invalid enum value) via Joi Validation', async () => {
            const res = await request(app)
                .post('/bugs')
                .set('Cookie', [`token=${authUserA.token}`, `csrf_token=${authUserA.csrf}`])
                .set('x-xsrf-token', authUserA.csrf)
                .send({
                    title: 'Bad Priority Bug',
                    priority: 'SuperHigh',
                    severity: 'Major',
                    status: 'Open',
                    date: '2026-02-28',
                });

            expect(res.status).toBe(400);
        });

        it('Category D: SQL Injection Attempt in Search/Creation', async () => {
            const res = await request(app)
                .post('/bugs')
                .set('Cookie', [`token=${authUserA.token}`, `csrf_token=${authUserA.csrf}`])
                .set('x-xsrf-token', authUserA.csrf)
                .send({
                    title: "' OR 1=1 --",
                    priority: 'Medium',
                    severity: 'Low',
                    status: 'Open',
                    date: '2026-03-01',
                });

            expect(res.status).toBe(201);
            expect(res.body.data.bug.title).toBe("' OR 1=1 --");
        });

        it('Category D: XSS Payload Storage Verification', async () => {
            const res = await request(app)
                .post('/bugs')
                .set('Cookie', [`token=${authUserA.token}`, `csrf_token=${authUserA.csrf}`])
                .set('x-xsrf-token', authUserA.csrf)
                .send({
                    title: "<script>alert('hack')</script>",
                    priority: 'Medium',
                    severity: 'Low',
                    status: 'Open',
                    date: '2026-03-01',
                });

            expect(res.status).toBe(201);
        });
    });

    describe('PUT /bugs/:id', () => {
        it('Positive: Should successfully update bug status', async () => {
            const res = await request(app)
                .put(`/bugs/${bugIdA}`)
                .set('Cookie', [`token=${authUserA.token}`, `csrf_token=${authUserA.csrf}`])
                .set('x-xsrf-token', authUserA.csrf)
                .send({ status: 'In Progress' });

            expect(res.status).toBe(200);
        });

        it("Negative: Should block IDOR Attack (User A modifying User B's bug)", async () => {
            const createRes = await request(app)
                .post('/bugs')
                .set('Cookie', [`token=${authUserB.token}`, `csrf_token=${authUserB.csrf}`])
                .set('x-xsrf-token', authUserB.csrf)
                .send({
                    title: 'Another Bug B',
                    priority: 'Low',
                    severity: 'Low',
                    status: 'Open',
                    date: '2026-02-28',
                    assignee: 'User B',
                });

            const newBugIdB = createRes.body.data.bug.id;

            const attackRes = await request(app)
                .put(`/bugs/${newBugIdB}`)
                .set('Cookie', [`token=${authUserA.token}`, `csrf_token=${authUserA.csrf}`])
                .set('x-xsrf-token', authUserA.csrf)
                .send({ status: 'Done' });

            expect(attackRes.status).toBe(403);
        });
    });

    describe('DELETE /bugs/:id', () => {
        it('Positive: Should successfully delete own bug', async () => {
            const res = await request(app)
                .delete(`/bugs/${bugIdA}`)
                .set('Cookie', [`token=${authUserA.token}`, `csrf_token=${authUserA.csrf}`])
                .set('x-xsrf-token', authUserA.csrf);

            expect(res.status).toBe(200);
        });

        it('Positive: Admin should override ownership and delete any bug', async () => {
            const createRes = await request(app)
                .post('/bugs')
                .set('Cookie', [`token=${authUserB.token}`, `csrf_token=${authUserB.csrf}`])
                .set('x-xsrf-token', authUserB.csrf)
                .send({
                    title: 'Test Bug B',
                    priority: 'Medium',
                    severity: 'Moderate',
                    status: 'Open',
                    date: '2026-02-28',
                    assignee: 'User B',
                });

            const bugIdB = createRes.body.data.bug.id;

            const deleteRes = await request(app)
                .delete(`/bugs/${bugIdB}`)
                .set('Cookie', [`token=${authAdmin.token}`, `csrf_token=${authAdmin.csrf}`])
                .set('x-xsrf-token', authAdmin.csrf);

            expect(deleteRes.status).toBe(200);
        });

        it('Negative: Should safely handle "Phantom Bug" deletion attempt (404)', async () => {
            const res = await request(app)
                .delete('/bugs/9999999')
                .set('Cookie', [`token=${authUserA.token}`, `csrf_token=${authUserA.csrf}`])
                .set('x-xsrf-token', authUserA.csrf);

            expect(res.status).toBe(404);
        });
    });
});
