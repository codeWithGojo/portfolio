import { contact } from '../content';
import ThemeToggle from './ThemeToggle';

export default function SocialActionDock() {
  return (
    <nav className="world-social-dock" aria-label="Social links and theme controls">
      <a
        className="world-social-action"
        href="https://github.com/codeWithGojo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        title="GitHub"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M12 .297a12 12 0 0 0-3.797 23.38c.6.111.82-.26.82-.577 0-.285-.011-1.04-.016-2.04-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.73.082-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.42-1.305.763-1.605-2.665-.304-5.467-1.332-5.467-5.93 0-1.31.467-2.381 1.235-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 6.844c1.02.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.289 0 .319.216.694.825.576A12.001 12.001 0 0 0 12 .297Z" />
        </svg>
      </a>
      <a
        className="world-social-action"
        href="https://x.com/not_favour"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter)"
        title="X (Twitter)"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M18.901 1.153h3.68l-8.04 9.19 9.46 12.504h-7.406l-5.8-7.584-6.636 7.584H.477l8.6-9.83L.01 1.153h7.594l5.243 6.932Zm-1.291 19.494h2.039L6.448 3.237H4.26Z" />
        </svg>
      </a>
      <a
        className="world-social-action"
        href="https://www.facebook.com/share/1DvyeD19U4/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        title="Facebook"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.023 1.79-4.694 4.533-4.694 1.312 0 2.686.236 2.686.236v2.977h-1.513c-1.49 0-1.953.93-1.953 1.885v2.26h3.324l-.532 3.49h-2.792V24C19.612 23.094 24 18.1 24 12.073Z" />
        </svg>
      </a>
      <a
        className="world-social-action"
        href={`mailto:${contact.email}`}
        aria-label="Email"
        title="Email"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <rect x="3" y="5.5" width="18" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="m4 7 8 5.5L20 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <ThemeToggle />
    </nav>
  );
}
