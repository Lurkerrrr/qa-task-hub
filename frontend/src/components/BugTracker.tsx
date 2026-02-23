import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IBug } from '../types/interfaces';
import PrioritySelector from './PrioritySelector';
import UserSelector from './UserSelector';
import SeveritySelector from './SeveritySelector';

interface BugTrackerProps {
    bugs: IBug[];
    t: any;
    onAddBug: (bug: IBug) => void;
    onDeleteBug: (id: number) => void;
    onUpdateStatus: (id: number, status: string) => void;
}

const BugTracker: React.FC<BugTrackerProps> = ({ bugs, t, onAddBug, onDeleteBug, onUpdateStatus }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBug, setNewBug] = useState('');
    const [priority, setPriority] = useState<IBug['priority']>('Medium');
    const [severity, setSeverity] = useState<IBug['severity']>('Moderate' as any);
    const [assignee, setAssignee] = useState('Viktor');
    const [steps, setSteps] = useState('');
    const [errors, setErrors] = useState<{ title?: string }>({});
    const [searchQuery, setSearchQuery] = useState('');

    const validateForm = () => {
        let tempErrors: { title?: string } = {};
        if (!newBug.trim()) tempErrors.title = t.err_title;
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewBug('');
        setSteps('');
        setPriority('Medium');
        setSeverity('Moderate' as any);
        setAssignee('Viktor');
        setErrors({});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const bug: IBug = {
            id: Date.now(),
            title: newBug,
            priority,
            severity: severity as any,
            assignee,
            steps,
            status: 'Open',
            date: new Date().toISOString().split('T')[0],
        };

        onAddBug(bug);
        handleCloseModal();
    };

    const filteredBugs = bugs.filter(
        (bug) => bug.title && bug.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getPriorityIcon = (p: string) => {
        switch (p) {
            case 'Highest': return <svg className="w-4 h-4 text-red-700" viewBox="0 0 24 24" fill="currentColor"><path d="M13 5.41V21h-2V5.41l-7.29 7.29L2.3 11.3 12 1.6l9.7 9.7-1.41 1.41z" /></svg>;
            case 'High': return <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M13 7.83V20h-2V7.83l-5.59 5.59L4 12l8-8 8 8-1.41 1.41z" /></svg>;
            case 'Medium': return <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor"><path d="M4 11h16v2H4z" /></svg>;
            case 'Low': return <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M13 16.17V4h-2v12.17l-5.59-5.59L4 12l8 8 8-8-1.41 1.41z" /></svg>;
            case 'Lowest': return <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M13 18.59V3h-2v15.59l-7.29-7.29L2.3 12.7 12 22.4l9.7-9.7-1.41-1.41z" /></svg>;
            default: return null;
        }
    };

    const getSeverityBadge = (s: string) => {
        const map: any = {
            Critical: { label: 'S1', color: 'bg-red-600' },
            Major: { label: 'S2', color: 'bg-orange-500' },
            Moderate: { label: 'S3', color: 'bg-blue-500' },
            Low: { label: 'S4', color: 'bg-green-500' },
        };
        const config = map[s] || map['Moderate'];
        return (
            <span className={`${config.color} text-white text-[10px] font-bold px-1.5 py-0.5 rounded mr-1`}>
                {config.label}
            </span>
        );
    };

    return (
        <div className="space-y-6 animate-fade-in relative">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    {t.tracker_title}
                    <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        {filteredBugs.length}
                    </span>
                </h2>

                <div className="flex gap-3 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder={t.search_placeholder || 'Search bug...'}
                        className="w-full md:w-64 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg transform active:scale-95"
                    >
                        {t.btn_add}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {filteredBugs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-400 mb-4">{t.empty_tracker || 'No bugs found.'}</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-blue-500 font-medium hover:underline"
                        >
                            {t.btn_create_first || 'Create your first bug'}
                        </button>
                    </div>
                ) : (
                    filteredBugs.map((bug) => (
                        <div
                            key={bug.id}
                            className={`bg-white p-5 rounded-xl shadow-sm border-l-4 transition hover:shadow-md ${bug.status === 'Done' ? 'border-green-400 opacity-70' : 'border-blue-500'}`}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                <div className="flex-grow">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-100" title="Priority">
                                            {getPriorityIcon(bug.priority)}
                                            <span className="text-xs font-bold text-gray-700 uppercase">
                                                {t.priority[bug.priority]}
                                            </span>
                                        </div>
                                        <div className="flex items-center" title="Severity">
                                            {getSeverityBadge(bug.severity || 'Moderate')}
                                        </div>
                                        <span className="text-xs text-gray-400">| {bug.date}</span>
                                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded flex items-center gap-1 border border-slate-200">
                                            👤 {bug.assignee}
                                        </span>
                                    </div>
                                    <h3
                                        className={`text-lg font-bold ${bug.status === 'Done' ? 'line-through text-gray-500' : 'text-gray-800'}`}
                                    >
                                        {bug.title}
                                    </h3>
                                    {bug.steps && (
                                        <p className="text-gray-500 text-sm mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
                                            "{bug.steps}"
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-row md:flex-col items-center md:items-end gap-3 w-full md:w-auto mt-2 md:mt-0">
                                    <select
                                        className={`text-sm border rounded-lg px-3 py-1.5 outline-none cursor-pointer font-medium transition ${bug.status === 'Done'
                                            ? 'bg-green-50 text-green-700 border-green-200'
                                            : bug.status === 'In Progress'
                                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                                : 'bg-white text-gray-600 border-gray-200'
                                            }`}
                                        value={bug.status}
                                        onChange={(e) => onUpdateStatus(bug.id, e.target.value)}
                                    >
                                        {Object.keys(t.status_opt).map((key) => (
                                            <option key={key} value={key === 'InProgress' ? 'In Progress' : key}>
                                                {t.status_opt[key]}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onDeleteBug(bug.id)}
                                            className="text-gray-300 hover:text-red-500 transition p-1"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Portal required to ignore parent layout constraints */}
            {ReactDOM.createPortal(
                <AnimatePresence>
                    {isModalOpen && (
                        <>
                            <motion.div
                                key="backdrop"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={handleCloseModal}
                                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9990]"
                            />

                            <motion.div
                                key="modal"
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
                            >
                                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden pointer-events-auto border border-gray-100">
                                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                        <h3 className="text-xl font-bold text-gray-800">{t.modal_title}</h3>
                                        <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 transition">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>

                                    <div className="p-6">
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.placeholder_title} <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    placeholder={t.placeholder_desc}
                                                    className={`w-full p-3 border rounded-lg outline-none transition ${errors.title ? 'border-red-500' : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'}`}
                                                    value={newBug}
                                                    onChange={(e) => setNewBug(e.target.value)}
                                                />
                                                {errors.title && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.label_priority}</label>
                                                    <PrioritySelector priority={priority} setPriority={setPriority} t={t} />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.label_severity}</label>
                                                    <SeveritySelector severity={severity} setSeverity={setSeverity} t={t} />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.label_assignee}</label>
                                                    <UserSelector assignee={assignee} setAssignee={setAssignee} />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.label_steps}</label>
                                                <textarea
                                                    placeholder={t.placeholder_steps}
                                                    className="w-full p-3 border border-gray-200 rounded-lg h-32 resize-none outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                                                    value={steps}
                                                    onChange={(e) => setSteps(e.target.value)}
                                                />
                                            </div>

                                            <div className="flex justify-end gap-3 pt-2">
                                                <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition">{t.btn_cancel}</button>
                                                <button type="submit" className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 hover:shadow-blue-300 transform active:scale-95">{t.btn_add}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default BugTracker;