import { Request } from 'express';
import { users, bugs } from '../schema';

export type IUser = typeof users.$inferSelect;
export type INewUser = typeof users.$inferInsert;

export type IBug = typeof bugs.$inferSelect;
export type INewBug = typeof bugs.$inferInsert;

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
