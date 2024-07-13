/* empty css                                   */
import { k as createComponent, l as renderTemplate, m as renderComponent } from './astro/server_8Q9s6_jR.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Container, a as $$Layout } from './Layout_DkRLmuch.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { EyeOffIcon, EyeIcon } from 'lucide-react';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setDebugInfo("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const responseText = await response.text();
      setDebugInfo(`Status: ${response.status}
Response:
${responseText}`);
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        setError("La respuesta del servidor no es JSON válido");
        return;
      }
      if (!response.ok) {
        setError(data.message || "Ocurrió un error durante el inicio de sesión");
        return;
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = data.redirectUrl;
    } catch (error2) {
      console.error("Error durante el inicio de sesión:", error2);
      setError("Ocurrió un error durante el inicio de sesión");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-screen font-SpaceGrotesk", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md p-6 m-4 space-y-6 rounded-lg bg-zinc-800 shadow-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white sm:text-3xl", children: "Iniciar sesión" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-zinc-400 sm:text-base", children: "Accede a tu cuenta" })
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "p-2 text-sm text-red-500 bg-red-100 rounded", children: error }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 sm:space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-zinc-300", children: "Correo electrónico" }),
        /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(
          "input",
          {
            id: "email",
            name: "email",
            type: "email",
            required: true,
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: "w-full px-3 py-2 text-white border rounded-md placeholder-zinc-500 bg-zinc-700 border-zinc-600 focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent",
            placeholder: "tu@ejemplo.com"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-zinc-300", children: "Contraseña" }),
        /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "password",
              name: "password",
              type: showPassword ? "text" : "password",
              required: true,
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: "w-full px-3 py-2 text-white border rounded-md placeholder-zinc-500 bg-zinc-700 border-zinc-600 focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent",
              placeholder: "********"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "absolute inset-y-0 right-0 flex items-center pr-3",
              onClick: () => setShowPassword(!showPassword),
              children: showPassword ? /* @__PURE__ */ jsx(EyeOffIcon, { className: "w-5 h-5 text-zinc-400" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5 text-zinc-400" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: isLoading,
          className: "w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-lime hover:bg-white hover:text-lime focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime disabled:opacity-50 disabled:cursor-not-allowed",
          children: isLoading ? "Iniciando sesión..." : "Iniciar sesión"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-xs text-center text-zinc-400 sm:text-sm", children: [
      "¿No tienes una cuenta?",
      " ",
      /* @__PURE__ */ jsx("a", { href: "/registro", className: "font-medium text-lime hover:text-white", children: "Registrarse" })
    ] }),
    debugInfo && /* @__PURE__ */ jsxs("div", { className: "p-2 mt-4 rounded bg-zinc-700", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold text-white", children: "Debug Info:" }),
      /* @__PURE__ */ jsx("pre", { className: "text-xs whitespace-pre-wrap text-zinc-300", children: debugInfo })
    ] })
  ] }) });
};

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Iniciar Sesi\xF3n" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "LoginForm", LoginForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/macbookpro/Desktop/sancor-eve-garay/src/components/LoginForm", "client:component-export": "default" })} ` })} ` })}`;
}, "/Users/macbookpro/Desktop/sancor-eve-garay/src/pages/login.astro", void 0);

const $$file = "/Users/macbookpro/Desktop/sancor-eve-garay/src/pages/login.astro";
const $$url = "/login";

export { $$Login as default, $$file as file, $$url as url };
