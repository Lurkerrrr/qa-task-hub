import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import BugTracker from './components/BugTracker';
import ExternalAPI from './components/ExternalAPI';
import Auth from './components/Auth';
import { translations } from './locales/translations';

const App = () => {
  const [bugs, setBugs] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  // Language initialization
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const t = translations[language];

  // API Base URL from .env
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Load bugs only if token exists
  useEffect(() => {
    if (token) {
      fetch(`${API_URL}/bugs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => {
          if (res.status === 401 || res.status === 403) {
            handleLogout(); // Token expired
            throw new Error("Unauthorized");
          }
          return res.json();
        })
        .then(data => setBugs(data))
        .catch(err => console.error("Error loading bugs:", err));
    }
  }, [token, API_URL]);

  const handleLogin = (newToken, newUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
  };

  // Create new bug
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

  // Update bug status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await fetch(`${API_URL}/bugs/${id}`, {
        method: 'PUT', // Note: Ensure backend supports PUT /bugs/:id or use PATCH
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

  // Delete bug
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

  // If not authenticated, show Auth screen
  if (!token) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header
        language={language}
        setLanguage={setLanguage}
        t={t}
      />

      {/* Logout Button (Temporary placement in Header area usually, but here for utility) */}
      <div className="absolute top-4 right-32 z-50">
        <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700 font-bold">
          Logout ({user?.name})
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-8">
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