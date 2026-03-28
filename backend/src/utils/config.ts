import dotenv from 'dotenv';
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && !process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in the production environment.');
    process.exit(1);
}

export const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_123';
