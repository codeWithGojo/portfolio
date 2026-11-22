import { useEffect, useRef, useState, type FormEvent } from 'react';
import { projects } from '../projects';
import { services } from '../content';
import '../styles/ask.css';

type Answer = { text: string; href: string; label: string };
type Topic = Answer & { question: string; match: RegExp };

const topics: Topic[] = [
  { question: 'Who is Favour?', match: /who is favour|as a developer|about favour|introduce favour/i,
    text: 'Favour Imegu is a software developer from Ibadan. He builds websites, products and business systems. His interest in coding started at a holiday class in Abuja when he was twelve.', href: '/about', label: 'Meet Favour' },
  { question: 'What’s his career background?', match: /career|background|education|experience|university/i,
    text: 'Favour graduated from Valencia College in 2022, then studied Computer Science at Bowen University in Iwo. His final-year project, FireSafe, connected a fire and gas detector to a mobile app with push alerts.', href: '/about', label: 'Read his story' },
  { question: 'What are his core strengths?', match: /strength|skill|technolog|tech stack/i,
    text: 'Favour connects interfaces to working systems. In FireSafe, his academic project, that meant getting a sensor, a Flask API and a React Native app to agree on when to alert someone. The device can still sound its buzzer when the network drops.', href: '/work/firesafe', label: 'Explore FireSafe' },
  { question: 'How does he work?', match: /work style|work ethic|how does (he|favour) work|collaborat|teamwork/i,
    text: 'Favour describes learning to recognise people’s strengths, delegate responsibilities and work under pressure. He prefers applying what he knows to a practical problem and learning from the build.', href: '/about', label: 'Read about his approach' },
  { question: 'Which projects should I explore?', match: /(?:best|featured|favourite|favorite|top|his|explore|personal) projects|which projects|what has he built/i,
    text: 'For a personal project, try TerraScope, his world encyclopedia. For commissioned work, explore the invitation he built for his aunt’s wedding. It brings the couple’s story, programme and venue directions together for guests.', href: '/work', label: 'Browse the projects' },
  { question: 'Does he take client work?', match: /client work|commission|hire|available for|contact|offer.*services/i,
    text: 'Yes. Favour invites enquiries for landing pages, business websites and custom systems. Send him what you need and your timeline so he can confirm availability and scope.', href: '/contact', label: 'Discuss a project' },
  { question: 'How much does a website cost?', match: /pric|cost|charge|rates?|naira|quote/i,
    text: `His landing-page guide is ${services[0].price}. Prices are in Nigerian naira. The final quote depends on features, content, integrations, hosting and maintenance.`, href: '/pricing', label: 'See pricing' },
  { question: 'What’s the paint pour effect?', match: /paint|theme animation|theme transition/i,
    text: 'The theme toggle pours paint from the button using GSAP. Once the paint covers the screen, the theme switches and the paint dissolves. Visitors who prefer reduced motion get an instant switch.', href: '/', label: 'Visit the homepage' },
  { question: 'How does the theme toggle work?', match: /dark mode|light mode|theme toggle/i,
    text: 'Use the sun or moon button in the header. The site follows your system theme on first visit and remembers your choice in this browser when local storage is available.', href: '/', label: 'Visit the homepage' },
];

type Turn = { question: string; answer: Answer };
let recentChat: Turn[] = [];
const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

function answer(question: string, previous?: Answer): Answer {
  const query = normalize(question);
  const named = projects.find(p => [p.id, p.title.split(' — ')[0]].some(name => (' ' + query + ' ').includes(' ' + normalize(name) + ' ')));
  const context = projects.find(p => previous?.href === '/work/' + p.id);
  const topic = topics.find(t => normalize(t.question) === query || t.match.test(query));
  const followUp = /\b(stack|built with|technolog\w*|network|offline|connectivity|challenge|difficult|hardest|learn\w*|outcome|result|status|live|why|more about it|how does it work)\b/.test(query);
  const project = named || (followUp ? context : undefined);
  if (project) {
    const kind = project.id === 'wedding' ? 'Commissioned family project' : project.id === 'firesafe' ? 'Academic final-year project' : project.id === 'dev-boyz' ? 'Team project' : 'Personal project';
    let detail = project.summary || project.built;
    if (/network|offline|connectivity|challenge|difficult|hardest/.test(query)) detail = project.challenge;
    else if (/stack|built with|technolog/.test(query)) detail = project.tech.join(', ') + '.';
    else if (/learn/.test(query)) detail = project.learned;
    else if (/outcome|result|status|live/.test(query)) detail = project.outcome;
    else if (/\bwhy\b/.test(query)) detail = project.why;
    return { text: `${project.title.split(' — ')[0]} · ${kind}. ${detail}`, href: '/work/' + project.id, label: 'Read the case study' };
  }
  return topic || { text: 'I don’t have a published answer to that yet. You can ask about a named project, Favour’s background, his services or pricing.', href: '/contact', label: 'Ask Favour directly' };
}

export default function Ask() {
  const [turns, setTurns] = useState<Turn[]>(recentChat);
  const [question, setQuestion] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const latest = useRef<HTMLElement>(null);
  useEffect(() => {
    if (turns.length) latest.current?.scrollIntoView({ block: 'nearest' });
  }, [turns]);
  function ask(value: string) {
    const prompt = value.trim();
    if (!prompt) return;
    const next = [...turns, { question: prompt, answer: answer(prompt, turns.at(-1)?.answer) }];
    recentChat = next;
    setTurns(next);
    setQuestion('');
    input.current?.focus({preventScroll:true});
  }
  function reset() {
    recentChat = [];
    setTurns([]);
    setQuestion('');
    input.current?.focus();
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    ask(question);
  }
  return <section className="ask-page world-shell">
    <header className="ask-header"><p className="world-label">IMEGU.WORLD / Portfolio assistant</p>
      <h1>Ask about Favour<span>.</span></h1>
      <p>Explore the projects, the decisions behind them, and what it costs to work together.</p>
    </header>
    {turns.length === 0 && <div className="ask-starters" aria-label="Suggested questions">
      {topics.slice(0, 8).map(topic => <button key={topic.question} onClick={() => ask(topic.question)}>{topic.question}</button>)}
    </div>}
    <div role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions">
      {turns.map((turn, i) => <article className="ask-turn" key={i} ref={i === turns.length - 1 ? latest : undefined}>
        <h2>{turn.question}</h2><p>{turn.answer.text}</p><a className="world-text-link" href={turn.answer.href}>{turn.answer.label} ↗</a>
      </article>)}
    </div>
    <form className="ask-form" onSubmit={submit}>
      <label htmlFor="ask-question">{turns.length ? 'Ask a follow-up' : 'Your question'}</label>
      <div><input ref={input} id="ask-question" value={question} maxLength={400} onChange={e => setQuestion(e.target.value)} placeholder="Ask about a project or skill…" /><button disabled={!question.trim()}>Send ↑</button></div>
    </form>
    {turns.length > 0 && <button className="ask-reset" onClick={reset}>Start a new chat</button>}
  </section>;
}
