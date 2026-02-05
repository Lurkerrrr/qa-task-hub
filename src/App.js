import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Импорт данных (Словарь)
import { translations } from './locales/translations';

// Импорт компонентов (Смотри, как чисто стало! 😍)
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import BugTracker from './components/BugTracker';
import ExternalAPI from './components/ExternalAPI';

function App() {
  // --- Global State (Глобальное состояние приложения) ---

  // 1. Язык
  const [lang, setLang] = useState(() => localStorage.getItem('app_lang') || 'en');

  // 2. Баги (Lifting State Up - состояние живет здесь)
  const [bugs, setBugs] = useState(() => {
    const saved = localStorage.getItem('bugs');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Login button broken', priority: 'Critical', assignee: 'Anton', status: 'Open', date: '2026-02-01', steps: 'Click btn', timeSpent: 0 }
    ];
  });

  // --- Effects (Сохранение данных) ---
  useEffect(() => { localStorage.setItem('app_lang', lang); }, [lang]);
  useEffect(() => { localStorage.setItem('bugs', JSON.stringify(bugs)); }, [bugs]);

  // --- Helpers ---
  // Получаем нужный перевод в зависимости от выбранного языка
  const t = translations[lang];

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">

        {/* Хедер теперь живет в отдельном файле и получает функции управления языком */}
        <Header lang={lang} setLang={setLang} t={t} />

        <main className="container mx-auto px-6 py-8 flex-grow max-w-6xl">
          <Routes>
            {/* Dashboard: только читает данные */}
            <Route path="/" element={<Dashboard bugs={bugs} t={t} />} />

            {/* Tracker: читает и изменяет данные (setBugs) */}
            <Route path="/tracker" element={<BugTracker bugs={bugs} setBugs={setBugs} t={t} />} />

            {/* API: работает автономно, нужен только перевод */}
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