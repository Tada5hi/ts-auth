import{_ as e,o as a,c as t,f as r}from"./app.0d8992d0.js";const g=JSON.parse('{"title":"Backend","description":"","frontmatter":{},"headers":[{"level":2,"title":"Extension or Standalone?","slug":"extension-or-standalone","link":"#extension-or-standalone","children":[{"level":3,"title":"Standalone","slug":"standalone","link":"#standalone","children":[]},{"level":3,"title":"Extension","slug":"extension","link":"#extension","children":[]}]},{"level":2,"title":"Supporting Microservices","slug":"supporting-microservices","link":"#supporting-microservices","children":[]}],"relativePath":"guide/backend.md"}'),n={name:"guide/backend.md"},s=r('<h1 id="backend" tabindex="-1">Backend <a class="header-anchor" href="#backend" aria-hidden="true">#</a></h1><p>The <strong>server-http</strong> &amp; <strong>sever-database</strong> package, which can be integrated into an existent application, is the heart 🧡 of the authup ecosystem and is used by the <strong>server</strong> package, to provide a standalone solution.</p><p>Therefore, it is important to decide if a <a href="#standalone">standalone</a> or <a href="#extension">extension</a> solution for backend side is the right choice.</p><h2 id="extension-or-standalone" tabindex="-1">Extension or Standalone? <a class="header-anchor" href="#extension-or-standalone" aria-hidden="true">#</a></h2><h3 id="standalone" tabindex="-1">Standalone <a class="header-anchor" href="#standalone" aria-hidden="true">#</a></h3><p>To use authup as standalone application, read the <a href="./../packages/server/">server</a> package documentation for further usage. There is also a docker image available for instant usage.</p><h3 id="extension" tabindex="-1">Extension <a class="header-anchor" href="#extension" aria-hidden="true">#</a></h3><p>To use authup as extension to an existent <a href="https://www.npmjs.com/package/routup" target="_blank" rel="noreferrer">routup</a>- &amp; <a href="https://www.npmjs.com/package/typeorm" target="_blank" rel="noreferrer">typeorm</a>-application, read the <a href="./../packages/server-http/">server-core</a> package documentation.</p><h2 id="supporting-microservices" tabindex="-1">Supporting Microservices <a class="header-anchor" href="#supporting-microservices" aria-hidden="true">#</a></h2><p>It is also possible to interact with the authup API from microservices. Therefore, a <a href="./../packages/server-adapter/">server-adapter</a> library is provided, to simplify the verification and validation process of external access. It provides a middleware for http &amp; socket based microservices.</p>',10),o=[s];function i(d,c,p,h,l,u){return a(),t("div",null,o)}const m=e(n,[["render",i]]);export{g as __pageData,m as default};
