import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IUser } from '../types/interfaces';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
    language: string;
    setLanguage: (lang: string) => void;
    t: any;
    user: IUser | null;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, t, user, onLogout }) => {
    const location = useLocation();

    const getLinkClass = (path: string) => {
        const baseClass = 'px-4 py-2 rounded-md text-sm font-bold transition-all duration-200';
        return location.pathname === path
            ? `${baseClass} text-white bg-slate-800 shadow-md`
            : `${baseClass} text-slate-300 hover:text-white hover:bg-slate-800/50`;
    };

    // Відновлений клас для градієнтної кнопки з твого старого дизайну
    const gradientBtnClass =
        'px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95';

    return (
        <header className="fixed top-0 z-50 w-full bg-slate-900 border-b border-slate-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2">
                        {/* Відновлена анімація наведення на логотип */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex-shrink-0 flex items-center cursor-pointer"
                        >
                            <span className="text-2xl mr-2">🛡️</span>
                            <h1 className="text-xl font-extrabold text-white tracking-wide">
                                QA Task Manager
                            </h1>
                        </motion.div>
                    </Link>

                    <nav className="hidden md:flex space-x-1">
                        <Link to="/" className={getLinkClass('/')}>{t.menu.dashboard}</Link>
                        <Link to="/tracker" className={getLinkClass('/tracker')}>{t.menu.tracker}</Link>
                        <Link to="/api" className={getLinkClass('/api')}>{t.menu.api}</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {/* Використовуємо твій оновлений LanguageSelector */}
                    <LanguageSelector language={language} setLanguage={setLanguage} />

                    <AnimatePresence>
                        {user && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex items-center gap-4 border-l border-slate-700 pl-4"
                            >
                                <span className="hidden sm:block text-sm font-medium text-slate-300">
                                    {user.name}
                                </span>
                                {/* Відновлена градієнтна кнопка з анімацією натискання */}
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onLogout}
                                    className={gradientBtnClass}
                                >
                                    Logout
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default Header;