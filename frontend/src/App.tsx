import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Auth from './components/Auth';
import AnimatedRoutes from './components/AnimatedRoutes';
import { translations, TranslationSchema } from './locales/translations';
import ScrollToTop from './components/ScrollToTop';
import { IUser, IBug } from './types/interfaces';

const App: React.FC = () => {
    const [bugs, setBugs] = useState<IBug[]>([]);
    const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
    const [user, setUser] = useState<IUser | null>(() => {
        try {
            const savedUser = localStorage.getItem('user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch { return null; }
    });

    const [language, setLanguage] = useState<string>(localStorage.getItem('language') || 'en');
    const t: TranslationSchema = translations[language as keyof typeof translations] || translations.en;
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const handleLogout = useCallback((): void => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken('');
        setUser(null);
    }, []);

    // Стабільне отримання даних
    useEffect(() => {
        if (!token) return;

        const loadBugs = async () => {
            try {
                const res = await fetch(`${API_URL}/bugs`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });

                if (res.status === 401 || res.status === 403) {
                    handleLogout();
                    return;
                }

                if (res.ok) {
                    const data = await res.json();
                    setBugs(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                console.error('Fetch error:', err);
            }
        };

        loadBugs();
    }, [token, API_URL, handleLogout]);

    const handleLogin = (newToken: string, newUser: IUser): void => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    };

    // Обгортки для функцій керування багами
    const handleAddBug = async (newBug: Omit<IBug, 'id'>) => {
        const response = await fetch(`${API_URL}/bugs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(newBug),
        });
        if (response.ok) {
            const saved = await response.json();
            setBugs(prev => [saved, ...prev]);
        }
    };

    const handleDeleteBug = async (id: number) => {
        await fetch(`${API_URL}/bugs/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });
        setBugs(prev => prev.filter(b => b.id !== id));
    };

    const handleUpdateStatus = async (id: number, status: string) => {
        await fetch(`${API_URL}/bugs/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ status }),
        });
        setBugs(prev => prev.map(b => b.id === id ? { ...b, status: status as any } : b));
    };

    if (!token) return <Auth onLogin={handleLogin} />;

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 overflow-x-hidden">
            <Header language={language} setLanguage={setLanguage} t={t} user={user} onLogout={handleLogout} />

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 pt-24 pb-12">
                <AnimatedRoutes
                    bugs={bugs}
                    setBugs={setBugs}
                    onAddBug={handleAddBug}
                    onDeleteBug={handleDeleteBug}
                    onUpdateStatus={handleUpdateStatus}
                    t={t}
                />
            </main>

            <footer className="py-6 text-center text-sm text-gray-400 border-t border-slate-200 bg-white">
                <p>{t.footer}</p>
            </footer>

            <ScrollToTop />
        </div>
    );
};

export default App;