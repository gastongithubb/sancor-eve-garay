import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

import { config } from '../../config';

// Crear cliente de base de datos
export const client = createClient({
  url: config.tursoConnectionUrl,
  authToken: config.tursoAuthToken,
});

// Crear instancia de Drizzle ORM
export const db = drizzle(client);

// Definición de tabla 'news' con estado y nueva_columna
export const news = sqliteTable('news', {
  id: integer('id').primaryKey(),
  url: text('url').notNull(),
  title: text('title').notNull(),
  publishDate: text('publish_date').notNull(),
  estado: text('estado').notNull().default('vigente'),
  nueva_columna: text('nueva_columna'),  // No se especifica .notNull() para permitir nulos
});

// Tipo inferido para las filas de noticias
export type NovedadesRow = typeof news.$inferSelect;

// Función para inicializar la base de datos
export async function initializeDatabase() {
  try {
    console.log('Iniciando la inicialización de la base de datos...');

    // Crear tabla de noticias si no existe
    await client.execute(`
      CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        publish_date TEXT NOT NULL,
        estado TEXT NOT NULL DEFAULT 'vigente',
        nueva_columna TEXT
      )
    `);
    console.log('Tabla de noticias creada o ya existente');

    // Verificar si la tabla está vacía
    const count = await db.select({ count: sql`count(*)` }).from(news).get();
    if (count && count.count === 0) {
      // Insertar datos de prueba
      await db.insert(news).values([
        { url: 'https://example.com/news1', title: 'Noticia de prueba 1', publishDate: '2023-07-10', estado: 'vigente', nueva_columna: null },
        { url: 'https://example.com/news2', title: 'Noticia de prueba 2', publishDate: '2023-07-11', estado: 'vigente', nueva_columna: null },
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

// Funciones CRUD para noticias

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
    await db.insert(news).values({ ...newsItem, nueva_columna: null }).run();
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

// Función para cambiar el estado de una noticia
export async function toggleEstadoNoticia(id: number, nuevoEstado: 'vigente' | 'actualizada' | 'caducada'): Promise<void> {
  try {
    await db.update(news).set({ estado: nuevoEstado }).where(sql`id = ${id}`).run();
  } catch (error) {
    console.error(`Error al cambiar el estado de la noticia ${id} a ${nuevoEstado}:`, error);
    throw error;
  }
}
