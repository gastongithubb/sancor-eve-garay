import { sql } from 'drizzle-orm';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { client } from './index';

let db: LibSQLDatabase | null = null;

if (client) {
  db = drizzle(client);
}

// Definición de la tabla de usuarios
export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  responses: integer('responses').notNull().default(0),
  nps: integer('nps').notNull().default(0),
  csat: integer('csat').notNull().default(0),
  rd: integer('rd').notNull().default(0),
});

// Tipo inferido para filas de usuario
export type UserRow = typeof users.$inferSelect;

// Datos iniciales de usuarios
const initialUserData: UserRow[] = [
  { id: 1, name: 'Abigail Veyga', responses: 7, nps: 0, csat: 71, rd: 57 },
  // ... (resto de los datos iniciales)
];

// Inicialización de la base de datos
export async function initializeDatabase(): Promise<void> {
  if (!db) {
    console.error('La base de datos no está disponible. Verifica las variables de entorno.');
    return;
  }

  try {
    // Verificar si la tabla ya existe y tiene datos
    const tableExists = await db.select().from(users).execute();
    
    if (tableExists.length === 0) {
      // Si la tabla está vacía, insertar datos iniciales
      await db.insert(users).values(initialUserData).execute();
      console.log('Datos iniciales insertados con éxito');
    } else {
      console.log('La tabla ya contiene datos, no se insertaron datos iniciales');
    }
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    // Si hay un error (por ejemplo, la tabla no existe), crearla e insertar datos
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        responses INTEGER NOT NULL DEFAULT 0,
        nps INTEGER NOT NULL DEFAULT 0,
        csat INTEGER NOT NULL DEFAULT 0,
        rd INTEGER NOT NULL DEFAULT 0
      )
    `);
    await db.insert(users).values(initialUserData).execute();
    console.log('Tabla creada e inicializada con datos');
  }
}

// Función para obtener todos los usuarios
export async function getUsers(): Promise<UserRow[]> {
  if (!db) {
    console.error('La base de datos no está disponible. Verifica las variables de entorno.');
    return [];
  }

  try {
    const result = await db.select().from(users).execute();
    return result;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
}

// Función para actualizar un usuario
export async function updateUser(user: UserRow): Promise<void> {
  if (!db) {
    console.error('La base de datos no está disponible. Verifica las variables de entorno.');
    return;
  }

  try {
    await db
      .update(users)
      .set(user)
      .where(sql`id = ${user.id}`)
      .execute();
    console.log(`Usuario con ID ${user.id} actualizado con éxito`);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
  }
}