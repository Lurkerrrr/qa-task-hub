import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

const Dashboard = ({ bugs, t }) => {
    // --- Данные для графиков ---
    const priorityData = [
        { name: t.priority.Low, count: bugs.filter(b => b.priority === 'Low').length, color: '#22c55e' },
        { name: t.priority.Medium, count: bugs.filter(b => b.priority === 'Medium').length, color: '#eab308' },
        { name: t.priority.High, count: bugs.filter(b => b.priority === 'High').length, color: '#ef4444' },
        { name: t.priority.Critical, count: bugs.filter(b => b.priority === 'Critical').length, color: '#b91c1c' },
    ];

    const statusData = [
        { name: t.status_opt.Open, value: bugs.filter(b => b.status === 'Open').length, color: '#3b82f6' },
        { name: t.status_opt.InProgress, value: bugs.filter(b => b.status === 'In Progress').length, color: '#8b5cf6' },
        { name: t.status_opt.Done, value: bugs.filter(b => b.status === 'Done').length, color: '#10b981' },
    ];

    const totalBugs = bugs.length;
    const criticalBugs = bugs.filter(bug => bug.priority === 'Critical').length;
    const fixedBugs = bugs.filter(bug => bug.status === 'Done').length;
    const recentBugs = bugs.slice(0, 5);

    // --- НОВАЯ ЛОГИКА: Считаем проценты для Progress Bars ---
    const completionRate = totalBugs > 0 ? Math.round((fixedBugs / totalBugs) * 100) : 0;
    const criticalRate = totalBugs > 0 ? Math.round((criticalBugs / totalBugs) * 100) : 0;

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <h2 className="text-3xl font-bold text-gray-800">{t.dash_title}</h2>

            {/* 1. Карточки KPI */}
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
                    {/* ИСПРАВЛЕНО: Цвет теперь text-gray-800 */}
                    <p className="text-4xl font-bold text-gray-800 mt-2">{criticalBugs}</p>
                    <p className="text-xs text-gray-400 mt-1">{t.attention}</p>
                </div>
            </div>

            {/* 2. НОВЫЙ БЛОК: Project Health (Progress Bars) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-700 mb-6">{t.project_health}</h3>

                <div className="space-y-6">
                    {/* Bar 1: Success Rate */}
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">{t.success_rate}</span>
                            <span className="text-sm font-medium text-green-600">{completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-green-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${completionRate}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Bar 2: Critical Density */}
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">{t.critical_density}</span>
                            <span className={`text-sm font-medium ${criticalRate > 20 ? 'text-red-600' : 'text-gray-600'}`}>{criticalRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${criticalRate > 0 ? 'bg-red-500' : 'bg-gray-300'}`}
                                style={{ width: `${criticalRate}%` }}
                            ></div>
                        </div>
                        {/* ИСПРАВЛЕНО: Используем переменные перевода t.risk_high / t.risk_ok */}
                        <p className="text-xs text-gray-400 mt-1">
                            {criticalRate > 20 ? t.risk_high : t.risk_ok}
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. Графики */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">Project Status</h3>
                    <div className="h-64 flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
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

            {/* 4. Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-700">{t.recent_activity}</h3>
                </div>
                <div className="divide-y divide-gray-50">
                    {recentBugs.map(bug => (
                        <div key={bug.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                            <div className="flex items-center gap-4">
                                <div className={`w-2 h-2 rounded-full ${bug.priority === 'Critical' ? 'bg-red-500' : bug.priority === 'High' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                                <div>
                                    <p className="font-medium text-gray-800">{bug.title}</p>
                                    <p className="text-xs text-gray-400">{bug.date} • {bug.assignee}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 text-xs rounded-full font-medium ${bug.status === 'Done' ? 'bg-green-100 text-green-700' :
                                bug.status === 'In Progress' ? 'bg-purple-100 text-purple-700' :
                                    'bg-blue-100 text-blue-700'
                                }`}>
                                {bug.status}
                            </span>
                        </div>
                    ))}
                    {recentBugs.length === 0 && (
                        <div className="p-8 text-center text-gray-400">No activity yet...</div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Dashboard;