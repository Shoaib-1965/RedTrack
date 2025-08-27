import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import Settings from './components/Settings';
import PinLockScreen from './components/PinLockScreen';
import AuthScreen from './components/auth/AuthScreen';
import ProfileHeader from './components/shared/ProfileHeader';
import { useCycleData } from './hooks/useCycleData';
import type { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const cycleDataContext = useCycleData();

  useEffect(() => {
    const storedAuth = window.localStorage.getItem('cycleease_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    window.localStorage.setItem('cycleease_auth', 'true');
  };

  const handleSignup = (userName: string) => {
    cycleDataContext.updateSettings({ userName });
    setIsAuthenticated(true);
    window.localStorage.setItem('cycleease_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsLocked(true); // Reset lock state for the next login session
    window.localStorage.removeItem('cycleease_auth');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard cycleDataContext={cycleDataContext} />;
      case 'reports':
        return <Reports cycleDataContext={cycleDataContext} />;
      case 'settings':
        return <Settings cycleDataContext={cycleDataContext} onLogout={handleLogout} />;
      default:
        return <Dashboard cycleDataContext={cycleDataContext} />;
    }
  };

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} onSignup={handleSignup} />;
  }

  if (isLocked) {
    return <PinLockScreen onUnlock={() => setIsLocked(false)} />;
  }

  return (
    <div className="bg-background min-h-screen font-sans text-text-primary flex flex-col max-w-md mx-auto shadow-2xl">
      <ProfileHeader 
        userName={cycleDataContext.settings.userName}
        onProfileClick={() => setCurrentPage('settings')}
      />
      <main className="flex-grow p-4 pb-20 overflow-y-auto">
        {renderPage()}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-t max-w-md mx-auto border-t border-gray-200">
        <div className="flex justify-around items-center h-16">
          <NavItem icon="calendar-outline" label="Dashboard" isActive={currentPage === 'dashboard'} onClick={() => setCurrentPage('dashboard')} />
          <NavItem icon="bar-chart-outline" label="Reports" isActive={currentPage === 'reports'} onClick={() => setCurrentPage('reports')} />
          <NavItem icon="settings-outline" label="Settings" isActive={currentPage === 'settings'} onClick={() => setCurrentPage('settings')} />
        </div>
      </nav>
    </div>
  );
};

interface NavItemProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => {
  const activeClass = isActive ? 'text-primary' : 'text-text-secondary';
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center transition-colors duration-200 ${activeClass}`}>
      <ion-icon name={icon} class="text-2xl"></ion-icon>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};


export default App;