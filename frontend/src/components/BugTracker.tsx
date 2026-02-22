import React, { useState } from 'react';
import { IBug } from '../types/interfaces';
import PrioritySelector from './PrioritySelector';
import UserSelector from './UserSelector';
import SeveritySelector from './SeveritySelector';
import { motion, AnimatePresence } from 'framer-motion';

interface BugTrackerProps {
    bugs: IBug[];
    t: any;
    onAddBug: (bug: Omit<IBug, 'id'>) => Promise<void>;
    onDeleteBug: (id: number) => Promise<void>;
    onUpdateStatus: (id: number, status: string) => Promise<void>;
}

const BugTracker: React.FC<BugTrackerProps> = ({ bugs, t, onAddBug, onDeleteBug, onUpdateStatus }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBugTitle, setNewBugTitle] = useState('');
    const [priority, setPriority] = useState<IBug['priority']>('Medium');
    const [severity, setSeverity] = useState<IBug['severity']>('Moderate' as any);
    const [assignee, setAssignee] = useState('Viktor');
    const [steps, setSteps] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddBug({
            title: newBugTitle,
            priority,
            severity: severity as any,
            assignee,
            steps,
            status: 'Open',
            date: new Date().toISOString().split('T')[0]
        });
        setNewBugTitle('');
        setSteps('');
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6 animate-fade-in relative">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800">{t.tracker_title}</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition transform active:scale-95"
                >
                    {t.btn_add}
                </button>
            </div>

            {/* Список багів */}
            <div className="grid gap-4">
                {bugs.map((bug) => (
                    <div key={bug.id} className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500 flex justify-between items-center">
                        <div>
                            <div className="flex gap-2 mb-1">
                                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold">{bug.priority}</span>
                                <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded font-bold">{bug.severity}</span>
                            </div>
                            <h3 className="font-bold text-gray-800">{bug.title}</h3>
                            <p className="text-xs text-gray-400">{bug.date} • {bug.assignee}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <select
                                value={bug.status}
                                onChange={(e) => onUpdateStatus(bug.id, e.target.value)}
                                className="text-sm border rounded-lg px-2 py-1 outline-none"
                            >
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                            <button onClick={() => onDeleteBug(bug.id)} className="text-gray-300 hover:text-red-500 transition">
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Модальне вікно створення багу */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6"
                        >
                            <h3 className="text-xl font-bold mb-6">{t.modal_title}</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={t.placeholder_title}
                                    value={newBugTitle}
                                    onChange={(e) => setNewBugTitle(e.target.value)}
                                    required
                                />
                                <div className="grid grid-cols-3 gap-4">
                                    <PrioritySelector priority={priority} setPriority={setPriority} t={t} />
                                    <SeveritySelector severity={severity} setSeverity={setSeverity} t={t} />
                                    <UserSelector assignee={assignee} setAssignee={setAssignee} />
                                </div>
                                <textarea
                                    className="w-full p-3 border rounded-lg h-32 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={t.placeholder_steps}
                                    value={steps}
                                    onChange={(e) => setSteps(e.target.value)}
                                />
                                <div className="flex justify-end gap-3 pt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-gray-500 font-medium">Cancel</button>
                                    <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-lg font-bold shadow-lg shadow-blue-200">Create</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BugTracker;