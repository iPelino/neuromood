import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Insights from './pages/Insights';
import Login from './pages/Login';
import MoodLogger from './pages/MoodLogger';
import Settings from './pages/Settings';

const ComingSoonPage: React.FC<{title: string}> = ({title}) => (
  <main className="pt-20 md:pt-8 pb-28 md:pb-8 px-container-padding-mobile md:px-container-padding-desktop md:ml-64 max-w-[1600px] mx-auto">
    <h2 className="font-headline-lg-mobile md:font-headline-lg text-text-primary">{title}</h2>
    <p className="text-text-secondary mt-2">Coming soon.</p>
  </main>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <Layout />
            </ErrorBoundary>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="log" element={<MoodLogger />} />
          <Route path="insights" element={<Insights />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
          <Route path="coming-soon" element={<ComingSoonPage title="Coming Soon" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
