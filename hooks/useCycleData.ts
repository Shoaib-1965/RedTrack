
import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Cycle, DayLog, CycleData, UserSettings, Prediction, CycleDataContextType } from '../types';

const getInitialData = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key “${key}”:`, error);
    return defaultValue;
  }
};

const formatDate = (date: Date): string => date.toISOString().split('T')[0];

export const useCycleData = (): CycleDataContextType => {
  const [settings, setSettings] = useState<UserSettings>(() =>
    getInitialData<UserSettings>('blossom_settings', {
      cycleLength: 28,
      periodLength: 5,
      userName: 'Friend',
    })
  );

  const [data, setData] = useState<CycleData>(() =>
    getInitialData<CycleData>('blossom_data', {
      cycles: [],
      dayLogs: {},
    })
  );

  useEffect(() => {
    try {
      window.localStorage.setItem('blossom_settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings to localStorage:', error);
    }
  }, [settings]);

  useEffect(() => {
    try {
      window.localStorage.setItem('blossom_data', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [data]);

  const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const logDay = useCallback((date: string, log: Partial<DayLog>) => {
    setData((prev) => ({
      ...prev,
      dayLogs: {
        ...prev.dayLogs,
        [date]: { ...prev.dayLogs[date], ...log, isPeriodDay: !!(log.isPeriodDay ?? prev.dayLogs[date]?.isPeriodDay) },
      },
    }));
  }, []);

  const togglePeriodDays = useCallback((dates: string[]) => {
    setData(prevData => {
      const newDayLogs = { ...prevData.dayLogs };
      const newCycles = [...prevData.cycles];
      const isAdding = dates.some(date => !newDayLogs[date]?.isPeriodDay);

      dates.forEach(dateStr => {
        const existingLog = newDayLogs[dateStr] || { isPeriodDay: false };
        newDayLogs[dateStr] = { ...existingLog, isPeriodDay: isAdding };
      });
      
      if (isAdding) {
          const sortedDates = dates.sort();
          const newCycle: Cycle = { startDate: sortedDates[0], endDate: sortedDates[sortedDates.length - 1] };
          // Naive merge/add for simplicity. A real app would have more complex logic.
          const overlappingIndex = newCycles.findIndex(c => 
              (newCycle.startDate >= c.startDate && newCycle.startDate <= c.endDate) ||
              (c.startDate >= newCycle.startDate && c.startDate <= newCycle.endDate)
          );

          if (overlappingIndex > -1) {
              const old = newCycles[overlappingIndex];
              const allDates = [...Array.from(new Set([...dates, old.startDate, old.endDate]))].sort();
              newCycles[overlappingIndex] = { startDate: allDates[0], endDate: allDates[allDates.length-1]};
          } else {
               newCycles.push(newCycle);
          }
      } else {
        dates.forEach(dateStr => {
           for (let i = newCycles.length - 1; i >= 0; i--) {
                if (dateStr >= newCycles[i].startDate && dateStr <= newCycles[i].endDate) {
                    newCycles.splice(i, 1);
                    break;
                }
           }
        });
      }

      newCycles.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      
      return { dayLogs: newDayLogs, cycles: newCycles };
    });
  }, []);

  const prediction = useMemo<Prediction>(() => {
    const lastCycle = data.cycles.length > 0 ? data.cycles[data.cycles.length - 1] : null;
    if (!lastCycle) {
      return { nextPeriod: [], fertileWindow: [], ovulationDay: null };
    }

    const lastPeriodStartDate = new Date(lastCycle.startDate + 'T00:00:00');
    const nextPeriodStartDate = new Date(lastPeriodStartDate);
    nextPeriodStartDate.setDate(nextPeriodStartDate.getDate() + settings.cycleLength);

    const nextPeriod: Date[] = [];
    for (let i = 0; i < settings.periodLength; i++) {
      const day = new Date(nextPeriodStartDate);
      day.setDate(day.getDate() + i);
      nextPeriod.push(day);
    }
    
    const ovulationDay = new Date(nextPeriodStartDate);
    ovulationDay.setDate(ovulationDay.getDate() - 14);

    const fertileWindow: Date[] = [];
    for (let i = 5; i >= 0; i--) {
      const day = new Date(ovulationDay);
      day.setDate(day.getDate() - i);
      fertileWindow.push(day);
    }

    return { nextPeriod, fertileWindow, ovulationDay };
  }, [data.cycles, settings.cycleLength, settings.periodLength]);
  
  return { settings, data, prediction, updateSettings, logDay, togglePeriodDays };
};

