import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ lang, setLang, t }) => {
    return (
        <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
                    <span className="text-2xl">🛡️</span>
                    <div className="text-xl font-bold tracking-wider text-blue-400">QA Task Hub</div>
                </Link>

                <div className="flex items-center gap-8">
                    <ul className="flex space-x-6 font-medium hidden md:flex">
                        <li><Link to="/" className="hover:text-blue-400 transition-colors">{t.dashboard}</Link></li>
                        <li><Link to="/tracker" className="hover:text-blue-400 transition-colors">{t.tracker}</Link></li>
                        <li><Link to="/api" className="hover:text-blue-400 transition-colors">{t.api}</Link></li>
                    </ul>

                    <select
                        value={lang}
                        onChange={(e) => setLang(e.target.value)}
                        className="bg-slate-800 text-white text-sm border border-slate-700 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:bg-slate-700 transition"
                    >
                        <option value="en">🇺🇸 English</option>
                        <option value="pl">🇵🇱 Polski</option>
                        <option value="ua">🇺🇦 Українська</option>
                        <option value="ru">🇷🇺 Русский</option>
                    </select>
                </div>
            </nav>
        </header>
    );
};

export default Header;