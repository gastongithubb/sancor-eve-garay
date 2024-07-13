/* empty css                                   */
import { k as createComponent, l as renderTemplate, m as renderComponent, n as maybeRenderHead } from './astro/server_8Q9s6_jR.mjs';
import 'kleur/colors';
import 'html-escaper';
import { g as getNews, b as addNews, d as deleteNews, u as updateNews, t as toggleEstadoNoticia, a as $$Layout } from './Layout_z8IXI5F6.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';

const NewsManager = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newNewsItem, setNewNewsItem] = useState({
    url: "",
    title: "",
    publishDate: "",
    estado: "vigente"
  });
  const [editingNews, setEditingNews] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchNews();
  }, []);
  useEffect(() => {
    const filtered = news.filter(
      (item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(filtered);
  }, [searchTerm, news]);
  const fetchNews = async () => {
    setLoading(true);
    try {
      const newsData = await getNews();
      setNews(newsData);
    } catch (error2) {
      console.error("Error fetching news:", error2);
      setError("Error al cargar las noticias. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  const validateNewsItem = (item) => {
    if (!item.url.trim() || !item.title.trim() || !item.publishDate.trim()) {
      setError("Todos los campos son obligatorios.");
      return false;
    }
    setError(null);
    return true;
  };
  const handleAddNews = async (e) => {
    e.preventDefault();
    if (!validateNewsItem(newNewsItem)) return;
    try {
      await addNews({ ...newNewsItem, nueva_columna: null });
      fetchNews();
      setNewNewsItem({ url: "", title: "", publishDate: "", estado: "vigente" });
    } catch (error2) {
      console.error("Error adding news:", error2);
      setError("Error al añadir la noticia. Por favor, intenta de nuevo.");
    }
  };
  const handleDeleteNews = async (id) => {
    try {
      await deleteNews(id);
      fetchNews();
    } catch (error2) {
      console.error("Error deleting news:", error2);
      setError("Error al eliminar la noticia. Por favor, intenta de nuevo.");
    }
  };
  const handleUpdateNews = async (e) => {
    e.preventDefault();
    if (editingNews && validateNewsItem(editingNews)) {
      try {
        await updateNews(editingNews.id, editingNews);
        fetchNews();
        setEditingNews(null);
      } catch (error2) {
        console.error("Error updating news:", error2);
        setError("Error al actualizar la noticia. Por favor, intenta de nuevo.");
      }
    }
  };
  const toggleEstadoNoticiaHandler = async (id, estado) => {
    try {
      await toggleEstadoNoticia(id, estado);
      fetchNews();
    } catch (error2) {
      console.error("Error updating estado:", error2);
      setError("Error al actualizar el estado de la noticia. Por favor, intenta de nuevo.");
    }
  };
  const renderSkeletonLoader = () => /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [...Array(3)].map((_, index) => /* @__PURE__ */ jsxs("div", { className: "p-4 bg-white border rounded-lg shadow-card border-zinc-300", children: [
    /* @__PURE__ */ jsx("div", { className: "w-3/4 h-6 mb-2 rounded bg-zinc-600 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "w-full h-5 mb-2 rounded bg-zinc-600 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "w-1/3 h-5 mb-4 rounded bg-zinc-600 animate-pulse" }),
    /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 mr-2 rounded bg-zinc-600 h-9 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "w-20 rounded bg-zinc-600 h-9 animate-pulse" })
    ] })
  ] }, index)) });
  return /* @__PURE__ */ jsxs("div", { className: "container p-4 mx-auto font-SpaceGrotesk", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-black", children: "Gestor de Noticias" }),
      /* @__PURE__ */ jsxs("div", { className: "relative w-64", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Buscar por título",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "w-full p-2 pl-10 pr-4 border rounded-lg border-zinc-300 focus:outline-none focus:border-lime"
          }
        ),
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: "absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-zinc-400",
            fill: "none",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /* @__PURE__ */ jsx("path", { d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" })
          }
        )
      ] })
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "p-2 mb-4 text-red-700 bg-red-100 rounded-lg", children: error }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleAddNews, className: "mb-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "URL",
          value: newNewsItem.url,
          onChange: (e) => setNewNewsItem({ ...newNewsItem, url: e.target.value }),
          className: "p-2 mr-2 border rounded-lg border-zinc-600 focus:outline-none focus:border-lime",
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Título",
          value: newNewsItem.title,
          onChange: (e) => setNewNewsItem({ ...newNewsItem, title: e.target.value }),
          className: "p-2 mr-2 border rounded-lg border-zinc-300 focus:outline-none focus:border-lime",
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "date",
          value: newNewsItem.publishDate,
          onChange: (e) => setNewNewsItem({ ...newNewsItem, publishDate: e.target.value }),
          className: "p-2 mr-2 border rounded-lg border-zinc-300 focus:outline-none focus:border-lime",
          required: true
        }
      ),
      /* @__PURE__ */ jsx("button", { type: "submit", className: "p-2 text-white transition duration-300 bg-black rounded-lg hover:bg-lime", children: "Añadir Noticia" })
    ] }),
    loading ? renderSkeletonLoader() : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: filteredNews.map((item) => /* @__PURE__ */ jsxs("div", { className: "relative p-4 bg-white border rounded-lg shadow-card border-zinc-300", children: [
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: item.estado,
          onChange: (e) => toggleEstadoNoticiaHandler(item.id, e.target.value),
          className: "absolute p-2 bg-white border rounded-lg shadow-lg top-2 right-2 focus:outline-none",
          children: [
            /* @__PURE__ */ jsx("option", { value: "vigente", children: "Vigente" }),
            /* @__PURE__ */ jsx("option", { value: "actualizada", children: "Actualizada" }),
            /* @__PURE__ */ jsx("option", { value: "caducada", children: "Caducada" })
          ]
        }
      ),
      editingNews && editingNews.id === item.id ? /* @__PURE__ */ jsxs("form", { onSubmit: handleUpdateNews, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: editingNews.url,
            onChange: (e) => setEditingNews({ ...editingNews, url: e.target.value }),
            className: "p-2 mb-2 mr-2 border rounded-lg border-zinc-300 focus:outline-none focus:border-lime",
            required: true
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: editingNews.title,
            onChange: (e) => setEditingNews({ ...editingNews, title: e.target.value }),
            className: "p-2 mb-2 mr-2 border rounded-lg border-zinc-300 focus:outline-none focus:border-lime",
            required: true
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "date",
            value: editingNews.publishDate,
            onChange: (e) => setEditingNews({ ...editingNews, publishDate: e.target.value }),
            className: "p-2 mb-2 mr-2 border rounded-lg border-zinc-300 focus:outline-none focus:border-lime",
            required: true
          }
        ),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "p-2 mr-2 text-white transition duration-300 bg-black rounded-lg hover:bg-lime", children: "Guardar" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setEditingNews(null), className: "p-2 text-white transition duration-300 bg-black rounded-lg hover:bg-lime", children: "Cancelar" })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-black", children: item.title }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: item.url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-lime hover:underline",
            children: item.url
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-zinc-600", children: [
          "Publicado el ",
          new Date(item.publishDate).toLocaleDateString()
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
          /* @__PURE__ */ jsx("span", { className: `inline-block px-2 py-1 text-sm font-semibold rounded ${getStateColorClass(item.estado)} mr-2`, children: getStateLabel(item.estado) }),
          /* @__PURE__ */ jsx("button", { onClick: () => setEditingNews(item), className: "p-2 text-black transition duration-300 rounded-lg bg-zinc-200 hover:bg-zinc-300", children: "Editar" }),
          /* @__PURE__ */ jsx("button", { onClick: () => handleDeleteNews(item.id), className: "p-2 ml-2 text-black transition duration-300 rounded-lg bg-red hover:bg-[#e85569]", children: "Eliminar" })
        ] })
      ] })
    ] }, item.id)) })
  ] });
};
const getStateLabel = (estado) => {
  switch (estado) {
    case "vigente":
      return "Vigente";
    case "actualizada":
      return "Actualizada";
    case "caducada":
      return "Caducada";
    default:
      return "";
  }
};
const getStateColorClass = (estado) => {
  switch (estado) {
    case "vigente":
      return "bg-green text-black px-2 py-1 rounded-lg text-lg";
    case "actualizada":
      return "bg-yellow text-black px-2 py-1 rounded-lg text-lg";
    case "caducada":
      return "bg-red text-black px-2 py-1 rounded-lg text-lg";
    default:
      return "";
  }
};

const $$Novedades = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Gestor de Noticias" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "NewsManager", NewsManager, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/macbookpro/Desktop/sancor-eve-garay/src/components/NewsManager", "client:component-export": "default" })} </main> ` })}`;
}, "/Users/macbookpro/Desktop/sancor-eve-garay/src/pages/novedades.astro", void 0);

const $$file = "/Users/macbookpro/Desktop/sancor-eve-garay/src/pages/novedades.astro";
const $$url = "/novedades";

export { $$Novedades as default, $$file as file, $$url as url };
