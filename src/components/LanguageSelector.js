import React, { useState } from 'react';
import Flag from 'react-world-flags';

const LanguageSelector = ({ language, setLanguage }) => {
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', country: 'US', label: 'English' },
        { code: 'pl', country: 'PL', label: 'Polski' },
        { code: 'ua', country: 'UA', label: 'Українська' },
        { code: 'ru', country: 'RU', label: 'Русский' },
    ];

    const currentLang = languages.find((l) => l.code === language) || languages[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-slate-800 text-white border border-slate-700 rounded-md px-3 py-1.5 hover:bg-slate-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px] justify-between"
            >
                <div className="flex items-center gap-2">
                    <Flag
                        code={currentLang.country}
                        height="16"
                        width="24"
                        className="object-cover rounded-sm shadow-sm"
                    />
                    <span className="text-sm font-medium">{currentLang.label}</span>
                </div>
                <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-full bg-slate-800 border border-slate-700 rounded-md shadow-xl overflow-hidden z-50">
                        {languages.map((item) => (
                            <div
                                key={item.code}
                                onClick={() => {
                                    setLanguage(item.code);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-slate-700 transition ${language === item.code ? 'bg-slate-700' : ''}`}
                            >
                                <Flag
                                    code={item.country}
                                    height="16"
                                    width="24"
                                    className="object-cover rounded-sm"
                                />
                                <span className="text-sm text-gray-200">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default LanguageSelector;
