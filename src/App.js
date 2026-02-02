import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// --- Компоненты Dashboard и API ---
const Dashboard = () => (
  <div className="space-y-6 animate-fade-in">
    <h2 className="text-3xl font-bold text-gray-800">📊 Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition">
        <h3 className="text-gray-500 text-sm font-medium uppercase">Всего багов</h3>
        <p className="text-4xl font-bold text-gray-800 mt-2">12</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition">
        <h3 className="text-gray-500 text-sm font-medium uppercase">Исправлено</h3>
        <p className="text-4xl font-bold text-gray-800 mt-2">8</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500 hover:shadow-md transition">
        <h3 className="text-gray-500 text-sm font-medium uppercase">Критические</h3>
        <p className="text-4xl font-bold text-gray-800 mt-2">2</p>
      </div>
    </div>
  </div>
);

const ExternalAPI = () => (
  <div className="space-y-4">
    <h2 className="text-3xl font-bold text-gray-800">🌐 External API</h2>
    <div className="bg-white p-8 rounded-xl shadow-sm text-center">
      <p className="text-gray-600">Здесь мы скоро подключим реальные данные.</p>
    </div>
  </div>
);

// --- Продвинутый Bug Tracker (v2.1 - Fixes) ---
const BugTracker = () => {
  // Инициализация State из LocalStorage
  const [bugs, setBugs] = useState(() => {
    const saved = localStorage.getItem('bugs');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Кнопка "Login" не работает', priority: 'Critical', assignee: 'Anton', status: 'Open', date: '2026-02-01', steps: 'Нажать кнопку', timeSpent: 0 }
    ];
  });

  // Поля формы
  const [newBug, setNewBug] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assignee, setAssignee] = useState('Viktor');
  const [steps, setSteps] = useState('');

  // Ошибки валидации
  const [errors, setErrors] = useState({});

  // Поиск
  const [searchQuery, setSearchQuery] = useState('');

  // Сохранение в LocalStorage
  useEffect(() => {
    localStorage.setItem('bugs', JSON.stringify(bugs));
  }, [bugs]);

  // Валидация
  const validateForm = () => {
    let tempErrors = {};
    // Проверка названия
    if (!newBug.trim()) tempErrors.title = "⚠️ Название бага обязательно!";

    // (2) Проверка шагов (новое требование)
    if (!steps.trim()) tempErrors.steps = "⚠️ Шаги воспроизведения обязательны!";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Добавление бага
  const handleAddBug = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const bug = {
      id: Date.now(),
      title: newBug,
      priority: priority,
      assignee: assignee,
      steps: steps,
      status: 'Open',
      date: new Date().toISOString().split('T')[0],
      timeSpent: 0
    };

    setBugs([bug, ...bugs]);
    setNewBug('');
    setSteps('');
    setErrors({});
  };

  // Удаление
  const handleDelete = (id) => {
    setBugs(bugs.filter(bug => bug.id !== id));
  };

  // Смена статуса
  const handleStatusChange = (id, newStatus) => {
    setBugs(bugs.map(bug =>
      bug.id === id ? { ...bug, status: newStatus } : bug
    ));
  };

  // Добавление времени
  const handleLogTime = (id) => {
    const hours = prompt("Сколько часов потрачено?");
    if (hours && !isNaN(hours)) {
      setBugs(bugs.map(bug =>
        bug.id === id ? { ...bug, timeSpent: bug.timeSpent + parseFloat(hours) } : bug
      ));
    }
  };

  const filteredBugs = bugs.filter(bug =>
    bug.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">🐞 Bug Tracker Pro</h2>
        <input
          type="text"
          placeholder="🔍 Найти баг..."
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Форма добавления */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleAddBug} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Название бага..."
                spellCheck="true"
                className={`w-full p-3 border rounded-lg focus:ring-2 outline-none ${errors.title ? 'border-red-500 ring-red-200' : 'border-gray-200 focus:ring-blue-500'}`}
                value={newBug}
                onChange={(e) => setNewBug(e.target.value)}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <select
              className="p-3 border rounded-lg bg-white"
              value={priority}
              onChange={e => setPriority(e.target.value)}
            >
              <option value="Critical">🔥 Critical</option>
              <option value="High">🔴 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>
            <select
              className="p-3 border rounded-lg bg-white"
              value={assignee}
              onChange={e => setAssignee(e.target.value)}
            >
              <option value="Viktor">Viktor (QA)</option>
              <option value="Anton">Anton (Dev)</option>
              <option value="Maria">Maria (PM)</option>
            </select>
          </div>

          <div>
            <textarea
              placeholder="Шаги воспроизведения..."
              spellCheck="true"
              className={`w-full p-3 border rounded-lg focus:ring-2 outline-none h-20 resize-none ${errors.steps ? 'border-red-500 ring-red-200' : 'border-gray-200 focus:ring-blue-500'}`}
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            />
            {/* Ошибка для шагов */}
            {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
          </div>

          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            + Создать баг
          </button>
        </form>
      </div>

      {/* Список багов */}
      <div className="space-y-4">
        {filteredBugs.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">Баги не найдены...</p>
        ) : (
          filteredBugs.map((bug) => (
            <div key={bug.id} className={`bg-white p-5 rounded-lg shadow-sm border-l-4 transition hover:shadow-md
              ${bug.status === 'Done' ? 'border-green-400 opacity-70' : 'border-blue-500'}`}>

              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${bug.priority === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                      {bug.priority}
                    </span>
                    <span className="text-xs text-gray-400">{bug.date}</span>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                      👤 {bug.assignee}
                    </span>

                    {/* (1) ОТОБРАЖЕНИЕ ВРЕМЕНИ: Только если > 0 */}
                    {bug.timeSpent > 0 && (
                      <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-mono">
                        ⏱ {bug.timeSpent}h
                      </span>
                    )}
                  </div>

                  <h3 className={`text-lg font-bold ${bug.status === 'Done' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {bug.title}
                  </h3>

                  {bug.steps && (
                    <p className="text-gray-500 text-sm mt-1 bg-gray-50 p-2 rounded">
                      🛠 {bug.steps}
                    </p>
                  )}
                </div>

                {/* Управление */}
                <div className="flex flex-col items-end gap-2 ml-4">
                  <select
                    className="text-sm border rounded px-2 py-1 outline-none cursor-pointer mb-2"
                    value={bug.status}
                    onChange={(e) => handleStatusChange(bug.id, e.target.value)}
                  >
                    <option value="Open">📂 Open</option>
                    <option value="In Progress">⚙️ In Progress</option>
                    <option value="Done">✅ Done</option>
                  </select>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLogTime(bug.id)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded transition"
                      title="Залогировать время"
                    >
                      + Time
                    </button>

                    <button
                      onClick={() => handleDelete(bug.id)}
                      className="text-gray-300 hover:text-red-500 transition p-1"
                      title="Удалить навсегда"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// --- Main App ---
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
        <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              <div className="text-xl font-bold tracking-wider text-blue-400">QA Task Hub</div>
            </div>
            <ul className="flex space-x-8 font-medium">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Dashboard</Link></li>
              <li><Link to="/tracker" className="hover:text-blue-400 transition-colors">Tracker</Link></li>
              <li><Link to="/api" className="hover:text-blue-400 transition-colors">API</Link></li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto px-6 py-8 flex-grow max-w-5xl">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tracker" element={<BugTracker />} />
            <Route path="/api" element={<ExternalAPI />} />
          </Routes>
        </main>
        <footer className="bg-white border-t py-6 mt-auto text-center text-gray-500 text-sm">
          <p>&copy; 2026 QA Task Hub. Student Project.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;