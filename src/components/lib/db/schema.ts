import { client } from './index';
import { drizzle } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

const db = drizzle(client);

// Definición de la tabla de noticias
export const news = sqliteTable('news', {
  id: integer('id').primaryKey(),
  url: text('url').notNull(),
  title: text('title').notNull(),
  publishDate: text('publish_date').notNull(),
});

// Tipo de fila para noticias
export type NovedadesRow = typeof news.$inferSelect;

// Función para manejar errores de base de datos
function handleDatabaseError(error: unknown, operation: string): never {
  console.error(`Error en operación de base de datos (${operation}):`, error);
  throw new Error(`Error en ${operation}: ${error instanceof Error ? error.message : String(error)}`);
}

// Función para asegurar que la tabla de noticias exista
async function ensureNewsTableExists() {
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        publish_date TEXT NOT NULL
      )
    `);
    console.log('Tabla de noticias creada o ya existente');
  } catch (error) {
    console.error('Error al crear la tabla de noticias:', error);
    throw error;
  }
}

// Función para obtener todas las noticias
export async function getNews(): Promise<NovedadesRow[]> {
  try {
    await ensureNewsTableExists();
    return await db.select().from(news).all();
  } catch (error) {
    handleDatabaseError(error, 'obtener noticias');
  }
}

// Función para añadir una nueva noticia
export async function addNews(newsItem: Omit<NovedadesRow, 'id'>): Promise<void> {
  try {
    await ensureNewsTableExists();
    await db.insert(news).values(newsItem).run();
  } catch (error) {
    handleDatabaseError(error, 'añadir noticia');
  }
}

// Función para eliminar una noticia
export async function deleteNews(id: number): Promise<void> {
  try {
    await db.delete(news).where(sql`id = ${id}`).run();
  } catch (error) {
    handleDatabaseError(error, 'eliminar noticia');
  }
}

// Función para actualizar una noticia (opcional, por si la necesitas en el futuro)
export async function updateNews(id: number, newsItem: Omit<NovedadesRow, 'id'>): Promise<void> {
  try {
    await db.update(news).set(newsItem).where(sql`id = ${id}`).run();
  } catch (error) {
    handleDatabaseError(error, 'actualizar noticia');
  }
}