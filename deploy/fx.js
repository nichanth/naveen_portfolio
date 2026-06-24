/* ============================================================
   fx.js  ·  Global scroll + mouse reactive graphics layer
   - constellation particle field (parallax on mouse + scroll)
   - floating arcade glyphs (multi-depth parallax)
   - custom game reticle cursor
   - scroll progress beam
   All loops use setInterval (rAF state can stall in throttled
   iframes); pointer math is lerped for smoothness.
   ============================================================ */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = matchMedia('(hover: none), (pointer: coarse)').matches;

  // shared pointer state (normalised -1..1 from viewport centre)
  const M = { tx: 0, ty: 0, x: 0, y: 0, px: 0, py: 0 };
  function onMove(e) {
    const p = e.touches ? e.touches[0] : e;
    M.tx = (p.clientX / window.innerWidth - 0.5) * 2;
    M.ty = (p.clientY / window.innerHeight - 0.5) * 2;
    M.px = p.clientX; M.py = p.clientY;
  }
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: true });

  /* ---------- theme accent helper (reads live CSS vars) ---------- */
  function hexToRgb(hex) {
    hex = (hex || '').trim();
    const m = hex.replace('#', '');
    if (m.length === 3) {
      const r = parseInt(m[0] + m[0], 16), g = parseInt(m[1] + m[1], 16), b = parseInt(m[2] + m[2], 16);
      return r + ',' + g + ',' + b;
    }
    if (m.length === 6) {
      const r = parseInt(m.slice(0, 2), 16), g = parseInt(m.slice(2, 4), 16), b = parseInt(m.slice(4, 6), 16);
      return r + ',' + g + ',' + b;
    }
    return '0,255,200';
  }
  let _acc = { teal: '0,255,200', purple: '157,92,255' };
  function refreshAccents() {
    const cs = getComputedStyle(document.documentElement);
    _acc = {
      teal: hexToRgb(cs.getPropertyValue('--teal')),
      purple: hexToRgb(cs.getPropertyValue('--purple')),
    };
  }
  function accents() { return _acc; }
  refreshAccents();
  new MutationObserver(refreshAccents).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-palette'] });

  /* ========================================================
     1 · CONSTELLATION FIELD  (fixed canvas behind content)
     ======================================================== */
  function initField() {
    const cvs = document.createElement('canvas');
    cvs.id = 'fx-field';
    cvs.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;';
    document.body.appendChild(cvs);
    const ctx = cvs.getContext('2d');

    let W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);
    const P = [];
    const COUNT = window.innerWidth < 640 ? 34 : 64;

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      cvs.width = W * DPR; cvs.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      if (!P.length) {
        for (let i = 0; i < COUNT; i++) {
          P.push({
            x: Math.random() * W, y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            r: 0.6 + Math.random() * 1.8,
            depth: 0.3 + Math.random() * 1.2,        // parallax strength
            col: Math.random() > 0.5 ? 'teal' : 'purple',
          });
        }
      }
    }
    window.addEventListener('resize', resize);
    resize();

    let scrollY = window.scrollY;
    window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

    setInterval(() => {
      if (!W) return;
      M.x += (M.tx - M.x) * 0.06;
      M.y += (M.ty - M.y) * 0.06;
      const a = accents();
      ctx.clearRect(0, 0, W, H);

      const ox = M.x * 26;                 // mouse parallax offset
      const oy = M.y * 26;
      const sy = (scrollY * 0.06) % (H + 200);  // gentle scroll drift

      // update + draw points
      for (const p of P) {
        if (!reduced) { p.x += p.vx; p.y += p.vy; }
        if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
        p.sx = p.x + ox * p.depth;
        p.sy = (p.y - sy * p.depth) % (H + 40);
        if (p.sy < -20) p.sy += H + 40;
        const c = p.col === 'teal' ? a.teal : a.purple;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c},0.55)`;
        ctx.fill();
      }
      // constellation lines
      for (let i = 0; i < P.length; i++) {
        for (let j = i + 1; j < P.length; j++) {
          const dx = P[i].sx - P[j].sx, dy = P[i].sy - P[j].sy;
          const d2 = dx * dx + dy * dy;
          if (d2 < 17000) {
            const al = (1 - d2 / 17000) * 0.22;
            ctx.beginPath();
            ctx.moveTo(P[i].sx, P[i].sy);
            ctx.lineTo(P[j].sx, P[j].sy);
            ctx.strokeStyle = `rgba(${a.teal},${al.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      // pointer halo + nearest links
      if (!isTouch && M.px) {
        ctx.beginPath();
        ctx.arc(M.px, M.py, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${a.teal},0.9)`;
        ctx.fill();
        for (const p of P) {
          const dx = p.sx - M.px, dy = p.sy - M.py;
          const d2 = dx * dx + dy * dy;
          if (d2 < 24000) {
            const al = (1 - d2 / 24000) * 0.5;
            ctx.beginPath();
            ctx.moveTo(M.px, M.py);
            ctx.lineTo(p.sx, p.sy);
            ctx.strokeStyle = `rgba(${a.purple},${al.toFixed(3)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
    }, reduced ? 200 : 33);
  }

  /* ========================================================
     2 · FLOATING ARCADE GLYPHS  (DOM, multi-depth parallax)
     ======================================================== */
  function initGlyphs() {
    const layer = document.createElement('div');
    layer.id = 'fx-glyphs';
    layer.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;';
    document.body.appendChild(layer);

    // game-controller symbols + pixel motifs
    const GLYPHS = ['△', '○', '✕', '□', '◇', '⬡', '⌖', '▲', '＋', '◎'];
    const defs = [
      { g: '△', x: 8,  y: 18, s: 30, depth: 0.10, rot: -12 },
      { g: '○', x: 88, y: 12, s: 26, depth: 0.18, rot: 8 },
      { g: '✕', x: 78, y: 64, s: 34, depth: 0.14, rot: 14 },
      { g: '□', x: 14, y: 72, s: 24, depth: 0.22, rot: -8 },
      { g: '◇', x: 50, y: 40, s: 40, depth: 0.07, rot: 0 },
      { g: '⬡', x: 30, y: 88, s: 28, depth: 0.16, rot: 18 },
      { g: '⌖', x: 92, y: 84, s: 30, depth: 0.12, rot: -6 },
      { g: '＋', x: 4,  y: 46, s: 22, depth: 0.20, rot: 0 },
      { g: '◎', x: 64, y: 24, s: 22, depth: 0.24, rot: 10 },
      { g: '▲', x: 44, y: 70, s: 20, depth: 0.26, rot: -16 },
    ];
    const els = defs.map((d, i) => {
      const el = document.createElement('span');
      el.textContent = d.g;
      el.style.cssText = `
        position:absolute;left:${d.x}%;top:${d.y}%;
        font-size:${d.s}px;line-height:1;
        font-family:'JetBrains Mono',monospace;font-weight:700;
        color:rgba(0,255,200,0.12);
        text-shadow:0 0 18px rgba(157,92,255,0.18);
        will-change:transform;user-select:none;
      `;
      layer.appendChild(el);
      return { el, ...d, bob: Math.random() * Math.PI * 2 };
    });

    let scrollY = window.scrollY;
    window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

    function applyTheme() {
      const a = accents();
      els.forEach(o => {
        o.el.style.color = `rgba(${a.teal},0.13)`;
        o.el.style.textShadow = `0 0 18px rgba(${a.purple},0.18)`;
      });
    }
    applyTheme();
    new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    let t = 0;
    setInterval(() => {
      if (reduced) return;
      t += 0.02;
      const mx = M.x, my = M.y;
      els.forEach(o => {
        const px = -mx * o.depth * 120;
        const py = -my * o.depth * 120 - scrollY * o.depth;
        const bob = Math.sin(t + o.bob) * 6;
        const rot = o.rot + Math.sin(t * 0.6 + o.bob) * 6;
        o.el.style.transform = `translate(${px.toFixed(1)}px, ${(py + bob).toFixed(1)}px) rotate(${rot.toFixed(1)}deg)`;
      });
    }, 33);
  }

  /* ========================================================
     3 · CUSTOM GAME RETICLE CURSOR
     ======================================================== */
  function initCursor() {
    if (isTouch || reduced) return;
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.id = 'fx-cursor-dot';
    ring.id = 'fx-cursor-ring';
    document.body.appendChild(ring);
    document.body.appendChild(dot);
    document.body.classList.add('fx-cursor-on');

    let rx = window.innerWidth / 2, ry = window.innerHeight / 2;
    let hovering = false;
    setInterval(() => {
      rx += (M.px - rx) * 0.18;
      ry += (M.py - ry) * 0.18;
      dot.style.transform = `translate(${M.px}px, ${M.py}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) scale(${hovering ? 1.7 : 1})`;
    }, 16);

    document.addEventListener('mouseover', (e) => {
      hovering = !!e.target.closest('a, button, .chip, .stat, .cart, .trophy, .loadout, .mission, .side, .icon-btn');
      ring.classList.toggle('hot', hovering);
    });
    document.addEventListener('mousedown', () => ring.classList.add('click'));
    document.addEventListener('mouseup', () => ring.classList.remove('click'));
  }

  /* ========================================================
     4 · SCROLL PROGRESS BEAM
     ======================================================== */
  function initProgress() {
    const bar = document.createElement('div');
    bar.id = 'fx-progress';
    document.body.appendChild(bar);
    function upd() {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? (window.scrollY / h) : 0;
      bar.style.width = (p * 100).toFixed(2) + '%';
    }
    window.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    upd();
  }

  function boot() {
    initField();
    initGlyphs();
    initCursor();
    initProgress();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
