/* empty css                                   */
import { k as createComponent, l as renderTemplate, m as renderComponent } from './astro/server_D8vA9utB.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Container, a as $$Layout } from './Layout_Din6772Q.mjs';

const $$Nps = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "NPS Trimestral - Sancor Team Eve garay" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "DarkMetricsDashboard", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/macbookpro/Desktop/equipo-2/src/components/DarkMetricsDashboard", "client:component-export": "default" })} ` })} ` })}`;
}, "/Users/macbookpro/Desktop/equipo-2/src/pages/nps.astro", void 0);

const $$file = "/Users/macbookpro/Desktop/equipo-2/src/pages/nps.astro";
const $$url = "/nps";

export { $$Nps as default, $$file as file, $$url as url };
