
import React, { useState } from 'react';
import type { CycleDataContextType, UserSettings } from '../types';

interface SettingsProps {
  cycleDataContext: CycleDataContextType;
}

const Settings: React.FC<SettingsProps> = ({ cycleDataContext }) => {
  const { settings, updateSettings } = cycleDataContext;
  const [localSettings, setLocalSettings] = useState<UserSettings>(settings);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalSettings(prev => ({ ...prev, [name]: name === 'userName' ? value : Number(value) }));
    setSaved(false);
  };
  
  const handleSave = () => {
    updateSettings(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const exportData = () => {
    const dataStr = JSON.stringify({settings: cycleDataContext.settings, data: cycleDataContext.data}, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'blossom_data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="text-text-secondary">Personalize your experience.</p>
      </header>

      <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            name="userName"
            id="userName"
            value={localSettings.userName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div>
          <label htmlFor="cycleLength" className="block text-sm font-medium text-gray-700">Average Cycle Length (days)</label>
          <input
            type="number"
            name="cycleLength"
            id="cycleLength"
            value={localSettings.cycleLength}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="periodLength" className="block text-sm font-medium text-gray-700">Average Period Length (days)</label>
          <input
            type="number"
            name="periodLength"
            id="periodLength"
            value={localSettings.periodLength}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex justify-end items-center space-x-4">
            {saved && <span className="text-sm text-accent">Saved!</span>}
            <button
                onClick={handleSave}
                className="bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-pink-500 transition-colors"
            >
                Save Changes
            </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
         <h3 className="font-semibold text-text-primary">Data Management</h3>
         <p className="text-sm text-text-secondary">Your data is stored only on this device. You can export it for your own records or to transfer to another device.</p>
         <button onClick={exportData} className="bg-accent text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-green-500 transition-colors">
            Export My Data
         </button>
      </div>

    </div>
  );
};

export default Settings;
