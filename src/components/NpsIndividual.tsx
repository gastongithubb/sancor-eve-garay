import React, { useState, useEffect } from 'react';
import { sql } from '@vercel/postgres';

interface Metric {
  id: number;
  name: string;
  responses: number;
  nps: number;
  csat: number;
}

const NpsIndividual: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        setIsLoading(true);
        setError(null);
        const result = await sql`SELECT * FROM metrics`;
        console.log("Metrics fetched:", result.rows);
        setMetrics(result.rows as Metric[]);
      } catch (err) {
        console.error("Error fetching metrics:", err);
        setError("Error al cargar las métricas. Por favor, intenta de nuevo más tarde.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMetrics();
  }, []);

  const handleMetricChange = async (id: number, field: keyof Metric, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    try {
      setError(null);
      let result;
      if (field === 'responses') {
        result = await sql`UPDATE metrics SET responses = ${numValue} WHERE id = ${id} RETURNING *`;
      } else if (field === 'nps') {
        result = await sql`UPDATE metrics SET nps = ${numValue} WHERE id = ${id} RETURNING *`;
      } else if (field === 'csat') {
        result = await sql`UPDATE metrics SET csat = ${numValue} WHERE id = ${id} RETURNING *`;
      }
      
      if (result && result.rows.length > 0) {
        console.log("Metric updated:", result.rows[0]);
        setMetrics(metrics.map(metric => 
          metric.id === id ? result!.rows[0] as Metric : metric
        ));
      }
    } catch (err) {
      console.error("Error updating metric:", err);
      setError("Error al actualizar la métrica. Por favor, intenta de nuevo.");
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Cargando métricas...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500 bg-red-100 rounded">{error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-3xl font-bold">Métricas Individuales</h1>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Q de respuestas</th>
            <th className="p-2 text-left">NPS</th>
            <th className="p-2 text-left">CSAT</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => (
            <tr key={metric.id} className="border-b">
              <td className="p-2">{metric.name}</td>
              <td className="p-2">
                <input
                  type="number"
                  value={metric.responses}
                  onChange={(e) => handleMetricChange(metric.id, 'responses', e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  value={metric.nps}
                  onChange={(e) => handleMetricChange(metric.id, 'nps', e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  value={metric.csat}
                  onChange={(e) => handleMetricChange(metric.id, 'csat', e.target.value)}
                  className="w-full p-1 border rounded"
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