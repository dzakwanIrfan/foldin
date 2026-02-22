import { useState } from "react";
import { C, F } from "../constants";
import { Hdr, Bg } from "../components";
import type { NavigableProps } from "../types";

export function EventsScreen({ go }: NavigableProps) {
  const [tab, setTab] = useState("live");

  const evs: Record<
    string,
    Array<{
      t: string;
      e: string;
      v: string;
      h: string;
      m: string;
      free?: boolean;
      price?: string;
      d?: string;
    }>
  > = {
    live: [
      {
        t: "Coffee & Code",
        e: "☕",
        v: "Kopi Kenangan SCBD",
        h: "Dev Community",
        m: "12/30",
        free: true,
      },
      {
        t: "🚨 FIRE Alert",
        e: "🔥",
        v: "Jl. Gatot Subroto",
        h: "Jakarta Info",
        m: "47",
        free: true,
      },
      {
        t: "GBK Run",
        e: "🏃",
        v: "GBK Track",
        h: "JKT Runners",
        m: "28/50",
        free: true,
      },
      {
        t: "Art Jam",
        e: "🎨",
        v: "SCBD Plaza",
        h: "JKT Creatives",
        m: "15",
        free: true,
      },
    ],
    upcoming: [
      {
        t: "Karaoke Night",
        e: "🎤",
        v: "Karaoke Box Senopati",
        h: "@andi",
        m: "24/50",
        free: true,
        d: "Tonight 8PM",
      },
      {
        t: "Startup Pitch",
        e: "📊",
        v: "WeWork Pacific",
        h: "Startup Grind",
        m: "45/80",
        free: false,
        price: "150K",
        d: "Fri 6PM",
      },
      {
        t: "Design Workshop",
        e: "🎨",
        v: "GoWork Menteng",
        h: "DesignHub",
        m: "30/40",
        free: false,
        price: "200K",
        d: "Sat 10AM",
      },
      {
        t: "Morning Yoga",
        e: "🧘",
        v: "GBK Open Field",
        h: "@yoga_maya",
        m: "12/20",
        free: true,
        d: "Sun 6AM",
      },
    ],
    past: [
      {
        t: "Open Mic Night",
        e: "🎸",
        v: "Jl. Senopati",
        h: "MusicHub",
        m: "65",
        d: "Feb 20",
      },
      {
        t: "Nasi Goreng Fest",
        e: "🍜",
        v: "Senayan Park",
        h: "Foodie JKT",
        m: "156",
        d: "Feb 18",
      },
      {
        t: "Photo Walk",
        e: "📸",
        v: "Kota Tua",
        h: "JKT Photography",
        m: "32",
        d: "Feb 15",
      },
    ],
  };

  const tabs = [
    { id: "live", l: "🔴 Live" },
    { id: "upcoming", l: "⏳ Upcoming" },
    { id: "past", l: "📜 Past" },
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
      <Hdr title="📅 Events" onBack={() => go("home")} />

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 3,
          padding: "6px 12px",
          background: C.w,
          borderBottom: `1px solid ${C.bd}`,
        }}
      >
        {tabs.map((t) => (
          <div
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              padding: 6,
              textAlign: "center",
              borderRadius: 8,
              cursor: "pointer",
              background: tab === t.id ? C.o : C.bg,
              color: tab === t.id ? C.w : C.tM,
              fontSize: 10,
              fontWeight: 700,
              fontFamily: F,
            }}
          >
            {t.l}
          </div>
        ))}
      </div>

      {/* Event list */}
      <div style={{ flex: 1, overflow: "auto", padding: "8px 12px" }}>
        {(evs[tab] || []).map((ev, i) => (
          <div
            key={i}
            onClick={() => go("event")}
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
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: C.pLL,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                {ev.e}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: C.t,
                    fontWeight: 800,
                    fontSize: 12,
                    fontFamily: F,
                  }}
                >
                  {ev.t}
                </div>
                <div style={{ color: C.tL, fontSize: 8, fontFamily: F }}>
                  📍 {ev.v} · by {ev.h}
                </div>
                <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
                  <span style={{ color: C.tL, fontSize: 8, fontFamily: F }}>
                    👥 {ev.m}
                  </span>
                  {ev.d && (
                    <span style={{ color: C.tL, fontSize: 8, fontFamily: F }}>
                      📅 {ev.d}
                    </span>
                  )}
                  {ev.free ? (
                    <Bg ch="FREE" co={C.g} bg={C.gBg} />
                  ) : (
                    ev.price && (
                      <Bg ch={`IDR ${ev.price}`} co={C.go} bg={C.goBg} />
                    )
                  )}
                  {tab === "past" && (
                    <Bg ch="📮 Stamped" co={C.pu} bg={C.puBg} />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
