import request from 'supertest';
import app from '../src/server';
import { describe, it, expect } from '@jest/globals';
import { JWT_SECRET } from '../src/utils/config';

describe('Auth API Endpoints', () => {
    const testUser = {
        name: 'QA Tester',
        email: 'qa@test.com',
        password: 'password123'
    };

    describe('POST /auth/register', () => {
        it('should successfully register a new user', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send(testUser);

            expect(res.status).toBe(201);
            expect(res.body.status).toBe('success');
            expect(res.body.data.user).not.toHaveProperty('password');
            expect(res.body.data.user.email).toBe(testUser.email);
        });

        it('should fail when registering with an existing email', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send(testUser);

            expect(res.status).toBe(400);
            expect(res.body.status).toBe('error');
            expect(res.body.message).toMatch(/user already exists/i);
        });

        it('should fail validation when payload is missing fields', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({ email: 'bad@request.com' });

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/Validation error/i);
        });
    });

    describe('POST /auth/login', () => {
        it('should successfully login with correct credentials', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                });

            expect(res.status).toBe(200);
            expect(res.body.status).toBe('success');
            expect(res.body.data).toHaveProperty('token');
            expect(res.body.data.user.email).toBe(testUser.email);
        });

        it('should fail login with incorrect password', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: testUser.email,
                    password: 'wrongpassword'
                });

            expect(res.status).toBe(401);
            expect(res.body.message).toMatch(/invalid email or password/i);
        });
    });
    describe('Category A: Token & Session Hardening', () => {
        it('The Expired Session: Should block expired tokens', async () => {
            const jwt = require('jsonwebtoken');
            const expiredToken = jwt.sign({ id: 1, email: 'qa@test.com' }, JWT_SECRET, { expiresIn: '-1s' });

            const res = await request(app)
                .get('/bugs')
                .set('Authorization', `Bearer ${expiredToken}`);

            expect(res.status).toBe(401);
            expect(res.body.message).toMatch(/Token has expired/i);
        });

        it('The Empty Bearer: Should block empty authorization headers', async () => {
            const res = await request(app)
                .get('/bugs')
                .set('Authorization', 'Bearer ');

            expect(res.status).toBe(401);
            expect(res.body.message).toMatch(/No token provided/i);
        });

        it('The "None" Algorithm Attack: Should reject unsigned tokens', async () => {
            const unsignedToken = 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpZCI6MSwiZW1haWwiOiJxYUB0ZXN0LmNvbSJ9.';

            const res = await request(app)
                .get('/bugs')
                .set('Authorization', `Bearer ${unsignedToken}`);

            expect(res.status).toBe(401);
            expect(res.body.message).toMatch(/invalid token signature/i);
        });
    });

    describe('Category D: Input Sanitization (Auth)', () => {
        it('Payload Oversize Attack: Should block massive JSON payloads', async () => {
            const massiveString = 'A'.repeat(5 * 1024 * 1024);

            const res = await request(app)
                .post('/auth/register')
                .send({
                    name: testUser.name,
                    email: testUser.email,
                    password: massiveString
                });

            expect(res.status).toBe(413);
        });
    });
});