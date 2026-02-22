import { useState } from "react";
import { C, F, PERSONAS } from "../constants";
import { Hdr, Btn, Bg } from "../components";
import type { NavigableWithUserProps, Persona } from "../types";

interface Ghost {
  id: number;
  n: string;
  a: string;
  h: string;
  x: number;
  match: number;
  persona: Persona;
  reasons: string[];
  met: string;
  ago: string;
}

export function GhostScreen({ go }: NavigableWithUserProps) {
  const [sel, setSel] = useState<number | null>(null);

  const ghosts: Ghost[] = [
    {
      id: 1,
      n: "Dian Kusuma",
      a: "👩‍🎨",
      h: "@dian_k",
      x: 7,
      match: 94,
      persona: PERSONAS[3],
      reasons: [
        "3 coffee meetups together",
        "Same GBK schedule",
        "7 overlapping check-ins",
      ],
      met: "Coffee & Code · Jan 15",
      ago: "5 weeks ago",
    },
    {
      id: 2,
      n: "Kevin Lim",
      a: "🧑‍💻",
      h: "@kev_dev",
      x: 5,
      match: 87,
      persona: PERSONAS[1],
      reasons: [
        "Both in tech workshops",
        "Overlapping lunch spots",
        "Similar evening schedule",
      ],
      met: "Startup Pitch · Feb 1",
      ago: "3 weeks ago",
    },
    {
      id: 3,
      n: "Sarah M.",
      a: "👩",
      h: "@sarah_m",
      x: 3,
      match: 81,
      persona: PERSONAS[7],
      reasons: [
        "Both love brunch spots",
        "Crossed paths 5x this week",
        "Same yoga studio",
      ],
      met: "Morning Yoga · Feb 10",
      ago: "12 days ago",
    },
    {
      id: 4,
      n: "Andi P.",
      a: "🎸",
      h: "@andi_p",
      x: 2,
      match: 72,
      persona: PERSONAS[0],
      reasons: ["Open Mic regulars", "Similar music taste"],
      met: "Open Mic · Feb 18",
      ago: "4 days ago",
    },
    {
      id: 5,
      n: "Budi R.",
      a: "👨",
      h: "@budi_r",
      x: 4,
      match: 68,
      persona: PERSONAS[6],
      reasons: ["GBK running buddies", "Same morning schedule"],
      met: "GBK Run · Feb 20",
      ago: "2 days ago",
    },
    {
      id: 6,
      n: "Lisa T.",
      a: "💃",
      h: "@lisa_t",
      x: 1,
      match: 63,
      persona: PERSONAS[5],
      reasons: ["Karaoke night overlap"],
      met: "Karaoke · Feb 21",
      ago: "Yesterday",
    },
  ];

  /* ── Detail view ── */
  if (sel) {
    const g = ghosts.find((x) => x.id === sel)!;

    return (
      <div style={{ height: "100%", overflow: "auto", background: C.bg }}>
        <Hdr title="AI Match" onBack={() => setSel(null)} />
        <div style={{ padding: "12px" }}>
          {/* Profile card */}
          <div
            style={{
              padding: "16px",
              borderRadius: 16,
              background: C.w,
              border: `1px solid ${C.bd}`,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                background: C.pLL,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                margin: "0 auto 6px",
              }}
            >
              {g.a}
            </div>
            <div
              style={{
                color: C.t,
                fontWeight: 900,
                fontSize: 16,
                fontFamily: F,
              }}
            >
              {g.n}
            </div>
            <div
              style={{
                color: C.tL,
                fontSize: 10,
                fontFamily: F,
                marginBottom: 6,
              }}
            >
              {g.h}
            </div>

            {/* AI Persona */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "5px 12px",
                borderRadius: 8,
                background: `${g.persona.c}12`,
                border: `1px solid ${g.persona.c}25`,
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 14 }}>{g.persona.e}</span>
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    color: g.persona.c,
                    fontWeight: 800,
                    fontSize: 10,
                    fontFamily: F,
                  }}
                >
                  {g.persona.t}
                </div>
                <div style={{ color: C.tL, fontSize: 7, fontFamily: F }}>
                  {g.persona.d}
                </div>
              </div>
            </div>

            {/* Match score circle */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: `linear-gradient(135deg,${C.pu},${C.cy})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 8px",
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: C.w,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    color: C.pu,
                    fontWeight: 900,
                    fontSize: 20,
                    fontFamily: F,
                    lineHeight: 1,
                  }}
                >
                  {g.match}%
                </div>
                <div
                  style={{
                    color: C.tL,
                    fontSize: 6,
                    fontWeight: 700,
                    fontFamily: F,
                  }}
                >
                  MATCH
                </div>
              </div>
            </div>
          </div>

          {/* Why you match */}
          <div
            style={{
              padding: "10px",
              borderRadius: 12,
              background: C.puBg,
              border: `1px solid ${C.pu}15`,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                color: C.pu,
                fontWeight: 800,
                fontSize: 10,
                fontFamily: F,
                marginBottom: 4,
              }}
            >
              ✨ Why you match
            </div>
            {g.reasons.map((r, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  marginBottom: 2,
                }}
              >
                <span style={{ color: C.g, fontSize: 9 }}>✓</span>
                <span style={{ color: C.tM, fontSize: 9, fontFamily: F }}>
                  {r}
                </span>
              </div>
            ))}
          </div>

          {/* First met */}
          <div
            style={{
              padding: "10px",
              borderRadius: 12,
              background: C.goBg,
              border: `1px solid ${C.go}20`,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                color: C.go,
                fontWeight: 800,
                fontSize: 10,
                fontFamily: F,
              }}
            >
              📍 First encountered
            </div>
            <div style={{ color: C.tM, fontSize: 10, fontFamily: F }}>
              {g.met}
            </div>
            <div style={{ color: C.tL, fontSize: 8, fontFamily: F }}>
              {g.ago} · 🔀 {g.x} total encounters
            </div>
          </div>

          <div style={{ display: "flex", gap: 5 }}>
            <Btn ch="Follow" pri sty={{ flex: 1 }} />
            <Btn ch="💬 Message" sty={{ flex: 1 }} onClick={() => go("dm")} />
          </div>
        </div>
      </div>
    );
  }

  /* ── List view ── */
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.bg,
      }}
    >
      <Hdr
        title="👻 Ghost Encounters"
        onBack={() => go("profile")}
        right={<Bg ch={`${ghosts.length} people`} co={C.pu} bg={C.puBg} />}
      />
      <div
        style={{
          padding: "6px 12px",
          background: C.puBg,
          borderBottom: `1px solid ${C.pu}15`,
        }}
      >
        <div
          style={{ color: C.pu, fontSize: 9, fontWeight: 700, fontFamily: F }}
        >
          🤖 AI analyzed your overlapping activities, events attended &
          check-ins to find your best matches.
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "8px 12px" }}>
        {ghosts.map((g) => (
          <div
            key={g.id}
            onClick={() => setSel(g.id)}
            className="fi"
            style={{
              padding: "10px",
              borderRadius: 12,
              background: C.w,
              border: `1px solid ${C.bd}`,
              marginBottom: 5,
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 13,
                  background: C.pLL,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                {g.a}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span
                    style={{
                      color: C.t,
                      fontWeight: 800,
                      fontSize: 12,
                      fontFamily: F,
                    }}
                  >
                    {g.n}
                  </span>
                  <span style={{ fontSize: 8 }}>{g.persona.e}</span>
                </div>
                <div style={{ color: C.tL, fontSize: 8, fontFamily: F }}>
                  {g.h} · 🔀 {g.x}× · Met at {g.met.split("·")[0].trim()}
                </div>
                <div style={{ color: C.tL, fontSize: 7, fontFamily: F }}>
                  {g.ago}
                </div>
              </div>
              <div
                style={{
                  background: `linear-gradient(135deg,${C.pu},${C.cy})`,
                  color: C.w,
                  fontWeight: 900,
                  fontSize: 12,
                  padding: "5px 10px",
                  borderRadius: 8,
                  fontFamily: F,
                }}
              >
                {g.match}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
