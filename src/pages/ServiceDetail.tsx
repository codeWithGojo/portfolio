import { Link, useParams } from "react-router-dom";
import { Button, Heading } from "../components/Shared";
import ServiceReveal from "../components/ServiceReveal";
import { servicePages } from "../data/service-pages";
import { projects } from "../projects";
import NotFound from "./NotFound";
import "../styles/services.css";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = servicePages.find(item => item.path.split("/").at(-1) === slug);
  if (!service) return <NotFound />;
  const work = service.projects.map(id => projects.find(project => project.id === id)).filter(Boolean);
  return <article className="world-shell service-detail">
    <nav aria-label="Breadcrumb" className="world-text-link service-breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/services">Services</Link><span aria-hidden="true">/</span><span aria-current="page">{service.eyebrow.split(" / ")[1]}</span></nav>
    <Heading label={`${service.eyebrow} / Favour Imegu`} title={service.title}><p>{service.intro}</p><div className="world-actions"><Button href={`/contact?service=${service.id}`}>Discuss this project</Button><Button href="/pricing" secondary>Pricing guidance</Button></div></Heading>
    <ServiceReveal className="service-detail__statement"><p className="world-label">Who it helps</p><h2>{service.audience}</h2><p>{service.summary}</p></ServiceReveal>
    <div className="service-detail__columns">
      <ServiceReveal as="section" className="service-detail__list"><p className="world-label">The problems</p><h2>What we can make easier.</h2><ul>{service.problems.map(item => <li key={item}>{item}</li>)}</ul></ServiceReveal>
      <ServiceReveal as="section" className="service-detail__list"><p className="world-label">Possible scope</p><h2>Useful pieces, agreed up front.</h2><ul>{service.capabilities.map(item => <li key={item}>{item}</li>)}</ul></ServiceReveal>
    </div>
    <ServiceReveal as="section" className="service-work"><div className="world-section-head"><div><p className="world-label">Selected examples</p><h2>Work that helps explain the approach.</h2></div><p>Project status is stated on each case study. Independent projects and concepts are presented as such.</p></div><div className="service-work__grid">{work.map(project => <article className="service-work-card" key={project!.id}><a href={`/work/${project!.id}`} className="service-work-card__link"><span>{project!.tags[0]}</span><h3>{project!.title.split(" — ")[0]}</h3><p>{project!.summary || project!.why}</p><span className="service-work-card__status">{project!.status}</span><span className="world-text-link">Read case study ↗</span></a></article>)}</div></ServiceReveal>
    <ServiceReveal as="section" className="service-process"><p className="world-label">A straightforward process</p><h2>Understand it. Scope it. Build it.</h2><ol>{service.process.map((step,index)=><li key={step}><span>0{index+1}</span><p>{step}</p></li>)}</ol></ServiceReveal>
    <ServiceReveal as="section" className="service-faq"><p className="world-label">Common questions</p><h2>Before we start.</h2>{service.faqs.map(item=><details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</ServiceReveal>
    <ServiceReveal className="service-quote"><p className="world-label">Next step / no polished brief required</p><h2>{service.quote}</h2><p>Share what you know so far. We can clarify the scope, timeline and quotation together.</p><div className="world-actions"><Button href={`/contact?service=${service.id}`}>Discuss your project</Button><Button href="https://wa.me/2349127971199?text=Hi%20Favour%2C%20I%27d%20like%20to%20discuss%20a%20project." secondary>WhatsApp</Button></div></ServiceReveal>
    <nav className="service-related" aria-label="Related services"><p className="world-label">Related services</p>{service.related.map(id=>{const related=servicePages.find(item=>item.id===id)!;return <Link key={id} to={related.path}>{related.eyebrow.split(" / ")[1]} ↗</Link>})}<Link to="/services">All services ↗</Link></nav>
  </article>;
}
