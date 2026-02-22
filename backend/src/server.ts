// backend/src/server.ts
import dotenv from 'dotenv';
// dotenv має бути ПЕРШИМ
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes';
import bugRoutes from './routes/bugRoutes';
import { errorHandler } from './middleware/errorHandler';
import './database';

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Маршрути
app.use('/auth', authRoutes);
app.use('/bugs', bugRoutes);

// ОБОВ'ЯЗКОВО: errorHandler має бути ОСТАННІМ
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});