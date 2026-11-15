import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoutes, preloadRoute } from './router';
import './world.css';
import './styles/foundation.css';
import './styles/fonts.css';
const root=document.getElementById('root')!;
async function start(){await preloadRoute(window.location.pathname);const router=createBrowserRouter(createRoutes());const app=<StrictMode><RouterProvider router={router}/></StrictMode>;if(root.hasChildNodes())hydrateRoot(root,app);else createRoot(root).render(app)}
start().catch(()=>{if(!root.hasChildNodes())root.innerHTML='<main class="world-shell"><h1>Let’s try that again.</h1><p>The page could not load. Please refresh, or <a href="mailto:Imegufavour30@gmail.com">email Favour</a>.</p></main>';else{const note=document.createElement('p');note.className='recovery-note';note.textContent='Interactive features could not load. You can still follow the page links or refresh to try again.';root.append(note)}});
