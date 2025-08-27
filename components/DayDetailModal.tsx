
import React, { useState, useEffect } from 'react';
import { MOODS, SYMPTOMS } from '../constants';
import type { DayLog, Mood, Symptom, CycleDataContextType } from '../types';
import Modal from './shared/Modal';

interface DayDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  cycleDataContext: CycleDataContextType;
}

const DayDetailModal: React.FC<DayDetailModalProps> = ({ isOpen, onClose, date, cycleDataContext }) => {
  const { logDay, data } = cycleDataContext;
  const initialLog = data.dayLogs[date] || { isPeriodDay: false };

  const [currentLog, setCurrentLog] = useState<DayLog>(initialLog);

  useEffect(() => {
    setCurrentLog(data.dayLogs[date] || { isPeriodDay: false });
  }, [date, data.dayLogs]);

  const handleSave = () => {
    logDay(date, currentLog);
    onClose();
  };

  const toggleSymptom = (symptom: Symptom) => {
    const symptoms = currentLog.symptoms || [];
    if (symptoms.includes(symptom)) {
      setCurrentLog({ ...currentLog, symptoms: symptoms.filter(s => s !== symptom) });
    } else {
      setCurrentLog({ ...currentLog, symptoms: [...symptoms, symptom] });
    }
  };

  const setMood = (mood: Mood) => {
    setCurrentLog({ ...currentLog, mood });
  };
  
  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={formattedDate}>
      <div className="space-y-6 p-1">
        <div>
          <h3 className="font-semibold mb-2 text-text-primary">Mood</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {MOODS.map(({ id, label, icon }) => (
              <button key={id} onClick={() => setMood(id)} className={`p-2 flex flex-col items-center rounded-lg border-2 transition-all ${currentLog.mood === id ? 'border-primary bg-light-pink' : 'border-transparent bg-gray-100'}`}>
                <span className="text-2xl">{icon}</span>
                <span className="text-xs mt-1 text-text-secondary">{label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2 text-text-primary">Symptoms</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {SYMPTOMS.map(({ id, label, icon }) => (
              <button key={id} onClick={() => toggleSymptom(id)} className={`p-2 flex flex-col items-center rounded-lg border-2 transition-all ${currentLog.symptoms?.includes(id) ? 'border-primary bg-light-pink' : 'border-transparent bg-gray-100'}`}>
                 <span className="text-2xl">{icon}</span>
                <span className="text-xs mt-1 text-text-secondary">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-text-primary">Notes</h3>
          <textarea
            value={currentLog.notes || ''}
            onChange={(e) => setCurrentLog({ ...currentLog, notes: e.target.value })}
            className="w-full h-24 p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Any personal observations..."
          />
        </div>

        <div className="flex justify-end pt-4">
          <button onClick={handleSave} className="bg-primary text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-pink-500 transition-colors">
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DayDetailModal;
