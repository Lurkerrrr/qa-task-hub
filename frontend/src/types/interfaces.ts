export interface IUser {
    id: number;
    email: string;
    name: string;
}

export interface IBug {
    id: number;
    title: string;
    priority: 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest' | 'Critical';
    severity: 'Critical' | 'Major' | 'Moderate' | 'Low';
    status: 'Open' | 'In Progress' | 'InProgress' | 'Done';
    assignee: string;
    date: string;
    steps?: string;
}

export interface IAuthResponse {
    status: string;
    message?: string;
    data?: {
        token: string;
        user: IUser;
    };
}