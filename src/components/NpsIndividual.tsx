import React, { useEffect } from 'react';
import axios from 'axios';

const NpsIndividual = () => {
  const fetchMetrics = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/metrics`);
      console.log('Datos de métricas:', response.data);
      // Manejo de datos aquí...
    } catch (error) {
      console.error('Error al cargar las métricas:', error);
      // Manejo de errores aquí...
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <div>
      {/* Contenido del componente */}
    </div>
  );
};

export default NpsIndividual;
