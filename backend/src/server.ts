import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import './database';

import { AuthService } from './services/authService';
import { BugService } from './services/bugService';
import { AuthController } from './controllers/authController';
import { BugController } from './controllers/bugController';
import { SecurityPolicy } from './middleware/securityPolicy';
import { authGuard } from './middleware/authMiddleware';
import { validationMiddleware } from './middleware/validate';
import { AuthRoutes } from './routes/authRoutes';
import { BugRoutes } from './routes/bugRoutes';
import { ErrorHandler } from './utils/ErrorHandler';

const authService = new AuthService();
const bugService = new BugService();

const securityPolicy = new SecurityPolicy(bugService);

const authController = new AuthController(authService);
const bugController = new BugController(bugService);

const authRoutes = new AuthRoutes(authController, validationMiddleware);
const bugRoutes = new BugRoutes(bugController, authGuard, securityPolicy, validationMiddleware);

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(
    helmet({
        hidePoweredBy: true,
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },
        crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
);

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes.router);
app.use('/bugs', bugRoutes.router);

app.use(ErrorHandler.handleControllerError);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;
