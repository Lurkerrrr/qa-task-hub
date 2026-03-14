import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from './ui/Button';
import Input from './ui/Input';
import { IUser } from '../types/interfaces';
import { useLogin, useRegister } from '../hooks/useAuth';

interface AuthProps {
    onLogin: (user: IUser) => void;
}

const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
});

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be under 50 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type AuthFormData = {
    name?: string;
    email: string;
    password: string;
};

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [serverError, setServerError] = useState('');

    const { mutate: loginUser, isPending: isLoggingIn } = useLogin();
    const { mutate: registerUser, isPending: isRegistering } = useRegister();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AuthFormData>({
        resolver: zodResolver(isLogin ? loginSchema : registerSchema) as any,
        mode: 'onChange',
    });

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setServerError('');
        reset();
    };

    const onSubmit = (data: AuthFormData) => {
        setServerError('');

        if (isLogin) {
            loginUser(
                { email: data.email, password: data.password },
                {
                    onSuccess: (res) => {
                        if (res.data?.user) onLogin(res.data.user);
                    },
                    onError: (err: any) => setServerError(err.message),
                }
            );
        } else {
            registerUser(
                { name: data.name!, email: data.email, password: data.password },
                {
                    onSuccess: () => {
                        setIsLogin(true);
                        setServerError('Account created! Please login.');
                        reset();
                    },
                    onError: (err: any) => setServerError(err.message),
                }
            );
        }
    };

    const isLoading = isLoggingIn || isRegistering;

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
            <div className="p-8 bg-white rounded-xl shadow-lg w-96 border border-slate-200">
                <h2 className="mb-6 text-3xl font-bold text-center text-slate-800">
                    {isLogin ? 'Login' : 'Register'}
                </h2>

                {serverError && (
                    <div className={`p-3 mb-4 text-sm rounded font-medium ${serverError.includes('created') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                    {!isLogin && (
                        <Input
                            label="Name"
                            {...register('name')}
                            error={errors.name?.message}
                            disabled={isLoading}
                        />
                    )}

                    <Input
                        label="Email"
                        type="email"
                        {...register('email')}
                        error={errors.email?.message}
                        disabled={isLoading}
                    />

                    <Input
                        label="Password"
                        type="password"
                        {...register('password')}
                        error={errors.password?.message}
                        autoComplete={isLogin ? 'current-password' : 'new-password'}
                        disabled={isLoading}
                    />

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
                    </Button>
                </form>

                <Button variant="ghost" onClick={toggleMode} className="mt-4" disabled={isLoading}>
                    {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
                </Button>
            </div>
        </div>
    );
};

export default Auth;