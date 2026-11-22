import { useRef, useState, type FormEvent } from 'react';
import { projects } from '../projects';
import { services } from '../content';
import './PortfolioAssistant.css';

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
    text: 'Favour is planning a GSAP animation for the theme toggle. Thick paint will spread from the button, cover the screen while the theme switches, then dissolve to reveal the new colours. The current toggle already switches between light and dark.', href: '/', label: 'Visit the homepage' },
  { question: 'How does the theme toggle work?', match: /dark mode|light mode|theme toggle/i,
    text: 'Use the sun or moon button in the header. The site follows your system theme on first visit and remembers your choice in this browser when local storage is available.', href: '/', label: 'Visit the homepage' },
];

function answer(question: string): Answer {
  const query = question.trim().toLowerCase();
  const project = projects.find(p => [p.id, p.title.split(' — ')[0]].some(name => query.includes(name.toLowerCase())));
  if (project) {
    const kind = project.id === 'wedding' ? 'Commissioned family project' : project.id === 'firesafe' ? 'Academic final-year project' : project.id === 'dev-boyz' ? 'Team project' : 'Personal project';
    return { text: `${kind} · ${project.status}. ${project.summary || project.built}`, href: '/work/' + project.id, label: 'Read the case study' };
  }
  return topics.find(topic => topic.question.toLowerCase() === query || topic.match.test(query)) ??
    { text: 'I don’t have a published answer to that question. I can help with Favour’s background, named projects, services, pricing or the portfolio itself.', href: '/contact', label: 'Ask Favour directly' };
}

export default function PortfolioAssistant() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [question, setQuestion] = useState('');
  const [reply, setReply] = useState<{ question: string; answer: Answer } | null>(null);
  function ask(value: string) {
    if (!value.trim()) return;
    setReply({ question: value.trim(), answer: answer(value) });
    setQuestion('');
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    ask(question);
  }
  return <>
    <button type="button" className="portfolio-ask" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>Ask about Favour</button>
    <dialog ref={dialog} className="portfolio-assistant" aria-labelledby="assistant-heading">
      <header><h2 id="assistant-heading">Ask about Favour</h2><button type="button" aria-label="Close assistant" onClick={() => dialog.current?.close()}>×</button></header>
      <div className="assistant-body">
        <p>Explore Favour’s work in his own portfolio.</p>
        <div className="assistant-topics">{topics.slice(0, 8).map(topic => <button type="button" key={topic.question} onClick={() => ask(topic.question)}>{topic.question}</button>)}</div>
        <div aria-live="polite" aria-atomic="true">{reply && <article><strong>{reply.question}</strong><p>{reply.answer.text}</p><a href={reply.answer.href} onClick={() => dialog.current?.close()}>{reply.answer.label} ↗</a></article>}</div>
        <form onSubmit={submit}><label htmlFor="assistant-question">Your question</label><div><input id="assistant-question" maxLength={300} value={question} onChange={e => setQuestion(e.target.value)} /><button type="submit" disabled={!question.trim()}>Ask</button></div></form>
      </div>
    </dialog>
  </>;
}
