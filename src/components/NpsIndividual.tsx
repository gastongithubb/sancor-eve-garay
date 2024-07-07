import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface Metrics {
  responses: number[];
  nps: number[];
  csat: number[];
  rd: number[];
  names: string[];
}

const initialMetrics: Metrics = {
  responses: Array(20).fill(0),
  nps: Array(20).fill(0),
  csat: Array(20).fill(0),
  rd: Array(20).fill(0),
  names: [
    'Abigail Veyga', 'Agustin Suarez', 'Aucg Heil', 'Carrizo Tula', 'Danna Cruz', 
    'Franco Alvarez', 'Gaston Alvarez', 'Javier Rodriguez', 'Jeremías Flores', 
    'Karen Aranda', 'Karen Chavez', 'Lautaro Brocal', 'Macarena Gomez', 
    'Marcos Montenegro', 'Milagros Juncos', 'Nicolas Macagno', 'Victoria Martinez', 
    'Ismael Irirarte', 'Zaida Abreu'
  ]
};

const NpsIndividual: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics>(initialMetrics);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    console.log('useEffect - checking if in browser');
    if (typeof window !== 'undefined') {
      console.log('useEffect - in browser');
      const storedMetrics = localStorage.getItem('metrics');
      if (storedMetrics) {
        console.log('useEffect - found stored metrics', JSON.parse(storedMetrics));
        setMetrics(JSON.parse(storedMetrics));
      } else {
        setMetrics(initialMetrics); // Fallback to initial metrics if nothing is stored
      }
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient && metrics) {
      console.log('useEffect - saving metrics to localStorage', metrics);
      localStorage.setItem('metrics', JSON.stringify(metrics));
    }
  }, [metrics, isClient]);

  const handleMetricChange = (metric: keyof Metrics, value: string, index: number) => {
    setMetrics(prevMetrics => {
      if (!prevMetrics) return prevMetrics;
      const newMetrics = { ...prevMetrics };
      const numValue = parseFloat(value);
      (newMetrics[metric] as number[])[index] = numValue;
      console.log('handleMetricChange - updated metrics', newMetrics);
      return newMetrics;
    });
  };

  const getNpsColor = (nps: number) => {
    if (nps < 0) return '#FFC6CE'; // Rojo
    if (nps >= 0 && nps < 15) return '#FFEA9C'; // Amarillo
    return '#C6F0CE'; // Verde
  };

  const getCsatRdColor = (value: number) => {
    if (value < 65) return '#FFC6CE'; // Rojo
    if (value >= 65 && value <= 69) return '#FFEA9C'; // Amarillo
    return '#C6F0CE'; // Verde
  };

  if (!isClient) {
    return <div>Cargando...</div>; // Renderiza un mensaje de carga mientras se determina si está en el navegador
  }

  const chartData = metrics.names.map((name, index) => ({
    name,
    responses: metrics.responses[index],
    nps: metrics.nps[index],
    csat: metrics.csat[index],
    rd: metrics.rd[index]
  }));

  return (
    <div className="p-6 text-black bg-gray-100 rounded-lg shadow-lg">
      <h1 className="mb-6 text-3xl font-bold">Métricas Individuales</h1>
      <div className="mb-6" style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#000000" />
            <YAxis stroke="#000000" />
            <Tooltip />
            <Legend />
            <Bar dataKey="nps">
              {chartData.map((entry, index) => (
                <Cell key={`nps-${index}`} fill={getNpsColor(entry.nps)} />
              ))}
            </Bar>
            <Bar dataKey="csat">
              {chartData.map((entry, index) => (
                <Cell key={`csat-${index}`} fill={getCsatRdColor(entry.csat)} />
              ))}
            </Bar>
            <Bar dataKey="rd">
              {chartData.map((entry, index) => (
                <Cell key={`rd-${index}`} fill={getCsatRdColor(entry.rd)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="py-2">Nombre</th>
            <th className="py-2">Q de respuestas</th>
            <th className="py-2">NPS</th>
            <th className="py-2">CSAT</th>
            <th className="py-2">RD</th>
          </tr>
        </thead>
        <tbody>
          {metrics.names.map((name, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-2">{name}</td>
              <td className="py-2">
                <input
                  type="number"
                  value={metrics.responses[index]}
                  onChange={(e) => handleMetricChange('responses', e.target.value, index)}
                  className="w-full p-1 text-black bg-gray-200 rounded"
                />
              </td>
              <td className="py-2">
                <input
                  type="number"
                  value={metrics.nps[index]}
                  onChange={(e) => handleMetricChange('nps', e.target.value, index)}
                  className="w-full p-1 text-black bg-gray-200 rounded"
                />
              </td>
              <td className="py-2">
                <input
                  type="number"
                  value={metrics.csat[index]}
                  onChange={(e) => handleMetricChange('csat', e.target.value, index)}
                  className="w-full p-1 text-black bg-gray-200 rounded"
                />
              </td>
              <td className="py-2">
                <input
                  type="number"
                  value={metrics.rd[index]}
                  onChange={(e) => handleMetricChange('rd', e.target.value, index)}
                  className="w-full p-1 text-black bg-gray-200 rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NpsIndividual;
