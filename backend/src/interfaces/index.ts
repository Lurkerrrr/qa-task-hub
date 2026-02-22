import { Request } from 'express';

export interface IUser {
    id: number;
    email: string;
    password?: string;
    name: string;
}

export interface ITokenPayload {
    id: number;
    email: string;
}

// Додаємо AuthRequest сюди, щоб він був доступний всюди
export interface AuthRequest extends Request {
    userId?: number;
    userRole?: string;
}

export interface IBug {
    id: number;
    title: string;
    priority: 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest';
    severity: 'Critical' | 'Major' | 'Moderate' | 'Low'; // Оновив під твій UI
    status: 'Open' | 'In Progress' | 'Done';
    assignee?: string;
    date: string;
}