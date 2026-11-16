import { Button, Heading } from "../components/Shared";
import ServiceReveal from "../components/ServiceReveal";
import { servicePages } from "../data/service-pages";
import { projects } from "../projects";
import "../styles/services.css";

export default function Services() {
  return <div className="world-shell services-page">
    <Heading label="Services / practical work, scoped together" title="What can I help you build?">
      <p>I build websites, applications and business tools around a real need. Explore the work, see where a service fits, then tell me what you have in mind.</p>
    </Heading>
    <div className="services-intro-links"><a href="/pricing">See pricing guidance ↗</a><a href="/work">Browse all project case studies ↗</a></div>
    <div className="service-hub-grid">
      {servicePages.map((service, index) => {
        const examples = service.projects.map(id => projects.find(project => project.id === id)).filter(Boolean);
        return <ServiceReveal as="article" className={`service-hub-card service-hub-card--${index + 1}`} key={service.id}>
          <div className="service-hub-card__top"><span className="service-mark" aria-hidden="true">{["W/", "↗", "⇄", "{}"] [index]}</span></div>
          <p className="world-label">{service.eyebrow}</p>
          <h2>{service.title}</h2>
          <p>{service.intro}</p>
          <ul>{service.capabilities.slice(0, 3).map(item => <li key={item}>{item}</li>)}</ul>
          <p className="service-proof"><span>Related work</span>{examples.map((project, i) => <span key={project!.id}><a href={`/work/${project!.id}`}>{project!.title.split(" — ")[0]}</a>{i < examples.length - 1 ? " · " : ""}</span>)}</p>
          <div className="world-actions"><Button href={service.path} secondary>Explore service</Button><Button href={`/contact?service=${service.id}`}>Request a quote</Button></div>
        </ServiceReveal>;
      })}
    </div>
    <ServiceReveal className="service-remote-note"><p className="world-label">Working together</p><h2>Remote by default. Clear about the scope.</h2><p>I can work remotely with businesses in Asaba and across Delta State, Ibadan and Osun State, elsewhere in Nigeria, and internationally. Development fees, domain registration, hosting, third-party services and ongoing maintenance are discussed separately so the proposal is clear.</p><div className="world-actions"><Button href="/pricing" secondary>View pricing guidance</Button><Button href="/contact">Talk through a project</Button></div></ServiceReveal>
  </div>;
}
