import React, { useState, useEffect } from 'react';

const Auth = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const [error, setError] = useState('');

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    // Reset form data and errors when switching between Login and Register modes
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
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Authentication failed');
            }

            // If registration was successful, switch to login mode with an Enterprise-level message
            if (!isLogin) {
                setIsLogin(true);
                // UPDATED: Professional success message
                setError('Account created successfully. Please sign in to continue.');
            }

            // If login was successful, pass token to parent component
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
                // The 'key' prop forces React to remount the component when mode changes, clearing browser autofill
                key={isLogin ? 'login' : 'register'}
                className="p-8 bg-white rounded-xl shadow-lg w-96 border border-slate-200"
            >
                <h2 className="mb-6 text-3xl font-bold text-center text-slate-800">
                    {isLogin ? 'Login' : 'Register'}
                </h2>

                {error && (
                    // Logic: If message contains 'successfully', show green styling. Otherwise, show red.
                    <div className={`p-3 mb-4 text-sm rounded ${error.includes('successfully') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} autoComplete="off">
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block mb-1 text-sm font-bold text-slate-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required={!isLogin}
                                autoComplete="off"
                            />
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-bold text-slate-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1 text-sm font-bold text-slate-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 text-white font-bold rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all transform active:scale-95"
                    >
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="w-full mt-6 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                    {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
                </button>
            </div>
        </div>
    );
};

export default Auth;