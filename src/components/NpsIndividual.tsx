import React, { useState, useEffect } from 'react';
import { Client } from 'pg';
import { connectDB, disconnectDB } from '../db';

interface Metric {
  id: number;
  name: string;
  responses: number;
  nps: number;
  csat: number;
  rd: number;
}

const NpsIndividual: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        await connectDB();
        const client = new Client({
          connectionString: process.env.POSTGRES_URL!,
          ssl: {
            rejectUnauthorized: false, // Opcional, dependiendo de tu configuración SSL
          },
        });
        await client.connect();
        const result = await client.query<Metric>('SELECT * FROM metrics');
        setMetrics(result.rows);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        await disconnectDB();
      }
    }

    if (typeof window !== 'undefined') {
      setIsClient(true);
      fetchData();
    }
  }, []);

  const handleMetricChange = async (id: number, field: keyof Metric, value: string) => {
    const numValue = parseFloat(value);

    try {
      await connectDB();
      const client = new Client({
        connectionString: process.env.POSTGRES_URL!,
        ssl: {
          rejectUnauthorized: false, // Opcional, dependiendo de tu configuración SSL
        },
      });
      await client.connect();
      await client.query(
        `UPDATE metrics SET ${field} = $1 WHERE id = $2`,
        [numValue, id]
      );

      // Actualizar el estado local solo después de que se haya actualizado en la base de datos
      setMetrics((prevMetrics) =>
        prevMetrics.map((metric) =>
          metric.id === id ? { ...metric, [field]: numValue } : metric
        )
      );
    } catch (error) {
      console.error('Error updating metric:', error);
    } finally {
      await disconnectDB();
    }
  };

  // Funciones para obtener colores de acuerdo a las métricas
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

  if (!isClient || metrics.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-6 text-black bg-gray-100 rounded-lg shadow-lg">
      <h1 className="mb-6 text-3xl font-bold">Métricas Individuales</h1>
      <div className="mb-6" style={{ height: '400px' }}>
        {/* Aquí va el código de tu gráfico de barras */}
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
          {metrics.map((metric) => (
            <tr key={metric.id} className="border-b border-gray-200">
              <td className="py-2">{metric.name}</td>
              <td className="py-2">
                <input
                  type="number"
                  value={metric.responses}
                  onChange={(e) => handleMetricChange(metric.id, 'responses', e.target.value)}
                  className="w-full p-1 text-black bg-gray-200 rounded"
                />
              </td>
              <td className="py-2">
                <input
                  type="number"
                  value={metric.nps}
                  onChange={(e) => handleMetricChange(metric.id, 'nps', e.target.value)}
                  className="w-full p-1 text-black bg-gray-200 rounded"
                />
              </td>
              <td className="py-2">
                <input
                  type="number"
                  value={metric.csat}
                  onChange={(e) => handleMetricChange(metric.id, 'csat', e.target.value)}
                  className="w-full p-1 text-black bg-gray-200 rounded"
                />
              </td>
              <td className="py-2">
                <input
                  type="number"
                  value={metric.rd}
                  onChange={(e) => handleMetricChange(metric.id, 'rd', e.target.value)}
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
