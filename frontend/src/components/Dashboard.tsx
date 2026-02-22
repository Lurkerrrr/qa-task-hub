import React from 'react';
import { motion } from 'framer-motion';
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

    // Спільні налаштування для графіків
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Це критично важливо!
        plugins: { legend: { position: 'bottom' as const } }
    };

    const barData = {
        labels: [t.priority.Highest, t.priority.High, t.priority.Medium, t.priority.Low, t.priority.Lowest],
        datasets: [{
            data: priorityCounts,
            backgroundColor: ['#DC2626', '#EA580C', '#EAB308', '#22C55E', '#64748B'],
            borderRadius: 6,
        }],
    };

    const doughnutData = {
        labels: [t.status_opt.Done, t.status_opt.InProgress, t.status_opt.Open],
        datasets: [{
            data: totalBugs === 0 ? [1] : [doneCount, wipCount, openCount],
            backgroundColor: totalBugs === 0 ? ['#F3F4F6'] : ['#22C55E', '#3B82F6', '#EF4444'],
            borderWidth: 0,
        }],
    };

    const recentActivity = [...safeBugs].sort((a, b) => b.id - a.id).slice(0, 5);

    return (
        <div className="space-y-6 animate-fade-in pb-16">
            <h2 className="text-3xl font-bold text-gray-800">{t.dash_title}</h2>

            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: t.total_bugs, val: totalBugs, color: 'blue' },
                    { label: t.fixed, val: doneCount, color: 'green' },
                    { label: t.critical, val: safeBugs.filter(b => b.priority === 'Highest' && b.status !== 'Done').length, color: 'red' }
                ].map((item, idx) => (
                    <div key={idx} className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 border-${item.color}-500`}>
                        <p className="text-gray-400 text-xs font-bold uppercase">{item.label}</p>
                        <h3 className="text-4xl font-black text-gray-800 mt-2">{item.val}</h3>
                    </div>
                ))}
            </div>

            {/* Графіки - ТУТ ФІКС ВИСОТИ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[400px]">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">{t.chart_priority}</h3>
                    <div className="h-[280px]">
                        <Bar data={barData} options={options} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[400px]">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">{t.chart_status}</h3>
                    <div className="h-[280px]">
                        <Doughnut data={doughnutData} options={options} />
                    </div>
                </div>
            </div>

            {/* Останні події */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{t.recent_activity}</h3>
                <div className="space-y-3">
                    {recentActivity.map((bug) => (
                        <div key={bug.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div>
                                <p className="text-sm font-bold">{bug.title}</p>
                                <p className="text-xs text-gray-400">{bug.date} • {bug.assignee}</p>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-1 rounded bg-white shadow-sm uppercase">{bug.status}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;