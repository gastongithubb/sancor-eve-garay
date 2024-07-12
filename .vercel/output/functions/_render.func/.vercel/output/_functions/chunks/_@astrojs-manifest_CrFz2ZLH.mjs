import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './astro/server_BSn7jCTA.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"api/login","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/login","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/login\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/login.ts","pathname":"/api/login","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"api/register","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/register","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/register\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/register.ts","pathname":"/api/register","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"balance-mensual/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/balance-mensual","isIndex":false,"type":"page","pattern":"^\\/balance-mensual\\/?$","segments":[[{"content":"balance-mensual","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/balance-mensual.astro","pathname":"/balance-mensual","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"notfound/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/notfound","isIndex":false,"type":"page","pattern":"^\\/notfound\\/?$","segments":[[{"content":"notfound","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/notfound.astro","pathname":"/notfound","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"novedades/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/novedades","isIndex":false,"type":"page","pattern":"^\\/novedades\\/?$","segments":[[{"content":"novedades","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/novedades.astro","pathname":"/novedades","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"nps-individual/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/nps-individual","isIndex":false,"type":"page","pattern":"^\\/nps-individual\\/?$","segments":[[{"content":"nps-individual","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/nps-individual.astro","pathname":"/nps-individual","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"nps-trimestral/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/nps-trimestral","isIndex":false,"type":"page","pattern":"^\\/nps-trimestral\\/?$","segments":[[{"content":"nps-trimestral","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/nps-trimestral.astro","pathname":"/nps-trimestral","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"programacion/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/programacion","isIndex":false,"type":"page","pattern":"^\\/programacion\\/?$","segments":[[{"content":"programacion","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/programacion.astro","pathname":"/programacion","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"promotores/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/promotores","isIndex":false,"type":"page","pattern":"^\\/promotores\\/?$","segments":[[{"content":"promotores","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/promotores.astro","pathname":"/promotores","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"register/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"team/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/team","isIndex":false,"type":"page","pattern":"^\\/team\\/?$","segments":[[{"content":"team","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/team.astro","pathname":"/team","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/macbookpro/Desktop/equipo-3/src/pages/notfound.astro",{"propagation":"none","containsHead":true}],["/Users/macbookpro/Desktop/equipo-3/src/pages/promotores.astro",{"propagation":"none","containsHead":true}],["/Users/macbookpro/Desktop/equipo-3/src/pages/balance-mensual.astro",{"propagation":"none","containsHead":true}],["/Users/macbookpro/Desktop/equipo-3/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/macbookpro/Desktop/equipo-3/src/pages/login.astro",{"propagation":"none","containsHead":true}],["/Users/macbookpro/Desktop/equipo-3/src/pages/novedades.astro",{"propagation":"none","containsHead":true}],["/Users/macbookpro/Desktop/equipo-3/src/pages/nps-individual.astro",{"propagation":"none","containsHead":true}],["/Users/macbookpro/Desktop/equipo-3/src/pages/nps-trimestral.astro",{"propagation":"none","containsHead":true}],["/Users/macbookpro/Desktop/equipo-3/src/pages/programacion.astro",{"propagation":"none","containsHead":true}],["/Users/macbookpro/Desktop/equipo-3/src/pages/register.astro",{"propagation":"none","containsHead":true}],["/Users/macbookpro/Desktop/equipo-3/src/pages/team.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/login@_@ts":"pages/api/login.astro.mjs","\u0000@astro-page:src/pages/api/register@_@ts":"pages/api/register.astro.mjs","\u0000@astro-page:src/pages/balance-mensual@_@astro":"pages/balance-mensual.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/notfound@_@astro":"pages/notfound.astro.mjs","\u0000@astro-page:src/pages/novedades@_@astro":"pages/novedades.astro.mjs","\u0000@astro-page:src/pages/nps-individual@_@astro":"pages/nps-individual.astro.mjs","\u0000@astro-page:src/pages/nps-trimestral@_@astro":"pages/nps-trimestral.astro.mjs","\u0000@astro-page:src/pages/programacion@_@astro":"pages/programacion.astro.mjs","\u0000@astro-page:src/pages/promotores@_@astro":"pages/promotores.astro.mjs","\u0000@astro-page:src/pages/register@_@astro":"pages/register.astro.mjs","\u0000@astro-page:src/pages/team@_@astro":"pages/team.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","/Users/macbookpro/Desktop/equipo-3/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","/Users/macbookpro/Desktop/equipo-3/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/generic_BnqAVzQn.mjs","/src/pages/api/login.ts":"chunks/login_DksMlejq.mjs","/src/pages/api/register.ts":"chunks/register_BO3F2Xy4.mjs","/src/pages/balance-mensual.astro":"chunks/balance-mensual_ClyFg05D.mjs","/src/pages/login.astro":"chunks/login_CeARPjtA.mjs","/src/pages/notfound.astro":"chunks/notfound_CMb4T1Ub.mjs","/src/pages/novedades.astro":"chunks/novedades_DEGSXfIQ.mjs","/src/pages/nps-individual.astro":"chunks/nps-individual_Cbt68TTQ.mjs","/src/pages/nps-trimestral.astro":"chunks/nps-trimestral_lr1-JjUF.mjs","/src/pages/programacion.astro":"chunks/programacion_faplqONp.mjs","/src/pages/promotores.astro":"chunks/promotores_BkQTxz3i.mjs","/src/pages/register.astro":"chunks/register_BagZVrp-.mjs","/src/pages/team.astro":"chunks/team_Co6cOofU.mjs","/src/pages/index.astro":"chunks/index_CpJ2Ojl-.mjs","\u0000@astrojs-manifest":"manifest_CK_IcrX-.mjs","/Users/macbookpro/Desktop/equipo-3/src/components/LoginForm":"_astro/LoginForm.Bo1LAX6w.js","/Users/macbookpro/Desktop/equipo-3/src/components/NewsManager":"_astro/NewsManager.BlFXflfQ.js","/Users/macbookpro/Desktop/equipo-3/src/components/RegisterForm":"_astro/RegisterForm.D2p2trdj.js","/Users/macbookpro/Desktop/equipo-3/src/components/EmployeeList":"_astro/EmployeeList.Cm4IgbSr.js","/Users/macbookpro/Desktop/equipo-3/src/components/NpsIndividual":"_astro/NpsIndividual.DQVjgIdF.js","/Users/macbookpro/Desktop/equipo-3/src/components/DarkMetricsDashboard":"_astro/DarkMetricsDashboard.39NnPqlS.js","/astro/hoisted.js?q=0":"_astro/hoisted.CbtC_Uv8.js","@astrojs/react/client.js":"_astro/client.DRsCJ7vl.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/doctor.DacvNxJW.jpg","/_astro/balance-mensual.DVa83Iok.css","/_astro/balance-mensual.nqz6u86E.css","/Hero.png","/Hero.svg","/Logo.webp","/doctor.jpg","/favicon.png","/favicon.svg","/konecta.png","/vector.svg","/_astro/DarkMetricsDashboard.39NnPqlS.js","/_astro/EmployeeList.Cm4IgbSr.js","/_astro/LoginForm.Bo1LAX6w.js","/_astro/NewsManager.BlFXflfQ.js","/_astro/NpsIndividual.DQVjgIdF.js","/_astro/RegisterForm.D2p2trdj.js","/_astro/client.DRsCJ7vl.js","/_astro/config.C_G0umPK.js","/_astro/createLucideIcon.DgMzALqq.js","/_astro/db-users.CDJWcmR6.js","/_astro/eye.-kFPtF3Q.js","/_astro/generateCategoricalChart.BsJQYdF2.js","/_astro/hoisted.CbtC_Uv8.js","/_astro/index.DJO9vBfz.js","/_astro/jsx-runtime.CYYqVSlZ.js","/_astro/loader-circle.uG8OBDkd.js","/team/abi.jpg","/team/agustin.jpg","/team/auca.jpg","/team/eve.jpg","/team/franco.jpg","/team/gaston.jpeg","/team/ismael.jpg","/team/jeremias.jpg","/team/karenj.jpg","/team/lauta.jpg","/team/lean.jpg","/team/maca.jpg","/team/marcos.jpg","/team/mili.jpg","/team/none.webp","/team/tula.jpg","/team/vicky.jpg","/team/zaida.jpeg","/api/login","/api/register","/balance-mensual/index.html","/login/index.html","/notfound/index.html","/novedades/index.html","/nps-individual/index.html","/nps-trimestral/index.html","/programacion/index.html","/promotores/index.html","/register/index.html","/team/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"experimentalEnvGetSecretEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest as m };
