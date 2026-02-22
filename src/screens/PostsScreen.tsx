import { useState } from "react";
import { C, F } from "../constants";
import { Hdr, PhotoThumb } from "../components";
import type { NavigableProps } from "../types";

export function PostsScreen({ go }: NavigableProps) {
  const [scope, setScope] = useState("near");

  const posts = [
    {
      u: "Maya J.",
      a: "😎",
      t: "Anyone know good coworking near Sudirman? ☕",
      time: "5m",
      likes: 4,
      cm: 2,
      dist: "0.3km",
      sc: "near",
    },
    {
      u: "Rio D.",
      a: "🧑‍💻",
      t: "New ramen spot Jl. Senopati is incredible 🍜🔥",
      time: "15m",
      likes: 12,
      cm: 5,
      sc: "near",
      img: "ramen.jpg",
    },
    {
      u: "JKT Update",
      a: "📡",
      t: "Heavy traffic Sudirman due to marathon.",
      time: "30m",
      likes: 45,
      cm: 12,
      sc: "city",
    },
    {
      u: "TechAsia",
      a: "💻",
      t: "SE Asia startup funding hits record Q1 2026",
      time: "4h",
      likes: 1200,
      cm: 89,
      sc: "global",
    },
  ];

  const shown =
    scope === "near"
      ? posts.filter((p) => p.sc === "near")
      : scope === "city"
        ? posts.filter((p) => ["near", "city"].includes(p.sc))
        : posts;

  const scopes = [
    { id: "near", l: "📍 Near" },
    { id: "city", l: "🏙️ City" },
    { id: "country", l: "🇮🇩 Country" },
    { id: "global", l: "🌏 Global" },
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
      <Hdr title="📢 Posts" onBack={() => go("home")} />

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

      <div style={{ flex: 1, overflow: "auto", padding: "6px 12px" }}>
        {shown.map((p, i) => (
          <div
            key={i}
            className="fi"
            style={{
              padding: "9px",
              borderRadius: 11,
              background: C.w,
              border: `1px solid ${C.bd}`,
              marginBottom: 4,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                marginBottom: 2,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  background: C.pLL,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                }}
              >
                {p.a}
              </div>
              <span
                style={{
                  color: C.t,
                  fontWeight: 700,
                  fontSize: 10,
                  fontFamily: F,
                }}
              >
                {p.u}
              </span>
              <span style={{ color: C.tL, fontSize: 7, fontFamily: F }}>
                · {p.time}
                {p.dist ? ` · 📍${p.dist}` : ""}
              </span>
            </div>
            <div
              style={{
                color: C.t,
                fontSize: 10,
                lineHeight: 1.5,
                fontFamily: F,
                marginBottom: 3,
              }}
            >
              {p.t}
            </div>
            {p.img && (
              <div style={{ marginBottom: 3 }}>
                <PhotoThumb label={p.img} />
              </div>
            )}
            <div style={{ display: "flex", gap: 10 }}>
              <span style={{ color: C.tL, fontSize: 8, fontFamily: F }}>
                ❤️ {p.likes}
              </span>
              <span style={{ color: C.tL, fontSize: 8, fontFamily: F }}>
                💬 {p.cm}
              </span>
              <span style={{ color: C.tL, fontSize: 8, fontFamily: F }}>
                📤
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
