import { projects } from '../projects';
export const siteOrigin = 'https://imegu.world';
const general = '/social-preview.png';
export const pageMetadata = [
 {path:'/',title:'Favour Imegu — Software Developer & Product Builder',description:'Explore the work and world of Favour Imegu, a Nigerian software developer building websites, useful products and business systems with care and curiosity.',image:general},
 {path:'/about',title:'About Favour Imegu — Story, Skills & Dev Boyz',description:'From growing up in Ibadan to Computer Science at Bowen and building with Dev Boyz. Meet Favour Imegu and explore the real projects behind his skills.',image:general},
 {path:'/work',title:'Projects & Case Studies — Favour Imegu',description:'Explore websites, apps and tools built by Favour Imegu, including Afri Index, TerraScope and BlessingFoundHerBlessing, with honest stories behind each build.',image:general},
 {path:'/hobbies',title:'Outside the Code — Favour Imegu’s Personal World',description:'Explore Favour Imegu’s personal archive: Arsenal memories, anime, music, competitive gaming and the experiences that shaped the person behind the projects.',image:general},
 {path:'/pricing',title:'Website & Software Development Pricing — Favour Imegu',description:'Explore website, application and business system services from Favour Imegu. View the approved landing-page price range in naira or request a custom quote.',image:general},
 {path:'/contact',title:'Start a Project with Favour Imegu',description:'Have a website, product or business system in mind? Send Favour Imegu a project enquiry or start a conversation directly through WhatsApp or email.',image:general},
 ...projects.map(p=>({path:`/work/${p.id}`,title:`${p.title} — Favour Imegu`,description:concise(p.summary||p.why),image:p.image||general})),
];
function concise(text:string){if(text.length<=160)return text;return text.slice(0,156).replace(/\s+\S*$/,'')+'…'}
export function metadataFor(path:string){return pageMetadata.find(p=>p.path===(path.replace(/\/$/,'')||'/'))||{path:'/404',title:'Page Not Found — Favour Imegu',description:'This page could not be found. Explore Favour Imegu’s work, story and contact pages.',image:general}}
