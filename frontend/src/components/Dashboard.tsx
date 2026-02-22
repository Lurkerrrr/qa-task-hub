import React from 'react';
import { IBug } from '../types/interfaces';
import { TranslationSchema } from '../locales/translations';
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

    // --- Data Calculations ---
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

    // --- Chart Configurations ---
    const barOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false, // Prevents layout breakage
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
            {/* Header section */}
            <div>
                <h2 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
                    {t.dash_title} {/* Hardcoded emoji removed as it exists in t.dash_title */}
                </h2>
                <p className="text-slate-500 mt-2 font-medium">
                    {new Date().toLocaleDateString('en-GB').replace(/\//g, '.')} • {t.active_tasks}:
                    <span className="ml-1 text-blue-600 font-bold">{activeBugs}</span>
                </p>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border-l-[6px] border-blue-500 flex flex-col justify-center min-h-[160px]">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{t.total_bugs}</p>
                    <h3 className="text-5xl font-black text-slate-800 mt-2">{totalBugs}</h3>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border-l-[6px] border-green-500 flex flex-col justify-center min-h-[160px]">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{t.fixed}</p>
                    <h3 className="text-5xl font-black text-green-600 mt-2">{doneCount}</h3>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border-l-[6px] border-red-500 flex flex-col justify-center min-h-[160px]">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{t.critical}</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-5xl font-black text-red-600 mt-2">{activeCriticalBugs}</h3>
                    </div>
                    {activeCriticalBugs > 0 && (
                        <p className="text-red-500 text-xs font-bold mt-1 animate-pulse">Requires attention!</p>
                    )}
                </div>
            </div>

            {/* Charts section */}
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

                        {/* Centered label with Y-axis offset to compensate for legend */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none translate-y-[-20px]">
                            <span className="text-4xl font-black text-slate-800 leading-none">{successRate}%</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                {t.status_opt.Done}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent activity section */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-6">{t.recent_activity}</h3>
                <div className="divide-y divide-slate-100">
                    {recentActivity.length > 0 ? recentActivity.map((bug) => (
                        <div key={bug.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-3 h-3 rounded-full ${bug.priority === 'Highest' || bug.priority === 'High' ? 'bg-red-500' : 'bg-blue-400'}`} />
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">{bug.title}</p>
                                    <p className="text-xs text-slate-400 font-medium">{bug.date} • {bug.assignee || 'Unassigned'}</p>
                                </div>
                            </div>
                            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded font-black uppercase tracking-tighter">
                                {bug.status}
                            </span>
                        </div>
                    )) : (
                        <p className="text-slate-400 text-center py-4">No recent activity</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;