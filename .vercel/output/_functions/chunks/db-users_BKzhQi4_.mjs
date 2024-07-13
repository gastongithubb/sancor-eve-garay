import { c as createClient, a as config } from './config_CPvW8AoO.mjs';
import { drizzle } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { v4 } from 'uuid';

const client = createClient({
  url: config.tursoConnectionUrl,
  authToken: config.tursoAuthToken
});
const db = drizzle(client);
const employees = sqliteTable("employees", {
  id: integer("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  dni: text("dni").notNull(),
  entryTime: text("entry_time").notNull(),
  exitTime: text("exit_time").notNull(),
  hoursWorked: integer("hours_worked").notNull(),
  xLite: text("x_lite").notNull()
});
const breakSchedules = sqliteTable("break_schedules", {
  id: integer("id").primaryKey(),
  employeeId: integer("employee_id").notNull(),
  day: text("day").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  week: integer("week").notNull(),
  month: integer("month").notNull(),
  year: integer("year").notNull()
});
sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  responses: integer("responses").notNull().default(0),
  nps: integer("nps").notNull().default(0),
  csat: integer("csat").notNull().default(0),
  rd: integer("rd").notNull().default(0)
});
sqliteTable("novedades", {
  id: integer("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title").notNull(),
  publishDate: text("publish_date").notNull()
});
const authUsers = sqliteTable("auth_users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull()
});
async function createTestUser() {
  const testUser = {
    id: v4(),
    email: "test@example.com",
    password: "password123",
    name: "Usuario de Prueba"
  };
  try {
    await db.insert(authUsers).values(testUser).run();
    console.log("Usuario de prueba creado con éxito");
  } catch (error) {
    console.error("Error al crear usuario de prueba:", error);
  }
}
async function createTablesIfNotExist() {
  try {
    console.log("Iniciando la creación de tablas...");
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS auth_users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        name TEXT NOT NULL
      )
    `);
    console.log("Tabla auth_users creada o ya existente");
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
    console.log("Tabla employees creada o ya existente");
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
    console.log("Tabla break_schedules creada o ya existente");
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
    console.log("Tabla users creada o ya existente");
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS novedades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        publish_date TEXT NOT NULL
      )
    `);
    console.log("Tabla novedades creada o ya existente");
    console.log("Base de datos inicializada correctamente");
    const userCount = await db.select({ count: sql`count(*)` }).from(authUsers).then((result) => result[0]?.count ?? 0);
    console.log(`Número de usuarios en auth_users: ${userCount}`);
    if (userCount === 0) {
      console.log("No hay usuarios. Creando usuario de prueba...");
      await createTestUser();
    }
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
  }
}
async function getEmployees() {
  try {
    return await db.select().from(employees).all();
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    throw new Error(`No se pudieron obtener los empleados: ${error instanceof Error ? error.message : String(error)}`);
  }
}
async function updateEmployeeXLite(id, xLite) {
  try {
    await db.update(employees).set({ xLite }).where(sql`id = ${id}`).run();
  } catch (error) {
    console.error("Error al actualizar X LITE del empleado:", error);
    throw new Error(`No se pudo actualizar X LITE del empleado: ${error instanceof Error ? error.message : String(error)}`);
  }
}
async function getBreakSchedules(employeeId, month, year) {
  try {
    return await db.select().from(breakSchedules).where(sql`employee_id = ${employeeId} AND month = ${month} AND year = ${year}`).all();
  } catch (error) {
    console.error("Error al obtener horarios de break:", error);
    throw new Error(`No se pudieron obtener los horarios de break: ${error instanceof Error ? error.message : String(error)}`);
  }
}
async function updateBreakSchedule(schedule) {
  try {
    console.log("Intentando actualizar horario de break:", schedule);
    const result = await db.update(breakSchedules).set({
      startTime: schedule.startTime,
      endTime: schedule.endTime
    }).where(sql`
        employee_id = ${schedule.employeeId} AND
        day = ${schedule.day} AND
        week = ${schedule.week} AND
        month = ${schedule.month} AND
        year = ${schedule.year}
      `).run();
    if (result.rowsAffected === 0) {
      await db.insert(breakSchedules).values(schedule).run();
    }
    console.log("Horario de break actualizado o insertado con éxito");
  } catch (error) {
    console.error("Error detallado al actualizar horario de break:", error);
    throw new Error(`No se pudo actualizar el horario de break: ${error instanceof Error ? error.message : String(error)}`);
  }
}
async function registerUser(email, password, name) {
  try {
    console.log(`Intentando registrar usuario: ${email}`);
    const id = v4();
    const result = await db.insert(authUsers).values({ id, email, password, name }).returning().all();
    if (result.length > 0) {
      console.log("Usuario registrado exitosamente");
      return result[0];
    } else {
      console.log("No se pudo registrar el usuario");
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error detallado al registrar usuario:", error.message);
      if (error.message.includes("UNIQUE constraint failed: auth_users.email")) {
        console.log("Error: El correo electrónico ya está en uso");
        throw new Error("El correo electrónico ya está en uso");
      }
    } else {
      console.error("Error desconocido al registrar usuario:", error);
    }
    throw error;
  }
}
async function verifyUser(email, password) {
  try {
    const [user] = await db.select().from(authUsers).where(sql`email = ${email} AND password = ${password}`).all();
    return user || null;
  } catch (error) {
    console.error("Error al verificar usuario:", error);
    return null;
  }
}
createTablesIfNotExist();

export { getBreakSchedules as a, updateBreakSchedule as b, getEmployees as g, registerUser as r, updateEmployeeXLite as u, verifyUser as v };
