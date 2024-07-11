/* empty css                                   */
import { k as createComponent, l as renderTemplate, m as renderComponent } from './astro/server_D8vA9utB.mjs';
import 'kleur/colors';
import 'html-escaper';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { c as createClient, a as config } from './config_CQWPTxMP.mjs';
import { drizzle } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { $ as $$Container, a as $$Layout } from './Layout_Din6772Q.mjs';

const client = createClient({
  url: config.tursoConnectionUrl,
  authToken: config.tursoAuthToken
});
const db = drizzle(client);
const novedades = sqliteTable("novedades", {
  id: integer("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title").notNull(),
  publishDate: text("publish_date").notNull()
});
async function ensureTablesExist() {
  console.log("Asegurando que las tablas existen");
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS novedades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        publish_date TEXT NOT NULL
      )
    `);
    console.log("Tabla novedades verificada o creada");
  } catch (error) {
    console.error("Error al crear la tabla novedades:", error);
    throw error;
  }
}
async function getNews() {
  console.log("Iniciando getNews");
  try {
    await ensureTablesExist();
    console.log("Tablas verificadas, obteniendo novedades");
    const result = await db.select().from(novedades).all();
    console.log("Novedades obtenidas:", result);
    return result;
  } catch (error) {
    console.error("Error al obtener novedades:", error);
    throw new Error(`No se pudieron obtener las novedades: ${error instanceof Error ? error.message : String(error)}`);
  }
}
async function addNews(newsItem) {
  console.log("Iniciando addNews", newsItem);
  try {
    await ensureTablesExist();
    await db.insert(novedades).values(newsItem).run();
    console.log("Novedad agregada exitosamente");
  } catch (error) {
    console.error("Error al agregar novedad:", error);
    throw new Error(`No se pudo agregar la novedad: ${error instanceof Error ? error.message : String(error)}`);
  }
}
async function deleteNews(id) {
  console.log("Iniciando deleteNews", id);
  try {
    await db.delete(novedades).where(sql`id = ${id}`).run();
    console.log("Novedad eliminada exitosamente");
  } catch (error) {
    console.error("Error al eliminar novedad:", error);
    throw new Error(`No se pudo eliminar la novedad: ${error instanceof Error ? error.message : String(error)}`);
  }
}

const NewsManager = () => {
  const [news, setNews] = useState([]);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    fetchNews();
  }, []);
  const fetchNews = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const newsData = await getNews();
      setNews(newsData);
    } catch (error) {
      console.error("Error al obtener novedades:", error);
      setErrorMessage("Error al cargar las novedades. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addNews({ url, title, publishDate });
      setUrl("");
      setTitle("");
      setPublishDate("");
      await fetchNews();
    } catch (error) {
      console.error("Error al agregar novedad:", error);
      setErrorMessage("Error al agregar la novedad. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteNews(id);
      await fetchNews();
    } catch (error) {
      console.error("Error al eliminar novedad:", error);
      setErrorMessage("Error al eliminar la novedad. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-screen", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "w-12 h-12 text-blue-500 animate-spin" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg font-semibold text-gray-700", children: "Cargando Novedades" })
    ] });
  }
  if (errorMessage) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-screen", children: [
      /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-red-600", children: errorMessage }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: fetchNews,
          className: "px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600",
          children: "Intentar nuevamente"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl p-4 mx-auto", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-4 text-2xl font-bold", children: "Gestor de Novedades" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "url", className: "block mb-2", children: "URL:" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "url",
            id: "url",
            value: url,
            onChange: (e) => setUrl(e.target.value),
            required: true,
            className: "w-full px-3 py-2 border rounded"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "title", className: "block mb-2", children: "Título:" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "title",
            value: title,
            onChange: (e) => setTitle(e.target.value),
            required: true,
            className: "w-full px-3 py-2 border rounded"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "publishDate", className: "block mb-2", children: "Fecha de publicación:" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "date",
            id: "publishDate",
            value: publishDate,
            onChange: (e) => setPublishDate(e.target.value),
            required: true,
            className: "w-full px-3 py-2 border rounded"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", className: "px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600", children: "Agregar Novedad" })
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "mb-4 text-xl font-semibold", children: "Novedades Existentes" }),
    news.length > 0 ? /* @__PURE__ */ jsx("ul", { children: news.map((item) => /* @__PURE__ */ jsxs("li", { className: "p-4 mb-4 border rounded", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold", children: item.title }),
      /* @__PURE__ */ jsxs("p", { children: [
        "URL: ",
        /* @__PURE__ */ jsx("a", { href: item.url, target: "_blank", rel: "noopener noreferrer", className: "text-blue-500 hover:underline", children: item.url })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Fecha de publicación: ",
        item.publishDate
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleDelete(item.id),
          className: "px-3 py-1 mt-2 text-white bg-red-500 rounded hover:bg-red-600",
          children: "Eliminar"
        }
      )
    ] }, item.id)) }) : /* @__PURE__ */ jsx("p", { children: "No hay novedades disponibles." })
  ] });
};

const $$Novedades = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Lista de Novedades" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "NewsManager", NewsManager, {})} ` })} ` })}`;
}, "/Users/macbookpro/Desktop/equipo-2/src/pages/novedades.astro", void 0);

const $$file = "/Users/macbookpro/Desktop/equipo-2/src/pages/novedades.astro";
const $$url = "/novedades";

export { $$Novedades as default, $$file as file, $$url as url };
