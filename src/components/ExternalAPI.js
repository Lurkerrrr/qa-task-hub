import React, { useState, useEffect } from 'react';

const ExternalAPI = ({ t }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [endpoint, setEndpoint] = useState('users');
    const [searchQuery, setSearchQuery] = useState('');
    const [requestMeta, setRequestMeta] = useState({ status: null, duration: null, url: '' });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            const startTime = performance.now();
            const url = `https://jsonplaceholder.typicode.com/${endpoint}`;

            try {
                await new Promise(r => setTimeout(r, 600));
                const response = await fetch(url);
                const jsonData = await response.json();
                const endTime = performance.now();

                setRequestMeta({
                    status: response.status,
                    duration: (endTime - startTime).toFixed(0),
                    url: url
                });

                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                setData(jsonData.slice(0, 12));
            } catch (err) {
                setError(err.message);
                setRequestMeta(prev => ({ ...prev, status: 'ERR' }));
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [endpoint]);

    const filteredData = data.filter(item => {
        const text = searchQuery.toLowerCase();
        const nameMatch = (item.name || '').toLowerCase().includes(text);
        const titleMatch = (item.title || '').toLowerCase().includes(text);
        const emailMatch = (item.email || '').toLowerCase().includes(text);
        return nameMatch || titleMatch || emailMatch;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-800">{t.api_title}</h2>
                <div className="flex bg-gray-200 p-1 rounded-lg">
                    {['users', 'posts', 'todos'].map(type => (
                        <button
                            key={type}
                            onClick={() => setEndpoint(type)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${endpoint === type ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm shadow-inner flex flex-wrap gap-6 items-center border border-slate-700">
                <div className="flex items-center gap-2"><span className="text-slate-500">{t.method}:</span><span className="bg-green-900 text-green-300 px-2 py-0.5 rounded text-xs font-bold">GET</span></div>
                <div className="flex items-center gap-2"><span className="text-slate-500">URL:</span><span className="text-white truncate max-w-xs" title={requestMeta.url}>{requestMeta.url || '...'}</span></div>
                <div className="flex items-center gap-2"><span className="text-slate-500">{t.status}:</span><span className={`${requestMeta.status === 200 ? 'text-green-400' : 'text-red-400'} font-bold`}>{requestMeta.status || '---'}</span></div>
                <div className="flex items-center gap-2"><span className="text-slate-500">{t.time}:</span><span className="text-yellow-400">{requestMeta.duration ? `${requestMeta.duration}ms` : '...'}</span></div>
            </div>

            <input
                type="text"
                placeholder={`${t.search_api} ${endpoint}...`}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {loading && <div className="text-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div><p className="text-gray-500">{t.loading}</p></div>}

            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map(item => (
                        <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition border border-gray-100 flex flex-col items-center text-center group relative overflow-hidden">
                            <div className={`absolute top-0 left-0 w-full h-1 ${endpoint === 'users' ? 'bg-blue-500' : endpoint === 'posts' ? 'bg-purple-500' : 'bg-orange-500'}`}></div>
                            <img src={`https://robohash.org/${item.id}?set=${endpoint === 'users' ? 'set4' : 'set1'}&size=100x100`} alt="avatar" className="w-20 h-20 rounded-full bg-gray-50 mb-4 hover:scale-110 transition duration-300" />
                            <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name || item.title?.substring(0, 30) + '...'}</h3>
                            {endpoint === 'users' && <><p className="text-sm text-blue-500">@{item.username}</p><p className="text-xs text-gray-400 mt-2">{item.email}</p><div className="mt-3 px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">{item.company?.name}</div></>}
                            {endpoint === 'posts' && <p className="text-sm text-gray-500 mt-2 line-clamp-3">{item.body}</p>}
                            {endpoint === 'todos' && <div className={`mt-3 px-4 py-1 rounded-full text-xs font-bold ${item.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.completed ? '✅ Completed' : '⏳ Pending'}</div>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExternalAPI;