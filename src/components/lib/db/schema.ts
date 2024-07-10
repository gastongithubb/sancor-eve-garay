import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { config } from '../../../config';

const client = createClient({
  url: config.tursoConnectionUrl,
  authToken: config.tursoAuthToken
});

export const db = drizzle(client);

export const novedades = sqliteTable('novedades', {
  id: integer('id').primaryKey(),
  url: text('url').notNull(),
  title: text('title').notNull(),
  publishDate: text('publish_date').notNull(),
});

export type NovedadesRow = typeof novedades.$inferSelect;

async function ensureTablesExist() {
  console.log('Asegurando que las tablas existen');
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS novedades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        publish_date TEXT NOT NULL
      )
    `);
    console.log('Tabla novedades verificada o creada');
  } catch (error) {
    console.error('Error al crear la tabla novedades:', error);
    throw error;
  }
}

export async function getNews(): Promise<NovedadesRow[]> {
  console.log('Iniciando getNews');
  try {
    await ensureTablesExist();
    console.log('Tablas verificadas, obteniendo novedades');
    const result = await db.select().from(novedades).all();
    console.log('Novedades obtenidas:', result);
    return result;
  } catch (error: unknown) {
    console.error('Error al obtener novedades:', error);
    throw new Error(`No se pudieron obtener las novedades: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function addNews(newsItem: Omit<NovedadesRow, 'id'>): Promise<void> {
  console.log('Iniciando addNews', newsItem);
  try {
    await ensureTablesExist();
    await db.insert(novedades).values(newsItem).run();
    console.log('Novedad agregada exitosamente');
  } catch (error: unknown) {
    console.error('Error al agregar novedad:', error);
    throw new Error(`No se pudo agregar la novedad: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function deleteNews(id: number): Promise<void> {
  console.log('Iniciando deleteNews', id);
  try {
    await db.delete(novedades).where(sql`id = ${id}`).run();
    console.log('Novedad eliminada exitosamente');
  } catch (error: unknown) {
    console.error('Error al eliminar novedad:', error);
    throw new Error(`No se pudo eliminar la novedad: ${error instanceof Error ? error.message : String(error)}`);
  }
}