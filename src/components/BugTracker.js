import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // <-- Импорт анимаций
import PrioritySelector from './PrioritySelector';
import UserSelector from './UserSelector';

const BugTracker = ({ bugs, setBugs, t }) => {
    // Состояние для открытия/закрытия модального окна
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        setIsModalOpen(false); // <-- Закрываем окно после создания
    };

    const handleDelete = (id) => setBugs(bugs.filter(bug => bug.id !== id));
    const handleStatusChange = (id, newStatus) => setBugs(bugs.map(bug => bug.id === id ? { ...bug, status: newStatus } : bug));
    const handleLogTime = (id) => {
        const hours = prompt("Hours spent?");
        if (hours && !isNaN(hours)) setBugs(bugs.map(bug => bug.id === id ? { ...bug, timeSpent: bug.timeSpent + parseFloat(hours) } : bug));
    };

    const filteredBugs = bugs.filter(bug => bug.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="space-y-6 animate-fade-in relative">
            {/* Верхняя панель: Заголовок + Поиск + КНОПКА СОЗДАНИЯ */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    {t.tracker_title}
                    <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{filteredBugs.length}</span>
                </h2>

                <div className="flex gap-3 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder={t.search_placeholder}
                        className="w-full md:w-64 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* Кнопка открытия модального окна */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg transform active:scale-95"
                    >
                        <span>+</span> {t.btn_add}
                    </button>
                </div>
            </div>

            {/* Список багов (Теперь занимает больше места, так как формы нет) */}
            <div className="space-y-4">
                {filteredBugs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-400 mb-4">No bugs found...</p>
                        <button onClick={() => setIsModalOpen(true)} className="text-blue-500 font-medium hover:underline">Create your first bug</button>
                    </div>
                ) : filteredBugs.map((bug) => (
                    <div key={bug.id} className={`bg-white p-5 rounded-xl shadow-sm border-l-4 transition hover:shadow-md ${bug.status === 'Done' ? 'border-green-400 opacity-70' : 'border-blue-500'}`}>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div className="flex-grow">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase flex items-center gap-1 
                                        ${bug.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                            bug.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                                                bug.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                        {bug.priority === 'Critical' ? '🔥' : bug.priority === 'High' ? '🔴' : bug.priority === 'Medium' ? '🟡' : '🟢'}
                                        {t.priority[bug.priority] || bug.priority}
                                    </span>
                                    <span className="text-xs text-gray-400">{bug.date}</span>
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

            {/* --- MODAL WINDOW (AnimatePresence позволяет анимировать удаление из DOM) --- */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        {/* 1. Backdrop (Затемнение фона) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
                        />

                        {/* 2. Modal Content (Само окно) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                        >
                            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden pointer-events-auto border border-gray-100">
                                {/* Заголовок окна */}
                                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                    <h3 className="text-xl font-bold text-gray-800">New Bug Report</h3>
                                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                </div>

                                {/* Форма */}
                                <div className="p-6">
                                    <form onSubmit={handleAddBug} className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.placeholder_title} <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                placeholder="E.g. Login button not working..."
                                                className={`w-full p-3 border rounded-lg outline-none transition ${errors.title ? 'border-red-500' : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'}`}
                                                value={newBug}
                                                onChange={(e) => setNewBug(e.target.value)}
                                            />
                                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                                <PrioritySelector priority={priority} setPriority={setPriority} t={t} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                                                <UserSelector assignee={assignee} setAssignee={setAssignee} />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Steps to Reproduce</label>
                                            <textarea
                                                placeholder={t.placeholder_steps}
                                                className="w-full p-3 border border-gray-200 rounded-lg h-32 resize-none outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                                                value={steps}
                                                onChange={(e) => setSteps(e.target.value)}
                                            />
                                        </div>

                                        <div className="flex justify-end gap-3 pt-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsModalOpen(false)}
                                                className="px-5 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 hover:shadow-blue-300 transform active:scale-95"
                                            >
                                                {t.btn_add}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BugTracker;