/* empty css                                   */
import { k as createComponent, l as renderTemplate, m as renderComponent } from './astro/server_8Q9s6_jR.mjs';
import 'kleur/colors';
import 'html-escaper';
import { jsx, jsxs } from 'react/jsx-runtime';
import 'react';
import { a as $$Layout } from './Layout_z8IXI5F6.mjs';

const LoginForm = () => {
  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-screen bg-zinc-900", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md p-6 m-4 space-y-6 rounded-lg bg-zinc-800 shadow-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-lime sm:text-3xl", children: "Iniciar sesión con Google" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-zinc-400 sm:text-base", children: "Accede a tu cuenta usando Google" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleGoogleLogin,
        className: "w-full px-4 py-2 mt-2 text-sm font-medium text-white rounded-md bg-lime hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        children: "Iniciar sesión con Google"
      }
    ) }),
    /* @__PURE__ */ jsxs("p", { className: "text-xs text-center text-zinc-400 sm:text-sm", children: [
      "¿No tienes una cuenta?",
      " ",
      /* @__PURE__ */ jsx("a", { href: "/register", className: "font-medium text-lime hover:text-white", children: "Registrarse" })
    ] })
  ] }) });
};

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Iniciar Sesion" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LoginForm", LoginForm, {})} ` })}`;
}, "/Users/macbookpro/Desktop/sancor-eve-garay/src/pages/login.astro", void 0);

const $$file = "/Users/macbookpro/Desktop/sancor-eve-garay/src/pages/login.astro";
const $$url = "/login";

export { $$Login as default, $$file as file, $$url as url };
