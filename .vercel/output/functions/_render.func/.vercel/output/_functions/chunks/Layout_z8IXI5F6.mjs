import { k as createComponent, l as renderTemplate, n as maybeRenderHead, q as renderSlot, t as defineStyleVars, o as addAttribute, m as renderComponent, p as createAstro, u as renderHead } from './astro/server_8Q9s6_jR.mjs';
import 'kleur/colors';
import 'html-escaper';
/* empty css                                   */
import 'clsx';
import { expandConfig } from '@libsql/core/config';
import Database from 'libsql';
import { Buffer } from 'node:buffer';
import { LibsqlError } from '@libsql/core/api';
import { supportedUrlLink, transactionModeToBegin, ResultSetImpl } from '@libsql/core/util';
import * as hrana from '@libsql/hrana-client';
import { encodeBaseUrl } from '@libsql/core/uri';
import promiseLimit from 'promise-limit';
import { drizzle } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

const $$Container = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="max-w-screen-xl px-6 mx-auto md:px-14 xl:px-14"> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/Users/macbookpro/Desktop/sancor-eve-garay/src/components/Container.astro", void 0);

const $$Astro$3 = createAstro();
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Navbar;
  const navLinks = [
    {
      label: "NPS",
      dropdown: true,
      items: [
        { href: "/nps-trimestral", label: "NPS - Trimestral" },
        { href: "/nps-individual", label: "NPS - Individual" },
        { href: "/balance-mensual", label: "Balance Mensual" }
      ]
    },
    { href: "/#casos", label: "Casos derivar / cerrar" },
    { href: "/promotores", label: "Promotores" },
    { href: "/foro", label: "Foro" },
    {
      label: "Herramientas",
      dropdown: true,
      items: [
        { href: "/notfound", label: "Herramienta 1" },
        { href: "/notfound", label: "Herramienta 2" },
        { href: "/notfound", label: "Herramienta 3" }
      ]
    }
  ];
  const userJson = Astro2.cookies.get("user")?.value || (typeof localStorage !== "undefined" ? localStorage.getItem("user") : null);
  const user = userJson ? JSON.parse(userJson) : null;
  const navbarHeight = "64px";
  const $$definedVars = defineStyleVars([{ navbarHeight }]);
  return renderTemplate`${maybeRenderHead()}<header class="fixed top-0 left-0 z-50 w-full" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> <nav id="landing-header" class="bg-white navbar" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> ${renderComponent($$result, "Container", $$Container, { "class": "h-full py-4", "data-astro-cid-5blmo7yk": true }, { "default": ($$result2) => renderTemplate` <div class="flex items-center justify-between mx-auto" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> <img src="/Logo.webp" class="w-36" alt="Logo" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> </a> <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center justify-center w-10 h-10 p-2 text-sm rounded-lg text-zinc-500 md:hidden hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200" aria-controls="navbar-default" aria-expanded="false" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> <span class="sr-only" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}>Open main menu</span> <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}></path> </svg> </button> <div class="hidden w-full md:flex md:items-center md:w-auto" id="navbar-default" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> <ul class="flex flex-col p-4 mt-4 font-medium md:flex-row md:space-x-8 md:mt-0 md:p-0 font-SpaceGrotesk" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> ${navLinks.map((link) => renderTemplate`<li class="relative dropdown-container" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> ${link.dropdown ? renderTemplate`<div data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> <a href="#" class="flex items-center px-3 py-2 text-black transition-colors duration-200 rounded hover:text-lime" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> ${link.label} <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}></path> </svg> </a> <div class="dropdown-menu" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> ${link.items.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="block px-4 py-2 text-sm text-black transition-colors duration-200 hover:bg-zinc-100" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}>${item.label}</a>`)} </div> </div>` : renderTemplate`<a${addAttribute(link.href, "href")} class="block px-3 py-2 text-black transition-colors duration-200 rounded hover:text-lime" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}>${link.label}</a>`} </li>`)} </ul> ${user ? renderTemplate`<div class="flex items-center ml-4" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> <img${addAttribute(user.photoUrl || "/default-avatar.png", "src")}${addAttribute(user.name, "alt")} class="w-8 h-8 mr-2 rounded-full" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> <span data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}>${user.name}</span> </div>` : renderTemplate`<div class="flex items-center ml-4 space-x-2" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> <a href="/login" class="inline-flex items-center px-4 py-2 font-medium text-white transition-colors duration-200 rounded-lg bg-lime hover:bg-black focus:ring-4 focus:outline-none focus:ring-zinc-300" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}></path> </svg>
Iniciar sesión
</a>  </div>`} </div> </div> ` })} </nav> </header> <div class="navbar-spacer" data-astro-cid-5blmo7yk${addAttribute($$definedVars, "style")}></div>  `;
}, "/Users/macbookpro/Desktop/sancor-eve-garay/src/components/Navbar.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate(_a || (_a = __template(["", '<footer class="bg-[#6F88CD] text-zinc-900 font-SpaceGrotesk" data-astro-cid-sz7xmlte> ', ` </footer> <div id="whatsapp-container" class="fixed z-50 bottom-4 right-4" data-astro-cid-sz7xmlte> <a href="https://api.whatsapp.com/send?phone=5493513818385" target="_blank" rel="noopener noreferrer" class="block" aria-label="Chat on WhatsApp" data-astro-cid-sz7xmlte> <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 39 39" data-astro-cid-sz7xmlte> <path fill="#00E676" d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z" data-astro-cid-sz7xmlte></path> <path fill="#FFF" d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z" data-astro-cid-sz7xmlte></path> </svg> </a> <div id="whatsapp-popup" class="absolute right-0 hidden w-64 p-4 bg-black rounded-lg shadow-xl bottom-16" data-astro-cid-sz7xmlte> <p class="text-sm text-white" data-astro-cid-sz7xmlte>Hola, soy Eve, cualquier duda que tengas, porfa consultame asi te puedo ayudar \u{1F60A} </p> </div> </div> <script>
    const year = new Date().getFullYear();
    document.getElementById("currentYear").innerHTML = \`\${year}\`;

    let popupShown = false;
    const whatsappPopup = document.getElementById('whatsapp-popup');

    window.addEventListener('scroll', () => {
        if (!popupShown && window.scrollY > 300) { // Muestra el popup despu\xE9s de 300px de scroll
            whatsappPopup.classList.remove('hidden');
            popupShown = true;
            
            // Oculta el popup despu\xE9s de 5 segundos
            setTimeout(() => {
                whatsappPopup.classList.add('hidden');
            }, 5000);
        }
        
        // Mostrar bot\xF3n de scroll cuando se hace scroll hacia abajo
        const scrollTopButton = document.getElementById('scroll-top-button');
        if (window.scrollY > 300) {
            scrollTopButton.classList.remove('hidden');
        } else {
            scrollTopButton.classList.add('hidden');
        }
    });

    // Cierra el popup al hacer clic en cualquier parte
    document.addEventListener('click', (event) => {
        if (!whatsappPopup.contains(event.target) && !popupShown) {
            whatsappPopup.classList.add('hidden');
        }
    });

    // Funci\xF3n para hacer scroll hacia arriba
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
<\/script>  <button id="scroll-top-button" class="hidden" aria-label="Scroll to top" onclick="scrollToTop()" data-astro-cid-sz7xmlte> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-sz7xmlte> <path d="M12 2a10 10 0 0 0-7.072 17.07l1.414-1.414A8 8 0 0 1 12 4a8 8 0 0 1 7.07 11.456l1.413 1.414A10 10 0 0 0 12 2z" data-astro-cid-sz7xmlte></path> <path d="M11 15.5V7h2v8.5a.5.5 0 0 1-1 0z" data-astro-cid-sz7xmlte></path> </svg> </button>`], ["", '<footer class="bg-[#6F88CD] text-zinc-900 font-SpaceGrotesk" data-astro-cid-sz7xmlte> ', ` </footer> <div id="whatsapp-container" class="fixed z-50 bottom-4 right-4" data-astro-cid-sz7xmlte> <a href="https://api.whatsapp.com/send?phone=5493513818385" target="_blank" rel="noopener noreferrer" class="block" aria-label="Chat on WhatsApp" data-astro-cid-sz7xmlte> <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 39 39" data-astro-cid-sz7xmlte> <path fill="#00E676" d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z" data-astro-cid-sz7xmlte></path> <path fill="#FFF" d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z" data-astro-cid-sz7xmlte></path> </svg> </a> <div id="whatsapp-popup" class="absolute right-0 hidden w-64 p-4 bg-black rounded-lg shadow-xl bottom-16" data-astro-cid-sz7xmlte> <p class="text-sm text-white" data-astro-cid-sz7xmlte>Hola, soy Eve, cualquier duda que tengas, porfa consultame asi te puedo ayudar \u{1F60A} </p> </div> </div> <script>
    const year = new Date().getFullYear();
    document.getElementById("currentYear").innerHTML = \\\`\\\${year}\\\`;

    let popupShown = false;
    const whatsappPopup = document.getElementById('whatsapp-popup');

    window.addEventListener('scroll', () => {
        if (!popupShown && window.scrollY > 300) { // Muestra el popup despu\xE9s de 300px de scroll
            whatsappPopup.classList.remove('hidden');
            popupShown = true;
            
            // Oculta el popup despu\xE9s de 5 segundos
            setTimeout(() => {
                whatsappPopup.classList.add('hidden');
            }, 5000);
        }
        
        // Mostrar bot\xF3n de scroll cuando se hace scroll hacia abajo
        const scrollTopButton = document.getElementById('scroll-top-button');
        if (window.scrollY > 300) {
            scrollTopButton.classList.remove('hidden');
        } else {
            scrollTopButton.classList.add('hidden');
        }
    });

    // Cierra el popup al hacer clic en cualquier parte
    document.addEventListener('click', (event) => {
        if (!whatsappPopup.contains(event.target) && !popupShown) {
            whatsappPopup.classList.add('hidden');
        }
    });

    // Funci\xF3n para hacer scroll hacia arriba
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
<\/script>  <button id="scroll-top-button" class="hidden" aria-label="Scroll to top" onclick="scrollToTop()" data-astro-cid-sz7xmlte> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-sz7xmlte> <path d="M12 2a10 10 0 0 0-7.072 17.07l1.414-1.414A8 8 0 0 1 12 4a8 8 0 0 1 7.07 11.456l1.413 1.414A10 10 0 0 0 12 2z" data-astro-cid-sz7xmlte></path> <path d="M11 15.5V7h2v8.5a.5.5 0 0 1-1 0z" data-astro-cid-sz7xmlte></path> </svg> </button>`])), maybeRenderHead(), renderComponent($$result, "Container", $$Container, { "data-astro-cid-sz7xmlte": true }, { "default": ($$result2) => renderTemplate` <div class="flex items-center justify-between py-6" data-astro-cid-sz7xmlte> <div data-astro-cid-sz7xmlte> <img class="w-44" src="/Logo.webp" alt="Logo" data-astro-cid-sz7xmlte> </div> <div class="text-right" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>@ 2024<span id="currentYear" data-astro-cid-sz7xmlte></span> Administracion y Soporte <em data-astro-cid-sz7xmlte>Gaston Alvarez</em></p> <p data-astro-cid-sz7xmlte>Made with <a href="https://astro.build/" target="_blank" rel="noopener noreferrer" class="underline transition-colors duration-300 hover:text-white" data-astro-cid-sz7xmlte>Astro</a></p> </div> </div> ` }));
}, "/Users/macbookpro/Desktop/sancor-eve-garay/src/components/Footer.astro", void 0);

const $$Astro$1 = createAstro();
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/macbookpro/Desktop/sancor-eve-garay/node_modules/astro/components/ViewTransitions.astro", void 0);

/** @private */
function _createClient$3(config) {
    if (config.scheme !== "file") {
        throw new LibsqlError(`URL scheme ${JSON.stringify(config.scheme + ":")} is not supported by the local sqlite3 client. ` +
            `For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
    }
    const authority = config.authority;
    if (authority !== undefined) {
        const host = authority.host.toLowerCase();
        if (host !== "" && host !== "localhost") {
            throw new LibsqlError(`Invalid host in file URL: ${JSON.stringify(authority.host)}. ` +
                'A "file:" URL with an absolute path should start with one slash ("file:/absolute/path.db") ' +
                'or with three slashes ("file:///absolute/path.db"). ' +
                `For more information, please read ${supportedUrlLink}`, "URL_INVALID");
        }
        if (authority.port !== undefined) {
            throw new LibsqlError("File URL cannot have a port", "URL_INVALID");
        }
        if (authority.userinfo !== undefined) {
            throw new LibsqlError("File URL cannot have username and password", "URL_INVALID");
        }
    }
    const path = config.path;
    const options = {
        authToken: config.authToken,
        encryptionKey: config.encryptionKey,
        syncUrl: config.syncUrl,
        syncPeriod: config.syncInterval,
    };
    const db = new Database(path, options);
    executeStmt(db, "SELECT 1 AS checkThatTheDatabaseCanBeOpened", config.intMode);
    return new Sqlite3Client(path, options, db, config.intMode);
}
class Sqlite3Client {
    #path;
    #options;
    #db;
    #intMode;
    closed;
    protocol;
    /** @private */
    constructor(path, options, db, intMode) {
        this.#path = path;
        this.#options = options;
        this.#db = db;
        this.#intMode = intMode;
        this.closed = false;
        this.protocol = "file";
    }
    async execute(stmt) {
        this.#checkNotClosed();
        return executeStmt(this.#getDb(), stmt, this.#intMode);
    }
    async batch(stmts, mode = "deferred") {
        this.#checkNotClosed();
        const db = this.#getDb();
        try {
            executeStmt(db, transactionModeToBegin(mode), this.#intMode);
            const resultSets = stmts.map((stmt) => {
                if (!db.inTransaction) {
                    throw new LibsqlError("The transaction has been rolled back", "TRANSACTION_CLOSED");
                }
                return executeStmt(db, stmt, this.#intMode);
            });
            executeStmt(db, "COMMIT", this.#intMode);
            return resultSets;
        }
        finally {
            if (db.inTransaction) {
                executeStmt(db, "ROLLBACK", this.#intMode);
            }
        }
    }
    async transaction(mode = "write") {
        const db = this.#getDb();
        executeStmt(db, transactionModeToBegin(mode), this.#intMode);
        this.#db = null; // A new connection will be lazily created on next use
        return new Sqlite3Transaction(db, this.#intMode);
    }
    async executeMultiple(sql) {
        this.#checkNotClosed();
        const db = this.#getDb();
        try {
            return executeMultiple(db, sql);
        }
        finally {
            if (db.inTransaction) {
                executeStmt(db, "ROLLBACK", this.#intMode);
            }
        }
    }
    async sync() {
        this.#checkNotClosed();
        await this.#getDb().sync();
    }
    close() {
        this.closed = true;
        if (this.#db !== null) {
            this.#db.close();
        }
    }
    #checkNotClosed() {
        if (this.closed) {
            throw new LibsqlError("The client is closed", "CLIENT_CLOSED");
        }
    }
    // Lazily creates the database connection and returns it
    #getDb() {
        if (this.#db === null) {
            this.#db = new Database(this.#path, this.#options);
        }
        return this.#db;
    }
}
class Sqlite3Transaction {
    #database;
    #intMode;
    /** @private */
    constructor(database, intMode) {
        this.#database = database;
        this.#intMode = intMode;
    }
    async execute(stmt) {
        this.#checkNotClosed();
        return executeStmt(this.#database, stmt, this.#intMode);
    }
    async batch(stmts) {
        return stmts.map((stmt) => {
            this.#checkNotClosed();
            return executeStmt(this.#database, stmt, this.#intMode);
        });
    }
    async executeMultiple(sql) {
        this.#checkNotClosed();
        return executeMultiple(this.#database, sql);
    }
    async rollback() {
        if (!this.#database.open) {
            return;
        }
        this.#checkNotClosed();
        executeStmt(this.#database, "ROLLBACK", this.#intMode);
    }
    async commit() {
        this.#checkNotClosed();
        executeStmt(this.#database, "COMMIT", this.#intMode);
    }
    close() {
        if (this.#database.inTransaction) {
            executeStmt(this.#database, "ROLLBACK", this.#intMode);
        }
    }
    get closed() {
        return !this.#database.inTransaction;
    }
    #checkNotClosed() {
        if (this.closed) {
            throw new LibsqlError("The transaction is closed", "TRANSACTION_CLOSED");
        }
    }
}
function executeStmt(db, stmt, intMode) {
    let sql;
    let args;
    if (typeof stmt === "string") {
        sql = stmt;
        args = [];
    }
    else {
        sql = stmt.sql;
        if (Array.isArray(stmt.args)) {
            args = stmt.args.map((value) => valueToSql(value, intMode));
        }
        else {
            args = {};
            for (const name in stmt.args) {
                const argName = name[0] === "@" || name[0] === "$" || name[0] === ":"
                    ? name.substring(1)
                    : name;
                args[argName] = valueToSql(stmt.args[name], intMode);
            }
        }
    }
    try {
        const sqlStmt = db.prepare(sql);
        sqlStmt.safeIntegers(true);
        let returnsData = true;
        try {
            sqlStmt.raw(true);
        }
        catch {
            // raw() throws an exception if the statement does not return data
            returnsData = false;
        }
        if (returnsData) {
            const columns = Array.from(sqlStmt.columns().map((col) => col.name));
            const columnTypes = Array.from(sqlStmt.columns().map((col) => col.type ?? ""));
            const rows = sqlStmt.all(args).map((sqlRow) => {
                return rowFromSql(sqlRow, columns, intMode);
            });
            // TODO: can we get this info from better-sqlite3?
            const rowsAffected = 0;
            const lastInsertRowid = undefined;
            return new ResultSetImpl(columns, columnTypes, rows, rowsAffected, lastInsertRowid);
        }
        else {
            const info = sqlStmt.run(args);
            const rowsAffected = info.changes;
            const lastInsertRowid = BigInt(info.lastInsertRowid);
            return new ResultSetImpl([], [], [], rowsAffected, lastInsertRowid);
        }
    }
    catch (e) {
        throw mapSqliteError(e);
    }
}
function rowFromSql(sqlRow, columns, intMode) {
    const row = {};
    // make sure that the "length" property is not enumerable
    Object.defineProperty(row, "length", { value: sqlRow.length });
    for (let i = 0; i < sqlRow.length; ++i) {
        const value = valueFromSql(sqlRow[i], intMode);
        Object.defineProperty(row, i, { value });
        const column = columns[i];
        if (!Object.hasOwn(row, column)) {
            Object.defineProperty(row, column, {
                value,
                enumerable: true,
                configurable: true,
                writable: true,
            });
        }
    }
    return row;
}
function valueFromSql(sqlValue, intMode) {
    if (typeof sqlValue === "bigint") {
        if (intMode === "number") {
            if (sqlValue < minSafeBigint || sqlValue > maxSafeBigint) {
                throw new RangeError("Received integer which cannot be safely represented as a JavaScript number");
            }
            return Number(sqlValue);
        }
        else if (intMode === "bigint") {
            return sqlValue;
        }
        else if (intMode === "string") {
            return "" + sqlValue;
        }
        else {
            throw new Error("Invalid value for IntMode");
        }
    }
    else if (sqlValue instanceof Buffer) {
        return sqlValue.buffer;
    }
    return sqlValue;
}
const minSafeBigint = -9007199254740991n;
const maxSafeBigint = 9007199254740991n;
function valueToSql(value, intMode) {
    if (typeof value === "number") {
        if (!Number.isFinite(value)) {
            throw new RangeError("Only finite numbers (not Infinity or NaN) can be passed as arguments");
        }
        return value;
    }
    else if (typeof value === "bigint") {
        if (value < minInteger || value > maxInteger) {
            throw new RangeError("bigint is too large to be represented as a 64-bit integer and passed as argument");
        }
        return value;
    }
    else if (typeof value === "boolean") {
        switch (intMode) {
            case "bigint":
                return value ? 1n : 0n;
            case "string":
                return value ? "1" : "0";
            default:
                return value ? 1 : 0;
        }
    }
    else if (value instanceof ArrayBuffer) {
        return Buffer.from(value);
    }
    else if (value instanceof Date) {
        return value.valueOf();
    }
    else if (value === undefined) {
        throw new TypeError("undefined cannot be passed as argument to the database");
    }
    else {
        return value;
    }
}
const minInteger = -9223372036854775808n;
const maxInteger = 9223372036854775807n;
function executeMultiple(db, sql) {
    try {
        db.exec(sql);
    }
    catch (e) {
        throw mapSqliteError(e);
    }
}
function mapSqliteError(e) {
    if (e instanceof Database.SqliteError) {
        return new LibsqlError(e.message, e.code, e.rawCode, e);
    }
    return e;
}

class HranaTransaction {
    #mode;
    #version;
    // Promise that is resolved when the BEGIN statement completes, or `undefined` if we haven't executed the
    // BEGIN statement yet.
    #started;
    /** @private */
    constructor(mode, version) {
        this.#mode = mode;
        this.#version = version;
        this.#started = undefined;
    }
    execute(stmt) {
        return this.batch([stmt]).then((results) => results[0]);
    }
    async batch(stmts) {
        const stream = this._getStream();
        if (stream.closed) {
            throw new LibsqlError("Cannot execute statements because the transaction is closed", "TRANSACTION_CLOSED");
        }
        try {
            const hranaStmts = stmts.map(stmtToHrana);
            let rowsPromises;
            if (this.#started === undefined) {
                // The transaction hasn't started yet, so we need to send the BEGIN statement in a batch with
                // `hranaStmts`.
                this._getSqlCache().apply(hranaStmts);
                const batch = stream.batch(this.#version >= 3);
                const beginStep = batch.step();
                const beginPromise = beginStep.run(transactionModeToBegin(this.#mode));
                // Execute the `hranaStmts` only if the BEGIN succeeded, to make sure that we don't execute it
                // outside of a transaction.
                let lastStep = beginStep;
                rowsPromises = hranaStmts.map((hranaStmt) => {
                    const stmtStep = batch
                        .step()
                        .condition(hrana.BatchCond.ok(lastStep));
                    if (this.#version >= 3) {
                        // If the Hrana version supports it, make sure that we are still in a transaction
                        stmtStep.condition(hrana.BatchCond.not(hrana.BatchCond.isAutocommit(batch)));
                    }
                    const rowsPromise = stmtStep.query(hranaStmt);
                    rowsPromise.catch(() => undefined); // silence Node warning
                    lastStep = stmtStep;
                    return rowsPromise;
                });
                // `this.#started` is resolved successfully only if the batch and the BEGIN statement inside
                // of the batch are both successful.
                this.#started = batch
                    .execute()
                    .then(() => beginPromise)
                    .then(() => undefined);
                try {
                    await this.#started;
                }
                catch (e) {
                    // If the BEGIN failed, the transaction is unusable and we must close it. However, if the
                    // BEGIN suceeds and `hranaStmts` fail, the transaction is _not_ closed.
                    this.close();
                    throw e;
                }
            }
            else {
                if (this.#version < 3) {
                    // The transaction has started, so we must wait until the BEGIN statement completed to make
                    // sure that we don't execute `hranaStmts` outside of a transaction.
                    await this.#started;
                }
                else {
                    // The transaction has started, but we will use `hrana.BatchCond.isAutocommit()` to make
                    // sure that we don't execute `hranaStmts` outside of a transaction, so we don't have to
                    // wait for `this.#started`
                }
                this._getSqlCache().apply(hranaStmts);
                const batch = stream.batch(this.#version >= 3);
                let lastStep = undefined;
                rowsPromises = hranaStmts.map((hranaStmt) => {
                    const stmtStep = batch.step();
                    if (lastStep !== undefined) {
                        stmtStep.condition(hrana.BatchCond.ok(lastStep));
                    }
                    if (this.#version >= 3) {
                        stmtStep.condition(hrana.BatchCond.not(hrana.BatchCond.isAutocommit(batch)));
                    }
                    const rowsPromise = stmtStep.query(hranaStmt);
                    rowsPromise.catch(() => undefined); // silence Node warning
                    lastStep = stmtStep;
                    return rowsPromise;
                });
                await batch.execute();
            }
            const resultSets = [];
            for (const rowsPromise of rowsPromises) {
                const rows = await rowsPromise;
                if (rows === undefined) {
                    throw new LibsqlError("Statement in a transaction was not executed, " +
                        "probably because the transaction has been rolled back", "TRANSACTION_CLOSED");
                }
                resultSets.push(resultSetFromHrana(rows));
            }
            return resultSets;
        }
        catch (e) {
            throw mapHranaError(e);
        }
    }
    async executeMultiple(sql) {
        const stream = this._getStream();
        if (stream.closed) {
            throw new LibsqlError("Cannot execute statements because the transaction is closed", "TRANSACTION_CLOSED");
        }
        try {
            if (this.#started === undefined) {
                // If the transaction hasn't started yet, start it now
                this.#started = stream
                    .run(transactionModeToBegin(this.#mode))
                    .then(() => undefined);
                try {
                    await this.#started;
                }
                catch (e) {
                    this.close();
                    throw e;
                }
            }
            else {
                // Wait until the transaction has started
                await this.#started;
            }
            await stream.sequence(sql);
        }
        catch (e) {
            throw mapHranaError(e);
        }
    }
    async rollback() {
        try {
            const stream = this._getStream();
            if (stream.closed) {
                return;
            }
            if (this.#started !== undefined) {
                // We don't have to wait for the BEGIN statement to complete. If the BEGIN fails, we will
                // execute a ROLLBACK outside of an active transaction, which should be harmless.
            }
            else {
                // We did nothing in the transaction, so there is nothing to rollback.
                return;
            }
            // Pipeline the ROLLBACK statement and the stream close.
            const promise = stream.run("ROLLBACK").catch((e) => {
                throw mapHranaError(e);
            });
            stream.closeGracefully();
            await promise;
        }
        catch (e) {
            throw mapHranaError(e);
        }
        finally {
            // `this.close()` may close the `hrana.Client`, which aborts all pending stream requests, so we
            // must call it _after_ we receive the ROLLBACK response.
            // Also note that the current stream should already be closed, but we need to call `this.close()`
            // anyway, because it may need to do more cleanup.
            this.close();
        }
    }
    async commit() {
        // (this method is analogous to `rollback()`)
        try {
            const stream = this._getStream();
            if (stream.closed) {
                throw new LibsqlError("Cannot commit the transaction because it is already closed", "TRANSACTION_CLOSED");
            }
            if (this.#started !== undefined) {
                // Make sure to execute the COMMIT only if the BEGIN was successful.
                await this.#started;
            }
            else {
                return;
            }
            const promise = stream.run("COMMIT").catch((e) => {
                throw mapHranaError(e);
            });
            stream.closeGracefully();
            await promise;
        }
        catch (e) {
            throw mapHranaError(e);
        }
        finally {
            this.close();
        }
    }
}
async function executeHranaBatch(mode, version, batch, hranaStmts) {
    const beginStep = batch.step();
    const beginPromise = beginStep.run(transactionModeToBegin(mode));
    let lastStep = beginStep;
    const stmtPromises = hranaStmts.map((hranaStmt) => {
        const stmtStep = batch.step().condition(hrana.BatchCond.ok(lastStep));
        if (version >= 3) {
            stmtStep.condition(hrana.BatchCond.not(hrana.BatchCond.isAutocommit(batch)));
        }
        const stmtPromise = stmtStep.query(hranaStmt);
        lastStep = stmtStep;
        return stmtPromise;
    });
    const commitStep = batch.step().condition(hrana.BatchCond.ok(lastStep));
    if (version >= 3) {
        commitStep.condition(hrana.BatchCond.not(hrana.BatchCond.isAutocommit(batch)));
    }
    const commitPromise = commitStep.run("COMMIT");
    const rollbackStep = batch
        .step()
        .condition(hrana.BatchCond.not(hrana.BatchCond.ok(commitStep)));
    rollbackStep.run("ROLLBACK").catch((_) => undefined);
    await batch.execute();
    const resultSets = [];
    await beginPromise;
    for (const stmtPromise of stmtPromises) {
        const hranaRows = await stmtPromise;
        if (hranaRows === undefined) {
            throw new LibsqlError("Statement in a batch was not executed, probably because the transaction has been rolled back", "TRANSACTION_CLOSED");
        }
        resultSets.push(resultSetFromHrana(hranaRows));
    }
    await commitPromise;
    return resultSets;
}
function stmtToHrana(stmt) {
    if (typeof stmt === "string") {
        return new hrana.Stmt(stmt);
    }
    const hranaStmt = new hrana.Stmt(stmt.sql);
    if (Array.isArray(stmt.args)) {
        hranaStmt.bindIndexes(stmt.args);
    }
    else {
        for (const [key, value] of Object.entries(stmt.args)) {
            hranaStmt.bindName(key, value);
        }
    }
    return hranaStmt;
}
function resultSetFromHrana(hranaRows) {
    const columns = hranaRows.columnNames.map((c) => c ?? "");
    const columnTypes = hranaRows.columnDecltypes.map((c) => c ?? "");
    const rows = hranaRows.rows;
    const rowsAffected = hranaRows.affectedRowCount;
    const lastInsertRowid = hranaRows.lastInsertRowid !== undefined
        ? hranaRows.lastInsertRowid
        : undefined;
    return new ResultSetImpl(columns, columnTypes, rows, rowsAffected, lastInsertRowid);
}
function mapHranaError(e) {
    if (e instanceof hrana.ClientError) {
        const code = mapHranaErrorCode(e);
        return new LibsqlError(e.message, code, undefined, e);
    }
    return e;
}
function mapHranaErrorCode(e) {
    if (e instanceof hrana.ResponseError && e.code !== undefined) {
        return e.code;
    }
    else if (e instanceof hrana.ProtoError) {
        return "HRANA_PROTO_ERROR";
    }
    else if (e instanceof hrana.ClosedError) {
        return e.cause instanceof hrana.ClientError
            ? mapHranaErrorCode(e.cause)
            : "HRANA_CLOSED_ERROR";
    }
    else if (e instanceof hrana.WebSocketError) {
        return "HRANA_WEBSOCKET_ERROR";
    }
    else if (e instanceof hrana.HttpServerError) {
        return "SERVER_ERROR";
    }
    else if (e instanceof hrana.ProtocolVersionError) {
        return "PROTOCOL_VERSION_ERROR";
    }
    else if (e instanceof hrana.InternalError) {
        return "INTERNAL_ERROR";
    }
    else {
        return "UNKNOWN";
    }
}

class SqlCache {
    #owner;
    #sqls;
    capacity;
    constructor(owner, capacity) {
        this.#owner = owner;
        this.#sqls = new Lru();
        this.capacity = capacity;
    }
    // Replaces SQL strings with cached `hrana.Sql` objects in the statements in `hranaStmts`. After this
    // function returns, we guarantee that all `hranaStmts` refer to valid (not closed) `hrana.Sql` objects,
    // but _we may invalidate any other `hrana.Sql` objects_ (by closing them, thus removing them from the
    // server).
    //
    // In practice, this means that after calling this function, you can use the statements only up to the
    // first `await`, because concurrent code may also use the cache and invalidate those statements.
    apply(hranaStmts) {
        if (this.capacity <= 0) {
            return;
        }
        const usedSqlObjs = new Set();
        for (const hranaStmt of hranaStmts) {
            if (typeof hranaStmt.sql !== "string") {
                continue;
            }
            const sqlText = hranaStmt.sql;
            // Stored SQL cannot exceed 5kb.
            // https://github.com/tursodatabase/libsql/blob/e9d637e051685f92b0da43849507b5ef4232fbeb/libsql-server/src/hrana/http/request.rs#L10
            if (sqlText.length >= 5000) {
                continue;
            }
            let sqlObj = this.#sqls.get(sqlText);
            if (sqlObj === undefined) {
                while (this.#sqls.size + 1 > this.capacity) {
                    const [evictSqlText, evictSqlObj] = this.#sqls.peekLru();
                    if (usedSqlObjs.has(evictSqlObj)) {
                        // The SQL object that we are trying to evict is already in use in this batch, so we
                        // must not evict and close it.
                        break;
                    }
                    evictSqlObj.close();
                    this.#sqls.delete(evictSqlText);
                }
                if (this.#sqls.size + 1 <= this.capacity) {
                    sqlObj = this.#owner.storeSql(sqlText);
                    this.#sqls.set(sqlText, sqlObj);
                }
            }
            if (sqlObj !== undefined) {
                hranaStmt.sql = sqlObj;
                usedSqlObjs.add(sqlObj);
            }
        }
    }
}
class Lru {
    // This maps keys to the cache values. The entries are ordered by their last use (entires that were used
    // most recently are at the end).
    #cache;
    constructor() {
        this.#cache = new Map();
    }
    get(key) {
        const value = this.#cache.get(key);
        if (value !== undefined) {
            // move the entry to the back of the Map
            this.#cache.delete(key);
            this.#cache.set(key, value);
        }
        return value;
    }
    set(key, value) {
        this.#cache.set(key, value);
    }
    peekLru() {
        for (const entry of this.#cache.entries()) {
            return entry;
        }
        return undefined;
    }
    delete(key) {
        this.#cache.delete(key);
    }
    get size() {
        return this.#cache.size;
    }
}

const SCHEMA_MIGRATION_SLEEP_TIME_IN_MS = 1000;
const SCHEMA_MIGRATION_MAX_RETRIES = 30;
async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
async function isMigrationJobFinished({ authToken, baseUrl, jobId, }) {
    const url = normalizeURLScheme(baseUrl + `/v1/jobs/${jobId}`);
    const result = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    const json = (await result.json());
    const job = json;
    if (result.status !== 200) {
        throw new Error(`Unexpected status code while fetching job status for migration with id ${jobId}: ${result.status}`);
    }
    if (job.status == "RunFailure") {
        throw new Error("Migration job failed");
    }
    return job.status == "RunSuccess";
}
function normalizeURLScheme(url) {
    if (url.startsWith("ws://")) {
        return url.replace("ws://", "http://");
    }
    if (url.startsWith("wss://")) {
        return url.replace("wss://", "https://");
    }
    return url;
}
async function getIsSchemaDatabase({ authToken, baseUrl, }) {
    try {
        if (baseUrl.startsWith("http://127.0.0.1")) {
            return false;
        }
        const url = normalizeURLScheme(baseUrl + "/v1/jobs");
        const result = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        if (result.status === 404 || result.status === 500) {
            return false;
        }
        const json = (await result.json());
        const isChildDatabase = result.status === 400 && json.error === "Invalid namespace";
        return !isChildDatabase;
    }
    catch (e) {
        console.error([
            `There has been an error while retrieving the database type.`,
            `Debug information:`,
            `- URL: ${baseUrl}`,
            `- Response Status Code: ${"N/A"}`,
        ].join("\n"));
        throw e;
    }
}
async function getLastMigrationJob({ authToken, baseUrl, }) {
    const url = normalizeURLScheme(baseUrl + "/v1/jobs");
    const result = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    if (result.status !== 200) {
        throw new Error("Unexpected status code while fetching migration jobs: " +
            result.status);
    }
    const json = (await result.json());
    if (!json.migrations || json.migrations.length === 0) {
        throw new Error("No migrations found");
    }
    const migrations = json.migrations || [];
    let lastJob;
    for (const migration of migrations) {
        if (migration.job_id > (lastJob?.job_id || 0)) {
            lastJob = migration;
        }
    }
    if (!lastJob) {
        throw new Error("No migration job found");
    }
    if (lastJob?.status === "RunFailure") {
        throw new Error("Last migration job failed");
    }
    return lastJob;
}
async function waitForLastMigrationJobToFinish({ authToken, baseUrl, }) {
    const lastMigrationJob = await getLastMigrationJob({
        authToken: authToken,
        baseUrl,
    });
    if (lastMigrationJob.status !== "RunSuccess") {
        let i = 0;
        while (i < SCHEMA_MIGRATION_MAX_RETRIES) {
            i++;
            const isLastMigrationJobFinished = await isMigrationJobFinished({
                authToken: authToken,
                baseUrl,
                jobId: lastMigrationJob.job_id,
            });
            if (isLastMigrationJobFinished) {
                break;
            }
            await sleep(SCHEMA_MIGRATION_SLEEP_TIME_IN_MS);
        }
    }
}

/** @private */
function _createClient$2(config) {
    if (config.scheme !== "wss" && config.scheme !== "ws") {
        throw new LibsqlError('The WebSocket client supports only "libsql:", "wss:" and "ws:" URLs, ' +
            `got ${JSON.stringify(config.scheme + ":")}. For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
    }
    if (config.encryptionKey !== undefined) {
        throw new LibsqlError("Encryption key is not supported by the remote client.", "ENCRYPTION_KEY_NOT_SUPPORTED");
    }
    if (config.scheme === "ws" && config.tls) {
        throw new LibsqlError(`A "ws:" URL cannot opt into TLS by using ?tls=1`, "URL_INVALID");
    }
    else if (config.scheme === "wss" && !config.tls) {
        throw new LibsqlError(`A "wss:" URL cannot opt out of TLS by using ?tls=0`, "URL_INVALID");
    }
    const url = encodeBaseUrl(config.scheme, config.authority, config.path);
    let client;
    try {
        client = hrana.openWs(url, config.authToken);
    }
    catch (e) {
        if (e instanceof hrana.WebSocketUnsupportedError) {
            const suggestedScheme = config.scheme === "wss" ? "https" : "http";
            const suggestedUrl = encodeBaseUrl(suggestedScheme, config.authority, config.path);
            throw new LibsqlError("This environment does not support WebSockets, please switch to the HTTP client by using " +
                `a "${suggestedScheme}:" URL (${JSON.stringify(suggestedUrl)}). ` +
                `For more information, please read ${supportedUrlLink}`, "WEBSOCKETS_NOT_SUPPORTED");
        }
        throw mapHranaError(e);
    }
    return new WsClient(client, url, config.authToken, config.intMode, config.concurrency);
}
const maxConnAgeMillis = 60 * 1000;
const sqlCacheCapacity$1 = 100;
class WsClient {
    #url;
    #authToken;
    #intMode;
    // State of the current connection. The `hrana.WsClient` inside may be closed at any moment due to an
    // asynchronous error.
    #connState;
    // If defined, this is a connection that will be used in the future, once it is ready.
    #futureConnState;
    closed;
    protocol;
    #isSchemaDatabase;
    #promiseLimitFunction;
    /** @private */
    constructor(client, url, authToken, intMode, concurrency) {
        this.#url = url;
        this.#authToken = authToken;
        this.#intMode = intMode;
        this.#connState = this.#openConn(client);
        this.#futureConnState = undefined;
        this.closed = false;
        this.protocol = "ws";
        this.#promiseLimitFunction = promiseLimit(concurrency);
    }
    getIsSchemaDatabase() {
        if (this.#isSchemaDatabase === undefined) {
            this.#isSchemaDatabase = getIsSchemaDatabase({
                authToken: this.#authToken,
                baseUrl: this.#url.origin,
            });
        }
        return this.#isSchemaDatabase;
    }
    async limit(fn) {
        return this.#promiseLimitFunction(fn);
    }
    async execute(stmt) {
        return this.limit(async () => {
            const streamState = await this.#openStream();
            try {
                const isSchemaDatabasePromise = this.getIsSchemaDatabase();
                const hranaStmt = stmtToHrana(stmt);
                // Schedule all operations synchronously, so they will be pipelined and executed in a single
                // network roundtrip.
                streamState.conn.sqlCache.apply([hranaStmt]);
                const hranaRowsPromise = streamState.stream.query(hranaStmt);
                streamState.stream.closeGracefully();
                const hranaRowsResult = await hranaRowsPromise;
                const isSchemaDatabase = await isSchemaDatabasePromise;
                if (isSchemaDatabase) {
                    await waitForLastMigrationJobToFinish({
                        authToken: this.#authToken,
                        baseUrl: this.#url.origin,
                    });
                }
                return resultSetFromHrana(hranaRowsResult);
            }
            catch (e) {
                throw mapHranaError(e);
            }
            finally {
                this._closeStream(streamState);
            }
        });
    }
    async batch(stmts, mode = "deferred") {
        return this.limit(async () => {
            const streamState = await this.#openStream();
            try {
                const isSchemaDatabasePromise = this.getIsSchemaDatabase();
                const hranaStmts = stmts.map(stmtToHrana);
                const version = await streamState.conn.client.getVersion();
                // Schedule all operations synchronously, so they will be pipelined and executed in a single
                // network roundtrip.
                streamState.conn.sqlCache.apply(hranaStmts);
                const batch = streamState.stream.batch(version >= 3);
                const resultsPromise = executeHranaBatch(mode, version, batch, hranaStmts);
                const results = await resultsPromise;
                const isSchemaDatabase = await isSchemaDatabasePromise;
                if (isSchemaDatabase) {
                    await waitForLastMigrationJobToFinish({
                        authToken: this.#authToken,
                        baseUrl: this.#url.origin,
                    });
                }
                return results;
            }
            catch (e) {
                throw mapHranaError(e);
            }
            finally {
                this._closeStream(streamState);
            }
        });
    }
    async transaction(mode = "write") {
        return this.limit(async () => {
            const streamState = await this.#openStream();
            try {
                const version = await streamState.conn.client.getVersion();
                // the BEGIN statement will be batched with the first statement on the transaction to save a
                // network roundtrip
                return new WsTransaction(this, streamState, mode, version);
            }
            catch (e) {
                this._closeStream(streamState);
                throw mapHranaError(e);
            }
        });
    }
    async executeMultiple(sql) {
        return this.limit(async () => {
            const streamState = await this.#openStream();
            try {
                // Schedule all operations synchronously, so they will be pipelined and executed in a single
                // network roundtrip.
                const promise = streamState.stream.sequence(sql);
                streamState.stream.closeGracefully();
                await promise;
            }
            catch (e) {
                throw mapHranaError(e);
            }
            finally {
                this._closeStream(streamState);
            }
        });
    }
    sync() {
        return Promise.resolve();
    }
    async #openStream() {
        if (this.closed) {
            throw new LibsqlError("The client is closed", "CLIENT_CLOSED");
        }
        const now = new Date();
        const ageMillis = now.valueOf() - this.#connState.openTime.valueOf();
        if (ageMillis > maxConnAgeMillis &&
            this.#futureConnState === undefined) {
            // The existing connection is too old, let's open a new one.
            const futureConnState = this.#openConn();
            this.#futureConnState = futureConnState;
            // However, if we used `futureConnState` immediately, we would introduce additional latency,
            // because we would have to wait for the WebSocket handshake to complete, even though we may a
            // have perfectly good existing connection in `this.#connState`!
            //
            // So we wait until the `hrana.Client.getVersion()` operation completes (which happens when the
            // WebSocket hanshake completes), and only then we replace `this.#connState` with
            // `futureConnState`, which is stored in `this.#futureConnState` in the meantime.
            futureConnState.client.getVersion().then((_version) => {
                if (this.#connState !== futureConnState) {
                    // We need to close `this.#connState` before we replace it. However, it is possible
                    // that `this.#connState` has already been replaced: see the code below.
                    if (this.#connState.streamStates.size === 0) {
                        this.#connState.client.close();
                    }
                }
                this.#connState = futureConnState;
                this.#futureConnState = undefined;
            }, (_e) => {
                // If the new connection could not be established, let's just ignore the error and keep
                // using the existing connection.
                this.#futureConnState = undefined;
            });
        }
        if (this.#connState.client.closed) {
            // An error happened on this connection and it has been closed. Let's try to seamlessly reconnect.
            try {
                if (this.#futureConnState !== undefined) {
                    // We are already in the process of opening a new connection, so let's just use it
                    // immediately.
                    this.#connState = this.#futureConnState;
                }
                else {
                    this.#connState = this.#openConn();
                }
            }
            catch (e) {
                throw mapHranaError(e);
            }
        }
        const connState = this.#connState;
        try {
            // Now we wait for the WebSocket handshake to complete (if it hasn't completed yet). Note that
            // this does not increase latency, because any messages that we would send on the WebSocket before
            // the handshake would be queued until the handshake is completed anyway.
            if (connState.useSqlCache === undefined) {
                connState.useSqlCache =
                    (await connState.client.getVersion()) >= 2;
                if (connState.useSqlCache) {
                    connState.sqlCache.capacity = sqlCacheCapacity$1;
                }
            }
            const stream = connState.client.openStream();
            stream.intMode = this.#intMode;
            const streamState = { conn: connState, stream };
            connState.streamStates.add(streamState);
            return streamState;
        }
        catch (e) {
            throw mapHranaError(e);
        }
    }
    #openConn(client) {
        try {
            client ??= hrana.openWs(this.#url, this.#authToken);
            return {
                client,
                useSqlCache: undefined,
                sqlCache: new SqlCache(client, 0),
                openTime: new Date(),
                streamStates: new Set(),
            };
        }
        catch (e) {
            throw mapHranaError(e);
        }
    }
    _closeStream(streamState) {
        streamState.stream.close();
        const connState = streamState.conn;
        connState.streamStates.delete(streamState);
        if (connState.streamStates.size === 0 &&
            connState !== this.#connState) {
            // We are not using this connection anymore and this is the last stream that was using it, so we
            // must close it now.
            connState.client.close();
        }
    }
    close() {
        this.#connState.client.close();
        this.closed = true;
    }
}
class WsTransaction extends HranaTransaction {
    #client;
    #streamState;
    /** @private */
    constructor(client, state, mode, version) {
        super(mode, version);
        this.#client = client;
        this.#streamState = state;
    }
    /** @private */
    _getStream() {
        return this.#streamState.stream;
    }
    /** @private */
    _getSqlCache() {
        return this.#streamState.conn.sqlCache;
    }
    close() {
        this.#client._closeStream(this.#streamState);
    }
    get closed() {
        return this.#streamState.stream.closed;
    }
}

/** @private */
function _createClient$1(config) {
    if (config.scheme !== "https" && config.scheme !== "http") {
        throw new LibsqlError('The HTTP client supports only "libsql:", "https:" and "http:" URLs, ' +
            `got ${JSON.stringify(config.scheme + ":")}. For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
    }
    if (config.encryptionKey !== undefined) {
        throw new LibsqlError("Encryption key is not supported by the remote client.", "ENCRYPTION_KEY_NOT_SUPPORTED");
    }
    if (config.scheme === "http" && config.tls) {
        throw new LibsqlError(`A "http:" URL cannot opt into TLS by using ?tls=1`, "URL_INVALID");
    }
    else if (config.scheme === "https" && !config.tls) {
        throw new LibsqlError(`A "https:" URL cannot opt out of TLS by using ?tls=0`, "URL_INVALID");
    }
    const url = encodeBaseUrl(config.scheme, config.authority, config.path);
    return new HttpClient(url, config.authToken, config.intMode, config.fetch, config.concurrency);
}
const sqlCacheCapacity = 30;
class HttpClient {
    #client;
    protocol;
    #url;
    #authToken;
    #isSchemaDatabase;
    #promiseLimitFunction;
    /** @private */
    constructor(url, authToken, intMode, customFetch, concurrency) {
        this.#client = hrana.openHttp(url, authToken, customFetch);
        this.#client.intMode = intMode;
        this.protocol = "http";
        this.#url = url;
        this.#authToken = authToken;
        this.#promiseLimitFunction = promiseLimit(concurrency);
    }
    getIsSchemaDatabase() {
        if (this.#isSchemaDatabase === undefined) {
            this.#isSchemaDatabase = getIsSchemaDatabase({
                authToken: this.#authToken,
                baseUrl: this.#url.origin,
            });
        }
        return this.#isSchemaDatabase;
    }
    async limit(fn) {
        return this.#promiseLimitFunction(fn);
    }
    async execute(stmt) {
        return this.limit(async () => {
            try {
                const isSchemaDatabasePromise = this.getIsSchemaDatabase();
                const hranaStmt = stmtToHrana(stmt);
                // Pipeline all operations, so `hrana.HttpClient` can open the stream, execute the statement and
                // close the stream in a single HTTP request.
                let rowsPromise;
                const stream = this.#client.openStream();
                try {
                    rowsPromise = stream.query(hranaStmt);
                }
                finally {
                    stream.closeGracefully();
                }
                const rowsResult = await rowsPromise;
                const isSchemaDatabase = await isSchemaDatabasePromise;
                if (isSchemaDatabase) {
                    await waitForLastMigrationJobToFinish({
                        authToken: this.#authToken,
                        baseUrl: this.#url.origin,
                    });
                }
                return resultSetFromHrana(rowsResult);
            }
            catch (e) {
                throw mapHranaError(e);
            }
        });
    }
    async batch(stmts, mode = "deferred") {
        return this.limit(async () => {
            try {
                const isSchemaDatabasePromise = this.getIsSchemaDatabase();
                const hranaStmts = stmts.map(stmtToHrana);
                const version = await this.#client.getVersion();
                // Pipeline all operations, so `hrana.HttpClient` can open the stream, execute the batch and
                // close the stream in a single HTTP request.
                let resultsPromise;
                const stream = this.#client.openStream();
                try {
                    // It makes sense to use a SQL cache even for a single batch, because it may contain the same
                    // statement repeated multiple times.
                    const sqlCache = new SqlCache(stream, sqlCacheCapacity);
                    sqlCache.apply(hranaStmts);
                    // TODO: we do not use a cursor here, because it would cause three roundtrips:
                    // 1. pipeline request to store SQL texts
                    // 2. cursor request
                    // 3. pipeline request to close the stream
                    const batch = stream.batch(false);
                    resultsPromise = executeHranaBatch(mode, version, batch, hranaStmts);
                }
                finally {
                    stream.closeGracefully();
                }
                const results = await resultsPromise;
                const isSchemaDatabase = await isSchemaDatabasePromise;
                if (isSchemaDatabase) {
                    await waitForLastMigrationJobToFinish({
                        authToken: this.#authToken,
                        baseUrl: this.#url.origin,
                    });
                }
                return results;
            }
            catch (e) {
                throw mapHranaError(e);
            }
        });
    }
    async transaction(mode = "write") {
        return this.limit(async () => {
            try {
                const version = await this.#client.getVersion();
                return new HttpTransaction(this.#client.openStream(), mode, version);
            }
            catch (e) {
                throw mapHranaError(e);
            }
        });
    }
    async executeMultiple(sql) {
        return this.limit(async () => {
            try {
                // Pipeline all operations, so `hrana.HttpClient` can open the stream, execute the sequence and
                // close the stream in a single HTTP request.
                let promise;
                const stream = this.#client.openStream();
                try {
                    promise = stream.sequence(sql);
                }
                finally {
                    stream.closeGracefully();
                }
                await promise;
            }
            catch (e) {
                throw mapHranaError(e);
            }
        });
    }
    sync() {
        throw new LibsqlError("sync not supported in http mode", "SYNC_NOT_SUPPORTED");
    }
    close() {
        this.#client.close();
    }
    get closed() {
        return this.#client.closed;
    }
}
class HttpTransaction extends HranaTransaction {
    #stream;
    #sqlCache;
    /** @private */
    constructor(stream, mode, version) {
        super(mode, version);
        this.#stream = stream;
        this.#sqlCache = new SqlCache(stream, sqlCacheCapacity);
    }
    /** @private */
    _getStream() {
        return this.#stream;
    }
    /** @private */
    _getSqlCache() {
        return this.#sqlCache;
    }
    close() {
        this.#stream.close();
    }
    get closed() {
        return this.#stream.closed;
    }
}

/** Creates a {@link Client} object.
 *
 * You must pass at least an `url` in the {@link Config} object.
 */
function createClient(config) {
    return _createClient(expandConfig(config, true));
}
function _createClient(config) {
    if (config.scheme === "wss" || config.scheme === "ws") {
        return _createClient$2(config);
    }
    else if (config.scheme === "https" || config.scheme === "http") {
        return _createClient$1(config);
    }
    else {
        return _createClient$3(config);
    }
}

const tursoConnectionUrl = "libsql://metrics-nps-gastongithubb.turso.io";
const tursoAuthToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjA4NzU5MjEsImlkIjoiYjI2MjM2YmUtYWExYS00YzY4LTk2MDktZDg3NDNhZGUxODViIn0.RqoeebWTvfRKy01W0RLIuxU4yXKNO7fYxR9zv1J55ndjCJvEgypHm5vEDhuMh-rY7xAJ0M7fvVmvSrA3zVWYCg";
const googleClientId = "937366145803-0mt1d38qujv81s04qqst1etm917i5gms.apps.googleusercontent.com";
const googleClientSecret = "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";
const config = {
  tursoConnectionUrl,
  tursoAuthToken,
  googleClientId,
  googleClientSecret
};

const client = createClient({
  url: config.tursoConnectionUrl,
  authToken: config.tursoAuthToken
});
const db = drizzle(client);
const news = sqliteTable("news", {
  id: integer("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title").notNull(),
  publishDate: text("publish_date").notNull(),
  estado: text("estado").notNull().default("vigente"),
  nueva_columna: text("nueva_columna")
  // No se especifica .notNull() para permitir nulos
});
async function initializeDatabase() {
  try {
    console.log("Iniciando la inicialización de la base de datos...");
    await client.execute(`
      CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        publish_date TEXT NOT NULL,
        estado TEXT NOT NULL DEFAULT 'vigente',
        nueva_columna TEXT
      )
    `);
    console.log("Tabla de noticias creada o ya existente");
    const count = await db.select({ count: sql`count(*)` }).from(news).get();
    if (count && count.count === 0) {
      await db.insert(news).values([
        { url: "https://example.com/news1", title: "Noticia de prueba 1", publishDate: "2023-07-10", estado: "vigente", nueva_columna: null },
        { url: "https://example.com/news2", title: "Noticia de prueba 2", publishDate: "2023-07-11", estado: "vigente", nueva_columna: null }
      ]).run();
      console.log("Datos de prueba insertados");
    } else {
      console.log("La tabla de noticias ya contiene datos");
    }
    console.log("Inicialización de la base de datos completada con éxito");
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
    throw error;
  }
}
async function getNews() {
  try {
    return await db.select().from(news).all();
  } catch (error) {
    console.error("Error al obtener noticias:", error);
    throw error;
  }
}
async function addNews(newsItem) {
  try {
    await db.insert(news).values({ ...newsItem, nueva_columna: null }).run();
  } catch (error) {
    console.error("Error al añadir noticia:", error);
    throw error;
  }
}
async function deleteNews(id) {
  try {
    await db.delete(news).where(sql`id = ${id}`).run();
  } catch (error) {
    console.error("Error al eliminar noticia:", error);
    throw error;
  }
}
async function updateNews(id, newsItem) {
  try {
    await db.update(news).set(newsItem).where(sql`id = ${id}`).run();
  } catch (error) {
    console.error("Error al actualizar noticia:", error);
    throw error;
  }
}
async function toggleEstadoNoticia(id, nuevoEstado) {
  try {
    await db.update(news).set({ estado: nuevoEstado }).where(sql`id = ${id}`).run();
  } catch (error) {
    console.error(`Error al cambiar el estado de la noticia ${id} a ${nuevoEstado}:`, error);
    throw error;
  }
}

let initialized = false;
async function ensureDatabaseInitialized() {
  if (!initialized) {
    try {
      await initializeDatabase();
      initialized = true;
      console.log("Base de datos inicializada correctamente");
    } catch (error) {
      console.error("Error al inicializar la base de datos:", error);
      throw error;
    }
  }
}

const $$Astro = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  await ensureDatabaseInitialized();
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.png"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><meta name="description" content="A beautiful and functional landing page design created specifically for digital marketing agencies. With its clean and modern design, Positivus is the perfect template to showcase your agency's services and case studies to potential clients. Built with astro and tailwindcss"><link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet">${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head> <body class="overflow-x-hidden bg-white  font-SpaceGrotesk"> ${renderComponent($$result, "Navbar", $$Navbar, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})}  </body> </html>`;
}, "/Users/macbookpro/Desktop/sancor-eve-garay/src/layouts/Layout.astro", void 0);

export { $$Container as $, $$Layout as a, addNews as b, createClient as c, deleteNews as d, config as e, getNews as g, toggleEstadoNoticia as t, updateNews as u };
