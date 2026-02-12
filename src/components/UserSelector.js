import React, { useState } from 'react';
import Flag from 'react-world-flags';

const UserSelector = ({ assignee, setAssignee }) => {
    const [isOpen, setIsOpen] = useState(false);

    const users = [
        { id: 'Viktor', name: 'Viktor', role: 'QA Lead', country: 'UA' },
        { id: 'John', name: 'John', role: 'Senior Dev', country: 'US' },
        { id: 'Marek', name: 'Marek', role: 'PM', country: 'PL' },
        { id: 'Elena', name: 'Elena', role: 'DevOps', country: 'RU' },
    ];

    const current = users.find(u => u.id === assignee) || users[0];

    return (
        <div className="relative w-full">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between p-3 border rounded-lg transition-all ${isOpen ? 'ring-2 ring-blue-500 border-transparent' : 'border-gray-200 hover:border-gray-300'} bg-white`}
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="relative flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                            {current.name.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full overflow-hidden border border-white shadow-sm">
                            <Flag code={current.country} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className="flex flex-col items-start leading-none truncate">
                        <span className="font-medium text-sm text-gray-800">{current.name}</span>
                        <span className="text-xs text-gray-400">{current.role}</span>
                    </div>
                </div>
                <svg className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden animate-fade-in">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => { setAssignee(user.id); setIsOpen(false); }}
                                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 transition ${assignee === user.id ? 'bg-blue-50' : ''}`}
                            >
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-sm text-gray-800">{user.name}</span>
                                        <Flag code={user.country} width="12" />
                                    </div>
                                    <p className="text-xs text-gray-400">{user.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default UserSelector;