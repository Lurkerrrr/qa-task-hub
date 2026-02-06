import React, { useState } from 'react';

const PrioritySelector = ({ priority, setPriority, t }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Конфигурация приоритетов
    const options = [
        { value: 'Critical', icon: '🔥', label: t.priority.Critical, style: 'text-red-600 bg-red-50' },
        { value: 'High', icon: '🔴', label: t.priority.High, style: 'text-orange-600 bg-orange-50' },
        { value: 'Medium', icon: '🟡', label: t.priority.Medium, style: 'text-yellow-600 bg-yellow-50' },
        { value: 'Low', icon: '🟢', label: t.priority.Low, style: 'text-green-600 bg-green-50' },
    ];

    const current = options.find(opt => opt.value === priority) || options[2];

    return (
        <div className="relative w-full md:w-48">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between p-3 border rounded-lg transition-all ${isOpen ? 'ring-2 ring-blue-500 border-transparent' : 'border-gray-200 hover:border-gray-300'} bg-white`}
            >
                <div className="flex items-center gap-2">
                    <span className="text-xl">{current.icon}</span>
                    <span className={`font-medium ${current.style.split(' ')[0]}`}>{current.label}</span>
                </div>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden animate-fade-in">
                        {options.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => { setPriority(opt.value); setIsOpen(false); }}
                                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 transition ${priority === opt.value ? 'bg-blue-50' : ''}`}
                            >
                                <span className="text-xl">{opt.icon}</span>
                                <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default PrioritySelector;