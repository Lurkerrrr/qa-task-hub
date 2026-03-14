import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IAuthResponse } from '../types/interfaces';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const fetchAuth = async (endpoint: string, data?: any): Promise<IAuthResponse> => {
    const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: data ? JSON.stringify(data) : undefined,
    });

    const result = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(result.message || 'Authentication failed');
    return result;
};

export const useLogin = () => {
    return useMutation({
        mutationFn: (credentials: any) => fetchAuth('/auth/login', credentials),
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: (userData: any) => fetchAuth('/auth/register', userData),
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => fetchAuth('/auth/logout'),
        onSuccess: () => {
            queryClient.clear();
        },
    });
};