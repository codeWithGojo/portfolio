import { useEffect, useRef, useState, type MouseEvent } from 'react';

type Theme = 'light' | 'dark';

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach(meta => {
    meta.content = theme === 'dark' ? '#121214' : '#faf9f6';
    meta.removeAttribute('media');
  });
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>();
  const active = useRef<{ finish?: () => void } | null>(null);
  function finish() {
    active.current?.finish?.();
    active.current = null;
  }
  function select(next: Theme) {
    applyTheme(next);
    setTheme(next);
  }
  useEffect(() => {
    const system = matchMedia('(prefers-color-scheme: dark)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    function sync() {
      finish();
      let stored = '';
      try { stored = localStorage.getItem('imegu-theme') || ''; } catch {}
      select(stored === 'light' || stored === 'dark' ? stored : system.matches ? 'dark' : 'light');
    }
    sync();
    system.addEventListener('change', sync);
    reduced.addEventListener('change', finish);
    window.addEventListener('resize', finish);
    return () => {
      finish();
      system.removeEventListener('change', sync);
      reduced.removeEventListener('change', finish);
      window.removeEventListener('resize', finish);
    };
  }, []);

  async function toggle(event: MouseEvent<HTMLButtonElement>) {
    finish();
    const button = event.currentTarget;
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    const commit = () => {
      select(next);
      try { localStorage.setItem('imegu-theme', next); } catch {}
    };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { commit(); return; }
    const request = { finish: commit };
    active.current = request;
    try {
      const { pourPaint } = await import('./pourPaint');
      if (active.current === request) request.finish = pourPaint(button, next === 'dark', commit);
    } catch {
      if (active.current === request) finish();
    }
  }
  return <button type="button" className="world-theme" onClick={toggle} aria-label={theme ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme` : 'Toggle light and dark theme'}>
    <span className="theme-sun" aria-hidden="true">☀</span><span className="theme-moon" aria-hidden="true">☾</span>
  </button>;
}
