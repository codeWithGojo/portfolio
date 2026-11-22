import ResponsiveImage from "../components/ResponsiveImage";
import { projects } from "../projects";
import DeferredIntro from "../components/DeferredIntro";
import { Button, Card, CTA } from "../components/Shared";
export default function Home() {
  const afri = projects.find((p) => p.id === "afri-index")!;
  const wedding = projects.find((p) => p.id === "wedding")!;
  return (
    <>
      <DeferredIntro />
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
              I’m a web and software developer from Ibadan, Nigeria. I build websites, web apps and business systems for people with an idea worth making useful.
              <span className="muted">{" "}I also argue about music statistics.</span>
            </p>
            <div className="world-actions">
              <Button href="/work">View my work</Button>
              <Button href="/ask" secondary>Ask about Favour</Button>
              <Button href="/contact" secondary>
                Hire me
              </Button>
            </div>
            <a href="/about" className="world-text-link">
              Get to know me ↗
            </a>
            <a href="/Imegu_Favour_Resume.pdf" download className="hero-resume world-text-link">Download résumé (PDF) ↓</a>
          </div>
          <figure className="world-portrait">
            <ResponsiveImage
              src="/hero-graduation.webp"
              alt="Favour Imegu in his graduation outfit"
              fetchPriority="high"
            />
            <figcaption>
              <span>THE PERSON BEHIND THE PROJECTS</span>
              <span>01 / An ongoing story</span>
            </figcaption>
            <a href="/about" className="portrait-stamp" aria-label="Code. Learn. Repeat. Read Favour’s story">
              code.
              <br />
              learn.
              <br />
              repeat. ↗
            </a>
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
              <a href={["/services/website-development", "/services/custom-software", "/services/erp-inventory"][i]} key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
                <span>↗</span>
              </a>
            ))}
          </div>
          <a href="/services" className="world-text-link">Explore all services ↗</a>
        </div>
      </section>
      <CTA />
    </>
  );
}
