/* ============================================================
   app.jsx  ·  Boot, HUD nav, mobile menu, theme, assembly
   ============================================================ */
const { useState, useEffect, useRef } = React;
const { Hero, Stats, Campaign, Arsenal, Titles, AIStack, Trophies, OffDuty, Contact, Icon } = window;
const { TweaksPanel, TweakSection, TweakColor, TweakSelect, TweakToggle } = window;
const RES = window.RESUME;

/* ---- palette + font catalogues (mirror styles.css) ---- */
const PALETTES = [
  { key: 'arcade',    name: 'Arcade',    c: ['#00ffc8', '#9d5cff'] },
  { key: 'synthwave', name: 'Synthwave', c: ['#ff4d8d', '#22d3ee'] },
  { key: 'toxic',     name: 'Toxic',     c: ['#aaff00', '#00e676'] },
  { key: 'ember',     name: 'Ember',     c: ['#ffb300', '#ff5a5a'] },
  { key: 'ice',       name: 'Ice',       c: ['#38e1ff', '#6c8cff'] },
];
const FONTS = [
  { key: 'exo',       name: 'Exo 2',        stack: "'Exo 2', sans-serif" },
  { key: 'chakra',    name: 'Chakra Petch', stack: "'Chakra Petch', sans-serif" },
  { key: 'rajdhani',  name: 'Rajdhani',     stack: "'Rajdhani', sans-serif" },
  { key: 'audiowide', name: 'Audiowide',    stack: "'Audiowide', cursive" },
  { key: 'orbitron',  name: 'Orbitron',     stack: "'Orbitron', sans-serif" },
];
const FONT_MAP = FONTS.reduce((m, f) => (m[f.key] = f.stack, m), {});

const NAV = [
  ['mission', 'MISSION'],
  ['stats',    'STATS'],
  ['campaign', 'CAMPAIGN'],
  ['arsenal',  'ARSENAL'],
  ['titles',   'TITLES'],
  ['ai',       'AI STACK'],
  ['trophies', 'TROPHIES'],
  ['contact',  'CONTACT'],
];

/* ============================================================
   Boot Loader
   ============================================================ */
function Boot({ onEnter }) {
  const [pct, setPct] = useState(0);
  const [ready, setReady] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPct(100); setReady(true); return;
    }
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) { p = 100; clearInterval(id); setReady(true); }
      setPct(Math.floor(p));
    }, 130);
    return () => clearInterval(id);
  }, []);

  function enter() { setClosing(true); setTimeout(onEnter, 600); }

  return React.createElement('div', { className: 'boot' + (closing ? ' done' : '') },
    React.createElement('div', { className: 'boot-inner' },
      React.createElement('div', { className: 'boot-logo' }, 'NAVEEN PRASATH', React.createElement('br'), 'QA CAMPAIGN v9.0'),
      React.createElement('div', { className: 'boot-bar' },
        React.createElement('div', { className: 'boot-fill', style: { width: pct + '%' } })),
      React.createElement('div', { className: 'boot-pct' },
        ready ? 'BUILD VERIFIED · 0 BLOCKERS' : 'LOADING ASSETS ' + pct + '%'),
      ready ? React.createElement('button', { className: 'boot-start', onClick: enter }, 'PRESS START') : null
    )
  );
}

/* ============================================================
   Mobile Nav Overlay
   ============================================================ */
function MobileMenu({ open, onClose, theme, toggleTheme }) {
  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return React.createElement('div', { className: 'mob-overlay' },
    // close button
    React.createElement('button', { className: 'mob-close-btn', onClick: onClose, 'aria-label': 'Close menu' }, '✕'),
    // eyebrow
    React.createElement('div', { style: { fontFamily: 'var(--font-pixel)', fontSize: '9px', color: 'var(--teal)', letterSpacing: '2px', marginBottom: '24px' } },
      '● NAVIGATE ●'),
    // nav links
    React.createElement('nav', null,
      NAV.map(([id, label]) =>
        React.createElement('a', {
          key: id, href: '#' + id,
          onClick: onClose,
        }, label)
      )
    ),
    // theme toggle + resume
    React.createElement('div', { style: { display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap', alignItems: 'center' } },
      React.createElement('button', {
        onClick: toggleTheme,
        style: { display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '1px', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--panel)', color: 'var(--text)', cursor: 'pointer' },
      }, React.createElement(Icon, { name: theme === 'dark' ? 'sun' : 'moon' }), theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'),
      React.createElement('a', {
        className: 'mob-resume-link',
        href: 'Naveen_Prasath_Resume.pdf',
        onClick: (e) => { e.preventDefault(); window.downloadResume && window.downloadResume(); onClose(); },
      }, React.createElement(Icon, { name: 'download' }), 'DOWNLOAD RESUME')
    )
  );
}

/* ============================================================
   Main App
   ============================================================ */
function App() {
  const [theme,    setTheme]    = useState(() => localStorage.getItem('np-theme') || 'dark');
  const [palette,  setPalette]  = useState(() => localStorage.getItem('np-palette') || 'arcade');
  const [font,     setFont]     = useState(() => localStorage.getItem('np-font') || 'exo');
  const [booted,   setBooted]   = useState(() => sessionStorage.getItem('np-booted') === '1');
  const [stuck,    setStuck]    = useState(false);
  const [active,   setActive]   = useState('mission');
  const [menuOpen, setMenuOpen] = useState(false);

  // apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('np-theme', theme);
    if (window.__heroScene) window.__heroScene.setTheme(theme);
  }, [theme]);

  // apply palette
  useEffect(() => {
    document.documentElement.setAttribute('data-palette', palette);
    localStorage.setItem('np-palette', palette);
    if (window.__heroScene) window.__heroScene.setTheme(theme);
  }, [palette]);

  // apply display font
  useEffect(() => {
    document.documentElement.style.setProperty('--font-display', FONT_MAP[font] || FONT_MAP.exo);
    localStorage.setItem('np-font', font);
  }, [font]);

  // HUD sticky
  useEffect(() => {
    const fn = () => setStuck(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // scroll spy (position-based)
  useEffect(() => {
    if (!booted) return;
    const ids = NAV.map(n => n[0]);
    const fn = () => {
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.42) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, [booted]);

  function enter()       { setBooted(true); sessionStorage.setItem('np-booted', '1'); }
  function toggleTheme() { setTheme(t => t === 'dark' ? 'light' : 'dark'); }
  function closeMenu()   { setMenuOpen(false); }

  return React.createElement(React.Fragment, null,

    /* Boot screen */
    !booted ? React.createElement(Boot, { onEnter: enter }) : null,

    /* Mobile menu */
    React.createElement(MobileMenu, { open: menuOpen, onClose: closeMenu, theme, toggleTheme }),

    /* HUD */
    React.createElement('header', { className: 'hud' + (stuck ? ' stuck' : '') },

      /* Brand */
      React.createElement('div', { className: 'hud-brand' },
        React.createElement('span', { className: 'hud-badge' }, 'LV.' + RES.level),
        React.createElement('div', { className: 'hud-name' },
          'NAVEEN PRASATH',
          React.createElement('small', null, 'SENIOR GAME QA')
        )
      ),

      React.createElement('div', { className: 'hud-spacer' }),

      /* Desktop nav */
      React.createElement('nav', { className: 'hud-nav' },
        NAV.map(([id, label]) =>
          React.createElement('a', {
            key: id, href: '#' + id,
            className: active === id ? 'active' : '',
          }, label)
        )
      ),

      /* Theme toggle (desktop) */
      React.createElement('button', {
        className: 'icon-btn',
        onClick: toggleTheme,
        title: 'Toggle theme', 'aria-label': 'Toggle theme',
      }, React.createElement(Icon, { name: theme === 'dark' ? 'sun' : 'moon' })),

      /* Resume download (desktop) */
      React.createElement('a', {
        className: 'btn-resume',
        href: 'Naveen_Prasath_Resume.pdf',
        onClick: (e) => { e.preventDefault(); window.downloadResume && window.downloadResume(); },
      },
        React.createElement('span', { className: 'coin' }, React.createElement(Icon, { name: 'download' })),
        React.createElement('span', { className: 'lbl' }, 'RESUME')
      ),

      /* Hamburger (mobile only) */
      React.createElement('button', {
        className: 'icon-btn hud-burger',
        style: { display: 'none' },
        onClick: () => setMenuOpen(o => !o),
        'aria-label': 'Open menu',
      }, React.createElement(Icon, { name: 'menu' }))
    ),

    /* Page content */
    React.createElement('main', null,
      React.createElement(Hero,     null),
      React.createElement(Stats,    null),
      React.createElement(Campaign, null),
      React.createElement(Arsenal,  null),
      React.createElement(Titles,   null),
      React.createElement(AIStack,  null),
      React.createElement(Trophies, null),
      React.createElement(OffDuty,  null),
      React.createElement(Contact,  null)
    ),

    /* Tweaks panel (shown when user activates Tweaks from toolbar) */
    React.createElement(TweaksPanel, { title: 'Tweaks' },
      React.createElement(TweakSection, { label: 'Color Palette' }),
      React.createElement(TweakColor, {
        label: 'Accent scheme',
        value: (PALETTES.find(p => p.key === palette) || PALETTES[0]).c,
        options: PALETTES.map(p => p.c),
        onChange: (arr) => {
          const found = PALETTES.find(p => JSON.stringify(p.c).toLowerCase() === JSON.stringify(arr).toLowerCase());
          if (found) setPalette(found.key);
        },
      }),
      React.createElement(TweakSelect, {
        label: 'Palette name',
        value: palette,
        options: PALETTES.map(p => ({ value: p.key, label: p.name })),
        onChange: setPalette,
      }),
      React.createElement(TweakSection, { label: 'Typography' }),
      React.createElement(TweakSelect, {
        label: 'Display font',
        value: font,
        options: FONTS.map(f => ({ value: f.key, label: f.name })),
        onChange: setFont,
      }),
      React.createElement(TweakSection, { label: 'Theme' }),
      React.createElement(TweakToggle, {
        label: 'Dark mode',
        value: theme === 'dark',
        onChange: (on) => setTheme(on ? 'dark' : 'light'),
      })
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
