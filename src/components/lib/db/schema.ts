import { client } from './index';
import { drizzle } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

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

export async function getUsers(): Promise<UserRow[]> {
  try {
    return await db.select().from(users).execute();
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