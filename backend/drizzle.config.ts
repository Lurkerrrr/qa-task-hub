import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
    schema: './src/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        host: process.env.POSTGRES_HOST || 'localhost',
        user: process.env.POSTGRES_USER || 'testuser',
        password: process.env.POSTGRES_PASSWORD || 'testpassword',
        database: process.env.POSTGRES_DB || 'qataskdb',
        port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    },
} satisfies Config;
