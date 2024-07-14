import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { eq } from 'drizzle-orm';
import { config } from '../../../config';

console.log('Configuración de la base de datos:', {
  url: config.tursoConnectionUrl,
  authToken: config.tursoAuthToken ? '***' : undefined
});

export const client = createClient({
  url: config.tursoConnectionUrl,
  authToken: config.tursoAuthToken
});

export const db = drizzle(client);

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
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
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

export type EmployeeRow = typeof employees.$inferSelect;
export type BreakScheduleRow = typeof breakSchedules.$inferSelect;
export type UserRow = typeof users.$inferSelect;
export type NovedadesRow = typeof novedades.$inferSelect;

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
}

export async function getEmployees(): Promise<EmployeeRow[]> {
  try {
    await ensureTablesExist();
    return await db.select().from(employees).all();
  } catch (error: unknown) {
    console.error('Error al obtener empleados:', error);
    throw new Error(`No se pudieron obtener los empleados: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function addEmployee(employee: Omit<EmployeeRow, 'id'>): Promise<void> {
  try {
    await ensureTablesExist();
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
    await ensureTablesExist();
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
    await ensureTablesExist();
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
    await ensureTablesExist();
    return await db.select().from(novedades).all();
  } catch (error: unknown) {
    console.error('Error al obtener novedades:', error);
    throw new Error(`No se pudieron obtener las novedades: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function addNews(newsItem: Omit<NovedadesRow, 'id'>): Promise<void> {
  try {
    await ensureTablesExist();
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