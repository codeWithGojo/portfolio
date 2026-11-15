import type { ImgHTMLAttributes } from 'react';
type Props=ImgHTMLAttributes<HTMLImageElement>;
export default function ResponsiveImage({src,sizes='(max-width: 760px) 90vw, 45vw',...props}:Props){
 let srcSet:string|undefined;let source=src;
 if(src?.startsWith('/previews/')&&src.endsWith('.jpg')){const name=src.split('/').pop()!.slice(0,-4);source=`/media/${name}-960.webp`;srcSet=`/media/${name}-480.webp 480w, /media/${name}-960.webp 960w`;}
 else if(src==='/hero-graduation.webp'){source='/media/hero-graduation-900.webp';srcSet='/media/hero-graduation-480.webp 480w, /media/hero-graduation-900.webp 900w';}
 else if(src==='/favour-graduation-2026.webp'){source='/media/favour-graduation-2026-960.webp';srcSet='/media/favour-graduation-2026-480.webp 480w, /media/favour-graduation-2026-960.webp 960w';}
 return <img {...props} src={source} srcSet={srcSet} sizes={srcSet?sizes:undefined} decoding="async"/>;
}
