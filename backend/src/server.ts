import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes';
import bugRoutes from './routes/bugRoutes';
import { ErrorHandler } from './utils/ErrorHandler';
import './database';

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({
    hidePoweredBy: true,
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/bugs', bugRoutes);

app.use(ErrorHandler.handleControllerError);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});