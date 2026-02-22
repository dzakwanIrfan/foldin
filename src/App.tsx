// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import "./App.css";

/* ══════════════ TOKENS ══════════════ */
const C = {
  orange: "#F08C38",
  peach: "#F4C5A0",
  peachL: "#FBE4D0",
  peachLL: "#FFF5EC",
  white: "#FFF",
  bg: "#FAFAFA",
  border: "#F0EBE6",
  borderL: "#F5F0EB",
  text: "#2D2420",
  textM: "#6B5E55",
  textL: "#9C8E83",
  textLL: "#BFB3A8",
  red: "#E8534A",
  redBg: "#FFF0EF",
  green: "#3EAF6E",
  greenBg: "#EEFBF3",
  blue: "#4A8FE8",
  blueBg: "#EEF4FD",
  gold: "#F5A623",
  goldBg: "#FFF8EC",
  silver: "#A8B0BC",
  bronze: "#CD7F32",
  purple: "#8B5CF6",
  purpleBg: "#F3EFFE",
  dark: "#0F0D0A",
  darkM: "#1A1714",
  darkL: "#2D2820",
  cyan: "#06B6D4",
  cyanBg: "#ECFEFF",
  pink: "#EC4899",
  pinkBg: "#FDF2F8",
};
const F = { sans: "'Nunito',system-ui,sans-serif" };
const CATS = {
  meet: [
    { id: "coffee", e: "☕", l: "Coffee" },
    { id: "drink", e: "🍺", l: "Drinks" },
    { id: "lunch", e: "🍜", l: "Lunch" },
    { id: "dinner", e: "🍽️", l: "Dinner" },
    { id: "breakfast", e: "🥞", l: "Breakfast" },
  ],
  sports: [
    { id: "run", e: "🏃", l: "Running" },
    { id: "gym", e: "💪", l: "Gym" },
    { id: "swim", e: "🏊", l: "Swim" },
    { id: "cycle", e: "🚴", l: "Cycling" },
    { id: "yoga", e: "🧘", l: "Yoga" },
    { id: "basketball", e: "🏀", l: "Basketball" },
    { id: "football", e: "⚽", l: "Football" },
    { id: "badminton", e: "🏸", l: "Badminton" },
  ],
  network: [
    { id: "class", e: "📚", l: "Class" },
    { id: "workshop", e: "🔧", l: "Workshop" },
    { id: "seminar", e: "🎓", l: "Seminar" },
    { id: "meetup", e: "🤝", l: "Meetup" },
    { id: "pitch", e: "📊", l: "Pitch Night" },
  ],
  alert: [
    { id: "alert", e: "🚨", l: "Alert" },
    { id: "news", e: "📰", l: "News" },
  ],
};

/* ══════════════ STYLES ══════════════ */
const Styles = () => (
  <style>{`
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
*::-webkit-scrollbar{display:none}*{scrollbar-width:none}
input::placeholder{color:#BFB3A8}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#F08C38;cursor:pointer;border:3px solid #fff}
@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes youPulse{0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(1.5);opacity:.2}}
@keyframes ghostFloat{0%,100%{transform:translate(-50%,-50%);opacity:.4}50%{transform:translate(-50%,-58%);opacity:.7}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes glow{0%,100%{box-shadow:0 0 20px rgba(240,140,56,.15)}50%{box-shadow:0 0 40px rgba(240,140,56,.3)}}
@keyframes scan{0%{top:10%}100%{top:85%}}
@keyframes ripple{0%{transform:scale(.8);opacity:1}100%{transform:scale(2.5);opacity:0}}
.fi{animation:fadeIn .3s ease-out}.su{animation:slideUp .5s ease-out}
`}</style>
);

/* ══════════════ INVITE ENGINE ══════════════ */
const SEEDS = [
  "FOLDIN-001-GENESIS",
  "FOLDIN-002-ALPHA",
  "FOLDIN-003-ALPHA",
  "FOLDIN-004-ALPHA",
  "FOLDIN-005-ALPHA",
  "FOLDIN-006-ALPHA",
  "DEMO",
];
const genChildren = (p) => {
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
const VALID = (() => {
  const s = new Set(SEEDS);
  const add = (c, d) => {
    if (d > 3) return;
    c.forEach((x) => {
      genChildren(x).forEach((k) => {
        s.add(k);
        add([k], d + 1);
      });
    });
  };
  add(SEEDS, 0);
  return s;
})();
const getUserNum = (code) => {
  const c = code.toUpperCase().trim();
  const gi = SEEDS.indexOf(c);
  if (gi >= 0) return gi === 6 ? 42 : gi + 1;
  const cl = c.replace(/[^A-Z0-9]/g, "");
  let h = 0;
  for (let i = 0; i < cl.length; i++) h = ((h << 5) - h + cl.charCodeAt(i)) | 0;
  return 7 + (Math.abs(h) % 993);
};
const isOG = (n) => n <= 1000;

/* ══════════════ HOOKS ══════════════ */
const useCounter = (s = 10756) => {
  const [c, setC] = useState(s);
  useEffect(() => {
    const id = setInterval(
      () => setC((v) => v + Math.floor(Math.random() * 3)),
      4000,
    );
    return () => clearInterval(id);
  }, []);
  return c;
};

/* ══════════════ UI PRIMITIVES ══════════════ */
const Logo = ({ size = 24, light }) => (
  <span
    style={{
      fontFamily: F.sans,
      fontWeight: 800,
      fontSize: size,
      letterSpacing: "-.5px",
    }}
  >
    <span style={{ color: C.orange }}>Fold</span>
    <span style={{ color: light ? C.peach : "#D4A574" }}>in</span>
  </span>
);
const Btn = ({
  children,
  primary,
  small,
  onClick,
  style: s = {},
  disabled,
  color,
  bg: bgc,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      padding: small ? "6px 12px" : "10px 16px",
      background: disabled ? C.borderL : bgc || (primary ? C.orange : C.bg),
      color: disabled ? C.textLL : color || (primary ? C.white : C.textM),
      border: primary || bgc ? "none" : `1px solid ${C.border}`,
      borderRadius: small ? 8 : 12,
      fontSize: small ? 11 : 13,
      fontWeight: 700,
      cursor: disabled ? "default" : "pointer",
      fontFamily: F.sans,
      ...s,
    }}
  >
    {children}
  </button>
);
const Back = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      width: 34,
      height: 34,
      borderRadius: 12,
      background: C.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: C.textM,
      fontSize: 16,
      border: `1px solid ${C.border}`,
      flexShrink: 0,
    }}
  >
    ←
  </div>
);
const Badge = ({ children, color = C.orange, bg = C.peachLL }) => (
  <span
    style={{
      background: bg,
      color,
      fontSize: 8,
      fontWeight: 800,
      padding: "2px 6px",
      borderRadius: 4,
      fontFamily: F.sans,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);
const Nav = ({ icon, label, active, onClick, badge }) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      cursor: "pointer",
      position: "relative",
      minWidth: 44,
    }}
  >
    {badge && (
      <div
        style={{
          position: "absolute",
          top: -5,
          right: 0,
          minWidth: 16,
          height: 16,
          borderRadius: 8,
          background: C.red,
          color: C.white,
          fontSize: 9,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 4px",
        }}
      >
        {badge}
      </div>
    )}
    <div style={{ fontSize: 18, opacity: active ? 1 : 0.4 }}>{icon}</div>
    <div
      style={{
        fontSize: 8,
        fontWeight: active ? 800 : 600,
        color: active ? C.orange : C.textL,
        fontFamily: F.sans,
      }}
    >
      {label}
    </div>
  </div>
);
const TL = ({ hours }) => {
  const u = hours < 1;
  const col = u ? C.red : C.orange;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        background: u ? C.redBg : C.peachLL,
        padding: "2px 7px",
        borderRadius: 5,
        border: `1px solid ${col}20`,
        fontSize: 10,
        fontWeight: 700,
        color: col,
        fontFamily: F.sans,
      }}
    >
      ⏱ {u ? `${Math.round(hours * 60)}m` : `${hours}h`}
    </span>
  );
};
const Section = ({ title, children, right }) => (
  <div style={{ marginBottom: 14 }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
      }}
    >
      <span
        style={{
          color: C.text,
          fontWeight: 800,
          fontSize: 14,
          fontFamily: F.sans,
        }}
      >
        {title}
      </span>
      {right}
    </div>
    {children}
  </div>
);
const Ring = ({ value, max, label, color, size = 58 }) => {
  const r = (size - 8) / 2,
    ci = 2 * Math.PI * r,
    p = (value / max) * 100;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={C.borderL}
            strokeWidth="5"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeDasharray={ci}
            strokeDashoffset={ci - (ci * p) / 100}
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: C.text,
            fontWeight: 800,
            fontSize: 13,
            fontFamily: F.sans,
          }}
        >
          {value}
        </div>
      </div>
      <div
        style={{
          color: C.textL,
          fontSize: 8,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: ".5px",
          fontFamily: F.sans,
        }}
      >
        {label}
      </div>
    </div>
  );
};
const Chip = ({ label, emoji, active, onClick, color = C.orange }) => (
  <div
    onClick={onClick}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: "6px 12px",
      borderRadius: 20,
      cursor: "pointer",
      background: active ? color : C.white,
      color: active ? C.white : C.textM,
      border: active ? "none" : `1px solid ${C.border}`,
      fontSize: 11,
      fontWeight: 700,
      fontFamily: F.sans,
      flexShrink: 0,
    }}
  >
    {emoji && <span style={{ fontSize: 12 }}>{emoji}</span>}
    {label}
  </div>
);
const Avatar = ({ letter = "R", size = 32, border: bd, glow }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.35,
      background: "linear-gradient(145deg,#F4A460,#D4733A)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.4,
      fontWeight: 900,
      color: C.white,
      fontFamily: F.sans,
      border: bd || "none",
      boxShadow: glow || "none",
      flexShrink: 0,
    }}
  >
    {letter}
  </div>
);

/* ══════════════ MAP ══════════════ */
const WarmMap = ({ children }) => {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const w = (cv.width = cv.offsetWidth * 2),
      h = (cv.height = cv.offsetHeight * 2);
    ctx.scale(2, 2);
    const W = w / 2,
      H = h / 2;
    ctx.fillStyle = "#F7F2ED";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#E8E0D8";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0, H * 0.42);
    ctx.bezierCurveTo(W * 0.3, H * 0.4, W * 0.7, H * 0.44, W, H * 0.41);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(W * 0.48, 0);
    ctx.bezierCurveTo(W * 0.5, H * 0.35, W * 0.47, H * 0.65, W * 0.51, H);
    ctx.stroke();
    ctx.strokeStyle = "#EDE6DE";
    ctx.lineWidth = 2;
    [
      [
        [0.2, 0],
        [0.22, 0.5],
        [0.18, 1],
      ],
      [
        [0.75, 0],
        [0.73, 0.4],
        [0.78, 0.9],
      ],
      [
        [0, 0.22],
        [0.45, 0.24],
        [0.95, 0.2],
      ],
      [
        [0, 0.65],
        [0.5, 0.63],
        [1, 0.67],
      ],
    ].forEach((p) => {
      ctx.beginPath();
      ctx.moveTo(p[0][0] * W, p[0][1] * H);
      ctx.quadraticCurveTo(p[1][0] * W, p[1][1] * H, p[2][0] * W, p[2][1] * H);
      ctx.stroke();
    });
    ctx.fillStyle = "#F0EAE2";
    [
      [0.08, 0.3, 0.1, 0.08],
      [0.25, 0.3, 0.08, 0.06],
      [0.55, 0.3, 0.12, 0.07],
      [0.55, 0.5, 0.1, 0.06],
      [0.7, 0.45, 0.08, 0.08],
      [0.82, 0.3, 0.1, 0.1],
    ].forEach(([x, y, bw, bh]) => {
      ctx.fillRect(x * W, y * H, bw * W, bh * H);
    });
  }, []);
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <canvas
        ref={ref}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
      {children}
    </div>
  );
};
const Pin = ({ x, y, emoji, label, alert, onClick, rank, upcoming }) => (
  <div
    onClick={onClick}
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
          width: 40,
          height: 40,
          borderRadius: 12,
          background: upcoming ? C.purpleBg : alert ? C.redBg : C.white,
          border: upcoming
            ? `2px solid ${C.purple}`
            : alert
              ? `2px solid ${C.red}`
              : `2px solid ${C.border}`,
          boxShadow: "0 2px 10px rgba(0,0,0,.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 19,
          position: "relative",
        }}
      >
        {emoji}
        {rank && (
          <div
            style={{
              position: "absolute",
              top: -5,
              left: -5,
              width: 16,
              height: 16,
              borderRadius: "50%",
              background:
                rank === 1 ? C.gold : rank === 2 ? C.silver : C.bronze,
              border: `2px solid ${C.white}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 7,
              fontWeight: 900,
              color: C.white,
            }}
          >
            {rank}
          </div>
        )}
      </div>
      {label && (
        <div
          style={{
            marginTop: 2,
            padding: "2px 6px",
            borderRadius: 6,
            background: upcoming ? C.purple : alert ? C.red : C.white,
            border: alert || upcoming ? "none" : `1px solid ${C.borderL}`,
          }}
        >
          <span
            style={{
              fontSize: 7,
              fontWeight: 700,
              fontFamily: F.sans,
              color: alert || upcoming ? C.white : C.text,
            }}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   1. ONBOARDING FLOW
   ═══════════════════════════════════════════ */
const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(0); // 0=welcome,1=code,2=profile,3=codes,4=done
  const [code, setCode] = useState("");
  const [err, setErr] = useState(false);
  const [username, setUN] = useState("");
  const [displayName, setDN] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInt] = useState([]);
  const [validCode, setVC] = useState("");
  const [myCodes, setMC] = useState([]);
  const [copied, setCopied] = useState(-1);
  const counter = useCounter();

  useEffect(() => {
    if (step === 4)
      onComplete({
        code: validCode,
        username,
        displayName,
        bio,
        interests,
        userNum: getUserNum(validCode),
        og: isOG(getUserNum(validCode)),
        codes: myCodes,
      });
  }, [step]);

  const toggleInt = (id) =>
    setInt((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const verifyCode = () => {
    const c = code.toUpperCase().trim();
    if (VALID.has(c)) {
      setVC(c);
      setMC(genChildren(c));
      setStep(2);
    } else {
      setErr(true);
      setTimeout(() => setErr(false), 2000);
    }
  };
  const copyCode = (i) => {
    navigator.clipboard?.writeText(myCodes[i]);
    setCopied(i);
    setTimeout(() => setCopied(-1), 1500);
  };
  const allCats = [...CATS.meet, ...CATS.sports, ...CATS.network];

  // Step 0: Welcome
  if (step === 0)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: C.dark,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          textAlign: "center",
        }}
      >
        <div className="su">
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 22,
              background: `linear-gradient(135deg,${C.orange},${C.peach})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              animation: "glow 3s ease infinite",
            }}
          >
            <Logo size={28} light />
          </div>
          <h1
            style={{
              fontFamily: F.sans,
              fontWeight: 900,
              fontSize: 28,
              color: C.white,
              marginBottom: 8,
            }}
          >
            Welcome to Foldin
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,.5)",
              fontSize: 14,
              lineHeight: 1.6,
              fontFamily: F.sans,
              maxWidth: 300,
              margin: "0 auto 6px",
            }}
          >
            Discover what's happening around you. Create moments. Build
            community.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              justifyContent: "center",
              margin: "12px 0 28px",
            }}
          >
            <span
              style={{
                color: C.green,
                fontSize: 8,
                animation: "pulse 2s infinite",
              }}
            >
              ●
            </span>
            <span
              style={{
                color: C.peach,
                fontWeight: 800,
                fontSize: 13,
                fontFamily: F.sans,
              }}
            >
              {counter.toLocaleString()}
            </span>
            <span
              style={{
                color: "rgba(255,255,255,.35)",
                fontSize: 11,
                fontFamily: F.sans,
              }}
            >
              people waiting
            </span>
          </div>
          <button
            onClick={() => setStep(1)}
            style={{
              width: "100%",
              maxWidth: 300,
              padding: 14,
              background: C.orange,
              color: C.white,
              border: "none",
              borderRadius: 14,
              fontSize: 15,
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: F.sans,
              marginBottom: 10,
            }}
          >
            I have an invite code
          </button>
          <p
            style={{
              color: "rgba(255,255,255,.25)",
              fontSize: 11,
              fontFamily: F.sans,
            }}
          >
            Invite-only · Each person gets 5 codes
          </p>
        </div>
      </div>
    );

  // Step 1: Enter code
  if (step === 1)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: C.dark,
          display: "flex",
          flexDirection: "column",
          padding: 24,
        }}
      >
        <div
          onClick={() => setStep(0)}
          style={{
            color: C.peach,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: F.sans,
            marginBottom: 40,
          }}
        >
          ← Back
        </div>
        <div
          className="fi"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: 360,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔑</div>
          <h2
            style={{
              fontFamily: F.sans,
              fontWeight: 900,
              fontSize: 24,
              color: C.white,
              marginBottom: 6,
            }}
          >
            Enter your invite code
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,.4)",
              fontSize: 12,
              fontFamily: F.sans,
              marginBottom: 24,
            }}
          >
            Ask a friend who's already on Foldin for their code.
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
              padding: "16px",
              background: "rgba(255,255,255,.06)",
              border: err
                ? "2px solid #E8534A"
                : "2px solid rgba(255,255,255,.08)",
              borderRadius: 14,
              color: C.white,
              fontSize: 17,
              fontFamily: "monospace",
              letterSpacing: "2px",
              outline: "none",
              textAlign: "center",
              marginBottom: 12,
            }}
          />
          <button
            onClick={verifyCode}
            disabled={!code}
            style={{
              width: "100%",
              padding: 14,
              background: code ? C.orange : C.darkL,
              color: code ? C.white : "rgba(255,255,255,.2)",
              border: "none",
              borderRadius: 14,
              fontSize: 15,
              fontWeight: 800,
              cursor: code ? "pointer" : "default",
              fontFamily: F.sans,
            }}
          >
            Verify Code →
          </button>
          {err && (
            <div
              style={{
                color: C.red,
                fontSize: 12,
                fontFamily: F.sans,
                marginTop: 10,
                textAlign: "center",
              }}
            >
              Invalid code. Check with your friend!
            </div>
          )}
        </div>
      </div>
    );

  // Step 2: Create profile
  if (step === 2)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: C.dark,
          overflow: "auto",
          padding: 24,
        }}
      >
        <div className="fi" style={{ maxWidth: 360, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: `${C.orange}30`,
              }}
            >
              <div
                style={{
                  width: "33%",
                  height: "100%",
                  borderRadius: 2,
                  background: C.orange,
                }}
              />
            </div>
            <span style={{ color: C.textLL, fontSize: 10, fontFamily: F.sans }}>
              1/3
            </span>
          </div>
          <h2
            style={{
              fontFamily: F.sans,
              fontWeight: 900,
              fontSize: 22,
              color: C.white,
              marginBottom: 4,
            }}
          >
            Create your profile
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,.4)",
              fontSize: 12,
              fontFamily: F.sans,
              marginBottom: 20,
            }}
          >
            This is how people will find you on Foldin.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 20,
                background: `linear-gradient(135deg,${C.orange},${C.peach})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 900,
                color: C.white,
                fontFamily: F.sans,
                border: `3px solid ${C.gold}`,
              }}
            >
              {displayName ? displayName[0].toUpperCase() : "?"}
            </div>
          </div>
          {[
            {
              l: "Username",
              v: username,
              set: setUN,
              ph: "@your_handle",
              pre: "@",
            },
            { l: "Display Name", v: displayName, set: setDN, ph: "Your Name" },
            {
              l: "Bio",
              v: bio,
              set: setBio,
              ph: "Frontend dev 💻 · Coffee lover ☕",
            },
          ].map((f, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div
                style={{
                  color: "rgba(255,255,255,.6)",
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: F.sans,
                  marginBottom: 5,
                }}
              >
                {f.l}
              </div>
              <input
                value={f.v}
                onChange={(e) => f.set(e.target.value)}
                placeholder={f.ph}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  background: "rgba(255,255,255,.06)",
                  border: "1.5px solid rgba(255,255,255,.08)",
                  borderRadius: 12,
                  color: C.white,
                  fontSize: 14,
                  fontFamily: F.sans,
                  outline: "none",
                }}
              />
            </div>
          ))}
          <div
            style={{
              color: "rgba(255,255,255,.6)",
              fontSize: 11,
              fontWeight: 700,
              fontFamily: F.sans,
              marginBottom: 8,
            }}
          >
            What are you into?
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 24,
            }}
          >
            {allCats.map((c) => (
              <div
                key={c.id}
                onClick={() => toggleInt(c.id)}
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  cursor: "pointer",
                  background: interests.includes(c.id)
                    ? `${C.orange}20`
                    : "rgba(255,255,255,.04)",
                  border: interests.includes(c.id)
                    ? `1px solid ${C.orange}40`
                    : "1px solid rgba(255,255,255,.06)",
                  color: interests.includes(c.id)
                    ? C.peach
                    : "rgba(255,255,255,.4)",
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: F.sans,
                }}
              >
                <span style={{ marginRight: 4 }}>{c.e}</span>
                {c.l}
              </div>
            ))}
          </div>
          <button
            onClick={() => setStep(3)}
            disabled={!username || !displayName}
            style={{
              width: "100%",
              padding: 14,
              background: username && displayName ? C.orange : C.darkL,
              color: username && displayName ? C.white : "rgba(255,255,255,.2)",
              border: "none",
              borderRadius: 14,
              fontSize: 15,
              fontWeight: 800,
              cursor: username && displayName ? "pointer" : "default",
              fontFamily: F.sans,
            }}
          >
            Continue →
          </button>
        </div>
      </div>
    );

  // Step 3: Your codes
  if (step === 3)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: C.dark,
          overflow: "auto",
          padding: 24,
        }}
      >
        <div
          className="fi"
          style={{ maxWidth: 360, margin: "0 auto", textAlign: "center" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: `${C.orange}30`,
              }}
            >
              <div
                style={{
                  width: "66%",
                  height: "100%",
                  borderRadius: 2,
                  background: C.orange,
                }}
              />
            </div>
            <span style={{ color: C.textLL, fontSize: 10, fontFamily: F.sans }}>
              2/3
            </span>
          </div>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
          <h2
            style={{
              fontFamily: F.sans,
              fontWeight: 900,
              fontSize: 22,
              color: C.white,
              marginBottom: 4,
            }}
          >
            You're in, {displayName}!
          </h2>
          <p
            style={{
              color: C.peach,
              fontSize: 13,
              fontFamily: F.sans,
              fontWeight: 600,
              marginBottom: 4,
            }}
          >
            User #{getUserNum(validCode)}
            {isOG(getUserNum(validCode)) ? " · 👑 OG Member" : ""}
          </p>
          <p
            style={{
              color: "rgba(255,255,255,.4)",
              fontSize: 12,
              fontFamily: F.sans,
              marginBottom: 20,
            }}
          >
            Here are your 5 invite codes. Share them wisely — each generates 5
            more.
          </p>
          {myCodes.map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 12px",
                background: "rgba(255,255,255,.04)",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,.06)",
                marginBottom: 5,
              }}
            >
              <div
                style={{
                  flex: 1,
                  color: C.peach,
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: "monospace",
                  letterSpacing: "1px",
                  textAlign: "left",
                }}
              >
                {c}
              </div>
              <button
                onClick={() => copyCode(i)}
                style={{
                  background: copied === i ? C.green : C.orange,
                  color: C.white,
                  border: "none",
                  borderRadius: 6,
                  padding: "5px 12px",
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: F.sans,
                  minWidth: 54,
                }}
              >
                {copied === i ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              justifyContent: "center",
              margin: "16px 0",
              padding: "8px 14px",
              background: `${C.purple}15`,
              borderRadius: 10,
              border: `1px solid ${C.purple}20`,
            }}
          >
            <span style={{ fontSize: 12 }}>🌊</span>
            <span
              style={{
                color: C.purple,
                fontSize: 11,
                fontWeight: 700,
                fontFamily: F.sans,
              }}
            >
              You → 5 → 25 → 125 → 625 → ∞
            </span>
          </div>
          <button
            onClick={() => setStep(4)}
            style={{
              width: "100%",
              padding: 14,
              background: C.orange,
              color: C.white,
              border: "none",
              borderRadius: 14,
              fontSize: 15,
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: F.sans,
              marginTop: 8,
            }}
          >
            Enter Foldin →
          </button>
        </div>
      </div>
    );

  // Step 4: loading while redirect
  if (step === 4)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: C.dark,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            animation: "glow 1s ease infinite",
            width: 60,
            height: 60,
            borderRadius: 20,
            background: `linear-gradient(135deg,${C.orange},${C.peach})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo size={20} light />
        </div>
      </div>
    );
  return null;
};

/* ═══════════════════════════════════════════
   2. HOME SCREEN (with categories)
   ═══════════════════════════════════════════ */
const HomeScreen = ({ go, counter, user }) => {
  const [radius, setRadius] = useState(5);
  const [catFilter, setCF] = useState("all");
  const catTabs = [
    { id: "all", e: "🗺️", l: "All" },
    { id: "meet", e: "☕", l: "Meet" },
    { id: "sports", e: "🏃", l: "Sports" },
    { id: "network", e: "📚", l: "Network" },
    { id: "alert", e: "🚨", l: "Alert" },
  ];
  return (
    <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
      <WarmMap>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "42%",
            width: Math.min(radius * 22 + 40, 350),
            height: Math.min(radius * 22 + 40, 350),
            borderRadius: "50%",
            transform: "translate(-50%,-50%)",
            border: `1.5px solid ${C.orange}25`,
            background: `radial-gradient(circle,${C.orange}06 0%,transparent 70%)`,
            transition: "all .5s",
            zIndex: 5,
          }}
        />
        <Pin
          x={33}
          y={28}
          emoji="☕"
          label="Coffee & Code"
          onClick={() => go("fold")}
          rank={2}
        />
        <Pin
          x={64}
          y={32}
          emoji="🎸"
          label="Open Mic"
          onClick={() => go("fold")}
        />
        <Pin
          x={22}
          y={52}
          emoji="🔥"
          label="🚨 FIRE"
          alert
          onClick={() => go("fold")}
          rank={1}
        />
        <Pin
          x={73}
          y={46}
          emoji="🏀"
          label="Pickup Game"
          onClick={() => go("fold")}
          upcoming
        />
        <Pin
          x={80}
          y={62}
          emoji="🎤"
          label="in 6h"
          upcoming
          onClick={() => go("upcoming")}
        />
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
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: `radial-gradient(circle,${C.orange}15 0%,transparent 70%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "youPulse 2.5s ease-in-out infinite",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: C.orange,
                border: `3px solid ${C.white}`,
                boxShadow: `0 0 12px ${C.orange}40`,
              }}
            />
          </div>
        </div>
        {[
          [38, 40],
          [53, 37],
          [46, 47],
        ].map(([gx, gy], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${gx}%`,
              top: `${gy}%`,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: C.peach,
              border: `1.5px solid ${C.white}`,
              transform: "translate(-50%,-50%)",
              zIndex: 6,
              animation: `ghostFloat 3s ease-in-out ${i * 0.6}s infinite`,
            }}
          />
        ))}
      </WarmMap>
      <div
        style={{
          position: "relative",
          zIndex: 30,
          padding: "12px 14px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Logo size={20} />
          <div
            style={{
              color: C.textL,
              fontSize: 9,
              marginTop: 1,
              fontFamily: F.sans,
              fontWeight: 600,
            }}
          >
            Jakarta · {radius}km
          </div>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          <div
            style={{
              height: 30,
              borderRadius: 15,
              background: "rgba(255,255,255,.9)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              gap: 3,
              padding: "0 9px",
              border: `1px solid ${C.border}`,
            }}
          >
            <span style={{ color: C.green, fontSize: 7 }}>●</span>
            <span
              style={{
                color: C.text,
                fontWeight: 800,
                fontSize: 9,
                fontFamily: F.sans,
              }}
            >
              {counter.toLocaleString()}
            </span>
          </div>
          <div
            onClick={() => go("scan")}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              background: C.white,
              border: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            📷
          </div>
          <div
            onClick={() => go("profile")}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              overflow: "hidden",
              cursor: "pointer",
              border: `2px solid ${user?.og ? C.gold : C.orange}`,
            }}
          >
            <Avatar letter={user?.displayName?.[0] || "R"} size={30} />
          </div>
        </div>
      </div>
      {/* Category Filter */}
      <div
        style={{
          position: "relative",
          zIndex: 30,
          margin: "6px 14px 0",
          display: "flex",
          gap: 5,
          overflowX: "auto",
        }}
      >
        {catTabs.map((t) => (
          <Chip
            key={t.id}
            emoji={t.e}
            label={t.l}
            active={catFilter === t.id}
            onClick={() => setCF(t.id)}
          />
        ))}
      </div>
      {/* Radius */}
      <div
        style={{
          position: "relative",
          zIndex: 30,
          margin: "6px 14px 0",
          padding: "8px 10px",
          background: "rgba(255,255,255,.94)",
          backdropFilter: "blur(16px)",
          borderRadius: 12,
          border: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 3,
          }}
        >
          <span
            style={{
              color: C.textL,
              fontSize: 9,
              fontWeight: 700,
              fontFamily: F.sans,
            }}
          >
            RADIUS
          </span>
          <span
            style={{
              color: C.orange,
              fontSize: 11,
              fontWeight: 800,
              fontFamily: F.sans,
            }}
          >
            {radius}km
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={15}
          value={radius}
          onChange={(e) => setRadius(+e.target.value)}
          style={{
            width: "100%",
            height: 4,
            WebkitAppearance: "none",
            appearance: "none",
            background: `linear-gradient(to right,${C.orange} ${((radius - 1) / 14) * 100}%,${C.borderL} ${((radius - 1) / 14) * 100}%)`,
            borderRadius: 4,
            outline: "none",
            cursor: "pointer",
          }}
        />
      </div>
      {/* AI Match suggestion */}
      <div
        onClick={() => go("ai")}
        style={{
          position: "relative",
          zIndex: 30,
          margin: "5px 14px 0",
          padding: "8px 10px",
          background: `linear-gradient(135deg,${C.purpleBg},${C.cyanBg})`,
          borderRadius: 12,
          border: `1px solid ${C.purple}15`,
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>🤖</span>
          <div style={{ flex: 1 }}>
            <div
              style={{
                color: C.purple,
                fontWeight: 800,
                fontSize: 11,
                fontFamily: F.sans,
              }}
            >
              AI found 3 people with similar vibes
            </div>
            <div style={{ color: C.textL, fontSize: 9, fontFamily: F.sans }}>
              Based on your check-ins & interests
            </div>
          </div>
          <span style={{ color: C.purple, fontSize: 10 }}>›</span>
        </div>
      </div>
      {/* Cards */}
      <div style={{ position: "relative", zIndex: 30, padding: "6px 14px 0" }}>
        <div
          style={{
            display: "flex",
            gap: 6,
            overflowX: "auto",
            paddingBottom: 4,
          }}
        >
          {[
            {
              title: "🚨 FIRE",
              emoji: "🔥",
              members: "47",
              dist: "0.8km",
              alert: true,
              host: "@jkt_info",
              h: 2.5,
              r: 1,
            },
            {
              title: "Coffee & Code",
              emoji: "☕",
              members: "12",
              dist: "0.3km",
              host: "@devraj",
              h: 18,
              r: 2,
            },
            {
              title: "Pickup Basketball",
              emoji: "🏀",
              members: "8/10",
              dist: "1.2km",
              host: "@hoops_jkt",
              h: 4,
            },
          ].map((f, i) => (
            <div
              key={i}
              onClick={() => go("fold")}
              style={{
                background: C.white,
                borderRadius: 14,
                padding: "10px 12px",
                border: f.alert
                  ? `1.5px solid ${C.red}30`
                  : `1px solid ${C.border}`,
                cursor: "pointer",
                minWidth: 160,
                flexShrink: 0,
                position: "relative",
              }}
            >
              {f.alert && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: C.red,
                    borderRadius: "14px 14px 0 0",
                  }}
                />
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  marginBottom: 4,
                }}
              >
                <span style={{ fontSize: 16 }}>{f.emoji}</span>
                {f.r && f.r <= 3 && (
                  <span
                    style={{
                      fontSize: 7,
                      fontWeight: 800,
                      padding: "1px 5px",
                      borderRadius: 4,
                      background: f.r === 1 ? C.goldBg : C.bg,
                      color: f.r === 1 ? C.gold : C.silver,
                      fontFamily: F.sans,
                    }}
                  >
                    {["🥇#1", "🥈#2", "🥉#3"][f.r - 1]}
                  </span>
                )}
                {f.alert && (
                  <Badge color={C.white} bg={C.red}>
                    ALERT
                  </Badge>
                )}
              </div>
              <div
                style={{
                  color: C.text,
                  fontWeight: 800,
                  fontSize: 12,
                  fontFamily: F.sans,
                  marginBottom: 2,
                }}
              >
                {f.title}
              </div>
              {f.host && (
                <div
                  style={{
                    color: C.textL,
                    fontSize: 9,
                    fontFamily: F.sans,
                    marginBottom: 3,
                  }}
                >
                  by{" "}
                  <span style={{ color: C.orange, fontWeight: 700 }}>
                    {f.host}
                  </span>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{ color: C.textL, fontSize: 9, fontFamily: F.sans }}
                >
                  👥{f.members}
                </span>
                <span
                  style={{ color: C.textL, fontSize: 9, fontFamily: F.sans }}
                >
                  📍{f.dist}
                </span>
                {f.h && <TL hours={f.h} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   3. POSTS / DISCOVERY FEED
   ═══════════════════════════════════════════ */
const PostsScreen = ({ go }) => {
  const [newPost, setNP] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Maya J.",
      avatar: "😎",
      handle: "@maya_jin",
      text: "Anyone know a good coworking space near Sudirman? Need fast WiFi and decent coffee ☕",
      time: "5m",
      likes: 4,
      comments: 2,
      dist: "0.3km",
    },
    {
      id: 2,
      user: "Rio D.",
      avatar: "🧑‍💻",
      handle: "@code_rio",
      text: "Just checked out the new ramen spot on Jl. Senopati — 10/10 recommend the spicy miso 🍜🔥",
      time: "15m",
      likes: 12,
      comments: 5,
      dist: "1.2km",
      quoteFold: "Ramen Night · Jl. Senopati",
    },
    {
      id: 3,
      user: "Fitri N.",
      avatar: "🧕",
      handle: "@fitri_n",
      text: "Looking for a running buddy for GBK morning runs! Usually there by 6am. Drop a comment if interested 🏃‍♀️",
      time: "1h",
      likes: 8,
      comments: 7,
      dist: "2.1km",
    },
  ]);
  const [expanded, setExp] = useState(null);
  const [comment, setCmt] = useState("");
  const submit = () => {
    if (!newPost.trim() || newPost.length > 200) return;
    setPosts([
      {
        id: Date.now(),
        user: "You",
        avatar: "R",
        handle: "@" + "you",
        text: newPost,
        time: "now",
        likes: 0,
        comments: 0,
        dist: "here",
      },
      ...posts,
    ]);
    setNP("");
  };
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.bg,
      }}
    >
      <div
        style={{
          padding: "12px 14px",
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Back onClick={() => go("home")} />
        <span
          style={{
            color: C.text,
            fontWeight: 800,
            fontSize: 15,
            fontFamily: F.sans,
            flex: 1,
          }}
        >
          📢 Nearby Posts
        </span>
      </div>
      {/* New Post */}
      <div
        style={{
          padding: "10px 14px",
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <Avatar letter="R" size={28} />
          <div style={{ flex: 1 }}>
            <textarea
              value={newPost}
              onChange={(e) => setNP(e.target.value.slice(0, 200))}
              placeholder="What's happening nearby?"
              rows={2}
              style={{
                width: "100%",
                padding: "8px 10px",
                background: C.bg,
                border: `1px solid ${newPost ? C.orange + "40" : C.border}`,
                borderRadius: 10,
                color: C.text,
                fontSize: 12,
                fontFamily: F.sans,
                outline: "none",
                resize: "none",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              <span
                style={{
                  color: newPost.length > 180 ? C.red : C.textLL,
                  fontSize: 9,
                  fontFamily: F.sans,
                }}
              >
                {newPost.length}/200
              </span>
              <Btn small primary onClick={submit} disabled={!newPost.trim()}>
                Post
              </Btn>
            </div>
          </div>
        </div>
      </div>
      {/* Feed */}
      <div style={{ flex: 1, overflow: "auto", padding: "8px 14px" }}>
        {posts.map((p) => (
          <div
            key={p.id}
            className="fi"
            style={{
              padding: "12px",
              borderRadius: 14,
              background: C.white,
              border: `1px solid ${C.border}`,
              marginBottom: 8,
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
                  width: 28,
                  height: 28,
                  borderRadius: 10,
                  background: C.peachLL,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                }}
              >
                {p.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: C.text,
                    fontWeight: 700,
                    fontSize: 12,
                    fontFamily: F.sans,
                  }}
                >
                  {p.user}
                </div>
                <div
                  style={{ color: C.textL, fontSize: 9, fontFamily: F.sans }}
                >
                  {p.handle} · {p.time} · 📍{p.dist}
                </div>
              </div>
            </div>
            <div
              style={{
                color: C.text,
                fontSize: 12,
                lineHeight: 1.6,
                fontFamily: F.sans,
                marginBottom: 6,
              }}
            >
              {p.text}
            </div>
            {p.quoteFold && (
              <div
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  background: C.peachLL,
                  border: `1px solid ${C.orange}15`,
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <span style={{ fontSize: 10 }}>📌</span>
                <span
                  style={{
                    color: C.orange,
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: F.sans,
                  }}
                >
                  {p.quoteFold}
                </span>
              </div>
            )}
            <div style={{ display: "flex", gap: 12 }}>
              <span
                onClick={() => {}}
                style={{
                  color: C.textL,
                  fontSize: 10,
                  fontFamily: F.sans,
                  cursor: "pointer",
                }}
              >
                ❤️ {p.likes}
              </span>
              <span
                onClick={() => setExp(expanded === p.id ? null : p.id)}
                style={{
                  color: C.textL,
                  fontSize: 10,
                  fontFamily: F.sans,
                  cursor: "pointer",
                }}
              >
                💬 {p.comments}
              </span>
              <span
                style={{
                  color: C.textL,
                  fontSize: 10,
                  fontFamily: F.sans,
                  cursor: "pointer",
                }}
              >
                📤
              </span>
            </div>
            {expanded === p.id && (
              <div
                style={{
                  marginTop: 8,
                  paddingTop: 8,
                  borderTop: `1px solid ${C.border}`,
                }}
              >
                {[
                  { u: "Alex K.", t: "Try Common Grounds!" },
                  { u: "Andi P.", t: "Seconded! Great vibes" },
                ].map((c, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", gap: 6, marginBottom: 5 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        background: C.peachLL,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 9,
                        fontWeight: 700,
                        color: C.orange,
                      }}
                    >
                      {c.u[0]}
                    </div>
                    <div>
                      <span
                        style={{
                          color: C.text,
                          fontSize: 10,
                          fontWeight: 700,
                          fontFamily: F.sans,
                        }}
                      >
                        {c.u}
                      </span>
                      <span
                        style={{
                          color: C.textM,
                          fontSize: 10,
                          fontFamily: F.sans,
                        }}
                      >
                        {" "}
                        {c.t}
                      </span>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                  <input
                    value={comment}
                    onChange={(e) => setCmt(e.target.value)}
                    placeholder="Reply..."
                    style={{
                      flex: 1,
                      padding: "6px 10px",
                      background: C.bg,
                      border: `1px solid ${C.border}`,
                      borderRadius: 8,
                      fontSize: 11,
                      fontFamily: F.sans,
                      outline: "none",
                      color: C.text,
                    }}
                  />
                  <Btn small primary onClick={() => setCmt("")}>
                    ↑
                  </Btn>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   4. JOURNEY V2 (Find My + Recap)
   ═══════════════════════════════════════════ */
const JourneyScreen = ({ go, user }) => {
  const [tab, setTab] = useState("live"); // live | recap | circle
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.bg,
      }}
    >
      <div
        style={{
          padding: "12px 14px",
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Back onClick={() => go("home")} />
        <span
          style={{
            color: C.text,
            fontWeight: 800,
            fontSize: 15,
            fontFamily: F.sans,
            flex: 1,
          }}
        >
          📍 Journey
        </span>
      </div>
      <div
        style={{
          display: "flex",
          padding: "6px 14px",
          gap: 4,
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        {[
          { id: "live", l: "🔴 Live" },
          { id: "recap", l: "📊 Recap" },
          { id: "circle", l: "👥 Circle" },
        ].map((t) => (
          <div
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              padding: 7,
              textAlign: "center",
              borderRadius: 10,
              cursor: "pointer",
              background: tab === t.id ? C.orange : C.bg,
              color: tab === t.id ? C.white : C.textM,
              fontWeight: 700,
              fontSize: 11,
              fontFamily: F.sans,
            }}
          >
            {t.l}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "10px 14px" }}>
        {/* LIVE: Find My style */}
        {tab === "live" && (
          <div>
            <div
              style={{
                padding: "10px",
                borderRadius: 14,
                background: `linear-gradient(135deg,${C.peachLL},${C.purpleBg})`,
                border: `1px solid ${C.orange}15`,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  color: C.text,
                  fontWeight: 700,
                  fontSize: 11,
                  fontFamily: F.sans,
                  marginBottom: 4,
                }}
              >
                🔒 Check-in based only · Your location is never tracked
              </div>
              <div style={{ color: C.textL, fontSize: 10, fontFamily: F.sans }}>
                See where your paths cross with close friends
              </div>
            </div>
            {/* Mini map with paths */}
            <div
              style={{
                height: 140,
                borderRadius: 14,
                background: "#F0EBE5",
                border: `1px solid ${C.border}`,
                marginBottom: 10,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", left: "30%", top: "40%" }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: C.orange,
                    border: `2px solid ${C.white}`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: -8,
                    left: 14,
                    fontSize: 7,
                    fontWeight: 700,
                    color: C.orange,
                    fontFamily: F.sans,
                    whiteSpace: "nowrap",
                  }}
                >
                  You
                </div>
              </div>
              <div style={{ position: "absolute", left: "55%", top: "35%" }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: C.purple,
                    border: `2px solid ${C.white}`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: -8,
                    left: 14,
                    fontSize: 7,
                    fontWeight: 700,
                    color: C.purple,
                    fontFamily: F.sans,
                    whiteSpace: "nowrap",
                  }}
                >
                  Maya
                </div>
              </div>
              <div style={{ position: "absolute", left: "42%", top: "60%" }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: C.cyan,
                    border: `2px solid ${C.white}`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: -8,
                    left: 14,
                    fontSize: 7,
                    fontWeight: 700,
                    color: C.cyan,
                    fontFamily: F.sans,
                    whiteSpace: "nowrap",
                  }}
                >
                  Fitri
                </div>
              </div>
              {/* Intertwine line */}
              <svg
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <path
                  d="M 90 56 Q 130 50 165 49"
                  stroke={C.purple}
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="4 3"
                  opacity=".4"
                />
                <path
                  d="M 90 56 Q 110 70 126 84"
                  stroke={C.cyan}
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="4 3"
                  opacity=".4"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  left: "42%",
                  top: "37%",
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: `${C.gold}25`,
                  border: `1.5px solid ${C.gold}50`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 6 }}>✨</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 6,
                  right: 8,
                  background: "rgba(255,255,255,.85)",
                  padding: "2px 8px",
                  borderRadius: 6,
                  fontSize: 8,
                  fontWeight: 700,
                  color: C.gold,
                  fontFamily: F.sans,
                }}
              >
                ✨ Paths crossed at Kopi Kenangan
              </div>
            </div>
            {/* Recent crossings */}
            <Section title="Recent Crossings">
              {[
                {
                  n: "Maya J.",
                  a: "😎",
                  place: "Kopi Kenangan",
                  time: "2m ago",
                  crossed: true,
                },
                {
                  n: "Fitri N.",
                  a: "🧕",
                  place: "GBK Track",
                  time: "1h ago",
                  crossed: true,
                },
                {
                  n: "Rio D.",
                  a: "🧑‍💻",
                  place: "Blok M Plaza",
                  time: "Yesterday",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px",
                    borderRadius: 12,
                    background: C.white,
                    border: `1px solid ${f.crossed ? C.gold + "30" : C.border}`,
                    marginBottom: 5,
                  }}
                >
                  {f.crossed && (
                    <div
                      style={{ position: "absolute", right: 10, fontSize: 8 }}
                    >
                      ✨
                    </div>
                  )}
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: C.peachLL,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                    }}
                  >
                    {f.a}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        color: C.text,
                        fontWeight: 700,
                        fontSize: 12,
                        fontFamily: F.sans,
                      }}
                    >
                      {f.n}
                    </div>
                    <div
                      style={{
                        color: C.textL,
                        fontSize: 9,
                        fontFamily: F.sans,
                      }}
                    >
                      📍 {f.place} · {f.time}
                    </div>
                  </div>
                  <Btn small onClick={() => go("dm")}>
                    💬
                  </Btn>
                </div>
              ))}
            </Section>
          </div>
        )}

        {/* RECAP: Stats & Journey Summary */}
        {tab === "recap" && (
          <div>
            <div
              style={{
                padding: "16px",
                borderRadius: 16,
                background: `linear-gradient(135deg,${C.orange}10,${C.purple}08)`,
                border: `1px solid ${C.orange}15`,
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  color: C.textL,
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: F.sans,
                  marginBottom: 4,
                }}
              >
                FEBRUARY 2026
              </div>
              <div
                style={{
                  color: C.text,
                  fontWeight: 900,
                  fontSize: 20,
                  fontFamily: F.sans,
                }}
              >
                Your Month in Review
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 6,
                marginBottom: 12,
              }}
            >
              {[
                { v: "23", l: "Events", e: "🎯", c: C.orange },
                { v: "14", l: "New Friends", e: "👥", c: C.purple },
                { v: "8", l: "Stamps", e: "📮", c: C.gold },
                { v: "47km", l: "Explored", e: "🗺️", c: C.green },
                { v: "5", l: "Hosted", e: "🎤", c: C.blue },
                { v: "38", l: "Contributions", e: "💬", c: C.cyan },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 6px",
                    borderRadius: 12,
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 16, marginBottom: 2 }}>{s.e}</div>
                  <div
                    style={{
                      color: s.c,
                      fontWeight: 900,
                      fontSize: 16,
                      fontFamily: F.sans,
                    }}
                  >
                    {s.v}
                  </div>
                  <div
                    style={{
                      color: C.textL,
                      fontSize: 8,
                      fontWeight: 700,
                      fontFamily: F.sans,
                    }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
            <Section title="Your Vibe">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {[
                  { l: "Coffee Lover", e: "☕", p: 85, c: C.orange },
                  { l: "Fitness", e: "🏃", p: 60, c: C.green },
                  { l: "Networking", e: "🤝", p: 45, c: C.purple },
                  { l: "Food Explorer", e: "🍜", p: 72, c: C.gold },
                ].map((v, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 10,
                      background: C.white,
                      border: `1px solid ${C.border}`,
                      flex: "1 0 45%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ fontSize: 12 }}>{v.e}</span>
                      <span
                        style={{
                          color: C.text,
                          fontWeight: 700,
                          fontSize: 11,
                          fontFamily: F.sans,
                        }}
                      >
                        {v.l}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 4,
                        background: C.borderL,
                        borderRadius: 2,
                      }}
                    >
                      <div
                        style={{
                          width: `${v.p}%`,
                          height: "100%",
                          background: v.c,
                          borderRadius: 2,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        color: C.textL,
                        fontSize: 8,
                        fontFamily: F.sans,
                        marginTop: 2,
                      }}
                    >
                      {v.p}% of your events
                    </div>
                  </div>
                ))}
              </div>
            </Section>
            <Section title="Top Spots">
              <div>
                {[
                  { p: "Kopi Kenangan", v: 8, e: "☕" },
                  { p: "GBK Complex", v: 5, e: "🏃" },
                  { p: "SCBD Area", v: 4, e: "🏢" },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 10px",
                      borderRadius: 10,
                      background: C.white,
                      border: `1px solid ${C.border}`,
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ fontSize: 14 }}>{s.e}</span>
                    <div
                      style={{
                        flex: 1,
                        color: C.text,
                        fontWeight: 700,
                        fontSize: 12,
                        fontFamily: F.sans,
                      }}
                    >
                      {s.p}
                    </div>
                    <span
                      style={{
                        color: C.orange,
                        fontWeight: 800,
                        fontSize: 12,
                        fontFamily: F.sans,
                      }}
                    >
                      {s.v}x
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* CIRCLE: Inner Circle / Close Friends */}
        {tab === "circle" && (
          <div>
            <div
              style={{
                padding: "10px",
                borderRadius: 14,
                background: C.purpleBg,
                border: `1px solid ${C.purple}15`,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  color: C.purple,
                  fontWeight: 700,
                  fontSize: 11,
                  fontFamily: F.sans,
                }}
              >
                👥 Inner Circle · Share your journey with close friends & family
              </div>
              <div
                style={{
                  color: C.textL,
                  fontSize: 10,
                  fontFamily: F.sans,
                  marginTop: 2,
                }}
              >
                Like Find My — see check-in overlaps, not live location
              </div>
            </div>
            <Section
              title="Your Circle"
              right={
                <Btn small primary>
                  + Add
                </Btn>
              }
            >
              {[
                {
                  n: "Maya Jintana",
                  a: "😎",
                  r: "Close Friend",
                  status: "active",
                  lastSeen: "Kopi Kenangan · 2m",
                },
                {
                  n: "Budi Ahmad",
                  a: "👨",
                  r: "Family",
                  status: "active",
                  lastSeen: "Home · 30m",
                },
                {
                  n: "Fitri N.",
                  a: "🧕",
                  r: "Close Friend",
                  status: "idle",
                  lastSeen: "GBK Track · 3h",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px",
                    borderRadius: 12,
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    marginBottom: 5,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 12,
                      background: C.peachLL,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      position: "relative",
                    }}
                  >
                    {f.a}
                    <div
                      style={{
                        position: "absolute",
                        bottom: -1,
                        right: -1,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: f.status === "active" ? C.green : C.textLL,
                        border: `2px solid ${C.white}`,
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 5 }}
                    >
                      <span
                        style={{
                          color: C.text,
                          fontWeight: 700,
                          fontSize: 12,
                          fontFamily: F.sans,
                        }}
                      >
                        {f.n}
                      </span>
                      <Badge color={C.purple} bg={C.purpleBg}>
                        {f.r}
                      </Badge>
                    </div>
                    <div
                      style={{
                        color: C.textL,
                        fontSize: 9,
                        fontFamily: F.sans,
                      }}
                    >
                      📍 {f.lastSeen}
                    </div>
                  </div>
                </div>
              ))}
            </Section>
            <Section title="Shared Moments">
              <div>
                {[
                  {
                    place: "Kopi Kenangan",
                    who: ["You", "Maya"],
                    time: "Today, 2:30 PM",
                    type: "☕ Meet",
                  },
                  {
                    place: "GBK Running Track",
                    who: ["You", "Fitri"],
                    time: "Yesterday, 6:00 AM",
                    type: "🏃 Sports",
                  },
                  {
                    place: "Nasi Goreng Fest",
                    who: ["You", "Maya", "Fitri"],
                    time: "Feb 20",
                    type: "🍜 Meet",
                  },
                ].map((m, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "10px",
                      borderRadius: 12,
                      background: C.white,
                      border: `1px solid ${C.border}`,
                      marginBottom: 5,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 3,
                      }}
                    >
                      <span style={{ fontSize: 10 }}>
                        {m.type.split(" ")[0]}
                      </span>
                      <span
                        style={{
                          color: C.text,
                          fontWeight: 700,
                          fontSize: 11,
                          fontFamily: F.sans,
                        }}
                      >
                        {m.place}
                      </span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <span
                        style={{
                          color: C.textL,
                          fontSize: 9,
                          fontFamily: F.sans,
                        }}
                      >
                        {m.who.join(" · ")} · {m.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   5. AI MATCHING
   ═══════════════════════════════════════════ */
const AIScreen = ({ go }) => (
  <div style={{ height: "100%", overflow: "auto", background: C.bg }}>
    <div
      style={{
        padding: "12px 14px",
        background: C.white,
        borderBottom: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Back onClick={() => go("home")} />
      <span
        style={{
          color: C.text,
          fontWeight: 800,
          fontSize: 15,
          fontFamily: F.sans,
        }}
      >
        🤖 AI Matches
      </span>
    </div>
    <div style={{ padding: "10px 14px" }}>
      <div
        style={{
          padding: "14px",
          borderRadius: 14,
          background: `linear-gradient(135deg,${C.purpleBg},${C.cyanBg})`,
          border: `1px solid ${C.purple}15`,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            color: C.purple,
            fontWeight: 800,
            fontSize: 12,
            fontFamily: F.sans,
            marginBottom: 3,
          }}
        >
          ✨ Smart Matching
        </div>
        <div
          style={{
            color: C.textM,
            fontSize: 11,
            lineHeight: 1.5,
            fontFamily: F.sans,
          }}
        >
          Based on overlapping events, shared check-ins, ghost encounters, and
          similar interests.
        </div>
      </div>
      {[
        {
          n: "Dian Kusuma",
          a: "👩‍🎨",
          handle: "@dian_k",
          match: 94,
          reasons: [
            "Both attended 3 coffee meetups",
            "Same running schedule at GBK",
            "7 mutual ghost encounters",
          ],
          interests: ["☕", "🏃", "🎨"],
          online: true,
        },
        {
          n: "Kevin Lim",
          a: "🧑‍💻",
          handle: "@kev_dev",
          match: 87,
          reasons: [
            "Both in tech workshops",
            "Overlapping lunch spots",
            "Similar evening schedules",
          ],
          interests: ["💻", "🍜", "📚"],
          online: false,
        },
        {
          n: "Sarah M.",
          a: "👩",
          handle: "@sarah_m",
          match: 81,
          reasons: [
            "Both love brunch spots",
            "Crossed paths 5 times this week",
            "Same yoga studio check-ins",
          ],
          interests: ["🥞", "🧘", "📸"],
          online: true,
        },
      ].map((m, i) => (
        <div
          key={i}
          className="fi"
          style={{
            padding: "14px",
            borderRadius: 16,
            background: C.white,
            border: `1px solid ${C.border}`,
            marginBottom: 8,
            animationDelay: `${i * 0.1}s`,
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
                width: 44,
                height: 44,
                borderRadius: 14,
                background: C.peachLL,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                position: "relative",
              }}
            >
              {m.a}
              {m.online && (
                <div
                  style={{
                    position: "absolute",
                    bottom: -1,
                    right: -1,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: C.green,
                    border: `2px solid ${C.white}`,
                  }}
                />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    color: C.text,
                    fontWeight: 800,
                    fontSize: 14,
                    fontFamily: F.sans,
                  }}
                >
                  {m.n}
                </span>
              </div>
              <div style={{ color: C.textL, fontSize: 10, fontFamily: F.sans }}>
                {m.handle}
              </div>
            </div>
            <div
              style={{
                background: `linear-gradient(135deg,${C.purple},${C.cyan})`,
                color: C.white,
                fontWeight: 900,
                fontSize: 14,
                padding: "6px 12px",
                borderRadius: 10,
                fontFamily: F.sans,
              }}
            >
              {m.match}%
            </div>
          </div>
          <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
            {m.interests.map((e, j) => (
              <span
                key={j}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: C.peachLL,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                }}
              >
                {e}
              </span>
            ))}
          </div>
          <div style={{ marginBottom: 8 }}>
            {m.reasons.map((r, j) => (
              <div
                key={j}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  marginBottom: 3,
                }}
              >
                <span style={{ color: C.green, fontSize: 10 }}>✓</span>
                <span
                  style={{ color: C.textM, fontSize: 10, fontFamily: F.sans }}
                >
                  {r}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <Btn primary small style={{ flex: 1 }}>
              Connect
            </Btn>
            <Btn small onClick={() => go("dm")} style={{ flex: 1 }}>
              💬 Message
            </Btn>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   6. CALENDAR SYNC
   ═══════════════════════════════════════════ */
const CalendarScreen = ({ go }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const events = [
    {
      d: 3,
      t: "6:00 AM",
      n: "GBK Morning Run",
      e: "🏃",
      c: C.green,
      synced: true,
    },
    {
      d: 4,
      t: "7:00 PM",
      n: "Coffee & Code",
      e: "☕",
      c: C.orange,
      synced: true,
    },
    {
      d: 5,
      t: "11:00 AM",
      n: "Nasi Goreng Fest",
      e: "🍜",
      c: C.purple,
      synced: false,
    },
    {
      d: 6,
      t: "3:00 PM",
      n: "Design Workshop",
      e: "🎨",
      c: C.blue,
      synced: false,
    },
  ];
  return (
    <div style={{ height: "100%", overflow: "auto", background: C.bg }}>
      <div
        style={{
          padding: "12px 14px",
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Back onClick={() => go("home")} />
        <span
          style={{
            color: C.text,
            fontWeight: 800,
            fontSize: 15,
            fontFamily: F.sans,
            flex: 1,
          }}
        >
          📅 Calendar
        </span>
      </div>
      <div style={{ padding: "10px 14px" }}>
        <div
          style={{
            padding: "10px",
            borderRadius: 12,
            background: C.white,
            border: `1px solid ${C.border}`,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              color: C.text,
              fontWeight: 800,
              fontSize: 13,
              fontFamily: F.sans,
              marginBottom: 8,
            }}
          >
            This Week · Feb 17-23
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {days.map((d, i) => {
              const hasE = events.some((e) => e.d === i);
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    padding: "6px 0",
                    textAlign: "center",
                    borderRadius: 8,
                    background:
                      i === 5 ? C.orange : hasE ? C.peachLL : "transparent",
                  }}
                >
                  <div
                    style={{
                      color: i === 5 ? C.white : C.textL,
                      fontSize: 8,
                      fontWeight: 700,
                      fontFamily: F.sans,
                    }}
                  >
                    {d}
                  </div>
                  <div
                    style={{
                      color: i === 5 ? C.white : C.text,
                      fontWeight: 800,
                      fontSize: 13,
                      fontFamily: F.sans,
                    }}
                  >
                    {17 + i}
                  </div>
                  {hasE && (
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: i === 5 ? C.white : C.orange,
                        margin: "2px auto 0",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <Section title="Upcoming Events">
          {events.map((e, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 12,
                background: C.white,
                border: `1px solid ${e.synced ? C.green + "30" : C.border}`,
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: `${e.c}12`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                {e.e}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: C.text,
                    fontWeight: 700,
                    fontSize: 12,
                    fontFamily: F.sans,
                  }}
                >
                  {e.n}
                </div>
                <div
                  style={{ color: C.textL, fontSize: 9, fontFamily: F.sans }}
                >
                  {days[e.d]} · {e.t}
                </div>
              </div>
              {e.synced ? (
                <Badge color={C.green} bg={C.greenBg}>
                  ✓ Synced
                </Badge>
              ) : (
                <Btn small primary bg={e.c} color={C.white}>
                  + Sync
                </Btn>
              )}
            </div>
          ))}
        </Section>
        <div
          style={{
            padding: "10px",
            borderRadius: 12,
            background: C.greenBg,
            border: `1px solid ${C.green}15`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 14 }}>📱</span>
            <div>
              <div
                style={{
                  color: C.green,
                  fontWeight: 700,
                  fontSize: 11,
                  fontFamily: F.sans,
                }}
              >
                Sync to your calendar
              </div>
              <div style={{ color: C.textM, fontSize: 10, fontFamily: F.sans }}>
                Auto-add joined events · Avoid double booking
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   7. QR SCAN
   ═══════════════════════════════════════════ */
const ScanScreen = ({ go, user }) => {
  const [tab, setTab] = useState("scan");
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.dark,
      }}
    >
      <div
        style={{
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          onClick={() => go("home")}
          style={{
            width: 34,
            height: 34,
            borderRadius: 12,
            background: "rgba(255,255,255,.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: C.white,
            fontSize: 16,
          }}
        >
          ←
        </div>
        <span
          style={{
            color: C.white,
            fontWeight: 800,
            fontSize: 15,
            fontFamily: F.sans,
            flex: 1,
          }}
        >
          Quick Add
        </span>
      </div>
      <div
        style={{ display: "flex", padding: "0 14px", gap: 6, marginBottom: 12 }}
      >
        {[
          { id: "scan", l: "📷 Scan" },
          { id: "mycode", l: "🔲 My Code" },
        ].map((t) => (
          <div
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              padding: 8,
              textAlign: "center",
              borderRadius: 10,
              cursor: "pointer",
              background: tab === t.id ? "rgba(255,255,255,.1)" : "transparent",
              color: tab === t.id ? C.white : "rgba(255,255,255,.4)",
              fontWeight: 700,
              fontSize: 12,
              fontFamily: F.sans,
            }}
          >
            {t.l}
          </div>
        ))}
      </div>
      {tab === "scan" ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: 20,
              border: "3px solid rgba(255,255,255,.2)",
              position: "relative",
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 40,
                height: 40,
                borderTop: "3px solid " + C.orange,
                borderLeft: "3px solid " + C.orange,
                borderRadius: "20px 0 0 0",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 40,
                height: 40,
                borderTop: "3px solid " + C.orange,
                borderRight: "3px solid " + C.orange,
                borderRadius: "0 20px 0 0",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: 40,
                height: 40,
                borderBottom: "3px solid " + C.orange,
                borderLeft: "3px solid " + C.orange,
                borderRadius: "0 0 0 20px",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 40,
                height: 40,
                borderBottom: "3px solid " + C.orange,
                borderRight: "3px solid " + C.orange,
                borderRadius: "0 0 20px 0",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 10,
                right: 10,
                height: 2,
                background: `linear-gradient(90deg,transparent,${C.orange},transparent)`,
                animation: "scan 2s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,.15)",
                fontSize: 11,
                fontFamily: F.sans,
                textAlign: "center",
              }}
            >
              Point camera at
              <br />a Foldin QR code
            </div>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,.5)",
              fontSize: 12,
              fontFamily: F.sans,
              textAlign: "center",
            }}
          >
            Scan someone's Foldin code to add them instantly
          </p>
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          {/* QR Code representation */}
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: 20,
              background: C.white,
              padding: 16,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7,1fr)",
                gap: 3,
                marginBottom: 12,
              }}
            >
              {Array.from({ length: 49 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 3,
                    background: Math.random() > 0.45 ? C.dark : C.white,
                  }}
                />
              ))}
            </div>
            <Logo size={16} />
          </div>
          <p
            style={{
              color: C.white,
              fontWeight: 800,
              fontSize: 16,
              fontFamily: F.sans,
              marginBottom: 4,
            }}
          >
            {user?.displayName || "Rizky Ahmad"}
          </p>
          <p
            style={{
              color: C.peach,
              fontSize: 12,
              fontFamily: F.sans,
              marginBottom: 16,
            }}
          >
            @{user?.username || "rizky_ahm"}
          </p>
          <button
            style={{
              padding: "10px 24px",
              background: "rgba(255,255,255,.1)",
              color: C.white,
              border: "1px solid rgba(255,255,255,.15)",
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: F.sans,
            }}
          >
            📤 Share My Code
          </button>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════
   REMAINING SCREENS (compact)
   ═══════════════════════════════════════════ */
const FoldScreen = ({ go }) => {
  const [ci, setCI] = useState(false);
  const [msg, setMsg] = useState("");
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.bg,
      }}
    >
      <div
        style={{
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <Back onClick={() => go("home")} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 14 }}>🔥</span>
            <span
              style={{
                color: C.text,
                fontWeight: 800,
                fontSize: 13,
                fontFamily: F.sans,
              }}
            >
              FIRE — Jl. Gatot Subroto
            </span>
          </div>
          <div style={{ color: C.textL, fontSize: 9, fontFamily: F.sans }}>
            📍 0.8km · 👥 47 · <TL hours={2.5} />
          </div>
        </div>
      </div>
      <div
        style={{
          padding: "8px 14px",
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          gap: 6,
        }}
      >
        <button
          onClick={() => setCI(!ci)}
          style={{
            flex: 1,
            padding: 9,
            background: ci ? C.green : C.orange,
            color: C.white,
            border: "none",
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: F.sans,
          }}
        >
          {ci ? "✓ Checked In" : "🔒 Check In"}
        </button>
        <Btn>📤</Btn>
        <Btn onClick={() => go("calendar")}>📅</Btn>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "8px 14px" }}>
        {[
          {
            u: "Alex K.",
            t: "Anyone else smelling smoke?",
            time: "2m",
            host: false,
          },
          {
            u: "Jakarta Info",
            t: "Official: Fire at Jl. Gatot Subroto Km 3.",
            time: "8m",
            host: true,
          },
          {
            u: "Tom L.",
            t: "Road blocked. Take Rasuna Said.",
            time: "12m",
            host: false,
          },
        ].map((m, i) => (
          <div
            key={i}
            style={{
              padding: "8px 10px",
              borderRadius: 12,
              marginBottom: 5,
              background: m.host ? C.peachLL : C.white,
              border: m.host
                ? `1px solid ${C.peach}40`
                : `1px solid ${C.border}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                marginBottom: 3,
              }}
            >
              <span
                style={{
                  color: C.text,
                  fontWeight: 700,
                  fontSize: 11,
                  fontFamily: F.sans,
                }}
              >
                {m.u}
              </span>
              {m.host && (
                <Badge color={C.white} bg={C.orange}>
                  HOST
                </Badge>
              )}
              <span
                style={{
                  color: C.textLL,
                  fontSize: 8,
                  marginLeft: "auto",
                  fontFamily: F.sans,
                }}
              >
                {m.time}
              </span>
            </div>
            <div
              style={{
                color: C.textM,
                fontSize: 11,
                lineHeight: 1.5,
                fontFamily: F.sans,
              }}
            >
              {m.t}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "8px 14px 10px",
          display: "flex",
          gap: 6,
          background: C.white,
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Say something..."
          style={{
            flex: 1,
            padding: "8px 10px",
            background: C.bg,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            color: C.text,
            fontSize: 11,
            fontFamily: F.sans,
            outline: "none",
          }}
        />
        <button
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: C.orange,
            border: "none",
            cursor: "pointer",
            color: C.white,
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ↑
        </button>
      </div>
    </div>
  );
};

const CreateScreen = ({ go }) => {
  const [mode, setMode] = useState("fold");
  const [title, setT] = useState("");
  const [catGroup, setCG] = useState("meet");
  const [cat, setCat] = useState("");
  const [timer, setTm] = useState(24);
  const [postText, setPT] = useState("");
  return (
    <div style={{ height: "100%", overflow: "auto", background: C.bg }}>
      <div
        style={{
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <Back onClick={() => go("home")} />
        <span
          style={{
            color: C.text,
            fontWeight: 800,
            fontSize: 15,
            fontFamily: F.sans,
          }}
        >
          Create
        </span>
      </div>
      <div style={{ padding: 14 }}>
        <div
          style={{
            display: "flex",
            gap: 4,
            marginBottom: 14,
            background: C.bg,
            borderRadius: 12,
            padding: 3,
            border: `1px solid ${C.border}`,
          }}
        >
          {[
            { id: "fold", l: "📍 Fold" },
            { id: "post", l: "📝 Post" },
            { id: "event", l: "📅 Event" },
          ].map((m) => (
            <div
              key={m.id}
              onClick={() => setMode(m.id)}
              style={{
                flex: 1,
                padding: 7,
                textAlign: "center",
                borderRadius: 10,
                cursor: "pointer",
                background: mode === m.id ? C.orange : "transparent",
                color: mode === m.id ? C.white : C.textM,
                fontWeight: 700,
                fontSize: 11,
                fontFamily: F.sans,
              }}
            >
              {m.l}
            </div>
          ))}
        </div>
        {mode === "post" ? (
          <div>
            <textarea
              value={postText}
              onChange={(e) => setPT(e.target.value.slice(0, 200))}
              placeholder="Share what's happening nearby..."
              rows={4}
              style={{
                width: "100%",
                padding: "12px",
                background: C.white,
                border: `1.5px solid ${postText ? C.orange : C.border}`,
                borderRadius: 12,
                color: C.text,
                fontSize: 13,
                fontFamily: F.sans,
                outline: "none",
                resize: "none",
                marginBottom: 6,
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  color: postText.length > 180 ? C.red : C.textLL,
                  fontSize: 10,
                  fontFamily: F.sans,
                }}
              >
                {postText.length}/200
              </span>
              <span
                style={{ color: C.textL, fontSize: 10, fontFamily: F.sans }}
              >
                📍 Visible within 5km
              </span>
            </div>
            <button
              onClick={() => go("posts")}
              style={{
                width: "100%",
                padding: 14,
                background: postText ? C.orange : C.borderL,
                color: postText ? C.white : C.textLL,
                border: "none",
                borderRadius: 14,
                fontSize: 14,
                fontWeight: 800,
                cursor: postText ? "pointer" : "default",
                fontFamily: F.sans,
              }}
            >
              Post Nearby
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: 14 }}>
              <div
                style={{
                  color: C.text,
                  fontWeight: 700,
                  fontSize: 12,
                  marginBottom: 5,
                  fontFamily: F.sans,
                }}
              >
                {mode === "event" ? "Event Name" : "What's happening?"}
              </div>
              <input
                value={title}
                onChange={(e) => setT(e.target.value)}
                placeholder="e.g. Coffee meetup at Kopi Kenangan"
                style={{
                  width: "100%",
                  padding: "12px",
                  background: C.white,
                  border: `1.5px solid ${title ? C.orange : C.border}`,
                  borderRadius: 12,
                  color: C.text,
                  fontSize: 13,
                  fontFamily: F.sans,
                  outline: "none",
                }}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <div
                style={{
                  color: C.text,
                  fontWeight: 700,
                  fontSize: 12,
                  marginBottom: 5,
                  fontFamily: F.sans,
                }}
              >
                Category
              </div>
              <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                {[
                  { id: "meet", l: "☕ Meet" },
                  { id: "sports", l: "🏃 Sports" },
                  { id: "network", l: "📚 Network" },
                  { id: "alert", l: "🚨 Alert" },
                ].map((g) => (
                  <div
                    key={g.id}
                    onClick={() => {
                      setCG(g.id);
                      setCat("");
                    }}
                    style={{
                      padding: "5px 10px",
                      borderRadius: 8,
                      cursor: "pointer",
                      background: catGroup === g.id ? C.orange : C.bg,
                      color: catGroup === g.id ? C.white : C.textM,
                      fontSize: 10,
                      fontWeight: 700,
                      fontFamily: F.sans,
                      border:
                        catGroup === g.id ? "none" : `1px solid ${C.border}`,
                    }}
                  >
                    {g.l}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {(CATS[catGroup] || []).map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setCat(c.id)}
                    style={{
                      padding: "5px 10px",
                      borderRadius: 8,
                      cursor: "pointer",
                      background: cat === c.id ? C.peachLL : C.white,
                      border: `1px solid ${cat === c.id ? C.orange + "40" : C.border}`,
                      fontSize: 10,
                      fontWeight: 600,
                      fontFamily: F.sans,
                      color: cat === c.id ? C.orange : C.textM,
                    }}
                  >
                    {c.e} {c.l}
                  </div>
                ))}
              </div>
            </div>
            {mode === "fold" && (
              <div style={{ marginBottom: 14 }}>
                <div
                  style={{
                    color: C.text,
                    fontWeight: 700,
                    fontSize: 12,
                    marginBottom: 5,
                    fontFamily: F.sans,
                  }}
                >
                  Duration
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  {[1, 3, 6, 12, 24].map((h) => (
                    <div
                      key={h}
                      onClick={() => setTm(h)}
                      style={{
                        flex: 1,
                        padding: "7px 0",
                        textAlign: "center",
                        borderRadius: 9,
                        cursor: "pointer",
                        background: timer === h ? C.orange : C.white,
                        color: timer === h ? C.white : C.textM,
                        border: timer === h ? "none" : `1px solid ${C.border}`,
                        fontSize: 11,
                        fontWeight: 800,
                        fontFamily: F.sans,
                      }}
                    >
                      {h}h
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => go("home")}
              style={{
                width: "100%",
                padding: 14,
                background: title ? C.orange : C.borderL,
                color: title ? C.white : C.textLL,
                border: "none",
                borderRadius: 14,
                fontSize: 14,
                fontWeight: 800,
                cursor: title ? "pointer" : "default",
                fontFamily: F.sans,
              }}
            >
              Create {mode === "event" ? "Event" : "Fold"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const GhostScreen = ({ go }) => (
  <div
    style={{ height: "100%", overflow: "auto", background: C.bg, padding: 14 }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
      }}
    >
      <Back onClick={() => go("home")} />
      <span
        style={{
          color: C.text,
          fontWeight: 800,
          fontSize: 15,
          fontFamily: F.sans,
        }}
      >
        👻 Ghosts
      </span>
    </div>
    {[
      {
        n: "Maya Jintana",
        a: "😎",
        bio: "UX designer 🎨",
        place: "Kopi Kenangan",
        time: "Now",
        mutual: "3",
      },
      {
        n: "Kevin Lim",
        a: "🧑‍💻",
        bio: "Fullstack dev 💻",
        place: "SCBD",
        time: "5m",
        mutual: "2",
      },
      {
        n: "Fitri N.",
        a: "🧕",
        bio: "Runner 🏃‍♀️",
        place: "GBK",
        time: "1h",
        mutual: "1",
      },
    ].map((p, i) => (
      <div
        key={i}
        style={{
          padding: 12,
          borderRadius: 14,
          background: C.white,
          border: `1px solid ${C.border}`,
          marginBottom: 6,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 5,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: C.peachLL,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
            }}
          >
            {p.a}
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                color: C.text,
                fontWeight: 700,
                fontSize: 12,
                fontFamily: F.sans,
              }}
            >
              {p.n}
            </div>
            <div style={{ color: C.textL, fontSize: 9, fontFamily: F.sans }}>
              {p.bio} · 📍{p.place} · {p.time}
            </div>
          </div>
          {p.mutual && <Badge>{p.mutual} mutual</Badge>}
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          <Btn primary small style={{ flex: 1 }}>
            Follow
          </Btn>
          <Btn small onClick={() => go("dm")} style={{ flex: 1 }}>
            💬
          </Btn>
        </div>
      </div>
    ))}
  </div>
);

const DMScreen = ({ go }) => {
  const [active, setA] = useState(null);
  const [msg, setMsg] = useState("");
  const threads = [
    {
      id: 1,
      name: "Maya",
      avatar: "😎",
      last: "Hey! Both at Kopi ☕",
      time: "2m",
      unread: 2,
    },
    { id: 2, name: "Rio", avatar: "🧑‍💻", last: "Great Open Mic!", time: "1h" },
    {
      id: 3,
      name: "Fitri",
      avatar: "🧕",
      last: "Park Run tomorrow?",
      time: "3h",
      unread: 1,
    },
  ];
  if (active) {
    const t = threads.find((x) => x.id === active);
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: C.bg,
        }}
      >
        <div
          style={{
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: C.white,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <Back onClick={() => setA(null)} />
          <span
            style={{
              color: C.text,
              fontWeight: 700,
              fontSize: 13,
              fontFamily: F.sans,
            }}
          >
            {t.name}
          </span>
        </div>
        <div
          style={{
            flex: 1,
            overflow: "auto",
            padding: 14,
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          {[
            { f: "them", t: "Hey! Small world ☕" },
            { f: "me", t: "Haha yes! Frontend dev here 😄" },
            { f: "them", t: "Coffee sometime?" },
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
                  maxWidth: "78%",
                  padding: "8px 12px",
                  borderRadius: 14,
                  background: m.f === "me" ? C.orange : C.white,
                  color: m.f === "me" ? C.white : C.text,
                  border: m.f === "me" ? "none" : `1px solid ${C.border}`,
                  fontSize: 12,
                  fontFamily: F.sans,
                }}
              >
                {m.t}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            padding: "8px 14px 10px",
            display: "flex",
            gap: 5,
            background: C.white,
            borderTop: `1px solid ${C.border}`,
          }}
        >
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type..."
            style={{
              flex: 1,
              padding: "8px 10px",
              background: C.bg,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              color: C.text,
              fontSize: 11,
              fontFamily: F.sans,
              outline: "none",
            }}
          />
          <button
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: C.orange,
              border: "none",
              cursor: "pointer",
              color: C.white,
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ↑
          </button>
        </div>
      </div>
    );
  }
  return (
    <div style={{ height: "100%", overflow: "auto", background: C.bg }}>
      <div
        style={{
          padding: "12px 14px",
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Back onClick={() => go("home")} />
        <span
          style={{
            color: C.text,
            fontWeight: 800,
            fontSize: 15,
            fontFamily: F.sans,
          }}
        >
          Messages
        </span>
      </div>
      <div style={{ padding: "8px 14px" }}>
        {threads.map((t) => (
          <div
            key={t.id}
            onClick={() => setA(t.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px",
              borderRadius: 12,
              background: C.white,
              border: `1px solid ${C.border}`,
              marginBottom: 5,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                background: C.peachLL,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                position: "relative",
              }}
            >
              {t.avatar}
              {t.unread && (
                <div
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -2,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: C.orange,
                    color: C.white,
                    fontSize: 8,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `2px solid ${C.white}`,
                  }}
                >
                  {t.unread}
                </div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: C.text,
                  fontWeight: t.unread ? 800 : 600,
                  fontSize: 12,
                  fontFamily: F.sans,
                }}
              >
                {t.name}
              </div>
              <div style={{ color: C.textL, fontSize: 10, fontFamily: F.sans }}>
                {t.last}
              </div>
            </div>
            <span style={{ color: C.textLL, fontSize: 9, fontFamily: F.sans }}>
              {t.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileScreen = ({ go, user }) => {
  const n = user?.userNum || 1;
  const og = user?.og !== false;
  return (
    <div style={{ height: "100%", overflow: "auto", background: C.bg }}>
      <div
        style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}
      >
        <div
          style={{
            height: 60,
            background: og
              ? `linear-gradient(135deg,${C.gold},${C.orange},${C.peach})`
              : `linear-gradient(135deg,${C.orange},${C.peach})`,
            position: "relative",
          }}
        >
          <div
            onClick={() => go("home")}
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(255,255,255,.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: C.white,
              fontSize: 12,
            }}
          >
            ←
          </div>
        </div>
        <div style={{ padding: "0 14px 12px", marginTop: -24 }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <Avatar
              letter={user?.displayName?.[0] || "R"}
              size={52}
              border={og ? `3px solid ${C.gold}` : `3px solid ${C.white}`}
              glow={og ? `0 4px 16px ${C.gold}40` : ""}
            />
            {og && (
              <div
                style={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  width: 18,
                  height: 18,
                  borderRadius: 6,
                  background: `linear-gradient(135deg,${C.gold},#FFD700)`,
                  border: `2px solid ${C.white}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 8,
                }}
              >
                👑
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 6,
            }}
          >
            <div
              style={{
                color: C.text,
                fontWeight: 800,
                fontSize: 16,
                fontFamily: F.sans,
              }}
            >
              {user?.displayName || "Rizky Ahmad"}
            </div>
            {og && (
              <div
                style={{
                  background: `linear-gradient(135deg,${C.gold},#FFD700)`,
                  color: C.white,
                  fontSize: 7,
                  fontWeight: 900,
                  padding: "2px 7px",
                  borderRadius: 5,
                  fontFamily: F.sans,
                }}
              >
                OG
              </div>
            )}
          </div>
          <div style={{ color: C.textL, fontSize: 10, fontFamily: F.sans }}>
            @{user?.username || "rizky_ahm"}
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              marginTop: 6,
              padding: "5px 10px",
              borderRadius: 8,
              background: og ? C.goldBg : C.bg,
              border: `1px solid ${og ? C.gold + "25" : C.border}`,
            }}
          >
            <span style={{ fontSize: 10 }}>{og ? "👑" : "🏷️"}</span>
            <div>
              <div
                style={{
                  color: og ? C.gold : C.textM,
                  fontWeight: 900,
                  fontSize: 13,
                  fontFamily: F.sans,
                  lineHeight: 1,
                }}
              >
                User #{n}
              </div>
              <div
                style={{
                  color: og ? C.gold + "99" : C.textLL,
                  fontSize: 7,
                  fontWeight: 700,
                  fontFamily: F.sans,
                }}
              >
                {og ? "EARLY ADOPTER · OG" : "MEMBER"}
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 6,
              color: C.textM,
              fontSize: 11,
              lineHeight: 1.5,
              fontFamily: F.sans,
            }}
          >
            {user?.bio || "Frontend dev 💻 · Coffee ☕ · Community 🌏"}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            {[
              { l: "Followers", v: "142" },
              { l: "Following", v: "89" },
              { l: "Folds", v: "12" },
            ].map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    color: C.text,
                    fontWeight: 800,
                    fontSize: 14,
                    fontFamily: F.sans,
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{ color: C.textL, fontSize: 8, fontFamily: F.sans }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: "10px 14px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
          {[
            { l: "📅 Calendar", s: "calendar" },
            { l: "📍 Journey", s: "journey" },
            { l: "🎟️ Invite", s: "invite" },
          ].map((b, i) => (
            <Btn
              key={i}
              small
              onClick={() => go(b.s)}
              style={{ flex: 1, fontSize: 10 }}
            >
              {b.l}
            </Btn>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "10px 0",
            background: C.white,
            borderRadius: 12,
            border: `1px solid ${C.border}`,
            marginBottom: 10,
          }}
        >
          <Ring value={348} max={500} label="Interactions" color={C.orange} />
          <Ring value={12} max={20} label="Folds" color={C.green} />
          <Ring value={89} max={100} label="Following" color={C.blue} />
        </div>
        <Section title="📮 Stamps">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 5,
              paddingBottom: 10,
            }}
          >
            {[
              { e: "👑", l: "OG", c: og ? "#" + n : "—", sp: og },
              { e: "🏆", l: "Setter", c: "3" },
              { e: "🔥", l: "Responder", c: "5" },
              { e: "☕", l: "Coffee", c: "12" },
              { e: "📡", l: "Reporter", c: "15" },
              { e: "🤝", l: "Connector", c: "22" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  padding: "8px 4px",
                  borderRadius: 10,
                  background: s.sp ? C.goldBg : C.white,
                  border: `1px solid ${s.sp ? C.gold + "30" : C.border}`,
                  position: "relative",
                }}
              >
                {s.sp && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      borderRadius: "10px 10px 0 0",
                      background: `linear-gradient(90deg,${C.gold},#FFD700)`,
                    }}
                  />
                )}
                <div style={{ fontSize: 16 }}>{s.e}</div>
                <div
                  style={{
                    color: s.sp ? C.gold : C.text,
                    fontWeight: 800,
                    fontSize: 12,
                    fontFamily: F.sans,
                  }}
                >
                  {s.c}
                </div>
                <div
                  style={{
                    color: C.textL,
                    fontSize: 7,
                    fontWeight: 700,
                    fontFamily: F.sans,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};

const InviteScreen = ({ go, user }) => {
  const codes = user?.codes || [];
  const [ci, setCI] = useState(-1);
  const copy = (i) => {
    navigator.clipboard?.writeText(codes[i]);
    setCI(i);
    setTimeout(() => setCI(-1), 1500);
  };
  return (
    <div style={{ height: "100%", overflow: "auto", background: C.bg }}>
      <div
        style={{
          padding: "12px 14px",
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Back onClick={() => go("home")} />
        <span
          style={{
            color: C.text,
            fontWeight: 800,
            fontSize: 15,
            fontFamily: F.sans,
          }}
        >
          Invite Friends
        </span>
      </div>
      <div style={{ padding: 14 }}>
        <div
          style={{
            padding: "16px 14px",
            borderRadius: 16,
            background: C.white,
            border: `1px solid ${C.border}`,
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          <Logo size={20} />
          <div
            style={{
              color: C.text,
              fontWeight: 900,
              fontSize: 28,
              fontFamily: F.sans,
              margin: "8px 0 2px",
            }}
          >
            5
          </div>
          <div
            style={{
              color: C.textL,
              fontSize: 10,
              fontFamily: F.sans,
              marginBottom: 10,
            }}
          >
            invites to share
          </div>
          {codes.map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "8px 10px",
                background: C.peachLL,
                borderRadius: 8,
                border: `1px solid ${C.orange}15`,
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  flex: 1,
                  color: C.orange,
                  fontSize: 9,
                  fontWeight: 700,
                  fontFamily: "monospace",
                  letterSpacing: "1px",
                }}
              >
                {c}
              </div>
              <button
                onClick={() => copy(i)}
                style={{
                  background: ci === i ? C.green : C.orange,
                  color: C.white,
                  border: "none",
                  borderRadius: 6,
                  padding: "4px 10px",
                  fontSize: 9,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: F.sans,
                }}
              >
                {ci === i ? "✓" : "Copy"}
              </button>
            </div>
          ))}
        </div>
        <div
          onClick={() => go("scan")}
          style={{
            padding: "12px",
            borderRadius: 12,
            background: C.purpleBg,
            border: `1px solid ${C.purple}12`,
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 16 }}>📷</span>
          <div
            style={{
              color: C.purple,
              fontWeight: 800,
              fontSize: 12,
              fontFamily: F.sans,
              marginTop: 4,
            }}
          >
            Scan to Add
          </div>
          <div style={{ color: C.textL, fontSize: 10, fontFamily: F.sans }}>
            Or let someone scan your code
          </div>
        </div>
      </div>
    </div>
  );
};

const LeaderboardScreen = ({ go }) => {
  const lb = [
    { r: 1, h: "Jakarta Info", a: "📡", f: "🔥 FIRE", n: 847 },
    { r: 2, h: "Devraj K.", a: "🧑‍💻", f: "☕ Coffee", n: 523 },
    { r: 3, h: "Nike ID", a: "🛍️", f: "🛍️ Pop-Up", n: 411 },
    { r: 7, h: "Rizky A.", a: "R", f: "📚 Book", n: 156, you: true },
  ];
  return (
    <div style={{ height: "100%", overflow: "auto", background: C.bg }}>
      <div
        style={{
          padding: "12px 14px",
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Back onClick={() => go("home")} />
        <span
          style={{
            color: C.text,
            fontWeight: 800,
            fontSize: 15,
            fontFamily: F.sans,
          }}
        >
          🏆 Trend Setters
        </span>
      </div>
      <div style={{ padding: "10px 14px" }}>
        {lb.map((item) => (
          <div
            key={item.r}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px",
              borderRadius: 12,
              background: item.you ? C.peachLL : C.white,
              border: item.you
                ? `1.5px solid ${C.orange}40`
                : `1px solid ${C.border}`,
              marginBottom: 5,
              position: "relative",
            }}
          >
            {item.you && (
              <div
                style={{
                  position: "absolute",
                  top: 4,
                  right: 6,
                  background: C.orange,
                  color: C.white,
                  fontSize: 7,
                  fontWeight: 800,
                  padding: "2px 5px",
                  borderRadius: 3,
                  fontFamily: F.sans,
                }}
              >
                YOU
              </div>
            )}
            <div
              style={{
                width: 20,
                textAlign: "center",
                color:
                  item.r <= 3
                    ? [C.gold, C.silver, C.bronze][item.r - 1]
                    : C.textM,
                fontWeight: 800,
                fontSize: 13,
                fontFamily: F.sans,
              }}
            >
              {item.r <= 3 ? ["🥇", "🥈", "🥉"][item.r - 1] : item.r}
            </div>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
                background: C.peachLL,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
              }}
            >
              {item.a}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: C.text,
                  fontWeight: 700,
                  fontSize: 11,
                  fontFamily: F.sans,
                }}
              >
                {item.h}
              </div>
              <div style={{ color: C.textL, fontSize: 9, fontFamily: F.sans }}>
                {item.f}
              </div>
            </div>
            <div
              style={{
                color: C.text,
                fontWeight: 800,
                fontSize: 12,
                fontFamily: F.sans,
              }}
            >
              {item.n}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   APP SHELL
   ═══════════════════════════════════════════ */
const FoldinApp = ({ user }) => {
  const [screen, setScreen] = useState("home");
  const go = (s) => setScreen(s);
  const counter = useCounter();

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 400,
        height: "100%",
        maxHeight: 850,
        background: C.bg,
        position: "relative",
        overflow: "hidden",
        fontFamily: F.sans,
        borderRadius: 28,
        boxShadow: "0 16px 64px rgba(0,0,0,.12),0 0 0 1px rgba(0,0,0,.04)",
      }}
    >
      <div
        className="fi"
        key={screen}
        style={{ height: "calc(100% - 56px)", overflow: "hidden" }}
      >
        {screen === "home" && (
          <HomeScreen go={go} counter={counter} user={user} />
        )}
        {screen === "fold" && <FoldScreen go={go} />}
        {screen === "create" && <CreateScreen go={go} />}
        {screen === "posts" && <PostsScreen go={go} />}
        {screen === "ghost" && <GhostScreen go={go} />}
        {screen === "dm" && <DMScreen go={go} />}
        {screen === "profile" && <ProfileScreen go={go} user={user} />}
        {screen === "invite" && <InviteScreen go={go} user={user} />}
        {screen === "leaderboard" && <LeaderboardScreen go={go} />}
        {screen === "journey" && <JourneyScreen go={go} user={user} />}
        {screen === "ai" && <AIScreen go={go} />}
        {screen === "calendar" && <CalendarScreen go={go} />}
        {screen === "scan" && <ScanScreen go={go} user={user} />}
        {screen === "upcoming" && <FoldScreen go={go} />}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 56,
          padding: "2px 4px 6px",
          background: C.white,
          borderTop: `1px solid ${C.border}`,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Nav
          icon="🗺️"
          label="Map"
          active={screen === "home"}
          onClick={() => go("home")}
        />
        <Nav
          icon="📢"
          label="Posts"
          active={screen === "posts"}
          onClick={() => go("posts")}
          badge="2"
        />
        <div
          onClick={() => go("create")}
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: `linear-gradient(135deg,${C.orange},${C.peach})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            marginTop: -14,
            boxShadow: `0 4px 14px ${C.orange}25`,
            fontSize: 20,
            border: `3px solid ${C.white}`,
            color: C.white,
            fontWeight: 800,
          }}
        >
          +
        </div>
        <Nav
          icon="👻"
          label="Ghosts"
          active={screen === "ghost"}
          onClick={() => go("ghost")}
          badge="3"
        />
        <Nav
          icon="👤"
          label="Me"
          active={screen === "profile"}
          onClick={() => go("profile")}
        />
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   ROOT
   ═══════════════════════════════════════════ */
export default function App() {
  const [user, setUser] = useState<any>(null);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: C.dark,
        fontFamily: F.sans,
      }}
    >
      <Styles />
      {!user ? (
        <Onboarding onComplete={setUser} />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <FoldinApp user={user} />
        </div>
      )}
    </div>
  );
}
