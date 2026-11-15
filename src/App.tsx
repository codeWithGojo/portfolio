import { useEffect, useRef, type MouseEvent, type FocusEvent } from 'react';
import { Outlet, useLocation, useNavigate, useNavigation, useNavigationType, ScrollRestoration } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { metadataFor, siteOrigin } from './data/seo';
import { preloadRoute } from './router';
import { projects } from './projects';
export default function App(){
 const location=useLocation();const navigate=useNavigate();const navigation=useNavigation();const navigationType=useNavigationType();const initial=useRef(true);
 useEffect(()=>{
  const meta=metadataFor(location.pathname);document.title=meta.title;
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href',siteOrigin+meta.path);
  const values:Record<string,string>={'description':meta.description,'og:title':meta.title,'og:description':meta.description,'og:url':siteOrigin+meta.path,'og:image':siteOrigin+meta.image,'twitter:title':meta.title,'twitter:description':meta.description,'twitter:image':siteOrigin+meta.image};
  for(const [key,value] of Object.entries(values))document.querySelector(`meta[${key.startsWith('og:')?'property':'name'}="${key}"]`)?.setAttribute('content',value);
  const robots=document.querySelector('meta[name="robots"]');if(meta.path==='/404'){if(robots)robots.setAttribute('content','noindex');else{const tag=document.createElement('meta');tag.name='robots';tag.content='noindex';document.head.append(tag)}}else robots?.remove();
  if(!initial.current){if(location.hash){requestAnimationFrame(()=>document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView())}else if(navigationType!=='POP')window.scrollTo({top:0,behavior:'instant'});document.getElementById('main')?.focus({preventScroll:true});}
  initial.current=false;
 },[location.pathname,location.hash,navigationType]);
 useEffect(()=>{const legacy:Record<string,string>={home:'/',skills:'/about#skills',experience:'/about',education:'/about',projects:'/work',about:'/about',background:'/about',hobbies:'/hobbies',pricing:'/pricing',services:'/pricing',contact:'/contact'};const hash=location.hash.slice(1);if(location.pathname==='/'&&legacy[hash])navigate(legacy[hash],{replace:true});else if(location.pathname==='/'&&projects.some(p=>p.id===hash))navigate(`/work/${hash}`,{replace:true})},[location.pathname,location.hash,navigate]);
 function internal(target:EventTarget|null){const a=(target as Element)?.closest?.('a');if(!a||a.hasAttribute('download')||a.target&&a.target!=='_self'||a.dataset.native!==undefined)return null;const url=new URL(a.href,window.location.href);if(url.origin!==window.location.origin||url.pathname.endsWith('.html')||/\.[a-z0-9]+$/i.test(url.pathname))return null;return url;}
 function click(e:MouseEvent){if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;const url=internal(e.target);if(!url)return;if(url.pathname===window.location.pathname&&url.hash)return;e.preventDefault();navigate(url.pathname+url.search+url.hash)}
 function prefetch(e:MouseEvent|FocusEvent){const connection=(navigator as Navigator&{connection?:{saveData?:boolean;effectiveType?:string}}).connection;if(connection?.saveData||connection?.effectiveType==='2g')return;const url=internal(e.target);if(url)void preloadRoute(url.pathname).catch(()=>{})}
 return <div onClick={click} onMouseOver={prefetch} onFocus={prefetch}><a className="skip-link" href="#main">Skip to content</a><Navigation/>{navigation.state!=='idle'&&<div className="route-progress" role="status">Opening page…</div>}<main id="main" tabIndex={-1}><div className="route-content" key={location.pathname}><Outlet/></div></main><Footer/><ScrollRestoration/></div>
}
