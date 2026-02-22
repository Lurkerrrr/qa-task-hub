import React, { useState } from 'react';

const SeveritySelector = ({ severity, setSeverity, t }) => {
    const [isOpen, setIsOpen] = useState(false);

    const levels = [
        { id: 'Critical', label: 'S1', color: 'bg-red-600', text: 'text-red-700' },
        { id: 'Major', label: 'S2', color: 'bg-orange-500', text: 'text-orange-700' },
        { id: 'Moderate', label: 'S3', color: 'bg-blue-500', text: 'text-blue-700' },
        { id: 'Low', label: 'S4', color: 'bg-green-500', text: 'text-green-700' },
    ];

    const current = levels.find((l) => l.id === severity) || levels[2];

    return (
        <div className="relative w-full">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between p-3 border rounded-lg transition-all ${isOpen ? 'ring-2 ring-blue-500 border-transparent' : 'border-gray-200 hover:border-gray-300'} bg-white`}
            >
                <div className="flex items-center gap-3">
                    <span
                        className={`${current.color} text-white text-xs font-bold px-2 py-1 rounded shadow-sm`}
                    >
                        {current.label}
                    </span>
                    <span className={`font-medium ${current.text}`}>{t.severity[severity]}</span>
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
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl z-20 overflow-hidden animate-fade-in">
                        {levels.map((lvl) => (
                            <div
                                key={lvl.id}
                                onClick={() => {
                                    setSeverity(lvl.id);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center gap-3 p-2.5 cursor-pointer hover:bg-gray-50 transition border-l-4 ${severity === lvl.id ? 'border-blue-500 bg-blue-50' : 'border-transparent'}`}
                            >
                                <span
                                    className={`${lvl.color} text-white text-xs font-bold px-2 py-1 rounded shadow-sm w-8 text-center`}
                                >
                                    {lvl.label}
                                </span>
                                <span className="text-sm font-medium text-gray-700">
                                    {t.severity[lvl.id]}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default SeveritySelector;
