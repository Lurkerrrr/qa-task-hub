import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Database from '../database';
import { BaseService } from './BaseService';
import { AppError } from '../utils/AppError';
import { IUser, ITokenPayload } from '../interfaces';
import { JWT_SECRET } from '../utils/config';
import { users } from '../schema';
import { eq } from 'drizzle-orm';

export interface IAuthService {
    register(name: string, email: string, passwordRaw: string): Promise<Omit<IUser, 'password'>>;
    login(
        email: string,
        passwordRaw: string
    ): Promise<{ token: string; user: Omit<IUser, 'password'> }>;
}

export class AuthService extends BaseService implements IAuthService {
    public async register(
        name: string,
        email: string,
        passwordRaw: string
    ): Promise<Omit<IUser, 'password'>> {
        const formattedName = this.formatString(name);
        const formattedEmail = this.formatString(email).toLowerCase();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordRaw, salt);

        try {
            const result = await Database.db
                .insert(users)
                .values({
                    name: formattedName,
                    email: formattedEmail,
                    password: hashedPassword,
                })
                .returning({ id: users.id, name: users.name, email: users.email });

            return result[0];
        } catch (error: any) {
            if (
                error.code === '23505' ||
                (error.message && error.message.includes('unique constraint'))
            ) {
                throw new AppError('User already exists', 400);
            }
            throw new AppError('Database error', 500);
        }
    }

    public async login(
        email: string,
        passwordRaw: string
    ): Promise<{ token: string; user: Omit<IUser, 'password'> }> {
        const formattedEmail = this.formatString(email).toLowerCase();

        try {
            const dbUsers = await Database.db
                .select()
                .from(users)
                .where(eq(users.email, formattedEmail));
            const user = dbUsers[0];

            if (!user) throw new AppError('Invalid email or password', 401);

            const isMatch = await bcrypt.compare(passwordRaw, user.password);
            if (!isMatch) throw new AppError('Invalid email or password', 401);

            const payload: ITokenPayload & { role: string } = {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.email === 'admin@test.com' ? 'admin' : 'user',
            };

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
            const { password, ...userWithoutPassword } = user;

            return { token, user: userWithoutPassword };
        } catch (error: unknown) {
            if (error instanceof AppError) throw error;
            throw new AppError('DB error', 500);
        }
    }
}
