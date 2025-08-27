
import React, { useState, useMemo } from 'react';
import type { CycleDataContextType } from '../types';

interface CalendarProps {
  onDayClick: (date: string) => void;
  cycleDataContext: CycleDataContextType;
}

const Calendar: React.FC<CalendarProps> = ({ onDayClick, cycleDataContext }) => {
  const { data, prediction } = cycleDataContext;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<Date[]>([]);

  const formatDate = (date: Date): string => date.toISOString().split('T')[0];

  const handleDayPress = (day: Date) => {
      const newRange = [...selectedRange, day].sort((a,b) => a.getTime() - b.getTime());
      
      if (newRange.length > 2) {
        setSelectedRange([day]);
      } else if (newRange.length === 2) {
          const [start, end] = newRange;
          const fullRange = [];
          let current = new Date(start);
          while(current <= end) {
              fullRange.push(new Date(current));
              current.setDate(current.getDate() + 1);
          }
          setSelectedRange(fullRange);
      } else {
        setSelectedRange(newRange);
      }
  };
  
  const clearSelection = () => {
    setSelectedRange([]);
  };

  const confirmPeriod = () => {
      if (selectedRange.length > 0) {
          const dateStrings = selectedRange.map(formatDate);
          cycleDataContext.togglePeriodDays(dateStrings);
          setSelectedRange([]);
      }
  };

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentDate]);

  const firstDayOfMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month, 1).getDay();
  }, [currentDate]);

  const changeMonth = (amount: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  const getDayClass = (day: Date) => {
    const dateStr = formatDate(day);
    const today = new Date();
    today.setHours(0,0,0,0);

    const isToday = day.getTime() === today.getTime();
    const isSelectedForPeriod = selectedRange.some(d => formatDate(d) === dateStr);
    
    if(isSelectedForPeriod) return 'bg-primary text-white scale-105';
    if(isToday) return 'bg-secondary text-white';

    const dayLog = data.dayLogs[dateStr];
    if (dayLog?.isPeriodDay) return 'bg-primary/70 text-white';

    const isPredictedPeriod = prediction.nextPeriod.some(d => formatDate(d) === dateStr);
    if(isPredictedPeriod) return 'bg-primary/20 border border-primary/50';

    const isFertile = prediction.fertileWindow.some(d => formatDate(d) === dateStr);
    if (isFertile) return 'bg-accent/20 border border-accent/50';

    const isOvulation = prediction.ovulationDay && formatDate(prediction.ovulationDay) === dateStr;
    if(isOvulation) return 'bg-accent/40 border-2 border-accent';
    
    return 'bg-white hover:bg-light-pink';
  };
  
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <h2 className="font-bold text-lg">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100">
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm text-text-secondary mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array(firstDayOfMonth).fill(null).map((_, i) => <div key={`empty-${i}`}></div>)}
        {daysInMonth.map(day => (
          <div key={day.toString()} className="flex justify-center items-center">
            <button
              onClick={() => {
                handleDayPress(day);
                onDayClick(formatDate(day));
              }}
              className={`w-9 h-9 rounded-full transition-all duration-200 ${getDayClass(day)}`}
            >
              {day.getDate()}
            </button>
          </div>
        ))}
      </div>
      
      {selectedRange.length > 0 && (
         <div className="mt-4 flex justify-center items-center space-x-2">
            <button onClick={confirmPeriod} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold">Confirm Period</button>
            <button onClick={clearSelection} className="bg-gray-200 text-text-secondary px-4 py-2 rounded-lg text-sm">Cancel</button>
         </div>
      )}
    </div>
  );
};

export default Calendar;
