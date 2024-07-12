import{c as g,d as w,s as u,i as s,t as a,b as l,a as m}from"./config.C_G0umPK.js";var t=[];for(var d=0;d<256;++d)t.push((d+256).toString(16).slice(1));function h(e,r=0){return(t[e[r+0]]+t[e[r+1]]+t[e[r+2]]+t[e[r+3]]+"-"+t[e[r+4]]+t[e[r+5]]+"-"+t[e[r+6]]+t[e[r+7]]+"-"+t[e[r+8]]+t[e[r+9]]+"-"+t[e[r+10]]+t[e[r+11]]+t[e[r+12]]+t[e[r+13]]+t[e[r+14]]+t[e[r+15]]).toLowerCase()}var c,I=new Uint8Array(16);function b(){if(!c&&(c=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!c))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return c(I)}var R=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const y={randomUUID:R};function p(e,r,i){if(y.randomUUID&&!r&&!e)return y.randomUUID();e=e||{};var o=e.random||(e.rng||b)();return o[6]=o[6]&15|64,o[8]=o[8]&63|128,h(o)}const O=g({url:m.tursoConnectionUrl,authToken:m.tursoAuthToken}),n=w(O),L=u("employees",{id:s("id").primaryKey(),firstName:a("first_name").notNull(),lastName:a("last_name").notNull(),email:a("email").notNull(),dni:a("dni").notNull(),entryTime:a("entry_time").notNull(),exitTime:a("exit_time").notNull(),hoursWorked:s("hours_worked").notNull(),xLite:a("x_lite").notNull()}),T=u("break_schedules",{id:s("id").primaryKey(),employeeId:s("employee_id").notNull(),day:a("day").notNull(),startTime:a("start_time").notNull(),endTime:a("end_time").notNull(),week:s("week").notNull(),month:s("month").notNull(),year:s("year").notNull()}),U=u("users",{id:s("id").primaryKey(),name:a("name").notNull(),responses:s("responses").notNull().default(0),nps:s("nps").notNull().default(0),csat:s("csat").notNull().default(0),rd:s("rd").notNull().default(0)});u("novedades",{id:s("id").primaryKey(),url:a("url").notNull(),title:a("title").notNull(),publishDate:a("publish_date").notNull()});const N=u("auth_users",{id:a("id").primaryKey(),email:a("email").notNull().unique(),password:a("password").notNull(),name:a("name").notNull()});async function A(){const e={id:p(),email:"test@example.com",password:"password123",name:"Usuario de Prueba"};try{await n.insert(N).values(e).run(),console.log("Usuario de prueba creado con éxito")}catch(r){console.error("Error al crear usuario de prueba:",r)}}async function _(){try{console.log("Iniciando la creación de tablas..."),await n.run(l`
      CREATE TABLE IF NOT EXISTS auth_users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        name TEXT NOT NULL
      )
    `),console.log("Tabla auth_users creada o ya existente"),await n.run(l`
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
    `),console.log("Tabla employees creada o ya existente"),await n.run(l`
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
    `),console.log("Tabla break_schedules creada o ya existente"),await n.run(l`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        responses INTEGER NOT NULL DEFAULT 0,
        nps INTEGER NOT NULL DEFAULT 0,
        csat INTEGER NOT NULL DEFAULT 0,
        rd INTEGER NOT NULL DEFAULT 0
      )
    `),console.log("Tabla users creada o ya existente"),await n.run(l`
      CREATE TABLE IF NOT EXISTS novedades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        publish_date TEXT NOT NULL
      )
    `),console.log("Tabla novedades creada o ya existente"),console.log("Base de datos inicializada correctamente");const e=await n.select({count:l`count(*)`}).from(N).then(r=>r[0]?.count??0);console.log(`Número de usuarios en auth_users: ${e}`),e===0&&(console.log("No hay usuarios. Creando usuario de prueba..."),await A())}catch(e){console.error("Error al inicializar la base de datos:",e)}}async function f(){try{return await n.select().from(L).all()}catch(e){throw console.error("Error al obtener empleados:",e),new Error(`No se pudieron obtener los empleados: ${e instanceof Error?e.message:String(e)}`)}}async function x(e,r){try{await n.update(L).set({xLite:r}).where(l`id = ${e}`).run()}catch(i){throw console.error("Error al actualizar X LITE del empleado:",i),new Error(`No se pudo actualizar X LITE del empleado: ${i instanceof Error?i.message:String(i)}`)}}async function k(e,r,i){try{return await n.select().from(T).where(l`employee_id = ${e} AND month = ${r} AND year = ${i}`).all()}catch(o){throw console.error("Error al obtener horarios de break:",o),new Error(`No se pudieron obtener los horarios de break: ${o instanceof Error?o.message:String(o)}`)}}async function S(e){try{console.log("Intentando actualizar horario de break:",e),(await n.update(T).set({startTime:e.startTime,endTime:e.endTime}).where(l`
        employee_id = ${e.employeeId} AND
        day = ${e.day} AND
        week = ${e.week} AND
        month = ${e.month} AND
        year = ${e.year}
      `).run()).rowsAffected===0&&await n.insert(T).values(e).run(),console.log("Horario de break actualizado o insertado con éxito")}catch(r){throw console.error("Error detallado al actualizar horario de break:",r),new Error(`No se pudo actualizar el horario de break: ${r instanceof Error?r.message:String(r)}`)}}async function $(){try{return await n.select().from(U).all()}catch(e){throw console.error("Error al obtener usuarios:",e),new Error(`No se pudieron obtener los usuarios: ${e instanceof Error?e.message:String(e)}`)}}async function D(e){try{await n.update(U).set(e).where(l`id = ${e.id}`).run()}catch(r){throw console.error("Error al actualizar usuario:",r),new Error(`No se pudo actualizar el usuario: ${r instanceof Error?r.message:String(r)}`)}}async function v(e,r,i){try{console.log(`Intentando registrar usuario: ${e}`);const o=p(),E=await n.insert(N).values({id:o,email:e,password:r,name:i}).returning().all();return E.length>0?(console.log("Usuario registrado exitosamente"),E[0]):(console.log("No se pudo registrar el usuario"),null)}catch(o){if(o instanceof Error){if(console.error("Error detallado al registrar usuario:",o.message),o.message.includes("UNIQUE constraint failed: auth_users.email"))throw console.log("Error: El correo electrónico ya está en uso"),new Error("El correo electrónico ya está en uso")}else console.error("Error desconocido al registrar usuario:",o);throw o}}_();export{k as a,S as b,$ as c,D as d,f as g,v as r,x as u};
