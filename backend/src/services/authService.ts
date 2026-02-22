// backend/src/services/authService.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../database';
import { AppError } from '../utils/AppError';
import { IUser, ITokenPayload } from '../interfaces';

class AuthService {
    // Використовуємо ОДИНАКОВИЙ секретний ключ
    private readonly jwtSecret = process.env.JWT_SECRET || 'super_secret_key_123';

    public async register(name: string, email: string, passwordRaw: string): Promise<Omit<IUser, 'password'>> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordRaw, salt);

        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
            db.run(sql, [name, email, hashedPassword], function (err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return reject(new AppError('User already exists', 400));
                    }
                    return reject(new AppError('Database error', 500));
                }
                resolve({ id: this.lastID, name, email });
            });
        });
    }

    public async login(email: string, passwordRaw: string) {
        return new Promise<{ token: string; user: any }>((resolve, reject) => {
            db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user: IUser) => {
                if (err) return reject(new AppError('DB error', 500));
                if (!user) return reject(new AppError('Invalid email or password', 401));

                const isMatch = await bcrypt.compare(passwordRaw, user.password!);
                if (!isMatch) return reject(new AppError('Invalid email or password', 401));

                const payload: ITokenPayload = { id: user.id, email: user.email };
                const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '24h' });

                const { password, ...userWithoutPassword } = user;
                resolve({ token, user: userWithoutPassword });
            });
        });
    }
}

export const authService = new AuthService();