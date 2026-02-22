const Joi = require('joi');

const schemas = {
    register: Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('admin', 'user').optional()
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    bug: Joi.object({
        title: Joi.string().min(5).max(100).required(),
        priority: Joi.string().valid('Lowest', 'Low', 'Medium', 'High', 'Highest').required(),
        severity: Joi.string().valid('Minor', 'Major', 'Critical').required(),
        assignee: Joi.string().allow('').optional(),
        steps: Joi.string().allow('').optional(),
        status: Joi.string().valid('Open', 'In Progress', 'Done').required(),
        date: Joi.string().required(),
        timeSpent: Joi.number().min(0).optional()
    })
};

// Middleware interceptor to validate request body against the specified schema
const validate = (schemaName) => {
    return (req, res, next) => {
        const { error } = schemas[schemaName].validate(req.body, { abortEarly: false });

        if (error) {
            // Extracts all error messages and returns a 400 Bad Request
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({ message: "Validation failed", errors: errorMessages });
        }

        next();
    };
};

module.exports = validate;