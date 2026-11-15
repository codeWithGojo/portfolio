import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { projects, type Project } from "./projects";
import { chapters, contact, services } from "./content";
import {
  CircularIdentityIntro,
  DustGrid,
  StarboyEgg,
  PageReveal,
  StoryCursor,
} from "./WorldMotion";

const routes = [
  ["/", "Home"],
  ["/about", "About"],
  ["/work", "Work"],
  ["/hobbies", "Hobbies"],
  ["/pricing", "Pricing"],
  ["/contact", "Contact"],
];
const shortName = (p: Project) =>
  p.id === "wedding"
    ? "BlessingFoundHerBlessing"
    : p.id === "afri-index"
      ? "Afri Index"
      : p.title.split(" — ")[0];
const Button = ({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) => (
  <a
    className={secondary ? "world-button secondary" : "world-button"}
    href={href}
  >
    {children}
    <span aria-hidden="true">↗</span>
  </a>
);
function Heading({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="world-page-heading">
      <p className="world-label">{label}</p>
      <h1>{title}</h1>
      {children && <div className="world-lead">{children}</div>}
    </header>
  );
}
function Card({ project: p }: { project: Project }) {
  return (
    <article className="world-project" id={p.id}>
      <a href={`/work/${p.id}`} className="world-project-image">
        {p.image ? (
          <img
            src={p.image}
            alt={p.imageCaption || p.title}
            loading="lazy"
            width={p.imageWidth}
            height={p.imageHeight}
          />
        ) : (
          <div className="project-type-art" aria-hidden="true">
            {shortName(p)}
            <span>{p.tags[0]}</span>
          </div>
        )}
        <span className="project-open" aria-hidden="true">
          ↗
        </span>
      </a>
      <div className="project-meta">
        <span>{p.tags[0]}</span>
        <span>{p.status}</span>
      </div>
      <h3>
        <a href={`/work/${p.id}`}>{shortName(p)}</a>
      </h3>
      <p>{p.summary || p.why}</p>
      <a className="world-text-link" href={`/work/${p.id}`}>
        Behind the build <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}
function Home() {
  const afri = projects.find((p) => p.id === "afri-index")!;
  const wedding = projects.find((p) => p.id === "wedding")!;
  return (
    <>
      <CircularIdentityIntro />
      <section className="world-hero world-shell">
        <div className="hero-caption">
          <span>FAVOUR IMEGU / SOFTWARE DEVELOPER</span>
          <span>IBADAN ROOTS. A WORLD TO BUILD.</span>
        </div>
        <div className="world-hero-grid">
          <div>
            <p className="world-label">Welcome to my corner of the internet</p>
            <h1>
              Favour
              <br />
              <span>Imegu.</span>
            </h1>
            <p className="hero-statement">
              I build things for the web
              <span className="muted">
                {" "}
                — and sometimes argue about music statistics.
              </span>
            </p>
            <div className="world-actions">
              <Button href="/work">Explore my work</Button>
              <Button href="/contact" secondary>
                Hire me
              </Button>
            </div>
            <a href="/about" className="world-text-link">
              Get to know me ↗
            </a>
          </div>
          <figure className="world-portrait">
            <img
              src="/hero-graduation.webp"
              alt="Favour Imegu in his graduation outfit"
              fetchPriority="high"
            />
            <figcaption>
              <span>THE PERSON BEHIND THE PROJECTS</span>
              <span>01 / An ongoing story</span>
            </figcaption>
            <div className="portrait-stamp" aria-hidden="true">
              code.
              <br />
              learn.
              <br />
              repeat.
            </div>
          </figure>
        </div>
        <div className="world-hero-bottom">
          <span>Websites · Products · Business systems</span>
          <a href="#selected">A few things I've made ↓</a>
        </div>
      </section>
      <section id="selected" className="world-section world-shell">
        <div className="world-section-head">
          <div>
            <p className="world-label">01 / Selected work</p>
            <h2>
              Two reasons
              <br />I love building.
            </h2>
          </div>
          <p>
            Sometimes it’s curiosity. Sometimes it’s hearing how happy someone
            sounds when they see what you made.
          </p>
        </div>
        <div className="world-featured">
          <div>
            <p className="world-label">The passion project</p>
            <Card project={afri} />
          </div>
          <div className="heart-project">
            <p className="world-label">The heart project / commissioned work</p>
            <Card project={wedding} />
          </div>
        </div>
        <Button href="/work" secondary>
          Explore the project library
        </Button>
      </section>
      <section className="world-band">
        <div className="world-shell">
          <p className="world-label">02 / What I do</p>
          <div className="service-lines">
            {[
              [
                "Websites that feel like you.",
                "Business, portfolio and event websites.",
              ],
              [
                "Products with a purpose.",
                "Web applications, dashboards and tools.",
              ],
              [
                "Systems that do the work.",
                "Internal workflows and integrations.",
              ],
            ].map(([title, copy], i) => (
              <a href="/pricing" key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
                <span>↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
function CTA() {
  return (
    <section className="world-cta world-shell">
      <p className="world-label">Have something in mind?</p>
      <h2>
        Let’s make
        <br />
        something useful.
      </h2>
      <Button href="/contact">Tell me about your project</Button>
    </section>
  );
}
function About() {
  return (
    <div className="world-shell">
      <Heading label="01 / About me" title="Still curious. Still building.">
        <p>
          I’m Favour, a software developer from Ibadan. I build websites,
          products and business systems, and I’m learning as I go.
        </p>
      </Heading>
      <div className="about-editorial">
        <img
          src="/favour-graduation-2026.webp"
          alt="Favour celebrating his graduation"
          width="1536"
          height="898"
        />
        <div>
          <p className="world-label">The path here</p>
          <h2>A different kind of family practice.</h2>
          <p>
            Both my parents are practicing lawyers. Quite a few other family
            members are too. But computers were what caught my attention.
          </p>
          <p>
            By 10, I could use the major Microsoft Office applications. At 12,
            my dad enrolled me in a fun, interactive coding class during a
            holiday in Abuja. It gave that curiosity somewhere to go.
          </p>
          <p>
            I graduated from Valencia College in 2022, then studied Computer
            Science at Bowen University, a Baptist university in Iwo.
          </p>
        </div>
      </div>
      <section className="world-section philosophy">
        <p>
          University came with ups, downs and friendships that mattered. I
          consider myself an academically average student. I’m more interested
          in applying what I know than pretending grades tell the whole story.
        </p>
      </section>
      <section className="world-section world-two-col">
        <div>
          <p className="world-label">Learning to work together</p>
          <h2>Nobody is a bank of knowledge.</h2>
        </div>
        <div>
          <p>
            We all need each other. University taught me to recognise people’s
            strengths, delegate responsibilities, work under pressure and make
            things work despite limitations.
          </p>
          <p>
            Some of the people I met became my teammates in Dev Boyz. Working
            together helped me appreciate shared responsibility and learning
            from someone else’s expertise. Delegation isn’t a weakness.
          </p>
          <Button href="/work/dev-boyz" secondary>
            Meet the work of Dev Boyz
          </Button>
          <p className="acknowledgment">
            And to Professor Oyebade, my final-year supervisor: thank you for
            being part of my university journey.
          </p>
        </div>
      </section>
      <section id="skills" className="world-section">
        <p className="world-label">
          Tools & capabilities / grounded in my projects
        </p>
        <h2>From interface to infrastructure.</h2>
        <div className="capability-grid">
          {[
            ["Frontend", "React, React Native, Expo, TypeScript, HTML & CSS"],
            ["Backend", "Node.js, Express, Python, Flask, FastAPI"],
            [
              "Data & integrations",
              "PostgreSQL, Firebase, APIs and connected workflows",
            ],
            ["Design", "Responsive interfaces, Figma and product flows"],
            ["Deployment", "AWS, Terraform, GitHub Actions and Vercel"],
            [
              "Working together",
              "Delegation, problem-solving and business workflows",
            ],
          ].map(([a, b]) => (
            <article key={a}>
              <h3>{a}</h3>
              <p>{b}</p>
            </article>
          ))}
        </div>
        <a
          href="/Imegu_Favour_Resume.docx"
          download
          className="world-text-link"
        >
          Download my résumé ↓
        </a>
      </section>
      <section className="world-section">
        <h2>
          The Story Is Still Being Written.
          <StoryCursor />
        </h2>
        <Button href="/hobbies" secondary>
          Explore my personal world
        </Button>
      </section>
    </div>
  );
}
function Work() {
  const [filter, setFilter] = useState("All Projects");
  const [query, setQuery] = useState("");
  const personal = projects.filter((p) => p.id !== "wedding");
  const filtered = personal.filter(
    (p) =>
      (filter === "All Projects" ||
        (filter === "SaaS"
          ? p.id === "predictarena"
          : p.id !== "predictarena")) &&
      `${p.title} ${p.tech.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="world-shell">
      <Heading
        label="02 / The project library"
        title="Built out of curiosity. Made to be useful."
      >
        <p>
          Personal products, experiments and commissioned work. Real interfaces,
          real lessons, and a few things still taking shape.
        </p>
      </Heading>
      <section className="world-section compact">
        <div className="world-section-head">
          <h2>Personal projects</h2>
          <div className="work-controls">
            <label className="search-label">
              Find a project
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name or technology"
              />
            </label>
            <div className="filter-control" aria-label="Project category">
              {["All Projects", "SaaS", "Regular Projects"].map((f) => (
                <button
                  key={f}
                  aria-pressed={f === filter}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        {filter === "SaaS" && (
          <p className="world-note">
            PredictArena’s subscription features are in development. This
            category describes its product direction, not a completed paid
            service.
          </p>
        )}
        <p className="world-label" role="status">
          {filtered.length} project{filtered.length === 1 ? "" : "s"}
        </p>
        <DustGrid
          items={filtered}
          renderItem={(p) => <Card project={p} />}
          className="world-project-grid"
          ariaLabel="Personal projects"
        />
        {!filtered.length && (
          <p>No projects match that search. Try another name or technology.</p>
        )}
      </section>
      <section className="world-section">
        <p className="world-label">Client & commissioned work</p>
        <h2>
          Built for someone else.
          <br />
          Still deeply personal.
        </h2>
        <div className="commissioned">
          <Card project={projects.find((p) => p.id === "wedding")!} />
          <p>
            My aunt’s wedding website reminded me that a project’s best outcome
            isn’t always a number. Sometimes it’s the way someone sounds when
            they see it.
          </p>
        </div>
      </section>
      <section className="world-section">
        <p className="world-label">Currently building</p>
        <h2>The work continues.</h2>
        <div className="capability-grid">
          {projects
            .filter((p) =>
              ["afri-index", "squadhub", "predictarena"].includes(p.id),
            )
            .map((p) => (
              <article key={p.id}>
                <h3>
                  <a href={`/work/${p.id}`}>{shortName(p)} ↗</a>
                </h3>
                <p>{p.status}</p>
                <p>{p.challenge}</p>
              </article>
            ))}
        </div>
      </section>
    </div>
  );
}
function CaseStudy({ project: p }: { project: Project }) {
  const afri = p.id === "afri-index";
  const wedding = p.id === "wedding";
  return (
    <article
      className={`world-shell case-study ${wedding ? "wedding-case" : ""}`}
    >
      <Heading label={`${p.tags[0]} / ${p.status}`} title={shortName(p)}>
        <p>{p.summary || p.why}</p>
      </Heading>
      <a href="/work" className="world-text-link">
        ← Back to all work
      </a>
      {p.image && (
        <figure className="case-hero">
          <a
            href={p.image}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open full screenshot of ${shortName(p)}`}
          >
            <img
              src={p.image}
              alt={p.imageCaption || p.title}
              width={p.imageWidth}
              height={p.imageHeight}
            />
          </a>
          <figcaption>{p.imageCaption} · Open image to inspect</figcaption>
        </figure>
      )}
      {afri && (
        <section className="world-section story-feature">
          <p className="world-label">The passion project</p>
          <h2>It Started With an Argument.</h2>
          <p>
            My university roommates didn’t agree that Omah Lay deserved a place
            in the Afrobeats top 10. I started gathering streaming statistics,
            rankings and achievements to back up my argument. Somewhere along
            the way, I fell in love with building the project itself.
          </p>
          <blockquote>
            “Of everything I've built, Afri Index is probably the project
            closest to my heart. What started as an argument became something I
            genuinely fell in love with building.”
          </blockquote>
          <details>
            <summary>Why does this exist?</summary>
            <p>
              Because apparently “just agree to disagree” wasn’t enough for me.
              But loving Omah Lay doesn’t mean quietly moving him up the
              rankings. The methodology has to be transparent and defensible.
            </p>
          </details>
        </section>
      )}
      {wedding && (
        <section className="world-section story-feature">
          <p className="world-label">The heart project</p>
          <h2>The Moment That Made It Worth It.</h2>
          <p>
            I built this for my aunt, genuinely one of my favourite people. I
            put care into the little details, the visuals and the way the
            website felt.
          </p>
          <blockquote>
            My favourite moment wasn’t technical. It was hearing how happy she
            sounded when she first saw it.
          </blockquote>
          <p>
            That means more to me than any technical metric. I don’t think
            anything will take that moment away from me.
          </p>
        </section>
      )}
      <section className="world-section case-body">
        <div>
          <p className="world-label">Behind the build</p>
          <h2>What went into it.</h2>
          <div className="tech-tags">
            {p.tech.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          {p.role && <p>{p.role}</p>}
          <div className="world-actions">
            {p.links.map((l) => (
              <Button key={l.href} href={l.href} secondary>
                {l.label}
              </Button>
            ))}
          </div>
        </div>
        <div>
          {[
            ["Why it exists", p.why],
            ["Design & development", p.built],
            ["The difficult part", p.challenge],
            ["What I learned", p.learned],
            ["Where it stands", p.outcome],
          ].map(([a, b]) => (
            <section key={a}>
              <h3>{a}</h3>
              <p>{b}</p>
            </section>
          ))}
          {p.companion && (
            <section>
              <h3>{p.companion.title}</h3>
              <p>{p.companion.description}</p>
              <div className="world-actions">
                <Button href={p.companion.href} secondary>
                  Open companion tool
                </Button>
                <Button href={p.companion.github} secondary>
                  Source code
                </Button>
              </div>
            </section>
          )}
          {p.previewNote && <p className="world-note">{p.previewNote}</p>}
        </div>
      </section>
      {afri && (
        <section className="world-section">
          <h2>A project that keeps evolving.</h2>
          <div className="build-journey">
            {[
              [
                "01",
                "The roommate argument",
                "An opinion about Omah Lay became a question worth researching.",
              ],
              [
                "02",
                "The original idea",
                "Gather evidence rather than just make a louder argument.",
              ],
              [
                "03",
                "Early data gathering",
                "Streaming figures, rankings and achievements needed sources.",
              ],
              [
                "04",
                "First interface",
                "Learning through tutorials, templates and layout experiments.",
              ],
              [
                "05",
                "Design improvements",
                "Studying UI/UX and polishing the frontend one iteration at a time.",
              ],
              [
                "06",
                "Technical integrations",
                "Working through APIs, Supabase, Resend, authentication and database infrastructure along the wider development journey.",
              ],
              [
                "07",
                "The current platform",
                "A living index with an inspectable methodology; the current public build’s technologies are listed above.",
              ],
              [
                "08",
                "What comes next",
                "More reliable data and further improvements as time and budget allow. This is still evolving, not a completed commercial platform.",
              ],
            ].map(([n, t, c]) => (
              <details key={n}>
                <summary>
                  <span>{n}</span>
                  {t}
                </summary>
                <p>{c}</p>
              </details>
            ))}
          </div>
        </section>
      )}
      <CTA />
    </article>
  );
}
function Hobbies() {
  return (
    <div className="world-shell">
      <Heading
        label="03 / Outside the code"
        title="There’s a person behind the commits."
      >
        <p>
          Music arguments, competitive gaming, anime, Arsenal, and a story
          that’s still unfolding.
        </p>
      </Heading>
      <section className="hobbies-layout world-section compact">
        <article className="arsenal-feature">
          <div className="arsenal-photo-pair" aria-label="Two Arsenal favourites">
            <figure className="arsenal-player">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/1_bukayo_saka_arsenal_2025_%28cropped%29.jpg/960px-1_bukayo_saka_arsenal_2025_%28cropped%29.jpg"
                alt="Bukayo Saka on the pitch in Arsenal kit, photographed in July 2025"
                loading="lazy"
                decoding="async"
                width={960}
                height={1134}
              />
              <figcaption><span>01</span><strong>Bukayo Saka</strong></figcaption>
            </figure>
            <figure className="arsenal-player">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/1_Myles_Lewis-Skelly_arsenal_2025_%28cropped%29.jpg/960px-1_Myles_Lewis-Skelly_arsenal_2025_%28cropped%29.jpg"
                alt="Myles Lewis-Skelly on the pitch in Arsenal kit, photographed in July 2025"
                loading="lazy"
                decoding="async"
                width={960}
                height={1275}
              />
              <figcaption><span>02</span><strong>Myles Lewis-Skelly</strong></figcaption>
            </figure>
          </div>
          <div className="arsenal-copy">
            <div className="arsenal-copy-heading">
              <span className="hobby-label">01 / Arsenal</span>
              <h2>I’m an Arsenal fan.</h2>
            </div>
            <p>I make time for matchday. Sometimes the match follows me into the rest of my day.</p>
            <div className="arsenal-signoff-row">
              <span className="arsenal-signoff">NORTH LONDON, FROM NIGERIA.</span>
              <StarboyEgg />
            </div>
          </div>
          <p className="arsenal-photo-credit">
            Photos by Chensiyuan · <a href="https://commons.wikimedia.org/wiki/File:1_bukayo_saka_arsenal_2025_(cropped).jpg" target="_blank" rel="noreferrer">Saka source</a> · <a href="https://commons.wikimedia.org/wiki/File:1_Myles_Lewis-Skelly_arsenal_2025_(cropped).jpg" target="_blank" rel="noreferrer">Lewis-Skelly source</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a>. Source crops displayed within responsive frames.
          </p>
        </article>
        <div className="hobbies-notes">
          <article>
            <span className="hobby-label">On repeat</span>
            <h3>Adele. Always Adele.</h3>
            <p>
              I connect with the emotion in her music. Then there’s Afrobeats,
              rap, and the occasional argument that becomes a whole software
              project.
            </p>
            <a href="#music" className="world-text-link">
              My music universe ↓
            </a>
          </article>
          <article>
            <span className="hobby-label">In Another Universe</span>
            <h3>Gojo only lost because of plot.</h3>
            <p>
              My Hero Academia is my favourite anime overall. Satoru Gojo is my
              favourite character. Yes, both things can be true.
            </p>
            <a href="#anime" className="world-text-link">
              More than just power ↓
            </a>
          </article>
          <article>
            <span className="hobby-label">Balancing Life</span>
            <h3>Life came to nerf me.</h3>
            <p>
              My competitive CODM era involved ambitious plans, a device upgrade
              and some very uncooperative internet.
            </p>
            <a href="#life" className="world-text-link">
              The full story ↓
            </a>
          </article>
        </div>
      </section>
      <section className="world-section philosophy hobbies-reflection">
        <p className="world-label">A little perspective</p>
        <blockquote>
          “I was never obsessed with being the smartest person in the room. I
          just wanted to make a living doing something I genuinely love.”
        </blockquote>
        <p>There is more to my story than the work. These are the things that stay with me.</p>
      </section>
      <section id="life" className="world-section">
        <p className="world-label">Chapters of a life</p>
        <h2>
          How I got here.
          <br />
          More or less.
        </h2>
        <div className="life-timeline">
          {chapters.map((c, i) => (
            <PageReveal key={c.title}>
              <details className="life-chapter">
                <summary>
                  <span className="chapter-index">0{i + 1}</span>
                  <span>
                    <small>{c.time}</small>
                    <strong>{c.title}</strong>
                    <span className="chapter-preview">{c.preview}</span>
                  </span>
                  <span className="chapter-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="chapter-story">
                  {c.image && (
                    <img
                      src={c.image}
                      alt="Favour at graduation"
                      loading="lazy"
                    />
                  )}
                  <p>{c.story}</p>
                  {c.link && (
                    <a className="world-text-link" href={c.link}>
                      Explore the project ↗
                    </a>
                  )}
                </div>
              </details>
            </PageReveal>
          ))}
          <div className="timeline-ending">
            <p className="world-label">Next chapter / in progress</p>
            <h3>
              The Story Is Still Being Written.
              <StoryCursor />
            </h3>
            <a href="/work" className="world-text-link">
              See what I’m building ↗
            </a>
          </div>
        </div>
      </section>
      <section id="music" className="world-section music-universe">
        <p className="world-label">Music / The soundtrack</p>
        <h2 className="hobbies-section-title">My Fav Artists</h2>
        <div className="adele-feature">
          <div className="adele-artwork">
            <iframe
              title="Adele — Hello: official Spotify artwork and track"
              src="https://open.spotify.com/embed/track/62PaSfnXSMyLshYJrlTuL3?theme=0"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <p className="art-credit">ADELE / HELLO / 2015</p>
          </div>
          <div>
            <span className="world-label">My overall favourite</span>
            <h2>Adele.</h2>
            <p>
              Some music just meets you where you are. I relate deeply to the
              emotions she expresses. Adele gets a special place in my world.
            </p>
            <a
              className="world-text-link"
              href="https://open.spotify.com/search/Adele"
              target="_blank"
              rel="noreferrer"
            >
              Find Adele on Spotify ↗
            </a>
          </div>
        </div>
        <div className="record-grid" aria-label="A few favourite Afrobeats releases">
          {[
            { artist: "Omah Lay", release: "Boy Alone", kind: "Album", id: "6A5x0fKoL7IBjeVy0UU8lq", type: "album" },
            { artist: "Davido", release: "FIA", kind: "Single", id: "5WPEcYIwZlwVIQY9KtgbJ4", type: "track" },
            { artist: "Burna Boy", release: "Twice As Tall", kind: "Album", id: "4moiYbxseWbPD2moVhOYje", type: "album" },
            { artist: "ODUMODUBLVCK", release: "EZIOKWU", kind: "Album", id: "3vRT8WrwTtwE5jBQ5M3FGK", type: "album" },
          ].map((record) => (
            <article className="record-card" key={record.artist}>
              <div className="record-embed">
                <iframe
                  title={`${record.artist} — ${record.release} official Spotify player and cover`}
                  src={`https://open.spotify.com/embed/${record.type}/${record.id}?theme=0`}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <div className="record-meta">
                <div><strong>{record.artist}</strong><small>{record.release} / {record.kind}</small></div>
                <a href={`https://open.spotify.com/${record.type}/${record.id}`} target="_blank" rel="noreferrer" aria-label={`Open ${record.release} by ${record.artist} on Spotify`}>↗</a>
              </div>
            </article>
          ))}
        </div>
        <div className="world-two-col music-lists">
          <div>
            <h3>Music became a project.</h3>
            <p>Sometimes a simple argument about an artist turns into a whole ranking system. That's how Afri Index found its way into my work.</p>
            <a href="/work/afri-index" className="world-text-link">
              Where the music arguments went ↗
            </a>
          </div>
          <div>
            <h3>And then the queue wanders.</h3>
            <div className="artist-links">
              {[
                "EsDeeKid",
                "Drake",
                "Taylor Swift",
                "Katy Perry",
                "Sia",
                "Doja Cat",
                "Nicki Minaj",
                "Cardi B",
              ].map((artist) => (
                <a
                  key={artist}
                  href={`https://open.spotify.com/search/${encodeURIComponent(artist)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {artist} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
            <p>
              Part of what I like about EsDeeKid is the Scouse accent. That
              probably explains part of the Liverpool fascination, too.
            </p>
          </div>
        </div>
      </section>
      <section id="anime" className="world-section">
        <p className="world-label">Anime / More Than Just Power</p>
        <h2 className="hobbies-section-title">In Another Universe</h2>
        <p className="world-lead">Talent gets my attention. Growth makes me stay.</p>
        <div className="anime-grid">
          {[
            [
              "GOJO",
              "Satoru Gojo",
              "Jujutsu Kaisen",
              "Limitless talent. My favourite character.",
            ],
            [
              "YUNO",
              "Yuno",
              "Black Clover",
              "There’s definitely a pattern here.",
            ],
            [
              "YUTA",
              "Yuta Okkotsu",
              "Jujutsu Kaisen",
              "Another exceptionally gifted favourite.",
            ],
            [
              "BAKUGO",
              "Katsuki Bakugo",
              "My Hero Academia",
              "The growth is part of the appeal.",
            ],
            [
              "ENDEAVOR",
              "Endeavor",
              "My Hero Academia",
              "Accountability matters, too.",
            ],
          ].map(([art, name, series, note]) => (
            <details className="anime-card" key={name}>
              <summary>
                <span className="character-type" aria-hidden="true">
                  {art}
                </span>
                <strong>{name}</strong>
                <small>{series}</small>
                <span className="world-text-link">Why this character +</span>
              </summary>
              <p>{note}</p>
            </details>
          ))}
        </div>
        <div className="anime-reflection">
          <h3>It’s never too late to change.</h3>
          <p>
            I've always liked naturally gifted characters. Gojo, Yuno, Yuta —
            there's definitely a pattern there.
          </p>
          <p>
            But Bakugo and Endeavor are different. What makes me love them isn't
            just their strength. It's their character development.
          </p>
          <p>
            Watching them confront their flaws and try to become better reminds
            me that it's never too late to change.
          </p>
          <p>
            That doesn't mean your past disappears. It means you can still
            choose who you become.
          </p>
        </div>
      </section>
      <section className="saka-feature world-section" aria-labelledby="saka-heading">
        <div className="saka-mark" aria-hidden="true"><span>07</span><small>STARBOY / NORTH LONDON</small></div>
        <div className="saka-copy">
          <p className="world-label">Bukayo Saka / My Starboy</p>
          <h2 id="saka-heading">Saka just makes football better.</h2>
          <p>Watching Saka play for Arsenal is one of the joys of being a supporter. The talent, the courage to keep showing up, the way he carries himself — that's what I appreciate.</p>
          <a className="world-text-link" href="https://www.arsenal.com/men/players/bukayo-saka" target="_blank" rel="noreferrer">Bukayo Saka / official Arsenal profile ↗</a>
        </div>
      </section>
      <section className="world-section football-memories">
        <p className="world-label">Football / The highs and the hurts</p>
        <h2>Some matches stay with you.</h2>
        <div className="world-two-col">
          <article>
            <span className="match-score">1—0</span>
            <h3>The joy of believing.</h3>
            <p className="world-label">Arsenal v Burnley / 18 May 2026</p>
            <p>
              Kai Havertz heading in Bukayo Saka’s corner had me ecstatic. It
              reinforced that feeling: we could finally win the Premier League.
            </p>
            <a
              className="world-text-link"
              href="https://www.burnleyfootballclub.com/media-article/match-report-arsenal-1-0-burnley"
              target="_blank"
              rel="noreferrer"
            >
              Match report ↗
            </a>
          </article>
          <article>
            <span className="match-score">
              1—1 <small>3—4 pens</small>
            </span>
            <h3>The pain of losing.</h3>
            <p className="world-label">
              PSG v Arsenal / Budapest / 30 May 2026
            </p>
            <p>
              I was in an entrepreneurship exam presentation when Arsenal scored
              early. I left the hall and ran to the cafeteria—what felt like a
              kilometre—because I needed somewhere to scream and celebrate. For
              that first half, I really believed.
            </p>
            <details>
              <summary>The part that hurt</summary>
              <p>
                Then came the penalties. When Gabriel missed, I was angry. I
                felt Madueke or Zubimendi should have taken it before a
                centre-back. That’s my opinion as a supporter.
              </p>
              <p>
                After the anger came real sadness. It wasn’t just rival fans
                mocking us. I genuinely thought we would win, and that
                disappointment stayed with me.
              </p>
            </details>
            <a
              className="world-text-link"
              href="https://www.arsenal.com/news/report-psg-1-1-arsenal-aet-4-3-pens-aIZgs9c2lv6R"
              target="_blank"
              rel="noreferrer"
            >
              Official match report ↗
            </a>
          </article>
        </div>
        <div className="london-note">
          <h3>One day, North London.</h3>
          <p>
            I’d love to explore London, visit the Emirates and walk through
            historic Highbury. I also love the idea of living in Liverpool,
            partly for the accent and culture. An Arsenal fan with Liverpool on
            the wish list. I’m aware of the irony.
          </p>
        </div>
      </section>
    </div>
  );
}
function Pricing() {
  return (
    <div className="world-shell">
      <Heading label="04 / Services & pricing" title="A clear place to start.">
        <p>
          Tell me what you need. We’ll agree the scope, the deliverables and a
          price that reflects the work.
        </p>
      </Heading>
      <p className="world-note">
        Prices are quoted in Nigerian naira. The existing landing-page range is
        a guide; final quotations depend on features, content, integrations,
        hosting and maintenance.
      </p>
      <section className="package-grid world-section compact">
        {services.map((s) => (
          <article className="service-package" key={s.id}>
            <p className="world-label">{s.scope}</p>
            <h2>{s.title}</h2>
            <p>{s.for}</p>
            <strong className="package-price">
              {s.price || "Request a quote"}
            </strong>
            <ul>
              {s.includes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p className="package-upgrade">Optional: {s.upgrades}</p>
            <Button href={`/contact?service=${s.id}`} secondary>
              Discuss {s.title.toLowerCase()}
            </Button>
          </article>
        ))}
      </section>
    </div>
  );
}
function Contact() {
  const prefill = new URLSearchParams(location.search).get("service") || "";
  const [prepared, setPrepared] = useState<{
    href: string;
    method: string;
  } | null>(null);
  const [error, setError] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const d = new FormData(form);
    if (d.get("website")) {
      setError("Please try again without the hidden website field.");
      return;
    }
    const description = String(d.get("description") || "").trim();
    if (description.length < 20) {
      setError("Please describe your project in at least 20 characters.");
      return;
    }
    const method = String(d.get("method"));
    const text = `Hi Favour, I’d like to discuss a project.\n\nName: ${d.get("name")}\nEmail: ${d.get("email")}\nOrganisation: ${d.get("organisation") || "Not specified"}\nService: ${services.find((s) => s.id === d.get("service"))?.title || "Let’s discuss"}\nBudget: ${d.get("budget")}\nTimeframe: ${d.get("timeframe")}\nPreferred contact: ${method}\n\n${description}`;
    setPrepared({
      method,
      href:
        method === "WhatsApp"
          ? `${contact.whatsapp}?text=${encodeURIComponent(text)}`
          : `mailto:${contact.email}?subject=${encodeURIComponent("Project enquiry")}&body=${encodeURIComponent(text)}`,
    });
  }
  return (
    <div className="world-shell">
      <Heading label="05 / Contact" title="What are you thinking of building?">
        <p>
          A rough idea is enough to start a conversation. Tell me who it’s for
          and what you need it to do.
        </p>
      </Heading>
      <div className="contact-layout world-section compact">
        <aside>
          <h2>Let’s talk.</h2>
          <p>
            I build websites, products and business systems. Share your idea,
            timeline and the part you need help with.
          </p>
          <a
            className="world-text-link"
            href={`${contact.whatsapp}?text=${encodeURIComponent("Hi Favour, I would like to discuss a project.")}`}
          >
            WhatsApp ↗
          </a>
          <a
            className="world-text-link email-link"
            href={`mailto:${contact.email}`}
          >
            {contact.email} ↗
          </a>
          <p className="world-note">
            This form prepares your enquiry. You’ll review and send it in
            WhatsApp or your email app; nothing is submitted automatically.
          </p>
        </aside>
        <form
          onSubmit={submit}
          onChange={() => setPrepared(null)}
          className="enquiry-form"
        >
          <div className="form-row">
            <label>
              Your name
              <input name="name" autoComplete="name" required maxLength={100} />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={150}
              />
            </label>
          </div>
          <label>
            Business / organisation <span>(optional)</span>
            <input
              name="organisation"
              autoComplete="organization"
              maxLength={150}
            />
          </label>
          <label>
            Service required
            <select
              name="service"
              defaultValue={
                services.some((s) => s.id === prefill) ? prefill : ""
              }
              required
            >
              <option value="">Choose a service</option>
              {services.map((s) => (
                <option value={s.id} key={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Your project
            <textarea
              name="description"
              rows={6}
              minLength={20}
              maxLength={3000}
              required
              placeholder="Who is it for? What should it do?"
            />
          </label>
          <div className="form-row">
            <label>
              Estimated budget
              <select name="budget" required defaultValue="">
                <option value="" disabled>
                  Choose a range (NGN)
                </option>
                {[
                  "Under ₦150,000",
                  "₦150,000–₦300,000",
                  "₦300,000–₦750,000",
                  "₦750,000+",
                  "Let’s discuss",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label>
              Target timeframe
              <input
                name="timeframe"
                required
                maxLength={150}
                placeholder="e.g. Within 6 weeks / flexible"
              />
            </label>
          </div>
          <label>
            Preferred contact method
            <select name="method">
              <option>WhatsApp</option>
              <option>Email</option>
            </select>
          </label>
          <div className="honeypot" aria-hidden="true">
            <label>
              Leave this empty
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <button className="world-button" type="submit">
            Prepare my enquiry <span aria-hidden="true">↗</span>
          </button>
          {error && <p role="alert">{error}</p>}
          {prepared && (
            <div className="enquiry-ready" role="status">
              <h3>Your enquiry is ready.</h3>
              <p>
                Nothing has been sent yet. Open {prepared.method}, review the
                message, then send it.
              </p>
              <a
                className="world-button"
                href={prepared.href}
                target={prepared.method === "WhatsApp" ? "_blank" : undefined}
                rel="noreferrer"
              >
                Continue in {prepared.method} ↗
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
export default function App() {
  const path = location.pathname.replace(/\/$/, "") || "/";
  const [menu, setMenu] = useState(false);
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme || "dark",
  );
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menu) {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [menu]);
  useEffect(() => {
    // Magnetic feedback is pointer-only; touch, keyboard and reduced-motion stay stable.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;
    const interactive = document.querySelectorAll<HTMLElement>(".world-button, .world-project-image, .world-text-link, .world-header nav a");
    const cleanup: Array<() => void> = [];
    interactive.forEach((item) => {
      const move = (event: PointerEvent) => {
        const rect = item.getBoundingClientRect();
        const x = Math.max(-7, Math.min(7, (event.clientX - rect.left - rect.width / 2) * .08));
        const y = Math.max(-7, Math.min(7, (event.clientY - rect.top - rect.height / 2) * .08));
        item.style.setProperty("--magnet-x", `${x.toFixed(1)}px`);
        item.style.setProperty("--magnet-y", `${y.toFixed(1)}px`);
      };
      const reset = () => {
        item.style.removeProperty("--magnet-x");
        item.style.removeProperty("--magnet-y");
      };
      item.addEventListener("pointermove", move);
      item.addEventListener("pointerleave", reset);
      cleanup.push(() => {
        item.removeEventListener("pointermove", move);
        item.removeEventListener("pointerleave", reset);
        reset();
      });
    });
    return () => cleanup.forEach((fn) => fn());
  }, []);
  useEffect(() => {
    const legacy: Record<string, string> = {
      home: "/",
      skills: "/about#skills",
      experience: "/about",
      education: "/about",
      projects: "/work",
      about: "/about",
      background: "/about",
      hobbies: "/hobbies",
      pricing: "/pricing",
      services: "/pricing",
      contact: "/contact",
    };
    const hash = location.hash.slice(1);
    if (path === "/" && legacy[hash]) location.replace(legacy[hash]);
    else if (path === "/" && projects.some((p) => p.id === hash))
      location.replace(`/work/${hash}`);
  }, [path]);
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem("imegu-theme", next);
    } catch {}
  }
  const project = path.startsWith("/work/")
    ? projects.find((p) => path === `/work/${p.id}`)
    : undefined;
  const page =
    path === "/" ? (
      <Home />
    ) : path === "/about" ? (
      <About />
    ) : path === "/work" ? (
      <Work />
    ) : path === "/hobbies" ? (
      <Hobbies />
    ) : path === "/pricing" ? (
      <Pricing />
    ) : path === "/contact" ? (
      <Contact />
    ) : project ? (
      <CaseStudy project={project} />
    ) : (
      <div className="world-shell">
        <Heading
          label="404 / A wrong turn"
          title="This page isn’t in my world."
        />
        <Button href="/">Back home</Button>
      </div>
    );
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="world-header">
        <a href="/" className="world-logo" aria-label="Imegu World home">
          <span className="logo-prompt" aria-hidden="true">&gt;</span>
          <span className="logo-reveal">imegu</span><span>.world</span>
          <span className="logo-cursor" aria-hidden="true">_</span>
        </a>
        <nav
          id="world-nav"
          className={menu ? "open" : ""}
          aria-label="Main navigation"
        >
          {routes.map(([href, label]) => (
            <a
              key={href}
              href={href}
              aria-current={
                path === href || (href === "/work" && project)
                  ? "page"
                  : undefined
              }
            >
              {label}
            </a>
          ))}
        </nav>
        <button
          className="world-theme"
          onClick={toggle}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          <span key={theme} aria-hidden="true">
            {theme === "dark" ? "☀" : "☾"}
          </span>
        </button>
        <button
          ref={menuButton}
          className="world-menu-button"
          aria-expanded={menu}
          aria-controls="world-nav"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Close" : "Menu"}
        </button>
      </header>
      <main id="main" tabIndex={-1}>
        <PageReveal>{page}</PageReveal>
      </main>
      <footer className="world-footer world-shell">
        <div>
          <a className="world-logo" href="/">
            imegu<span>.world</span>
          </a>
          <p>
            What I build. How I think.
            <br />A little of everything else.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          {routes.slice(1).map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div>
          <a href="https://github.com/codeWithGojo">GitHub ↗</a>
          <a href={`mailto:${contact.email}`}>Email ↗</a>
          <a href={contact.whatsapp}>WhatsApp ↗</a>
          <a href="/Imegu_Favour_Resume.docx" download>
            Résumé ↓
          </a>
        </div>
        <p className="footer-end">
          © {new Date().getFullYear()} Favour Imegu. The story is still being
          written.
        </p>
      </footer>
    </>
  );
}
