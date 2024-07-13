import { k as createComponent, l as renderTemplate, u as renderHead, m as renderComponent } from './astro/server_8Q9s6_jR.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Image } from './_astro_assets_BjPKa-VX.mjs';

const imagenDoctor = new Proxy({"src":"/_astro/doctor.DacvNxJW.jpg","width":1920,"height":1920,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/macbookpro/Desktop/sancor-eve-garay/public/doctor.jpg";
							}
							
							return target[name];
						}
					});

const $$NotFound = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es" data-astro-cid-sl53dvlk> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>404 - Página No Encontrada</title>${renderHead()}</head> <body data-astro-cid-sl53dvlk> <div class="flex flex-col items-center justify-center min-h-screen p-4 bg-blue-50" data-astro-cid-sl53dvlk> <div class="max-w-2xl text-center" data-astro-cid-sl53dvlk> <h1 class="mb-4 text-4xl font-bold text-zinc-800" data-astro-cid-sl53dvlk>404 - Página No Encontrada</h1> <p class="mb-8 text-xl text-blue-600" data-astro-cid-sl53dvlk>¡Ups! Parece que hemos perdido esta página durante la ronda médica.</p> <div class="mb-8" data-astro-cid-sl53dvlk> ${renderComponent($$result, "Image", $$Image, { "src": imagenDoctor, "alt": "Doctor con suministros m\xE9dicos", "width": 300, "height": 300, "class": "mx-auto", "data-astro-cid-sl53dvlk": true })} </div> <p class="mb-6 text-lg text-zinc-800" data-astro-cid-sl53dvlk>
No te preocupes, ¡nuestro equipo médico está en el caso! 
                Vamos a llevarte de vuelta a una página saludable.
</p> <a href="/" class="inline-block px-6 py-3 text-zinc-800 transition-colors bg-[#d9d8ff] rounded-full hover:bg-blue-700" data-astro-cid-sl53dvlk>
Volver a la Página de Inicio
</a> </div> <div class="mt-12 text-blue-500" data-astro-cid-sl53dvlk> <p data-astro-cid-sl53dvlk>Si los síntomas persisten, por favor contacta a nuestro webmaster.</p> </div> </div> </body></html>`;
}, "/Users/macbookpro/Desktop/sancor-eve-garay/src/components/NotFound.astro", void 0);

export { $$NotFound as $ };
