import { useState } from "react";
import { C, F } from "../constants";
import { Logo } from "../components";
import type { NavigableWithUserProps } from "../types";

export function ScanScreen({ go, u }: NavigableWithUserProps) {
  const [tab, setTab] = useState("scan");
  const [search, setSearch] = useState("");

  const results =
    search.length > 1
      ? [
          { n: "Maya Jintana", h: "@maya_jin", a: "😎" },
          { n: "Devraj Kumar", h: "@devraj_k", a: "🧑‍💻" },
        ]
      : [];

  const tabs = [
    { id: "scan", l: "📷 Scan" },
    { id: "my", l: "🔲 My QR" },
    { id: "search", l: "🔍 Search" },
  ];

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.dk,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "10px 12px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          onClick={() => go("home")}
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            background: "rgba(255,255,255,.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: C.w,
            fontSize: 13,
          }}
        >
          ←
        </div>
        <span
          style={{ color: C.w, fontWeight: 800, fontSize: 14, fontFamily: F }}
        >
          Add Friends
        </span>
      </div>

      {/* Tabs */}
      <div
        style={{ display: "flex", gap: 4, padding: "0 12px", marginBottom: 8 }}
      >
        {tabs.map((t) => (
          <div
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              padding: 7,
              textAlign: "center",
              borderRadius: 9,
              cursor: "pointer",
              background: tab === t.id ? "rgba(255,255,255,.1)" : "transparent",
              color: tab === t.id ? C.w : "rgba(255,255,255,.35)",
              fontWeight: 700,
              fontSize: 10,
              fontFamily: F,
            }}
          >
            {t.l}
          </div>
        ))}
      </div>

      {/* Scan tab */}
      {tab === "scan" && (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 190,
              height: 190,
              borderRadius: 16,
              border: "3px solid rgba(255,255,255,.12)",
              position: "relative",
              overflow: "hidden",
              marginBottom: 14,
            }}
          >
            {(
              [
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1],
              ] as [number, number][]
            ).map(([x, y], i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  ...(y ? { bottom: 0 } : { top: 0 }),
                  ...(x ? { right: 0 } : { left: 0 }),
                  width: 34,
                  height: 34,
                  [`border${y ? "Bottom" : "Top"}`]: `3px solid ${C.o}`,
                  [`border${x ? "Right" : "Left"}`]: `3px solid ${C.o}`,
                  borderRadius: [
                    "16px 0 0 0",
                    "0 16px 0 0",
                    "0 0 0 16px",
                    "0 0 16px 0",
                  ][i],
                }}
              />
            ))}
            <div
              style={{
                position: "absolute",
                left: 8,
                right: 8,
                height: 2,
                background: `linear-gradient(90deg,transparent,${C.o},transparent)`,
                animation: "sc 2s ease-in-out infinite",
              }}
            />
          </div>
          <p
            style={{
              color: "rgba(255,255,255,.4)",
              fontSize: 10,
              fontFamily: F,
            }}
          >
            Point camera at a Foldin QR code
          </p>
        </div>
      )}

      {/* My QR tab */}
      {tab === "my" && (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 175,
              height: 175,
              borderRadius: 16,
              background: C.w,
              padding: 12,
              marginBottom: 12,
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
                gap: 2,
                marginBottom: 6,
              }}
            >
              {Array.from({ length: 49 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: 2,
                    background: Math.random() > 0.45 ? C.dk : C.w,
                  }}
                />
              ))}
            </div>
            <Logo sz={13} />
          </div>
          <p
            style={{ color: C.w, fontWeight: 800, fontSize: 14, fontFamily: F }}
          >
            {u?.displayName || "You"}
          </p>
          <p style={{ color: C.p, fontSize: 10, fontFamily: F }}>
            @{u?.username || "user"}
          </p>
          <button
            style={{
              marginTop: 10,
              padding: "8px 20px",
              background: "rgba(255,255,255,.1)",
              color: C.w,
              border: "1px solid rgba(255,255,255,.15)",
              borderRadius: 10,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: F,
            }}
          >
            📤 Share My QR
          </button>
        </div>
      )}

      {/* Search tab */}
      {tab === "search" && (
        <div style={{ flex: 1, padding: "0 12px" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search @username or name"
            style={{
              width: "100%",
              padding: "10px 12px",
              background: "rgba(255,255,255,.06)",
              border: "1.5px solid rgba(255,255,255,.08)",
              borderRadius: 10,
              color: C.w,
              fontSize: 12,
              fontFamily: F,
              outline: "none",
              marginBottom: 8,
            }}
          />
          {results.map((r, i) => (
            <div
              key={i}
              onClick={() => go("userProfile")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "9px",
                borderRadius: 10,
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.06)",
                marginBottom: 4,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 11,
                  background: "rgba(255,255,255,.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                {r.a}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: C.w,
                    fontWeight: 700,
                    fontSize: 11,
                    fontFamily: F,
                  }}
                >
                  {r.n}
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,.4)",
                    fontSize: 9,
                    fontFamily: F,
                  }}
                >
                  {r.h}
                </div>
              </div>
              <button
                style={{
                  padding: "5px 12px",
                  background: C.o,
                  color: C.w,
                  border: "none",
                  borderRadius: 7,
                  fontSize: 9,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: F,
                }}
              >
                Follow
              </button>
            </div>
          ))}
          {search.length > 1 && (
            <div
              style={{
                color: "rgba(255,255,255,.3)",
                fontSize: 9,
                fontFamily: F,
                textAlign: "center",
                marginTop: 8,
              }}
            >
              {results.length} results for "{search}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
