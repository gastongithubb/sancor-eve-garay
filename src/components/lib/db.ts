import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { config } from '../../config';

export const client = createClient({
  url: config.tursoConnectionUrl,
  authToken: config.tursoAuthToken,
});

export const db = drizzle(client);

// Definiciones de tablas
export const news = sqliteTable('news', {
  id: integer('id').primaryKey(),
  url: text('url').notNull(),
  title: text('title').notNull(),
  publishDate: text('publish_date').notNull(),
});

export type NovedadesRow = typeof news.$inferSelect;

// Función para inicializar la base de datos
export async function initializeDatabase() {
  try {
    console.log('Iniciando la inicialización de la base de datos...');

    // Crear tabla de noticias
    await client.execute(`
      CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        publish_date TEXT NOT NULL
      )
    `);
    console.log('Tabla de noticias creada o ya existente');

    // Verificar si la tabla está vacía
    const count = await db.select({ count: sql`count(*)` }).from(news).get();
    if (count && count.count === 0) {
      // Insertar datos de prueba
      await db.insert(news).values([
        { url: 'https://example.com/news1', title: 'Noticia de prueba 1', publishDate: '2023-07-10' },
        { url: 'https://example.com/news2', title: 'Noticia de prueba 2', publishDate: '2023-07-11' },
      ]).run();
      console.log('Datos de prueba insertados');
    } else {
      console.log('La tabla de noticias ya contiene datos');
    }

    console.log('Inicialización de la base de datos completada con éxito');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
}

// Funciones CRUD
export async function getNews(): Promise<NovedadesRow[]> {
  try {
    return await db.select().from(news).all();
  } catch (error) {
    console.error('Error al obtener noticias:', error);
    throw error;
  }
}

export async function addNews(newsItem: Omit<NovedadesRow, 'id'>): Promise<void> {
  try {
    await db.insert(news).values(newsItem).run();
  } catch (error) {
    console.error('Error al añadir noticia:', error);
    throw error;
  }
}

export async function deleteNews(id: number): Promise<void> {
  try {
    await db.delete(news).where(sql`id = ${id}`).run();
  } catch (error) {
    console.error('Error al eliminar noticia:', error);
    throw error;
  }
}

export async function updateNews(id: number, newsItem: Omit<NovedadesRow, 'id'>): Promise<void> {
  try {
    await db.update(news).set(newsItem).where(sql`id = ${id}`).run();
  } catch (error) {
    console.error('Error al actualizar noticia:', error);
    throw error;
  }
}