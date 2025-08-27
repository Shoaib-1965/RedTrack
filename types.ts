
import type { ReactNode } from 'react';

export interface Cycle {
  startDate: string;
  endDate: string;
}

export interface DayLog {
  mood?: Mood;
  symptoms?: Symptom[];
  medications?: string[];
  notes?: string;
  isPeriodDay: boolean;
}

export interface CycleData {
  cycles: Cycle[];
  dayLogs: Record<string, DayLog>;
}

export interface UserSettings {
  cycleLength: number;
  periodLength: number;
  userName: string;
}

export type Symptom = 'cramps' | 'headache' | 'bloating' | 'fatigue' | 'nausea' | 'acne';
export type Mood = 'happy' | 'sad' | 'anxious' | 'energetic' | 'calm' | 'irritable';
export type Page = 'dashboard' | 'reports' | 'settings';

export interface Prediction {
  nextPeriod: Date[];
  fertileWindow: Date[];
  ovulationDay: Date | null;
}

export interface CycleDataContextType {
  settings: UserSettings;
  data: CycleData;
  prediction: Prediction;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  logDay: (date: string, log: Partial<DayLog>) => void;
  togglePeriodDays: (dates: string[]) => void;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title: string;
}

// FIX: Add type definition for the `ion-icon` web component to fix JSX errors.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        name: string;
        class?: string;
      };
    }
  }
}
