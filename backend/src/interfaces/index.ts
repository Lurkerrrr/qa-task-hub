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

// backend/src/interfaces/index.ts
export interface IBug {
    id: number;
    title: string;
    priority: 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest';
    // Aligning with the UI labels S1, S2, S3, S4 and the state values
    severity: 'Critical' | 'Major' | 'Moderate' | 'Low';
    status: 'Open' | 'In Progress' | 'Done';
    assignee?: string;
    steps?: string; // Added steps as it is handled in the frontend
    date: string;
}