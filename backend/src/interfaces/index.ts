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

export interface AuthRequest extends Request {
    userId?: number;
    userRole?: string;
}

export interface IBug {
    id: number;
    title: string;
    priority: 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest';
    severity: 'Critical' | 'Major' | 'Moderate' | 'Low';
    status: 'Open' | 'In Progress' | 'Done';
    assignee?: string;
    steps?: string;
    date: string;
}