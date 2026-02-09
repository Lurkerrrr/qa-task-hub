import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // Импортируем роутер
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import BugTracker from './components/BugTracker';
import ExternalAPI from './components/ExternalAPI';
import { translations } from './locales/translations';

const App = () => {
  // Данные багов
  const [bugs, setBugs] = useState([]);

  // Язык (инициализируем из localStorage или 'en')
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const t = translations[language];

  // Сохраняем язык при изменении
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // --- ЗАГРУЗКА ДАННЫХ (GET) ---
  useEffect(() => {
    fetch('http://localhost:5000/bugs')
      .then(res => res.json())
      .then(data => setBugs(data))
      .catch(err => console.error("Ошибка загрузки багов:", err));
  }, []);

  // --- СОЗДАНИЕ (POST) ---
  const handleAddBug = async (newBug) => {
    try {
      // Удаляем ID, так как база данных сама его создаст
      const { id, ...bugData } = newBug;

      const response = await fetch('http://localhost:5000/bugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bugData)
      });
      const savedBug = await response.json();
      setBugs(prev => [savedBug, ...prev]);
    } catch (error) {
      console.error("Ошибка при создании:", error);
    }
  };

  // --- ОБНОВЛЕНИЕ (PUT) ---
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/bugs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setBugs(prev => prev.map(bug =>
        bug.id === id ? { ...bug, status: newStatus } : bug
      ));
    } catch (error) {
      console.error("Ошибка обновления:", error);
    }
  };

  // --- УДАЛЕНИЕ (DELETE) ---
  const handleDeleteBug = async (id) => {
    try {
      await fetch(`http://localhost:5000/bugs/${id}`, {
        method: 'DELETE'
      });
      setBugs(prev => prev.filter(bug => bug.id !== id));
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header
        language={language}
        setLanguage={setLanguage}
        t={t}
      />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        {/* НАСТРОЙКА МАРШРУТОВ */}
        <Routes>
          <Route path="/" element={<Dashboard t={t} bugs={bugs} />} />
          <Route path="/tracker" element={
            <BugTracker
              t={t}
              bugs={bugs}
              onAddBug={handleAddBug}
              onDeleteBug={handleDeleteBug}
              onUpdateStatus={handleUpdateStatus}
            />
          } />
          <Route path="/api" element={<ExternalAPI t={t} />} />
        </Routes>
      </main>

      <footer className="text-center text-gray-400 py-6 text-sm">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
};

export default App;