import React, { useState, useEffect } from 'react';
import { getUsers, type UserRow, updateUser } from '../components/lib/db/db-users';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { Loader2 } from 'lucide-react';

const NpsIndividual: React.FC = () => {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
        setError(null);
      } catch (err) {
        console.error('Error al cargar usuarios:', err);
        setError(`Error al cargar las métricas: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateUser = async (updatedUser: UserRow) => {
    try {
      await updateUser(updatedUser);
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    } catch (err) {
      console.error('Error al actualizar el usuario:', err);
      setError(`Error al actualizar el usuario: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleChange = (userId: number, field: keyof UserRow, value: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, [field]: Number(value) } : user
    ));
  };

  const getColorForNps = (nps: number) => {
    if (nps >= 15) return '#28a745'; // Verde
    if (nps >= 0) return '#ffc107'; // Amarillo
    return '#dc3545'; // Rojo
  };

  const getColorForCsatAndRd = (value: number) => {
    if (value > 70) return '#28a745'; // Verde
    if (value >= 65) return '#ffc107'; // Amarillo
    return '#dc3545'; // Rojo
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      <p className="mt-4 text-lg font-semibold text-gray-700">Cargando programacion semanal.</p>
    </div>
  );
  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-lg font-semibold text-red-600">{error}</p>
    </div>
  );
  if (users.length === 0) return <div>No se encontraron datos de usuarios.</div>;

  return (
    <div>
      <h1>Métricas - NPS Individual</h1>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '5px', width: '200px' }}
      />
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={filteredUsers} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="responses" fill="#8884d8" name="Encuestas" />
          <Bar dataKey="nps" name="NPS">
            {filteredUsers.map((user) => (
              <Cell key={`cell-nps-${user.id}`} fill={getColorForNps(user.nps)} />
            ))}
          </Bar>
          <Bar dataKey="csat" name="CSAT">
            {filteredUsers.map((user) => (
              <Cell key={`cell-csat-${user.id}`} fill={getColorForCsatAndRd(user.csat)} />
            ))}
          </Bar>
          <Bar dataKey="rd" name="RD">
            {filteredUsers.map((user) => (
              <Cell key={`cell-rd-${user.id}`} fill={getColorForCsatAndRd(user.rd)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredUsers.map((user) => (
          <div key={user.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '300px' }}>
            <h2>{user.name}</h2>
            <div style={{ marginBottom: '10px' }}>
              <label>
                Encuestas: 
                <input 
                  type="number" 
                  value={user.responses} 
                  onChange={(e) => handleChange(user.id, 'responses', e.target.value)} 
                  style={{ width: '100%' }}
                />
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                NPS: 
                <input 
                  type="number" 
                  value={user.nps} 
                  onChange={(e) => handleChange(user.id, 'nps', e.target.value)} 
                  style={{ width: '100%' }}
                />
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                CSAT: 
                <input 
                  type="number" 
                  value={user.csat} 
                  onChange={(e) => handleChange(user.id, 'csat', e.target.value)} 
                  style={{ width: '100%' }}
                />
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                RD: 
                <input 
                  type="number" 
                  value={user.rd} 
                  onChange={(e) => handleChange(user.id, 'rd', e.target.value)} 
                  style={{ width: '100%' }}
                />
              </label>
            </div>
            <button 
              onClick={() => handleUpdateUser(user)} 
              style={{ 
                width: '100%', 
                padding: '10px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer', 
                transition: 'background-color 0.3s' 
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
            >
              Guardar Cambios
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NpsIndividual;
