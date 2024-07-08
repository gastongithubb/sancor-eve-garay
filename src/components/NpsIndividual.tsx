import React, { useState, useEffect } from 'react';
import { getUsers, type UserRow, updateUser } from '../db/schema'; // Asegúrate de que la ruta de importación sea correcta

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
      setUsers(fetchedUsers);
      setError(null);
    } catch (err) {
      setError('Error al cargar los usuarios');
      console.error('Error al cargar los usuarios:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (user: UserRow) => {
    try {
      await updateUser(user);
      // Actualizar la lista de usuarios después de la actualización
      fetchUsers();
    } catch (err) {
      setError('Error al actualizar el usuario');
      console.error('Error al actualizar el usuario:', err);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Métricas de Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Respuestas</th>
            <th>NPS</th>
            <th>CSAT</th>
            <th>RD</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.responses}</td>
              <td>{user.nps}</td>
              <td>{user.csat}</td>
              <td>{user.rd}</td>
              <td>
                <button onClick={() => handleUpdateUser({ ...user, responses: user.responses + 1 })}>
                  Incrementar Respuestas
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NpsIndividual;