import ResponsiveImage from "../components/ResponsiveImage";
import { Capabilities } from "../components/Capabilities";
import { StoryCursor } from "../WorldMotion";
import { Button, Heading } from "../components/Shared";
export default function About() {
  return (
    <div className="world-shell">
      <Heading label="01 / About me" title="Still curious. Still building.">
        <p>
          I’m Favour, a software developer from Ibadan. I build websites,
          products and business systems, and I’m learning as I go.
        </p>
      </Heading>
      <div className="about-editorial">
        <ResponsiveImage
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
      <Capabilities />
      <a href="/Imegu_Favour_Resume.pdf" download className="world-button secondary">Download résumé (PDF) ↓</a>
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
