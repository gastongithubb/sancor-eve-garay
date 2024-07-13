/* empty css                                   */
import { k as createComponent, l as renderTemplate, m as renderComponent, n as maybeRenderHead, p as addAttribute } from './astro/server_BSn7jCTA.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Container, a as $$Layout } from './Layout_CxpPaQK0.mjs';
import { $ as $$Topic, t as teamData } from './team_DEtci_4g.mjs';

const $$Team = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Equipo" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="relative flex flex-col items-center pt-6 md:flex-row"> ${renderComponent($$result3, "Topic", $$Topic, { "title": "Equipo", "description": "Conoce el quipo de Evelin Garay" })} </div> <div class="flex-row items-center py-5" id="team"> <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3"> ${teamData.team.map(({ title, description, name, link, profile, cumplea\u00F1os }) => renderTemplate`<div class="h-[331px] px-[35px] py-10 bg-white rounded-[45px] shadow-card border border-zinc-900 flex-col justify-start items-start gap-2.5 inline-flex text-black"> <div class="flex flex-col items-start justify-start gap-7"> <div class="inline-flex items-start self-stretch justify-start"> <div class="flex items-center justify-start gap-8 grow shrink basis-0"> <div class="h-[102.82px] w-[102.82px] rounded-[50%] overflow-hidden relative"> <img class="object-cover w-full h-full rounded-[50%]"${addAttribute(profile, "src")}${addAttribute(name, "alt")}> </div> <div class="inline-flex flex-col items-start justify-end"> <div class="text-lg font-normal">${title}</div> <div class="text-xl font-medium">${name}</div> <div class="text-sm text-gray-600">cumpleaños: ${cumplea\u00F1os}</div> </div> </div> <a class="top-0 right-0 w-10 h-10"${addAttribute(link, "href")}> <img src="/favicon.png" alt="vector"> </a> </div> <hr class="w-full border border-black"> <p class="text-sm md:text-lg">${description}</p> </div> </div>`)} </div> </div> ` })} ` })}`;
}, "/Users/macbookpro/Desktop/sancor-eve-garay/src/pages/team.astro", void 0);

const $$file = "/Users/macbookpro/Desktop/sancor-eve-garay/src/pages/team.astro";
const $$url = "/team";

export { $$Team as default, $$file as file, $$url as url };
