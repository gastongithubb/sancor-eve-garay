import React, { useState, useEffect } from 'react';
import { getUsers, UserRow, updateUser } from './schema';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const NpsIndividual: React.FC = () => {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await getUsers();
      console.log('Fetched users:', fetchedUsers); // Depuración
      setUsers(fetchedUsers);
      setError(null);
    } catch (err) {
      console.error('Error al cargar los usuarios:', err);
      setError(`Error al cargar los usuarios: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (user: UserRow) => {
    try {
      await updateUser(user);
      fetchUsers(); // Recargar los datos después de la actualización
    } catch (err) {
      console.error('Error al actualizar el usuario:', err);
      setError(`Error al actualizar el usuario: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  if (loading) return <div>Cargando datos de usuarios...</div>;
  if (error) return <div>Error: {error}</div>;
  if (users.length === 0) return <div>No se encontraron datos de usuarios. Por favor, verifica la conexión con la base de datos.</div>;

  return (
    <div>
      <h1>Métricas de Usuarios</h1>
      {users.map((user) => (
        <div key={user.id} style={{ marginBottom: '30px' }}>
          <h2>{user.name}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[user]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="responses" fill="#8884d8" name="Respuestas" />
              <Bar dataKey="nps" fill="#82ca9d" name="NPS" />
              <Bar dataKey="csat" fill="#ffc658" name="CSAT" />
              <Bar dataKey="rd" fill="#ff7300" name="RD" />
            </BarChart>
          </ResponsiveContainer>
          <button onClick={() => handleUpdateUser({ ...user, responses: user.responses + 1 })}>
            Incrementar Respuestas
          </button>
        </div>
      ))}
    </div>
  );
};

export default NpsIndividual;