import React from 'react';

const Dashboard = ({ bugs, t }) => {
    const totalBugs = bugs.length;
    const criticalBugs = bugs.filter(bug => bug.priority === 'Critical').length;
    const fixedBugs = bugs.filter(bug => bug.status === 'Done').length;

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800">{t.dash_title}</h2>

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
        </div>
    );
};

export default Dashboard;