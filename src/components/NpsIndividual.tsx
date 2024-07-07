import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PersonMetrics {
  name: string;
  nps: number;
  csat: number;
  rd: number;
}

const names = [
  'Persona 1', 'Persona 2', 'Persona 3', 'Persona 4', 'Persona 5',
  'Persona 6', 'Persona 7', 'Persona 8', 'Persona 9', 'Persona 10',
  'Persona 11', 'Persona 12', 'Persona 13', 'Persona 14', 'Persona 15',
  'Persona 16', 'Persona 17', 'Persona 18', 'Persona 19', 'Persona 20'
];

const NpsIndividual: React.FC = () => {
  const [peopleMetrics, setPeopleMetrics] = useState<PersonMetrics[]>(() => {
    const storedMetrics = localStorage.getItem('peopleMetrics');
    if (storedMetrics) {
      return JSON.parse(storedMetrics);
    } else {
      return names.map(name => ({
        name,
        nps: 0,
        csat: 0,
        rd: 0
      }));
    }
  });

  useEffect(() => {
    localStorage.setItem('peopleMetrics', JSON.stringify(peopleMetrics));
  }, [peopleMetrics]);

  const getNpsColor = (nps: number) => {
    if (nps < 0) return '#FF0000'; // Red
    if (nps >= 0 && nps <= 20) return '#FFFF00'; // Yellow
    if (nps > 20 && nps <= 100) return '#00FF00'; // Green
    return '#000000'; // Default color
  };

  const getCsatColor = (csat: number) => {
    if (csat < 60) return '#FFFF00'; // Yellow
    return '#000000'; // Default color
  };

  const handleMetricChange = (index: number, metric: keyof PersonMetrics, value: string) => {
    setPeopleMetrics(prevMetrics => {
      const newMetrics = [...prevMetrics];
      newMetrics[index] = {
        ...newMetrics[index],
        [metric]: parseFloat(value)
      };
      return newMetrics;
    });
  };

  return (
    <div className="p-6 text-black bg-gray-900 rounded-lg shadow-lg">
      <h1 className="mb-4 text-3xl font-bold">Métricas Individuales por Persona</h1>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart data={peopleMetrics} layout="vertical">
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="nps">
            {peopleMetrics.map((entry, index) => (
              <Bar key={index} dataKey="nps" fill={getNpsColor(entry.nps)} />
            ))}
          </Bar>
          <Bar dataKey="csat">
            {peopleMetrics.map((entry, index) => (
              <Bar key={index} dataKey="csat" fill={getCsatColor(entry.csat)} />
            ))}
          </Bar>
          <Bar dataKey="rd" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4">
        {peopleMetrics.map((person, index) => (
          <div key={index} className="mb-4">
            <h3 className="mb-2 text-xl font-bold">{person.name}</h3>
            <div className="flex items-center">
              <label className="mr-2">NPS:</label>
              <input
                type="number"
                value={person.nps}
                onChange={(e) => handleMetricChange(index, 'nps', e.target.value)}
                className="w-16 bg-transparent border-b border-teal-400 focus:outline-none"
              />
              <label className="ml-4 mr-2">CSAT:</label>
              <input
                type="number"
                value={person.csat}
                onChange={(e) => handleMetricChange(index, 'csat', e.target.value)}
                className="w-16 bg-transparent border-b border-teal-400 focus:outline-none"
              />
              <label className="ml-4 mr-2">RD:</label>
              <input
                type="number"
                value={person.rd}
                onChange={(e) => handleMetricChange(index, 'rd', e.target.value)}
                className="w-16 bg-transparent border-b border-teal-400 focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NpsIndividual;
