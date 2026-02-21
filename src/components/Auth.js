import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';

const Auth = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const [error, setError] = useState('');

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        setFormData({ email: '', password: '', name: '' });
        setError('');
    }, [isLogin]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const endpoint = isLogin ? '/auth/login' : '/auth/register';

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Authentication failed');
            }

            if (!isLogin) {
                setIsLogin(true);
                setError('Account created successfully. Please sign in to continue.');
            }

            if (data.token) {
                onLogin(data.token, data.user);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
            <div
                key={isLogin ? 'login' : 'register'}
                className="p-8 bg-white rounded-xl shadow-lg w-96 border border-slate-200"
            >
                <h2 className="mb-6 text-3xl font-bold text-center text-slate-800">
                    {isLogin ? 'Login' : 'Register'}
                </h2>

                {error && (
                    <div
                        className={`p-3 mb-4 text-sm rounded ${error.includes('successfully') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} autoComplete="off">
                    {!isLogin && (
                        <Input
                            label="Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required={!isLogin}
                            autoComplete="off"
                        />
                    )}

                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required={true}
                        autoComplete="new-password"
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required={true}
                        autoComplete="new-password"
                        className="mb-6"
                    />

                    <Button type="submit" variant="primary">
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </Button>
                </form>

                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsLogin(!isLogin)}
                    className="mt-6"
                >
                    {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
                </Button>
            </div>
        </div>
    );
};

export default Auth;
