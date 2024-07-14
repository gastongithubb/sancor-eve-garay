import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
<<<<<<< HEAD
import { eq } from 'drizzle-orm';
import { config } from '../../../config';

console.log('Configuración de la base de datos:', {
  url: config.tursoConnectionUrl,
  authToken: config.tursoAuthToken ? '***' : undefined
});

export const client = createClient({
=======
import { config } from '../../../config';
import { v4 as uuidv4 } from 'uuid';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';

const client = createClient({
>>>>>>> 3120d25e780996749973811d25100fece0580884
  url: config.tursoConnectionUrl,
  authToken: config.tursoAuthToken
});

<<<<<<< HEAD
export const db = drizzle(client);
=======
export const db: LibSQLDatabase = drizzle(client);
>>>>>>> 3120d25e780996749973811d25100fece0580884

export const employees = sqliteTable('employees', {
  id: integer('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  dni: text('dni').notNull(),
  entryTime: text('entry_time').notNull(),
  exitTime: text('exit_time').notNull(),
  hoursWorked: integer('hours_worked').notNull(),
  xLite: text('x_lite').notNull()
});

export const breakSchedules = sqliteTable('break_schedules', {
  id: integer('id').primaryKey(),
  employeeId: integer('employee_id').notNull(),
  day: text('day').notNull(),
  startTime: text('start_time').notNull(),
  endTime: text('end_time').notNull(),
  week: integer('week').notNull(),
  month: integer('month').notNull(),
  year: integer('year').notNull(),
});

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
<<<<<<< HEAD
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
=======
>>>>>>> 3120d25e780996749973811d25100fece0580884
  responses: integer('responses').notNull().default(0),
  nps: integer('nps').notNull().default(0),
  csat: integer('csat').notNull().default(0),
  rd: integer('rd').notNull().default(0),
});

export const novedades = sqliteTable('novedades', {
  id: integer('id').primaryKey(),
  url: text('url').notNull(),
  title: text('title').notNull(),
  publishDate: text('publish_date').notNull(),
});

<<<<<<< HEAD
=======
export const authUsers = sqliteTable('auth_users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
});

>>>>>>> 3120d25e780996749973811d25100fece0580884
export type EmployeeRow = typeof employees.$inferSelect;
export type BreakScheduleRow = typeof breakSchedules.$inferSelect;
export type UserRow = typeof users.$inferSelect;
export type NovedadesRow = typeof novedades.$inferSelect;
<<<<<<< HEAD

export async function ensureTablesExist() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      dni TEXT NOT NULL,
      entry_time TEXT NOT NULL,
      exit_time TEXT NOT NULL,
      hours_worked INTEGER NOT NULL,
      x_lite TEXT NOT NULL
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS break_schedules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      employee_id INTEGER NOT NULL,
      day TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      week INTEGER NOT NULL,
      month INTEGER NOT NULL,
      year INTEGER NOT NULL
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      responses INTEGER NOT NULL DEFAULT 0,
      nps INTEGER NOT NULL DEFAULT 0,
      csat INTEGER NOT NULL DEFAULT 0,
      rd INTEGER NOT NULL DEFAULT 0
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS novedades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      title TEXT NOT NULL,
      publish_date TEXT NOT NULL
    )
  `);
=======
export type AuthUser = typeof authUsers.$inferSelect;

async function createTestUser() {
  const testUser = {
    id: uuidv4(),
    email: 'test@example.com',
    password: 'password123',
    name: 'Usuario de Prueba'
  };

  try {
    await db.insert(authUsers).values(testUser).run();
    console.log('Usuario de prueba creado con éxito');
  } catch (error) {
    console.error('Error al crear usuario de prueba:', error);
  }
}

async function createTablesIfNotExist() {
  try {
    console.log('Iniciando la creación de tablas...');

    // Crear tabla auth_users si no existe
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS auth_users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        name TEXT NOT NULL
      )
    `);
    console.log('Tabla auth_users creada o ya existente');

    // Crear tabla employees si no existe
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        dni TEXT NOT NULL,
        entry_time TEXT NOT NULL,
        exit_time TEXT NOT NULL,
        hours_worked INTEGER NOT NULL,
        x_lite TEXT NOT NULL
      )
    `);
    console.log('Tabla employees creada o ya existente');

    // Crear tabla break_schedules si no existe
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS break_schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employee_id INTEGER NOT NULL,
        day TEXT NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        week INTEGER NOT NULL,
        month INTEGER NOT NULL,
        year INTEGER NOT NULL
      )
    `);
    console.log('Tabla break_schedules creada o ya existente');

    // Crear tabla users si no existe
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        responses INTEGER NOT NULL DEFAULT 0,
        nps INTEGER NOT NULL DEFAULT 0,
        csat INTEGER NOT NULL DEFAULT 0,
        rd INTEGER NOT NULL DEFAULT 0
      )
    `);
    console.log('Tabla users creada o ya existente');

    // Crear tabla novedades si no existe
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS novedades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        publish_date TEXT NOT NULL
      )
    `);
    console.log('Tabla novedades creada o ya existente');

    console.log('Base de datos inicializada correctamente');

    const userCount = await db.select({ count: sql<number>`count(*)` })
      .from(authUsers)
      .then(result => result[0]?.count ?? 0);

    console.log(`Número de usuarios en auth_users: ${userCount}`);

    if (userCount === 0) {
      console.log('No hay usuarios. Creando usuario de prueba...');
      await createTestUser();
    }

  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
>>>>>>> 3120d25e780996749973811d25100fece0580884
}

export async function getEmployees(): Promise<EmployeeRow[]> {
  try {
<<<<<<< HEAD
    await ensureTablesExist();
=======
>>>>>>> 3120d25e780996749973811d25100fece0580884
    return await db.select().from(employees).all();
  } catch (error: unknown) {
    console.error('Error al obtener empleados:', error);
    throw new Error(`No se pudieron obtener los empleados: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function addEmployee(employee: Omit<EmployeeRow, 'id'>): Promise<void> {
  try {
<<<<<<< HEAD
    await ensureTablesExist();
=======
>>>>>>> 3120d25e780996749973811d25100fece0580884
    await db.insert(employees).values(employee).run();
  } catch (error: unknown) {
    console.error('Error al agregar empleado:', error);
    throw new Error(`No se pudo agregar el empleado: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function updateEmployeeXLite(id: number, xLite: string): Promise<void> {
  try {
    await db.update(employees)
      .set({ xLite })
      .where(sql`id = ${id}`)
      .run();
  } catch (error: unknown) {
    console.error('Error al actualizar X LITE del empleado:', error);
    throw new Error(`No se pudo actualizar X LITE del empleado: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function getBreakSchedules(employeeId: number, month: number, year: number): Promise<BreakScheduleRow[]> {
  try {
<<<<<<< HEAD
    await ensureTablesExist();
=======
>>>>>>> 3120d25e780996749973811d25100fece0580884
    return await db.select()
      .from(breakSchedules)
      .where(sql`employee_id = ${employeeId} AND month = ${month} AND year = ${year}`)
      .all();
  } catch (error: unknown) {
    console.error('Error al obtener horarios de break:', error);
    throw new Error(`No se pudieron obtener los horarios de break: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function updateBreakSchedule(schedule: Omit<BreakScheduleRow, 'id'>): Promise<void> {
  try {
    console.log('Intentando actualizar horario de break:', schedule);
    
    const result = await db
      .update(breakSchedules)
      .set({
        startTime: schedule.startTime,
        endTime: schedule.endTime
      })
      .where(sql`
        employee_id = ${schedule.employeeId} AND
        day = ${schedule.day} AND
        week = ${schedule.week} AND
        month = ${schedule.month} AND
        year = ${schedule.year}
      `)
      .run();

    if (result.rowsAffected === 0) {
      await db.insert(breakSchedules)
        .values(schedule)
        .run();
    }

    console.log('Horario de break actualizado o insertado con éxito');
  } catch (error: unknown) {
    console.error('Error detallado al actualizar horario de break:', error);
    throw new Error(`No se pudo actualizar el horario de break: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function getUsers(): Promise<UserRow[]> {
  try {
<<<<<<< HEAD
    await ensureTablesExist();
=======
>>>>>>> 3120d25e780996749973811d25100fece0580884
    return await db.select().from(users).all();
  } catch (error: unknown) {
    console.error('Error al obtener usuarios:', error);
    throw new Error(`No se pudieron obtener los usuarios: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function updateUser(user: UserRow): Promise<void> {
  try {
    await db
      .update(users)
      .set(user)
      .where(sql`id = ${user.id}`)
      .run();
  } catch (error: unknown) {
    console.error('Error al actualizar usuario:', error);
    throw new Error(`No se pudo actualizar el usuario: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function getNews(): Promise<NovedadesRow[]> {
  try {
<<<<<<< HEAD
    await ensureTablesExist();
=======
>>>>>>> 3120d25e780996749973811d25100fece0580884
    return await db.select().from(novedades).all();
  } catch (error: unknown) {
    console.error('Error al obtener novedades:', error);
    throw new Error(`No se pudieron obtener las novedades: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function addNews(newsItem: Omit<NovedadesRow, 'id'>): Promise<void> {
  try {
<<<<<<< HEAD
    await ensureTablesExist();
=======
>>>>>>> 3120d25e780996749973811d25100fece0580884
    await db.insert(novedades).values(newsItem).run();
  } catch (error: unknown) {
    console.error('Error al agregar novedad:', error);
    throw new Error(`No se pudo agregar la novedad: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function deleteNews(id: number): Promise<void> {
  try {
    await db.delete(novedades).where(sql`id = ${id}`).run();
  } catch (error: unknown) {
    console.error('Error al eliminar novedad:', error);
    throw new Error(`No se pudo eliminar la novedad: ${error instanceof Error ? error.message : String(error)}`);
  }
}

<<<<<<< HEAD
export async function createUser(user: Omit<UserRow, 'id'>): Promise<void> {
  try {
    await ensureTablesExist();
    await db.insert(users).values(user).run();
  } catch (error: unknown) {
    console.error('Error al crear usuario:', error);
    throw new Error(`No se pudo crear el usuario: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function getUserByEmail(email: string): Promise<UserRow | undefined> {
  try {
    await ensureTablesExist();
    return await db.select().from(users).where(eq(users.email, email)).get();
  } catch (error: unknown) {
    console.error('Error al obtener usuario por email:', error);
    throw new Error(`No se pudo obtener el usuario por email: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Nuevas funciones exportadas con los nombres que estás intentando importar
export const registerUser = createUser;
export const verifyUser = getUserByEmail;

// Asegúrate de exportar todas las funciones y tipos necesarios
=======
export async function registerUser(email: string, password: string, name: string): Promise<AuthUser | null> {
  try {
    console.log(`Intentando registrar usuario: ${email}`);
    const id = uuidv4();

    const result = await db.insert(authUsers)
      .values({ id, email, password, name })
      .returning()
      .all();

    if (result.length > 0) {
      console.log('Usuario registrado exitosamente');
      return result[0];
    } else {
      console.log('No se pudo registrar el usuario');
      return null;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error detallado al registrar usuario:', error.message);
      if (error.message.includes('UNIQUE constraint failed: auth_users.email')) {
        console.log('Error: El correo electrónico ya está en uso');
        throw new Error('El correo electrónico ya está en uso');
      }
    } else {
      console.error('Error desconocido al registrar usuario:', error);
    }
    throw error;
  }
}

export async function verifyUser(email: string, password: string): Promise<AuthUser | null> {
  try {
    const [user] = await db.select()
      .from(authUsers)
      .where(sql`email = ${email} AND password = ${password}`)
      .all();
    return user || null;
  } catch (error) {
    console.error('Error al verificar usuario:', error);
    return null;
  }
}

export async function getUserById(id: string): Promise<AuthUser | null> {
  try {
    const [user] = await db.select()
      .from(authUsers)
      .where(sql`id = ${id}`)
      .all();
    return user || null;
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    return null;
  }
}

// Llamamos a la función para crear las tablas si no existen al inicio
createTablesIfNotExist();
>>>>>>> 3120d25e780996749973811d25100fece0580884
