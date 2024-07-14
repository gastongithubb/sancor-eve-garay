import { initializeDatabase } from './db';

let initialized = false;

export async function ensureDatabaseInitialized() {
  if (!initialized) {
    try {
      await initializeDatabase();
      initialized = true;
      console.log('Base de datos inicializada correctamente');
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
      throw error;
    }
  }
}