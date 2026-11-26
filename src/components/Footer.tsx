import { navigation } from '../data/navigation';
import { contact } from '../content';
import SocialActionDock from './SocialActionDock';

export default function Footer(){return <><footer className="world-footer world-shell"><div><a className="world-logo" href="/">imegu<span>.world</span></a><p>What I build. How I think.<br/>A little of everything else.</p></div><nav aria-label="Footer navigation">{navigation.slice(1).map(([href,label])=><a href={href} key={href}>{label}</a>)}</nav><div><a href={contact.whatsapp}>WhatsApp ↗</a><a href="/Imegu_Favour_Resume.pdf" download>Download résumé (PDF) ↓</a></div><p className="footer-end">© 2026 Favour Imegu. The story is still being written.</p></footer><SocialActionDock/></>}
