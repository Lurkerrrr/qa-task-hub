import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import BugTracker from './components/BugTracker';
import ExternalAPI from './components/ExternalAPI';
import Auth from './components/Auth';
import { translations } from './locales/translations';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  const [bugs, setBugs] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });

  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const t = translations[language];

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
  }, []);

  useEffect(() => {
    if (token) {
      fetch(`${API_URL}/bugs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => {
          if (res.status === 401 || res.status === 403) {
            handleLogout();
            throw new Error("Unauthorized");
          }
          return res.json();
        })
        .then(data => setBugs(data))
        .catch(err => console.error("Error loading bugs:", err));
    }
  }, [token, API_URL, handleLogout]);

  const handleLogin = (newToken, newUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const handleAddBug = async (newBug) => {
    try {
      const { id, ...bugData } = newBug;
      const response = await fetch(`${API_URL}/bugs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bugData)
      });

      if (!response.ok) throw new Error('Failed to create bug');

      const savedBug = await response.json();
      setBugs(prev => [savedBug, ...prev]);
    } catch (error) {
      console.error("Error creating bug:", error);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await fetch(`${API_URL}/bugs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      setBugs(prev => prev.map(bug =>
        bug.id === id ? { ...bug, status: newStatus } : bug
      ));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteBug = async (id) => {
    try {
      await fetch(`${API_URL}/bugs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setBugs(prev => prev.filter(bug => bug.id !== id));
    } catch (error) {
      console.error("Error deleting bug:", error);
    }
  };

  if (!token) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header
        language={language}
        setLanguage={setLanguage}
        t={t}
        user={user}
        onLogout={handleLogout}
      />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 pt-24 pb-8">
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

      <footer className="w-full bg-slate-50 border-t border-slate-200 text-center text-gray-400 py-6 text-sm">
        <p>{t.footer}</p>
      </footer>

      <ScrollToTop />
    </div>
  );
};

export default App;