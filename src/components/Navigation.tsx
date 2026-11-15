import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { navigation } from '../data/navigation';
export default function Navigation(){
 const {pathname}=useLocation();const path=pathname.replace(/\/$/,'')||'/';const [open,setOpen]=useState(false);const trigger=useRef<HTMLButtonElement>(null);const header=useRef<HTMLElement>(null);
 useEffect(()=>setOpen(false),[pathname]);
 useEffect(()=>{if(!open)return;const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpen(false);trigger.current?.focus()}};const outside=(e:PointerEvent)=>{if(!header.current?.contains(e.target as Node))setOpen(false)};const resize=()=>{if(innerWidth>760)setOpen(false)};document.addEventListener('keydown',escape);document.addEventListener('pointerdown',outside);window.addEventListener('resize',resize);return()=>{document.removeEventListener('keydown',escape);document.removeEventListener('pointerdown',outside);window.removeEventListener('resize',resize)}},[open]);
 return <><header className="world-header" ref={header}><a href="/" className="world-logo" aria-label="Imegu World home"><span className="logo-prompt" aria-hidden="true">&gt;</span><span className="logo-reveal">imegu</span><span>.world</span><span className="logo-cursor" aria-hidden="true">_</span></a><nav id="world-nav" className={open?'open':''} aria-label="Main navigation">{navigation.map(([href,label])=><a key={href} href={href} aria-current={path===href||(href==='/work'&&path.startsWith('/work/'))?'page':undefined} onClick={()=>setOpen(false)}>{label}</a>)}</nav><ThemeToggle/><button ref={trigger} className="world-menu-button" aria-expanded={open} aria-controls="world-nav" onClick={()=>setOpen(!open)}>{open?'Close':'Menu'}</button></header>{open&&<button tabIndex={-1} className="world-menu-backdrop" aria-label="Close navigation" onClick={()=>{setOpen(false);trigger.current?.focus()}}/>}</>
}
