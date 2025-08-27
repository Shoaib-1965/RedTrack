
import React, { useState } from 'react';
import { DEFAULT_PIN } from '../constants';

interface PinLockScreenProps {
  onUnlock: () => void;
}

const PinLockScreen: React.FC<PinLockScreenProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handlePinInput = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        validatePin(newPin);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError(false);
  };
  
  const validatePin = (finalPin: string) => {
    if (finalPin === DEFAULT_PIN) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => {
        setPin('');
        setError(false);
      }, 800);
    }
  };

  const pinDots = Array.from({ length: 4 }).map((_, i) => (
    <div
      key={i}
      className={`w-4 h-4 rounded-full border-2 border-primary transition-all ${
        pin.length > i ? 'bg-primary' : 'bg-transparent'
      } ${error ? 'animate-shake border-red-500' : ''}`}
    />
  ));
  
  return (
    <div className="bg-background min-h-screen flex flex-col justify-between items-center p-8 max-w-md mx-auto">
      <div className="text-center mt-16">
        <ion-icon name="sparkles-outline" class="text-6xl text-primary"></ion-icon>
        <h1 className="text-2xl font-bold text-text-primary mt-4">Welcome to Blossom</h1>
        <p className="text-text-secondary mt-2">Enter your PIN to continue</p>
        <p className="text-text-secondary text-xs mt-1">(Default PIN is {DEFAULT_PIN})</p>
      </div>
      
      <div className="flex space-x-4 mb-8">
        {pinDots}
      </div>

      <div className="grid grid-cols-3 gap-6 w-full max-w-xs">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <PinButton key={num} value={String(num)} onClick={handlePinInput} />
        ))}
        <div />
        <PinButton value="0" onClick={handlePinInput} />
        <button onClick={handleDelete} className="text-2xl text-primary flex items-center justify-center">
            <ion-icon name="backspace-outline"></ion-icon>
        </button>
      </div>

        <style>{`
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            .animate-shake {
                animation: shake 0.5s ease-in-out;
            }
        `}</style>
    </div>
  );
};

interface PinButtonProps {
    value: string;
    onClick: (value: string) => void;
}

const PinButton: React.FC<PinButtonProps> = ({ value, onClick }) => (
    <button
        onClick={() => onClick(value)}
        className="w-16 h-16 bg-white rounded-full text-2xl font-bold text-primary shadow-md flex items-center justify-center
                   active:bg-light-pink transition-colors"
    >
        {value}
    </button>
);


export default PinLockScreen;
