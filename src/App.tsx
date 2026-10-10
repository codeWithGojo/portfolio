import { useEffect, useRef, useState } from "react";
import { featuredProjects, projects } from "./projects";

const whatsappHref = "https://wa.me/2349127971199";
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
  const [lightMode, setLightMode] = useState(() => {
    try { return localStorage.getItem("portfolio-theme") === "light"; } catch { return false; }
  });
  const [preview, setPreview] = useState<{ image: string; title: string } | null>(null);
  const previewDialog = useRef<HTMLDialogElement>(null);
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
      <a className="skip-link" href="#main">Skip to main content</a>
      <div className="page-noise" aria-hidden="true" />

      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Favour, back to top">favour<span>.</span></a>
        <nav id="primary-navigation" className={menuOpen ? "nav-pill is-open" : "nav-pill"} aria-label="Primary navigation">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Background</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <button className="mobile-theme" onClick={() => setLightMode(!lightMode)}>{lightMode ? "Dark theme" : "Light theme"}</button>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label="Toggle navigation">
          <MarkIcon name={menuOpen ? "close" : "menu"} />
        </button>
      </header>

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

      <main id="main">
        <section className="hero shell" id="home">
          <div className="hero-intro">
            <div className="hero-text">
              <p className="eyebrow"><span /> Web, mobile &amp; cloud · Nigeria</p>
              <h1>Hi, I’m Favour.<br /><em>Gojo to my friends.</em></h1>
              <p className="hero-copy">I build websites, apps, and the systems behind them. I like taking an idea from a rough sketch to something people can open and use.</p>
              <p className="hero-copy secondary">Outside of code, I’m Lambo or Gojo. I’m a game addict, especially when it comes to CODM and EA FC. That side of me shows up in the products I choose to build, too.</p>
              <div className="hero-actions">
                <a className="primary-link" href="#projects">See my projects <MarkIcon name="arrow" /></a>
                <a className="resume-link" href="/Imegu_Favour_Resume.docx" download>Download résumé <span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <div className="portrait-wrap">
              <div className="portrait-orbit" aria-hidden="true" />
              <div className="portrait-ring"><img className="portrait-photo" src="/favour-portrait.jpeg" alt="Favour Imegu" width="719" height="1280" /></div>
              <span className="portrait-caption">Favour / Gojo</span>
            </div>
          </div>
          <div className="now-line"><span className="status-pulse" /> Open to web, mobile, and cloud opportunities</div>
        </section>

        <section className="proof-strip" aria-label="Quick facts">
          <div><strong>Work</strong><span>{projects.length} selected projects</span></div>
          <div><strong>Off-screen</strong><span>CODM &amp; EA FC</span></div>
          <div><strong>Bowen University</strong><span>Computer Science · 2026</span></div>
        </section>

        <section className="section shell" id="about">
          <div className="section-kicker"><span>01</span><p>About</p></div>
          <div className="about-layout">
            <h2>I like making ideas <em>real.</em></h2>
            <div className="body-copy">
              <p>I’m a Computer Science graduate from Bowen University and a developer who enjoys the whole build, from the first screen to the data that makes it work.</p>
              <p>Gaming is a big part of my life. Leading a CODM team made me notice how much competitive players have to manage through scattered chats and spreadsheets. That’s one reason I started building CoDM Squad Hub.</p>
              <p>For my final-year project, my partner and I built a fire and gas detection system using an ESP32, sensors, a backend, and a mobile app. Seeing a real reading turn into a phone alert taught me a lot about making separate pieces work together.</p>
              <blockquote>“I enjoy the moment an idea becomes something you can actually use.”</blockquote>
            </div>
          </div>
        </section>

        <section className="section shell" id="skills">
          <div className="section-kicker"><span>02</span><p>Skills</p></div>
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

        <section className="section projects-section" id="projects">
          <div className="shell">
            <div className="section-kicker"><span>03</span><p>Selected projects</p></div>
            <div className="section-heading project-heading">
              <h2>Selected work.</h2>
              <p>Start with three projects that show how I approach data, product design and interactive interfaces. The full collection follows below.</p>
            </div>
            <div className="featured-work" aria-label="Featured projects">
              {featuredProjects.map((project, index) => (
                <a className="featured-project" key={project.id} href={`#${project.id}`}>
                  {project.image && <img src={project.image} alt="" width="1440" height="900" loading="lazy" decoding="async" />}
                  <div className="featured-copy"><span className="featured-label">Featured {String(index + 1).padStart(2, "0")} · {project.tags[0]}</span><h3>{project.title.split(" — ")[0]}</h3><p>{project.summary}</p><span className="featured-action">Read the case study <MarkIcon name="arrow" /></span></div>
                </a>
              ))}
            </div>
            <p className="archive-label">All projects · {projects.length} builds and ongoing projects</p>
          </div>

          <nav className="project-index shell" aria-label="Jump to a project">
            {projects.map((project, index) => <a key={project.id} href={`#${project.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{project.title.split(" — ")[0]}</a>)}
          </nav>
          <div className="projects-list">
            {projects.map((project, index) => (
              <article className="project shell" key={project.id} id={project.id}>
                <div className="project-top">
                  <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                  <div className="project-title-wrap">
                    <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <h3>{project.title}</h3>
                  </div>
                  <span className="project-status"><i />{project.status}</span>
                </div>

                {project.image ? <figure className="project-preview">
                  <button type="button" onClick={() => setPreview({ image: project.image!, title: project.title })} aria-label={`Enlarge screenshot of ${project.title}`}>
                    <img src={project.image} alt={`${project.title} interface screenshot`} width="1440" height="900" loading="lazy" decoding="async" />
                    <span className="preview-open">Enlarge screenshot ↗</span>
                  </button>
                  <figcaption>Project interface screenshot · open the live preview for its current version</figcaption>
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

        <section className="section shell" id="services">
          <div className="section-kicker"><span>04</span><p>Services</p></div>
          <div className="services-layout">
            <div className="services-intro"><h2>What do you need built?</h2><p>Bring a rough idea, a brief or an existing website. I'll help you work through the scope, then agree the deliverables, timeline and cost with you.</p><a className="primary-link" href={whatsappHref} target="_blank" rel="noreferrer">Discuss a project <MarkIcon name="arrow" /></a><p className="team-note">For team projects, I work with <a href="https://dev-boyz.vercel.app" target="_blank" rel="noreferrer">Dev Boyz ↗</a>.</p></div>
            <div className="services-list">{services.map((service) => <article key={service.title}><h3>{service.title}</h3><p>{service.description}</p><a className="service-example" href={`#${service.project}`}>{service.example} <span aria-hidden="true">↗</span></a></article>)}</div>
          </div>
        </section>

        <section className="section shell" id="experience">
          <div className="section-kicker"><span>05</span><p>Background</p></div>
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
              <h2>Have an idea we could build together?</h2>
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

      <dialog className="screenshot-dialog" ref={previewDialog} onCancel={() => setPreview(null)} onClose={() => setPreview(null)} onClick={(event) => { if (event.target === event.currentTarget) setPreview(null); }} aria-labelledby="preview-title">
        {preview && <><div className="dialog-header"><h2 id="preview-title">{preview.title}</h2><button autoFocus onClick={() => setPreview(null)} aria-label="Close screenshot"><MarkIcon name="close" /></button></div><img src={preview.image} alt={`${preview.title} enlarged screenshot`} /></>}
      </dialog>
      <footer className="site-footer shell">
        <p>© 2026 Favour Imegu EwoMazino.</p>
        <span>Design &amp; development by Favour.</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </>
  );
}
