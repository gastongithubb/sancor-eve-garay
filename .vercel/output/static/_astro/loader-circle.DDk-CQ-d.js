import{c as A,d as O,s as T,i as a,t as o,a as m,b as u}from"./config.Dew_jzzj.js";import{r as N}from"./index.DJO9vBfz.js";const i=A({url:m.tursoConnectionUrl,authToken:m.tursoAuthToken}),s=O(i),L=T("employees",{id:a("id").primaryKey(),firstName:o("first_name").notNull(),lastName:o("last_name").notNull(),email:o("email").notNull(),dni:o("dni").notNull(),entryTime:o("entry_time").notNull(),exitTime:o("exit_time").notNull(),hoursWorked:a("hours_worked").notNull(),xLite:o("x_lite").notNull()}),d=T("break_schedules",{id:a("id").primaryKey(),employeeId:a("employee_id").notNull(),day:o("day").notNull(),startTime:o("start_time").notNull(),endTime:o("end_time").notNull(),week:a("week").notNull(),month:a("month").notNull(),year:a("year").notNull()}),p=T("users",{id:a("id").primaryKey(),name:o("name").notNull(),responses:a("responses").notNull().default(0),nps:a("nps").notNull().default(0),csat:a("csat").notNull().default(0),rd:a("rd").notNull().default(0)});T("novedades",{id:a("id").primaryKey(),url:o("url").notNull(),title:o("title").notNull(),publishDate:o("publish_date").notNull()});async function c(){await i.execute(`
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
  `),await i.execute(`
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
  `),await i.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      responses INTEGER NOT NULL DEFAULT 0,
      nps INTEGER NOT NULL DEFAULT 0,
      csat INTEGER NOT NULL DEFAULT 0,
      rd INTEGER NOT NULL DEFAULT 0
    )
  `),await i.execute(`
    CREATE TABLE IF NOT EXISTS novedades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      title TEXT NOT NULL,
      publish_date TEXT NOT NULL
    )
  `)}async function $(){try{return await c(),await s.select().from(L).all()}catch(e){throw console.error("Error al obtener empleados:",e),new Error(`No se pudieron obtener los empleados: ${e instanceof Error?e.message:String(e)}`)}}async function x(e,r){try{await s.update(L).set({xLite:r}).where(u`id = ${e}`).run()}catch(t){throw console.error("Error al actualizar X LITE del empleado:",t),new Error(`No se pudo actualizar X LITE del empleado: ${t instanceof Error?t.message:String(t)}`)}}async function C(e,r,t){try{return await c(),await s.select().from(d).where(u`employee_id = ${e} AND month = ${r} AND year = ${t}`).all()}catch(n){throw console.error("Error al obtener horarios de break:",n),new Error(`No se pudieron obtener los horarios de break: ${n instanceof Error?n.message:String(n)}`)}}async function S(e){try{console.log("Intentando actualizar horario de break:",e),(await s.update(d).set({startTime:e.startTime,endTime:e.endTime}).where(u`
        employee_id = ${e.employeeId} AND
        day = ${e.day} AND
        week = ${e.week} AND
        month = ${e.month} AND
        year = ${e.year}
      `).run()).rowsAffected===0&&await s.insert(d).values(e).run(),console.log("Horario de break actualizado o insertado con éxito")}catch(r){throw console.error("Error detallado al actualizar horario de break:",r),new Error(`No se pudo actualizar el horario de break: ${r instanceof Error?r.message:String(r)}`)}}async function G(){try{return await c(),await s.select().from(p).all()}catch(e){throw console.error("Error al obtener usuarios:",e),new Error(`No se pudieron obtener los usuarios: ${e instanceof Error?e.message:String(e)}`)}}async function D(e){try{await s.update(p).set(e).where(u`id = ${e.id}`).run()}catch(r){throw console.error("Error al actualizar usuario:",r),new Error(`No se pudo actualizar el usuario: ${r instanceof Error?r.message:String(r)}`)}}/**
 * @license lucide-react v0.403.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),y=(...e)=>e.filter((r,t,n)=>!!r&&n.indexOf(r)===t).join(" ");/**
 * @license lucide-react v0.403.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var b={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.403.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=N.forwardRef(({color:e="currentColor",size:r=24,strokeWidth:t=2,absoluteStrokeWidth:n,className:E="",children:l,iconNode:w,...h},f)=>N.createElement("svg",{ref:f,...b,width:r,height:r,stroke:e,strokeWidth:n?Number(t)*24/Number(r):t,className:y("lucide",E),...h},[...w.map(([I,U])=>N.createElement(I,U)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.403.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(e,r)=>{const t=N.forwardRef(({className:n,...E},l)=>N.createElement(g,{ref:l,iconNode:r,className:y(`lucide-${R(e)}`,n),...E}));return t.displayName=`${e}`,t};/**
 * @license lucide-react v0.403.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=k("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);export{z as L,C as a,S as b,G as c,D as d,$ as g,x as u};
