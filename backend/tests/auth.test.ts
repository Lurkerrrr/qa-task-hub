import request from 'supertest';
import app from '../src/server';
import { describe, it, expect } from '@jest/globals';

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
});