/* empty css                                   */
import { k as createComponent, l as renderTemplate, m as renderComponent } from './astro/server_D8vA9utB.mjs';
import 'kleur/colors';
import 'html-escaper';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { c as createClient, a as config } from './config_CQWPTxMP.mjs';
import { drizzle } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { Loader2 } from 'lucide-react';
import { $ as $$Container, a as $$Layout } from './Layout_Din6772Q.mjs';

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
async function ensureTablesExist() {
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
async function getEmployees() {
  try {
    await ensureTablesExist();
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
    await ensureTablesExist();
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

const cn = (...classes) => classes.filter(Boolean).join(" ");
const Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
));
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn("bg-primary font-medium text-primary-foreground", className),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
const currentMonth = (/* @__PURE__ */ new Date()).getMonth() + 1;
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [breakSchedules, setBreakSchedules] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unsavedEmployeeChanges, setUnsavedEmployeeChanges] = useState({});
  const [unsavedBreakChanges, setUnsavedBreakChanges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const employeesData = await getEmployees();
        setEmployees(employeesData);
        const breakSchedulesData = {};
        for (const employee of employeesData) {
          breakSchedulesData[employee.id] = await getBreakSchedules(employee.id, currentMonth, currentYear);
        }
        setBreakSchedules(breakSchedulesData);
      } catch (error2) {
        console.error("Error fetching data:", error2);
        setError(`Error al cargar los datos: ${error2 instanceof Error ? error2.message : String(error2)}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleXLiteChange = (id, xLite) => {
    setUnsavedEmployeeChanges((prev) => ({ ...prev, [id]: xLite }));
  };
  const handleBreakScheduleChange = (employeeId, day, week, startTime, endTime) => {
    const newSchedule = {
      employeeId,
      day,
      week,
      month: currentMonth,
      year: currentYear,
      startTime,
      endTime
    };
    setUnsavedBreakChanges((prev) => [...prev.filter(
      (s) => s.employeeId !== employeeId || s.day !== day || s.week !== week || s.month !== currentMonth || s.year !== currentYear
    ), newSchedule]);
  };
  const saveEmployeeChanges = async () => {
    try {
      for (const [id, xLite] of Object.entries(unsavedEmployeeChanges)) {
        await updateEmployeeXLite(Number(id), xLite);
      }
      setEmployees(employees.map(
        (emp) => unsavedEmployeeChanges[emp.id] ? { ...emp, xLite: unsavedEmployeeChanges[emp.id] } : emp
      ));
      setUnsavedEmployeeChanges({});
      alert("Cambios en empleados guardados exitosamente");
    } catch (error2) {
      console.error("Error saving employee changes:", error2);
      alert(`Error al guardar los cambios en empleados: ${error2 instanceof Error ? error2.message : String(error2)}`);
    }
  };
  const saveBreakChanges = async () => {
    try {
      for (const schedule of unsavedBreakChanges) {
        console.log("Intentando guardar horario:", schedule);
        await updateBreakSchedule(schedule);
        console.log("Horario guardado exitosamente:", schedule);
      }
      const updatedBreakSchedules = { ...breakSchedules };
      for (const schedule of unsavedBreakChanges) {
        if (!updatedBreakSchedules[schedule.employeeId]) {
          updatedBreakSchedules[schedule.employeeId] = [];
        }
        const index = updatedBreakSchedules[schedule.employeeId].findIndex(
          (s) => s.day === schedule.day && s.week === schedule.week && s.month === schedule.month && s.year === schedule.year
        );
        if (index !== -1) {
          updatedBreakSchedules[schedule.employeeId][index] = { id: updatedBreakSchedules[schedule.employeeId][index].id, ...schedule };
        } else {
          updatedBreakSchedules[schedule.employeeId].push({ id: 0, ...schedule });
        }
      }
      setBreakSchedules(updatedBreakSchedules);
      setUnsavedBreakChanges([]);
      alert("Cambios en horarios de break guardados exitosamente");
    } catch (error2) {
      console.error("Error detallado al guardar cambios de break:", error2);
      alert(`Error al guardar los cambios en horarios de break: ${error2 instanceof Error ? error2.message : String(error2)}`);
    }
  };
  const filteredEmployees = employees.filter(
    (employee) => `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (loading) return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-screen", children: [
    /* @__PURE__ */ jsx(Loader2, { className: "w-12 h-12 text-blue-500 animate-spin" }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg font-semibold text-gray-700", children: "Cargando programacion semanal." })
  ] });
  if (error) return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center h-screen", children: /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-red-600", children: error }) });
  return /* @__PURE__ */ jsxs("div", { className: "container p-4 mx-auto", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-4 text-2xl font-bold", children: "Programacion Semanal" }),
    employees.length === 0 ? /* @__PURE__ */ jsx("p", { children: "No hay empleados para mostrar." }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Apellido y Nombre" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Email" }),
          /* @__PURE__ */ jsx(TableHead, { children: "DNI" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Ingreso" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Egreso" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Hs. Trabajo" }),
          /* @__PURE__ */ jsx(TableHead, { children: "X LITE" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: employees.map((employee) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxs(TableCell, { children: [
            employee.lastName,
            " ",
            employee.firstName
          ] }),
          /* @__PURE__ */ jsx(TableCell, { children: employee.email }),
          /* @__PURE__ */ jsx(TableCell, { children: employee.dni }),
          /* @__PURE__ */ jsx(TableCell, { children: employee.entryTime }),
          /* @__PURE__ */ jsx(TableCell, { children: employee.exitTime }),
          /* @__PURE__ */ jsx(TableCell, { children: employee.hoursWorked }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: unsavedEmployeeChanges[employee.id] || employee.xLite || "",
              onChange: (e) => handleXLiteChange(employee.id, e.target.value),
              className: "px-2 py-1 border rounded"
            }
          ) })
        ] }, employee.id)) })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: saveEmployeeChanges,
          className: "px-4 py-2 mt-4 font-bold text-white rounded bg-[#000] hover:bg-black",
          disabled: Object.keys(unsavedEmployeeChanges).length === 0,
          children: "Guardar Cambios en Empleados"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "mt-8 mb-4 text-xl font-bold", children: "Horarios de Break" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        placeholder: "Buscar empleado...",
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value),
        className: "w-full px-2 py-1 border rounded"
      }
    ) }),
    filteredEmployees.map((employee) => /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("h4", { className: "mb-2 text-lg font-semibold", children: [
        employee.firstName,
        " ",
        employee.lastName
      ] }),
      /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Día" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Semana 1" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Semana 2" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Semana 3" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Semana 4" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Semana 5" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: days.map((day) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { children: day }),
          [1, 2, 3, 4, 5].map((week) => {
            const schedule = unsavedBreakChanges.find(
              (s) => s.employeeId === employee.id && s.day === day && s.week === week && s.month === currentMonth && s.year === currentYear
            ) || breakSchedules[employee.id]?.find(
              (s) => s.day === day && s.week === week && s.month === currentMonth && s.year === currentYear
            ) || { startTime: "", endTime: "" };
            return /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "time",
                  value: schedule.startTime,
                  onChange: (e) => handleBreakScheduleChange(employee.id, day, week, e.target.value, schedule.endTime),
                  className: "px-2 py-1 mr-2 border rounded"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "time",
                  value: schedule.endTime,
                  onChange: (e) => handleBreakScheduleChange(employee.id, day, week, schedule.startTime, e.target.value),
                  className: "px-2 py-1 border rounded"
                }
              )
            ] }, week);
          })
        ] }, day)) })
      ] })
    ] }, employee.id)),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: saveBreakChanges,
        className: "px-4 py-2 mt-4 font-bold text-white rounded bg-[#000] hover:bg-black",
        disabled: unsavedBreakChanges.length === 0,
        children: "Guardar Cambios en Horarios de Break"
      }
    )
  ] });
};

const $$Programacion = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Lista de Empleados" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "EmployeeList", EmployeeList, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/macbookpro/Desktop/equipo-2/src/components/EmployeeList", "client:component-export": "default" })} ` })} ` })}`;
}, "/Users/macbookpro/Desktop/equipo-2/src/pages/programacion.astro", void 0);

const $$file = "/Users/macbookpro/Desktop/equipo-2/src/pages/programacion.astro";
const $$url = "/programacion";

export { $$Programacion as default, $$file as file, $$url as url };
