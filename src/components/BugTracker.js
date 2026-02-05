import React, { useState } from 'react';

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
        if (!steps.trim()) tempErrors.steps = t.err_steps;
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleAddBug = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const bug = { id: Date.now(), title: newBug, priority: priority, assignee: assignee, steps: steps, status: 'Open', date: new Date().toISOString().split('T')[0], timeSpent: 0 };
        setBugs([bug, ...bugs]); setNewBug(''); setSteps(''); setErrors({});
    };

    const handleDelete = (id) => setBugs(bugs.filter(bug => bug.id !== id));
    const handleStatusChange = (id, newStatus) => setBugs(bugs.map(bug => bug.id === id ? { ...bug, status: newStatus } : bug));
    const handleLogTime = (id) => {
        const hours = prompt("Hours spent?");
        if (hours && !isNaN(hours)) setBugs(bugs.map(bug => bug.id === id ? { ...bug, timeSpent: bug.timeSpent + parseFloat(hours) } : bug));
    };

    const filteredBugs = bugs.filter(bug => bug.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">{t.tracker_title}</h2>
                <input type="text" placeholder={t.search_placeholder} className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <form onSubmit={handleAddBug} className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow">
                            <input type="text" placeholder={t.placeholder_title} className={`w-full p-3 border rounded-lg outline-none ${errors.title ? 'border-red-500' : 'border-gray-200 focus:ring-blue-500'}`} value={newBug} onChange={(e) => setNewBug(e.target.value)} />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>
                        <select className="p-3 border rounded-lg bg-white" value={priority} onChange={e => setPriority(e.target.value)}>
                            {Object.keys(t.priority).map(key => <option key={key} value={key}>{t.priority[key]}</option>)}
                        </select>
                        <select className="p-3 border rounded-lg bg-white" value={assignee} onChange={e => setAssignee(e.target.value)}>
                            <option value="Viktor">Viktor (QA)</option><option value="Anton">Anton (Dev)</option><option value="Maria">Maria (PM)</option>
                        </select>
                    </div>
                    <div>
                        <textarea placeholder={t.placeholder_steps} className={`w-full p-3 border rounded-lg h-20 resize-none outline-none ${errors.steps ? 'border-red-500' : 'border-gray-200 focus:ring-blue-500'}`} value={steps} onChange={(e) => setSteps(e.target.value)} />
                        {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">{t.btn_add}</button>
                </form>
            </div>

            <div className="space-y-4">
                {filteredBugs.length === 0 ? <p className="text-center text-gray-400 mt-10">...</p> : filteredBugs.map((bug) => (
                    <div key={bug.id} className={`bg-white p-5 rounded-lg shadow-sm border-l-4 transition hover:shadow-md ${bug.status === 'Done' ? 'border-green-400 opacity-70' : 'border-blue-500'}`}>
                        <div className="flex justify-between items-start">
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${bug.priority === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{t.priority[bug.priority] || bug.priority}</span>
                                    <span className="text-xs text-gray-400">{bug.date}</span>
                                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">👤 {bug.assignee}</span>
                                    {bug.timeSpent > 0 && <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-mono">⏱ {bug.timeSpent}h</span>}
                                </div>
                                <h3 className={`text-lg font-bold ${bug.status === 'Done' ? 'line-through text-gray-500' : 'text-gray-800'}`}>{bug.title}</h3>
                                <p className="text-gray-500 text-sm mt-1 bg-gray-50 p-2 rounded">🛠 {bug.steps}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2 ml-4">
                                <select className="text-sm border rounded px-2 py-1 outline-none cursor-pointer mb-2" value={bug.status} onChange={(e) => handleStatusChange(bug.id, e.target.value)}>
                                    {Object.keys(t.status_opt).map(key =>
                                        <option key={key} value={key === 'InProgress' ? 'In Progress' : key}>{t.status_opt[key]}</option>
                                    )}
                                </select>
                                <div className="flex gap-2">
                                    <button onClick={() => handleLogTime(bug.id)} className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded">+ Time</button>
                                    <button onClick={() => handleDelete(bug.id)} className="text-gray-300 hover:text-red-500 transition">🗑</button>
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