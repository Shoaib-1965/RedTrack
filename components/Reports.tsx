
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import type { CycleDataContextType } from '../types';

interface ReportsProps {
  cycleDataContext: CycleDataContextType;
}

const Reports: React.FC<ReportsProps> = ({ cycleDataContext }) => {
  const { data } = cycleDataContext;

  const cycleLengthData = data.cycles.slice(0, -1).map((cycle, index) => {
    if (!data.cycles[index + 1]) return null;
    const start = new Date(cycle.startDate);
    const nextStart = new Date(data.cycles[index + 1].startDate);
    const length = Math.round((nextStart.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return {
      name: `Cycle ${index + 1}`,
      length: length,
    };
  }).filter(Boolean);

  const periodLengthData = data.cycles.map((cycle, index) => {
    const start = new Date(cycle.startDate);
    const end = new Date(cycle.endDate);
    const length = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return {
      name: `Period ${index + 1}`,
      length: length,
    };
  });

  const averageCycleLength = cycleLengthData.length > 0
    ? (cycleLengthData.reduce((acc, curr) => acc + (curr?.length ?? 0), 0) / cycleLengthData.length).toFixed(1)
    : 'N/A';

  const averagePeriodLength = periodLengthData.length > 0
    ? (periodLengthData.reduce((acc, curr) => acc + curr.length, 0) / periodLengthData.length).toFixed(1)
    : 'N/A';
  
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-text-primary">Your Health Insights</h1>
        <p className="text-text-secondary">Visualize your cycle patterns and trends.</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-light-pink p-4 rounded-xl text-center">
            <p className="text-sm text-text-secondary">Avg. Cycle Length</p>
            <p className="text-2xl font-bold text-primary">{averageCycleLength} days</p>
        </div>
        <div className="bg-light-pink p-4 rounded-xl text-center">
            <p className="text-sm text-text-secondary">Avg. Period Length</p>
            <p className="text-2xl font-bold text-primary">{averagePeriodLength} days</p>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h3 className="font-semibold mb-4 text-text-primary">Cycle Length History</h3>
        {cycleLengthData.length > 1 ? (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={cycleLengthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="length" stroke="#FF6B6B" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        ) : <p className="text-center text-text-secondary p-8">Log at least two cycles to see your history.</p>}
      </div>
      
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h3 className="font-semibold mb-4 text-text-primary">Period Length History</h3>
        {periodLengthData.length > 0 ? (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={periodLengthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="length" fill="#FFD166" />
          </BarChart>
        </ResponsiveContainer>
        ) : <p className="text-center text-text-secondary p-8">Log a period to see your history.</p>}
      </div>
    </div>
  );
};

export default Reports;
