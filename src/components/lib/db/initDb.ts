import { initializeDatabase } from '../db';

let isInitialized = false;

export async function ensureDbInitialized() {
  if (!isInitialized) {
    await initializeDatabase();
    isInitialized = true;
    console.log('Base de datos inicializada');
  }
}