
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import Settings from './components/Settings';
import PinLockScreen from './components/PinLockScreen';
import { useCycleData } from './hooks/useCycleData';
import type { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isLocked, setIsLocked] = useState(true);
  const cycleDataContext = useCycleData();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard cycleDataContext={cycleDataContext} />;
      case 'reports':
        return <Reports cycleDataContext={cycleDataContext} />;
      case 'settings':
        return <Settings cycleDataContext={cycleDataContext} />;
      default:
        return <Dashboard cycleDataContext={cycleDataContext} />;
    }
  };

  if (isLocked) {
    return <PinLockScreen onUnlock={() => setIsLocked(false)} />;
  }

  return (
    <div className="bg-background min-h-screen font-sans text-text-primary flex flex-col max-w-md mx-auto shadow-2xl">
      <main className="flex-grow p-4 pb-20">
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
