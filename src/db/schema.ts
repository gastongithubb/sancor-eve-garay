import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { db } from './index';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  responses: integer('responses').notNull().default(0),
  nps: integer('nps').notNull().default(0),
  csat: integer('csat').notNull().default(0),
  rd: integer('rd').notNull().default(0),
});

export type UserRow = typeof users.$inferSelect;

const initialUserData = [
  { id: 1, name: 'Abigail Veyga', responses: 7, nps: 0, csat: 71, rd: 57 },
  { id: 2, name: 'Agustin Suarez', responses: 3, nps: -67, csat: 100, rd: 100 },
  // ... (el resto de los datos iniciales)
];

export async function initializeDatabase(): Promise<void> {
  try {
    // Verificar si la tabla ya existe
    const tableExists = await db.select().from(users).execute();
    
    if (tableExists.length === 0) {
      // Si la tabla está vacía, insertar datos iniciales
      await db.insert(users).values(initialUserData).execute();
    }
  } catch (error) {
    console.error('Error initializing database:', error);
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
  }
}

export async function getUsers(): Promise<UserRow[]> {
  return await db.select().from(users).execute();
}

export async function updateUser(user: UserRow): Promise<void> {
  await db
    .update(users)
    .set(user)
    .where(sql`id = ${user.id}`)
    .execute();
}