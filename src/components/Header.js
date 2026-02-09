import React from 'react';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

const Header = ({ language, setLanguage, t }) => {
    return (
        <header className="bg-slate-900 text-white shadow-lg fixed top-0 left-0 w-full z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                {/* Логотип */}
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
                    <span className="text-2xl">🛡️</span>
                    <div className="text-xl font-bold tracking-wider text-blue-400">QA TaskHub</div>
                </Link>

                <div className="flex items-center gap-8">
                    {/* Меню навигации */}
                    <ul className="flex space-x-6 font-medium hidden md:flex">
                        <li><Link to="/" className="hover:text-blue-400 transition-colors">{t.dashboard}</Link></li>
                        <li><Link to="/tracker" className="hover:text-blue-400 transition-colors">{t.tracker}</Link></li>
                        <li><Link to="/api" className="hover:text-blue-400 transition-colors">{t.api}</Link></li>
                    </ul>

                    {/* Селектор языка */}
                    <LanguageSelector language={language} setLanguage={setLanguage} />
                </div>
            </nav>
        </header>
    );
};

export default Header;