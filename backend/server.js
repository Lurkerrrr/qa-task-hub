require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const errorHandler = require('./src/middleware/errorHandler');

console.log("Starting Server...");

const app = express();
const PORT = process.env.PORT || 5000;

// Mitigates common web vulnerabilities by setting secure HTTP headers
app.use(helmet());

// Restrict cross-origin requests to our specific frontend URL
app.use(cors({
    //bring to env
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Prevents brute-force and DDoS attacks by limiting requests per IP window
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
    standardHeaders: true,
    legacyHeaders: false,
});

try {
    const authRoutes = require('./src/routes/authRoutes');
    app.use('/auth', apiLimiter, authRoutes);
    console.log("/auth route connected");
} catch (error) {
    console.error("FAILED to load authRoutes:", error.message);
}

try {
    const bugRoutes = require('./src/routes/bugRoutes');
    app.use('/bugs', apiLimiter, bugRoutes);
    console.log("/bugs route connected");
} catch (error) {
    console.error("FAILED to load bugRoutes:", error.message);
}

// Catch-all unhandled routes (404)
app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.statusCode = 404;
    next(error);
});

// Global Error Handler (MUST be the last middleware)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test URL: http://localhost:${PORT}/auth/register`);
});