import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

interface AuthScreenProps {
  onLogin: () => void;
  onSignup: (userName: string) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onSignup }) => {
  const [view, setView] = useState<'landing' | 'login' | 'signup'>('landing');

  const renderContent = () => {
    switch (view) {
      case 'login':
        return <Login onLoginSuccess={onLogin} switchToSignup={() => setView('signup')} />;
      case 'signup':
        return <Signup onSignupSuccess={onSignup} switchToLogin={() => setView('login')} />;
      case 'landing':
      default:
        return (
          <div className="text-center w-full">
            <ion-icon name="heart-circle-outline" class="text-7xl text-primary"></ion-icon>
            <h1 className="text-3xl font-bold text-text-primary mt-4">Welcome to CycleEase</h1>
            <p className="text-text-secondary mt-2 mb-10">Making cycle tracking easy and insightful.</p>
            <div className="space-y-4">
                <button onClick={() => setView('signup')} className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-pink-500 transition-colors">
                    Sign Up
                </button>
                <button onClick={() => setView('login')} className="w-full bg-light-pink text-primary font-bold py-3 px-6 rounded-lg transition-colors">
                    Log In
                </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col justify-center items-center p-8 max-w-md mx-auto">
      {renderContent()}
    </div>
  );
};

export default AuthScreen;
