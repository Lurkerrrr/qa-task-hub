const Joi = require('joi');
// Define validation schemas for different routes and operations through variables not object
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
        // allowUnknown: true разрешает фронтенду присылать лишние поля без падения ошибки
        const { error } = schemas[schemaName].validate(req.body, { abortEarly: false, allowUnknown: true });

        if (error) {
            // Склеиваем все ошибки в одну строку
            const errorMessages = error.details.map(detail => detail.message).join(', ');
            return res.status(400).json({ message: `Validation error: ${errorMessages}` });
        }

        next();
    };
};

module.exports = validate;