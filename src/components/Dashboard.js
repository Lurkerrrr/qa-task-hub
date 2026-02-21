import React from 'react';
import { motion } from 'framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = ({ t, bugs = [] }) => {

    // ВАЖНО: Предохранитель. Если сервер вернул ошибку, делаем пустой массив, чтобы .filter не сломал приложение
    const safeBugs = Array.isArray(bugs) ? bugs : [];

    const priorityCounts = [
        safeBugs.filter(b => b.priority === 'Highest').length,
        safeBugs.filter(b => b.priority === 'High').length,
        safeBugs.filter(b => b.priority === 'Medium').length,
        safeBugs.filter(b => b.priority === 'Low').length,
        safeBugs.filter(b => b.priority === 'Lowest').length,
    ];

    const barData = {
        labels: [t.priority.Highest, t.priority.High, t.priority.Medium, t.priority.Low, t.priority.Lowest],
        datasets: [
            {
                label: 'Bug Count',
                data: priorityCounts,
                backgroundColor: ['#DC2626', '#EA580C', '#EAB308', '#22C55E', '#64748B'],
                borderRadius: 4,
                barThickness: 30,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f3f4f6' } },
            x: { grid: { display: false } }
        }
    };

    const doneCount = safeBugs.filter(b => b.status === 'Done').length;
    const wipCount = safeBugs.filter(b => b.status === 'In Progress' || b.status === 'InProgress').length;
    const openCount = safeBugs.filter(b => b.status === 'Open').length;

    const totalStatus = doneCount + wipCount + openCount;
    const isEmpty = totalStatus === 0;

    const doughnutData = {
        labels: [t.status_opt.Done, t.status_opt.InProgress, t.status_opt.Open],
        datasets: [
            {
                data: isEmpty ? [1] : [doneCount, wipCount, openCount],
                backgroundColor: isEmpty ? ['#F3F4F6'] : ['#22C55E', '#3B82F6', '#EF4444'],
                borderWidth: 0,
                hoverOffset: isEmpty ? 0 : 4,
            },
        ],
    };

    const doughnutOptions = {
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: !isEmpty } },
    };

    const totalBugs = safeBugs.length;
    const fixedBugs = doneCount;
    const activeBugs = totalBugs - fixedBugs;

    const activeCriticalBugs = safeBugs.filter(b =>
        (b.priority === 'Highest' || b.severity === 'Critical') &&
        b.status !== 'Done'
    ).length;

    const successRate = totalBugs === 0 ? 0 : Math.round((fixedBugs / totalBugs) * 100);
    const criticalDensity = totalBugs === 0 ? 0 : Math.round((activeCriticalBugs / totalBugs) * 100);

    const recentActivity = [...safeBugs].sort((a, b) => b.id - a.id).slice(0, 5);

    const showWarningBanner = totalBugs > 0 && criticalDensity >= 80;

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">{t.dash_title}</h2>
                    <p className="text-gray-500 mt-1">{new Date().toLocaleDateString()} • {t.active_tasks}: <span className="font-bold text-blue-600">{activeBugs}</span></p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
                    <p className="text-gray-400 text-sm font-medium uppercase">{t.total_bugs}</p>
                    <h3 className="text-4xl font-bold text-gray-800 mt-2">{totalBugs}</h3>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
                    <p className="text-gray-400 text-sm font-medium uppercase">{t.fixed}</p>
                    <h3 className="text-4xl font-bold text-green-600 mt-2">{fixedBugs}</h3>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-red-500">
                    <p className="text-gray-400 text-sm font-medium uppercase">{t.critical}</p>
                    <h3 className={`text-4xl font-bold mt-2 ${activeCriticalBugs > 0 ? 'text-red-600' : 'text-gray-800'}`}>{activeCriticalBugs}</h3>
                    {activeCriticalBugs > 0 && <p className="text-xs text-red-500 mt-1 font-bold animate-pulse">{t.attention}</p>}
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-700 mb-6">{t.chart_priority}</h3>
                    <div className="flex-grow min-h-[250px] relative">
                        <Bar options={barOptions} data={barData} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-700 mb-6">{t.chart_status}</h3>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-10 h-full">
                        <div className="relative w-48 h-48 flex-shrink-0">
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-extrabold text-gray-800">{successRate}%</span>
                                <span className="text-xs text-gray-400 uppercase font-semibold">{t.status_opt.Done}</span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center gap-4 w-full sm:w-auto">
                            <div className="flex items-center justify-between sm:justify-start gap-4 w-full min-w-[140px]">
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded bg-green-500"></span>
                                    <span className="text-sm font-semibold text-gray-700">{t.status_opt.Done}</span>
                                </div>
                                <span className="text-sm font-bold text-gray-800 ml-auto">{doneCount}</span>
                            </div>
                            <div className="flex items-center justify-between sm:justify-start gap-4 w-full min-w-[140px]">
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded bg-blue-500"></span>
                                    <span className="text-sm font-semibold text-gray-700">{t.status_opt.InProgress}</span>
                                </div>
                                <span className="text-sm font-bold text-gray-800 ml-auto">{wipCount}</span>
                            </div>
                            <div className="flex items-center justify-between sm:justify-start gap-4 w-full min-w-[140px]">
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded bg-red-500"></span>
                                    <span className="text-sm font-semibold text-gray-700">{t.status_opt.Open}</span>
                                </div>
                                <span className="text-sm font-bold text-gray-800 ml-auto">{openCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6">{t.project_health}</h3>
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600">{t.success_rate}</span>
                            <span className="text-sm font-bold text-gray-600">{successRate}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3">
                            <div className="bg-green-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${successRate}%` }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600">{t.critical_density}</span>
                            <span className={`text-sm font-bold ${criticalDensity >= 80 ? 'text-red-600' : 'text-gray-600'}`}>{criticalDensity}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3">
                            <div className="h-3 rounded-full transition-all duration-1000 bg-red-500" style={{ width: `${criticalDensity}%` }}></div>
                        </div>
                    </div>

                    {showWarningBanner && (
                        <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100 animate-pulse">
                            <div className="flex items-center gap-3 text-red-600 font-bold">
                                <span>{t.risk_high}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{t.recent_activity}</h3>
                <div className="space-y-4">
                    {recentActivity.map(bug => (
                        <div key={bug.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition border-b border-gray-50 last:border-0">
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${bug.priority === 'Highest' || bug.priority === 'Critical' ? 'bg-red-500' :
                                bug.priority === 'High' ? 'bg-orange-500' : 'bg-green-500'
                                }`}></div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-gray-800 truncate">{bug.title}</p>
                                <p className="text-xs text-gray-400">{bug.date} • {bug.assignee}</p>
                            </div>
                            <span className={`ml-auto text-[10px] px-2 py-0.5 rounded font-bold uppercase ${bug.status === 'Done' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-700'
                                }`}>
                                {bug.status === 'Done' ? 'DONE' : 'WIP'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;