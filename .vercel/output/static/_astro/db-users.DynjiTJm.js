import{c as m,d as L,s as i,i as a,t,a as u,b as N}from"./config.Dew_jzzj.js";const s=m({url:u.tursoConnectionUrl,authToken:u.tursoAuthToken}),o=L(s),d=i("employees",{id:a("id").primaryKey(),firstName:t("first_name").notNull(),lastName:t("last_name").notNull(),email:t("email").notNull(),dni:t("dni").notNull(),entryTime:t("entry_time").notNull(),exitTime:t("exit_time").notNull(),hoursWorked:a("hours_worked").notNull(),xLite:t("x_lite").notNull()}),T=i("break_schedules",{id:a("id").primaryKey(),employeeId:a("employee_id").notNull(),day:t("day").notNull(),startTime:t("start_time").notNull(),endTime:t("end_time").notNull(),week:a("week").notNull(),month:a("month").notNull(),year:a("year").notNull()}),c=i("users",{id:a("id").primaryKey(),name:t("name").notNull(),responses:a("responses").notNull().default(0),nps:a("nps").notNull().default(0),csat:a("csat").notNull().default(0),rd:a("rd").notNull().default(0)});i("novedades",{id:a("id").primaryKey(),url:t("url").notNull(),title:t("title").notNull(),publishDate:t("publish_date").notNull()});async function E(){await s.execute(`
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
  `),await s.execute(`
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
  `),await s.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      responses INTEGER NOT NULL DEFAULT 0,
      nps INTEGER NOT NULL DEFAULT 0,
      csat INTEGER NOT NULL DEFAULT 0,
      rd INTEGER NOT NULL DEFAULT 0
    )
  `),await s.execute(`
    CREATE TABLE IF NOT EXISTS novedades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      title TEXT NOT NULL,
      publish_date TEXT NOT NULL
    )
  `)}async function p(){try{return await E(),await o.select().from(d).all()}catch(e){throw console.error("Error al obtener empleados:",e),new Error(`No se pudieron obtener los empleados: ${e instanceof Error?e.message:String(e)}`)}}async function w(e,r){try{await o.update(d).set({xLite:r}).where(N`id = ${e}`).run()}catch(n){throw console.error("Error al actualizar X LITE del empleado:",n),new Error(`No se pudo actualizar X LITE del empleado: ${n instanceof Error?n.message:String(n)}`)}}async function I(e,r,n){try{return await E(),await o.select().from(T).where(N`employee_id = ${e} AND month = ${r} AND year = ${n}`).all()}catch(l){throw console.error("Error al obtener horarios de break:",l),new Error(`No se pudieron obtener los horarios de break: ${l instanceof Error?l.message:String(l)}`)}}async function U(e){try{console.log("Intentando actualizar horario de break:",e),(await o.update(T).set({startTime:e.startTime,endTime:e.endTime}).where(N`
        employee_id = ${e.employeeId} AND
        day = ${e.day} AND
        week = ${e.week} AND
        month = ${e.month} AND
        year = ${e.year}
      `).run()).rowsAffected===0&&await o.insert(T).values(e).run(),console.log("Horario de break actualizado o insertado con éxito")}catch(r){throw console.error("Error detallado al actualizar horario de break:",r),new Error(`No se pudo actualizar el horario de break: ${r instanceof Error?r.message:String(r)}`)}}async function h(){try{return await E(),await o.select().from(c).all()}catch(e){throw console.error("Error al obtener usuarios:",e),new Error(`No se pudieron obtener los usuarios: ${e instanceof Error?e.message:String(e)}`)}}async function O(e){try{await o.update(c).set(e).where(N`id = ${e.id}`).run()}catch(r){throw console.error("Error al actualizar usuario:",r),new Error(`No se pudo actualizar el usuario: ${r instanceof Error?r.message:String(r)}`)}}export{I as a,U as b,h as c,O as d,p as g,w as u};
