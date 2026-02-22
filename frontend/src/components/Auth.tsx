import React, { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import { IUser, IAuthResponse } from '../types/interfaces';

interface AuthProps {
    onLogin: (token: string, user: IUser) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const [error, setError] = useState('');

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const endpoint = isLogin ? '/auth/login' : '/auth/register';

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result: IAuthResponse = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Authentication failed');
            }

            if (isLogin && result.data) {
                onLogin(result.data.token, result.data.user);
            } else {
                setIsLogin(true);
                setError('Account created! Please login.');
            }
        } catch (err: any) {
            setError(err.message);
        } // Тепер catch на місці!
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
            <div className="p-8 bg-white rounded-xl shadow-lg w-96 border border-slate-200">
                <h2 className="mb-6 text-3xl font-bold text-center text-slate-800">
                    {isLogin ? 'Login' : 'Register'}
                </h2>
                {error && <div className="p-3 mb-4 text-sm bg-red-50 text-red-700 rounded">{error}</div>}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />
                    )}
                    <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
                    <Button type="submit">{isLogin ? 'Sign In' : 'Sign Up'}</Button>
                </form>
                <Button variant="ghost" onClick={() => setIsLogin(!isLogin)} className="mt-4">
                    {isLogin ? 'Register' : 'Login'}
                </Button>
            </div>
        </div>
    );
};

export default Auth;