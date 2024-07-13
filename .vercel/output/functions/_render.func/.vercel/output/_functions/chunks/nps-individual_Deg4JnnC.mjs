/* empty css                                   */
import { k as createComponent, l as renderTemplate, m as renderComponent } from './astro/server_8Q9s6_jR.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Container, a as $$Layout } from './Layout_z8IXI5F6.mjs';

const $$NpsIndividual = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "NPS Individual - Sancor Team Eve Garay" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Npsindividual", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/macbookpro/Desktop/sancor-eve-garay/src/components/NpsIndividual", "client:component-export": "default" })} ` })} ` })}`;
}, "/Users/macbookpro/Desktop/sancor-eve-garay/src/pages/nps-individual.astro", void 0);

const $$file = "/Users/macbookpro/Desktop/sancor-eve-garay/src/pages/nps-individual.astro";
const $$url = "/nps-individual";

export { $$NpsIndividual as default, $$file as file, $$url as url };
