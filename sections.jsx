/* ============================================================
   sections.jsx  ·  All page sections (exported to window)
   ============================================================ */
const { useState, useEffect, useRef } = React;
const { Icon, Reveal, Counter, SectionHeader } = window;
const R = window.RESUME;

/* ---------------- HERO ---------------- */
function Hero() {
  const stageRef = useRef(null);
  useEffect(() => {
    let ctrl;
    if (stageRef.current && window.initHeroScene) {
      ctrl = window.initHeroScene(stageRef.current);
      if (ctrl) {
        window.__heroScene = ctrl;
        ctrl.setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
      }
    }
    return () => { if (ctrl) ctrl.destroy(); window.__heroScene = null; };
  }, []);

  return React.createElement('section', { className: 'hero', id: 'mission' },
    React.createElement('div', { className: 'wrap' },
      React.createElement('div', { className: 'hero-grid' },
        // left column
        React.createElement('div', { className: 'hero-copy' },
          React.createElement(Reveal, { as: 'div', className: 'hero-status' },
            React.createElement('span', { className: 'dot-live' }),
            'PLAYER ONLINE · ' + R.location.toUpperCase()
          ),
          React.createElement(Reveal, { as: 'h1', delay: 1 },
            'NAVEEN', React.createElement('br'),
            React.createElement('span', { className: 'ln2' }, 'PRASATH')
          ),
          React.createElement(Reveal, { as: 'div', delay: 2, className: 'hero-role' }, R.role + ' // LV.' + R.level),
          React.createElement(Reveal, { as: 'p', delay: 2, className: 'hero-tag' }, R.tagline),
          React.createElement(Reveal, { as: 'div', delay: 3, className: 'hero-cta' },
            React.createElement('a', { className: 'btn btn-primary', href: '#campaign' },
              React.createElement(Icon, { name: 'console' }), 'View Campaign'),
            React.createElement('a', { className: 'btn btn-ghost', href: '#contact' },
              React.createElement(Icon, { name: 'mail' }), 'Contact')
          ),
          React.createElement(Reveal, { as: 'div', delay: 4, className: 'hero-chips' },
            R.heroChips.map((c, i) =>
              React.createElement('div', { className: 'hero-chip', key: i },
                React.createElement('b', null, c.n),
                React.createElement('span', null, c.label)
              )
            )
          )
        ),
        // right column - 3D stage
        React.createElement('div', { className: 'hero-stage' },
          React.createElement('div', { id: 'hero-canvas', ref: stageRef }),
          React.createElement('div', { className: 'ring' }),
          React.createElement('div', { className: 'ring r2' }),
          React.createElement('span', { className: 'corner tl' }),
          React.createElement('span', { className: 'corner tr' }),
          React.createElement('span', { className: 'corner bl' }),
          React.createElement('span', { className: 'corner br' }),
          React.createElement('div', { className: 'float-label fl-1' }, 'BUG_CRYSTAL.OBJ'),
          React.createElement('div', { className: 'float-label fl-2' }, 'STATUS: SQUASHED')
        )
      )
    ),
    React.createElement('div', { className: 'scroll-hint' },
      React.createElement('div', { className: 'mouse' }),
      'SCROLL TO PLAY'
    )
  );
}

/* ---------------- STATS ---------------- */
function Stats() {
  return React.createElement('section', { id: 'stats' },
    React.createElement('div', { className: 'wrap' },
      React.createElement(SectionHeader, {
        kicker: 'HIGH SCORES', title: 'CAREER', glow: 'STAT SHEET',
        sub: 'Nine years of shipping titles, slaying bugs, and protecting revenue — by the numbers.',
      }),
      React.createElement('div', { className: 'stats-grid' },
        R.stats.map((s, i) =>
          React.createElement(Reveal, { className: 'stat', key: i, delay: (i % 3) + 1 },
            React.createElement('div', { className: 'stat-num' },
              React.createElement(Counter, { to: s.n, pre: s.pre, suf: s.suf })
            ),
            React.createElement('div', { className: 'stat-label' }, s.label),
            React.createElement('div', { className: 'stat-sub' }, s.sub)
          )
        )
      )
    )
  );
}

/* ---------------- CAMPAIGN ---------------- */
function Campaign() {
  return React.createElement('section', { id: 'campaign' },
    React.createElement('div', { className: 'wrap' },
      React.createElement(SectionHeader, {
        kicker: 'THE CAMPAIGN', title: 'MISSION', glow: 'LOG',
        sub: 'Two studios. Every mission cleared with a 100% on-time record.',
      }),
      React.createElement('div', { className: 'campaign' },
        R.missions.map((m, i) =>
          React.createElement(Reveal, { className: 'mission', key: i, delay: i + 1 },
            React.createElement('div', { className: 'mission-top' },
              React.createElement('span', { className: 'lvl-pill' }, m.lvl),
              React.createElement('div', { className: 'mission-h' },
                React.createElement('h3', null, m.title),
                React.createElement('div', { className: 'co' }, m.company + '  ·  ' + m.place),
                React.createElement('div', { className: 'mission-tags' },
                  m.tags.map((t, j) => React.createElement('span', { className: 'tag', key: j }, t))
                )
              ),
              React.createElement('div', { className: 'mission-when' }, m.when)
            ),
            React.createElement('div', { className: 'mission-body' },
              m.quests.map((q, j) =>
                React.createElement('div', { className: 'quest', key: j },
                  React.createElement('span', { className: 'qx' }, React.createElement(Icon, { name: 'check' })),
                  React.createElement('p', null,
                    React.createElement('b', null, q[0] + ' — '),
                    React.createElement('span', { dangerouslySetInnerHTML: { __html: q[1] } })
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}

/* ---------------- ARSENAL ---------------- */
function Arsenal() {
  return React.createElement('section', { id: 'arsenal' },
    React.createElement('div', { className: 'wrap' },
      React.createElement(SectionHeader, {
        kicker: 'THE ARSENAL', title: 'EQUIPPED', glow: 'TOOLKIT',
        sub: 'A full-stack QA loadout — methodologies, AI agents, debuggers, device clouds and analytics.',
      }),
      React.createElement('div', { className: 'arsenal' },
        R.arsenal.map((a, i) =>
          React.createElement(Reveal, { className: 'loadout', key: i, delay: (i % 2) + 1 },
            React.createElement('span', { className: 'loadout-ic' }, React.createElement(Icon, { name: a.icon })),
            React.createElement('h4', null, a.cat),
            React.createElement('span', { className: 'loadout-sub' }, a.tag),
            React.createElement('div', { className: 'chips' },
              a.items.map((it, j) => React.createElement('span', { className: 'chip', key: j }, it))
            )
          )
        )
      )
    )
  );
}

/* ---------------- SHIPPED TITLES ---------------- */
function Titles() {
  return React.createElement('section', { id: 'titles' },
    React.createElement('div', { className: 'wrap' },
      React.createElement(SectionHeader, {
        kicker: 'SHIPPED TITLES', title: 'GAME', glow: 'PORTFOLIO',
        sub: 'Flagship and instant titles tested end-to-end across mobile and social platforms.',
      }),
      React.createElement('div', { className: 'titles-grid' },
        R.titles.map((t, i) => {
          const h = t.hue;
          const bg = 'radial-gradient(120% 120% at 20% 10%, hsl(' + h + ' 95% 60% / .95), hsl(' + ((h + 50) % 360) + ' 90% 45% / .9) 70%, hsl(' + ((h + 90) % 360) + ' 80% 30%))';
          return React.createElement(Reveal, { className: 'cart tilt', key: i, delay: (i % 3) + 1 },
            React.createElement('div', { className: 'cart-art', style: { background: bg } },
              t.solo ? React.createElement('span', { className: 'cart-flag' }, 'SOLO QA') : null,
              React.createElement('span', { className: 'grain' }),
              React.createElement('span', { className: 'emboss' }, t.tag)
            ),
            React.createElement('div', { className: 'cart-body' },
              React.createElement('h4', null, t.name),
              React.createElement('p', null, t.desc),
              React.createElement('div', { className: 'cart-plat' },
                t.plats.map((p, j) => React.createElement('span', { className: 'plat', key: j }, p))
              )
            )
          );
        })
      )
    )
  );
}

/* ---------------- AI STACK ---------------- */
function AIStack() {
  return React.createElement('section', { id: 'ai' },
    React.createElement('div', { className: 'wrap' },
      React.createElement(SectionHeader, {
        kicker: 'POWER-UPS', title: 'AI-DRIVEN', glow: 'QA STACK',
        sub: 'Manual testing, revolutionized — a modern agent stack wired straight into the pipeline.',
      }),
      React.createElement(Reveal, { className: 'ai-feature' },
        React.createElement('div', { className: 'ai-banner' },
          React.createElement('span', { className: 'b-pill' }, '⚡ STACK ONLINE'),
          React.createElement('p', null, R.ai.intro)
        ),
        React.createElement('div', { className: 'ai-grid' },
          R.ai.powerups.map((p, i) =>
            React.createElement('div', { className: 'powerup', key: i },
              React.createElement('span', { className: 'pu-ic' }, React.createElement(Icon, { name: p.ic })),
              React.createElement('h4', null, p.name),
              React.createElement('p', null, p.desc),
              React.createElement('div', { className: 'pu-tools' }, '▸ ' + p.tools)
            )
          )
        )
      )
    )
  );
}

/* ---------------- TROPHIES ---------------- */
function Trophies() {
  return React.createElement('section', { id: 'trophies' },
    React.createElement('div', { className: 'wrap' },
      React.createElement(SectionHeader, {
        kicker: 'TROPHY ROOM', title: 'AWARDS &', glow: 'RECOGNITION',
        sub: 'Recognized across studios for leadership, rigor and a record-setting bug count.',
      }),
      React.createElement('div', { className: 'trophies' },
        R.trophies.map((t, i) =>
          React.createElement(Reveal, { className: 'trophy', key: i, delay: i + 1 },
            React.createElement('span', { className: 'trophy-ic' }, React.createElement(Icon, { name: t.ic })),
            React.createElement('h4', null, t.name),
            React.createElement('div', { className: 'org' }, t.org),
            React.createElement('p', null, t.desc)
          )
        )
      )
    )
  );
}

/* ---------------- OFF DUTY + EDUCATION ---------------- */
function OffDuty() {
  return React.createElement('section', { id: 'offduty' },
    React.createElement('div', { className: 'wrap' },
      React.createElement(SectionHeader, {
        kicker: 'SIDE QUESTS', title: 'OFF', glow: 'DUTY',
        sub: 'The origin story and what runs in the background.',
      }),
      React.createElement('div', { className: 'split' },
        React.createElement(Reveal, { className: 'offduty', delay: 1 },
          R.interests.map((it, i) =>
            React.createElement('div', { className: 'side', key: i },
              React.createElement('span', { className: 'side-ic' }, React.createElement(Icon, { name: it.ic })),
              React.createElement('h4', null, it.name),
              React.createElement('p', null, it.desc)
            )
          )
        ),
        React.createElement(Reveal, { className: 'edu-card', delay: 2 },
          React.createElement('span', { className: 'eyebrow' }, 'ORIGIN STORY'),
          React.createElement('h3', null, R.education.degree),
          React.createElement('div', { className: 'inst' }, R.education.inst),
          React.createElement('div', { className: 'yr' }, R.education.year)
        )
      )
    )
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  return React.createElement('section', { id: 'contact' },
    React.createElement('div', { className: 'wrap' },
      React.createElement(Reveal, { className: 'contact-card' },
        React.createElement('span', { className: 'eyebrow', style: { justifyContent: 'center' } }, 'NEW GAME +'),
        React.createElement('h2', null, "LET'S ", React.createElement('span', { className: 'glow' }, 'CO-OP')),
        React.createElement('p', null, 'Looking for a Senior QA who owns the product end-to-end? Insert coin — let’s talk.'),
        React.createElement('div', { className: 'contact-row' },
          React.createElement('a', { className: 'contact-link', href: 'mailto:' + R.email },
            React.createElement(Icon, { name: 'mail' }), R.email),
          React.createElement('a', { className: 'contact-link', href: 'tel:' + R.phone.replace(/\s/g, '') },
            React.createElement(Icon, { name: 'phone' }), R.phone),
          React.createElement('span', { className: 'contact-link' },
            React.createElement(Icon, { name: 'pin' }), R.location)
        ),
        React.createElement('div', { className: 'contact-cta' },
          React.createElement('a', {
            className: 'btn btn-primary', href: 'Naveen_Prasath_Resume.pdf',
            onClick: (e) => { e.preventDefault(); window.downloadResume && window.downloadResume(); },
          }, React.createElement(Icon, { name: 'download' }), 'Download Resume (PDF)')
        )
      ),
      React.createElement('footer', { className: 'foot' },
        React.createElement('div', { className: 'insert' }, '● INSERT COIN TO CONTINUE ●'),
        React.createElement('div', { className: 'credits' },
          R.fullName + '  ·  Senior Game QA Engineer  ·  Built as a playable résumé')
      )
    )
  );
}

Object.assign(window, { Hero, Stats, Campaign, Arsenal, Titles, AIStack, Trophies, OffDuty, Contact });
