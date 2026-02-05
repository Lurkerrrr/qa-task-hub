import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// --- 🌍 СЛОВАРЬ ПЕРЕВОДОВ (DICTIONARY) ---
const translations = {
  en: {
    dashboard: "Dashboard",
    tracker: "Tracker",
    api: "API Explorer",
    footer: "© 2026 QA Task Hub. Student Project.",

    // Dashboard
    dash_title: "📊 Dashboard Live",
    total_bugs: "Total Bugs",
    active_tasks: "Active tasks in system",
    fixed: "Fixed",
    status_done: "Status 'Done'",
    critical: "Critical",
    attention: "Requires attention!",

    // Tracker
    tracker_title: "🐞 Bug Tracker Pro",
    search_placeholder: "🔍 Search bug...",
    placeholder_title: "Bug title...",
    placeholder_steps: "Steps to reproduce...",
    btn_add: "+ Create Bug",
    err_title: "⚠️ Bug title is required!",
    err_steps: "⚠️ Steps are required!",

    // API
    api_title: "🌐 API Explorer",
    search_api: "🔍 Search in",
    loading: "Loading data...",
    method: "METHOD",
    status: "STATUS",
    time: "TIME",

    // Dropdown options
    priority: { Critical: "🔥 Critical", High: "🔴 High", Medium: "🟡 Medium", Low: "🟢 Low" },
    status_opt: { Open: "📂 Open", InProgress: "⚙️ In Progress", Done: "✅ Done" }
  },
  pl: {
    dashboard: "Panel",
    tracker: "Śledzenie",
    api: "Eksplorator API",
    footer: "© 2026 QA Task Hub. Projekt Studencki.",

    dash_title: "📊 Panel Główny",
    total_bugs: "Wszystkie Błędy",
    active_tasks: "Aktywne zadania w systemie",
    fixed: "Naprawione",
    status_done: "Status 'Gotowe'",
    critical: "Krytyczne",
    attention: "Wymaga uwagi!",

    tracker_title: "🐞 Śledzenie Błędów",
    search_placeholder: "🔍 Szukaj błędu...",
    placeholder_title: "Tytuł błędu...",
    placeholder_steps: "Kroki do reprodukcji...",
    btn_add: "+ Dodaj Błąd",
    err_title: "⚠️ Tytuł jest wymagany!",
    err_steps: "⚠️ Kroki są wymagane!",

    api_title: "🌐 Eksplorator API",
    search_api: "🔍 Szukaj w",
    loading: "Ładowanie danych...",
    method: "METODA",
    status: "STATUS",
    time: "CZAS",

    priority: { Critical: "🔥 Krytyczny", High: "🔴 Wysoki", Medium: "🟡 Średni", Low: "🟢 Niski" },
    status_opt: { Open: "📂 Otwarty", InProgress: "⚙️ W toku", Done: "✅ Gotowy" }
  },
  ua: {
    dashboard: "Дашборд",
    tracker: "Трекер",
    api: "API Провідник",
    footer: "© 2026 QA Task Hub. Студентський проект.",

    dash_title: "📊 Дашборд Live",
    total_bugs: "Всього багів",
    active_tasks: "Активні завдання",
    fixed: "Виправлено",
    status_done: "Статус 'Готово'",
    critical: "Критичні",
    attention: "Потребує уваги!",

    tracker_title: "🐞 Баг Трекер Pro",
    search_placeholder: "🔍 Знайти баг...",
    placeholder_title: "Назва багу...",
    placeholder_steps: "Кроки відтворення...",
    btn_add: "+ Створити Баг",
    err_title: "⚠️ Назва обов'язкова!",
    err_steps: "⚠️ Кроки обов'язкові!",

    api_title: "🌐 API Провідник",
    search_api: "🔍 Пошук у",
    loading: "Завантаження...",
    method: "МЕТОД",
    status: "СТАТУС",
    time: "ЧАС",

    priority: { Critical: "🔥 Критичний", High: "🔴 Високий", Medium: "🟡 Середній", Low: "🟢 Низький" },
    status_opt: { Open: "📂 Відкрито", InProgress: "⚙️ В роботі", Done: "✅ Готово" }
  },
  ru: {
    dashboard: "Дашборд",
    tracker: "Трекер",
    api: "API Эксплорер",
    footer: "© 2026 QA Task Hub. Студенческий проект.",

    dash_title: "📊 Дашборд Live",
    total_bugs: "Всего багов",
    active_tasks: "Активные задачи",
    fixed: "Исправлено",
    status_done: "Статус 'Готово'",
    critical: "Критические",
    attention: "Требует внимания!",

    tracker_title: "🐞 Баг Трекер Pro",
    search_placeholder: "🔍 Найти баг...",
    placeholder_title: "Название бага...",
    placeholder_steps: "Шаги воспроизведения...",
    btn_add: "+ Создать Баг",
    err_title: "⚠️ Название обязательно!",
    err_steps: "⚠️ Шаги обязательны!",

    api_title: "🌐 API Эксплорер",
    search_api: "🔍 Поиск в",
    loading: "Загрузка...",
    method: "МЕТОД",
    status: "СТАТУС",
    time: "ВРЕМЯ",

    priority: { Critical: "🔥 Критический", High: "🔴 Высокий", Medium: "🟡 Средний", Low: "🟢 Низкий" },
    status_opt: { Open: "📂 Открыто", InProgress: "⚙️ В работе", Done: "✅ Готово" }
  }
};

// --- КОМПОНЕНТЫ ---

// 1. Dashboard (Теперь получает данные bugs из пропсов!)
const Dashboard = ({ bugs, t }) => {
  // Считаем статистику на лету
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

// 2. External API (Остается без изменений, работает автономно)
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

// 3. Bug Tracker (Больше не хранит bugs сам, а получает их из App)
const BugTracker = ({ bugs, setBugs, t }) => {
  const [newBug, setNewBug] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assignee, setAssignee] = useState('Viktor');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // LocalStorage теперь управляется в App, тут удалили

  const validateForm = () => {
    let tempErrors = {};
    if (!newBug.trim()) tempErrors.title = t.err_title;
    if (!steps.trim()) tempErrors.steps = t.err_steps;
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddBug = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const bug = { id: Date.now(), title: newBug, priority: priority, assignee: assignee, steps: steps, status: 'Open', date: new Date().toISOString().split('T')[0], timeSpent: 0 };
    setBugs([bug, ...bugs]); setNewBug(''); setSteps(''); setErrors({});
  };

  const handleDelete = (id) => setBugs(bugs.filter(bug => bug.id !== id));
  const handleStatusChange = (id, newStatus) => setBugs(bugs.map(bug => bug.id === id ? { ...bug, status: newStatus } : bug));
  const handleLogTime = (id) => {
    const hours = prompt("Hours spent?");
    if (hours && !isNaN(hours)) setBugs(bugs.map(bug => bug.id === id ? { ...bug, timeSpent: bug.timeSpent + parseFloat(hours) } : bug));
  };

  const filteredBugs = bugs.filter(bug => bug.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">{t.tracker_title}</h2>
        <input type="text" placeholder={t.search_placeholder} className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleAddBug} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input type="text" placeholder={t.placeholder_title} className={`w-full p-3 border rounded-lg outline-none ${errors.title ? 'border-red-500' : 'border-gray-200 focus:ring-blue-500'}`} value={newBug} onChange={(e) => setNewBug(e.target.value)} />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            <select className="p-3 border rounded-lg bg-white" value={priority} onChange={e => setPriority(e.target.value)}>
              {Object.keys(t.priority).map(key => <option key={key} value={key}>{t.priority[key]}</option>)}
            </select>
            <select className="p-3 border rounded-lg bg-white" value={assignee} onChange={e => setAssignee(e.target.value)}>
              <option value="Viktor">Viktor (QA)</option><option value="Anton">Anton (Dev)</option><option value="Maria">Maria (PM)</option>
            </select>
          </div>
          <div>
            <textarea placeholder={t.placeholder_steps} className={`w-full p-3 border rounded-lg h-20 resize-none outline-none ${errors.steps ? 'border-red-500' : 'border-gray-200 focus:ring-blue-500'}`} value={steps} onChange={(e) => setSteps(e.target.value)} />
            {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
          </div>
          <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">{t.btn_add}</button>
        </form>
      </div>

      <div className="space-y-4">
        {filteredBugs.length === 0 ? <p className="text-center text-gray-400 mt-10">...</p> : filteredBugs.map((bug) => (
          <div key={bug.id} className={`bg-white p-5 rounded-lg shadow-sm border-l-4 transition hover:shadow-md ${bug.status === 'Done' ? 'border-green-400 opacity-70' : 'border-blue-500'}`}>
            <div className="flex justify-between items-start">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${bug.priority === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{t.priority[bug.priority] || bug.priority}</span>
                  <span className="text-xs text-gray-400">{bug.date}</span>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">👤 {bug.assignee}</span>
                  {bug.timeSpent > 0 && <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-mono">⏱ {bug.timeSpent}h</span>}
                </div>
                <h3 className={`text-lg font-bold ${bug.status === 'Done' ? 'line-through text-gray-500' : 'text-gray-800'}`}>{bug.title}</h3>
                <p className="text-gray-500 text-sm mt-1 bg-gray-50 p-2 rounded">🛠 {bug.steps}</p>
              </div>
              <div className="flex flex-col items-end gap-2 ml-4">
                <select className="text-sm border rounded px-2 py-1 outline-none cursor-pointer mb-2" value={bug.status} onChange={(e) => handleStatusChange(bug.id, e.target.value)}>
                  {Object.keys(t.status_opt).map(key =>
                    <option key={key} value={key === 'InProgress' ? 'In Progress' : key}>{t.status_opt[key]}</option>
                  )}
                </select>
                <div className="flex gap-2">
                  <button onClick={() => handleLogTime(bug.id)} className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded">+ Time</button>
                  <button onClick={() => handleDelete(bug.id)} className="text-gray-300 hover:text-red-500 transition">🗑</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN APP (ГЛАВНЫЙ КОМПОНЕНТ) ---
function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('app_lang') || 'en');

  // !!! ГЛАВНОЕ ИЗМЕНЕНИЕ: Состояние bugs теперь здесь !!!
  const [bugs, setBugs] = useState(() => {
    const saved = localStorage.getItem('bugs');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Login button broken', priority: 'Critical', assignee: 'Anton', status: 'Open', date: '2026-02-01', steps: 'Click btn', timeSpent: 0 }
    ];
  });

  // Сохраняем язык
  useEffect(() => {
    localStorage.setItem('app_lang', lang);
  }, [lang]);

  // Сохраняем баги (теперь сохраняет App, а не Tracker!)
  useEffect(() => {
    localStorage.setItem('bugs', JSON.stringify(bugs));
  }, [bugs]);

  const t = translations[lang];

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
        <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
              <span className="text-2xl">🛡️</span>
              <div className="text-xl font-bold tracking-wider text-blue-400">QA Task Hub</div>
            </Link>

            <div className="flex items-center gap-8">
              <ul className="flex space-x-6 font-medium hidden md:flex">
                <li><Link to="/" className="hover:text-blue-400 transition-colors">{t.dashboard}</Link></li>
                <li><Link to="/tracker" className="hover:text-blue-400 transition-colors">{t.tracker}</Link></li>
                <li><Link to="/api" className="hover:text-blue-400 transition-colors">{t.api}</Link></li>
              </ul>

              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-slate-800 text-white text-sm border border-slate-700 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:bg-slate-700 transition"
              >
                <option value="en">🇺🇸 English</option>
                <option value="pl">🇵🇱 Polski</option>
                <option value="ua">🇺🇦 Українська</option>
                <option value="ru">🇷🇺 Русский</option>
              </select>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-6 py-8 flex-grow max-w-6xl">
          <Routes>
            {/* Передаем bugs в Dashboard (только для чтения) */}
            <Route path="/" element={<Dashboard bugs={bugs} t={t} />} />

            {/* Передаем bugs и setBugs в Tracker (для чтения и записи) */}
            <Route path="/tracker" element={<BugTracker bugs={bugs} setBugs={setBugs} t={t} />} />

            <Route path="/api" element={<ExternalAPI t={t} />} />
          </Routes>
        </main>

        <footer className="bg-white border-t py-6 mt-auto text-center text-gray-500 text-sm">
          <p>{t.footer}</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;