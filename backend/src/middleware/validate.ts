import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

interface ISchemas {
    [key: string]: Joi.ObjectSchema;
}

const schemas: ISchemas = {
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
        title: Joi.string().min(3).max(100).required(),
        priority: Joi.string().valid('Lowest', 'Low', 'Medium', 'High', 'Highest').required(),
        severity: Joi.string().valid('Critical', 'Major', 'Moderate', 'Low').required(),
        assignee: Joi.string().allow('').optional(),
        steps: Joi.string().allow('').optional(),
        status: Joi.string().valid('Open', 'In Progress', 'Done').required(),
        date: Joi.string().required(),
        timeSpent: Joi.number().min(0).optional()
    }),
    bugStatus: Joi.object({
        status: Joi.string().valid('Open', 'In Progress', 'Done').required()
    })
};

export const validate = (schemaName: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const schema = schemas[schemaName];
        if (!schema) {
            return res.status(500).json({ message: `Schema ${schemaName} not found` });
        }

        const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: true });

        if (error) {
            const errorMessages = error.details.map(detail => detail.message).join(', ');
            console.error('Validation Error Details:', errorMessages);
            return res.status(400).json({ status: 'error', message: `Validation error: ${errorMessages}` });
        }

        next();
    };
};