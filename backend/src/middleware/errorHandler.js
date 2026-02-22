// Global error handling middleware
const errorHandler = (err, req, res, next) => {
    // Log the error to the console (in a real project, this goes to a file or Sentry)
    console.error(`[Error]: ${err.message}`);

    // If the error already has a status code (e.g., 400 or 404), use it. Otherwise, default to 500.
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Return a standardized JSON response for ALL errors
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        // Only show the stack trace if we are NOT in production (security best practice)
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorHandler;