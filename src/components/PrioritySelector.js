import React, { useState } from 'react';

const PrioritySelector = ({ priority, setPriority, t }) => {
    const [isOpen, setIsOpen] = useState(false);

    const icons = {
        Highest: (
            <svg className="w-5 h-5 text-red-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 5.41V21h-2V5.41l-7.29 7.29L2.3 11.3 12 1.6l9.7 9.7-1.41 1.41z" />
            </svg>
        ),
        High: (
            <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 7.83V20h-2V7.83l-5.59 5.59L4 12l8-8 8 8-1.41 1.41z" />
            </svg>
        ),
        Medium: (
            <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 11h16v2H4z" />
            </svg>
        ),
        Low: (
            <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 16.17V4h-2v12.17l-5.59-5.59L4 12l8 8 8-8-1.41-1.41z" />
            </svg>
        ),
        Lowest: (
            <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 18.59V3h-2v15.59l-7.29-7.29L2.3 12.7 12 22.4l9.7-9.7-1.41-1.41z" />
            </svg>
        ),
    };

    const options = ['Highest', 'High', 'Medium', 'Low', 'Lowest'];

    return (
        <div className="relative w-full">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between p-3 border rounded-lg transition-all ${isOpen ? 'ring-2 ring-blue-500 border-transparent' : 'border-gray-200 hover:border-gray-300'} bg-white`}
            >
                <div className="flex items-center gap-2">
                    {icons[priority] || icons['Medium']}
                    <span className="font-medium text-gray-700">{t.priority[priority]}</span>
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
                        {options.map((opt) => (
                            <div
                                key={opt}
                                onClick={() => {
                                    setPriority(opt);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center gap-3 p-2.5 cursor-pointer hover:bg-gray-50 transition border-l-4 ${priority === opt ? 'border-blue-500 bg-blue-50' : 'border-transparent'}`}
                            >
                                {icons[opt]}
                                <span className="text-sm font-medium text-gray-700">
                                    {t.priority[opt]}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default PrioritySelector;
