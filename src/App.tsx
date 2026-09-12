import { useEffect, useRef, useState } from "react";
import { projects } from "./projects";

const skills = [
  {
    index: "01",
    title: "Cloud platforms",
    note: "Provisioning resources and learning how the pieces behave once they leave localhost.",
    tools: ["AWS", "Azure", "Google Cloud"],
  },
  {
    index: "02",
    title: "Infrastructure & DevOps",
    note: "Automating deployments, watching system health, and removing repetitive work.",
    tools: ["Terraform", "Docker", "Kubernetes", "CI/CD", "Linux"],
  },
  {
    index: "03",
    title: "Programming & data",
    note: "The backend layer that helps sensors, APIs, and storage speak to one another.",
    tools: ["Python", "Flask", "Databases"],
  },
  {
    index: "04",
    title: "IoT & embedded",
    note: "Where my interest started: getting useful data off a physical device and into a real system.",
    tools: ["ESP32", "IoT", "Sensors"],
  },
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
          <div className="portrait-wrap" aria-label="Favour Imegu">
            <div className="portrait-ring"><span>FI</span></div>
            <span className="availability-dot" title="Open to opportunities" />
          </div>

          <p className="eyebrow"><span /> DevOps &amp; Cloud Engineering · Nigeria</p>
          <h1>Hi, I’m Favour.<br /><em>I build the systems behind the screen.</em></h1>
          <p className="hero-copy">I’m a Computer Science graduate and aspiring DevOps engineer. My work lives in the space between hardware sending data and a person seeing it update in real time.</p>
          <p className="hero-copy secondary">Right now I’m deep in AWS, Terraform, Docker, and the automation that keeps systems running without someone constantly watching them.</p>
          <div className="role-line" aria-label="Roles and interests"><span>DevOps Engineer</span><span>Cloud Engineer</span><span>Infrastructure Builder</span><span>Automation Enthusiast</span></div>
          <div className="hero-actions">
            <a className="primary-link" href="#projects">See what I’ve built <MarkIcon name="arrow" /></a>
            <a className="text-link" href="mailto:Imegufavour30@gmail.com">Imegufavour30@gmail.com</a>
          </div>
          <div className="now-line"><span className="status-pulse" /> Open to cloud and DevOps opportunities</div>
        </section>

        <section className="proof-strip" aria-label="Quick facts">
          <div><strong>{String(projects.length).padStart(2, "0")}</strong><span>selected projects</span></div>
          <div><strong>06+</strong><span>cloud &amp; infrastructure tools</span></div>
          <div><strong>2026</strong><span>Bowen University graduate</span></div>
        </section>

        <section className="section shell" id="about">
          <div className="section-kicker"><span>01</span><p>About</p></div>
          <div className="about-layout">
            <h2>I care about what happens <em>after</em> the demo works.</h2>
            <div className="body-copy">
              <p>I’m a Computer Science graduate from Bowen University with a strong pull toward systems that stay reliable long after they’re presented.</p>
              <p>I started close to the hardware, working with sensors and embedded systems, then kept moving up the stack into cloud infrastructure and DevOps. That path still shapes how I think: follow the data, understand every handoff, and make the whole thing easier to trust.</p>
              <p>For my final year project, my partner and I built a Smart Fire Detection System from scratch: ESP32 sensor rig → Flask backend → Supabase → React Native app with push alerts. One working pipeline, from circuit to cloud to phone, defended end to end.</p>
              <blockquote>“I like building the part people only notice when it stops working.”</blockquote>
            </div>
          </div>
        </section>

        <section className="section shell" id="skills">
          <div className="section-kicker"><span>02</span><p>Skills</p></div>
          <div className="section-heading">
            <h2>Tools I use—and what I use them for.</h2>
            <p>I’m still learning, but I prefer learning by making the pieces talk to each other.</p>
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
        </section>

        <section className="section projects-section" id="projects">
          <div className="shell">
            <div className="section-kicker"><span>03</span><p>Selected projects</p></div>
            <div className="section-heading project-heading">
              <h2>The finished work—and the messy middle.</h2>
              <p>Not just what I shipped. These are the reasons, lessons, and problems I had to work through.</p>
            </div>
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
                  <figcaption>Project screenshot · September 2026</figcaption>
                </figure> : <div className="preview-note"><span>{project.id === "firesafe" ? "ESP32 → Flask → Supabase → Expo" : "Project preview"}</span><p>{project.previewNote || "A current screenshot is not yet available."}</p></div>}
                <div className="why-note">
                  <span>Why I built it</span>
                  <p>{project.why}</p>
                </div>

                <details className="project-details">
                  <summary>Built, learned &amp; challenge <span>Read the project story</span></summary>
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

        <section className="section shell" id="experience">
          <div className="section-kicker"><span>04</span><p>Background</p></div>
          <div className="background-grid">
            <div className="background-heading">
              <h2>Learning in public. Building for real.</h2>
              <p>My path so far is short, but every step has moved me closer to reliable systems work.</p>
            </div>
            <div className="timeline">
              <article className="timeline-item">
                <span className="timeline-year">2026</span>
                <div><p className="timeline-type">Experience</p><h3>Cloud Engineering Intern (IT)</h3><p>Worked on cloud infrastructure setup, automation scripts, and monitoring solutions during Industrial Training.</p><ul><li>Assisted in deploying and managing cloud resources</li><li>Wrote automation scripts for infrastructure tasks</li><li>Monitored system performance and reliability</li></ul></div>
              </article>
              <article className="timeline-item">
                <span className="timeline-year">2025 — 2026</span>
                <div><p className="timeline-type">Project experience</p><h3>Smart Fire Detection System</h3><p>Designed and built, with a partner, a complete system from circuit to cloud to mobile app—and successfully defended it.</p><ul><li>Collaborated on hardware selection, circuit design, and ESP32 programming</li><li>Built a Flask + Supabase backend and a React Native (Expo) live-monitoring app</li><li>Implemented Expo Push push alerts and demonstrated real-time detection end to end</li></ul></div>
              </article>
              <article className="timeline-item" id="education">
                <span className="timeline-year">2022 — 2026</span>
                <div><p className="timeline-type">Education</p><h3>B.Sc. Computer Science</h3><p>Bowen University, Iwo, Nigeria.</p><p>Final year project: Smart Fire Detection System using ESP32, Flask, Supabase, and React Native—successfully defended.</p></div>
              </article>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="shell contact-layout">
            <div>
              <p className="eyebrow"><span /> Get in touch</p>
              <h2>Have a role, a project, or a stubborn system problem?</h2>
            </div>
            <div className="contact-copy">
              <p>Whether it’s a question about one of my projects, a cloud opportunity, or infrastructure in general—my inbox is open. Let’s build something reliable together.</p>
              <a className="primary-link" href="mailto:Imegufavour30@gmail.com">Say hello <MarkIcon name="arrow" /></a>
            </div>
          </div>
          <div className="shell contact-cards">
            <a href="mailto:Imegufavour30@gmail.com"><span>Email</span><strong>Imegufavour30@gmail.com</strong></a>
            <a href="https://github.com/codeWithGojo" target="_blank" rel="noreferrer"><span>GitHub</span><strong>github.com/codeWithGojo</strong></a>
            <div><span>Availability</span><strong>Open to opportunities</strong></div>
          </div>
        </section>
      </main>

      <dialog className="screenshot-dialog" ref={previewDialog} onCancel={() => setPreview(null)} onClose={() => setPreview(null)} onClick={(event) => { if (event.target === event.currentTarget) setPreview(null); }} aria-labelledby="preview-title">
        {preview && <><div className="dialog-header"><h2 id="preview-title">{preview.title}</h2><button autoFocus onClick={() => setPreview(null)} aria-label="Close screenshot"><MarkIcon name="close" /></button></div><img src={preview.image} alt={`${preview.title} enlarged screenshot`} /></>}
      </dialog>
      <footer className="site-footer shell">
        <p>© 2026 Favour Imegu EwoMazino.</p>
        <span>Built with care, then rebuilt with more care.</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </>
  );
}
