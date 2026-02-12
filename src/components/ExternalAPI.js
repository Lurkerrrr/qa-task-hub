import React, { useState, useEffect } from 'react';

const ExternalAPI = ({ t }) => {
    const [resource, setResource] = useState('users');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const [duration, setDuration] = useState(0);

    const baseUrl = 'https://dummyjson.com';

    useEffect(() => {
        const fullUrl = `${baseUrl}/${resource}`;

        const fetchData = async () => {
            setLoading(true);
            const startTimestamp = performance.now();

            try {
                const response = await fetch(fullUrl + (resource.includes('http') ? '' : '?limit=5'));
                setStatus(response.status);

                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error(error);
                setStatus(0);
                setData({ error: "Network Error" });
            } finally {
                const endTimestamp = performance.now();
                setDuration(Math.round(endTimestamp - startTimestamp));
                setLoading(false);
            }
        };

        fetchData();
    }, [resource]);

    const scenarios = [
        { id: 'users', label: 'Test Users' },
        { id: 'products/category/smartphones', label: 'Test Devices' },
        { id: 'http/404', label: 'Simulate 404' },
        { id: 'http/500', label: 'Simulate 500' },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800">{t.api_title}</h2>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
                    <div className="flex flex-wrap gap-2">
                        {scenarios.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setResource(item.id)}
                                // FIXED: Unified style for all active buttons (Blue)
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${resource === item.id
                                        ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300'
                                        : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto shadow-inner">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-300">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">{t.method}:</span>
                            <span className="bg-green-500 text-black px-2 py-0.5 rounded font-bold text-xs">GET</span>
                        </div>

                        <div className="flex items-center gap-2 flex-grow">
                            <span className="text-gray-500">URL:</span>
                            <span className="text-blue-400 break-all">{`${baseUrl}/${resource}`}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div>
                                <span className="text-gray-500 mr-2">{t.status}:</span>
                                <span className={`font-bold ${status >= 200 && status < 300 ? 'text-green-400' : 'text-red-500'}`}>
                                    {status || '...'}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-500 mr-2">{t.time}:</span>
                                <span className="text-yellow-400">{duration}ms</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 h-96 overflow-y-auto font-mono text-sm text-slate-700 shadow-inner">
                {loading ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                ) : (
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                )}
            </div>
        </div>
    );
};

export default ExternalAPI;