import React, { useState } from 'react';
import Calendar from './Calendar';
import DayDetailModal from './DayDetailModal';
import type { CycleDataContextType } from '../types';

interface DashboardProps {
  cycleDataContext: CycleDataContextType;
}

const Dashboard: React.FC<DashboardProps> = ({ cycleDataContext }) => {
  const { prediction } = cycleDataContext;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
  };

  const closeModal = () => {
    setSelectedDate(null);
  };

  const getDaysUntilNextPeriod = () => {
    if (prediction.nextPeriod.length === 0) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextPeriodStart = new Date(prediction.nextPeriod[0]);
    nextPeriodStart.setHours(0, 0, 0, 0);
    const diffTime = nextPeriodStart.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const daysUntil = getDaysUntilNextPeriod();

  return (
    <div className="flex flex-col space-y-6">
      <div className="bg-gradient-to-br from-primary to-pink-400 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
        <div>
          <p className="text-lg">Next Period In</p>
          {daysUntil !== null && daysUntil >= 0 ? (
            <p className="text-4xl font-bold">{daysUntil} Days</p>
          ) : (
            <p className="text-lg font-bold">Log a period to see predictions</p>
          )}
        </div>
        <div className="text-5xl opacity-80">
          <ion-icon name="water-outline"></ion-icon>
        </div>
      </div>

      <Calendar onDayClick={handleDayClick} cycleDataContext={cycleDataContext} />

      {selectedDate && (
        <DayDetailModal 
          isOpen={!!selectedDate}
          onClose={closeModal}
          date={selectedDate}
          cycleDataContext={cycleDataContext}
        />
      )}
    </div>
  );
};

export default Dashboard;