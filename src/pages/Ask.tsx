import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { shortName } from '../components/Shared';
import { projectKind, projects, type Project } from '../projects';
import { services } from '../content';
import '../styles/ask.css';

type Answer = { text: string; href: string; label: string; projectId?: string; intent?: string; serviceId?: string };
type Topic = Answer & { question: string; match: RegExp };

const topics: Topic[] = [
  { question: 'Who is Favour?', match: /who is favour|as a developer|about favour|introduce favour/i,
    text: 'Favour Imegu is a software developer from Ibadan. He builds websites, products and business systems. His interest in coding started at a holiday class in Abuja when he was twelve.', href: '/about', label: 'Meet Favour' },
  { question: 'What’s his career background?', match: /career|background|education|experience|university/i,
    text: 'Favour graduated from Valencia College in 2022, then studied Computer Science at Bowen University in Iwo. His final-year project, FireSafe, connected a fire and gas detector to a mobile app with push alerts.', href: '/about', label: 'Read his story' },
  { question: 'What are his core strengths?', match: /strength|skill|technolog|tech stack/i,
    text: 'Favour connects interfaces to working systems. In FireSafe, his academic project, that meant getting a sensor, a Flask API and a React Native app to agree on when to alert someone. The device can still sound its buzzer when the network drops.', href: '/work/firesafe', label: 'Explore FireSafe', projectId: 'firesafe' },
  { question: 'How does he work?', match: /work style|work ethic|how does (he|favour) work|collaborat|teamwork/i,
    text: 'Favour describes learning to recognise people’s strengths, delegate responsibilities and work under pressure. He prefers applying what he knows to a practical problem and learning from the build.', href: '/about', label: 'Read about his approach' },
  { question: 'Which projects should I explore?', match: /(?:best|featured|favourite|favorite|top|his|explore|personal) projects|which projects|what has he built/i,
    text: 'For a personal project, try TerraScope, his world encyclopedia. For commissioned work, explore the invitation he built for his aunt’s wedding. It brings the couple’s story, programme and venue directions together for guests.', href: '/work', label: 'Browse the projects' },
  { question: 'Does he take client work?', match: /client work|commission|hire|available for|contact|offer.*services/i,
    text: 'Yes. Favour invites enquiries for landing pages, business websites and custom systems. Send him what you need and your timeline so he can confirm availability and scope.', href: '/contact', label: 'Discuss a project' },
  { question: 'How much does a website cost?', match: /pric|cost|charge|\brates?\b|naira|quote|how much/i,
    text: `His landing-page guide is ${services[0].price}. Prices are in Nigerian naira. The final quote depends on features, content, integrations, hosting and maintenance.`, href: '/contact?service=landing-page', label: 'Discuss a landing page', serviceId: 'landing-page' },
  { question: 'What’s the paint pour effect?', match: /paint|theme animation|theme transition/i,
    text: 'The theme toggle pours paint from the button using GSAP. Once the paint covers the screen, the theme switches and the paint dissolves. Visitors who prefer reduced motion get an instant switch.', href: '/', label: 'Visit the homepage' },
  { question: 'How does the theme toggle work?', match: /dark mode|light mode|theme toggle/i,
    text: 'Use the sun or moon button in the header. The site follows your system theme on first visit and remembers your choice in this browser when local storage is available.', href: '/', label: 'Visit the homepage' },
];

type Turn = { question: string; answer: Answer };
const conversations = new Map<string, Turn[]>();
const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const enquiries: Record<string, RegExp> = {
  'landing-page': /landing page|one page site/,
  'website-development': /business (website|site)|company (website|site)/,
  portfolio: /portfolio (website|site)|personal website/,
  'ecommerce-development': /e ?commerce|online (store|shop)/,
  'custom-software': /custom software|web app|saas/,
  'erp-inventory': /erp|inventory|internal system/,
  maintenance: /maintenance|maintain|ongoing support/,
  integrations: /integration|automation/,
};

const intents = [
  { field: 'challenge', prompt: 'What was the hardest part?', match: /hardest|trickiest|toughest|biggest hurdle|challeng|difficult|struggl|obstacle|hard to|tricky/ },
  { field: 'learned', prompt: 'What did Favour learn?', match: /learn|lesson|takeaway|take away|teach|taught/ },
  { field: 'tech', prompt: 'What tools did he use?', match: /\bstack\b|built (with|using)|technolog|tools|framework|language|what.*use(d)? to build|what did (he|you|favour) use/ },
  { field: 'role', prompt: 'What did Favour contribute?', match: /contribut|\brole\b|responsib|his part|work on personally|personally (build|handle)|what part did .* (play|build)|what was .* part/ },
  { field: 'outcome', prompt: 'What has shipped?', match: /outcome|result|status|\blive\b|ship|launch|finished|released|available now/ },
  { field: 'why', prompt: 'What inspired the project?', match: /inspir|motiv|what problem|why.*(build|start|exist|make)|purpose/ },
  { field: 'built', prompt: 'How does it work?', match: /how (does|did|is)|what does|tell me more|what.*(build|built|do)\b/ },
] as const;

function suggestions(project: Project, turns: Turn[]) {
  const choices = intents.map(intent => ({
    field: intent.field,
    prompt: project.id === 'firesafe' && intent.field === 'challenge' ? 'Why does the buzzer work offline?' : intent.prompt,
  }));
  const asked = turns.filter(t => t.answer.projectId === project.id).map(t => t.answer.intent);
  // Ask about unexplored details first, then revisit the least recently discussed ones.
  return choices.sort((a,b) => asked.lastIndexOf(a.field) - asked.lastIndexOf(b.field)).slice(0,2).map(c => c.prompt);
}

function answer(question: string, context?: Project, previous?: Answer): Answer {
  const query = normalize(question);
  const named = projects.flatMap(p => [p.id, shortName(p), p.title.split(' — ')[0]].map(name => ({p, name: normalize(name)})))
    .sort((a,b) => b.name.length - a.name.length)
    .find(({name}) => (' ' + query + ' ').includes(' ' + name + ' '))?.p;
  const project = named || context;
  const topic = topics.find(t => normalize(t.question) === query || t.match.test(query));
  const service = services.find(s => enquiries[s.id]?.test(query));
  const commercial = /price|pricing|cost|charge|how much|quote|budget|enquir|hire|discuss|need a|want a|can (he|you|favour) build/.test(query);
  const followOnQuote = previous?.serviceId && /enquir|quote|discuss|contact|go ahead|interested|book|how much/.test(query);
  if ((service && (commercial || previous?.serviceId)) || followOnQuote) {
    const selected = service || services.find(s => s.id === previous?.serviceId)!;
    return { text: selected.price ? `Favour’s guide for a landing page is ${selected.price}. The final quote depends on scope.` :
      `Favour quotes each ${selected.title.toLowerCase()} enquiry individually. The published scope covers ${selected.scope.toLowerCase()}.`,
      href: '/contact?service=' + selected.id, label: selected.id === 'landing-page' ? 'Discuss a landing page' : 'Discuss ' + selected.title.toLowerCase(), serviceId: selected.id };
  }
  if (project && commercial && !service && (named || /\b(it|this project|that project)\b/.test(query))) {
    return {text: 'The case study does not publish a project fee. Favour can quote a similar build once you share the scope.', href:'/contact', label:'Discuss a similar project', projectId:project.id};
  }
  const offline = project?.id === 'firesafe' && /offline|network|internet|connectivity|buzzer/.test(query);
  const intent = offline ? intents[0] : intents.find(i => i.match.test(query));
  if (project && (named || intent && (!topic || intent.field === 'tech'))) {
    const field = intent?.field;
    const info = field === 'tech' ? project.tech.join(', ') + '.' : field ? project[field] : project.summary || project.built;
    return {text: `${shortName(project)} · ${projectKind(project)}. ${info}`, href: '/work/' + project.id,
      label: 'Read the case study', projectId: project.id, intent: field};
  }
  return topic || { text: 'I don’t have a published answer to that yet. You can ask about a named project, Favour’s background, his services or pricing.', href: '/contact', label: 'Ask Favour directly' };
}

export default function Ask() {
  const { search } = useLocation();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const seed = ready ? projects.find(p => p.id === new URLSearchParams(search).get('project')) : undefined;
  return <Conversation key={seed?.id || 'general'} seed={seed}/>;
}

function Conversation({seed}: {seed?: Project}) {
  const key = seed?.id || 'general';
  const [turns, setTurns] = useState<Turn[]>(() => conversations.get(key) || []);
  const lastProject = turns.slice().reverse().find(turn => turn.answer.projectId)?.answer.projectId;
  const project = projects.find(p => p.id === lastProject) || seed;
  const [question, setQuestion] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const latest = useRef<HTMLElement>(null);
  useEffect(() => {
    if (turns.length) latest.current?.scrollIntoView({ block: 'nearest' });
  }, [turns]);
  function ask(value: string) {
    const prompt = value.trim();
    if (!prompt) return;
    const next = [...turns, { question: prompt, answer: answer(prompt, project, turns.at(-1)?.answer) }];
    conversations.set(key, next);
    setTurns(next);
    setQuestion('');
    input.current?.focus({preventScroll:true});
  }
  function reset() {
    conversations.delete(key);
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
    {turns.length === 0 && !project && <div className="ask-starters" aria-label="Suggested questions">
      {topics.slice(0, 8).map(topic => <button key={topic.question} onClick={() => ask(topic.question)}>{topic.question}</button>)}
    </div>}
    <div role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions">
      {turns.map((turn, i) => <article className="ask-turn" key={i} ref={i === turns.length - 1 ? latest : undefined}>
        <h2>{turn.question}</h2><p>{turn.answer.text}</p><a className="world-text-link" href={turn.answer.href}>{turn.answer.label} ↗</a>
      </article>)}
    </div>
    {project && <div className="ask-context">
      <a className="world-text-link" href={`/work/${project.id}`}>{shortName(project)} · Case study ↗</a>
      <div className="ask-starters" aria-label="Project follow-ups">
        {suggestions(project, turns).map(prompt => <button key={prompt} onClick={() => ask(prompt)}>{prompt}</button>)}
      </div>
    </div>}
    <form className="ask-form" onSubmit={submit}>
      <label htmlFor="ask-question">{turns.length ? 'Ask a follow-up' : 'Your question'}</label>
      <div><input ref={input} id="ask-question" value={question} maxLength={400} onChange={e => setQuestion(e.target.value)} placeholder="Ask about a project or skill…" /><button disabled={!question.trim()}>Send ↑</button></div>
    </form>
    {turns.length > 0 && <button className="ask-reset" onClick={reset}>Start a new chat</button>}
  </section>;
}
