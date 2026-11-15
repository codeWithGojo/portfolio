import { useEffect, useState } from 'react';
function applyTheme(theme:string){
 document.documentElement.dataset.theme=theme;
 document.documentElement.style.colorScheme=theme;
 document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach(meta=>{meta.content=theme==='dark'?'#121214':'#faf9f6';meta.removeAttribute('media')});
}
export default function ThemeToggle(){
 const [theme,setTheme]=useState('system');
 useEffect(()=>{const system=matchMedia('(prefers-color-scheme: dark)');const sync=()=>{let stored='';try{stored=localStorage.getItem('imegu-theme')||''}catch{}const next=stored==='light'||stored==='dark'?stored:system.matches?'dark':'light';applyTheme(next);setTheme(next)};sync();system.addEventListener('change',sync);return()=>system.removeEventListener('change',sync)},[]);
 function toggle(){const next=document.documentElement.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('imegu-theme',next)}catch{}applyTheme(next);setTheme(next)}
 return <button className="world-theme" onClick={toggle} aria-label={theme==='system'?'Toggle light and dark theme':`Switch to ${theme==='dark'?'light':'dark'} theme`}><span className="theme-sun" aria-hidden="true">☀</span><span className="theme-moon" aria-hidden="true">☾</span></button>
}
