/* ============================================================
   three-hero.js  ·  Game Controller Hero Animation
   CSS float + canvas particles + JS parallax + glitch
   window.initHeroScene(container) → { destroy, setTheme }
   ============================================================ */
(function () {
  function initHeroScene(container) {
    if (!container) return null;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- live accent reader (follows data-palette / data-theme) ---- */
    function hx2rgb(hex) {
      const m = (hex || '').trim().replace('#', '');
      if (m.length === 3) return [0,1,2].map(i => parseInt(m[i]+m[i],16)).join(',');
      if (m.length === 6) return [0,2,4].map(i => parseInt(m.slice(i,i+2),16)).join(',');
      return '0,255,200';
    }
    let ACC = { teal:'0,255,200', purple:'157,92,255' };
    function readAcc() {
      const cs = getComputedStyle(document.documentElement);
      ACC = { teal: hx2rgb(cs.getPropertyValue('--teal')), purple: hx2rgb(cs.getPropertyValue('--purple')) };
    }
    readAcc();

    /* ---------- keyframe injection ---------- */
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes ctrlFloat {
        0%,100% { transform: translateY(0px) rotate(-2.5deg); }
        50%      { transform: translateY(-24px) rotate(2deg); }
      }
      @keyframes glowPulse {
        0%,100% { opacity:.65; transform:scale(1); }
        50%      { opacity:1;   transform:scale(1.14); }
      }
      @keyframes ringA { to { transform:translate(-50%,-50%) rotate(360deg); } }
      @keyframes ringB { to { transform:translate(-50%,-50%) rotate(-360deg); } }
      @keyframes scanBeam {
        0%   { top:10%; opacity:0; }
        10%  { opacity:.6; }
        90%  { opacity:.4; }
        100% { top:90%; opacity:0; }
      }
      @keyframes labelBob {
        0%,100% { transform:translateY(0); }
        50%     { transform:translateY(-7px); }
      }
    `;
    document.head.appendChild(styleEl);

    /* ---------- root wrapper ---------- */
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:absolute;inset:0;overflow:hidden;';
    container.appendChild(wrap);

    /* ---- canvas (particles, drawn behind controller) ---- */
    const cvs = document.createElement('canvas');
    cvs.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    wrap.appendChild(cvs);
    const ctx = cvs.getContext('2d');

    /* ---- ambient glow blob ---- */
    const glow = document.createElement('div');
    glow.style.cssText = `
      position:absolute;top:50%;left:50%;
      width:68%;padding-bottom:68%;margin-top:-34%;margin-left:-34%;
      border-radius:50%;
      background:radial-gradient(circle,color-mix(in srgb,var(--teal) 26%,transparent) 0%,color-mix(in srgb,var(--purple) 20%,transparent) 45%,transparent 72%);
      filter:blur(32px);
      animation:${reduced?'none':'glowPulse 4s ease-in-out infinite'};
      pointer-events:none;z-index:1;
    `;
    wrap.appendChild(glow);

    /* ---- orbit rings ---- */
    const rings = [
      { s:'92%', v:'--teal',   pct:18, dur:'22s', dir:'ringA' },
      { s:'72%', v:'--purple', pct:30, dur:'16s', dir:'ringB' },
      { s:'54%', v:'--teal',   pct:14, dur:'28s', dir:'ringA' },
    ];
    rings.forEach(({ s, v, pct, dur, dir }) => {
      const c = `color-mix(in srgb,var(${v}) ${pct}%,transparent)`;
      const el = document.createElement('div');
      el.style.cssText = `
        position:absolute;top:50%;left:50%;
        width:${s};padding-bottom:${s};margin-top:calc(-${s}/2);margin-left:calc(-${s}/2);
        border-radius:50%;box-sizing:border-box;
        border:1px solid ${c};
        animation:${reduced?'none':dir+' '+dur+' linear infinite'};
        pointer-events:none;z-index:1;
      `;
      /* small dot on the ring */
      const dot = document.createElement('span');
      dot.style.cssText = `
        position:absolute;top:0;left:50%;transform:translate(-50%,-50%);
        width:6px;height:6px;border-radius:50%;
        background:var(${v});
        box-shadow:0 0 10px var(${v});
      `;
      el.appendChild(dot);
      wrap.appendChild(el);
    });

    /* ---- parallax outer (JS-driven tilt) ---- */
    const pWrap = document.createElement('div');
    pWrap.style.cssText = `
      position:absolute;top:50%;left:50%;
      width:76%;max-width:390px;
      transform:translate(-50%,-50%);
      z-index:4;will-change:transform;
    `;

    /* ---- float inner (CSS animation only, translateY) ---- */
    const fWrap = document.createElement('div');
    fWrap.style.cssText = `animation:${reduced?'none':'ctrlFloat 5.5s ease-in-out infinite'};`;

    /* ---- controller image ---- */
    const img = document.createElement('img');
    img.src = 'controller.png';
    img.alt = 'Game Controller';
    img.draggable = false;
    const baseFilter = () =>
      `drop-shadow(0 0 28px rgba(${ACC.teal},.55)) drop-shadow(0 0 56px rgba(${ACC.purple},.38)) drop-shadow(0 14px 36px rgba(0,0,0,.65))`;
    img.style.cssText = `
      width:100%;height:auto;display:block;user-select:none;
      filter:${baseFilter()};
      transition:filter .15s;
    `;
    fWrap.appendChild(img);
    pWrap.appendChild(fWrap);
    wrap.appendChild(pWrap);

    /* ---- scan beam ---- */
    const beam = document.createElement('div');
    beam.style.cssText = `
      position:absolute;left:10%;width:80%;height:2px;
      background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--teal) 60%,transparent),transparent);
      filter:blur(2px);pointer-events:none;z-index:5;
      animation:${reduced?'none':'scanBeam 4s ease-in-out infinite'};
    `;
    wrap.appendChild(beam);

    /* ---- HUD label chips ---- */
    const labels = [
      { text:'CTRL_ACTIVE.EXE', top:'12%', right:'4%',  delay:'0s' },
      { text:'BUG_COUNT: 5000+', bottom:'18%', left:'4%', delay:'1s' },
    ];
    labels.forEach(({ text, top, bottom, left, right, delay }) => {
      const el = document.createElement('div');
      el.textContent = text;
      el.style.cssText = `
        position:absolute;
        ${top    ? 'top:'+top+';'       : ''}
        ${bottom ? 'bottom:'+bottom+';' : ''}
        ${left   ? 'left:'+left+';'    : ''}
        ${right  ? 'right:'+right+';'  : ''}
        font-family:'JetBrains Mono',monospace;font-size:clamp(7px,1.2vw,9px);letter-spacing:1px;
        color:var(--teal);background:var(--panel-solid);
        border:1px solid var(--border-bright);padding:5px 8px;border-radius:6px;
        box-shadow:0 0 12px color-mix(in srgb,var(--teal) 25%,transparent);pointer-events:none;z-index:6;
        white-space:nowrap;max-width:calc(50% - 8px);overflow:hidden;text-overflow:ellipsis;
        animation:${reduced?'none':'labelBob 4s ease-in-out infinite'};
        animation-delay:${delay};
      `;
      wrap.appendChild(el);
    });

    /* ---------- particle system ---------- */
    let W = 0, H = 0;
    const N = 100;
    const P = [];

    function resizeCanvas() {
      const r = container.getBoundingClientRect();
      W = cvs.width  = Math.round(r.width  || 400);
      H = cvs.height = Math.round(r.height || 400);
      if (!P.length) {
        for (let i = 0; i < N; i++) P.push(mkPart());
      }
    }

    function mkPart() {
      const ang = Math.random() * Math.PI * 2;
      const rad = 70 + Math.random() * 170;
      return {
        ang, rad,
        spd: (0.1 + Math.random() * 0.3) * (Math.random() > .5 ? 1 : -1),
        sz:  0.5 + Math.random() * 2,
        a:   0.15 + Math.random() * 0.65,
        da:  (Math.random() * 0.006 + 0.002) * (Math.random() > .5 ? 1 : -1),
        col: Math.random() > .55 ? 'teal' : 'purple',
      };
    }

    const tickId = setInterval(() => {
      if (!W || !H) return;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      P.forEach(p => {
        if (!reduced) {
          p.ang += p.spd * 0.011;
          p.a   += p.da;
          if (p.a > 0.85 || p.a < 0.08) p.da *= -1;
        }
        const x = cx + Math.cos(p.ang) * p.rad;
        const y = cy + Math.sin(p.ang) * p.rad;
        ctx.beginPath();
        ctx.arc(x, y, p.sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACC[p.col]},${Math.max(0.05, Math.min(0.95, p.a)).toFixed(2)})`;
        ctx.fill();
      });
    }, 16);

    /* ---------- mouse parallax ---------- */
    let tx = 0, ty = 0, cx2 = 0, cy2 = 0;
    function onMove(e) {
      const pt = e.touches ? e.touches[0] : e;
      const r = container.getBoundingClientRect();
      tx = ((pt.clientX - r.left) / (r.width  || 1) - 0.5) * 2;
      ty = ((pt.clientY - r.top)  / (r.height || 1) - 0.5) * 2;
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });

    const parallaxId = setInterval(() => {
      if (reduced) return;
      cx2 += (tx - cx2) * 0.07;
      cy2 += (ty - cy2) * 0.07;
      const dx = (cx2 * 16).toFixed(2), dy = (cy2 * 10).toFixed(2);
      const rx = (-cy2 * 9).toFixed(2), ry = (cx2 * 12).toFixed(2);
      pWrap.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }, 16);

    /* ---------- glitch effect ---------- */
    let gTick = 0;
    const GLITCH_INTERVAL = reduced ? 99999 : 220 + Math.floor(Math.random() * 140);
    const glitchId = setInterval(() => {
      if (reduced) return;
      gTick++;
      if (gTick % GLITCH_INTERVAL === 0) {
        img.style.filter = `
          drop-shadow(0 0 28px rgba(${ACC.purple},.75))
          drop-shadow(0 0 56px rgba(${ACC.teal},.45))
          hue-rotate(${(Math.random() * 40 - 20).toFixed(0)}deg) saturate(1.6)
        `;
        img.style.transform = `translateX(${((Math.random() - .5) * 8).toFixed(1)}px) scaleX(${(0.97 + Math.random() * .06).toFixed(3)})`;
        setTimeout(() => {
          img.style.filter = baseFilter();
          img.style.transform = '';
        }, 130);
      }
    }, 16);

    /* ---------- resize ---------- */
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(container);
    resizeCanvas();

    /* ---------- API ---------- */
    return {
      setTheme(t) {
        readAcc();                 // refresh accents (theme or palette changed)
        img.style.filter = baseFilter();
        // glow & rings use color-mix(var) — they update automatically.
      },
      destroy() {
        clearInterval(tickId);
        clearInterval(parallaxId);
        clearInterval(glitchId);
        ro.disconnect();
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('touchmove', onMove);
        styleEl.remove();
        wrap.remove();
      },
    };
  }

  window.initHeroScene = initHeroScene;
})();
