import{c as O,d as _,s as N,i as l,t,b as i,a as p}from"./config.B9YPc1sw.js";import{r as d}from"./index.DJO9vBfz.js";var n=[];for(var m=0;m<256;++m)n.push((m+256).toString(16).slice(1));function x(e,r=0){return(n[e[r+0]]+n[e[r+1]]+n[e[r+2]]+n[e[r+3]]+"-"+n[e[r+4]]+n[e[r+5]]+"-"+n[e[r+6]]+n[e[r+7]]+"-"+n[e[r+8]]+n[e[r+9]]+"-"+n[e[r+10]]+n[e[r+11]]+n[e[r+12]]+n[e[r+13]]+n[e[r+14]]+n[e[r+15]]).toLowerCase()}var T,k=new Uint8Array(16);function X(){if(!T&&(T=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!T))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return T(k)}var $=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const L={randomUUID:$};function w(e,r,a){if(L.randomUUID&&!r&&!e)return L.randomUUID();e=e||{};var o=e.random||(e.rng||X)();return o[6]=o[6]&15|64,o[8]=o[8]&63|128,x(o)}const v=O({url:p.tursoConnectionUrl,authToken:p.tursoAuthToken}),s=_(v),g=N("employees",{id:l("id").primaryKey(),firstName:t("first_name").notNull(),lastName:t("last_name").notNull(),email:t("email").notNull(),dni:t("dni").notNull(),entryTime:t("entry_time").notNull(),exitTime:t("exit_time").notNull(),hoursWorked:l("hours_worked").notNull(),xLite:t("x_lite").notNull()}),y=N("break_schedules",{id:l("id").primaryKey(),employeeId:l("employee_id").notNull(),day:t("day").notNull(),startTime:t("start_time").notNull(),endTime:t("end_time").notNull(),week:l("week").notNull(),month:l("month").notNull(),year:l("year").notNull()}),U=N("users",{id:l("id").primaryKey(),name:t("name").notNull(),responses:l("responses").notNull().default(0),nps:l("nps").notNull().default(0),csat:l("csat").notNull().default(0),rd:l("rd").notNull().default(0)});N("novedades",{id:l("id").primaryKey(),url:t("url").notNull(),title:t("title").notNull(),publishDate:t("publish_date").notNull()});const E=N("auth_users",{id:t("id").primaryKey(),email:t("email").notNull().unique(),password:t("password").notNull(),name:t("name").notNull()});async function S(){const e={id:w(),email:"test@example.com",password:"password123",name:"Usuario de Prueba"};try{await s.insert(E).values(e).run(),console.log("Usuario de prueba creado con éxito")}catch(r){console.error("Error al crear usuario de prueba:",r)}}async function C(){try{console.log("Iniciando la creación de tablas..."),await s.run(i`
      CREATE TABLE IF NOT EXISTS auth_users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        name TEXT NOT NULL
      )
    `),console.log("Tabla auth_users creada o ya existente"),await s.run(i`
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
    `),console.log("Tabla employees creada o ya existente"),await s.run(i`
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
    `),console.log("Tabla break_schedules creada o ya existente"),await s.run(i`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        responses INTEGER NOT NULL DEFAULT 0,
        nps INTEGER NOT NULL DEFAULT 0,
        csat INTEGER NOT NULL DEFAULT 0,
        rd INTEGER NOT NULL DEFAULT 0
      )
    `),console.log("Tabla users creada o ya existente"),await s.run(i`
      CREATE TABLE IF NOT EXISTS novedades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        publish_date TEXT NOT NULL
      )
    `),console.log("Tabla novedades creada o ya existente"),console.log("Base de datos inicializada correctamente");const e=await s.select({count:i`count(*)`}).from(E).then(r=>r[0]?.count??0);console.log(`Número de usuarios en auth_users: ${e}`),e===0&&(console.log("No hay usuarios. Creando usuario de prueba..."),await S())}catch(e){console.error("Error al inicializar la base de datos:",e)}}async function Y(){try{return await s.select().from(g).all()}catch(e){throw console.error("Error al obtener empleados:",e),new Error(`No se pudieron obtener los empleados: ${e instanceof Error?e.message:String(e)}`)}}async function F(e,r){try{await s.update(g).set({xLite:r}).where(i`id = ${e}`).run()}catch(a){throw console.error("Error al actualizar X LITE del empleado:",a),new Error(`No se pudo actualizar X LITE del empleado: ${a instanceof Error?a.message:String(a)}`)}}async function M(e,r,a){try{return await s.select().from(y).where(i`employee_id = ${e} AND month = ${r} AND year = ${a}`).all()}catch(o){throw console.error("Error al obtener horarios de break:",o),new Error(`No se pudieron obtener los horarios de break: ${o instanceof Error?o.message:String(o)}`)}}async function P(e){try{console.log("Intentando actualizar horario de break:",e),(await s.update(y).set({startTime:e.startTime,endTime:e.endTime}).where(i`
        employee_id = ${e.employeeId} AND
        day = ${e.day} AND
        week = ${e.week} AND
        month = ${e.month} AND
        year = ${e.year}
      `).run()).rowsAffected===0&&await s.insert(y).values(e).run(),console.log("Horario de break actualizado o insertado con éxito")}catch(r){throw console.error("Error detallado al actualizar horario de break:",r),new Error(`No se pudo actualizar el horario de break: ${r instanceof Error?r.message:String(r)}`)}}async function V(){try{return await s.select().from(U).all()}catch(e){throw console.error("Error al obtener usuarios:",e),new Error(`No se pudieron obtener los usuarios: ${e instanceof Error?e.message:String(e)}`)}}async function j(e){try{await s.update(U).set(e).where(i`id = ${e.id}`).run()}catch(r){throw console.error("Error al actualizar usuario:",r),new Error(`No se pudo actualizar el usuario: ${r instanceof Error?r.message:String(r)}`)}}async function q(e,r,a){try{console.log(`Intentando registrar usuario: ${e}`);const o=w(),u=await s.insert(E).values({id:o,email:e,password:r,name:a}).returning().all();return u.length>0?(console.log("Usuario registrado exitosamente"),u[0]):(console.log("No se pudo registrar el usuario"),null)}catch(o){if(o instanceof Error){if(console.error("Error detallado al registrar usuario:",o.message),o.message.includes("UNIQUE constraint failed: auth_users.email"))throw console.log("Error: El correo electrónico ya está en uso"),new Error("El correo electrónico ya está en uso")}else console.error("Error desconocido al registrar usuario:",o);throw o}}async function H(e,r){try{const[a]=await s.select().from(E).where(i`email = ${e} AND password = ${r}`).all();return a||null}catch(a){return console.error("Error al verificar usuario:",a),null}}C();/**
 * @license lucide-react v0.403.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),h=(...e)=>e.filter((r,a,o)=>!!r&&o.indexOf(r)===a).join(" ");/**
 * @license lucide-react v0.403.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var G={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.403.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=d.forwardRef(({color:e="currentColor",size:r=24,strokeWidth:a=2,absoluteStrokeWidth:o,className:u="",children:c,iconNode:I,...b},f)=>d.createElement("svg",{ref:f,...G,width:r,height:r,stroke:e,strokeWidth:o?Number(a)*24/Number(r):a,className:h("lucide",u),...b},[...I.map(([R,A])=>d.createElement(R,A)),...Array.isArray(c)?c:[c]]));/**
 * @license lucide-react v0.403.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=(e,r)=>{const a=d.forwardRef(({className:o,...u},c)=>d.createElement(z,{ref:c,iconNode:r,className:h(`lucide-${D(e)}`,o),...u}));return a.displayName=`${e}`,a};export{M as a,P as b,Q as c,V as d,j as e,Y as g,q as r,F as u,H as v};
