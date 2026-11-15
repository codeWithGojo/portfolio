import MusicEmbed from "../components/MusicEmbed";
import ResponsiveImage from "../components/ResponsiveImage";
import { chapters } from "../content";
import { StarboyEgg, PageReveal, StoryCursor } from "../WorldMotion";
import { Heading } from "../components/Shared";
import { ImageGallery } from "../components/ImageGallery";
import { CharacterCard } from "../components/CharacterCard";
import { arsenalMemories, characters, sakaGallery } from "../data/hobbies";
import "../styles/interactive.css";

function FootballJournal() {
  return <section id="football" className="world-section football-journal" aria-labelledby="football-heading">
    <div className="journal-heading"><div><p className="world-label">Football / The highs and the hurts</p><h2 id="football-heading">Some matches<br/>stay with you.</h2></div><p>The result is one thing.<br/>How I remember it is another.</p></div>
    {arsenalMemories.map((memory,index) => <article className={`football-memory memory-${memory.id}`} key={memory.id}>
      <figure className="memory-portrait"><img src={memory.image} srcSet={memory.srcSet} sizes="(max-width: 760px) 90vw, 42vw" width={memory.width} height={memory.height} alt={memory.alt} loading="lazy" decoding="async"/><figcaption>{memory.caption}<span>Photo: Chensiyuan · <a href={memory.source} target="_blank" rel="noreferrer">Source</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a></span></figcaption></figure>
      <div className="memory-copy"><div className="memory-date"><span>0{index+1} / Matchday journal</span><time dateTime={memory.dateTime}>{memory.date}</time></div><p className="world-label">{memory.competition}</p><h3>{memory.title}</h3><div className="memory-result"><strong>{memory.score}</strong><span>{memory.event}{memory.penalties && <small>{memory.penalties}</small>}</span></div><p>{memory.story}</p>{memory.details && <details className="memory-more"><summary>The part that hurt <span aria-hidden="true">+</span></summary>{memory.details.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</details>}<a className="world-text-link" href={memory.report} target="_blank" rel="noreferrer">{memory.reportLabel} ↗</a></div>
    </article>)}
    <p className="journal-photo-note">The photographs are contextual portraits from 2025, not images of these matches. Source files were AI-upscaled by the original uploader; local copies are resized and encoded as WebP.</p>
    <aside className="london-note journal-london"><span className="world-label">A place on the wish list</span><h3>One day, North London.</h3><p>I’d love to explore London, visit the Emirates and walk through historic Highbury. I also love the idea of living in Liverpool, partly for the accent and culture. An Arsenal fan with Liverpool on the wish list. I’m aware of the irony.</p></aside>
  </section>;
}

export default function Hobbies() {
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
        <article className="football-intro">
          <div className="football-intro-heading"><span className="world-label">01 / Arsenal</span><StarboyEgg imageSrc="/media/saka-arsenal-shirt.webp"/></div>
          <h2>North London,<br/>from Nigeria.</h2>
          <p>I’m an Arsenal fan. I make time for matchday. Sometimes the match follows me into the rest of my day.</p>
          <ImageGallery images={sakaGallery} label="Bukayo Saka and North London artwork"/>
          <div className="football-intro-note"><h3>Saka just makes football better.</h3><p>Watching Saka play for Arsenal is one of the joys of being a supporter. The talent, the courage to keep showing up, the way he carries himself — that's what I appreciate.</p><a className="world-text-link" href="https://www.arsenal.com/men/players/bukayo-saka" target="_blank" rel="noreferrer">Bukayo Saka / official Arsenal profile ↗</a></div>
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
                    <ResponsiveImage
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
            <MusicEmbed artist="Adele" release="Hello" type="track" id="62PaSfnXSMyLshYJrlTuL3"/>
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
                <MusicEmbed artist={record.artist} release={record.release} type={record.type} id={record.id}/>
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
        <div className="character-list">{characters.map((character,index) => <CharacterCard character={character} index={index} key={character.id}/>)}</div>
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
      <section className="world-section gaming-journal" aria-labelledby="gaming-heading"><div><p className="world-label">Gaming / Competitive CODM</p><h2 id="gaming-heading">Life came<br/>to nerf me.</h2><p>I competed around Tier 2 and Tier 3. The ambition was there. The circumstances had other ideas.</p></div><div className="gaming-setup"><span className="world-label">The setup changed. Life stayed complicated.</span><ol><li><span>01</span><div><strong>iPhone 11</strong><p>Later stolen.</p></div></li><li><span>02</span><div><strong>iPhone 12</strong><p>Working with 60 FPS limitations.</p></div></li><li><span>03</span><div><strong>RedMagic 7S Pro</strong><p>A better device helped. It didn’t fix everything.</p></div></li></ol><details><summary>The honest version <span aria-hidden="true">+</span></summary><p>I improved after the upgrade, but not as much as I hoped. Bad internet, academic commitments and software projects made it difficult to put in the time.</p><p>Looking back, I’m not even certain I would have made Tier 1. That experience still matters to me, and I’m not entirely giving up.</p></details><a className="world-text-link" href="/work/squadhub">The gaming interest that became a build ↗</a></div></section>
      <FootballJournal/>
    </div>
  );
}
