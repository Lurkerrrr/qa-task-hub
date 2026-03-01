import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
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

// 1. Instantiate Services
const authService = new AuthService();
const bugService = new BugService();

// 2. Instantiate Middleware with Dependencies
const securityPolicy = new SecurityPolicy(bugService);

// 3. Instantiate Controllers with Services
const authController = new AuthController(authService);
const bugController = new BugController(bugService);

// 4. Instantiate Routes with Controllers and Middleware
const authRoutes = new AuthRoutes(authController, validationMiddleware);
const bugRoutes = new BugRoutes(bugController, authGuard, securityPolicy, validationMiddleware);

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

// Inject Routers
app.use('/auth', authRoutes.router);
app.use('/bugs', bugRoutes.router);

app.use(ErrorHandler.handleControllerError);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;