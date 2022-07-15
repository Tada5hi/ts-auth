import{_ as e,o as a,c as r,f as s}from"./app.09390717.js";const g=JSON.parse('{"title":"Deploying","description":"","frontmatter":{},"headers":[],"relativePath":"packages/server/docker.md"}'),n={name:"packages/server/docker.md"},o=s(`<h1 id="deploying" tabindex="-1">Deploying <a class="header-anchor" href="#deploying" aria-hidden="true">#</a></h1><p>The auth server can be deployed using the provided docker image:</p><div class="language-shell"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">$ docker pull ghcr.io/tada5hi/authelion-server:latest</span></span>
<span class="line"></span></code></pre></div><p>To change the default configuration use environment variables (<code>--env &lt;key&gt;=&lt;value&gt;</code>). Read the <a href="./../server-core/">API Reference</a> for available environment variables.</p>`,4),t=[o];function c(d,i,l,p,_,h){return a(),r("div",null,t)}var u=e(n,[["render",c]]);export{g as __pageData,u as default};
