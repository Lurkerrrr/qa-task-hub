import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Импорт данных
import { translations } from './locales/translations';

// Импорт компонентов
import Header from './components/Header';
import AnimatedRoutes from './components/AnimatedRoutes'; // <-- Подключаем анимацию

function App() {
  // --- Global State ---
  const [lang, setLang] = useState(() => localStorage.getItem('app_lang') || 'en');

  const [bugs, setBugs] = useState(() => {
    const saved = localStorage.getItem('bugs');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Login button broken', priority: 'Critical', assignee: 'Anton', status: 'Open', date: '2026-02-01', steps: 'Click btn', timeSpent: 0 }
    ];
  });

  // --- Effects ---
  useEffect(() => { localStorage.setItem('app_lang', lang); }, [lang]);
  useEffect(() => { localStorage.setItem('bugs', JSON.stringify(bugs)); }, [bugs]);

  const t = translations[lang];

  return (
    <Router>
      {/* overflow-x-hidden нужен, чтобы не появлялась полоса прокрутки во время анимации */}
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col overflow-x-hidden">

        <Header lang={lang} setLang={setLang} t={t} />

        <main className="container mx-auto px-6 py-8 flex-grow max-w-6xl relative">
          {/* Используем AnimatedRoutes вместо обычных Routes */}
          <AnimatedRoutes bugs={bugs} setBugs={setBugs} t={t} />
        </main>

        <footer className="bg-white border-t py-6 mt-auto text-center text-gray-500 text-sm">
          <p>{t.footer}</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;