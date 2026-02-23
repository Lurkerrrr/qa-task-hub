import React from 'react';
import { IBug } from '../types/interfaces';
import { TranslationSchema } from '../locales/translations';
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
    ChartOptions
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface DashboardProps {
    t: TranslationSchema;
    bugs: IBug[];
}

const Dashboard: React.FC<DashboardProps> = ({ t, bugs = [] }) => {
    const safeBugs = Array.isArray(bugs) ? bugs : [];

    const priorityCounts = [
        safeBugs.filter((b) => b.priority === 'Highest').length,
        safeBugs.filter((b) => b.priority === 'High').length,
        safeBugs.filter((b) => b.priority === 'Medium').length,
        safeBugs.filter((b) => b.priority === 'Low').length,
        safeBugs.filter((b) => b.priority === 'Lowest').length,
    ];

    const doneCount = safeBugs.filter((b) => b.status === 'Done').length;
    const wipCount = safeBugs.filter((b) => b.status === 'In Progress' || b.status === 'InProgress').length;
    const openCount = safeBugs.filter((b) => b.status === 'Open').length;

    const totalBugs = safeBugs.length;
    const activeBugs = totalBugs - doneCount;
    const successRate = totalBugs === 0 ? 0 : Math.round((doneCount / totalBugs) * 100);

    const activeCriticalBugs = safeBugs.filter(
        (b) => (b.priority === 'Highest' || b.priority === 'Critical') && b.status !== 'Done'
    ).length;

    const criticalDensity = totalBugs === 0 ? 0 : Math.round((activeCriticalBugs / totalBugs) * 100);
    const showWarningBanner = totalBugs > 0 && criticalDensity >= 80;

    const barOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    font: { weight: 'bold' }
                },
                grid: { color: '#f1f5f9' }
            },
            x: {
                grid: { display: false },
                ticks: { font: { weight: 'bold' } }
            }
        }
    };

    const doughnutOptions: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    font: { size: 12, weight: 'bold' }
                }
            }
        }
    };

    const barData = {
        labels: [t.priority.Highest, t.priority.High, t.priority.Medium, t.priority.Low, t.priority.Lowest],
        datasets: [{
            data: priorityCounts,
            backgroundColor: ['#DC2626', '#EA580C', '#EAB308', '#22C55E', '#64748B'],
            borderRadius: 6,
            barThickness: 25,
        }],
    };

    const doughnutData = {
        labels: [t.status_opt.Done, t.status_opt.InProgress, t.status_opt.Open],
        datasets: [{
            data: totalBugs === 0 ? [0, 0, 1] : [doneCount, wipCount, openCount],
            backgroundColor: totalBugs === 0 ? ['#F3F4F6'] : ['#22C55E', '#3B82F6', '#EF4444'],
            borderWidth: 0,
        }],
    };

    const recentActivity = [...safeBugs].sort((a, b) => b.id - a.id).slice(0, 5);

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div>
                <h2 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
                    {t.dash_title}
                </h2>
                <p className="text-slate-500 mt-2 font-medium">
                    {new Date().toLocaleDateString('en-GB').replace(/\//g, '.')} • {t.active_tasks}:
                    <span className="ml-1 text-blue-600 font-bold">{activeBugs}</span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-8 rounded-2xl shadow-sm border-l-[6px] border-blue-500 flex flex-col justify-center min-h-[160px]"
                >
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{t.total_bugs}</p>
                    <h3 className="text-5xl font-black text-slate-800 mt-2">{totalBugs}</h3>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-8 rounded-2xl shadow-sm border-l-[6px] border-green-500 flex flex-col justify-center min-h-[160px]"
                >
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{t.fixed}</p>
                    <h3 className="text-5xl font-black text-green-600 mt-2">{doneCount}</h3>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-8 rounded-2xl shadow-sm border-l-[6px] border-red-500 flex flex-col justify-center min-h-[160px]"
                >
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{t.critical}</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className={`text-5xl font-black mt-2 ${activeCriticalBugs > 0 ? 'text-red-600' : 'text-slate-800'}`}>
                            {activeCriticalBugs}
                        </h3>
                    </div>
                    {activeCriticalBugs > 0 && (
                        <p className="text-red-500 text-xs font-bold mt-1 animate-pulse">
                            {(t as any).attention || 'Requires attention!'}
                        </p>
                    )}
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-[480px] flex flex-col">
                    <h3 className="text-xl font-bold text-slate-800 mb-8">{t.chart_priority}</h3>
                    <div className="flex-grow">
                        <Bar options={barOptions} data={barData} />
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-[480px] flex flex-col">
                    <h3 className="text-xl font-bold text-slate-800 mb-8">{t.chart_status}</h3>
                    <div className="flex-grow relative">
                        <div className="w-full h-full max-h-[320px]">
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none translate-y-[-20px]">
                            <span className="text-4xl font-black text-slate-800 leading-none">{successRate}%</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                {t.status_opt.Done}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">{(t as any).project_health || 'Project Health'}</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-slate-600">{(t as any).success_rate || 'Success Rate'}</span>
                                <span className="text-sm font-bold text-slate-600">{successRate}%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-3">
                                <div
                                    className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                                    style={{ width: `${successRate}%` }}
                                ></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-slate-600">{(t as any).critical_density || 'Critical Density'}</span>
                                <span className={`text-sm font-bold ${criticalDensity >= 80 ? 'text-red-600' : 'text-slate-600'}`}>
                                    {criticalDensity}%
                                </span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-3">
                                <div
                                    className="h-3 rounded-full transition-all duration-1000 bg-red-500"
                                    style={{ width: `${criticalDensity}%` }}
                                ></div>
                            </div>
                        </div>

                        {showWarningBanner && (
                            <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100 animate-pulse">
                                <div className="flex items-center gap-3 text-red-600 font-bold">
                                    <span>{(t as any).risk_high || '⚠️ High Risk! Action needed.'}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">{t.recent_activity}</h3>
                    <div className="space-y-4">
                        {recentActivity.length > 0 ? recentActivity.map((bug) => (
                            <div
                                key={bug.id}
                                className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition border-b border-slate-50 last:border-0"
                            >
                                <div
                                    className={`w-2 h-2 rounded-full flex-shrink-0 ${bug.priority === 'Highest' || bug.priority === 'Critical'
                                        ? 'bg-red-500'
                                        : bug.priority === 'High'
                                            ? 'bg-orange-500'
                                            : 'bg-blue-500'
                                        }`}
                                ></div>
                                <div className="overflow-hidden flex-grow">
                                    <p className="text-sm font-bold text-slate-800 truncate">
                                        {bug.title}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {bug.date} • {bug.assignee || 'Unassigned'}
                                    </p>
                                </div>
                                <span
                                    className={`ml-auto text-[10px] px-2 py-0.5 rounded font-bold uppercase ${bug.status === 'Done'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-blue-50 text-blue-700'
                                        }`}
                                >
                                    {bug.status === 'Done' ? 'DONE' : 'WIP'}
                                </span>
                            </div>
                        )) : (
                            <p className="text-slate-400 text-center py-4">No recent activity</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;