/* ============================================================
   components.jsx  ·  Shared UI primitives (exported to window)
   ============================================================ */
const { useState, useEffect, useRef } = React;

/* ---------- Icon library (Lucide-style strokes) ---------- */
const ICONS = {
  download: 'M12 3v12m0 0l4-4m-4 4l-4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2',
  sun: 'M12 7a5 5 0 100 10 5 5 0 000-10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  moon: 'M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z',
  check: 'M20 6L9 17l-5-5',
  target: 'M12 3a9 9 0 100 18 9 9 0 000-18zm0 4a5 5 0 100 10 5 5 0 000-10zm0 4a1 1 0 100 2 1 1 0 000-2z',
  spark: 'M12 2l2.2 6.3L20 10l-5.8 1.7L12 18l-2.2-6.3L4 10l5.8-1.7L12 2z',
  wrench: 'M14.7 6.3a4 4 0 00-5.4 5l-6 6a1.5 1.5 0 002 2l6-6a4 4 0 005-5.4l-2.3 2.3-2.1-.6-.6-2.1 2.3-2.2z',
  globe: 'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18',
  cloud: 'M6.5 18a4.5 4.5 0 01-.5-9 6 6 0 0111.6 1.5A3.5 3.5 0 0117.5 18h-11z',
  console: 'M6 9h.01M9 9h.01M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2zm11 6l3 3m0-3l-3 3',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  bug: 'M8 8a4 4 0 018 0v4a4 4 0 01-8 0V8zM2 13h4M18 13h4M3 8l3 2M21 8l-3 2M3 18l3-2M21 18l-3-2M12 4V2',
  code: 'M8 6l-6 6 6 6M16 6l6 6-6 6',
  rocket: 'M12 2c3 1 6 4 6 9a8 8 0 01-2 5l-4 1-4-1a8 8 0 01-2-5c0-5 3-8 6-9zM12 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM8 16l-2 5 4-2M16 16l2 5-4-2',
  star: 'M12 2l2.9 6.3L22 9.3l-5 4.9 1.2 7L12 17.8 5.8 21l1.2-7-5-4.9 7.1-1L12 2z',
  guitar: 'M11 13a3 3 0 11-3 3l-3 3a2 2 0 01-3-3l3-3a3 3 0 013-3l6-6 3 3-6 6zM15 6l3 3',
  medal: 'M12 13a5 5 0 100-10 5 5 0 000 10zM9 2L7 6M15 2l2 4M9 13l-1 8 4-2 4 2-1-8',
  camera: 'M4 8a2 2 0 012-2h2l1.5-2h5L17 6h1a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V8zm8 3a3 3 0 100 6 3 3 0 000-6z',
  film: 'M4 4h16v16H4V4zm0 4h16M4 16h16M8 4v16M16 4v16',
  book: 'M4 4h11a3 3 0 013 3v13a2 2 0 00-2-2H4V4zM4 4v14',
  mail: 'M3 6h18v12H3V6zm0 0l9 7 9-7',
  phone: 'M5 3h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z',
  pin: 'M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11zM12 13a3 3 0 100-6 3 3 0 000 6z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  menu: 'M3 6h18M3 12h18M3 18h18',
  xmark: 'M18 6L6 18M6 6l12 12',
};

function Icon({ name, style }) {
  const d = ICONS[name] || '';
  return (
    React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', style },
      d.split('M').filter(Boolean).map((seg, i) => React.createElement('path', { key: i, d: 'M' + seg }))
    )
  );
}

/* ---------- useReveal: fire once when element enters viewport ----------
   Uses scroll-position checks (IntersectionObserver is unreliable in
   sandboxed preview iframes), so reveals work everywhere. */
function useReveal(opts) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const vh = (opts && opts.vh) || 0.9;
    let done = false;
    const check = () => {
      if (done || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      if (r.top < window.innerHeight * vh && r.bottom > 0) {
        done = true;
        setSeen(true);
        window.removeEventListener('scroll', check);
        window.removeEventListener('resize', check);
      }
    };
    check();
    const t1 = setTimeout(check, 80);
    const t2 = setTimeout(check, 300);
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      clearTimeout(t1); clearTimeout(t2);
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);
  return [ref, seen];
}

/* ---------- Reveal wrapper ----------
   Animation is rAF-driven via inline styles (CSS transitions can freeze
   in throttled/off-screen iframes; rAF keeps running). */
function Reveal({ children, delay, as, className, style, id }) {
  const [ref, seen] = useReveal();
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setP(1); return; }
    const delayMs = (delay || 0) * 90;
    const start = Date.now();
    // setInterval (not rAF) — rAF-driven state updates can fail to flush
    // in throttled preview iframes; interval updates flush reliably.
    const id = setInterval(() => {
      const prog = Math.max(0, Math.min(1, (Date.now() - start - delayMs) / 620));
      setP(prog);
      if (prog >= 1) clearInterval(id);
    }, 16);
    const safety = setTimeout(() => { setP(1); clearInterval(id); }, delayMs + 1400);
    return () => { clearInterval(id); clearTimeout(safety); };
  }, [seen]);
  const eased = 1 - Math.pow(1 - p, 3);
  const Tag = as || 'div';
  const st = Object.assign({
    opacity: seen ? eased : 0,
    transform: 'translateY(' + ((1 - eased) * 32).toFixed(2) + 'px)',
  }, style || {});
  return React.createElement(Tag, { ref, id, className: 'reveal ' + (className || ''), style: st }, children);
}

/* ---------- Counter: counts up when visible ---------- */
function Counter({ to, pre, suf, dur }) {
  const [ref, seen] = useReveal({ threshold: 0.4 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const D = dur || 1500;
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / D);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p >= 1) clearInterval(id);
    }, 16);
    const safety = setTimeout(() => { setVal(to); clearInterval(id); }, D + 600);
    return () => { clearInterval(id); clearTimeout(safety); };
  }, [seen]);
  const display = val.toLocaleString('en-US');
  return React.createElement('span', { ref },
    (pre || ''), display, suf ? React.createElement('span', { className: 'suf' }, suf) : null
  );
}

/* ---------- GlitchText: subtle data-glitch on hover ---------- */
function GlitchText({ text, className }) {
  return React.createElement('span', {
    className: 'glitch ' + (className || ''), 'data-text': text,
  }, text);
}

/* ---------- SectionHeader ---------- */
function SectionHeader({ kicker, title, glow, sub }) {
  return React.createElement(Reveal, { className: 'sec-head' },
    React.createElement('span', { className: 'eyebrow' }, kicker),
    React.createElement('h2', { className: 'sec-title' },
      title, glow ? ' ' : null,
      glow ? React.createElement('span', { className: 'glow' }, glow) : null
    ),
    sub ? React.createElement('p', { className: 'sec-sub' }, sub) : null
  );
}

Object.assign(window, { Icon, useReveal, Reveal, Counter, GlitchText, SectionHeader });
