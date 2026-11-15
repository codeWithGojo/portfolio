import { useId, useState } from "react";
import { capabilities, type Capability } from "../data/skills";
import "../styles/interactive.css";

function TechnologyIcon({ name }: { name: string }) {
  const text: Record<string,string> = { ts: "TS", js: "JS", next: "N", html: "5", css: "3", aws: "aws" };
  return <svg className={`technology-icon icon-${name}`} viewBox="0 0 32 32" aria-hidden="true">
    {text[name] ? <><rect x="3" y="3" width="26" height="26" rx={name === "next" ? 13 : 4} fill="currentColor" opacity=".12"/><text x="16" y="22" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="Arial,sans-serif" fontWeight="700" fontSize={name === "aws" ? 12 : 16}>{text[name]}</text></> : name === "react" ? <><ellipse cx="16" cy="16" rx="14" ry="5.5"/><ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(120 16 16)"/><circle cx="16" cy="16" r="2" fill="currentColor"/></> : name === "vercel" ? <path d="m16 5 14 23H2Z" fill="currentColor" stroke="none"/> : name === "expo" ? <path d="m5 25 9-17q2-4 4 0l9 17m-17-2 6-11 6 11"/> : name === "database" ? <><ellipse cx="16" cy="7" rx="11" ry="4"/><path d="M5 7v18c0 6 22 6 22 0V7M5 16c0 6 22 6 22 0"/></> : name === "flask" ? <path d="M11 3h10m-8 0v10L5 26q-1 3 3 3h16q4 0 2-3l-7-13V3M10 20h12"/> : name === "bolt" ? <path d="m18 2-13 17h10l-1 11 13-18H17Z" fill="currentColor" stroke="none"/> : name === "terraform" ? <><path d="m3 3 10 5v11L3 14Zm13 7 10 5v11l-10-5Zm0 14 10 5v2l-10-5Z" fill="currentColor" stroke="none"/></> : name === "docker" ? <><path d="M3 16h23q4 0 4-5M3 16q0 13 14 11 10-1 12-11M6 15V9h6v6m1 0V9h6v6m1 0V9h6v6M13 8V3h6v5"/></> : <><rect x="3" y="5" width="26" height="22" rx="3"/><path d="M3 12h26M13 12v15"/></>}
  </svg>;
}

function CapabilityRow({ category, index }: { category: Capability; index: number }) {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(index === 0);
  const id = useId();
  const technology = category.technologies[selected];
  return <details className="capability-row" open={expanded} onToggle={event => setExpanded(event.currentTarget.open)}>
    <summary><span className="capability-index">0{index + 1}</span><div><h3>{category.title}</h3><p>{category.short}</p></div><div className="capability-preview" aria-hidden="true">{category.technologies.slice(0,3).map(tech => <TechnologyIcon key={tech.name} name={tech.icon}/>)}</div><span className="capability-plus" aria-hidden="true">{expanded ? "−" : "+"}</span></summary>
    <div className="capability-body"><p>{category.description}</p><div className="technology-buttons" aria-label={`${category.title} technologies`}>{category.technologies.map((tech,i) => <button key={tech.name} type="button" aria-pressed={selected === i} aria-controls={id} onClick={() => setSelected(i)}><TechnologyIcon name={tech.icon}/><span>{tech.name}</span></button>)}</div><div id={id} className="technology-projects" aria-live="polite"><span>See {technology.name} in the work</span><div key={technology.name}>{technology.projects.map(project => <a key={project.id} href={`/work/${project.id}`}>{project.label}<span aria-hidden="true">↗</span></a>)}</div></div></div>
  </details>;
}

export function Capabilities() { return <section id="skills" className="world-section capabilities-showcase"><p className="world-label">Tools & capabilities / grounded in my projects</p><h2>From interface<br/>to infrastructure.</h2><p className="capabilities-intro">Open a category. Pick a tool. See where I’ve put it to work.</p><div>{capabilities.map((category,index) => <CapabilityRow key={category.id} category={category} index={index}/>)}</div></section>; }
