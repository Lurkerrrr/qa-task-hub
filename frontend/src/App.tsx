import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Auth from './components/Auth';
import AnimatedRoutes from './components/AnimatedRoutes';
import { translations, TranslationSchema } from './locales/translations';
import ScrollToTop from './components/ScrollToTop';
import { IUser, IBug } from './types/interfaces';

const App: React.FC = () => {
    const [bugs, setBugs] = useState<IBug[]>([]);
    const [user, setUser] = useState<IUser | null>(() => {
        try {
            const savedUser = localStorage.getItem('user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });

    const [language, setLanguage] = useState<string>(localStorage.getItem('language') || 'en');
    const t: TranslationSchema =
        translations[language as keyof typeof translations] || translations.en;
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleLogout = useCallback(async (): Promise<void> => {
        try {
            // Hit the backend logout endpoint to destroy the HttpOnly cookie
            await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token'); // Clear legacy token if it exists
            localStorage.removeItem('user');
            setUser(null);
        }
    }, [API_URL]);

    useEffect(() => {
        // Rely on user state instead of token state
        if (!user?.id) return;

        const loadBugs = async () => {
            try {
                const res = await fetch(`${API_URL}/bugs`, {
                    credentials: 'include', // Browser automatically attaches cookie
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (res.status === 401 || res.status === 403) {
                    handleLogout();
                    return;
                }

                if (res.ok) {
                    const responseBody = await res.json();
                    const bugList = responseBody.data?.bugs || [];
                    setBugs(Array.isArray(bugList) ? bugList : []);
                }
            } catch (err) {
                console.error('Fetch error:', err);
            }
        };

        loadBugs();
    }, [user?.id, API_URL, handleLogout]);

    const handleLogin = (newUser: IUser): void => {
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    };

    const handleAddBug = async (newBug: Omit<IBug, 'id'>) => {
        const response = await fetch(`${API_URL}/bugs`, {
            method: 'POST',
            credentials: 'include', // Required for authenticated requests
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBug),
        });

        if (response.ok) {
            const responseBody = await response.json();
            const savedBug = responseBody.data?.bug;
            if (savedBug) {
                setBugs((prev) => [savedBug, ...prev]);
            }
        } else if (response.status === 403) {
            const errorData = await response.json();
            alert(
                `Security Alert:\n\n${errorData.message || 'Action forbidden by security policy.'}`
            );
            handleLogout();
        } else if (response.status === 400) {
            const errorData = await response.json();
            alert(`Validation Error:\n\n${errorData.message}`);
        } else {
            console.error('Failed to add bug');
        }
    };

    const handleDeleteBug = async (id: number) => {
        const response = await fetch(`${API_URL}/bugs/${id}`, {
            method: 'DELETE',
            credentials: 'include', // Required for authenticated requests
        });

        if (response.ok) {
            setBugs((prev) => prev.filter((b) => b.id !== id));
        } else if (response.status === 403) {
            const errorData = await response.json();
            alert(
                `Security Alert:\n\n${errorData.message || 'Action forbidden by security policy.'}`
            );
            handleLogout();
        }
    };

    const handleUpdateStatus = async (id: number, status: string) => {
        const response = await fetch(`${API_URL}/bugs/${id}`, {
            method: 'PUT',
            credentials: 'include', // Required for authenticated requests
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });

        if (response.ok) {
            setBugs((prev) => prev.map((b) => (b.id === id ? { ...b, status: status as any } : b)));
        } else if (response.status === 403) {
            const errorData = await response.json();
            alert(
                `Security Alert:\n\n${errorData.message || 'Action forbidden by security policy.'}`
            );
            handleLogout();
        }
    };

    if (!user) return <Auth onLogin={handleLogin} />;

    return (
        <div className="flex flex-col min-h-screen bg-[#f8fafc]">
            <Header
                language={language}
                setLanguage={setLanguage}
                t={t}
                user={user}
                onLogout={handleLogout}
            />

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 pt-28 pb-12">
                <AnimatedRoutes
                    bugs={bugs}
                    setBugs={setBugs}
                    onAddBug={handleAddBug}
                    onDeleteBug={handleDeleteBug}
                    onUpdateStatus={handleUpdateStatus}
                    t={t}
                />
            </main>

            <footer className="w-full bg-white border-t border-slate-200 py-8 text-center">
                <p className="text-gray-400 text-sm">{t.footer}</p>
            </footer>

            <ScrollToTop />
        </div>
    );
};

export default App;
