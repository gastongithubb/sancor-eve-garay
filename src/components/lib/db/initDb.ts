import { initDatabase } from './db-users';

let isInitialized = false;

export async function ensureDbInitialized() {
  if (!isInitialized) {
    await initDatabase();
    isInitialized = true;
    console.log('Base de datos inicializada');
  }
}