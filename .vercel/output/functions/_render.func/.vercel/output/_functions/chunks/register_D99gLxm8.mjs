/* empty css                                   */
import { k as createComponent, l as renderTemplate, m as renderComponent } from './astro/server_8Q9s6_jR.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Container, a as $$Layout } from './Layout_DkRLmuch.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { EyeOffIcon, EyeIcon } from 'lucide-react';
import { r as registerUser, v as verifyUser } from './db-users_H8ZesWbH.mjs';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      console.log("Registrando usuario:", { email, password, name });
      const user = await registerUser(email, password, name);
      console.log("Respuesta de registerUser:", user);
      if (user) {
        console.log("Usuario registrado:", user);
        setEmail("");
        setPassword("");
        setName("");
        setSuccess("Usuario registrado exitosamente");
        const loggedInUser = await verifyUser(email, password);
        console.log("Respuesta de verifyUser:", loggedInUser);
        if (loggedInUser) {
          console.log("Usuario logueado automáticamente:", loggedInUser);
        } else {
          setError("Error al iniciar sesión automáticamente");
        }
      } else {
        setError("Error al registrar el usuario");
      }
    } catch (error2) {
      console.error("Error al registrar:", error2);
      setError("Error al registrar. Por favor, intenta de nuevo.");
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-screen font-SpaceGrotesk", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md p-6 m-4 space-y-6 rounded-lg bg-zinc-800 shadow-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white sm:text-3xl", children: "Registrarse" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-zinc-400 sm:text-base", children: "Crea tu cuenta" })
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "p-2 text-sm text-red-500 bg-red-100 rounded", children: error }),
    success && /* @__PURE__ */ jsx("div", { className: "p-2 text-sm text-green-500 bg-green-100 rounded", children: success }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 sm:space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-zinc-300", children: "Nombre" }),
        /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(
          "input",
          {
            id: "name",
            name: "name",
            type: "text",
            required: true,
            value: name,
            onChange: (e) => setName(e.target.value),
            className: "w-full px-3 py-2 text-white border rounded-md placeholder-zinc-500 bg-zinc-700 border-zinc-600 focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent",
            placeholder: "Tu nombre"
          }
        ) })
      ] }),
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
          className: "w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-lime hover:bg-white hover:text-lime focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime",
          children: "Registrarse"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-xs text-center text-zinc-400 sm:text-sm", children: [
      "¿Ya tienes una cuenta?",
      " ",
      /* @__PURE__ */ jsx("a", { href: "/login", className: "font-medium text-lime hover:text-white", children: "Iniciar sesión" })
    ] })
  ] }) });
};

const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Registrarse" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "RegisterForm", RegisterForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/macbookpro/Desktop/sancor-eve-garay/src/components/RegisterForm", "client:component-export": "default" })} ` })} ` })}`;
}, "/Users/macbookpro/Desktop/sancor-eve-garay/src/pages/register.astro", void 0);

const $$file = "/Users/macbookpro/Desktop/sancor-eve-garay/src/pages/register.astro";
const $$url = "/register";

export { $$Register as default, $$file as file, $$url as url };
