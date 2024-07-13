/* empty css                                   */
import { k as createComponent, l as renderTemplate, m as renderComponent, n as maybeRenderHead } from './astro/server_8Q9s6_jR.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as $$Layout } from './Layout_DkRLmuch.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const examplePosts = [
      { id: 1, title: "Primera publicación", content: "Contenido de la primera publicación", date: "2024-07-13" },
      { id: 2, title: "Segunda publicación", content: "Contenido de la segunda publicación", date: "2024-07-14" }
    ];
    setPosts(examplePosts);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: posts.map((post) => /* @__PURE__ */ jsxs("div", { className: "p-4 bg-white rounded-lg shadow-card", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xl font-bold text-black", children: post.title }),
    /* @__PURE__ */ jsx("p", { className: "mb-2 text-zinc-800", children: post.content }),
    /* @__PURE__ */ jsx("span", { className: "text-sm text-zinc-500", children: post.date })
  ] }, post.id)) });
};

const PostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title, content);
    setTitle("");
    setContent("");
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-4 space-y-4 rounded-lg bg-zinc-100", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "title", className: "block mb-2 text-black", children: "Título" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          id: "title",
          value: title,
          onChange: (e) => setTitle(e.target.value),
          className: "w-full p-2 border rounded border-zinc-300",
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "content", className: "block mb-2 text-black", children: "Contenido" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          id: "content",
          value: content,
          onChange: (e) => setContent(e.target.value),
          className: "w-full p-2 border rounded border-zinc-300",
          rows: 4,
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsx("button", { type: "submit", className: "px-4 py-2 text-white rounded bg-lime hover:bg-opacity-90", children: "Publicar" })
  ] });
};

const $$Foro = createComponent(($$result, $$props, $$slots) => {
  const handleNewPost = (title, content) => {
    console.log("Nueva publicaci\xF3n:", { title, content });
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Mi Foro" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container px-4 py-8 mx-auto"> <h1 class="mb-8 text-3xl font-bold text-black">Mi Foro</h1> ${renderComponent($$result2, "PostList", PostList, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/macbookpro/Desktop/sancor-eve-garay/src/components/PostList", "client:component-export": "default" })} ${renderTemplate`<div class="mt-8"> <h2 class="mb-4 text-2xl font-bold text-black">Crear Nueva Publicación</h2> ${renderComponent($$result2, "PostForm", PostForm, { "client:load": true, "onSubmit": handleNewPost, "client:component-hydration": "load", "client:component-path": "/Users/macbookpro/Desktop/sancor-eve-garay/src/components/PostForm", "client:component-export": "default" })} </div>`} </main> ` })}`;
}, "/Users/macbookpro/Desktop/sancor-eve-garay/src/pages/foro.astro", void 0);

const $$file = "/Users/macbookpro/Desktop/sancor-eve-garay/src/pages/foro.astro";
const $$url = "/foro";

export { $$Foro as default, $$file as file, $$url as url };
