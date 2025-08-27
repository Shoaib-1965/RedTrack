
import type { Symptom, Mood } from './types';

export const SYMPTOMS: { id: Symptom; label: string; icon: string }[] = [
  { id: 'cramps', label: 'Cramps', icon: '🔥' },
  { id: 'headache', label: 'Headache', icon: '🤕' },
  { id: 'bloating', label: 'Bloating', icon: '🎈' },
  { id: 'fatigue', label: 'Fatigue', icon: '😴' },
  { id: 'nausea', label: 'Nausea', icon: '🤢' },
  { id: 'acne', label: 'Acne', icon: '🍓' },
];

export const MOODS: { id: Mood; label: string; icon: string }[] = [
  { id: 'happy', label: 'Happy', icon: '😊' },
  { id: 'sad', label: 'Sad', icon: '😢' },
  { id: 'anxious', label: 'Anxious', icon: '😟' },
  { id: 'energetic', label: 'Energetic', icon: '⚡' },
  { id: 'calm', label: 'Calm', icon: '😌' },
  { id: 'irritable', label: 'Irritable', icon: '😠' },
];

export const DEFAULT_PIN = '1234';
