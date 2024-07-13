import{c as w,d as g,s as u,i as l,t as a,b as i,a as m}from"./config.Cq6tYRYp.js";var t=[];for(var T=0;T<256;++T)t.push((T+256).toString(16).slice(1));function h(e,r=0){return(t[e[r+0]]+t[e[r+1]]+t[e[r+2]]+t[e[r+3]]+"-"+t[e[r+4]]+t[e[r+5]]+"-"+t[e[r+6]]+t[e[r+7]]+"-"+t[e[r+8]]+t[e[r+9]]+"-"+t[e[r+10]]+t[e[r+11]]+t[e[r+12]]+t[e[r+13]]+t[e[r+14]]+t[e[r+15]]).toLowerCase()}var c,I=new Uint8Array(16);function b(){if(!c&&(c=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!c))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return c(I)}var R=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const y={randomUUID:R};function p(e,r,s){if(y.randomUUID&&!r&&!e)return y.randomUUID();e=e||{};var o=e.random||(e.rng||b)();return o[6]=o[6]&15|64,o[8]=o[8]&63|128,h(o)}const O=w({url:m.tursoConnectionUrl,authToken:m.tursoAuthToken}),n=g(O),L=u("employees",{id:l("id").primaryKey(),firstName:a("first_name").notNull(),lastName:a("last_name").notNull(),email:a("email").notNull(),dni:a("dni").notNull(),entryTime:a("entry_time").notNull(),exitTime:a("exit_time").notNull(),hoursWorked:l("hours_worked").notNull(),xLite:a("x_lite").notNull()}),N=u("break_schedules",{id:l("id").primaryKey(),employeeId:l("employee_id").notNull(),day:a("day").notNull(),startTime:a("start_time").notNull(),endTime:a("end_time").notNull(),week:l("week").notNull(),month:l("month").notNull(),year:l("year").notNull()}),U=u("users",{id:l("id").primaryKey(),name:a("name").notNull(),responses:l("responses").notNull().default(0),nps:l("nps").notNull().default(0),csat:l("csat").notNull().default(0),rd:l("rd").notNull().default(0)});u("novedades",{id:l("id").primaryKey(),url:a("url").notNull(),title:a("title").notNull(),publishDate:a("publish_date").notNull()});const d=u("auth_users",{id:a("id").primaryKey(),email:a("email").notNull().unique(),password:a("password").notNull(),name:a("name").notNull()});async function A(){const e={id:p(),email:"test@example.com",password:"password123",name:"Usuario de Prueba"};try{await n.insert(d).values(e).run(),console.log("Usuario de prueba creado con éxito")}catch(r){console.error("Error al crear usuario de prueba:",r)}}async function _(){try{console.log("Iniciando la creación de tablas..."),await n.run(i`
      CREATE TABLE IF NOT EXISTS auth_users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        name TEXT NOT NULL
      )
    `),console.log("Tabla auth_users creada o ya existente"),await n.run(i`
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
    `),console.log("Tabla employees creada o ya existente"),await n.run(i`
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
    `),console.log("Tabla break_schedules creada o ya existente"),await n.run(i`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        responses INTEGER NOT NULL DEFAULT 0,
        nps INTEGER NOT NULL DEFAULT 0,
        csat INTEGER NOT NULL DEFAULT 0,
        rd INTEGER NOT NULL DEFAULT 0
      )
    `),console.log("Tabla users creada o ya existente"),await n.run(i`
      CREATE TABLE IF NOT EXISTS novedades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        publish_date TEXT NOT NULL
      )
    `),console.log("Tabla novedades creada o ya existente"),console.log("Base de datos inicializada correctamente");const e=await n.select({count:i`count(*)`}).from(d).then(r=>r[0]?.count??0);console.log(`Número de usuarios en auth_users: ${e}`),e===0&&(console.log("No hay usuarios. Creando usuario de prueba..."),await A())}catch(e){console.error("Error al inicializar la base de datos:",e)}}async function X(){try{return await n.select().from(L).all()}catch(e){throw console.error("Error al obtener empleados:",e),new Error(`No se pudieron obtener los empleados: ${e instanceof Error?e.message:String(e)}`)}}async function x(e,r){try{await n.update(L).set({xLite:r}).where(i`id = ${e}`).run()}catch(s){throw console.error("Error al actualizar X LITE del empleado:",s),new Error(`No se pudo actualizar X LITE del empleado: ${s instanceof Error?s.message:String(s)}`)}}async function k(e,r,s){try{return await n.select().from(N).where(i`employee_id = ${e} AND month = ${r} AND year = ${s}`).all()}catch(o){throw console.error("Error al obtener horarios de break:",o),new Error(`No se pudieron obtener los horarios de break: ${o instanceof Error?o.message:String(o)}`)}}async function S(e){try{console.log("Intentando actualizar horario de break:",e),(await n.update(N).set({startTime:e.startTime,endTime:e.endTime}).where(i`
        employee_id = ${e.employeeId} AND
        day = ${e.day} AND
        week = ${e.week} AND
        month = ${e.month} AND
        year = ${e.year}
      `).run()).rowsAffected===0&&await n.insert(N).values(e).run(),console.log("Horario de break actualizado o insertado con éxito")}catch(r){throw console.error("Error detallado al actualizar horario de break:",r),new Error(`No se pudo actualizar el horario de break: ${r instanceof Error?r.message:String(r)}`)}}async function $(){try{return await n.select().from(U).all()}catch(e){throw console.error("Error al obtener usuarios:",e),new Error(`No se pudieron obtener los usuarios: ${e instanceof Error?e.message:String(e)}`)}}async function v(e){try{await n.update(U).set(e).where(i`id = ${e.id}`).run()}catch(r){throw console.error("Error al actualizar usuario:",r),new Error(`No se pudo actualizar el usuario: ${r instanceof Error?r.message:String(r)}`)}}async function D(e,r,s){try{console.log(`Intentando registrar usuario: ${e}`);const o=p(),E=await n.insert(d).values({id:o,email:e,password:r,name:s}).returning().all();return E.length>0?(console.log("Usuario registrado exitosamente"),E[0]):(console.log("No se pudo registrar el usuario"),null)}catch(o){if(o instanceof Error){if(console.error("Error detallado al registrar usuario:",o.message),o.message.includes("UNIQUE constraint failed: auth_users.email"))throw console.log("Error: El correo electrónico ya está en uso"),new Error("El correo electrónico ya está en uso")}else console.error("Error desconocido al registrar usuario:",o);throw o}}async function C(e,r){try{const[s]=await n.select().from(d).where(i`email = ${e} AND password = ${r}`).all();return s||null}catch(s){return console.error("Error al verificar usuario:",s),null}}_();export{k as a,S as b,$ as c,v as d,X as g,D as r,x as u,C as v};
