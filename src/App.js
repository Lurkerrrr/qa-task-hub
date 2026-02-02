import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Компоненты-заглушки
const Dashboard = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
        <h3 className="text-gray-500 text-sm font-medium">Всего багов</h3>
        <p className="text-3xl font-bold">12</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
        <h3 className="text-gray-500 text-sm font-medium">Исправлено</h3>
        <p className="text-3xl font-bold">8</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
        <h3 className="text-gray-500 text-sm font-medium">Критические</h3>
        <p className="text-3xl font-bold">2</p>
      </div>
    </div>
  </div>
);

const BugTracker = () => (
  <div className="space-y-4">
    <h2 className="text-3xl font-bold text-gray-800">Bug Tracker</h2>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-600">Здесь будет таблица со списком багов (CRUD функционал).</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        + Добавить баг
      </button>
    </div>
  </div>
);

const ExternalAPI = () => (
  <div className="space-y-4">
    <h2 className="text-3xl font-bold text-gray-800">External API</h2>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-600">Здесь будут загружаться данные из внешнего источника.</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-900 flex flex-col">
        {/* Header */}
        <header className="bg-slate-900 text-white shadow-lg">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold tracking-wider text-blue-400">QA Task Hub</div>
            <ul className="flex space-x-8 font-medium">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Dashboard</Link></li>
              <li><Link to="/tracker" className="hover:text-blue-400 transition-colors">Tracker</Link></li>
              <li><Link to="/api" className="hover:text-blue-400 transition-colors">API</Link></li>
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8 flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tracker" element={<BugTracker />} />
            <Route path="/api" element={<ExternalAPI />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-auto py-6">
          <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
            <p>&copy; 2026 QA Task Hub. Student Project.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;