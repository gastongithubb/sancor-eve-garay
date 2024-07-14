import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm';
<<<<<<< HEAD
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { config } from '../../config';

console.log('Configuración de la base de datos:', {
  url: config.tursoConnectionUrl,
  authToken: config.tursoAuthToken ? '***' : undefined
});

export const client = createClient({
  url: config.tursoConnectionUrl,
  authToken: config.tursoAuthToken
});

export const db = drizzle(client);

// Definiciones de tablas
=======
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
>>>>>>> 3120d25e780996749973811d25100fece0580884
export const news = sqliteTable('news', {
  id: integer('id').primaryKey(),
  url: text('url').notNull(),
  title: text('title').notNull(),
  publishDate: text('publish_date').notNull(),
<<<<<<< HEAD
  estado: integer('estado').notNull().default(1), // 1 para activo, 0 para inactivo
});

=======
  estado: text('estado').notNull().default('vigente'),
  nueva_columna: text('nueva_columna'),  // No se especifica .notNull() para permitir nulos
});

// Tipo inferido para las filas de noticias
>>>>>>> 3120d25e780996749973811d25100fece0580884
export type NovedadesRow = typeof news.$inferSelect;

// Función para inicializar la base de datos
export async function initializeDatabase() {
  try {
    console.log('Iniciando la inicialización de la base de datos...');

<<<<<<< HEAD
    // Crear tabla de noticias
=======
    // Crear tabla de noticias si no existe
>>>>>>> 3120d25e780996749973811d25100fece0580884
    await client.execute(`
      CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        publish_date TEXT NOT NULL,
<<<<<<< HEAD
        estado INTEGER NOT NULL DEFAULT 1
=======
        estado TEXT NOT NULL DEFAULT 'vigente',
        nueva_columna TEXT
>>>>>>> 3120d25e780996749973811d25100fece0580884
      )
    `);
    console.log('Tabla de noticias creada o ya existente');

    // Verificar si la tabla está vacía
    const count = await db.select({ count: sql`count(*)` }).from(news).get();
    if (count && count.count === 0) {
      // Insertar datos de prueba
      await db.insert(news).values([
<<<<<<< HEAD
        { url: 'https://example.com/news1', title: 'Noticia de prueba 1', publishDate: '2023-07-10', estado: 1 },
        { url: 'https://example.com/news2', title: 'Noticia de prueba 2', publishDate: '2023-07-11', estado: 1 },
=======
        { url: 'https://example.com/news1', title: 'Noticia de prueba 1', publishDate: '2023-07-10', estado: 'vigente', nueva_columna: null },
        { url: 'https://example.com/news2', title: 'Noticia de prueba 2', publishDate: '2023-07-11', estado: 'vigente', nueva_columna: null },
>>>>>>> 3120d25e780996749973811d25100fece0580884
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

<<<<<<< HEAD
// Funciones CRUD
=======
// Funciones CRUD para noticias

>>>>>>> 3120d25e780996749973811d25100fece0580884
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
<<<<<<< HEAD
    await db.insert(news).values(newsItem).run();
=======
    await db.insert(news).values({ ...newsItem, nueva_columna: null }).run();
>>>>>>> 3120d25e780996749973811d25100fece0580884
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

<<<<<<< HEAD
export async function toggleEstadoNoticia(id: number): Promise<void> {
  try {
    // Primero, obtén el estado actual de la noticia
    const noticia = await db.select().from(news).where(sql`id = ${id}`).get();
    if (!noticia) {
      throw new Error('Noticia no encontrada');
    }

    // Alternar el estado (1 a 0 o 0 a 1)
    const nuevoEstado = noticia.estado === 1 ? 0 : 1;

    // Actualiza el estado de la noticia
    await db.update(news)
      .set({ estado: nuevoEstado })
      .where(sql`id = ${id}`)
      .run();

    console.log(`Estado de la noticia ${id} actualizado a ${nuevoEstado}`);
  } catch (error) {
    console.error('Error al alternar el estado de la noticia:', error);
    throw error;
  }
}

// Asegúrate de exportar todas las funciones y tipos necesarios
=======
// Función para cambiar el estado de una noticia
export async function toggleEstadoNoticia(id: number, nuevoEstado: 'vigente' | 'actualizada' | 'caducada'): Promise<void> {
  try {
    await db.update(news).set({ estado: nuevoEstado }).where(sql`id = ${id}`).run();
  } catch (error) {
    console.error(`Error al cambiar el estado de la noticia ${id} a ${nuevoEstado}:`, error);
    throw error;
  }
}
>>>>>>> 3120d25e780996749973811d25100fece0580884
