import React, { useState } from 'react';
import PrioritySelector from './PrioritySelector'; // <-- Импорт
import UserSelector from './UserSelector';         // <-- Импорт

const BugTracker = ({ bugs, setBugs, t }) => {
    const [newBug, setNewBug] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [assignee, setAssignee] = useState('Viktor');
    const [steps, setSteps] = useState('');
    const [errors, setErrors] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    const validateForm = () => {
        let tempErrors = {};
        if (!newBug.trim()) tempErrors.title = t.err_title;
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleAddBug = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const bug = {
            id: Date.now(),
            title: newBug,
            priority: priority,
            assignee: assignee,
            steps: steps,
            status: 'Open',
            date: new Date().toISOString().split('T')[0],
            timeSpent: 0
        };
        setBugs([bug, ...bugs]);
        setNewBug('');
        setSteps('');
        setErrors({});
    };

    const handleDelete = (id) => setBugs(bugs.filter(bug => bug.id !== id));
    const handleStatusChange = (id, newStatus) => setBugs(bugs.map(bug => bug.id === id ? { ...bug, status: newStatus } : bug));
    const handleLogTime = (id) => {
        const hours = prompt("Hours spent?");
        if (hours && !isNaN(hours)) setBugs(bugs.map(bug => bug.id === id ? { ...bug, timeSpent: bug.timeSpent + parseFloat(hours) } : bug));
    };

    const filteredBugs = bugs.filter(bug => bug.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-800">{t.tracker_title}</h2>
                <input type="text" placeholder={t.search_placeholder} className="w-full md:w-64 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>

            {/* Карточка создания бага */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <form onSubmit={handleAddBug} className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                        {/* Поле названия */}
                        <div className="flex-grow w-full">
                            <input
                                type="text"
                                placeholder={t.placeholder_title}
                                className={`w-full p-3 border rounded-lg outline-none transition ${errors.title ? 'border-red-500' : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'}`}
                                value={newBug}
                                onChange={(e) => setNewBug(e.target.value)}
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        {/* Новые селекторы */}
                        <PrioritySelector priority={priority} setPriority={setPriority} t={t} />
                        <UserSelector assignee={assignee} setAssignee={setAssignee} />
                    </div>

                    <div>
                        <textarea
                            placeholder={t.placeholder_steps}
                            className="w-full p-3 border border-gray-200 rounded-lg h-24 resize-none outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                            value={steps}
                            onChange={(e) => setSteps(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 hover:shadow-blue-300 transform active:scale-95">
                            {t.btn_add}
                        </button>
                    </div>
                </form>
            </div>

            {/* Список багов */}
            <div className="space-y-4">
                {filteredBugs.length === 0 ? <p className="text-center text-gray-400 mt-10">No bugs found...</p> : filteredBugs.map((bug) => (
                    <div key={bug.id} className={`bg-white p-5 rounded-xl shadow-sm border-l-4 transition hover:shadow-md ${bug.status === 'Done' ? 'border-green-400 opacity-70' : 'border-blue-500'}`}>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div className="flex-grow">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    {/* Бэйджик приоритета */}
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase flex items-center gap-1 
                                        ${bug.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                            bug.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                                                bug.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                        {bug.priority === 'Critical' ? '🔥' : bug.priority === 'High' ? '🔴' : bug.priority === 'Medium' ? '🟡' : '🟢'}
                                        {t.priority[bug.priority] || bug.priority}
                                    </span>

                                    <span className="text-xs text-gray-400">{bug.date}</span>

                                    {/* Бэйджик Assignee */}
                                    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded flex items-center gap-1 border border-slate-200">
                                        👤 {bug.assignee}
                                    </span>

                                    {bug.timeSpent > 0 && <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-mono border border-purple-100">⏱ {bug.timeSpent}h</span>}
                                </div>
                                <h3 className={`text-lg font-bold ${bug.status === 'Done' ? 'line-through text-gray-500' : 'text-gray-800'}`}>{bug.title}</h3>
                                {bug.steps && <p className="text-gray-500 text-sm mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">"{bug.steps}"</p>}
                            </div>

                            <div className="flex flex-row md:flex-col items-center md:items-end gap-3 w-full md:w-auto mt-2 md:mt-0">
                                <select
                                    className={`text-sm border rounded-lg px-3 py-1.5 outline-none cursor-pointer font-medium transition
                                    ${bug.status === 'Done' ? 'bg-green-50 text-green-700 border-green-200' :
                                            bug.status === 'In Progress' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-white text-gray-600 border-gray-200'}`}
                                    value={bug.status}
                                    onChange={(e) => handleStatusChange(bug.id, e.target.value)}
                                >
                                    {Object.keys(t.status_opt).map(key =>
                                        <option key={key} value={key === 'InProgress' ? 'In Progress' : key}>{t.status_opt[key]}</option>
                                    )}
                                </select>
                                <div className="flex gap-2">
                                    <button onClick={() => handleLogTime(bug.id)} className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-1.5 rounded border border-gray-200 transition">+ Time</button>
                                    <button onClick={() => handleDelete(bug.id)} className="text-gray-300 hover:text-red-500 transition p-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BugTracker;