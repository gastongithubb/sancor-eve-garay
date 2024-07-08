import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

const client = createClient({
  url: import.meta.env.TURSO_CONNECTION_URL,
  authToken: import.meta.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client);

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  responses: integer('responses').notNull().default(0),
  nps: integer('nps').notNull().default(0),
  csat: integer('csat').notNull().default(0),
  rd: integer('rd').notNull().default(0),
});

export type UserRow = typeof users.$inferSelect;

export async function initializeDatabase(): Promise<void> {
  try {
    const tableExists = await db.select().from(users).execute();
    console.log('Tabla existe, registros encontrados:', tableExists.length);
    
    if (tableExists.length === 0) {
      // Insertar datos iniciales si es necesario
    }
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    // Manejar el error de inicialización
  }
}

export async function getUsers(): Promise<UserRow[]> {
  try {
    const result = await db.select().from(users).execute();
    return result;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw new Error(`No se pudieron obtener los usuarios: ${error}`);
  }
}

export async function updateUser(user: UserRow): Promise<void> {
  try {
    await db
      .update(users)
      .set(user)
      .where(sql`id = ${user.id}`)
      .execute();
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw new Error(`No se pudo actualizar el usuario: ${error}`);
  }
}