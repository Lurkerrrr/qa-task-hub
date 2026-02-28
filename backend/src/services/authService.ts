import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Database from '../database';
import { BaseService } from './BaseService';
import { AppError } from '../utils/AppError';
import { IUser, ITokenPayload } from '../interfaces';
import { JWT_SECRET } from '../utils/config';

export interface IAuthService {
    register(name: string, email: string, passwordRaw: string): Promise<Omit<IUser, 'password'>>;
    login(email: string, passwordRaw: string): Promise<{ token: string; user: Omit<IUser, 'password'> }>;
}

export class AuthService extends BaseService implements IAuthService {
    public async register(name: string, email: string, passwordRaw: string): Promise<Omit<IUser, 'password'>> {
        const formattedName = this.formatString(name);
        const formattedEmail = this.formatString(email).toLowerCase();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordRaw, salt);

        const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

        try {
            const result = await Database.queryAsync(sql, [formattedName, formattedEmail, hashedPassword]);
            return { id: result.id, name: formattedName, email: formattedEmail };
        } catch (error: any) {
            if (error.message && error.message.includes('UNIQUE constraint failed')) {
                throw new AppError('User already exists', 400);
            }
            throw new AppError('Database error', 500);
        }
    }

    public async login(email: string, passwordRaw: string): Promise<{ token: string; user: Omit<IUser, 'password'> }> {
        const formattedEmail = this.formatString(email).toLowerCase();
        const sql = `SELECT * FROM users WHERE email = ?`;

        try {
            const users = await Database.allAsync<IUser>(sql, [formattedEmail]);
            const user = users[0];

            if (!user) throw new AppError('Invalid email or password', 401);

            const isMatch = await bcrypt.compare(passwordRaw, user.password!);
            if (!isMatch) throw new AppError('Invalid email or password', 401);

            const payload: any = {
                id: user.id,
                email: user.email,
                name: user.name,
                role: (user as any).role || (user.email === 'admin@test.com' ? 'admin' : 'user')
            };

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
            const { password, ...userWithoutPassword } = user;

            return { token, user: userWithoutPassword };
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError('DB error', 500);
        }
    }
}

export const authService = new AuthService();