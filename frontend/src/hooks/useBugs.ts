import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IBug } from '../types/interfaces';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...options.headers },
    });

    const result = await res.json().catch(() => ({}));

    if (res.status === 401 || res.status === 403) {
        throw new Error(result.message || 'Unauthorized');
    }

    if (!res.ok) throw new Error(result.message || 'API Request Failed');
    return result;
};

export const useBugs = (userId: number | undefined) => {
    return useQuery({
        queryKey: ['bugs'],
        queryFn: async () => {
            const data = await fetchApi('/bugs');
            return (data.data?.bugs as IBug[]) || [];
        },
        enabled: !!userId,
    });
};

export const useCreateBug = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newBug: Omit<IBug, 'id'>) => fetchApi('/bugs', {
            method: 'POST',
            body: JSON.stringify(newBug),
        }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bugs'] }),
    });
};

export const useUpdateBugStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, status }: { id: number; status: string }) => fetchApi(`/bugs/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bugs'] }),
    });
};

export const useDeleteBug = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => fetchApi(`/bugs/${id}`, { method: 'DELETE' }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bugs'] }),
    });
};