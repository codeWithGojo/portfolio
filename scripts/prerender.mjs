import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {join} from 'node:path';
import {render,pageMetadata,metadataFor,structuredDataFor} from '../.ssr/entry-server.js';
const template=await readFile('dist/index.html','utf8');
const manifest=JSON.parse(await readFile('dist/.vite/manifest.json','utf8'));
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const modules={'/':'Home','/about':'About','/work':'Work','/hobbies':'Hobbies','/pricing':'Pricing','/contact':'Contact','/404':'NotFound'};
function routeAssets(path){const file=modules[path]||'ProjectDetails';const entry=manifest[`src/pages/${file}.tsx`];const seen=new Set(),css=new Set(),js=new Set();function visit(item){if(!item||seen.has(item.file))return;seen.add(item.file);js.add(item.file);(item.css||[]).forEach(c=>css.add(c));(item.imports||[]).forEach(k=>visit(manifest[k]))}visit(entry);return [...css].map(f=>`<link rel="stylesheet" href="/${f}">`).join('')+[...js].map(f=>`<link rel="modulepreload" href="/${f}">`).join('')}
for(const page of [...pageMetadata,metadataFor('/404')]){
 const body=await render(page.path);if(!body.includes('<h1')||body.length<1000)throw Error(`Empty prerender: ${page.path}`);
 const canonical='https://imegu.world'+page.path;
 const head=`<title>${escape(page.title)}</title><meta name="description" content="${escape(page.description)}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:title" content="${escape(page.title)}"><meta property="og:description" content="${escape(page.description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="https://imegu.world${page.image}"><meta property="og:image:width" content="${page.imageWidth||1200}"><meta property="og:image:height" content="${page.imageHeight||630}"><meta property="og:image:alt" content="${escape(page.title)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(page.title)}"><meta name="twitter:description" content="${escape(page.description)}"><meta name="twitter:image" content="https://imegu.world${page.image}">${page.path==='/404'?'<meta name="robots" content="noindex">':''}<script type="application/ld+json">${JSON.stringify(structuredDataFor(page.path)).replaceAll('<','\\u003c')}</script>`;
 const html=template.replace('<!--route-head-->',head+routeAssets(page.path)).replace('<div id="root"></div>',`<div id="root">${body}</div>`);
 const file=page.path==='/'?'dist/index.html':join('dist',page.path+'.html');await mkdir(join(file,'..'),{recursive:true});await writeFile(file,html);
}
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pageMetadata.map(p=>`<url><loc>https://imegu.world${p.path}</loc></url>`).join('')}</urlset>`);
console.log(`Prerendered ${pageMetadata.length} content-rich pages and 404.`);
