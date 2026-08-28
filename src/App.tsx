import { useEffect, useState } from "react";

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

const projects = [
  {
    number: "01",
    title: "CoDM Squad Hub — Cloud-Native Esports Platform",
    tags: ["React Native", "Cloud Engineering", "Esports + AI"],
    status: "Interactive v6 · live preview",
    why: "Bad connections, scattered tournament records, and team management happening across different chats cost African CODM players real matches. I wanted one serious platform where competition, team operations, player history and gaming-specific network tools actually connect.",
    built: "A mobile-first competitive esports platform with Owner HQ, T1–T4 roster management, Tournament Control, Player Passport, rankings, Scrim Finder, scouting, AI Training, VOD workflows and a Connection Check for gaming-focused ping, speed and Nigerian ISP coverage.",
    learned: "Building this pushed me beyond frontend work into event-driven cloud architecture, asynchronous jobs, auditability, player identity, network quality and how Nigerian ISP performance can change heavily by region.",
    challenge: "The hardest part is keeping official competitive history trustworthy while connecting a lot of workflows, and getting useful Nigerian ISP data without pretending limited public coverage data is more precise than it is.",
    outcome: "A clickable Expo/React Native development build backed by FastAPI foundations, cloud infrastructure docs and event-driven workflows, with the Owner HQ and AI Training flows now interactive.",
    tech: ["React Native", "Expo", "FastAPI", "PostgreSQL", "Redis", "Docker", "Terraform", "AWS", "SQS", "S3", "Gemini"],
    links: [
      { label: "GitHub", href: "https://github.com/codeWithGojo/CODM-SQUAD-HUB" },
      { label: "Interactive preview", href: "https://codm-squad-hub-preview-test-favour12.vercel.app" },
    ],
  },
  {
    number: "01",
    title: "Smart Fire Detection & Alert System",
    tags: ["Final Year Project", "IoT + Cloud Full-Stack"],
    status: "Successfully defended",
    why: "I didn’t want my final-year project to be another app made only for presentation day. A fire in a hostel room is easy to understand and hard to ignore, so we chose a problem where a fast alert could genuinely matter.",
    built: "An ESP32 rig with an MQ-2, DHT11, and buzzer streaming live readings through a Flask API into Firebase. A React Native app shows the readings and FCM sends push alerts. The local buzzer still works if the network does not.",
    learned: "How different an end-to-end system feels from separate pieces that work on their own. The circuit, API, database, app, and notifications all had to agree before the demo meant anything.",
    challenge: "Keeping detection useful when connectivity is unreliable. We treated the buzzer as a local failsafe instead of making the cloud the only path to an alert.",
    outcome: "Built, demonstrated, and successfully defended from circuit to cloud to mobile.",
    tech: ["ESP32", "MQ-2", "DHT11", "Flask", "Firebase", "React Native", "FCM"],
    links: [{ label: "GitHub", href: "https://github.com/codeWithGojo" }],
  },
  {
    number: "02",
    title: "ExpenseAI — Personal Finance Dashboard",
    tags: ["Full-Stack", "FinTech", "AI Insights"],
    status: "Redesigned & live",
    why: "Most finance apps make everyday spending feel like accounting homework. I wanted something simpler, built around Naira, that tells you what your numbers mean instead of only listing transactions.",
    built: "A responsive three-screen dashboard for checking a balance, reviewing transactions, comparing salary against expenses, and opening a useful category breakdown. The API uses JWT authentication with per-user data isolation.",
    learned: "A chart is only helpful when the question behind it is clear. I learned more from writing the budget rules and short financial explanations than I did from adding extra widgets.",
    challenge: "The hard part was making category breakdowns useful instead of decorative, while keeping the mobile view calm and every user’s records properly separated.",
    outcome: "Redesigned into a Naira-first mobile finance flow with budget progress, monthly analytics, category totals, and plain-language insights.",
    tech: ["React", "TypeScript", "Node.js", "Express", "Prisma", "SQLite", "JWT", "Responsive UI"],
    links: [
      { label: "GitHub", href: "https://github.com/codeWithGojo/ExpenseAI-redesigned" },
      { label: "Live demo", href: "https://expense-ai-redesigned.vercel.app/" },
    ],
  },
  {
    number: "03",
    title: "Cantica — Fashion Storefront",
    tags: ["Frontend", "UI/UX"],
    status: "Pre-launch · live",
    why: "I wanted to practise the parts of e-commerce that happen before checkout: brand direction, product discovery, and giving a small fashion label a clear path to launch.",
    built: "A responsive storefront with a full-bleed campaign hero, a six-piece collection, search and filters, a device-local launch bag, waitlist states, and direct contact flows.",
    learned: "A pre-launch store still has to help people browse and remember products. Clear details and saved items matter more than pretending checkout already exists.",
    challenge: "Making the product behaviour believable without inventing stock, prices, or fulfilment for a concept brand.",
    outcome: "A polished pre-launch storefront that communicates the brand honestly and is ready to grow when real inventory arrives.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design", "Local Storage", "Vercel"],
    links: [
      { label: "GitHub", href: "https://github.com/codeWithGojo/Cantica" },
      { label: "Live demo", href: "https://cantica.vercel.app" },
    ],
  },
  {
    number: "04",
    title: "PredictArena — Sports Prediction Platform",
    tags: ["Next.js", "Sports Analytics", "Prediction Models"],
    status: "Rebuilt & live",
    why: "I wanted African esports—especially CODM and EA FC—to stand beside the big leagues instead of being treated as an afterthought. PredictArena is my attempt to give those scenes the same visual weight while being honest about where the data is still thin.",
    built: "A dark, high-density prediction dashboard using real upcoming fixtures from TheSportsDB. It covers Europe’s top five football leagues, the Champions League, NBA, tennis, CODM Africa and EA FC Africa, with league filters, probability chips, explainable models and a sport-by-sport Knowledge Test.",
    learned: "How to build and explain a Poisson football model, and how difficult it is to source African esports schedules and historical results that are reliable enough to support a prediction.",
    challenge: "Making CODM Africa and EA FC Africa predictions credible without pretending a small historical sample is deep data. Community-maintained fixtures are clearly labelled, confidence is reduced, and every model exposes its inputs and caveats.",
    outcome: "A working multi-sport analysis product with live fixtures, six selectable football competitions, model reasoning, local leaderboard tracking, 2,000 generated history questions per major sport, and 100 each for CODM and EA FC.",
    tech: ["Next.js", "React", "TypeScript", "TheSportsDB API", "Poisson Model", "Local Storage", "Responsive UI"],
    links: [
      { label: "GitHub", href: "https://github.com/codeWithGojo/PredictArena" },
      { label: "Live demo", href: "https://predictarena-favour12.vercel.app" },
    ],
  },
  {
    number: "05",
    title: "AFR/INDEX — The Living Afrobeats Index",
    tags: ["Editorial Data", "Music Analytics", "Frontend"],
    status: "Living index · live",
    why: "Most Afrobeats rankings read like fan arguments with numbers added afterwards. I wanted to build one where the method is visible, the data has dates and sources, and disagreement can start with the actual weighting instead of hype.",
    built: "A dark editorial index with an All-Time 50, a researched Current 50, weekly rank movement, side-by-side era comparison, eleven weighted Current metrics, and artist files covering biographies, verified Spotify totals, awards, touring history, FIFA/EA FC soundtrack placements, and official Gold, Platinum and Diamond certifications.",
    learned: "Public music data is far messier than a polished chart suggests. Monthly audiences move daily, catalogue totals differ between trackers, and cross-era comparisons need qualitative context as much as platform numbers.",
    challenge: "Ranking real named artists means every position has to be defensible. I had to keep streaming evidence useful without letting Spotify erase the achievements of artists whose biggest work predates it.",
    outcome: "Turned a static ranking into a transparent living index with update history, sourced streaming signals, reliable artist imagery, official certification records, and a methodology readers can inspect.",
    tech: ["HTML", "CSS", "JavaScript", "Editorial Research", "Local Storage", "Spotify Data", "Vercel"],
    links: [
      { label: "GitHub", href: "https://github.com/codeWithGojo/afrobeats-index" },
      { label: "Live demo", href: "https://afrobeats-index.vercel.app/" },
    ],
  },
  {
    number: "06",
    title: "TerraScope — Living World Encyclopedia",
    tags: ["Next.js", "Interactive Data", "Editorial Research"],
    status: "Redesigned & live",
    why: "I wanted a world atlas that felt worth exploring, not another page of copied country facts. The idea was to connect the numbers to the people, places, sports and stories that make each country recognisable.",
    built: "A 195-country encyclopedia with a black-and-red world dashboard, interactive dotted map, country rankings, comparison tools, travel guides and detailed profiles. The People archive now includes 63 footballers across new generation, modern icon and legend eras, with searchable filters and expandable dossiers.",
    learned: "Country data looks clean only after a lot of decisions. Names, borders, population years, currencies and rankings all arrive in different formats. I learned to separate structured records from editorial writing so the facts can update without flattening every country into the same template.",
    challenge: "Keeping the project detailed without turning it into a wall of text. The hardest part was making 195 country records consistent while still giving the deeper profiles and football archive enough personality and context.",
    outcome: "A portfolio-scale living atlas with interactive discovery, eight ranking lenses, 195 country records and an extensive football archive covering 63 current and historic players.",
    tech: ["Next.js", "React", "TypeScript", "SVG Maps", "World Countries", "Responsive UI", "Vercel"],
    links: [
      { label: "GitHub", href: "https://github.com/codeWithGojo/terrascope-world-encyclopedia" },
      { label: "Interactive preview", href: "https://terrascope-world-encyclopedia.vercel.app" },
    ],
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
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = lightMode ? "light" : "dark";
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
        <nav className={menuOpen ? "nav-pill is-open" : "nav-pill"} aria-label="Primary navigation">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Background</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <button className="mobile-theme" onClick={() => setLightMode(!lightMode)}>{lightMode ? "Dark theme" : "Light theme"}</button>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
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
            <div className="portrait-ring"><span>FI</span><img className="portrait-photo" src="/profile.jpg" alt="Favour Imegu" onError={(event) => { event.currentTarget.style.display = "none"; }} /></div>
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
          <div><strong>01</strong><span>end-to-end system shipped</span></div>
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
              <p>For my final year project, my partner and I built a Smart Fire Detection System from scratch: ESP32 sensor rig → Flask backend → Firebase → React Native app with push alerts. One working pipeline, from circuit to cloud to phone, defended end to end.</p>
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

          <div className="projects-list">
            {projects.map((project) => (
              <article className="project shell" key={project.title}>
                <div className="project-top">
                  <span className="project-number">{project.number}</span>
                  <div className="project-title-wrap">
                    <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <h3>{project.title}</h3>
                  </div>
                  <span className="project-status"><i />{project.status}</span>
                </div>

                <div className="why-note">
                  <span>Why I built it</span>
                  <p>{project.why}</p>
                </div>

                <div className="project-notes">
                  <div><span>Built</span><p>{project.built}</p></div>
                  <div><span>Learned</span><p>{project.learned}</p></div>
                  <div><span>Challenge</span><p>{project.challenge}</p></div>
                </div>

                <div className="project-outcome"><span>Outcome</span><p>{project.outcome}</p></div>
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
                <div><p className="timeline-type">Project experience</p><h3>Smart Fire Detection System</h3><p>Designed and built, with a partner, a complete system from circuit to cloud to mobile app—and successfully defended it.</p><ul><li>Collaborated on hardware selection, circuit design, and ESP32 programming</li><li>Built a Flask + Firebase backend and a React Native (Expo) live-monitoring app</li><li>Implemented FCM push alerts and demonstrated real-time detection end to end</li></ul></div>
              </article>
              <article className="timeline-item" id="education">
                <span className="timeline-year">2022 — 2026</span>
                <div><p className="timeline-type">Education</p><h3>B.Sc. Computer Science</h3><p>Bowen University, Iwo, Nigeria.</p><p>Final year project: Smart Fire Detection System using ESP32, Flask, Firebase, and React Native—successfully defended.</p></div>
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

      <footer className="site-footer shell">
        <p>© 2026 Favour Imegu EwoMazino.</p>
        <span>Built with care, then rebuilt with more care.</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </>
  );
}
