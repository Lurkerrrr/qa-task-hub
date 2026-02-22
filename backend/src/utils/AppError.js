// Custom error class to handle operational errors with specific HTTP status codes
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // Identifies expected operational errors vs unexpected programming bugs
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;