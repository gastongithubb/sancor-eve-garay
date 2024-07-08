import React, { useState, useEffect } from 'react';
import { getUsers, type UserRow, updateUser, initializeDatabase } from '../db/schema';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const NpsIndividual: React.FC = () => {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const initAndFetchUsers = async () => {
      try {
        setLoading(true);
        await initializeDatabase();
        const fetchedUsers = await getUsers();
        console.log('Usuarios obtenidos:', fetchedUsers); // Log para depuración
        setUsers(fetchedUsers);
        setError(null);
      } catch (err) {
        console.error('Error detallado:', err);
        setError(`Error al cargar las métricas: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    };

    initAndFetchUsers();
  }, []);

  const handleUpdateUser = async (user: UserRow) => {
    try {
      const updatedUser = { ...user, responses: user.responses + 1 };
      await updateUser(updatedUser);
      setUsers(users.map(u => u.id === user.id ? updatedUser : u));
    } catch (err) {
      console.error('Error al actualizar el usuario:', err);
      setError(`Error al actualizar el usuario: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Cargando datos de usuarios...</div>;
  if (error) return <div>Error: {error}</div>;
  if (users.length === 0) return <div>No se encontraron datos de usuarios. La base de datos podría estar vacía.</div>;

  return (
    <div>
      <h1>Métricas de Usuarios</h1>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '5px', width: '200px' }}
      />
      {filteredUsers.map((user) => (
        <div key={user.id} style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
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
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => handleUpdateUser(user)}>
              Incrementar Respuestas
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NpsIndividual;