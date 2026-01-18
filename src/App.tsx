import { useState } from 'react';
import './index.css';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { P2PMarket } from './components/P2PMarket';
import { Sidebar } from './components/Sidebar';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  // Initialize state from localStorage for "Test Mode" persistence
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('fractal_isLoggedIn') === 'true';
  });
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem('fractal_userEmail') || '';
  });

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem('fractal_isLoggedIn', 'true');
    localStorage.setItem('fractal_userEmail', email);
    navigate('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    localStorage.removeItem('fractal_isLoggedIn');
    localStorage.removeItem('fractal_userEmail');
    navigate('landing');
  };

  // ---------------- LAYOUT LOGIC ---------------- //

  // 1. Private Layout (Sidebar + Content)
  if (isLoggedIn) {
    return (
      <div className="app-private" style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' }}>
        <Sidebar
          currentPage={currentPage}
          onNavigate={navigate}
          onLogout={handleLogout}
          userEmail={userEmail}
        />
        <main style={{ marginLeft: '260px', flex: 1, padding: '2rem' }}>
          {currentPage === 'dashboard' && <Dashboard onNavigate={navigate} />}
          {currentPage === 'p2p' && <P2PMarket />}
          {currentPage === 'wallet' && <PlaceholderPage title="Billetera" />}
          {currentPage === 'settings' && <PlaceholderPage title="Configuración" />}
          {/* If user tries to go to 'landing' while logged in, show dashboard or redirects? For now, dashboard */}
          {(currentPage === 'landing' || currentPage === 'login' || currentPage === 'register') && <Dashboard onNavigate={navigate} />}
        </main>
      </div>
    );
  }

  // 2. Public Layout (Navbar + Content)
  return (
    <div className="app-public" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        isLoggedIn={false}
        onLogout={handleLogout}
        currentPage={currentPage}
        onNavigate={navigate}
      />
      <main style={{ flex: 1 }}>
        {currentPage === 'landing' && <LandingPage onNavigate={navigate} />}
        {currentPage === 'login' && <Auth mode="login" onLogin={handleLogin} onNavigate={navigate} />}
        {currentPage === 'register' && <Auth mode="register" onLogin={handleLogin} onNavigate={navigate} />}
        {/* Fallback */}
        {!['landing', 'login', 'register'].includes(currentPage) && <LandingPage onNavigate={navigate} />}
      </main>
      <footer style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)', padding: '2rem 0', marginTop: 'auto', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
        <p>© 2026 NexoBol Exchange. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="animate-fade-in text-center" style={{ paddingTop: '4rem' }}>
    <h2 style={{ color: 'var(--color-text-secondary)' }}>{title}</h2>
    <p style={{ marginTop: '1rem' }}>Próximamente en la versión completa.</p>
  </div>
);

export default App;
