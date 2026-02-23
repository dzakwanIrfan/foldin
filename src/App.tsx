import { useState, useEffect, useRef } from "react";

/* ═══ BRAND ═══ */
const Y = "#EFC523",
  YD = "#D4AD1A",
  YLL = "#FFF9E0",
  YBg = "#FFFDF5";
const C = {
  y: Y,
  w: "#FFF",
  bg: "#FAFAF8",
  bd: "#EDEBE7",
  t: "#1A1A1A",
  tM: "#555",
  tL: "#999",
  tLL: "#BBB",
  r: "#E8534A",
  rBg: "#FFF0EF",
  g: "#2DB865",
  gBg: "#EDFBF2",
  b: "#3B82F6",
  bBg: "#EFF4FF",
  go: "#F59E0B",
  goBg: "#FFF8EB",
  pu: "#8B5CF6",
  puBg: "#F3EFFE",
  cy: "#06B6D4",
  dk: "#111",
};
const F = "'Outfit',system-ui,sans-serif";

/* ═══ DATA ═══ */
const EV = [
  {
    id: "f1",
    t: "🚨 Fire — Gatot Subroto",
    e: "🔥",
    v: "Jl. Gatot Subroto",
    h: "Jakarta Alert",
    hType: "brand",
    desc: "Active fire. Multiple units responding. Avoid area.",
    m: 47,
    x: 22,
    y: 52,
    al: 1,
    r: 1,
  },
  {
    id: "c1",
    t: "🚗 Crash — Tol Cikampek",
    e: "💥",
    v: "Tol Cikampek Km 12",
    h: "JKT Traffic",
    hType: "brand",
    desc: "Multi-vehicle crash blocking 2 lanes.",
    m: 23,
    x: 88,
    y: 38,
    al: 1,
  },
  {
    id: "fl1",
    t: "🌊 Flood — Kemang",
    e: "🌊",
    v: "Jl. Kemang Raya",
    h: "BPBD Jakarta",
    hType: "brand",
    desc: "Flooding 30-50cm. Vehicles stranded.",
    m: 31,
    x: 40,
    y: 78,
    al: 1,
  },
  {
    id: "co1",
    t: "Coffee & Code",
    e: "☕",
    v: "Kopi Kenangan SCBD",
    h: "Dev Community",
    hType: "fold",
    hUser: "@devjkt",
    desc: "Weekly dev meetup. Bring laptop, code together.",
    m: 12,
    cap: 30,
    x: 33,
    y: 28,
    r: 2,
    free: 1,
    tags: ["coffee", "meetup"],
  },
  {
    id: "mi1",
    t: "Open Mic Night",
    e: "🎸",
    v: "Jl. Senopati 8",
    h: "MusicHub",
    hType: "brand",
    hUser: "@musichub",
    desc: "Open stage for singers, musicians, poets.",
    m: 24,
    cap: 50,
    x: 64,
    y: 32,
    free: 1,
    tags: ["music"],
  },
  {
    id: "ho1",
    t: "Pickup Basketball",
    e: "🏀",
    v: "GBK Court 3",
    h: "Hoops JKT",
    hType: "fold",
    desc: "Casual 5v5. All skill levels.",
    m: 8,
    cap: 10,
    x: 73,
    y: 46,
    free: 1,
    tags: ["gym"],
  },
  {
    id: "na1",
    t: "Nasi Goreng Fest",
    e: "🍜",
    v: "Senayan Park",
    h: "Foodie JKT",
    hType: "brand",
    hUser: "@foodiejkt",
    desc: "12 vendors compete for best nasi goreng!",
    m: 156,
    cap: 200,
    x: 48,
    y: 55,
    r: 3,
    price: "75K",
    tags: ["food"],
  },
  {
    id: "yo1",
    t: "Morning Yoga",
    e: "🧘",
    v: "GBK Field",
    h: "Yoga Maya",
    hType: "individual",
    hUser: "@yoga_maya",
    desc: "Sunrise vinyasa flow. Mats provided.",
    m: 12,
    cap: 20,
    x: 15,
    y: 35,
    free: 1,
    tags: ["yoga"],
  },
  {
    id: "pi1",
    t: "Startup Pitch",
    e: "📊",
    v: "WeWork Pacific",
    h: "Startup Grind",
    hType: "brand",
    hUser: "@startupgrind",
    desc: "5 startups pitch to investors.",
    m: 45,
    cap: 80,
    x: 85,
    y: 30,
    price: "150K",
    tags: ["pitch"],
  },
  {
    id: "ru1",
    t: "GBK Run Club",
    e: "🏃",
    v: "GBK Track",
    h: "JKT Runners",
    hType: "fold",
    hUser: "@jktrunners",
    desc: "5K and 10K group runs.",
    m: 28,
    cap: 50,
    x: 28,
    y: 68,
    free: 1,
    tags: ["run"],
  },
  {
    id: "ar1",
    t: "Art Jam",
    e: "🎨",
    v: "SCBD Plaza",
    h: "JKT Creatives",
    hType: "fold",
    desc: "Bring sketchbook. Theme: Urban Jakarta.",
    m: 15,
    cap: 30,
    x: 60,
    y: 70,
    free: 1,
    tags: ["art"],
  },
  {
    id: "ga1",
    t: "Gaming Night",
    e: "🎮",
    v: "Mineski Café",
    h: "Gamers JKT",
    hType: "fold",
    desc: "Valorant tournament. Prizes for top 3.",
    m: 34,
    cap: 48,
    x: 75,
    y: 75,
    price: "50K",
    tags: ["gaming"],
  },
  {
    id: "ha1",
    t: "Happy Hour",
    e: "🍺",
    v: "Beer Garden Kemang",
    h: "SCBD Social",
    hType: "individual",
    hUser: "@rinaldi",
    desc: "Post-work drinks. DJ from 9PM.",
    m: 22,
    cap: 60,
    x: 55,
    y: 15,
    free: 1,
    tags: ["drink"],
  },
  {
    id: "bo1",
    t: "Book Club",
    e: "📚",
    v: "Kinokuniya GI",
    h: "JKT Book Club",
    hType: "fold",
    desc: "This month: Educated. Discussion + coffee.",
    m: 8,
    cap: 15,
    x: 10,
    y: 60,
    free: 1,
    tags: ["meetup"],
  },
];
const UPC = [
  {
    id: "k1",
    t: "Karaoke Night",
    e: "🎤",
    v: "Karaoke Box",
    h: "@andi",
    hType: "individual",
    desc: "Private rooms!",
    cap: 50,
    d: "Tonight 8PM",
    free: 1,
  },
  {
    id: "d1",
    t: "Design Workshop",
    e: "🎨",
    v: "GoWork Menteng",
    h: "DesignHub",
    hType: "brand",
    desc: "Figma prototyping.",
    cap: 40,
    d: "Sat 10AM",
    price: "200K",
  },
  {
    id: "sy",
    t: "Sunrise Yoga",
    e: "🧘",
    v: "Monas Garden",
    h: "@yoga_maya",
    hType: "individual",
    desc: "Outdoor sunrise yoga.",
    cap: 20,
    d: "Sun 5:30AM",
    free: 1,
  },
];
const GLB = [
  {
    id: "b1",
    t: "Bali Sunrise Run",
    e: "🏃",
    v: "Sanur Beach, Bali",
    h: "Bali Runners",
    desc: "10K along the beach.",
    m: 2400,
    d: "Mar 1",
    free: 1,
    scope: "🇮🇩",
  },
  {
    id: "s1",
    t: "Tech Conference",
    e: "💻",
    v: "Marina Bay Sands, SG",
    h: "TechAsia",
    desc: "3-day conf. 200+ speakers.",
    m: 5000,
    d: "Mar 15",
    price: "$299",
    scope: "🌏",
  },
  {
    id: "bd1",
    t: "Bandung Coffee Fest",
    e: "☕",
    v: "Gedung Sate, Bandung",
    h: "Bandung Barista",
    desc: "50+ specialty roasters.",
    m: 800,
    d: "Mar 8",
    price: "50K",
    scope: "🇮🇩",
  },
];
const PER = [
  { t: "The Connector", d: "Always knows someone", e: "🌐", c: C.pu },
  { t: "The Explorer", d: "First to try new places", e: "🧭", c: C.cy },
  { t: "The Energizer", d: "Life of every event", e: "⚡", c: Y },
  { t: "The Creator", d: "Makes things happen", e: "🎨", c: "#EC4899" },
  { t: "The Mentor", d: "Wisdom to share", e: "🧠", c: C.b },
  { t: "The Nightowl", d: "After dark vibes", e: "🦉", c: C.pu },
  { t: "The Athlete", d: "Always moving", e: "🏅", c: C.g },
  { t: "The Foodie", d: "Eats through life", e: "🍳", c: C.go },
];
const CATS = [
  { id: "coffee", e: "☕", l: "Coffee" },
  { id: "drink", e: "🍺", l: "Drinks" },
  { id: "run", e: "🏃", l: "Running" },
  { id: "yoga", e: "🧘", l: "Yoga" },
  { id: "music", e: "🎵", l: "Music" },
  { id: "art", e: "🎨", l: "Art" },
  { id: "food", e: "🍕", l: "Foodies" },
  { id: "gaming", e: "🎮", l: "Gaming" },
  { id: "pitch", e: "📊", l: "Pitch" },
  { id: "meetup", e: "🤝", l: "Meetup" },
  { id: "photo", e: "📸", l: "Photo" },
  { id: "travel", e: "✈️", l: "Travel" },
];
/* Posts data with location pins */
const POSTS = [
  {
    id: "p1",
    u: "Maya J.",
    av: "😎",
    t: "WFA today at Kopi Kenangan SCBD ☕ Come join! Great wifi and good vibes.",
    time: "5m",
    likes: 14,
    cm: 5,
    pin: { name: "Kopi Kenangan SCBD", x: 33, y: 28 },
    scope: "public",
    type: "wfa",
  },
  {
    id: "p2",
    u: "Rio D.",
    av: "🧑‍💻",
    t: "Anyone up for co-working at WeWork Pacific? I'll be here until 6PM. 💻",
    time: "20m",
    likes: 8,
    cm: 3,
    pin: { name: "WeWork Pacific Place", x: 85, y: 30 },
    scope: "public",
    type: "wfc",
  },
  {
    id: "p3",
    u: "Fitri N.",
    av: "🧕",
    t: "Found this amazing hidden café in Menteng. Perfect WFA spot! DM me for location 🤫",
    time: "1h",
    likes: 22,
    cm: 9,
    scope: "circle",
    type: "wfa",
  },
  {
    id: "p4",
    u: "JKT Update",
    av: "📡",
    t: "Heavy traffic Sudirman due to marathon. Expect 30min delays.",
    time: "30m",
    likes: 45,
    cm: 12,
    scope: "public",
    type: "update",
  },
  {
    id: "p5",
    u: "Dev Community",
    av: "☕",
    t: "WFC at Menara Astra lobby! Free coffee for first 10 devs who show up 🔥",
    time: "2h",
    likes: 67,
    cm: 28,
    pin: { name: "Menara Astra", x: 45, y: 40 },
    scope: "public",
    type: "wfc",
  },
  {
    id: "p6",
    u: "TechAsia",
    av: "💻",
    t: "SE Asia startup funding hits record Q1 2026. Jakarta leads the pack.",
    time: "4h",
    likes: 1200,
    cm: 89,
    scope: "public",
    type: "update",
  },
];
/* Ghosts with match reasons */
const GHOSTS = [
  {
    id: "g1",
    n: "Shadow_42",
    e: "👻",
    match: 87,
    times: 5,
    loc: "SCBD",
    dist: "0.8km",
    interests: ["coffee", "pitch"],
    sharedEvents: ["Coffee & Code", "Startup Pitch"],
    reason: "Same coffee spots + both attend startup events",
    lastSeen: "2h ago",
  },
  {
    id: "g2",
    n: "Night_Run",
    e: "🌙",
    match: 73,
    times: 3,
    loc: "GBK",
    dist: "1.2km",
    interests: ["run", "yoga"],
    sharedEvents: ["GBK Run Club"],
    reason: "Both morning runners at GBK + yoga enthusiasts",
    lastSeen: "5h ago",
  },
  {
    id: "g3",
    n: "Coffee_Dev",
    e: "☕",
    match: 91,
    times: 8,
    loc: "Senopati",
    dist: "0.3km",
    interests: ["coffee", "gaming", "meetup"],
    sharedEvents: ["Coffee & Code", "Gaming Night", "Open Mic"],
    reason: "Frequent same cafés + 3 shared events this month",
    lastSeen: "30m ago",
  },
  {
    id: "g4",
    n: "Art_Soul",
    e: "🎨",
    match: 65,
    times: 2,
    loc: "SCBD Plaza",
    dist: "2.1km",
    interests: ["art", "photo"],
    sharedEvents: ["Art Jam"],
    reason: "Both attended Art Jam + similar creative interests",
    lastSeen: "1d ago",
  },
];
/* Circle with distance & shared paths */
const CIRCLE = [
  {
    id: "c1",
    n: "Maya J.",
    av: "😎",
    dist: 1.2,
    status: "Active",
    loc: "SCBD",
    sharedPaths: ["Jl. Sudirman", "SCBD Area"],
    lastActive: "2m ago",
    x: 35,
    y: 30,
  },
  {
    id: "c2",
    n: "Rio D.",
    av: "🧑‍💻",
    dist: 3.5,
    status: "At WeWork",
    loc: "Pacific Place",
    sharedPaths: ["Jl. Sudirman", "Kuningan"],
    lastActive: "5m ago",
    x: 55,
    y: 50,
  },
  {
    id: "c3",
    n: "Fitri N.",
    av: "🧕",
    dist: 0.8,
    status: "WFA",
    loc: "Menteng Café",
    sharedPaths: ["Jl. Thamrin", "Menteng Area", "GBK"],
    lastActive: "10m ago",
    x: 25,
    y: 60,
  },
  {
    id: "c4",
    n: "Devraj K.",
    av: "🧑‍💻",
    dist: 5.2,
    status: "Offline",
    loc: "Last: Kemang",
    sharedPaths: ["Kemang"],
    lastActive: "2h ago",
    x: 40,
    y: 75,
  },
];
/* Leaderboard */
const LEADERS = {
  followers: [
    { n: "Andi P.", av: "🏆", v: "12.4K", num: 1, tag: "Genesis #1" },
    { n: "Sarah L.", av: "🥈", v: "8.7K", num: 2, tag: "Genesis #2" },
    { n: "Dev Community", av: "☕", v: "6.2K", num: 3, tag: "Top Fold" },
    { n: "Maya J.", av: "😎", v: "4.1K", num: 4 },
    { n: "JKT Runners", av: "🏃", v: "3.8K", num: 5, tag: "Top Fold" },
  ],
  contributors: [
    { n: "Yoga Maya", av: "🧘", v: "47 events", num: 1 },
    { n: "Dev Community", av: "☕", v: "38 events", num: 2 },
    { n: "MusicHub", av: "🎸", v: "31 events", num: 3 },
    { n: "Foodie JKT", av: "🍜", v: "28 events", num: 4 },
    { n: "Startup Grind", av: "📊", v: "24 events", num: 5 },
  ],
  events: [
    { n: "Nasi Goreng Fest", av: "🍜", v: "156 joined", num: 1 },
    { n: "Startup Pitch", av: "📊", v: "45 joined", num: 2 },
    { n: "Gaming Night", av: "🎮", v: "34 joined", num: 3 },
    { n: "GBK Run Club", av: "🏃", v: "28 joined", num: 4 },
    { n: "Open Mic Night", av: "🎸", v: "24 joined", num: 5 },
  ],
};

/* ═══ ENGINE ═══ */
const SEEDS = [
  "FOLDIN-001-GENESIS",
  "FOLDIN-002-ALPHA",
  "FOLDIN-003-ALPHA",
  "FOLDIN-004-ALPHA",
  "FOLDIN-005-ALPHA",
  "FOLDIN-006-ALPHA",
  "DEMO",
];
const genCh = (p) => {
  const cl = p.replace(/[^A-Z0-9]/g, "");
  const h = (s, i) => {
    let v = i * 2654435761;
    for (let c = 0; c < s.length; c++) v = ((v << 5) - v + s.charCodeAt(c)) | 0;
    return Math.abs(v).toString(36).toUpperCase().slice(0, 4);
  };
  return [1, 2, 3, 4, 5].map(
    (i) => `FOLDIN-${h(cl, i)}-${String(i).padStart(2, "0")}W${cl.slice(-2)}`,
  );
};
const VLD = (() => {
  const s = new Set(SEEDS);
  const a = (c, d) => {
    if (d > 3) return;
    c.forEach((x) => {
      genCh(x).forEach((k) => {
        s.add(k);
        a([k], d + 1);
      });
    });
  };
  a(SEEDS, 0);
  return s;
})();
const getUN = (c) => {
  const x = c.toUpperCase().trim();
  const gi = SEEDS.indexOf(x);
  if (gi >= 0) return gi === 6 ? 42 : gi + 1;
  const cl = x.replace(/[^A-Z0-9]/g, "");
  let h = 0;
  for (let i = 0; i < cl.length; i++) h = ((h << 5) - h + cl.charCodeAt(i)) | 0;
  return 7 + (Math.abs(h) % 993);
};
const isOG = (n) => n <= 1000;
const getP = (n) => PER[n % PER.length];
/* #11 Genesis key holders get followers based on key position */
const getAutoFollowers = (n) => {
  if (n <= 6) return Math.floor(12400 / (n * 1.2));
  if (n <= 100) return Math.floor(2000 / Math.sqrt(n));
  if (n <= 1000) return Math.floor(500 / Math.sqrt(n / 10));
  return Math.floor(Math.random() * 50) + 5;
};

/* ═══ STYLES ═══ */
const GS = () => (
  <style>{`
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
*::-webkit-scrollbar{width:4px}*::-webkit-scrollbar-thumb{background:#ddd;border-radius:3px}
input::placeholder,textarea::placeholder{color:#bbb}
@keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes glow{0%,100%{box-shadow:0 0 20px ${Y}15}50%{box-shadow:0 0 40px ${Y}30}}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes stampIn{from{transform:scale(1.3) rotate(-8deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}
@keyframes ripple{0%{transform:scale(.8);opacity:.6}100%{transform:scale(2.5);opacity:0}}
@keyframes shimmer{0%{background-position:-200px 0}100%{background-position:200px 0}}
.fi{animation:fi .2s ease-out}.fu{animation:fadeUp .55s ease-out both}.stamp{animation:stampIn .3s cubic-bezier(.17,.67,.35,1.2)}
.vis{opacity:0;transform:translateY(24px);transition:all .6s cubic-bezier(.16,1,.3,1)}.vis.show{opacity:1;transform:translateY(0)}
button{transition:all .12s;font-family:${F}}button:hover{filter:brightness(1.04)}
`}</style>
);
const useVis = (r) => {
  useEffect(() => {
    if (!r.current) return;
    const o = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("show");
        }),
      { threshold: 0.1 },
    );
    r.current.querySelectorAll(".vis").forEach((el) => o.observe(el));
    return () => o.disconnect();
  }, []);
};

/* ═══ PRIMITIVES ═══ */
const Logo = ({ sz = 20, dark }: any = {}) => (
  <span
    style={{
      fontFamily: F,
      fontWeight: 700,
      fontSize: sz,
      letterSpacing: "-.3px",
      color: dark ? C.t : C.w,
    }}
  >
    Fold
    <span style={{ color: dark ? Y : C.w, opacity: dark ? 1 : 0.65 }}>in</span>
  </span>
);
const Av = ({ l = "?", sz = 32, bd, vf }: any = {}) => (
  <div
    style={{
      width: sz,
      height: sz,
      borderRadius: sz * 0.3,
      background: `linear-gradient(135deg,${Y},${YD})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: sz * 0.36,
      fontWeight: 800,
      color: C.w,
      fontFamily: F,
      border: bd || "none",
      flexShrink: 0,
      position: "relative",
    }}
  >
    {l}
    {vf && (
      <div
        style={{
          position: "absolute",
          bottom: -1,
          right: -1,
          width: sz * 0.28,
          height: sz * 0.28,
          borderRadius: "50%",
          background: C.b,
          border: `1.5px solid ${C.w}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: sz * 0.13, color: C.w }}>✓</span>
      </div>
    )}
  </div>
);
const Tag = ({ ch, co = C.tM, bg = C.bg }) => (
  <span
    style={{
      background: bg,
      color: co,
      fontSize: 9,
      fontWeight: 700,
      padding: "3px 8px",
      borderRadius: 20,
      fontFamily: F,
      whiteSpace: "nowrap",
    }}
  >
    {ch}
  </span>
);
const Stamp = ({ emoji, label, date, color }) => (
  <div
    className="stamp"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px 5px",
      borderRadius: 11,
      background: C.w,
      border: `2px dashed ${color || Y}35`,
    }}
  >
    <div style={{ fontSize: 18, marginBottom: 2 }}>{emoji}</div>
    <div
      style={{
        color: color || C.t,
        fontWeight: 800,
        fontSize: 7,
        fontFamily: F,
        textAlign: "center",
        lineHeight: 1.2,
      }}
    >
      {label}
    </div>
    <div
      style={{
        color: C.tL,
        fontSize: 6,
        fontWeight: 600,
        fontFamily: F,
        marginTop: 1,
      }}
    >
      {date}
    </div>
  </div>
);
const SKYALogo = ({ sz = 24 }) => (
  <svg width={sz} height={sz} viewBox="0 0 100 100">
    <defs>
      <linearGradient id="skyaG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F5D060" />
        <stop offset="50%" stopColor="#EFC523" />
        <stop offset="100%" stopColor="#D4A017" />
      </linearGradient>
    </defs>
    <path
      d="M50 88C50 88 12 65 12 38C12 22 25 12 38 12C43 12 47 14 50 18C53 14 57 12 62 12C75 12 88 22 88 38C88 65 50 88 50 88Z"
      fill="url(#skyaG)"
      stroke="#C8960F"
      strokeWidth="2"
    />
    <text
      x="50"
      y="48"
      textAnchor="middle"
      fontFamily="Arial Black,sans-serif"
      fontWeight="900"
      fontSize="18"
      fill="#FFF"
      letterSpacing="-1"
    >
      SKYA
    </text>
    <text
      x="50"
      y="62"
      textAnchor="middle"
      fontFamily="Arial,sans-serif"
      fontWeight="700"
      fontSize="8"
      fill="rgba(255,255,255,.7)"
    >
      SEKUYA
    </text>
  </svg>
);
const FollowBtn = ({ followed, onTap, sm }: any = {}) => (
  <button
    onClick={onTap}
    style={{
      padding: sm ? "4px 10px" : "6px 14px",
      background: followed ? C.bg : Y,
      color: followed ? C.tM : C.t,
      border: followed ? `1px solid ${C.bd}` : "none",
      borderRadius: 8,
      fontSize: sm ? 9 : 10,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: F,
    }}
  >
    {followed ? "Following ✓" : "Follow"}
  </button>
);

/* ═══ MAP ═══ */
const CityMap = ({ zoom = 5, children, style: sx }) => {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = cv.offsetWidth,
      h = cv.offsetHeight;
    cv.width = w * dpr;
    cv.height = h * dpr;
    ctx.scale(dpr, dpr);
    const s = zoom / 5;
    ctx.save();
    ctx.translate((w * (1 - s)) / 2, (h * (1 - s)) / 2);
    ctx.scale(s, s);
    const W = w,
      H = h;
    ctx.fillStyle = "#F6F3EE";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#E3EBF3";
    ctx.beginPath();
    ctx.moveTo(0, H * 0.78);
    ctx.bezierCurveTo(
      W * 0.15,
      H * 0.72,
      W * 0.35,
      H * 0.82,
      W * 0.55,
      H * 0.76,
    );
    ctx.bezierCurveTo(W * 0.75, H * 0.7, W * 0.9, H * 0.8, W, H * 0.75);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.fill();
    ctx.fillStyle = "#E8F0E0";
    [
      [0.13, 0.32, 0.045, 0.03],
      [0.62, 0.54, 0.035, 0.025],
      [0.46, 0.42, 0.025, 0.02],
      [0.78, 0.48, 0.04, 0.03],
    ].forEach(([px, py, pw, ph]) => {
      ctx.beginPath();
      ctx.ellipse(px * W, py * H, pw * W, ph * H, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.strokeStyle = "#D8D2C8";
    ctx.lineWidth = Math.max(4, 5 / s);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0, H * 0.42);
    ctx.bezierCurveTo(W * 0.3, H * 0.4, W * 0.7, H * 0.44, W, H * 0.41);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(W * 0.48, 0);
    ctx.bezierCurveTo(W * 0.5, H * 0.35, W * 0.47, H * 0.65, W * 0.51, H);
    ctx.stroke();
    ctx.strokeStyle = "#E5E0D8";
    ctx.lineWidth = Math.max(1.5, 2 / s);
    [
      [
        [0.2, 0],
        [0.22, 0.5],
        [0.18, 1],
      ],
      [
        [0.75, 0],
        [0.73, 0.4],
        [0.78, 0.85],
      ],
      [
        [0, 0.22],
        [0.45, 0.24],
        [0.95, 0.2],
      ],
      [
        [0, 0.62],
        [0.5, 0.6],
        [1, 0.64],
      ],
      [
        [0.35, 0.1],
        [0.4, 0.5],
        [0.38, 0.85],
      ],
    ].forEach((p) => {
      ctx.beginPath();
      ctx.moveTo(p[0][0] * W, p[0][1] * H);
      ctx.quadraticCurveTo(p[1][0] * W, p[1][1] * H, p[2][0] * W, p[2][1] * H);
      ctx.stroke();
    });
    ctx.fillStyle = "#E8E4DD";
    ctx.strokeStyle = "#DDD8D0";
    ctx.lineWidth = 0.4 / s;
    [
      [0.08, 0.3, 0.08, 0.05],
      [0.25, 0.26, 0.06, 0.04],
      [0.54, 0.28, 0.09, 0.05],
      [0.7, 0.43, 0.06, 0.05],
      [0.82, 0.26, 0.07, 0.07],
      [0.15, 0.53, 0.04, 0.03],
      [0.38, 0.17, 0.07, 0.03],
      [0.48, 0.35, 0.04, 0.025],
      [0.82, 0.55, 0.05, 0.03],
      [0.33, 0.48, 0.035, 0.025],
    ].forEach(([bx, by, bw, bh]) => {
      ctx.fillRect(bx * W, by * H, bw * W, bh * H);
      ctx.strokeRect(bx * W, by * H, bw * W, bh * H);
    });
    ctx.fillStyle = "#C5BBAD";
    const fs = Math.max(5, 5.5 / s);
    ctx.font = `600 ${fs}px Outfit,sans-serif`;
    [
      ["Sudirman", 0.43, 0.39],
      ["Thamrin", 0.21, 0.53],
      ["SCBD", 0.56, 0.3],
      ["Kemang", 0.38, 0.76],
      ["Senayan", 0.15, 0.34],
      ["Kuningan", 0.72, 0.44],
      ["Menteng", 0.52, 0.2],
    ].forEach(([lb, lx, ly]: any) => ctx.fillText(lb, lx * W, ly * H));
    ctx.restore();
  }, [zoom]);
  return (
    <div style={{ position: "relative", ...sx }}>
      <canvas
        ref={ref}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
      {children}
    </div>
  );
};
const Pin = ({ x, y, emoji, label, alert, rank, live, onClick, sm }: any = {}) => (
  <div
    onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}
    style={{
      position: "absolute",
      left: `${x}%`,
      top: `${y}%`,
      transform: "translate(-50%,-100%)",
      zIndex: 10,
      cursor: "pointer",
    }}
  >
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          width: sm ? 26 : 34,
          height: sm ? 26 : 34,
          borderRadius: sm ? 7 : 9,
          background: alert ? "#FEE2E2" : C.w,
          border: alert ? `2px solid ${C.r}` : `1.5px solid ${C.bd}`,
          boxShadow: "0 2px 8px rgba(0,0,0,.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: sm ? 12 : 16,
          position: "relative",
        }}
      >
        {emoji}
        {live && (
          <div
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: C.g,
              border: `1.5px solid ${C.w}`,
              animation: "pulse 2s infinite",
            }}
          />
        )}
        {rank && (
          <div
            style={{
              position: "absolute",
              top: -3,
              left: -3,
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: rank === 1 ? Y : rank === 2 ? "#C0C0C0" : "#CD7F32",
              border: `1.5px solid ${C.w}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 5,
              fontWeight: 900,
              color: rank === 1 ? C.t : C.w,
              fontFamily: F,
            }}
          >
            {rank}
          </div>
        )}
      </div>
      {label && !sm && (
        <div
          style={{
            marginTop: 1,
            padding: "1px 4px",
            borderRadius: 4,
            background: alert ? C.r : C.w,
            border: alert ? "none" : `1px solid ${C.bd}`,
            maxWidth: 88,
          }}
        >
          <span
            style={{
              fontSize: 6.5,
              fontWeight: 700,
              fontFamily: F,
              color: alert ? C.w : C.t,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
            }}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  </div>
);

/* ═══ LANDING ═══ */
const Landing = ({ onCode }) => {
  const ref = useRef(null);
  useVis(ref);
  const [email, setE] = useState("");
  const [wl, setWL] = useState(false);
  const [cnt, setCnt] = useState(10756);
  const [modal, setM] = useState(false);
  const [code, setCode] = useState("");
  const [err, setErr] = useState(false);
  useEffect(() => {
    const id = setInterval(
      () => setCnt((v) => v + Math.floor(Math.random() * 3)),
      4500,
    );
    return () => clearInterval(id);
  }, []);
  const verify = () => {
    const c = code.toUpperCase().trim();
    if (VLD.has(c)) onCode(c);
    else {
      setErr(true);
      setTimeout(() => setErr(false), 2000);
    }
  };
  const cities = [
    "Jakarta",
    "Bali",
    "Singapore",
    "Tokyo",
    "London",
    "New York",
    "Berlin",
    "São Paulo",
    "Lagos",
    "Dubai",
    "Seoul",
    "Bangkok",
    "Sydney",
    "Mumbai",
  ];
  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        minHeight: "100vh",
        background: C.w,
        fontFamily: F,
      }}
    >
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "10px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255,255,255,.88)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Logo sz={19} dark />
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setM(true)}
            style={{
              padding: "7px 16px",
              background: "transparent",
              color: C.t,
              border: `1.5px solid ${C.bd}`,
              borderRadius: 9,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: F,
            }}
          >
            Enter Code
          </button>
          <button
            onClick={() =>
              document
                .getElementById("wl")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "7px 16px",
              background: Y,
              color: C.t,
              border: "none",
              borderRadius: 9,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: F,
            }}
          >
            Join Waitlist
          </button>
        </div>
      </nav>
      <section
        style={{ height: "100vh", position: "relative", overflow: "hidden" }}
      >
        <CityMap zoom={5} style={{ position: "absolute", inset: 0 }}>
          {EV.map((ev) => (
            <Pin
              key={ev.id}
              x={ev.x}
              y={ev.y}
              emoji={ev.e}
              label={ev.t}
              alert={ev.al}
              rank={ev.r}
              live={!ev.al}
            />
          ))}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "42%",
              transform: "translate(-50%,-50%)",
              zIndex: 20,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: Y,
                border: `3px solid ${C.w}`,
                boxShadow: `0 0 14px ${Y}50`,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 14,
                height: 14,
                borderRadius: "50%",
                border: `2px solid ${Y}40`,
                animation: "ripple 2s infinite",
              }}
            />
          </div>
        </CityMap>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg,rgba(255,255,255,.75) 0%,rgba(255,255,255,.25) 35%,rgba(255,255,255,.88) 100%)",
            zIndex: 25,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 20px",
            textAlign: "center",
          }}
        >
          <div
            className="fu"
            style={{
              animationDelay: ".1s",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 14px",
              borderRadius: 24,
              background: "rgba(255,255,255,.75)",
              border: "1px solid #eee",
              marginBottom: 16,
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: C.g,
                animation: "pulse 2s infinite",
              }}
            />
            <span style={{ color: C.tM, fontSize: 11, fontWeight: 600 }}>
              {cnt.toLocaleString()} people on the waitlist
            </span>
          </div>
          <h1
            className="fu"
            style={{
              animationDelay: ".2s",
              fontWeight: 900,
              fontSize: "clamp(34px,5.5vw,60px)",
              color: C.t,
              lineHeight: 1.06,
              marginBottom: 10,
              letterSpacing: "-2px",
              maxWidth: 680,
            }}
          >
            The Real Life
            <br />
            <span style={{ color: Y }}>Community Platform.</span>
          </h1>
          <p
            className="fu"
            style={{
              animationDelay: ".35s",
              color: C.tM,
              fontSize: "clamp(14px,1.6vw,18px)",
              lineHeight: 1.6,
              maxWidth: 440,
              marginBottom: 24,
              fontWeight: 400,
            }}
          >
            Discover events, join communities, and earn —<br />
            all happening in person. Welcome to Foldin.
          </p>
          <div
            className="fu"
            style={{
              animationDelay: ".5s",
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => setM(true)}
              style={{
                padding: "12px 26px",
                background: Y,
                color: C.t,
                border: "none",
                borderRadius: 11,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: F,
                boxShadow: `0 4px 20px ${Y}35`,
              }}
            >
              I have an invite code
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("wl")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              style={{
                padding: "12px 26px",
                background: C.w,
                color: C.t,
                border: `1.5px solid ${C.bd}`,
                borderRadius: 11,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: F,
              }}
            >
              Join Waitlist →
            </button>
          </div>
          <div
            className="fu"
            style={{
              animationDelay: ".6s",
              display: "flex",
              gap: 5,
              marginTop: 16,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[
              "☕ WFA spots",
              "🏃 Run clubs",
              "📊 Pitch nights",
              "🎸 Open mics",
              "🍜 Food fests",
              "🚨 Live alerts",
            ].map((t, i) => (
              <span
                key={i}
                style={{
                  padding: "3px 9px",
                  borderRadius: 7,
                  background: "rgba(255,255,255,.7)",
                  border: "1px solid #eee",
                  fontSize: 10,
                  fontWeight: 600,
                  color: C.tM,
                  backdropFilter: "blur(4px)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
      <div
        style={{
          borderTop: "1px solid #f0f0f0",
          borderBottom: "1px solid #f0f0f0",
          padding: "10px 0",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            gap: 36,
            animation: "marquee 28s linear infinite",
          }}
        >
          {[...cities, ...cities].map((c, i) => (
            <span
              key={i}
              style={{
                color: C.tLL,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      <section
        style={{ padding: "80px 28px", maxWidth: 720, margin: "0 auto" }}
      >
        {[
          { t: "Social media was meant to connect people.", o: 0.5 },
          { t: "It connected them virtually —", o: 0.5 },
          { t: "but disconnected them from reality.", hl: 1 },
          { t: "Now, AI is joining the bandwagon.", o: 0.45, sp: 1 },
          { t: "How do we adapt?", o: 0.55, sp: 1 },
          { t: "By showing up.", big: 1, sp: 1 },
          { t: "And being human.", big: 1, hl: 1 },
          { t: "That's our greatest advantage.", o: 0.45, sp: 1 },
        ].map((l, i) => (
          <div
            key={i}
            className="vis"
            style={{
              transitionDelay: `${i * 0.04}s`,
              marginTop: l.sp ? 36 : 6,
            }}
          >
            <p
              style={{
                fontWeight: l.big ? 900 : 400,
                fontSize: l.big
                  ? "clamp(26px,3.5vw,44px)"
                  : "clamp(15px,1.6vw,19px)",
                color: l.hl ? Y : `rgba(26,26,26,${l.o || 0.85})`,
                lineHeight: l.big ? 1.1 : 1.7,
                letterSpacing: l.big ? "-1.5px" : "0",
              }}
            >
              {l.t}
            </p>
          </div>
        ))}
        <div
          className="vis"
          style={{
            marginTop: 48,
            padding: "28px 32px",
            borderRadius: 18,
            background: YBg,
            border: `1px solid ${Y}18`,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(18px,2.2vw,28px)",
              color: C.t,
              lineHeight: 1.4,
            }}
          >
            Welcome to the{" "}
            <strong style={{ fontWeight: 800, color: Y }}>Host Economy</strong>.
          </p>
          <p style={{ color: C.tL, fontSize: 13, marginTop: 6 }}>
            Connect, contribute, and earn — in the real world.
          </p>
        </div>
      </section>
      <section style={{ padding: "48px 28px 72px", background: C.bg }}>
        <div
          className="vis"
          style={{ textAlign: "center", maxWidth: 500, margin: "0 auto 40px" }}
        >
          <p
            style={{
              color: Y,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            How it works
          </p>
          <h2
            style={{
              fontWeight: 900,
              fontSize: "clamp(22px,2.8vw,32px)",
              color: C.t,
              letterSpacing: "-1px",
              lineHeight: 1.15,
            }}
          >
            Real connections. Real places. Real value.
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 12,
            maxWidth: 960,
            margin: "0 auto",
          }}
        >
          {[
            {
              i: "🗺️",
              t: "Discover Nearby",
              d: "Live events & communities on an interactive map.",
              c: C.b,
            },
            {
              i: "👥",
              t: "Join Folds",
              d: "Permanent communities — public or private.",
              c: C.pu,
            },
            {
              i: "📅",
              t: "Attend Events",
              d: "RSVP, check in, collect passport stamps.",
              c: Y,
            },
            {
              i: "👻",
              t: "Ghost Encounters",
              d: "AI tracks path crossings with match scores.",
              c: "#EC4899",
            },
            {
              i: "💰",
              t: "Host & Earn",
              d: "Create events, set prices, build your audience.",
              c: C.go,
            },
            {
              i: "🔒",
              t: "Invite-Only",
              d: "1 code = 1 person. Quality > quantity.",
              c: C.g,
            },
          ].map((f, i) => (
            <div
              key={i}
              className="vis"
              style={{
                transitionDelay: `${i * 0.06}s`,
                padding: 22,
                borderRadius: 16,
                background: C.w,
                border: `1px solid ${C.bd}`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg,transparent,${f.c}30,transparent)`,
                }}
              />
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: `${f.c}0A`,
                  border: `1px solid ${f.c}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  marginBottom: 12,
                }}
              >
                {f.i}
              </div>
              <h3
                style={{
                  fontWeight: 800,
                  fontSize: 14,
                  color: C.t,
                  marginBottom: 4,
                }}
              >
                {f.t}
              </h3>
              <p style={{ color: C.tL, fontSize: 12, lineHeight: 1.6 }}>
                {f.d}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: "48px 28px", background: C.bg }}>
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            gap: 16,
            textAlign: "center",
          }}
        >
          {[
            { n: cnt.toLocaleString() + "+", l: "On Waitlist", c: Y },
            { n: "48", l: "Cities", c: C.cy },
            { n: "2.4K+", l: "Events Hosted", c: C.pu },
            { n: "$180K+", l: "Host Earnings", c: C.go },
          ].map((s, i) => (
            <div key={i} className="vis" style={{ padding: 18 }}>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 30,
                  color: s.c,
                  letterSpacing: "-1px",
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  color: C.tL,
                  fontSize: 11,
                  fontWeight: 600,
                  marginTop: 2,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="wl" style={{ padding: "80px 28px" }}>
        <div style={{ maxWidth: 460, margin: "0 auto", textAlign: "center" }}>
          <div className="vis">
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: `linear-gradient(135deg,${Y},${YD})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                animation: "glow 3s ease infinite",
              }}
            >
              <Logo sz={20} />
            </div>
            <h2
              style={{
                fontWeight: 900,
                fontSize: "clamp(22px,2.5vw,32px)",
                color: C.t,
                marginBottom: 6,
                letterSpacing: "-1px",
              }}
            >
              Ready to show up?
            </h2>
            <p
              style={{
                color: C.tL,
                fontSize: 13,
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              1 code = 1 person · 5 invites each
            </p>
          </div>
          <div className="vis" style={{ transitionDelay: ".1s" }}>
            <button
              onClick={() => setM(true)}
              style={{
                width: "100%",
                padding: 14,
                background: Y,
                color: C.t,
                border: "none",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: F,
                marginBottom: 12,
              }}
            >
              Enter Invite Code
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
              }}
            >
              <div style={{ flex: 1, height: 1, background: "#eee" }} />
              <span style={{ color: C.tLL, fontSize: 10 }}>or</span>
              <div style={{ flex: 1, height: 1, background: "#eee" }} />
            </div>
            {!wl ? (
              <div style={{ display: "flex", gap: 6 }}>
                <input
                  value={email}
                  onChange={(e) => setE(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    flex: 1,
                    padding: "12px 14px",
                    background: C.bg,
                    border: `1.5px solid ${C.bd}`,
                    borderRadius: 10,
                    color: C.t,
                    fontSize: 13,
                    fontFamily: F,
                    outline: "none",
                  }}
                />
                <button
                  onClick={() => {
                    if (email) setWL(true);
                  }}
                  disabled={!email}
                  style={{
                    padding: "12px 20px",
                    background: email ? C.bg : "#f5f5f5",
                    color: email ? C.t : C.tLL,
                    border: `1px solid ${C.bd}`,
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: email ? "pointer" : "default",
                    fontFamily: F,
                  }}
                >
                  Join
                </button>
              </div>
            ) : (
              <div
                style={{
                  padding: 20,
                  borderRadius: 14,
                  background: C.gBg,
                  border: `1px solid ${C.g}15`,
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 4 }}>✨</div>
                <div style={{ color: C.g, fontWeight: 800, fontSize: 15 }}>
                  You're #{cnt + 1} on the waitlist!
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <footer
        style={{
          padding: "28px",
          borderTop: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo sz={14} dark />
        <span style={{ color: C.tLL, fontSize: 10 }}>© 2026 Foldin</span>
      </footer>
      {modal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,.4)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={() => setM(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 380,
              background: C.w,
              borderRadius: 20,
              padding: 32,
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,.15)",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔑</div>
            <h3 style={{ fontWeight: 900, fontSize: 22, marginBottom: 4 }}>
              Enter invite code
            </h3>
            <p style={{ color: C.tL, fontSize: 11, marginBottom: 16 }}>
              1 code = 1 person
            </p>
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setErr(false);
              }}
              placeholder="FOLDIN-XXXX-XXXX"
              style={{
                width: "100%",
                padding: 14,
                background: C.bg,
                border: err ? `2px solid ${C.r}` : `2px solid ${C.bd}`,
                borderRadius: 12,
                color: C.t,
                fontSize: 15,
                fontFamily: "'Courier New',monospace",
                letterSpacing: "2px",
                outline: "none",
                textAlign: "center",
                marginBottom: 10,
              }}
            />
            <button
              onClick={verify}
              disabled={!code}
              style={{
                width: "100%",
                padding: 12,
                background: code ? Y : "#eee",
                color: code ? C.t : C.tLL,
                border: "none",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 800,
                cursor: code ? "pointer" : "default",
                fontFamily: F,
              }}
            >
              Verify →
            </button>
            {err && (
              <p style={{ color: C.r, fontSize: 10, marginTop: 6 }}>
                Invalid code.
              </p>
            )}
            <p
              onClick={() => setM(false)}
              style={{
                color: C.tL,
                fontSize: 10,
                marginTop: 10,
                cursor: "pointer",
              }}
            >
              ← Back
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

/* ═══ ONBOARDING (with #12 private/public) ═══ */
const Onboard = ({ vc, onDone }) => {
  const mc = genCh(vc);
  const uNum = getUN(vc);
  const per = getP(uNum);
  const autoF = getAutoFollowers(uNum);
  const [step, setS] = useState(0);
  const [am, setAM] = useState("");
  const [otp, setOtp] = useState("");
  const [os, setOS] = useState(false);
  const [un, setU] = useState("");
  const [dn, setDN] = useState("");
  const [bio, setBio] = useState("");
  const [ints, setI] = useState([]);
  const [priv, setPr] = useState(false);
  const [cp, setCP] = useState(-1);
  const tog = (id) =>
    setI((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const Wrap = ({ children, pct }) => (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: C.w,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: F,
        padding: 32,
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        {pct !== undefined && (
          <div
            style={{
              marginBottom: 20,
              height: 3,
              borderRadius: 2,
              background: "#f0f0f0",
            }}
          >
            <div
              style={{
                width: `${pct}%`,
                height: "100%",
                borderRadius: 2,
                background: Y,
                transition: "width .3s",
              }}
            />
          </div>
        )}
        {children}
      </div>
    </div>
  );

  if (step === 0)
    return (
      <Wrap pct={25}>
        <div className="fi" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>🔐</div>
          <h2 style={{ fontWeight: 900, fontSize: 22, marginBottom: 4 }}>
            Verify your identity
          </h2>
          <p style={{ color: C.tL, fontSize: 12, marginBottom: 20 }}>
            Sign in with social or phone/email.
          </p>
          {!os ? (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  marginBottom: 12,
                }}
              >
                {[
                  { id: "google", l: "Continue with Google", e: "🔵" },
                  { id: "apple", l: "Continue with Apple", e: "🍎" },
                  { id: "ig", l: "Continue with Instagram", e: "📸" },
                  { id: "x", l: "Continue with X", e: "𝕏" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setAM(m.id);
                      setOS(true);
                    }}
                    style={{
                      width: "100%",
                      padding: 12,
                      background: C.bg,
                      border: `1.5px solid ${C.bd}`,
                      borderRadius: 10,
                      color: C.t,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: F,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ fontSize: 15 }}>{m.e}</span>
                    {m.l}
                  </button>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  margin: "12px 0",
                }}
              >
                <div style={{ flex: 1, height: 1, background: "#eee" }} />
                <span style={{ color: C.tLL, fontSize: 9 }}>or</span>
                <div style={{ flex: 1, height: 1, background: "#eee" }} />
              </div>
              <input
                value={am}
                onChange={(e) => setAM(e.target.value)}
                placeholder="Phone or email"
                style={{
                  width: "100%",
                  padding: 12,
                  background: C.bg,
                  border: `1.5px solid ${C.bd}`,
                  borderRadius: 10,
                  color: C.t,
                  fontSize: 13,
                  fontFamily: F,
                  outline: "none",
                  textAlign: "center",
                  marginBottom: 8,
                }}
              />
              <button
                onClick={() => {
                  if (am) setOS(true);
                }}
                disabled={!am}
                style={{
                  width: "100%",
                  padding: 12,
                  background: am ? Y : "#eee",
                  color: am ? C.t : C.tLL,
                  border: "none",
                  borderRadius: 11,
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: am ? "pointer" : "default",
                  fontFamily: F,
                }}
              >
                Send OTP →
              </button>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 28, marginBottom: 4 }}>📨</div>
              <p
                style={{
                  color: Y,
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 14,
                }}
              >
                OTP sent
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  justifyContent: "center",
                  marginBottom: 14,
                }}
              >
                {[0, 1, 2, 3].map((i) => (
                  <input
                    key={i}
                    maxLength={1}
                    value={otp[i] || ""}
                    onChange={(e) => {
                      const v = otp.split("");
                      v[i] = e.target.value;
                      setOtp(v.join(""));
                      if (e.target.value && i < 3)
                        (e.target.nextSibling as HTMLElement)?.focus();
                    }}
                    style={{
                      width: 50,
                      height: 54,
                      background: C.bg,
                      border: `2px solid ${otp[i] ? Y : C.bd}`,
                      borderRadius: 12,
                      color: C.t,
                      fontSize: 22,
                      fontWeight: 900,
                      fontFamily: F,
                      textAlign: "center",
                      outline: "none",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  if (otp.length >= 4) setS(1);
                }}
                disabled={otp.length < 4}
                style={{
                  width: "100%",
                  padding: 12,
                  background: otp.length >= 4 ? Y : "#eee",
                  color: otp.length >= 4 ? C.t : C.tLL,
                  border: "none",
                  borderRadius: 11,
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: otp.length >= 4 ? "pointer" : "default",
                  fontFamily: F,
                }}
              >
                Verify →
              </button>
              <p
                onClick={() => setOS(false)}
                style={{
                  color: C.tL,
                  fontSize: 10,
                  marginTop: 8,
                  cursor: "pointer",
                }}
              >
                ← Different method
              </p>
            </div>
          )}
        </div>
      </Wrap>
    );

  if (step === 1)
    return (
      <Wrap pct={50}>
        <div className="fi">
          <h2 style={{ fontWeight: 900, fontSize: 20, marginBottom: 12 }}>
            Set up your profile
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <Av
              l={dn ? dn[0].toUpperCase() : "?"}
              sz={50}
              bd={`3px solid ${Y}`}
            />
          </div>
          {[
            ["Username", un, setU, "@handle"],
            ["Display Name", dn, setDN, "Your name"],
            ["Bio", bio, setBio, "About you"],
          ].map(([lb, v, s, ph]: any, i: any) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <label
                style={{
                  color: C.tL,
                  fontSize: 9,
                  fontWeight: 700,
                  display: "block",
                  marginBottom: 3,
                }}
              >
                {lb}
              </label>
              <input
                value={v}
                onChange={(e) => s(e.target.value)}
                placeholder={ph}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: C.bg,
                  border: `1.5px solid ${v ? Y + "60" : C.bd}`,
                  borderRadius: 10,
                  color: C.t,
                  fontSize: 13,
                  fontFamily: F,
                  outline: "none",
                }}
              />
            </div>
          ))}
          <label
            style={{
              color: C.tL,
              fontSize: 9,
              fontWeight: 700,
              display: "block",
              marginBottom: 3,
            }}
          >
            Interests
          </label>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              marginBottom: 10,
            }}
          >
            {CATS.map((c) => (
              <div
                key={c.id}
                onClick={() => tog(c.id)}
                style={{
                  padding: "4px 9px",
                  borderRadius: 7,
                  cursor: "pointer",
                  background: ints.includes(c.id) ? `${Y}15` : C.bg,
                  border: ints.includes(c.id)
                    ? `1px solid ${Y}40`
                    : `1px solid ${C.bd}`,
                  color: ints.includes(c.id) ? C.t : C.tL,
                  fontSize: 10,
                  fontWeight: 600,
                }}
              >
                {c.e} {c.l}
              </div>
            ))}
          </div>
          {/* #12 Private/Public */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: 12,
              borderRadius: 12,
              background: C.bg,
              border: `1px solid ${C.bd}`,
              marginBottom: 12,
            }}
          >
            <div
              onClick={() => setPr(!priv)}
              style={{
                width: 38,
                height: 20,
                borderRadius: 10,
                background: priv ? Y : "#ddd",
                cursor: "pointer",
                position: "relative",
                transition: "background .2s",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  background: C.w,
                  position: "absolute",
                  top: 2,
                  left: priv ? 20 : 2,
                  transition: "left .2s",
                  boxShadow: "0 1px 3px rgba(0,0,0,.15)",
                }}
              />
            </div>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700 }}>
                {priv ? "🔒 Private Account" : "🌐 Public Account"}
              </span>
              <div style={{ color: C.tL, fontSize: 9 }}>
                {priv
                  ? "Followers need your approval"
                  : "Anyone can see your profile"}
              </div>
            </div>
          </div>
          <button
            onClick={() => setS(2)}
            disabled={!un || !dn}
            style={{
              width: "100%",
              padding: 12,
              background: un && dn ? Y : "#eee",
              color: un && dn ? C.t : C.tLL,
              border: "none",
              borderRadius: 11,
              fontSize: 14,
              fontWeight: 800,
              cursor: un && dn ? "pointer" : "default",
              fontFamily: F,
            }}
          >
            Continue →
          </button>
        </div>
      </Wrap>
    );

  if (step === 2)
    return (
      <Wrap pct={100}>
        <div className="fi" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 4 }}>🎉</div>
          <h2 style={{ fontWeight: 900, fontSize: 22, marginBottom: 2 }}>
            Welcome, {dn}!
          </h2>
          <p style={{ color: C.tL, fontSize: 12 }}>
            User #{uNum}
            {isOG(uNum) ? " · 👑 OG Member" : ""}
          </p>
          {/* #11 Auto followers from key position */}
          <div
            style={{
              padding: "8px 16px",
              borderRadius: 10,
              background: C.gBg,
              border: `1px solid ${C.g}15`,
              display: "inline-block",
              margin: "8px 0",
            }}
          >
            <span style={{ color: C.g, fontWeight: 800, fontSize: 12 }}>
              🎯 {autoF.toLocaleString()} followers waiting for you!
            </span>
            <div style={{ color: C.tL, fontSize: 9 }}>
              Genesis key holders get automatic followers at launch
            </div>
          </div>
          <div
            style={{
              margin: "8px auto",
              padding: "12px 18px",
              borderRadius: 14,
              background: `${per.c}08`,
              border: `1.5px solid ${per.c}20`,
              display: "inline-block",
            }}
          >
            <div style={{ fontSize: 26 }}>{per.e}</div>
            <div style={{ color: per.c, fontWeight: 900, fontSize: 14 }}>
              {per.t}
            </div>
            <div style={{ color: C.tL, fontSize: 10 }}>{per.d}</div>
          </div>
          <p style={{ color: C.tL, fontSize: 10, margin: "10px 0 6px" }}>
            Your 5 invite codes:
          </p>
          {mc.map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 10px",
                background: C.bg,
                borderRadius: 8,
                border: `1px solid ${C.bd}`,
                marginBottom: 3,
              }}
            >
              <div
                style={{
                  flex: 1,
                  color: C.t,
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: "'Courier New',monospace",
                  letterSpacing: "1px",
                  textAlign: "left",
                }}
              >
                {c}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(c);
                  setCP(i);
                  setTimeout(() => setCP(-1), 1200);
                }}
                style={{
                  background: cp === i ? C.g : Y,
                  color: cp === i ? C.w : C.t,
                  border: "none",
                  borderRadius: 6,
                  padding: "3px 10px",
                  fontSize: 8,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: F,
                }}
              >
                {cp === i ? "✓" : "Copy"}
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              onDone({
                code: vc,
                username: un,
                displayName: dn,
                bio,
                interests: ints,
                userNum: uNum,
                og: isOG(uNum),
                codes: mc,
                persona: per,
                verified: false,
                isPrivate: priv,
                followers: autoF,
                following: 0,
              })
            }
            style={{
              width: "100%",
              padding: 13,
              background: Y,
              color: C.t,
              border: "none",
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: F,
              marginTop: 14,
            }}
          >
            Enter Foldin →
          </button>
        </div>
      </Wrap>
    );
  return null;
};

/* ═══ WEB APP ═══ */
const App = ({ u, setU }) => {
  const [s, setS] = useState("home");
  const [sel, setSel] = useState(null);
  const [zoom, setZ] = useState(5);
  const [rad, setR] = useState(5);
  const go = (x) => {
    setSel(null);
    setS(x);
  };
  const goEv = (ev) => {
    setSel(ev);
    setS("event");
  };
  const n = u?.userNum || 1;
  const og = u?.og;
  const per = u?.persona || PER[0];
  const vf = u?.verified;

  /* Sidebar */
  const SB = () => (
    <div
      style={{
        width: 180,
        background: C.w,
        borderRight: `1px solid ${C.bd}`,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      <div style={{ padding: "14px 12px 10px" }}>
        <Logo sz={18} dark />
      </div>
      <div style={{ flex: 1, padding: "0 6px", overflow: "auto" }}>
        {[
          { id: "home", i: "🗺️", l: "Discover" },
          { id: "explore", i: "🔍", l: "Explore" },
          { id: "posts", i: "📢", l: "Posts" },
          { id: "dm", i: "💬", l: "Messages", badge: 7 },
          { id: "scan", i: "📷", l: "Scan" },
          { id: "ghost", i: "👻", l: "Ghosts" },
          { id: "circle", i: "📍", l: "Circle" },
          { id: "leaderboard", i: "🏆", l: "Leaderboard" },
          { id: "wallet", i: "💰", l: "Wallet" },
          { id: "profile", i: "👤", l: "Profile" },
        ].map((n2) => (
          <div
            key={n2.id}
            onClick={() => go(n2.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "7px 9px",
              borderRadius: 8,
              cursor: "pointer",
              background:
                s === n2.id || (s === "event" && n2.id === "home")
                  ? YLL
                  : "transparent",
              color: s === n2.id ? C.t : C.tM,
              marginBottom: 1,
              position: "relative",
            }}
          >
            <span style={{ fontSize: 13 }}>{n2.i}</span>
            <span style={{ fontSize: 11, fontWeight: s === n2.id ? 800 : 600 }}>
              {n2.l}
            </span>
            {n2.badge > 0 && (
              <div
                style={{
                  marginLeft: "auto",
                  minWidth: 15,
                  height: 15,
                  borderRadius: 8,
                  background: C.r,
                  color: C.w,
                  fontSize: 7,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {n2.badge}
              </div>
            )}
          </div>
        ))}
        <div
          onClick={() => go("create")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "7px 9px",
            borderRadius: 8,
            cursor: "pointer",
            background: Y,
            color: C.t,
            marginTop: 4,
          }}
        >
          <span style={{ fontSize: 13 }}>✚</span>
          <span style={{ fontSize: 11, fontWeight: 800 }}>Create</span>
        </div>
      </div>
      <div style={{ padding: "8px 10px", borderTop: `1px solid ${C.bd}` }}>
        <div
          onClick={() => go("profile")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
          }}
        >
          <Av
            l={u?.displayName?.[0] || "?"}
            sz={26}
            bd={og ? `2px solid ${C.go}` : ""}
            vf={vf}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: 9 }}>{u?.displayName}</div>
            <div style={{ color: C.tL, fontSize: 8 }}>@{u?.username}</div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── HOME ── */
  const Home = () => (
    <div
      style={{ flex: 1, display: "flex", height: "100vh", overflow: "hidden" }}
    >
      <div style={{ flex: 1, position: "relative" }}>
        <CityMap zoom={zoom} style={{ position: "absolute", inset: 0 }}>
          {EV.map((ev) => (
            <Pin
              key={ev.id}
              x={ev.x}
              y={ev.y}
              emoji={ev.e}
              label={ev.t}
              alert={ev.al}
              rank={ev.r}
              live={!ev.al}
              onClick={() => goEv(ev)}
              sm={zoom < 4}
            />
          ))}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "42%",
              transform: "translate(-50%,-50%)",
              zIndex: 20,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: Y,
                border: `3px solid ${C.w}`,
                boxShadow: `0 0 12px ${Y}50`,
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "42%",
              width: Math.min(rad * 14 + 30, 300),
              height: Math.min(rad * 14 + 30, 300),
              borderRadius: "50%",
              transform: "translate(-50%,-50%)",
              border: `1.5px solid ${Y}20`,
              background: `radial-gradient(circle,${Y}04 0%,transparent 70%)`,
              transition: "all .4s",
              zIndex: 4,
            }}
          />
        </CityMap>
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 30,
            padding: "8px 12px",
            background: "rgba(255,255,255,.92)",
            backdropFilter: "blur(10px)",
            borderRadius: 10,
            border: `1px solid ${C.bd}`,
            minWidth: 170,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 3,
            }}
          >
            <span style={{ color: C.tL, fontSize: 8, fontWeight: 700 }}>
              RADIUS
            </span>
            <span style={{ color: Y, fontSize: 11, fontWeight: 800 }}>
              {rad}km
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            value={rad}
            onChange={(e) => setR(+e.target.value)}
            style={{ width: "100%", accentColor: Y }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {[
            { l: "+", f: () => setZ((z) => Math.min(z + 1, 10)) },
            { l: "−", f: () => setZ((z) => Math.max(z - 1, 1)) },
          ].map((b, i) => (
            <div
              key={i}
              onClick={b.f}
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(255,255,255,.9)",
                border: `1px solid ${C.bd}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 700,
                color: C.t,
              }}
            >
              {b.l}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          width: 300,
          background: C.bg,
          borderLeft: `1px solid ${C.bd}`,
          overflow: "auto",
          flexShrink: 0,
          padding: 12,
        }}
      >
        <h3 style={{ fontWeight: 800, fontSize: 13, marginBottom: 2 }}>
          Jakarta · {rad}km
        </h3>
        <p style={{ color: C.tL, fontSize: 10, marginBottom: 8 }}>
          {EV.length} live events
        </p>
        {EV.filter((e) => e.al).map((a) => (
          <div
            key={a.id}
            onClick={() => goEv(a)}
            style={{
              padding: "7px 9px",
              borderRadius: 9,
              background: C.rBg,
              border: `1px solid ${C.r}18`,
              marginBottom: 3,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginBottom: 1,
              }}
            >
              <span style={{ fontSize: 11 }}>{a.e}</span>
              <span style={{ color: C.r, fontWeight: 800, fontSize: 9 }}>
                {a.t}
              </span>
            </div>
            <p style={{ color: C.tM, fontSize: 8, lineHeight: 1.4 }}>
              {a.desc}
            </p>
          </div>
        ))}
        <h4 style={{ fontWeight: 800, fontSize: 10, margin: "6px 0 3px" }}>
          🔴 Live
        </h4>
        {EV.filter((e) => !e.al).map((ev) => (
          <div
            key={ev.id}
            onClick={() => goEv(ev)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 7px",
              borderRadius: 8,
              background: C.w,
              border: `1px solid ${C.bd}`,
              marginBottom: 2,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: YBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                flexShrink: 0,
              }}
            >
              {ev.e}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 9.5,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {ev.t}
              </div>
              <div style={{ color: C.tL, fontSize: 7 }}>
                📍 {ev.v} · 👥 {ev.m}
              </div>
            </div>
            {ev.price ? (
              <Tag ch={ev.price} co={C.go} bg={C.goBg} />
            ) : (
              <Tag ch="FREE" co={C.g} bg={C.gBg} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  /* ── EVENT (#13 host info) ── */
  const Event = () => {
    const ev = sel;
    const [j, setJ] = useState(false);
    if (!ev)
      return (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ color: C.tL }}>Select an event</p>
        </div>
      );
    const hIcons = { brand: "🏢", fold: "👥", individual: "👤" };
    return (
      <div style={{ flex: 1, overflow: "auto", padding: 28, maxWidth: 640 }}>
        <div
          onClick={() => go("home")}
          style={{
            color: Y,
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            marginBottom: 12,
          }}
        >
          ← Back
        </div>
        <div
          style={{
            padding: 20,
            borderRadius: 16,
            background: C.w,
            border: `1px solid ${ev.al ? C.r + "28" : C.bd}`,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: ev.al ? C.rBg : YBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
              }}
            >
              {ev.e}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontWeight: 900, fontSize: 18 }}>{ev.t}</h2>
              {ev.al ? (
                <Tag ch="🔴 ALERT" co={C.w} bg={C.r} />
              ) : (
                <Tag ch="🔴 LIVE" co={C.w} bg={C.g} />
              )}
            </div>
          </div>
          <div
            style={{
              padding: "12px 14px",
              background: ev.al ? C.rBg : C.bg,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <p style={{ color: C.tM, fontSize: 12, lineHeight: 1.6 }}>
              {ev.desc}
            </p>
          </div>
          {/* #13 Host info */}
          <div
            style={{
              padding: "10px 12px",
              background: C.bg,
              borderRadius: 10,
              border: `1px solid ${C.bd}`,
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: YBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
              }}
            >
              {hIcons[ev.hType] || "👤"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 11 }}>{ev.h}</div>
              <div style={{ color: C.tL, fontSize: 9 }}>
                {ev.hType === "brand"
                  ? "Brand / Organization"
                  : ev.hType === "fold"
                    ? "Fold Community"
                    : "Individual Host"}
                {ev.hUser ? ` · ${ev.hUser}` : ""}
              </div>
            </div>
            <FollowBtn followed={false} sm />
          </div>
          {[
            ["📍", ev.v],
            ["👥", `${ev.m}${ev.cap ? "/" + ev.cap : ""} people`],
            ["💰", ev.price ? `IDR ${ev.price}` : "FREE"],
          ].map(([ic, tx], i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 3,
              }}
            >
              <span style={{ fontSize: 11 }}>{ic}</span>
              <span style={{ color: C.tM, fontSize: 11 }}>{tx}</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
            <button
              onClick={() => setJ(!j)}
              style={{
                flex: 1,
                padding: 10,
                background: j ? C.g : ev.al ? C.r : Y,
                color: j ? C.w : C.t,
                border: "none",
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: F,
              }}
            >
              {ev.al
                ? j
                  ? "✓ Following"
                  : "Follow Alert"
                : j
                  ? "✓ Joined"
                  : "Join"}
            </button>
            <button
              style={{
                padding: "10px 14px",
                background: C.bg,
                color: C.tM,
                border: `1px solid ${C.bd}`,
                borderRadius: 10,
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: F,
              }}
            >
              📤
            </button>
          </div>
        </div>
        <h4 style={{ fontWeight: 800, fontSize: 12, marginBottom: 6 }}>
          💬 Discussion
        </h4>
        {[
          {
            u: ev.h,
            t: ev.al ? ev.desc.split(".")[0] + "." : "Welcome everyone! 🎉",
            time: "2m",
            host: 1,
          },
          { u: "Maya", t: ev.al ? "Stay safe!" : "On my way!", time: "5m" },
        ].map((m, i) => (
          <div
            key={i}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              marginBottom: 3,
              background: m.host ? YBg : C.w,
              border: `1px solid ${m.host ? Y + "18" : C.bd}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginBottom: 1,
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 10 }}>{m.u}</span>
              {m.host && <Tag ch="HOST" co={C.w} bg={Y} />}
              <span style={{ color: C.tLL, fontSize: 8, marginLeft: "auto" }}>
                {m.time}
              </span>
            </div>
            <p style={{ color: C.tM, fontSize: 11 }}>{m.t}</p>
          </div>
        ))}
        <div style={{ display: "flex", gap: 5, marginTop: 6 }}>
          <input
            placeholder="Say something..."
            style={{
              flex: 1,
              padding: "8px 12px",
              background: C.bg,
              border: `1px solid ${C.bd}`,
              borderRadius: 8,
              color: C.t,
              fontSize: 11,
              fontFamily: F,
              outline: "none",
            }}
          />
          <button
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              background: Y,
              border: "none",
              cursor: "pointer",
              color: C.t,
              fontSize: 12,
              fontWeight: 700,
              fontFamily: F,
            }}
          >
            Send
          </button>
        </div>
      </div>
    );
  };

  /* ── EXPLORE ── */
  const Explore = () => {
    const [tab, setT] = useState("live");
    const [q, setQ] = useState("");
    const all = { live: EV, upcoming: UPC, global: GLB };
    const list = (all[tab] || []).filter(
      (e) => !q || e.t.toLowerCase().includes(q.toLowerCase()),
    );
    return (
      <div style={{ flex: 1, overflow: "auto", padding: 28, maxWidth: 700 }}>
        <h2 style={{ fontWeight: 900, fontSize: 20, marginBottom: 2 }}>
          Explore Events
        </h2>
        <p style={{ color: C.tL, fontSize: 11, marginBottom: 10 }}>
          Discover what's happening
        </p>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search events, venues..."
          style={{
            width: "100%",
            padding: "10px 14px",
            background: C.w,
            border: `1.5px solid ${C.bd}`,
            borderRadius: 10,
            fontSize: 12,
            fontFamily: F,
            outline: "none",
            color: C.t,
            marginBottom: 10,
          }}
        />
        <div style={{ display: "flex", gap: 5, marginBottom: 12 }}>
          {[
            { id: "live", l: `🔴 Live (${EV.length})` },
            { id: "upcoming", l: "⏳ Upcoming" },
            { id: "global", l: "🌏 Global" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setT(t.id)}
              style={{
                padding: "6px 14px",
                borderRadius: 9,
                cursor: "pointer",
                background: tab === t.id ? Y : C.w,
                color: tab === t.id ? C.t : C.tM,
                border: tab === t.id ? "none" : `1px solid ${C.bd}`,
                fontWeight: 700,
                fontSize: 10,
                fontFamily: F,
              }}
            >
              {t.l}
            </button>
          ))}
        </div>
        {list.map((ev) => (
          <div
            key={ev.id}
            onClick={() => goEv(ev)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 12,
              background: C.w,
              border: `1px solid ${ev.al ? C.r + "20" : C.bd}`,
              marginBottom: 4,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: ev.al ? C.rBg : YBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              {ev.e}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 12 }}>{ev.t}</div>
              <div style={{ color: C.tL, fontSize: 8 }}>
                📍 {ev.v}
                {ev.hUser ? ` · by ${ev.hUser}` : ""}
              </div>
              <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
                <span style={{ color: C.tL, fontSize: 8 }}>
                  👥 {ev.m || "—"}
                </span>
                {ev.d && (
                  <span style={{ color: C.tL, fontSize: 8 }}>📅 {ev.d}</span>
                )}
                {ev.scope && <Tag ch={ev.scope} />}
                {ev.al ? (
                  <Tag ch="ALERT" co={C.w} bg={C.r} />
                ) : ev.price ? (
                  <Tag
                    ch={
                      typeof ev.price === "string" && ev.price.startsWith("$")
                        ? ev.price
                        : `IDR ${ev.price}`
                    }
                    co={C.go}
                    bg={C.goBg}
                  />
                ) : (
                  <Tag ch="FREE" co={C.g} bg={C.gBg} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  /* ── #1 POSTS with location pin, WFA/WFC, circle/public, filters ── */
  const PostsV = () => {
    const [tab, setT] = useState("all");
    const [scope, setSc] = useState("public");
    const [newP, setNP] = useState("");
    const [showPin, setSP] = useState(false);
    const filtered = POSTS.filter((p) => {
      if (tab === "circle") return p.scope === "circle";
      if (tab === "nearby") return p.pin;
      return true;
    });
    return (
      <div style={{ flex: 1, overflow: "auto", padding: 28, maxWidth: 640 }}>
        <h2 style={{ fontWeight: 900, fontSize: 20, marginBottom: 10 }}>
          Posts
        </h2>
        {/* Create post */}
        <div
          style={{
            padding: 14,
            borderRadius: 14,
            background: C.w,
            border: `1px solid ${C.bd}`,
            marginBottom: 12,
          }}
        >
          <textarea
            value={newP}
            onChange={(e) => setNP(e.target.value)}
            placeholder="Share what's happening... WFA? WFC? Drop a pin! 📍"
            rows={2}
            style={{
              width: "100%",
              padding: 0,
              background: "transparent",
              border: "none",
              color: C.t,
              fontSize: 12,
              fontFamily: F,
              outline: "none",
              resize: "none",
              marginBottom: 8,
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setSP(!showPin)}
              style={{
                padding: "4px 10px",
                borderRadius: 7,
                background: showPin ? YBg : C.bg,
                border: `1px solid ${showPin ? Y + "40" : C.bd}`,
                fontSize: 9,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: F,
                color: showPin ? C.t : C.tM,
              }}
            >
              📍 Drop Pin
            </button>
            <button
              style={{
                padding: "4px 10px",
                borderRadius: 7,
                background: C.bg,
                border: `1px solid ${C.bd}`,
                fontSize: 9,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: F,
                color: C.tM,
              }}
            >
              ☕ WFA
            </button>
            <button
              style={{
                padding: "4px 10px",
                borderRadius: 7,
                background: C.bg,
                border: `1px solid ${C.bd}`,
                fontSize: 9,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: F,
                color: C.tM,
              }}
            >
              💻 WFC
            </button>
            <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
              <button
                onClick={() => setSc(scope === "public" ? "circle" : "public")}
                style={{
                  padding: "4px 10px",
                  borderRadius: 7,
                  background: scope === "circle" ? C.bBg : C.bg,
                  border: `1px solid ${scope === "circle" ? C.b + "30" : C.bd}`,
                  fontSize: 9,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: F,
                  color: scope === "circle" ? C.b : C.tM,
                }}
              >
                {scope === "circle" ? "🔒 Circle" : "🌐 Public"}
              </button>
              <button
                disabled={!newP}
                style={{
                  padding: "4px 14px",
                  borderRadius: 7,
                  background: newP ? Y : "#eee",
                  color: newP ? C.t : C.tLL,
                  border: "none",
                  fontSize: 9,
                  fontWeight: 800,
                  cursor: newP ? "pointer" : "default",
                  fontFamily: F,
                }}
              >
                Post
              </button>
            </div>
          </div>
          {showPin && (
            <div
              style={{
                marginTop: 8,
                padding: 8,
                borderRadius: 8,
                background: YBg,
                border: `1px dashed ${Y}30`,
              }}
            >
              <div style={{ fontSize: 9, color: C.tM, fontWeight: 600 }}>
                📍 Pin location:{" "}
                <span style={{ color: Y, fontWeight: 700 }}>
                  Kopi Kenangan SCBD
                </span>{" "}
                <span style={{ color: C.tL, fontSize: 8 }}>
                  (tap to change)
                </span>
              </div>
            </div>
          )}
        </div>
        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
          {[
            { id: "all", l: "🌐 All" },
            { id: "nearby", l: "📍 Nearby" },
            { id: "circle", l: "🔒 My Circle" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setT(t.id)}
              style={{
                padding: "5px 12px",
                borderRadius: 8,
                cursor: "pointer",
                background: tab === t.id ? Y : C.w,
                color: tab === t.id ? C.t : C.tM,
                border: tab === t.id ? "none" : `1px solid ${C.bd}`,
                fontWeight: 700,
                fontSize: 10,
                fontFamily: F,
              }}
            >
              {t.l}
            </button>
          ))}
        </div>
        {filtered.map((p) => (
          <div
            key={p.id}
            style={{
              padding: "12px 14px",
              borderRadius: 12,
              background: C.w,
              border: `1px solid ${C.bd}`,
              marginBottom: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 7,
                  background: YBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                }}
              >
                {p.av}
              </div>
              <span style={{ fontWeight: 700, fontSize: 11 }}>{p.u}</span>
              {p.type === "wfa" && <Tag ch="☕ WFA" co={C.go} bg={C.goBg} />}
              {p.type === "wfc" && <Tag ch="💻 WFC" co={C.b} bg={C.bBg} />}
              {p.scope === "circle" && <Tag ch="🔒" co={C.pu} bg={C.puBg} />}
              <span style={{ color: C.tL, fontSize: 9, marginLeft: "auto" }}>
                · {p.time}
              </span>
            </div>
            <p
              style={{
                fontSize: 12,
                lineHeight: 1.5,
                marginBottom: 6,
                color: C.t,
              }}
            >
              {p.t}
            </p>
            {p.pin && (
              <div
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  background: YBg,
                  border: `1px solid ${Y}15`,
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span style={{ fontSize: 11 }}>📍</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: C.t }}>
                  {p.pin.name}
                </span>
                <span style={{ color: C.tL, fontSize: 8, marginLeft: "auto" }}>
                  View on map →
                </span>
              </div>
            )}
            <div style={{ display: "flex", gap: 12 }}>
              <span style={{ color: C.tL, fontSize: 9 }}>❤️ {p.likes}</span>
              <span style={{ color: C.tL, fontSize: 9 }}>💬 {p.cm}</span>
              <span style={{ color: C.tL, fontSize: 9 }}>📤</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  /* ── #2 DMs with labels ── */
  const DMs = () => {
    const [a, setA] = useState(null);
    const th = [
      {
        id: 1,
        n: "Maya J.",
        av: "😎",
        last: "See you at the café!",
        time: "2m",
        unread: 2,
        label: "⭐",
      },
      {
        id: 2,
        n: "Dev Community",
        av: "☕",
        last: "Who's coming?",
        time: "5m",
        unread: 4,
        fold: 1,
        label: "💼",
      },
      {
        id: 3,
        n: "JKT Runners",
        av: "🏃",
        last: "Morning run?",
        time: "2h",
        unread: 1,
        fold: 1,
      },
      {
        id: 4,
        n: "Rio D.",
        av: "🧑‍💻",
        last: "Great session!",
        time: "3h",
        label: "🤝",
      },
    ];
    const labels = ["All", "⭐ Starred", "💼 Work", "🤝 Friends"];
    const [lb, setLb] = useState("All");
    const filt =
      lb === "All" ? th : th.filter((t) => t.label === lb.split(" ")[0]);
    if (a) {
      const t = th.find((x) => x.id === a);
      return (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <div
            style={{
              padding: "10px 16px",
              background: C.w,
              borderBottom: `1px solid ${C.bd}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              onClick={() => setA(null)}
              style={{ cursor: "pointer", fontSize: 13 }}
            >
              ←
            </span>
            <span style={{ fontWeight: 700, fontSize: 12 }}>{t.n}</span>
            {t.fold && <Tag ch="FOLD" co={C.pu} bg={C.puBg} />}
            {t.label && <Tag ch={t.label} />}
          </div>
          <div
            style={{
              flex: 1,
              overflow: "auto",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {[
              { f: "them", t: "Hey! See you there ☕" },
              { f: "me", t: "On my way 😄" },
              { f: "them", t: "Corner table!" },
            ].map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.f === "me" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "60%",
                    padding: "8px 12px",
                    borderRadius: 12,
                    background: m.f === "me" ? Y : C.w,
                    color: C.t,
                    border: m.f === "me" ? "none" : `1px solid ${C.bd}`,
                    fontSize: 12,
                  }}
                >
                  {m.t}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: "10px 16px",
              display: "flex",
              gap: 5,
              background: C.w,
              borderTop: `1px solid ${C.bd}`,
            }}
          >
            <input
              placeholder="Type..."
              style={{
                flex: 1,
                padding: "8px 12px",
                background: C.bg,
                border: `1px solid ${C.bd}`,
                borderRadius: 8,
                color: C.t,
                fontSize: 11,
                fontFamily: F,
                outline: "none",
              }}
            />
            <button
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                background: Y,
                border: "none",
                cursor: "pointer",
                color: C.t,
                fontSize: 11,
                fontWeight: 700,
                fontFamily: F,
              }}
            >
              Send
            </button>
          </div>
        </div>
      );
    }
    return (
      <div style={{ flex: 1, overflow: "auto", padding: 28, maxWidth: 540 }}>
        <h2 style={{ fontWeight: 900, fontSize: 20, marginBottom: 10 }}>
          Messages
        </h2>
        <div
          style={{
            display: "flex",
            gap: 4,
            marginBottom: 10,
            flexWrap: "wrap",
          }}
        >
          {labels.map((l) => (
            <button
              key={l}
              onClick={() => setLb(l)}
              style={{
                padding: "4px 10px",
                borderRadius: 7,
                cursor: "pointer",
                background: lb === l ? Y : C.w,
                color: lb === l ? C.t : C.tM,
                border: lb === l ? "none" : `1px solid ${C.bd}`,
                fontWeight: 700,
                fontSize: 9,
                fontFamily: F,
              }}
            >
              {l}
            </button>
          ))}
        </div>
        {filt.map((t) => (
          <div
            key={t.id}
            onClick={() => setA(t.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 12px",
              borderRadius: 10,
              background: C.w,
              border: `1px solid ${C.bd}`,
              marginBottom: 3,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: t.fold ? 10 : "50%",
                background: YBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                position: "relative",
              }}
            >
              {t.av}
              {t.unread > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -2,
                    minWidth: 12,
                    height: 12,
                    borderRadius: 6,
                    background: C.r,
                    color: C.w,
                    fontSize: 7,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1.5px solid ${C.w}`,
                    padding: "0 2px",
                  }}
                >
                  {t.unread}
                </div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span
                  style={{ fontWeight: t.unread ? 800 : 600, fontSize: 11 }}
                >
                  {t.n}
                </span>
                {t.fold && <Tag ch="FOLD" co={C.pu} bg={C.puBg} />}
                {t.label && <span style={{ fontSize: 10 }}>{t.label}</span>}
              </div>
              <div style={{ color: C.tL, fontSize: 9 }}>{t.last}</div>
            </div>
            <span style={{ color: C.tLL, fontSize: 8 }}>{t.time}</span>
          </div>
        ))}
      </div>
    );
  };

  /* ── #3 SCAN — QR, Share, Username search, Business card ── */
  const ScanV = () => {
    const [tab, setT] = useState("scan");
    return (
      <div style={{ flex: 1, overflow: "auto", padding: 28, maxWidth: 520 }}>
        <h2 style={{ fontWeight: 900, fontSize: 20, marginBottom: 10 }}>
          Scan
        </h2>
        <div style={{ display: "flex", gap: 5, marginBottom: 14 }}>
          {[
            { id: "scan", l: "📷 Scan QR" },
            { id: "share", l: "📤 My QR" },
            { id: "search", l: "🔍 Find" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setT(t.id)}
              style={{
                padding: "6px 14px",
                borderRadius: 9,
                cursor: "pointer",
                background: tab === t.id ? Y : C.w,
                color: tab === t.id ? C.t : C.tM,
                border: tab === t.id ? "none" : `1px solid ${C.bd}`,
                fontWeight: 700,
                fontSize: 10,
                fontFamily: F,
              }}
            >
              {t.l}
            </button>
          ))}
        </div>
        {tab === "scan" && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 200,
                height: 200,
                margin: "0 auto 16px",
                borderRadius: 16,
                background: "#111",
                border: `3px solid ${Y}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: 140,
                  height: 140,
                  border: `2px solid ${Y}40`,
                  borderRadius: 8,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 20,
                    height: 2,
                    background: Y,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 2,
                    height: 20,
                    background: Y,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 20,
                    height: 2,
                    background: Y,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 2,
                    height: 20,
                    background: Y,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: 20,
                    height: 2,
                    background: Y,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: 2,
                    height: 20,
                    background: Y,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 20,
                    height: 2,
                    background: Y,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 2,
                    height: 20,
                    background: Y,
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10%",
                  right: "10%",
                  height: 2,
                  background: `${Y}80`,
                  boxShadow: `0 0 10px ${Y}`,
                  animation: "fi 1.5s ease-in-out infinite alternate",
                }}
              />
            </div>
            <p style={{ color: C.tL, fontSize: 11 }}>
              Point camera at a Foldin QR code
            </p>
          </div>
        )}
        {tab === "share" && (
          <div style={{ maxWidth: 320, margin: "0 auto" }}>
            {/* Business card style */}
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                background: `linear-gradient(145deg,${C.t},#2a2520)`,
                padding: 24,
                color: C.w,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 100,
                  height: 100,
                  background: `radial-gradient(circle,${Y}15,transparent)`,
                  borderRadius: "0 0 0 100%",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <Av l={u?.displayName?.[0] || "?"} sz={48} vf={vf} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>
                    {u?.displayName}
                  </div>
                  <div style={{ color: "rgba(255,255,255,.5)", fontSize: 11 }}>
                    @{u?.username}
                  </div>
                  {vf && <Tag ch="✓ Verified" co={C.w} bg={C.b} />}
                </div>
              </div>
              {u?.bio && (
                <p
                  style={{
                    color: "rgba(255,255,255,.5)",
                    fontSize: 10,
                    marginBottom: 12,
                  }}
                >
                  {u.bio}
                </p>
              )}
              <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                <div>
                  <span style={{ fontWeight: 800, fontSize: 14 }}>
                    {(u?.followers || 0).toLocaleString()}
                  </span>
                  <span
                    style={{
                      color: "rgba(255,255,255,.4)",
                      fontSize: 8,
                      marginLeft: 3,
                    }}
                  >
                    Followers
                  </span>
                </div>
                <div>
                  <span style={{ fontWeight: 800, fontSize: 14 }}>
                    {u?.following || 0}
                  </span>
                  <span
                    style={{
                      color: "rgba(255,255,255,.4)",
                      fontSize: 8,
                      marginLeft: 3,
                    }}
                  >
                    Following
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: 120,
                  height: 120,
                  margin: "0 auto",
                  borderRadius: 14,
                  background: C.w,
                  padding: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 8,
                    background: `linear-gradient(135deg,${Y}15,${C.bg})`,
                    display: "grid",
                    gridTemplateColumns: "repeat(5,1fr)",
                    gap: 2,
                    padding: 4,
                  }}
                >
                  {Array(25)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        style={{
                          background: Math.random() > 0.4 ? C.t : C.w,
                          borderRadius: 1,
                        }}
                      />
                    ))}
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: 10 }}>
                <div style={{ color: "rgba(255,255,255,.3)", fontSize: 9 }}>
                  Scan to connect on Foldin
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === "search" && (
          <div>
            <input
              placeholder="🔍 Type @username to find friends..."
              style={{
                width: "100%",
                padding: "12px 14px",
                background: C.w,
                border: `1.5px solid ${C.bd}`,
                borderRadius: 10,
                fontSize: 13,
                fontFamily: F,
                outline: "none",
                color: C.t,
                marginBottom: 12,
              }}
            />
            {[
              { n: "Maya J.", av: "😎", u: "@maya_j" },
              { n: "Rio D.", av: "🧑‍💻", u: "@rio_dev" },
              { n: "Fitri N.", av: "🧕", u: "@fitri_n" },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: C.w,
                  border: `1px solid ${C.bd}`,
                  marginBottom: 3,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                    background: YBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                  }}
                >
                  {f.av}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 11 }}>{f.n}</div>
                  <div style={{ color: C.tL, fontSize: 9 }}>{f.u}</div>
                </div>
                <FollowBtn followed={i === 0} sm />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  /* ── #4 GHOST with match reasons, interests, events, follow/msg ── */
  const GhostV = () => (
    <div style={{ flex: 1, overflow: "auto", padding: 28, maxWidth: 640 }}>
      <h2 style={{ fontWeight: 900, fontSize: 20, marginBottom: 2 }}>
        Ghost Encounters
      </h2>
      <p style={{ color: C.tL, fontSize: 11, marginBottom: 12 }}>
        People you've crossed paths with — powered by AI
      </p>
      {GHOSTS.map((g) => (
        <div
          key={g.id}
          style={{
            padding: 14,
            borderRadius: 14,
            background: C.w,
            border: `1px solid ${C.bd}`,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: "#F0E0FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              {g.e}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{g.n}</div>
              <div style={{ color: C.tL, fontSize: 9 }}>
                Crossed {g.times}× · 📍 {g.loc} · {g.dist} away · Last:{" "}
                {g.lastSeen}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 18,
                  color: g.match > 80 ? C.g : Y,
                }}
              >
                {g.match}%
              </div>
              <div style={{ color: C.tL, fontSize: 8 }}>match</div>
            </div>
          </div>
          {/* Why matched */}
          <div
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              background: "#F8F4FF",
              border: "1px solid #E8E0F0",
              marginBottom: 6,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 9,
                color: C.pu,
                marginBottom: 3,
              }}
            >
              💡 Why you match
            </div>
            <p style={{ fontSize: 10, color: C.tM, lineHeight: 1.5 }}>
              {g.reason}
            </p>
          </div>
          {/* Shared interests & events */}
          <div
            style={{
              display: "flex",
              gap: 4,
              marginBottom: 6,
              flexWrap: "wrap",
            }}
          >
            {g.interests.map((i) => (
              <Tag
                key={i}
                ch={
                  CATS.find((c) => c.id === i)?.e +
                    " " +
                    CATS.find((c) => c.id === i)?.l || i
                }
                co={C.pu}
                bg={C.puBg}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              gap: 3,
              marginBottom: 8,
              flexWrap: "wrap",
            }}
          >
            {g.sharedEvents.map((e, i) => (
              <span
                key={i}
                style={{
                  padding: "2px 7px",
                  borderRadius: 5,
                  background: YBg,
                  border: `1px solid ${Y}15`,
                  fontSize: 8,
                  fontWeight: 600,
                  color: C.t,
                }}
              >
                📅 {e}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            <FollowBtn followed={false} sm />
            <button
              style={{
                padding: "4px 12px",
                background: C.bg,
                color: C.tM,
                border: `1px solid ${C.bd}`,
                borderRadius: 8,
                fontSize: 9,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: F,
              }}
            >
              💬 Message
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  /* ── #5 CIRCLE with add/remove, distance, shared paths ── */
  const CircleV = () => {
    const [showAdd, setSA] = useState(false);
    return (
      <div style={{ flex: 1, overflow: "auto", padding: 28, maxWidth: 640 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <h2 style={{ fontWeight: 900, fontSize: 20 }}>My Circle</h2>
          <button
            onClick={() => setSA(!showAdd)}
            style={{
              padding: "6px 14px",
              background: showAdd ? C.rBg : YBg,
              color: showAdd ? C.r : C.t,
              border: `1px solid ${showAdd ? C.r + "20" : Y + "20"}`,
              borderRadius: 8,
              fontSize: 10,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: F,
            }}
          >
            {showAdd ? "Cancel" : "+ Add Friend"}
          </button>
        </div>
        <p style={{ color: C.tL, fontSize: 11, marginBottom: 12 }}>
          Location sharing with your closest friends
        </p>
        {showAdd && (
          <div
            style={{
              padding: 12,
              borderRadius: 12,
              background: YBg,
              border: `1px solid ${Y}15`,
              marginBottom: 12,
            }}
          >
            <input
              placeholder="Search @username to add..."
              style={{
                width: "100%",
                padding: "8px 12px",
                background: C.w,
                border: `1px solid ${C.bd}`,
                borderRadius: 8,
                color: C.t,
                fontSize: 11,
                fontFamily: F,
                outline: "none",
              }}
            />
          </div>
        )}
        {/* Map */}
        <div
          style={{
            position: "relative",
            height: 220,
            borderRadius: 14,
            overflow: "hidden",
            background: C.bg,
            border: `1px solid ${C.bd}`,
            marginBottom: 12,
          }}
        >
          <CityMap zoom={4} style={{ position: "absolute", inset: 0 }}>
            {CIRCLE.map((f) => (
              <div
                key={f.id}
                style={{
                  position: "absolute",
                  left: `${f.x}%`,
                  top: `${f.y}%`,
                  transform: "translate(-50%,-50%)",
                  zIndex: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: Y,
                    border: `2px solid ${C.w}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    boxShadow: `0 2px 8px ${Y}30`,
                  }}
                >
                  {f.av}
                </div>
                <span
                  style={{
                    fontSize: 6.5,
                    fontWeight: 700,
                    background: "rgba(255,255,255,.9)",
                    padding: "1px 4px",
                    borderRadius: 4,
                    marginTop: 1,
                  }}
                >
                  {f.n} · {f.dist}km
                </span>
              </div>
            ))}
          </CityMap>
        </div>
        {CIRCLE.map((f) => (
          <div
            key={f.id}
            style={{
              padding: 12,
              borderRadius: 12,
              background: C.w,
              border: `1px solid ${C.bd}`,
              marginBottom: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: YBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                {f.av}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 12 }}>{f.n}</span>
                  <Tag
                    ch={f.status}
                    co={f.status === "Offline" ? C.tL : C.g}
                    bg={f.status === "Offline" ? "#f5f5f5" : C.gBg}
                  />
                </div>
                <div style={{ color: C.tL, fontSize: 9 }}>
                  📍 {f.loc} · {f.dist}km away · Active {f.lastActive}
                </div>
              </div>
              <button
                style={{
                  padding: "4px 10px",
                  background: C.rBg,
                  color: C.r,
                  border: `1px solid ${C.r}15`,
                  borderRadius: 7,
                  fontSize: 8,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: F,
                }}
              >
                Remove
              </button>
            </div>
            {/* Shared paths */}
            <div
              style={{
                padding: "6px 8px",
                borderRadius: 7,
                background: C.bg,
                border: `1px solid ${C.bd}`,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 8,
                  color: C.tL,
                  marginBottom: 2,
                }}
              >
                🛤️ Shared paths
              </div>
              <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                {f.sharedPaths.map((p, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "2px 6px",
                      borderRadius: 4,
                      background: C.w,
                      border: `1px solid ${C.bd}`,
                      fontSize: 8,
                      fontWeight: 600,
                      color: C.tM,
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  /* ── #10 LEADERBOARD ── */
  const LeaderV = () => {
    const [tab, setT] = useState("followers");
    return (
      <div style={{ flex: 1, overflow: "auto", padding: 28, maxWidth: 600 }}>
        <h2 style={{ fontWeight: 900, fontSize: 20, marginBottom: 2 }}>
          🏆 Leaderboard
        </h2>
        <p style={{ color: C.tL, fontSize: 11, marginBottom: 12 }}>
          Top performers creating FOMO since day one
        </p>
        <div style={{ display: "flex", gap: 5, marginBottom: 12 }}>
          {[
            { id: "followers", l: "👥 Most Followed" },
            { id: "contributors", l: "⭐ Top Contributors" },
            { id: "events", l: "🔥 Popular Events" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setT(t.id)}
              style={{
                padding: "6px 12px",
                borderRadius: 9,
                cursor: "pointer",
                background: tab === t.id ? Y : C.w,
                color: tab === t.id ? C.t : C.tM,
                border: tab === t.id ? "none" : `1px solid ${C.bd}`,
                fontWeight: 700,
                fontSize: 10,
                fontFamily: F,
              }}
            >
              {t.l}
            </button>
          ))}
        </div>
        {(LEADERS[tab] || []).map((l, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 12,
              background:
                i < 3
                  ? `linear-gradient(135deg,${i === 0 ? Y + "08" : i === 1 ? "#C0C0C008" : "#CD7F3208"},${C.w})`
                  : C.w,
              border: `1px solid ${i < 3 ? (i === 0 ? Y : i === 1 ? "#C0C0C0" : "#CD7F32") + "20" : C.bd}`,
              marginBottom: 4,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background:
                  i === 0
                    ? Y
                    : i === 1
                      ? "#E8E8E8"
                      : i === 2
                        ? "#F5D0B0"
                        : C.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: i < 3 ? 12 : 10,
                color: i === 0 ? C.t : i < 3 ? "#666" : C.tM,
              }}
            >
              {i < 3 ? ["🥇", "🥈", "🥉"][i] : l.num}
            </div>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: YBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              {l.av}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 12 }}>{l.n}</span>
                {l.tag && (
                  <Tag
                    ch={l.tag}
                    co={l.tag.includes("Genesis") ? C.go : C.pu}
                    bg={l.tag.includes("Genesis") ? C.goBg : C.puBg}
                  />
                )}
              </div>
              <div style={{ color: C.tL, fontSize: 9 }}>{l.v}</div>
            </div>
            {tab !== "events" && <FollowBtn followed={i === 0} sm />}
          </div>
        ))}
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 12,
            background: YBg,
            border: `1px solid ${Y}15`,
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 10, fontWeight: 700, color: C.t }}>
            🔑 Genesis key holders get automatic followers at launch!
          </p>
          <p style={{ color: C.tL, fontSize: 9, marginTop: 2 }}>
            The earlier you join, the more followers you start with.
          </p>
        </div>
      </div>
    );
  };

  /* ── #6 #7 #8 WALLET — subscription + hosting + Web3 ── */
  const WalletV = () => {
    const [pm, setPM] = useState("fiat");
    return (
      <div style={{ flex: 1, overflow: "auto", padding: 28, maxWidth: 600 }}>
        <h2 style={{ fontWeight: 900, fontSize: 20, marginBottom: 12 }}>
          Wallet
        </h2>
        {/* #6 Subscription */}
        <div
          style={{
            padding: 18,
            borderRadius: 16,
            background: `linear-gradient(135deg,${YBg},${C.w})`,
            border: `1.5px solid ${Y}20`,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: C.b,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 18, color: C.w }}>✓</span>
            </div>
            <div>
              <h3 style={{ fontWeight: 800, fontSize: 14 }}>Foldin Verified</h3>
              <p style={{ color: C.tL, fontSize: 9 }}>
                Blue tick · Priority discovery · Explore more places
              </p>
            </div>
          </div>
          <div
            style={{
              padding: 12,
              borderRadius: 12,
              background: C.w,
              border: `1px solid ${C.bd}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <span style={{ fontWeight: 800, fontSize: 18 }}>
                $5
                <span style={{ fontSize: 10, fontWeight: 500, color: C.tL }}>
                  /month
                </span>
              </span>
              {vf && <Tag ch="✓ ACTIVE" co={C.w} bg={C.g} />}
            </div>
            <p
              style={{
                color: C.tM,
                fontSize: 10,
                lineHeight: 1.5,
                marginBottom: 8,
              }}
            >
              Blue verification tick, priority in search, explore premium
              places, verified badge on events.
            </p>
            <p
              style={{
                color: C.tL,
                fontSize: 8,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              PAYMENT METHOD
            </p>
            <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
              <div
                onClick={() => setPM("fiat")}
                style={{
                  flex: 1,
                  padding: 8,
                  borderRadius: 9,
                  cursor: "pointer",
                  background: pm === "fiat" ? YBg : C.bg,
                  border:
                    pm === "fiat" ? `2px solid ${Y}` : `1.5px solid ${C.bd}`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 14, marginBottom: 1 }}>💳</div>
                <div style={{ fontWeight: 700, fontSize: 9 }}>Card / Bank</div>
                <div style={{ color: C.tL, fontSize: 8 }}>$5.00 USD</div>
              </div>
              <div
                onClick={() => setPM("skya")}
                style={{
                  flex: 1,
                  padding: 8,
                  borderRadius: 9,
                  cursor: "pointer",
                  background: pm === "skya" ? YBg : C.bg,
                  border:
                    pm === "skya" ? `2px solid ${Y}` : `1.5px solid ${C.bd}`,
                  textAlign: "center",
                }}
              >
                <div style={{ marginBottom: 1 }}>
                  <SKYALogo sz={18} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 9 }}>SKYA Token</div>
                <div style={{ color: C.tL, fontSize: 8 }}>≈ 2,631 SKYA</div>
              </div>
            </div>
            {pm === "skya" && (
              <div
                style={{
                  padding: 8,
                  borderRadius: 8,
                  background: "#FFFDE7",
                  border: "1px solid #FFF59D",
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    marginBottom: 3,
                  }}
                >
                  <SKYALogo sz={14} />
                  <span style={{ fontWeight: 800, fontSize: 10 }}>
                    Pay with $SKYA
                  </span>
                </div>
                <p style={{ color: C.tM, fontSize: 8, lineHeight: 1.5 }}>
                  Sekuya Multiverse (SKYA) — Web3 gaming & entertainment token.
                  EVM-based, deflationary burn model.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 3,
                    flexWrap: "wrap",
                    marginTop: 4,
                  }}
                >
                  {["Gate.io", "Uniswap", "Bittime", "INDODAX"].map((ex) => (
                    <span
                      key={ex}
                      style={{
                        padding: "2px 6px",
                        borderRadius: 4,
                        background: C.w,
                        border: `1px solid ${C.bd}`,
                        fontSize: 7,
                        fontWeight: 600,
                        color: C.tM,
                      }}
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => setU({ ...u, verified: true })}
              disabled={vf}
              style={{
                width: "100%",
                padding: 10,
                background: vf ? C.g : Y,
                color: vf ? C.w : C.t,
                border: "none",
                borderRadius: 9,
                fontSize: 12,
                fontWeight: 800,
                cursor: vf ? "default" : "pointer",
                fontFamily: F,
              }}
            >
              {vf
                ? "✓ Subscribed"
                : pm === "skya"
                  ? "Pay ≈ 2,631 SKYA"
                  : "Subscribe $5/mo"}
            </button>
          </div>
        </div>
        {/* #6 Host earnings (visible but #7 hide 90% detail) */}
        <div
          style={{
            padding: 14,
            borderRadius: 14,
            background: C.w,
            border: `1px solid ${C.bd}`,
            marginBottom: 12,
          }}
        >
          <h4 style={{ fontWeight: 800, fontSize: 12, marginBottom: 4 }}>
            🎤 Host Earnings
          </h4>
          <div
            style={{
              fontWeight: 900,
              fontSize: 24,
              color: Y,
              letterSpacing: "-1px",
            }}
          >
            IDR 2,450,000
          </div>
          <p style={{ color: C.tL, fontSize: 9, marginTop: 2 }}>
            From 3 events hosted this month
          </p>
          <button
            style={{
              marginTop: 8,
              padding: "7px 14px",
              background: C.bg,
              color: C.t,
              border: `1px solid ${C.bd}`,
              borderRadius: 8,
              fontSize: 10,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: F,
            }}
          >
            Withdraw →
          </button>
        </div>
        {/* #8 Web3 Wallet */}
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            background: `linear-gradient(145deg,#1a1714,#2a2520)`,
            padding: 18,
            color: C.w,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <SKYALogo sz={22} />
              <div>
                <div style={{ fontWeight: 800, fontSize: 13 }}>Web3 Wallet</div>
                <div style={{ color: "rgba(255,255,255,.4)", fontSize: 8 }}>
                  ERC-20 · EVM Compatible
                </div>
              </div>
            </div>
            <Tag ch="Connected" co={C.g} bg="rgba(45,184,101,.15)" />
          </div>
          <div
            style={{
              padding: 14,
              borderRadius: 12,
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.08)",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                color: "rgba(255,255,255,.4)",
                fontSize: 8,
                fontWeight: 700,
                marginBottom: 2,
              }}
            >
              SKYA BALANCE
            </div>
            <div style={{ fontWeight: 900, fontSize: 28, color: Y }}>
              12,500{" "}
              <span style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>
                SKYA
              </span>
            </div>
            <div
              style={{
                color: "rgba(255,255,255,.35)",
                fontSize: 10,
                marginTop: 2,
              }}
            >
              ≈ $23.75 USD · 0.00028 ETH
            </div>
          </div>
          <div
            style={{
              padding: 10,
              borderRadius: 10,
              background: "rgba(255,255,255,.03)",
              border: "1px solid rgba(255,255,255,.06)",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                color: "rgba(255,255,255,.35)",
                fontSize: 8,
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              WALLET ADDRESS
            </div>
            <div
              style={{
                fontFamily: "'Courier New',monospace",
                fontSize: 9,
                color: "rgba(255,255,255,.5)",
                wordBreak: "break-all",
              }}
            >
              0x7a3F...d4E8...c9B2
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 6,
            }}
          >
            {[
              { l: "Deposit", i: "↓" },
              { l: "Withdraw", i: "↑" },
              { l: "Swap", i: "⇄" },
            ].map((a) => (
              <button
                key={a.l}
                style={{
                  padding: "8px 0",
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 8,
                  color: C.w,
                  fontSize: 9,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: F,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 14, marginBottom: 1 }}>{a.i}</div>
                {a.l}
              </button>
            ))}
          </div>
          <div
            style={{
              marginTop: 10,
              padding: 8,
              borderRadius: 8,
              background: "rgba(255,255,255,.03)",
              border: "1px solid rgba(255,255,255,.05)",
            }}
          >
            <div
              style={{
                color: "rgba(255,255,255,.3)",
                fontSize: 8,
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              RECENT TRANSACTIONS
            </div>
            {[
              { t: "Subscription Payment", v: "-2,631 SKYA", d: "Feb 23" },
              { t: "Received from @rio", v: "+500 SKYA", d: "Feb 22" },
              { t: "Swap ETH → SKYA", v: "+5,000 SKYA", d: "Feb 20" },
            ].map((tx, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "4px 0",
                  borderBottom:
                    i < 2 ? "1px solid rgba(255,255,255,.04)" : "none",
                }}
              >
                <span style={{ color: "rgba(255,255,255,.5)", fontSize: 8 }}>
                  {tx.t}
                </span>
                <span
                  style={{
                    color: tx.v.startsWith("+") ? C.g : C.r,
                    fontSize: 8,
                    fontWeight: 700,
                  }}
                >
                  {tx.v}
                </span>
              </div>
            ))}
          </div>
          <a
            href="https://coinmarketcap.com/currencies/sekuya-multiverse/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: 8,
              color: Y,
              fontSize: 9,
              fontWeight: 600,
            }}
          >
            View SKYA on CoinMarketCap →
          </a>
        </div>
      </div>
    );
  };

  /* ── #9 PROFILE — follow/unfollow, calendar sync, platform sync ── */
  const [evTab, setET] = useState("now");
  const [calSync, setCS] = useState(true);
  
  const myEv = {
    now: [EV[3], EV[9]],
    booked: [UPC[0], UPC[1]],
    past: [EV[4], EV[6]],
  };
  const Profile = () => (
    <div style={{ flex: 1, overflow: "auto", padding: 28, maxWidth: 700 }}>
      <div
        style={{
          padding: 18,
          borderRadius: 16,
          background: og ? `linear-gradient(135deg,${C.go}06,${Y}04)` : C.w,
          border: `1px solid ${og ? C.go + "18" : C.bd}`,
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ position: "relative" }}>
          <Av
            l={u?.displayName?.[0] || "?"}
            sz={50}
            bd={og ? `3px solid ${C.go}` : ""}
            vf={vf}
          />
          {og && (
            <div
              style={{
                position: "absolute",
                bottom: -2,
                right: -2,
                width: 14,
                height: 14,
                borderRadius: 5,
                background: `linear-gradient(135deg,${C.go},#FFD700)`,
                border: `2px solid ${C.w}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 6,
              }}
            >
              👑
            </div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontWeight: 900, fontSize: 15 }}>
              {u?.displayName}
            </span>
            {vf && <Tag ch="✓ Verified" co={C.w} bg={C.b} />}
            {og && <Tag ch="OG" co={C.w} bg={C.go} />}
            <Tag ch={`#${n}`} />
            {u?.isPrivate && <Tag ch="🔒" co={C.tL} />}
          </div>
          <div style={{ color: C.tL, fontSize: 10 }}>@{u?.username}</div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 3,
              padding: "2px 7px",
              borderRadius: 6,
              background: `${per.c}08`,
              border: `1px solid ${per.c}15`,
              marginTop: 2,
            }}
          >
            <span style={{ fontSize: 9 }}>{per.e}</span>
            <span style={{ color: per.c, fontWeight: 800, fontSize: 8 }}>
              {per.t}
            </span>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 5 }}>
            {[
              { l: "Followers", v: (u?.followers || 0).toLocaleString() },
              { l: "Following", v: u?.following || 0 },
              { l: "Events", v: "23" },
              { l: "Folds", v: "5" },
            ].map((st, i) => (
              <div key={i}>
                <span style={{ fontWeight: 800, fontSize: 12 }}>{st.v}</span>
                <span style={{ color: C.tL, fontSize: 8, marginLeft: 2 }}>
                  {st.l}
                </span>
              </div>
            ))}
          </div>
          {/* #11 Genesis auto followers note */}
          {n <= 6 && (
            <div
              style={{
                marginTop: 4,
                padding: "3px 8px",
                borderRadius: 6,
                background: C.goBg,
                border: `1px solid ${C.go}15`,
                display: "inline-block",
              }}
            >
              <span style={{ fontSize: 8, fontWeight: 700, color: C.go }}>
                🔑 Genesis #{n} · Auto-followers from invite chain
              </span>
            </div>
          )}
        </div>
      </div>
      {/* #9 Follow button (for other profiles — shown here as edit) */}
      <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
        <button
          style={{
            flex: 1,
            padding: 8,
            background: Y,
            color: C.t,
            border: "none",
            borderRadius: 9,
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: F,
          }}
        >
          ✏️ Edit Profile
        </button>
        <button
          onClick={() => go("wallet")}
          style={{
            padding: "8px 14px",
            background: C.bg,
            color: C.tM,
            border: `1px solid ${C.bd}`,
            borderRadius: 9,
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: F,
          }}
        >
          {vf ? "✓ Verified" : "Get Verified"}
        </button>
      </div>
      {/* #9 Calendar sync + platform sync */}
      <div
        style={{
          padding: 10,
          borderRadius: 10,
          background: C.bg,
          border: `1px solid ${C.bd}`,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 11 }}>
            📅 Calendar Sync
          </span>
          <div
            onClick={() => setCS(!calSync)}
            style={{
              width: 34,
              height: 18,
              borderRadius: 9,
              background: calSync ? C.g : "#ddd",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                background: C.w,
                position: "absolute",
                top: 2,
                left: calSync ? 18 : 2,
                transition: "left .2s",
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {["Google Calendar", "Apple Calendar", "Outlook"].map((c, i) => (
            <span
              key={i}
              style={{
                padding: "3px 8px",
                borderRadius: 6,
                background: i === 0 ? C.gBg : C.w,
                border: `1px solid ${i === 0 ? C.g + "20" : C.bd}`,
                fontSize: 8,
                fontWeight: 600,
                color: i === 0 ? C.g : C.tL,
              }}
            >
              {i === 0 ? "✓ " : ""}
              {c}
            </span>
          ))}
        </div>
        <div
          style={{
            marginTop: 6,
            padding: "6px 8px",
            borderRadius: 7,
            background: C.w,
            border: `1px solid ${C.bd}`,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 9,
              color: C.tL,
              marginBottom: 3,
            }}
          >
            🔗 Sync with other platforms (no double booking)
          </div>
          <div style={{ display: "flex", gap: 3 }}>
            {["Eventbrite", "Meetup.com", "Luma"].map((p, i) => (
              <span
                key={i}
                style={{
                  padding: "2px 7px",
                  borderRadius: 5,
                  background: C.bg,
                  border: `1px solid ${C.bd}`,
                  fontSize: 8,
                  fontWeight: 600,
                  color: C.tM,
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* My Events */}
      <h3 style={{ fontWeight: 800, fontSize: 12, marginBottom: 6 }}>
        📅 My Events{" "}
        {calSync && (
          <span style={{ color: C.g, fontSize: 8, fontWeight: 600 }}>
            ✓ Synced
          </span>
        )}
      </h3>
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        {[
          { id: "now", l: "🔴 Now" },
          { id: "booked", l: "⏳ Booked" },
          { id: "past", l: "✅ Past" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setET(t.id)}
            style={{
              padding: "4px 11px",
              borderRadius: 7,
              cursor: "pointer",
              background: evTab === t.id ? Y : C.w,
              color: evTab === t.id ? C.t : C.tM,
              border: evTab === t.id ? "none" : `1px solid ${C.bd}`,
              fontWeight: 700,
              fontSize: 9,
              fontFamily: F,
            }}
          >
            {t.l}
          </button>
        ))}
      </div>
      {(myEv[evTab] || []).map(
        (ev) =>
          ev && (
            <div
              key={ev.id}
              onClick={() => goEv(ev)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "7px 9px",
                borderRadius: 9,
                background: C.w,
                border: `1px solid ${C.bd}`,
                marginBottom: 3,
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 15 }}>{ev.e}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 10 }}>{ev.t}</div>
                <div style={{ color: C.tL, fontSize: 8 }}>
                  📍 {ev.v}
                  {ev.d ? " · " + ev.d : ""}
                </div>
              </div>
              {evTab === "now" && <Tag ch="LIVE" co={C.w} bg={C.g} />}
              {evTab === "booked" && <Tag ch="📅 Synced" co={C.g} bg={C.gBg} />}
              {evTab === "past" && <Tag ch="📮" co={C.pu} bg={C.puBg} />}
            </div>
          ),
      )}
      <h3 style={{ fontWeight: 800, fontSize: 12, margin: "12px 0 6px" }}>
        📮 Stamps
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(75px,1fr))",
          gap: 4,
        }}
      >
        {[
          { e: "👑", l: "OG", d: `#${n}`, c: C.go },
          { e: "☕", l: "Coffee", d: "Feb 22", c: Y },
          { e: "🏃", l: "Run", d: "Feb 21", c: C.g },
          { e: "🔥", l: "Fire", d: "Feb 20", c: C.r },
          { e: "🍜", l: "Nasi", d: "Feb 19" },
          { e: "🎸", l: "Mic", d: "Feb 18", c: C.pu },
          { e: "📊", l: "Pitch", d: "Feb 15", c: C.b },
        ].map((s, i) => (
          <Stamp key={i} emoji={s.e} label={s.l} date={s.d} color={s.c} />
        ))}
      </div>
    </div>
  );

  /* ── #12 #13 CREATE — with private/public, host type ── */
  const CreateV = () => {
    const [mode, setMode] = useState("event");
    const [hostType, setHT] = useState("individual");
    const [hostUser, setHU] = useState("@" + u?.username);
    const [foldPriv, setFP] = useState(false);
    return (
      <div style={{ flex: 1, overflow: "auto", padding: 28, maxWidth: 540 }}>
        <h2 style={{ fontWeight: 900, fontSize: 20, marginBottom: 10 }}>
          Create
        </h2>
        <div style={{ display: "flex", gap: 5, marginBottom: 12 }}>
          {[
            { id: "fold", l: "👥 Fold" },
            { id: "event", l: "📅 Event" },
            { id: "post", l: "📝 Post" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              style={{
                padding: "6px 14px",
                borderRadius: 9,
                cursor: "pointer",
                background: mode === m.id ? Y : C.w,
                color: mode === m.id ? C.t : C.tM,
                border: mode === m.id ? "none" : `1px solid ${C.bd}`,
                fontWeight: 700,
                fontSize: 11,
                fontFamily: F,
              }}
            >
              {m.l}
            </button>
          ))}
        </div>
        {mode === "event" && (
          <div>
            <input
              placeholder="Event name"
              style={{
                width: "100%",
                padding: 10,
                background: C.w,
                border: `1.5px solid ${C.bd}`,
                borderRadius: 10,
                color: C.t,
                fontSize: 12,
                fontFamily: F,
                outline: "none",
                marginBottom: 6,
              }}
            />
            <input
              placeholder="📍 Venue"
              style={{
                width: "100%",
                padding: 10,
                background: C.w,
                border: `1.5px solid ${C.bd}`,
                borderRadius: 10,
                color: C.t,
                fontSize: 12,
                fontFamily: F,
                outline: "none",
                marginBottom: 6,
              }}
            />
            <textarea
              placeholder="Description"
              rows={2}
              style={{
                width: "100%",
                padding: 10,
                background: C.w,
                border: `1.5px solid ${C.bd}`,
                borderRadius: 10,
                color: C.t,
                fontSize: 11,
                fontFamily: F,
                outline: "none",
                resize: "none",
                marginBottom: 6,
              }}
            />
            <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
              <input
                type="date"
                style={{
                  flex: 1,
                  padding: 8,
                  background: C.w,
                  border: `1px solid ${C.bd}`,
                  borderRadius: 8,
                  fontSize: 10,
                  fontFamily: F,
                  outline: "none",
                  color: C.t,
                }}
              />
              <input
                type="time"
                style={{
                  flex: 1,
                  padding: 8,
                  background: C.w,
                  border: `1px solid ${C.bd}`,
                  borderRadius: 8,
                  fontSize: 10,
                  fontFamily: F,
                  outline: "none",
                  color: C.t,
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
              <input
                placeholder="Price (IDR) or FREE"
                style={{
                  flex: 1,
                  padding: 9,
                  background: C.w,
                  border: `1px solid ${C.bd}`,
                  borderRadius: 8,
                  fontSize: 11,
                  fontFamily: F,
                  outline: "none",
                  color: C.t,
                }}
              />
              <input
                placeholder="Capacity"
                type="number"
                style={{
                  flex: 1,
                  padding: 9,
                  background: C.w,
                  border: `1px solid ${C.bd}`,
                  borderRadius: 8,
                  fontSize: 11,
                  fontFamily: F,
                  outline: "none",
                  color: C.t,
                }}
              />
            </div>
            {/* #13 Host info */}
            <div
              style={{
                padding: 10,
                borderRadius: 10,
                background: C.bg,
                border: `1px solid ${C.bd}`,
                marginBottom: 8,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 10, marginBottom: 6 }}>
                Host type
              </div>
              <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                {[
                  { id: "individual", l: "👤 Individual" },
                  { id: "fold", l: "👥 Fold" },
                  { id: "brand", l: "🏢 Brand" },
                ].map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setHT(h.id)}
                    style={{
                      padding: "5px 10px",
                      borderRadius: 7,
                      cursor: "pointer",
                      background: hostType === h.id ? Y : C.w,
                      color: hostType === h.id ? C.t : C.tM,
                      border: hostType === h.id ? "none" : `1px solid ${C.bd}`,
                      fontWeight: 700,
                      fontSize: 9,
                      fontFamily: F,
                    }}
                  >
                    {h.l}
                  </button>
                ))}
              </div>
              <input
                value={hostUser}
                onChange={(e) => setHU(e.target.value)}
                placeholder="Host @username"
                style={{
                  width: "100%",
                  padding: 8,
                  background: C.w,
                  border: `1px solid ${C.bd}`,
                  borderRadius: 8,
                  color: C.t,
                  fontSize: 10,
                  fontFamily: F,
                  outline: "none",
                }}
              />
              <p style={{ color: C.tL, fontSize: 8, marginTop: 4 }}>
                This will appear on the event popup
              </p>
            </div>
            <button
              style={{
                width: "100%",
                padding: 11,
                background: Y,
                color: C.t,
                border: "none",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: F,
              }}
            >
              Create Event
            </button>
          </div>
        )}
        {mode === "fold" && (
          <div>
            <input
              placeholder="Fold name"
              style={{
                width: "100%",
                padding: 10,
                background: C.w,
                border: `1.5px solid ${C.bd}`,
                borderRadius: 10,
                color: C.t,
                fontSize: 12,
                fontFamily: F,
                outline: "none",
                marginBottom: 6,
              }}
            />
            <textarea
              placeholder="Description"
              rows={2}
              style={{
                width: "100%",
                padding: 10,
                background: C.w,
                border: `1.5px solid ${C.bd}`,
                borderRadius: 10,
                color: C.t,
                fontSize: 11,
                fontFamily: F,
                outline: "none",
                resize: "none",
                marginBottom: 6,
              }}
            />
            {/* #12 Private/Public for Fold */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: 10,
                borderRadius: 10,
                background: C.bg,
                border: `1px solid ${C.bd}`,
                marginBottom: 8,
              }}
            >
              <div
                onClick={() => setFP(!foldPriv)}
                style={{
                  width: 34,
                  height: 18,
                  borderRadius: 9,
                  background: foldPriv ? Y : "#ddd",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 7,
                    background: C.w,
                    position: "absolute",
                    top: 2,
                    left: foldPriv ? 18 : 2,
                    transition: "left .2s",
                  }}
                />
              </div>
              <div>
                <span style={{ fontSize: 10, fontWeight: 700 }}>
                  {foldPriv ? "🔒 Private Fold" : "🌐 Public Fold"}
                </span>
                <div style={{ color: C.tL, fontSize: 8 }}>
                  {foldPriv
                    ? "Members need approval to join"
                    : "Anyone can join this fold"}
                </div>
              </div>
            </div>
            <button
              style={{
                width: "100%",
                padding: 11,
                background: Y,
                color: C.t,
                border: "none",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: F,
              }}
            >
              Create Fold
            </button>
          </div>
        )}
        {mode === "post" && (
          <div>
            <textarea
              placeholder="What's happening? Drop a pin for WFA/WFC spots!"
              rows={3}
              style={{
                width: "100%",
                padding: 10,
                background: C.w,
                border: `1.5px solid ${C.bd}`,
                borderRadius: 10,
                color: C.t,
                fontSize: 12,
                fontFamily: F,
                outline: "none",
                resize: "none",
                marginBottom: 6,
              }}
            />
            <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
              <button
                style={{
                  padding: "5px 10px",
                  borderRadius: 7,
                  background: C.bg,
                  border: `1px solid ${C.bd}`,
                  fontSize: 9,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: F,
                  color: C.tM,
                }}
              >
                📍 Pin
              </button>
              <button
                style={{
                  padding: "5px 10px",
                  borderRadius: 7,
                  background: C.bg,
                  border: `1px solid ${C.bd}`,
                  fontSize: 9,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: F,
                  color: C.tM,
                }}
              >
                🌐 Public
              </button>
            </div>
            <button
              style={{
                width: "100%",
                padding: 11,
                background: Y,
                color: C.t,
                border: "none",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: F,
              }}
            >
              Post
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: C.bg,
        fontFamily: F,
      }}
    >
      <SB />
      <div
        className="fi"
        key={s + (sel?.id || "")}
        style={{ flex: 1, display: "flex" }}
      >
        {s === "home" && <Home />}
        {s === "event" && <Event />}
        {s === "explore" && <Explore />}
        {s === "posts" && <PostsV />}
        {s === "dm" && <DMs />}
        {s === "profile" && <Profile />}
        {s === "wallet" && <WalletV />}
        {s === "scan" && <ScanV />}
        {s === "ghost" && <GhostV />}
        {s === "circle" && <CircleV />}
        {s === "leaderboard" && <LeaderV />}
        {s === "create" && <CreateV />}
      </div>
    </div>
  );
};

/* ═══ ROOT ═══ */
export default function Root() {
  const [phase, setPhase] = useState("landing");
  const [u, setU] = useState(null);
  const [vc, setVC] = useState("");
  return (
    <div style={{ width: "100%", minHeight: "100vh", fontFamily: F }}>
      <GS />
      {phase === "landing" && (
        <Landing
          onCode={(c) => {
            setVC(c);
            setPhase("onboard");
          }}
        />
      )}
      {phase === "onboard" && (
        <Onboard
          vc={vc}
          onDone={(d) => {
            setU(d);
            setPhase("app");
          }}
        />
      )}
      {phase === "app" && u && <App u={u} setU={setU} />}
    </div>
  );
}
