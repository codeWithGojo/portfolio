import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom';
import { createRoutes, preloadRoute } from './router';
import { pageMetadata, metadataFor } from './data/seo';
export {pageMetadata,metadataFor};
export async function render(path:string){await preloadRoute(path);const routes=createRoutes();const {query,dataRoutes}=createStaticHandler(routes);const context=await query(new Request(`https://imegu.world${path}`));if(context instanceof Response)throw new Error(`Unexpected route response ${context.status}`);const router=createStaticRouter(dataRoutes,context);return renderToString(<StaticRouterProvider router={router} context={context}/>)}
