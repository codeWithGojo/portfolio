import { lazy, Suspense, useEffect, useState } from 'react';
const Intro=lazy(()=>import('./CircularIdentityIntro'));
export default function DeferredIntro(){const [ready,setReady]=useState(false);useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;try{if(sessionStorage.getItem('imegu-identity-seen-v2')==='yes')return}catch{}const timer=setTimeout(()=>setReady(true),250);return()=>clearTimeout(timer)},[]);return ready?<Suspense fallback={null}><Intro/></Suspense>:null}
