import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { client } from './index';

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

const initialUserData: UserRow[] = [
  { id: 1, name: 'Abigail Veyga', responses: 7, nps: 0, csat: 71, rd: 57 },
  { id: 2, name: 'Agustin Suarez', responses: 3, nps: -67, csat: 100, rd: 100 },
  { id: 3, name: 'Auca Heil', responses: 9, nps: 67, csat: 89, rd: 67 },
  { id: 4, name: 'Carrizo Tula', responses: 10, nps: 30, csat: 80, rd: 80 },
  { id: 5, name: 'Danna Cruz', responses: 3, nps: -33, csat: 33, rd: 33 },
  { id: 6, name: 'Franco Alvarez', responses: 2, nps: 0, csat: 100, rd: 100 },
  { id: 7, name: 'Gaston Alvarez', responses: 3, nps: -33, csat: 33, rd: 33 },
  { id: 8, name: 'Javier Rodriguez', responses: 6, nps: -33, csat: 50, rd: 33 },
  { id: 9, name: 'Jeremías Flores', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 10, name: 'Karen Aranda', responses: 7, nps: -29, csat: 71, rd: 57 },
  { id: 11, name: 'Karen Chavez', responses: 1, nps: 100, csat: 0, rd: 0 },
  { id: 12, name: 'Lautaro Brocal', responses: 2, nps: 50, csat: 100, rd: 100 },
  { id: 13, name: 'Macarena Gomez', responses: 3, nps: 33, csat: 67, rd: 67 },
  { id: 14, name: 'Marcos Montenegro', responses: 2, nps: 50, csat: 100, rd: 100 },
  { id: 15, name: 'Milagros Juncos', responses: 7, nps: -57, csat: 43, rd: 29 },
  { id: 16, name: 'Nicolas Macagno', responses: 2, nps: 0, csat: 100, rd: 50 },
  { id: 17, name: 'Victoria Martinez', responses: 0, nps: 0, csat: 0, rd: 0 },
  { id: 18, name: 'Ismael Irirarte', responses: 1, nps: 100, csat: 100, rd: 100 },
  { id: 19, name: 'Zaida Abreu', responses: 12, nps: 25, csat: 83, rd: 83 },
];


export async function initializeDatabase(): Promise<void> {
  try {
    const tableExists = await db.select().from(users).execute();
    console.log('Tabla existe, registros encontrados:', tableExists.length);
    
    if (tableExists.length === 0) {
      await db.insert(users).values(initialUserData).execute();
      console.log('Datos iniciales insertados con éxito');
    } else {
      console.log('La tabla ya contiene datos, no se insertaron datos iniciales');
    }
  } catch (error) {
    console.error('Error detallado al inicializar la base de datos:', error);
    try {
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
    } catch (createError) {
      console.error('Error al crear la tabla:', createError);
      throw new Error(`No se pudo inicializar la base de datos: ${createError}`);
    }
  }
}

export async function getUsers(): Promise<UserRow[]> {
  try {
    const result = await db.select().from(users).execute();
    console.log('Usuarios obtenidos:', result);
    return result;
  } catch (error) {
    console.error('Error detallado al obtener usuarios:', error);
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
    console.log(`Usuario con ID ${user.id} actualizado con éxito`);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw new Error(`No se pudo actualizar el usuario: ${error}`);
  }
}