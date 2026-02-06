import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Импорт данных
import { translations } from './locales/translations';

// Импорт компонентов
import Header from './components/Header';
import AnimatedRoutes from './components/AnimatedRoutes';

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
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col overflow-x-hidden">

        <Header lang={lang} setLang={setLang} t={t} />

        {/* ИСПРАВЛЕНО: Добавили pt-24, чтобы контент не прятался под закрепленным хедером */}
        <main className="container mx-auto px-6 py-8 flex-grow max-w-6xl relative pt-24">
          <AnimatedRoutes bugs={bugs} setBugs={setBugs} t={t} />
        </main>

        <ScrollToTop />

        <footer className="bg-white border-t py-6 mt-auto text-center text-gray-500 text-sm">
          <p>{t.footer}</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;