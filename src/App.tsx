import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Motion } from "./Motion";
import { featuredProjects, projects } from "./projects";

const whatsappHref = "https://wa.me/2349127971199";
const quoteHref = (service: string) => `${whatsappHref}?text=${encodeURIComponent(`Hi Favour, I'm interested in ${service}. Here's what I have in mind: `)}`;
const customOffers = [
  { title: "Business & event websites", description: "Company sites, school websites, portfolios and wedding invitations, with pages and features shaped around your content.", scope: "Page count · content · integrations" },
  { title: "Web apps & business systems", description: "Dashboards, staff portals and ERP workflows. Quoted around what your users need to do and how the system should work.", scope: "Workflows · user roles · data" },
  { title: "Website improvements", description: "A redesign, a better mobile experience or a new feature for your existing site. We start with what needs fixing.", scope: "Current site · changes · complexity" },
];
const services = [
  { title: "Business & event websites", description: "Company sites, school websites, portfolios and invitations. Clear content, a considered visual identity and an easy way for visitors to reach you.", example: "See the wedding website", project: "wedding" },
  { title: "Web apps & business systems", description: "Dashboards, staff portals and tools that connect your team's daily work. We agree the workflows, access and reports before the build.", example: "See ExpenseAI", project: "expenseai" },
  { title: "Existing website improvements", description: "A clearer layout, better mobile navigation or a feature your current site needs. Share the link and the part that's getting in the way.", example: "See TerraScope", project: "terrascope" },
];

const skills = [
  {
    index: "01",
    title: "Web & mobile",
    note: "I build responsive interfaces and app flows people can actually use.",
    tools: ["React", "React Native", "Expo", "HTML/CSS"],
  },
  {
    index: "02",
    title: "APIs & data",
    note: "I connect the interface to the logic, data, and services behind it.",
    tools: ["Node.js", "Express", "Python", "Flask", "PostgreSQL"],
  },
  {
    index: "03",
    title: "Cloud & delivery",
    note: "I’m building hands-on experience with infrastructure and repeatable deployments.",
    tools: ["AWS", "Terraform", "GitHub Actions", "Vercel"],
  },
  {
    index: "04",
    title: "Connected devices",
    note: "My final-year project took live sensor readings from an ESP32 to a phone alert.",
    tools: ["ESP32", "MQ-2", "DHT11", "Push notifications"],
  },
];

const projectGroups = ["All projects", "Websites", "Data & discovery", "Apps & tools"] as const;
type ProjectGroup = typeof projectGroups[number];
const groupFor = (id: string): ProjectGroup => ["wedding", "dev-boyz", "cantica"].includes(id) ? "Websites" : ["afri-index", "terrascope", "nairascope", "fpl", "predictarena"].includes(id) ? "Data & discovery" : "Apps & tools";
const gallery = projects.filter(project => project.image);

const stack = [
  { label: "Frontend", tools: ["JavaScript", "TypeScript", "React", "React Native", "Expo"] },
  { label: "Backend & data", tools: ["Node.js", "Express", "Python", "Flask", "PostgreSQL", "Firebase", "MongoDB"] },
  { label: "Cloud & workflow", tools: ["AWS", "Terraform", "GitHub Actions", "Git", "Vercel", "Postman", "Figma"] },
];


function MarkIcon({ name }: { name: "github" | "mail" | "x" | "moon" | "sun" | "menu" | "close" | "arrow" }) {
  const paths = {
    github: <path d="M12 .7a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C15.9 5.9 17 6.2 17 6.2c.7 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .7Z" />,
    mail: <><path d="M3.5 5.5h17v13h-17z"/><path d="m4 6 8 6 8-6"/></>,
    x: <path d="m5 4 14 16M19 4 5 20" />,
    moon: <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z" />,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    menu: <><path d="M4 8h16M4 16h16"/></>,
    close: <><path d="m5 5 14 14M19 5 5 19"/></>,
    arrow: <><path d="M5 19 19 5M9 5h10v10"/></>,
  };

  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [projectQuery, setProjectQuery] = useState("");
  const [projectGroup, setProjectGroup] = useState<ProjectGroup>("All projects");
  const reduced = useReducedMotion();
  const spotlight = featuredProjects[spotlightIndex];
  const visibleProjects = projects.filter(project => (projectGroup === "All projects" || groupFor(project.id) === projectGroup) && `${project.title} ${project.tags.join(" ")} ${project.tech.join(" ")}`.toLowerCase().includes(projectQuery.trim().toLowerCase()));
  useEffect(() => {
    const revealLinkedProject = () => { if (projects.some(project => location.hash === `#${project.id}`)) { setProjectQuery(""); setProjectGroup("All projects"); } };
    window.addEventListener("hashchange", revealLinkedProject);
    return () => window.removeEventListener("hashchange", revealLinkedProject);
  }, []);
  const [lightMode, setLightMode] = useState(() => {
    try { return localStorage.getItem("portfolio-theme") === "light"; } catch { return false; }
  });
  const [preview, setPreview] = useState<{ image: string; title: string } | null>(null);
  const previewDialog = useRef<HTMLDialogElement>(null);
  const movePreview = (direction: number) => {
    if (!preview) return;
    const current = gallery.findIndex(project => project.image === preview.image);
    const next = gallery[(current + direction + gallery.length) % gallery.length];
    setPreview({image: next.image!, title: next.title});
  };
  useEffect(() => {
    if (preview) previewDialog.current?.showModal();
    else previewDialog.current?.close();
  }, [preview]);

  useEffect(() => {
    document.documentElement.dataset.theme = lightMode ? "light" : "dark";
    try { localStorage.setItem("portfolio-theme", lightMode ? "light" : "dark"); } catch { /* Storage may be disabled. */ }
  }, [lightMode]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      <Motion />
      <a className="skip-link" href="#main">Skip to main content</a>
      <div className="page-noise" aria-hidden="true" />

      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Favour, back to top">favour<span>.</span></a>
        <nav id="primary-navigation" className={menuOpen ? "nav-pill is-open" : "nav-pill"} aria-label="Primary navigation">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Background</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <button className="mobile-theme" onClick={() => setLightMode(!lightMode)}>{lightMode ? "Dark theme" : "Light theme"}</button>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label="Toggle navigation">
          <MarkIcon name={menuOpen ? "close" : "menu"} />
        </button>
      </header>

      <main id="main">
        <section className="hero shell" id="home">
          <div className="hero-topline"><p className="eyebrow"><span /> Favour Imegu · Independent developer</p><a href="#contact">Based in Nigeria. Building for the web. <MarkIcon name="arrow" /></a></div>
          <div className="hero-intro">
            <div className="hero-text">
              <h1 aria-label="Good ideas. Thoughtfully built."><span className="hero-line" aria-hidden="true"><span>Good ideas.</span></span><br /><span className="hero-line" aria-hidden="true"><span>Thoughtfully</span></span><br />{" "}<span className="hero-line hero-line-accent" aria-hidden="true"><span>built.</span></span></h1>
              <p className="hero-copy">Websites with personality. Apps that solve real problems. I’m Favour—Gojo to my friends—and I take care of the design, code and details in between.</p>
              <div className="hero-actions"><a className="primary-link" href="#projects">Explore my work <MarkIcon name="arrow" /></a><a className="resume-link" href="#pricing">Start a project <MarkIcon name="arrow" /></a></div>
              <div className="maker-note"><img src="/favour-portrait.jpeg" alt="Favour Imegu" width="64" height="64"/><div><strong>Favour / Gojo</strong><span><i /> Open to projects & opportunities</span></div><a href="/Imegu_Favour_Resume.docx" download aria-label="Download Favour’s résumé">Résumé ↓</a></div>
            </div>
            <div className="folio-stage">
              <div className="stage-heading"><span>ON MY DESK</span><span>0{spotlightIndex + 1} / 03</span></div>
              <div className="stage-window"><div className="window-chrome" aria-hidden="true"><span/><span/><span/><i>{spotlight.title.split(" — ")[0]}</i></div><a href={`#${spotlight.id}`} onClick={()=>{setProjectQuery("");setProjectGroup("All projects");}} aria-label={`Explore ${spotlight.title.split(" — ")[0]}`}><motion.img key={spotlight.id} src={spotlight.image} alt={`${spotlight.title.split(" — ")[0]} project interface`} width={1440} height={900} initial={reduced?false:{opacity:.4,y:14}} animate={{opacity:1,y:0}} transition={{duration:.35,ease:"easeOut"}} /></a></div>
              <div className="stage-caption" aria-live="polite"><div><strong>{spotlight.title.split(" — ")[0]}</strong><p>{spotlight.summary}</p></div><a href={`#${spotlight.id}`} onClick={()=>{setProjectQuery("");setProjectGroup("All projects");}} aria-label={`Read about ${spotlight.title.split(" — ")[0]}`}><MarkIcon name="arrow"/></a></div>
              <div className="stage-tabs" role="group" aria-label="Preview a featured project">{featuredProjects.map((project,index)=><button key={project.id} type="button" onClick={()=>setSpotlightIndex(index)} aria-pressed={index===spotlightIndex}><span>0{index+1}</span>{project.title.split(" — ")[0]}</button>)}</div>
            </div>
          </div>
          <div className="hero-bottom"><span>DESIGN / DEVELOPMENT / DELIVERY</span><a href="#projects">Scroll into the work <span aria-hidden="true">↓</span></a></div>
        </section>

        <section className="proof-strip" aria-label="Quick facts">
          <div><strong>Work</strong><span>{projects.length} selected projects</span></div>
          <div><strong>Off-screen</strong><span>CODM &amp; EA FC</span></div>
          <div><strong>Bowen University</strong><span>Computer Science · 2026</span></div>
        </section>

        <div className="motion-ribbon" aria-hidden="true"><div className="ribbon-track">{[0, 1].map(copy => <div className="ribbon-group" key={copy}><span>Design with intention</span><i>✳</i><span>Code with character</span><i>✳</i><span>Built by Favour</span><i>✳</i></div>)}</div></div>

        <section className="section projects-section" id="projects">
          <div className="shell">
            <div className="section-kicker"><span>01</span><p>Selected projects</p></div>
            <div className="section-heading project-heading">
              <h2>Built with a point of view.</h2>
              <p>Start with three projects that show how I approach data, product design and interactive interfaces. The full collection follows below.</p>
            </div>
            <div className="featured-work" aria-label="Featured projects">
              {featuredProjects.map((project, index) => (
                <article className="featured-project" key={project.id}>
                  {project.image && <a className="featured-image" href={`#${project.id}`} onClick={()=>{setProjectQuery("");setProjectGroup("All projects");}} aria-label={`Read the ${project.title.split(" — ")[0]} case study`}><img src={project.image} alt={`${project.title.split(" — ")[0]} interface preview`} width={project.imageWidth ?? 1440} height={project.imageHeight ?? 900} loading="lazy" decoding="async" /></a>}
                  <div className="featured-copy"><span className="featured-label">Featured {String(index + 1).padStart(2, "0")} · {project.tags[0]}</span><h3>{project.title.split(" — ")[0]}</h3><p>{project.summary}</p><div className="featured-actions"><a className="featured-action" href={`#${project.id}`} onClick={()=>{setProjectQuery("");setProjectGroup("All projects");}}>Read the case study <MarkIcon name="arrow" /></a>{project.links.filter(link => !link.href.includes("github.com")).slice(0, 1).map(link => <a className="featured-live" href={link.href} target="_blank" rel="noreferrer" key={link.href}>Open live site <MarkIcon name="arrow" /></a>)}</div></div>
                </article>
              ))}
            </div>
            <div className="archive-toolbar"><div><p className="eyebrow">THE FULL COLLECTION</p><h3>A few more things I’ve made.</h3></div><label className="archive-search" htmlFor="project-search"><span>Find a project</span><input id="project-search" type="search" value={projectQuery} onChange={event=>setProjectQuery(event.target.value)} placeholder="Try React, music or web…" /></label><p className="archive-label" role="status">{visibleProjects.length} of {projects.length} projects</p></div>
          </div>

          <div className="collection-filters shell" role="group" aria-label="Filter projects by type">{projectGroups.map(group => <button type="button" key={group} aria-pressed={group === projectGroup} onClick={() => setProjectGroup(group)}>{group}<span>{group === "All projects" ? projects.length : projects.filter(project => groupFor(project.id) === group).length}</span></button>)}<button className="collection-reset" type="button" disabled={!projectQuery && projectGroup === "All projects"} onClick={() => {setProjectQuery(""); setProjectGroup("All projects");}}>Reset filters</button></div>
          <nav className="project-index shell" aria-label="Jump to a project">
            {projects.map((project, index) => <a key={project.id} href={`#${project.id}`} onClick={()=>{setProjectQuery("");setProjectGroup("All projects");}}><span>{String(index + 1).padStart(2, "0")}</span>{project.title.split(" — ")[0]}</a>)}
          </nav>
          {!visibleProjects.length && <div className="archive-empty shell"><h3>No projects found.</h3><p>Try a different tool or project name.</p><button onClick={()=>{setProjectQuery("");setProjectGroup("All projects");}}>Show all projects</button></div>}
          <div className="projects-list shell">
            {visibleProjects.map((project) => (

              <article className="project" key={project.id} id={project.id}>
                <div className="project-top">
                  <span className="project-number">{String(projects.indexOf(project) + 1).padStart(2, "0")}</span>
                  <div className="project-title-wrap">
                    <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <h3>{project.title}</h3>
                  </div>
                  <span className="project-status"><i />{project.status}</span>
                </div>

                {project.image ? <figure className="project-preview">
                  <button type="button" onClick={() => setPreview({ image: project.image!, title: project.title })} aria-label={`Enlarge screenshot of ${project.title}`}>
                    <img src={project.image} alt={`${project.title} interface screenshot`} width={project.imageWidth ?? 1440} height={project.imageHeight ?? 900} loading="lazy" decoding="async" />
                    <span className="preview-open">Enlarge screenshot ↗</span>
                  </button>
                  <figcaption>{project.imageCaption ?? "Project interface screenshot · open the live preview for its current version"}</figcaption>
                </figure> : project.previewNote ? <div className="preview-note"><span>{project.id === "firesafe" ? "ESP32 → Flask → Supabase → Expo" : "Project preview"}</span><p>{project.previewNote}</p></div> : null}
                <div className="why-note">
                  <span>Why I built it</span>
                  <p>{project.why}</p>
                </div>

                {project.role && <p className="project-role"><span>My contribution</span>{project.role}</p>}

                <details className="project-details">
                  <summary>Project notes <span>Read the project story</span></summary>
                <div className="project-notes">
                  <div><span>Built</span><p>{project.built}</p></div>
                  <div><span>Learned</span><p>{project.learned}</p></div>
                  <div><span>Challenge</span><p>{project.challenge}</p></div>
                </div>

                <div className="project-outcome"><span>Outcome</span><p>{project.outcome}</p></div>
                </details>
                {project.companion && <aside className="companion-project" aria-label="Companion project">
                  {project.companion.image && <button className="companion-preview" onClick={() => setPreview({ image: project.companion!.image!, title: project.companion!.title })} aria-label="Enlarge Afri Image Generator screenshot"><img src={project.companion.image} alt="Afri Image Generator interface" loading="lazy" decoding="async" width="1440" height="900" /></button>}
                  <div><p className="companion-label">Alongside Afri Index</p><h4>{project.companion.title}</h4><p>{project.companion.description}</p><div className="project-links"><a href={project.companion.href} target="_blank" rel="noreferrer">Open generator <MarkIcon name="arrow" /></a><a href={project.companion.github} target="_blank" rel="noreferrer">GitHub <MarkIcon name="arrow" /></a></div></div>
                </aside>}
                <div className="project-footer">
                  <div className="tech-list">{project.tech.map((item) => <span key={item}>{item}</span>)}</div>
                  <div className="project-links">
                    {project.links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}<MarkIcon name="arrow" /></a>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell" id="about">
          <div className="section-kicker"><span>02</span><p>About</p></div>
          <div className="about-layout">
            <h2>I like making ideas <em>real.</em></h2>
            <div className="body-copy">
              <p>I’m a Computer Science graduate from Bowen University and a developer who enjoys the whole build, from the first screen to the data that makes it work.</p>
              <p>Outside of code, I’m usually Lambo or Gojo. Gaming is a big part of my life. Leading a CODM team made me notice how much competitive players have to manage through scattered chats and spreadsheets. That’s one reason I started building CoDM Squad Hub.</p>
              <p>For my final-year project, my partner and I built a fire and gas detection system using an ESP32, sensors, a backend, and a mobile app. Seeing a real reading turn into a phone alert taught me a lot about making separate pieces work together.</p>
              <blockquote>“I enjoy the moment an idea becomes something you can actually use.”</blockquote>
            </div>
          </div>
        </section>

        <section className="section shell" id="skills">
          <div className="section-kicker"><span>03</span><p>Skills</p></div>
          <div className="section-heading">
            <h2>What I work on.</h2>
            <p>I learn fastest when I have a real problem to solve and a working version to improve.</p>
          </div>
          <div className="skills-list">
            {skills.map((skill) => (
              <article className="skill-row" key={skill.title}>
                <span className="skill-index">{skill.index}</span>
                <h3>{skill.title}</h3>
                <p>{skill.note}</p>
                <div className="tool-list">{skill.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
              </article>
            ))}
          </div>
          <div className="stack-section" aria-labelledby="stack-title">
            <div className="stack-heading"><h3 id="stack-title">My tech stack</h3><p>The tools I’ve used across my projects and freelance work.</p></div>
            <div className="stack-grid">{stack.map((group) => <div className="stack-group" key={group.label}><h4>{group.label}</h4><div>{group.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div>)}</div>
          </div>
        </section>

        <section className="section shell" id="services">
          <div className="section-kicker"><span>04</span><p>Services</p></div>
          <div className="services-layout">
            <div className="services-intro"><h2>What do you need built?</h2><p>Bring a rough idea, a brief or an existing website. I'll help you work through the scope, then agree the deliverables, timeline and cost with you.</p><a className="primary-link" href={whatsappHref} target="_blank" rel="noreferrer">Discuss a project <MarkIcon name="arrow" /></a><p className="team-note">For team projects, I work with <a href="https://dev-boyz.vercel.app" target="_blank" rel="noreferrer">Dev Boyz ↗</a>.</p></div>
            <div className="services-list">{services.map((service) => <article key={service.title}><h3>{service.title}</h3><p>{service.description}</p><a className="service-example" href={`#${service.project}`}>{service.example} <span aria-hidden="true">↗</span></a></article>)}</div>
          </div>
        </section>

        <section className="build-process shell" aria-label="How we work together"><div><span>01 / MAKE IT CLEAR</span><h3>Talk through the idea.</h3><p>We agree the audience, pages, features, budget and timeline.</p></div><div><span>02 / MAKE IT REAL</span><h3>Design. Build. Refine.</h3><p>Review the direction, try a working version and shape the details.</p></div><div><span>03 / PUT IT TO WORK</span><h3>Check it. Launch it.</h3><p>We test the agreed flows and get your project ready to share.</p></div></section>
        <section className="section shell pricing-section" id="pricing" aria-labelledby="pricing-title">
          <div className="section-kicker"><span>05</span><p>Pricing</p></div>
          <div className="section-heading">
            <h2 id="pricing-title">A clear place to start.</h2>
            <p>A guide for your budget. The final quote depends on the design, content and features we agree before work begins.</p>
          </div>
          <div className="pricing-layout">
            <article className="pricing-landing" aria-labelledby="landing-title">
              <div>
                <p className="pricing-label">One page. One clear goal.</p>
                <h3 id="landing-title">Landing page</h3>
                <p className="pricing-description">For a launch, a service or a campaign that needs a focused page and an easy way to get in touch.</p>
              </div>
              <div className="pricing-amount"><span>₦150,000–₦300,000</span><p>Project range · priced in NGN</p></div>
              <ul className="pricing-inclusions">
                <li>Design tailored to your brand</li>
                <li>Responsive layout for phone and desktop</li>
                <li>Clear enquiry or contact action</li>
                <li>Agreed scope and launch plan</li>
              </ul>
              <p className="pricing-scope">The range varies with section count, animation, content and integrations.</p>
              <a className="primary-link" href={quoteHref("landing page")} target="_blank" rel="noreferrer">Discuss my landing page <MarkIcon name="arrow" /></a>
            </article>
            <div className="pricing-custom">
              <p className="pricing-label">Other projects · custom quotes</p>
              {customOffers.map((offer) => (
                <article className="pricing-row" key={offer.title}>
                  <h3>{offer.title}</h3>
                  <p>{offer.description}</p>
                  <span className="pricing-factors">{offer.scope}</span>
                  <a className="pricing-enquiry" href={quoteHref(offer.title.toLowerCase())} target="_blank" rel="noreferrer">Request a quote<span className="sr-only"> for {offer.title.toLowerCase()}</span> <MarkIcon name="arrow" /></a>
                </article>
              ))}
            </div>
          </div>
          <div className="pricing-note"><span>Before we start</span><p>We agree the deliverables, timeline and total cost together. Domain, hosting and any paid services are discussed separately so you know the ongoing costs too.</p></div>
        </section>

        <section className="section shell" id="experience">
          <div className="section-kicker"><span>06</span><p>Background</p></div>
          <div className="background-grid">
            <div className="background-heading">
              <h2>A little more about my work.</h2>
              <p>For the full project history and experience, you can download my résumé.</p>
              <a className="resume-link background-resume" href="/Imegu_Favour_Resume.docx" download>Download résumé <span aria-hidden="true">↓</span></a>
            </div>
            <div className="timeline">
              <article className="timeline-item">
                <span className="timeline-year">2026</span>
                <div><p className="timeline-type">Client work · ongoing</p><h3>Internal operations system</h3><p>I’m working on an ERP that brings personnel, purchasing, inventory and finance into one workspace, with staff permissions and approval workflows.</p></div>
              </article>
              <article className="timeline-item">
                <span className="timeline-year">2026</span>
                <div><p className="timeline-type">Experience</p><h3>Freelance web developer</h3><p>I design and build sites for businesses, schools, and academies, and handle the conversations from first pitch to the finished work.</p></div>
              </article>
              <article className="timeline-item">
                <span className="timeline-year">2025 — 2026</span>
                <div><p className="timeline-type">Project experience</p><h3>Smart Fire Detection System</h3><p>With a project partner, I connected an ESP32 and sensors to a backend and a React Native app so readings could trigger alerts on a phone.</p></div>
              </article>
              <article className="timeline-item" id="education">
                <span className="timeline-year">2021 — 2026</span>
                <div><p className="timeline-type">Education</p><h3>B.Sc. Computer Science</h3><p>Bowen University, Iwo, Nigeria.</p></div>
              </article>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="shell contact-layout">
            <div>
              <p className="eyebrow"><span /> Get in touch</p>
              <h2>Have something<br />in mind? <span>Let’s talk.</span></h2>
            </div>
            <div className="contact-copy">
              <p>Tell me what you’re working on. I’m happy to talk about a website, an app, a role, or one of the projects here.</p>
              <div className="contact-actions"><a className="primary-link" href={whatsappHref} target="_blank" rel="noreferrer">Chat on WhatsApp <MarkIcon name="arrow" /></a><a className="resume-link" href="mailto:Imegufavour30@gmail.com">Send an email <MarkIcon name="mail" /></a></div>
            </div>
          </div>
          <div className="shell contact-cards">
            <a href="mailto:Imegufavour30@gmail.com"><span>Email</span><strong>Imegufavour30@gmail.com</strong></a>
            <a href="https://github.com/codeWithGojo" target="_blank" rel="noreferrer"><span>GitHub</span><strong>github.com/codeWithGojo</strong></a>
            <a href={whatsappHref} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>09127971199</strong></a>
          </div>
        </section>
      </main>

      <aside className="social-rail" aria-label="Social links and display settings">
        <div className="rail-links">
          <a href="https://github.com/codeWithGojo" target="_blank" rel="noreferrer"><MarkIcon name="github" /><span>GitHub</span></a>
          <a href="https://x.com/not_favour" target="_blank" rel="noreferrer"><MarkIcon name="x" /><span>X / Twitter</span></a>
          <a href="mailto:Imegufavour30@gmail.com"><MarkIcon name="mail" /><span>Email</span></a>
        </div>
        <button className="theme-toggle" onClick={() => setLightMode(!lightMode)} aria-label={lightMode ? "Use dark theme" : "Use light theme"}>
          <MarkIcon name={lightMode ? "moon" : "sun"} />
          <span>{lightMode ? "Dark" : "Light"}</span>
        </button>
      </aside>

      <dialog className="screenshot-dialog" ref={previewDialog} onKeyDown={event => {if (event.key === "ArrowLeft") {event.preventDefault(); movePreview(-1);} if (event.key === "ArrowRight") {event.preventDefault(); movePreview(1);}}} onCancel={() => setPreview(null)} onClose={() => setPreview(null)} onClick={(event) => { if (event.target === event.currentTarget) setPreview(null); }} aria-labelledby="preview-title">
        {preview && <><div className="dialog-header"><h2 id="preview-title">{preview.title}</h2><button autoFocus onClick={() => setPreview(null)} aria-label="Close screenshot"><MarkIcon name="close" /></button></div><img src={preview.image} alt={`${preview.title} enlarged screenshot`} /><div className="gallery-controls"><button type="button" onClick={() => movePreview(-1)} aria-label="Previous project screenshot">← Previous</button><p role="status">{gallery.findIndex(project => project.image === preview.image) + 1} / {gallery.length}</p><button type="button" onClick={() => movePreview(1)} aria-label="Next project screenshot">Next →</button></div></>}
      </dialog>
      <footer className="folio-footer shell">
        <div className="folio-footer-top"><a className="footer-signature" href="#home" aria-label="Favour, back to top">favour<span>.</span></a><p>Independent developer.<br/>A personal approach to every build.</p></div>
        <div className="folio-footer-links"><nav aria-label="Footer portfolio links"><span>Take a look</span><a href="#projects">Selected work</a><a href="#services">Services</a><a href="#pricing">Project pricing</a></nav><nav aria-label="Footer contact links"><span>Start a conversation</span><a href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp ↗</a><a href="mailto:Imegufavour30@gmail.com">Email ↗</a><a href="https://github.com/codeWithGojo" target="_blank" rel="noreferrer">GitHub ↗</a></nav><div><span>Have a brief ready?</span><p>A few lines about the idea, your timeline and what you need is a good start.</p><a className="resume-link" href={quoteHref("a new project")} target="_blank" rel="noreferrer">Tell me about it <MarkIcon name="arrow"/></a></div></div>
        <div className="folio-footer-bottom"><p>© 2026 Favour Imegu EwoMazino.</p><span>Designed &amp; built by Favour.</span><a href="#home">Back to top ↑</a></div>
      </footer>
    </>
  );
}
