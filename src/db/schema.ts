// schema.ts

// Definición de la tabla de usuarios
const usersTable = 'users'; // Nombre de la tabla

// Datos iniciales de usuarios
const initialUserData = [
  { id: 1, name: 'Abigail Veyga', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 2, name: 'Agustin Suarez', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 3, name: 'Auca Heil', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 4, name: 'Carrizo Tula', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 5, name: 'Danna Cruz', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 6, name: 'Franco Alvarez', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 7, name: 'Gaston Alvarez', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 8, name: 'Javier Rodriguez', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 9, name: 'Jeremías Flores', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 10, name: 'Karen Aranda', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 11, name: 'Karen Chavez', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 12, name: 'Lautaro Brocal', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 13, name: 'Macarena Gomez', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 14, name: 'Marcos Montenegro', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 15, name: 'Milagros Juncos', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 16, name: 'Nicolas Macagno', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 17, name: 'Victoria Martinez', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 18, name: 'Ismael Irirarte', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 19, name: 'Zaida Abreu', responses: 0, nps: 0, csat: 0, rd: 0 },
];

// Tipo inferido para filas de usuario
export type UserRow = {
  id: number;
  name: string;
  responses: number;
  nps: number;
  csat: number;
  rd: number;
};

// Inicialización de la base de datos
export async function initializeDatabase(): Promise<void> {
  // Simular la apertura de una conexión SQLite en el navegador (ejemplo simplificado)
  const db = window.localStorage;

  // Crear tabla de usuarios si no existe
  if (!db.getItem(usersTable)) {
    db.setItem(usersTable, JSON.stringify(initialUserData));
  }
}

// Función para obtener todos los usuarios
export async function getUsers(): Promise<UserRow[]> {
  // Implementar la lógica para obtener usuarios desde el almacenamiento local (simulación de SQLite)
  const usersData = window.localStorage.getItem(usersTable);
  if (usersData) {
    return JSON.parse(usersData) as UserRow[];
  }
  return [];
}

// Función para actualizar un usuario
export async function updateUser(user: UserRow): Promise<void> {
  // Implementar la lógica para actualizar un usuario en el almacenamiento local (simulación de SQLite)
  const usersData = window.localStorage.getItem(usersTable);
  if (usersData) {
    const users = JSON.parse(usersData) as UserRow[];
    const updatedUsers = users.map(u => (u.id === user.id ? { ...u, ...user } : u));
    window.localStorage.setItem(usersTable, JSON.stringify(updatedUsers));
  }
}
