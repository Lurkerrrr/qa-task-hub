import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Flag from 'react-world-flags';

const Header = ({ language, setLanguage, t, user, onLogout }) => {
    const location = useLocation();
    const [isLangOpen, setIsLangOpen] = useState(false);

    const languages = [
        { code: 'en', label: 'English', country: 'US' },
        { code: 'pl', label: 'Polski', country: 'PL' },
        { code: 'ua', label: 'Українська', country: 'UA' },
        { code: 'ru', label: 'Русский', country: 'RU' },
    ];

    const currentLang = languages.find((l) => l.code === language) || languages[0];

    const getLinkClass = (path) => {
        const baseClass = 'px-4 py-2 rounded-md text-sm font-bold transition-all duration-200';
        return location.pathname === path
            ? `${baseClass} text-white bg-slate-800 shadow-md`
            : `${baseClass} text-slate-300 hover:text-white hover:bg-slate-800/50`;
    };

    const gradientBtnClass =
        'px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95';

    return (
        <header className="fixed top-0 z-50 w-full bg-slate-900 border-b border-slate-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link to="/">
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

                        <nav className="hidden md:flex ml-10 space-x-2">
                            <Link to="/" className={getLinkClass('/')}>
                                {t.menu.dashboard}
                            </Link>
                            <Link to="/tracker" className={getLinkClass('/tracker')}>
                                {t.menu.tracker}
                            </Link>
                            <Link to="/api" className={getLinkClass('/api')}>
                                {t.menu.api}
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center space-x-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg px-3 py-2 transition-all border border-slate-600 focus:outline-none min-w-[130px] justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-4 rounded-sm overflow-hidden shadow-sm">
                                        <Flag
                                            code={currentLang.country}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="font-bold hidden sm:block">
                                        {currentLang.label}
                                    </span>
                                </div>
                                <svg
                                    className={`w-4 h-4 text-slate-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, x: '-50%' }}
                                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                                        exit={{ opacity: 0, y: -10, x: '-50%' }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute left-1/2 mt-2 w-40 bg-slate-800 rounded-lg shadow-xl border border-slate-600 py-1 overflow-hidden"
                                    >
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code);
                                                    setIsLangOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2.5 text-sm flex items-center space-x-3 hover:bg-slate-700 transition-colors ${language === lang.code ? 'bg-slate-700 text-blue-400 font-bold' : 'text-slate-300'}`}
                                            >
                                                <div className="w-6 h-4 rounded-sm overflow-hidden shadow-sm flex-shrink-0">
                                                    <Flag
                                                        code={lang.country}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span>{lang.label}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {user && (
                            <div className="flex items-center space-x-4">
                                <span className="hidden sm:block text-sm font-medium text-slate-300">
                                    {user.name}
                                </span>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onLogout}
                                    className={gradientBtnClass}
                                >
                                    Logout
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isLangOpen && (
                <div className="fixed inset-0 z-[-1]" onClick={() => setIsLangOpen(false)} />
            )}
        </header>
    );
};

export default Header;
