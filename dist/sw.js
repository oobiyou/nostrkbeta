if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const a=e=>i(e,o),l={module:{uri:o},exports:t,require:a};s[o]=Promise.all(n.map((e=>l[e]||a(e)))).then((e=>(r(...e),t)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/compressor.esm.bf8af3ea.js",revision:null},{url:"assets/database.697af47b.js",revision:null},{url:"assets/index.8eaa0ed3.js",revision:null},{url:"assets/index.ed744d56.css",revision:null},{url:"assets/qr-scanner-worker.min.56d417f3.js",revision:null},{url:"index.html",revision:"bb7c3ffccb4b7039b33ccf7ae96e13f2"},{url:"registerSW.js",revision:"a4789eaea92569a5879eab11ba79aab0"},{url:"images/favicon/android-icon-192x192.png",revision:"c1460d64beb395458b7493ee29c21f87"},{url:"images/favicon/android-icon-512x512.png",revision:"27deab565bf87907af749774472eddc0"},{url:"manifest.webmanifest",revision:"d2fc61b3b33c8844a1d20021100f0dc3"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
