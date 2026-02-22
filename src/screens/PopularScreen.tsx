import { useState } from "react";
import { C, F } from "../constants";
import { Hdr, Btn, Bg } from "../components";
import type { NavigableProps } from "../types";

export function PopularScreen({ go }: NavigableProps) {
  const [scope, setScope] = useState("near");

  const folds: Record<
    string,
    Array<{ n: string; e: string; m: string; cat: string; v?: boolean }>
  > = {
    near: [
      {
        n: "Dev Community JKT",
        e: "☕",
        m: "1.2K",
        cat: "Coffee · Coding",
        v: true,
      },
      { n: "JKT Runners", e: "🏃", m: "856", cat: "Running" },
      { n: "Foodie Jakarta", e: "🍜", m: "2.1K", cat: "Food", v: true },
    ],
    city: [
      { n: "Jakarta Photography", e: "📸", m: "5.4K", cat: "Photography" },
      { n: "Startup Grind JKT", e: "🚀", m: "3.2K", cat: "Startups", v: true },
    ],
    country: [
      { n: "Bali Surf Community", e: "🏄", m: "8.4K", cat: "Surfing", v: true },
      { n: "Indonesian Devs", e: "💻", m: "15K", cat: "Tech", v: true },
    ],
    global: [
      { n: "Digital Nomads", e: "🌏", m: "145K", cat: "Remote Work", v: true },
      { n: "Founders Network", e: "🚀", m: "67K", cat: "Startups", v: true },
    ],
  };

  const scopes = [
    { id: "near", l: "📍 Near" },
    { id: "city", l: "🏙️ City" },
    { id: "country", l: "🇮🇩" },
    { id: "global", l: "🌏" },
  ];

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.bg,
      }}
    >
      <Hdr title="🔥 Popular Folds" onBack={() => go("home")} />

      <div
        style={{
          display: "flex",
          gap: 3,
          padding: "6px 12px",
          background: C.w,
          borderBottom: `1px solid ${C.bd}`,
        }}
      >
        {scopes.map((s) => (
          <div
            key={s.id}
            onClick={() => setScope(s.id)}
            style={{
              flex: 1,
              padding: 5,
              textAlign: "center",
              borderRadius: 8,
              cursor: "pointer",
              background: scope === s.id ? C.o : C.bg,
              color: scope === s.id ? C.w : C.tM,
              fontSize: 9,
              fontWeight: 700,
              fontFamily: F,
            }}
          >
            {s.l}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "8px 12px" }}>
        {(folds[scope] || []).map((f, i) => (
          <div
            key={i}
            onClick={() => go("fold")}
            className="fi"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px",
              borderRadius: 12,
              background: C.w,
              border: `1px solid ${C.bd}`,
              marginBottom: 4,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: C.pLL,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              {f.e}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <span
                  style={{
                    color: C.t,
                    fontWeight: 800,
                    fontSize: 11,
                    fontFamily: F,
                  }}
                >
                  {f.n}
                </span>
                {f.v && <Bg ch="✓" co={C.b} bg={C.bBg} />}
              </div>
              <div style={{ color: C.tL, fontSize: 8, fontFamily: F }}>
                {f.cat} · 👥 {f.m}
              </div>
            </div>
            <Btn ch="Join" pri sm />
          </div>
        ))}
      </div>
    </div>
  );
}
