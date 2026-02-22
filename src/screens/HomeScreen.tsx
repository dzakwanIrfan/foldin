import { useState } from "react";
import { C, F } from "../constants";
import { Logo, Av, Bg, Pin, MapView } from "../components";
import type { NavigableWithUserProps } from "../types";

export function HomeScreen({ go, u }: NavigableWithUserProps) {
  const [zoom, setZoom] = useState(5);
  const [radius, setRadius] = useState(5);

  const events = [
    { x: 33, y: 28, e: "☕", l: "Coffee&Code", live: true, r: 2 },
    { x: 22, y: 52, e: "🔥", l: "🚨 FIRE", al: true, live: true, r: 1 },
    { x: 64, y: 32, e: "🎸", l: "Open Mic", live: true },
    { x: 73, y: 46, e: "🏀", l: "Pickup Game", up: true },
    { x: 80, y: 62, e: "🎤", l: "Karaoke 2h", up: true },
    { x: 48, y: 55, e: "🍜", l: "Nasi Goreng", live: true, r: 3 },
    { x: 15, y: 35, e: "🧘", l: "Morning Yoga", live: true },
    { x: 85, y: 30, e: "📊", l: "Pitch Night", up: true },
    { x: 28, y: 68, e: "🏃", l: "GBK Run", live: true },
    { x: 60, y: 70, e: "🎨", l: "Art Jam", live: true },
    { x: 42, y: 22, e: "📸", l: "Photo Walk", up: true },
    { x: 75, y: 75, e: "🎮", l: "Gaming Café", live: true },
    { x: 55, y: 15, e: "🍺", l: "Happy Hour", live: true },
    { x: 10, y: 60, e: "📚", l: "Book Club", live: true },
  ];

  const cards = [
    { e: "🚨", t: "Alert", s: "Fire · 47", c: C.r, bg: C.rBg },
    { e: "🔥", t: "Popular", s: "Coffee&Code", c: C.o, bg: C.pLL },
    { e: "🏙️", t: "Jakarta", s: "JKT Runners · 2.1K", c: C.pu, bg: C.puBg },
    { e: "🇮🇩", t: "Indonesia", s: "Bali Surf · 8.4K", c: C.cy, bg: C.cyBg },
  ];

  const liveEvents = [
    {
      t: "🚨 FIRE Alert",
      e: "🔥",
      v: "Jl. Gatot Subroto",
      h: "Jakarta Info",
      m: "47",
      al: true,
    },
    {
      t: "Coffee & Code",
      e: "☕",
      v: "Kopi Kenangan SCBD",
      h: "Dev Community",
      m: "12",
    },
    { t: "GBK Run Club", e: "🏃", v: "GBK Track", h: "JKT Runners", m: "28" },
    {
      t: "Nasi Goreng Fest",
      e: "🍜",
      v: "Senayan Park",
      h: "Foodie JKT",
      m: "156",
      paid: "75K",
    },
  ];

  return (
    <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
      <MapView zoom={zoom}>
        {/* Radius circle */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "42%",
            width: Math.min(radius * 16 + 30, 350),
            height: Math.min(radius * 16 + 30, 350),
            borderRadius: "50%",
            transform: "translate(-50%,-50%)",
            border: `1.5px solid ${C.o}20`,
            background: `radial-gradient(circle,${C.o}05 0%,transparent 70%)`,
            transition: "all .4s",
            zIndex: 4,
          }}
        />

        {/* Event pins */}
        {events.map((ev, i) => (
          <Pin
            key={i}
            x={ev.x}
            y={ev.y}
            emoji={ev.e}
            label={ev.l}
            alert={ev.al}
            rank={ev.r}
            upcoming={ev.up}
            live={ev.live}
            onClick={() => go("event")}
          />
        ))}

        {/* User position */}
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
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: `radial-gradient(circle,${C.o}15 0%,transparent 70%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "yp 2.5s ease-in-out infinite",
            }}
          >
            <div
              style={{
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: C.o,
                border: `3px solid ${C.w}`,
                boxShadow: `0 0 10px ${C.o}40`,
              }}
            />
          </div>
        </div>

        {/* Ghost dots */}
        {(
          [
            [38, 40],
            [53, 37],
            [46, 47],
            [62, 44],
            [30, 58],
          ] as [number, number][]
        ).map(([gx, gy], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${gx}%`,
              top: `${gy}%`,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: C.p,
              border: `1.5px solid ${C.w}`,
              transform: "translate(-50%,-50%)",
              zIndex: 6,
              animation: `gf 3s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </MapView>

      {/* Top bar */}
      <div
        style={{
          position: "relative",
          zIndex: 30,
          padding: "10px 12px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Logo sz={18} />
          <div
            style={{ color: C.tL, fontSize: 7, fontFamily: F, fontWeight: 600 }}
          >
            Jakarta · {radius}km
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <div
            onClick={() => go("scan")}
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              background: C.w,
              border: `1px solid ${C.bd}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            📷
          </div>
          <div
            onClick={() => go("profile")}
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              overflow: "hidden",
              cursor: "pointer",
              border: `2px solid ${u?.og ? C.go : C.o}`,
            }}
          >
            <Av l={u?.displayName?.[0] || "R"} sz={28} />
          </div>
        </div>
      </div>

      {/* Zoom controls */}
      <div
        style={{
          position: "absolute",
          right: 10,
          top: "42%",
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {[
          { l: "+", f: () => setZoom((z) => Math.min(z + 1, 10)) },
          { l: "−", f: () => setZoom((z) => Math.max(z - 1, 1)) },
        ].map((b, i) => (
          <div
            key={i}
            onClick={b.f}
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              background: "rgba(255,255,255,.92)",
              border: `1px solid ${C.bd}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
              color: C.t,
            }}
          >
            {b.l}
          </div>
        ))}
      </div>

      {/* Radius slider */}
      <div
        style={{
          position: "relative",
          zIndex: 30,
          margin: "6px 12px 0",
          padding: "7px 10px",
          background: "rgba(255,255,255,.94)",
          backdropFilter: "blur(12px)",
          borderRadius: 10,
          border: `1px solid ${C.bd}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <span
            style={{ color: C.tL, fontSize: 8, fontWeight: 700, fontFamily: F }}
          >
            RADIUS
          </span>
          <span
            style={{ color: C.o, fontSize: 10, fontWeight: 800, fontFamily: F }}
          >
            {radius}km
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={20}
          value={radius}
          onChange={(e) => setRadius(+e.target.value)}
          style={{
            width: "100%",
            background: `linear-gradient(to right,${C.o} ${((radius - 1) / 19) * 100}%,${C.bdL} ${((radius - 1) / 19) * 100}%)`,
            cursor: "pointer",
          }}
        />
      </div>

      {/* Quick-access cards */}
      <div
        style={{
          position: "relative",
          zIndex: 30,
          margin: "5px 12px 0",
          display: "flex",
          gap: 4,
          overflowX: "auto",
        }}
      >
        {cards.map((w, i) => (
          <div
            key={i}
            onClick={() => go("popular")}
            style={{
              minWidth: 108,
              padding: "7px 9px",
              borderRadius: 10,
              background: w.bg,
              border: `1px solid ${w.c}15`,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                marginBottom: 1,
              }}
            >
              <span style={{ fontSize: 11 }}>{w.e}</span>
              <span
                style={{
                  color: w.c,
                  fontWeight: 800,
                  fontSize: 8,
                  fontFamily: F,
                }}
              >
                {w.t}
              </span>
            </div>
            <div style={{ color: C.tM, fontSize: 7, fontFamily: F }}>{w.s}</div>
          </div>
        ))}
      </div>

      {/* Happening now */}
      <div style={{ position: "relative", zIndex: 30, padding: "5px 12px 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 3,
          }}
        >
          <span
            style={{ color: C.t, fontWeight: 800, fontSize: 11, fontFamily: F }}
          >
            🔴 Happening Now
          </span>
          <span
            onClick={() => go("events")}
            style={{
              color: C.o,
              fontSize: 9,
              fontWeight: 700,
              fontFamily: F,
              cursor: "pointer",
            }}
          >
            All events →
          </span>
        </div>
        <div style={{ display: "flex", gap: 5, overflowX: "auto" }}>
          {liveEvents.map((f, i) => (
            <div
              key={i}
              onClick={() => go("event")}
              style={{
                background: C.w,
                borderRadius: 11,
                padding: "8px 9px",
                border: f.al ? `1.5px solid ${C.r}30` : `1px solid ${C.bd}`,
                cursor: "pointer",
                minWidth: 140,
                flexShrink: 0,
              }}
            >
              {f.al && (
                <div
                  style={{
                    height: 2,
                    background: C.r,
                    borderRadius: "11px 11px 0 0",
                    margin: "-8px -9px 4px",
                  }}
                />
              )}
              <div style={{ fontSize: 14, marginBottom: 1 }}>{f.e}</div>
              <div
                style={{
                  color: C.t,
                  fontWeight: 800,
                  fontSize: 10,
                  fontFamily: F,
                }}
              >
                {f.t}
              </div>
              <div style={{ color: C.tL, fontSize: 7, fontFamily: F }}>
                📍{f.v}
              </div>
              <div style={{ color: C.tL, fontSize: 7, fontFamily: F }}>
                by <span style={{ color: C.o, fontWeight: 700 }}>{f.h}</span> ·
                👥{f.m}
              </div>
              {f.paid && <Bg ch={`IDR ${f.paid}`} co={C.go} bg={C.goBg} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
