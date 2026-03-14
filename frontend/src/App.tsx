import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Auth from './components/Auth';
import AnimatedRoutes from './components/AnimatedRoutes';
import { translations, TranslationSchema } from './locales/translations';
import ScrollToTop from './components/ScrollToTop';
import { IUser, IBug } from './types/interfaces';
import { useBugs, useCreateBug, useDeleteBug, useUpdateBugStatus } from './hooks/useBugs';
import { useLogout } from './hooks/useAuth';

const App: React.FC = () => {
    const [user, setUser] = useState<IUser | null>(() => {
        try {
            const savedUser = localStorage.getItem('user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });

    const [language, setLanguage] = useState<string>(localStorage.getItem('language') || 'en');
    const t: TranslationSchema = translations[language as keyof typeof translations] || translations.en;

    const { data: bugs = [], isLoading } = useBugs(user?.id);
    const { mutate: createBug } = useCreateBug();
    const { mutate: deleteBug } = useDeleteBug();
    const { mutate: updateBugStatus } = useUpdateBugStatus();
    const { mutate: logoutUser } = useLogout();

    const handleLogout = useCallback(() => {
        logoutUser(undefined, {
            onSettled: () => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setUser(null);
            }
        });
    }, [logoutUser]);

    const handleLogin = (newUser: IUser): void => {
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    };

    const handleAddBug = async (newBug: Omit<IBug, 'id'>) => {
        createBug(newBug, {
            onError: (error: any) => {
                alert(error.message || 'Failed to add bug');
                if (error.message.includes('Unauthorized') || error.message.includes('forbidden')) handleLogout();
            }
        });
    };

    const handleDeleteBug = async (id: number) => {
        deleteBug(id, {
            onError: (error: any) => {
                alert(error.message || 'Failed to delete bug');
                if (error.message.includes('Unauthorized') || error.message.includes('forbidden')) handleLogout();
            }
        });
    };

    const handleUpdateStatus = async (id: number, status: string) => {
        updateBugStatus({ id, status }, {
            onError: (error: any) => {
                alert(error.message || 'Failed to update bug');
                if (error.message.includes('Unauthorized') || error.message.includes('forbidden')) handleLogout();
            }
        });
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
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <AnimatedRoutes
                        bugs={bugs}
                        setBugs={() => { }}
                        onAddBug={handleAddBug}
                        onDeleteBug={handleDeleteBug}
                        onUpdateStatus={handleUpdateStatus}
                        t={t}
                    />
                )}
            </main>

            <footer className="w-full bg-white border-t border-slate-200 py-8 text-center">
                <p className="text-gray-400 text-sm">{t.footer}</p>
            </footer>

            <ScrollToTop />
        </div>
    );
};

export default App;