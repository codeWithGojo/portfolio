import type { ComponentType } from 'react';
import type { RouteObject } from 'react-router-dom';
import App from './App';
const modules={ask:()=>import('./pages/Ask'),home:()=>import('./pages/Home'),about:()=>import('./pages/About'),work:()=>import('./pages/Work'),hobbies:()=>import('./pages/Hobbies'),pricing:()=>import('./pages/Pricing'),contact:()=>import('./pages/Contact'),services:()=>import('./pages/Services'),serviceDetail:()=>import('./pages/ServiceDetail'),project:()=>import('./pages/ProjectDetails'),notFound:()=>import('./pages/NotFound')};
type PageKey=keyof typeof modules;
const cached=new Map<PageKey,ComponentType>();
const pending=new Map<PageKey,Promise<{Component:ComponentType}>>();
function load(key:PageKey){if(!pending.has(key))pending.set(key,modules[key]().then(module=>{cached.set(key,module.default as ComponentType);return {Component:module.default as ComponentType}}).catch(error=>{pending.delete(key);throw error}));return pending.get(key)!}
export function pageKey(path:string):PageKey{const p=path.replace(/\/$/,'')||'/';if(p==='/')return 'home';if(/^\/work\/[^/]+$/.test(p))return 'project';if(/^\/services\/[^/]+$/.test(p))return 'serviceDetail';return (['ask','about','work','hobbies','pricing','contact','services'] as PageKey[]).find(k=>p===`/${k}`)||'notFound'}
export function preloadRoute(path:string){return load(pageKey(path))}
function route(key:PageKey,path?:string):RouteObject{return {...(path?{path}:{index:true}),id:key,...(cached.has(key)?{Component:cached.get(key)}:{lazy:()=>load(key)})} }
export function createRoutes():RouteObject[]{return [{id:'layout',Component:App,children:[route('home'),route('ask','ask'),route('about','about'),route('work','work'),route('hobbies','hobbies'),route('pricing','pricing'),route('contact','contact'),route('services','services'),route('serviceDetail','services/:slug'),route('project','work/:slug'),route('notFound','*')]}]}
