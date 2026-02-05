import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

const Dashboard = ({ bugs, t }) => {
    // --- Подготовка данных для графиков ---

    // 1. Данные по Приоритетам (для BarChart)
    const priorityData = [
        { name: t.priority.Low, count: bugs.filter(b => b.priority === 'Low').length, color: '#22c55e' },
        { name: t.priority.Medium, count: bugs.filter(b => b.priority === 'Medium').length, color: '#eab308' },
        { name: t.priority.High, count: bugs.filter(b => b.priority === 'High').length, color: '#ef4444' },
        { name: t.priority.Critical, count: bugs.filter(b => b.priority === 'Critical').length, color: '#b91c1c' },
    ];

    // 2. Данные по Статусам (для PieChart)
    const statusData = [
        { name: t.status_opt.Open, value: bugs.filter(b => b.status === 'Open').length, color: '#3b82f6' },
        { name: t.status_opt.InProgress, value: bugs.filter(b => b.status === 'In Progress').length, color: '#8b5cf6' },
        { name: t.status_opt.Done, value: bugs.filter(b => b.status === 'Done').length, color: '#10b981' },
    ];

    // Основные цифры (как были раньше)
    const totalBugs = bugs.length;
    const criticalBugs = bugs.filter(bug => bug.priority === 'Critical').length;
    const fixedBugs = bugs.filter(bug => bug.status === 'Done').length;

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Заголовок */}
            <h2 className="text-3xl font-bold text-gray-800">{t.dash_title}</h2>

            {/* --- Блок 1: Карточки с цифрами (KPI) --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">{t.total_bugs}</h3>
                    <p className="text-4xl font-bold text-gray-800 mt-2">{totalBugs}</p>
                    <p className="text-xs text-gray-400 mt-1">{t.active_tasks}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">{t.fixed}</h3>
                    <p className="text-4xl font-bold text-gray-800 mt-2">{fixedBugs}</p>
                    <p className="text-xs text-gray-400 mt-1">{t.status_done}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500 hover:shadow-md transition">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">{t.critical}</h3>
                    <p className="text-4xl font-bold text-red-600 mt-2">{criticalBugs}</p>
                    <p className="text-xs text-gray-400 mt-1">{t.attention}</p>
                </div>
            </div>

            {/* --- Блок 2: Графики --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* График 1: Приоритеты */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">Priority Breakdown</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={priorityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis allowDecimals={false} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                    {priorityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* График 2: Статусы */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">Project Status</h3>
                    <div className="h-64 flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;