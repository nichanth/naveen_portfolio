/* ============================================================
   data.jsx  ·  All resume content as structured data
   ============================================================ */
window.RESUME = {
  name: 'NAVEEN PRASATH',
  fullName: 'Naveen Prasath Manoharan',
  role: 'Senior Game QA Engineer',
  level: 9,
  location: 'Bangalore, Karnataka',
  email: 'imnaveenprasath@gmail.com',
  phone: '+91 8903123826',
  tagline:
    'Results-driven Senior Game QA Engineer with 9 years of end-to-end testing and a record of 5,000+ high-value bugs. An "own-the-product" problem-solver bridging development and design — authoring game specs, driving revenue, mentoring talent, and deploying AI agents to revolutionize QA.',

  heroChips: [
    { n: '9', label: 'Years XP' },
    { n: '5,000+', label: 'Bugs Slain' },
    { n: '0', label: 'Post-Launch Fires' },
  ],

  stats: [
    { n: 9, suf: '', label: 'Years Experience', sub: 'End-to-end game lifecycle QA' },
    { n: 5000, suf: '+', label: 'High-Value Bugs', sub: 'Reported across a 9-year career' },
    { n: 6, suf: '', label: 'QA Mentored', sub: '2 to Senior · 3 into key IC roles' },
    { n: 400, suf: '/wk', label: 'Revenue Driven ($)', pre: '$', sub: 'Direct increase from edge-case finds' },
    { n: 100, suf: '%', label: 'On-Time Delivery', sub: 'Across major projects in a lean 3:1 pod' },
    { n: 0, suf: '', label: 'Platform Rejections', sub: 'Apple & Google certification, first pass' },
  ],

  missions: [
    {
      lvl: 'LV.02',
      title: 'Senior Game Test Engineer & QA POD Owner',
      company: 'Moonfrog Labs',
      place: 'Bengaluru, Karnataka',
      when: '2019 – PRESENT',
      tags: ['Ludo Club', 'Captain Escape (3D Runner)', 'Instant Games', 'FB · Snapchat · YouTube'],
      quests: [
        ['Key Portfolio', 'Led end-to-end testing for flagship titles — <b>Ludo Club</b>, the 3D runner <b>Captain Escape</b> (handled single-handedly), and diverse Instant Games (Ludo, Bolt, Parchis, Carrom, AI Face Swap) across Facebook, Snapchat & YouTube.'],
        ['Revenue & Stability', 'Drove a direct <b>$400/week revenue increase</b> and safeguarded monetization by catching high-value edge-case defects — ensuring <b>zero post-launch emergency interventions</b>.'],
        ['Game Design & Specs', 'Authored comprehensive, actively-used game design specs; designed and shipped a character-oriented <b>FTUE</b> currently live in production, with more feature specs queued.'],
        ['Sole QA Authority', 'Operated in a lean pod (<b>3:1 Dev-to-QA</b>), driving <b>100% on-time delivery</b> across major projects.'],
        ['Solution-Oriented Debugging', 'Elevated QA from detection to resolution — delivering bug reports with actionable logic fixes for broken developer UI/UX flows.'],
        ['AI-Driven Efficiency', 'Revolutionized manual workflows with a modern AI stack: ChatGPT/Gemini for test plans, Rovo Agent for Jira triage, Codex & Atlas for config & SQL validation.'],
        ['Mentorship', 'Accelerated the careers of <b>6 QA professionals</b> — guiding 2 into Senior roles and 3 into key IC positions.'],
        ['Partner-Team Approach', 'Broke down QA silos through constant cross-functional collaboration across QA, Development, Art & Design.'],
      ],
    },
    {
      lvl: 'LV.01',
      title: 'Game QA Engineer',
      company: 'Pole To Win (PTW)',
      place: 'Bengaluru, Karnataka',
      when: '2017 – 2019',
      tags: ['BDC', 'Choices', 'FB Instant Games', 'Destructive Testing'],
      quests: [
        ['Key Portfolio', 'Executed rigorous end-to-end testing across major client projects — <b>BDC</b>, narrative-driven <b>Choices</b>, and high-traffic FB Instant Games (Air Hockey, Doodle Jump, Space Arena).'],
        ['Exploit Identification', 'Documented severe collision issues and exploits via destructive testing — protecting in-game economies and multiplayer balance from alpha through gold master.'],
        ['Defect Triage', 'Championed triage meetings with lead developers, advocating for resolution of high-impact UX issues affecting player retention.'],
        ['Performance Profiling', 'Captured deep technical metrics (crash logs, memory spikes, frame drops) to pinpoint client-side bottlenecks for rapid fixes.'],
        ['Compliance & Certification', 'Accelerated certification passes by verifying Apple App Store & Google Play guidelines — resulting in <b>zero platform rejections</b>.'],
      ],
    },
  ],

  arsenal: [
    { cat: 'QA Methodologies', tag: 'CORE LOADOUT', icon: 'target', items: ['End-to-End Lifecycle QA', 'Agile / Scrum', 'Shift-Left QA', 'Monetization & Economy Testing', 'Edge-Case & Destructive Testing'] },
    { cat: 'AI Tools & Agents', tag: 'POWER-UPS', icon: 'spark', items: ['ChatGPT', 'Gemini', 'Rovo Agent (Jira)', 'Codex', 'Atlas'] },
    { cat: 'Testing & CI/CD', tag: 'BUILD RIG', icon: 'wrench', items: ['ADB', 'Logcat', 'Xcode', 'TestFlight', 'Jenkins', 'Perfdog', 'TestRail', 'Terminal', 'VS'] },
    { cat: 'Network & API Debugging', tag: 'RECON', icon: 'globe', items: ['Postman', 'Charles Proxy'] },
    { cat: 'Device Cloud Testing', tag: 'DEPLOY GRID', icon: 'cloud', items: ['BrowserStack', 'AWS Device Farm'] },
    { cat: 'Platforms', tag: 'ARENAS', icon: 'console', items: ['iOS', 'Android', 'Google Play Console', 'Apple Developer', 'FB / Snapchat / YouTube Games'] },
    { cat: 'Analytics & Databases', tag: 'INTEL', icon: 'chart', items: ['Firebase', 'Sentry', 'Jira', 'Confluence', 'GitHub', 'Metabase', 'AppLovin', 'AWS', 'Couchbase', 'SQL'] },
  ],

  titles: [
    { name: 'Ludo Club', tag: 'LC', solo: false, hue: 168, desc: 'Flagship social board-game title — end-to-end QA at scale.', plats: ['Mobile', 'Social'] },
    { name: 'Captain Escape', tag: 'CE', solo: true, hue: 270, desc: '3D endless runner — QA handled single-handedly start to ship.', plats: ['3D Runner', 'Solo QA'] },
    { name: 'Instant Games', tag: 'IG', solo: false, hue: 320, desc: 'Ludo, Bolt, Parchis, Carrom & AI Face Swap.', plats: ['Facebook', 'Snapchat', 'YouTube'] },
    { name: 'Choices', tag: 'CH', solo: false, hue: 200, desc: 'Narrative-driven interactive fiction — flow & branch testing.', plats: ['Narrative', 'Mobile'] },
    { name: 'BDC', tag: 'BD', solo: false, hue: 145, desc: 'Major client project — rigorous full-cycle test passes.', plats: ['Client', 'AAA Cycle'] },
    { name: 'FB Arcade', tag: 'FB', solo: false, hue: 295, desc: 'Air Hockey · Doodle Jump · Space Arena — high-traffic instant games.', plats: ['FB Instant', 'Multiplayer'] },
  ],

  ai: {
    intro: 'Deployed a modern AI stack to turn manual QA into high-velocity, automated workflows — from test planning to defect triage.',
    powerups: [
      { ic: 'spark', name: 'Test Plan Generation', tools: 'ChatGPT · Gemini', desc: 'Rapidly generated comprehensive test plans, slashing prep time before each cycle.' },
      { ic: 'bug', name: 'Automated Jira Triage', tools: 'Rovo Agent', desc: 'Automated defect reporting and triage directly inside the Jira pipeline.' },
      { ic: 'code', name: 'Config & SQL Validation', tools: 'Codex · Atlas', desc: 'Rapid config validation and SQL querying for data-driven game state checks.' },
      { ic: 'rocket', name: 'Automation Initiatives', tools: 'External AI Studio', desc: 'Spearheaded evaluation of advanced testing tools to integrate into the pipeline.' },
    ],
  },

  trophies: [
    { ic: 'star', name: 'Dream Team Award', org: 'Moonfrog Labs', desc: 'Recognized for exceptional QA leadership and flawless execution during a critical, high-stakes POD feature release.' },
    { ic: 'guitar', name: 'Rockstar Award', org: 'Pole To Win', desc: 'Honored company-wide for a career record of 5,000+ high-value bugs that shaped game mechanics and overall stability.' },
    { ic: 'medal', name: 'Best Performer Award', org: 'Pole To Win', desc: 'Awarded for consistent excellence, rigorous testing standards, and outstanding contributions to game stability.' },
  ],

  education: {
    degree: 'B.E. / B.Tech in Computer Science',
    inst: 'SVS Educational Institutions, Coimbatore',
    year: '2016',
  },

  interests: [
    { ic: 'camera', name: 'Photography & Digital Art', desc: 'Cinematic visuals shot on a Sony a6400.' },
    { ic: 'film', name: 'Filmmaking & Cinema', desc: 'Short-film co-director & actor. Tamil cinema; fan of actor Vijay.' },
    { ic: 'book', name: 'Literature', desc: 'Continuous learner and avid reader.' },
  ],
};
