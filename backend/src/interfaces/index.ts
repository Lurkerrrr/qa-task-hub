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
    name: string;
}

export interface AuthRequest extends Request {
    userId?: number;
    userRole?: string;
    userName?: string;
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

export interface IBaseResponse<T = any> {
    status: 'success' | 'error';
    data?: T;
    message?: string;
}

export interface IUserResponse {
    user: Omit<IUser, 'password'>;
    token?: string;
}

export interface IBugResponse {
    bug?: IBug;
    bugs?: IBug[];
}