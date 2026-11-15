import { useId, useState } from "react";
import type { Character } from "../data/hobbies";
import "../styles/interactive.css";

export function CharacterCard({ character, index = 0 }: { character: Character; index?: number }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  return <article className="character-entry" data-expanded={expanded}>
    {character.image && <img className="character-portrait" src={character.image.src} alt={character.image.alt} width={character.image.width} height={character.image.height} loading="lazy" decoding="async"/>}
    <span className="character-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
    <div className="character-summary"><p className="world-label">{character.series}</p><h3>{character.name}</h3><p>{character.note}</p></div>
    <button type="button" aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(value => !value)}>Why this character <span aria-hidden="true">{expanded ? "−" : "+"}</span></button>
    <div id={id} className="character-explanation" hidden={!expanded}><p>{character.explanation}</p></div>
  </article>;
}
