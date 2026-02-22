import { useState } from "react";
import { C, F } from "../constants";
import { Hdr, Btn, Bg, Attach, PhotoThumb } from "../components";
import type { NavigableProps } from "../types";

export function FoldScreen({ go }: NavigableProps) {
  const [ci, setCI] = useState(false);
  const [joined, setJ] = useState(true);
  const [tab, setTab] = useState("chat");

  const chatMessages = [
    {
      u: "Devraj K.",
      t: "Who's coming to Coffee&Code tomorrow?",
      time: "2m",
      host: true,
      pin: true,
    },
    { u: "Maya J.", t: "I'll be there! 💻", time: "5m" },
    {
      u: "Rio D.",
      t: "Check this extension",
      time: "15m",
      img: "screenshot.png",
    },
    { u: "Fitri N.", t: "Need a ride from Sudirman?", time: "20m" },
  ];

  const foldEvents = [
    { t: "Coffee & Code", e: "☕", d: "Tomorrow 7PM", live: true },
    { t: "Pitch Night", e: "📊", d: "Fri 6PM" },
  ];

  const members = [
    { n: "Devraj K.", a: "🧑‍💻", r: "Host", on: true },
    { n: "Maya J.", a: "😎", on: true },
    { n: "Rio D.", a: "🎸" },
    { n: "Fitri N.", a: "🧕", on: true },
  ];

  const tabs = [
    { id: "chat", l: "💬 Chat" },
    { id: "events", l: "📅 Events" },
    { id: "members", l: "👥 1.2K" },
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
      <Hdr
        title=""
        onBack={() => go("home")}
        right={
          <div style={{ display: "flex", gap: 3 }}>
            <Bg ch="PUBLIC" co={C.g} bg={C.gBg} />
            <Bg ch="1.2K" co={C.o} bg={C.pLL} />
          </div>
        }
      />

      {/* Fold info header */}
      <div
        style={{
          padding: "8px 12px",
          background: C.w,
          borderBottom: `1px solid ${C.bd}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 13,
              background: `linear-gradient(135deg,${C.o},${C.p})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            ☕
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                color: C.t,
                fontWeight: 900,
                fontSize: 14,
                fontFamily: F,
              }}
            >
              Dev Community JKT
            </div>
            <div style={{ color: C.tL, fontSize: 8, fontFamily: F }}>
              Coffee · Coding · Networking
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          <button
            onClick={() => setJ(!joined)}
            style={{
              flex: 1,
              padding: 7,
              background: joined ? C.g : C.o,
              color: C.w,
              border: "none",
              borderRadius: 9,
              fontSize: 10,
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: F,
            }}
          >
            {joined ? "✓ Joined" : "Join"}
          </button>
          <button
            onClick={() => setCI(!ci)}
            style={{
              padding: "7px 10px",
              background: ci ? C.gBg : C.bg,
              color: ci ? C.g : C.tM,
              border: `1px solid ${ci ? C.g : C.bd}`,
              borderRadius: 9,
              fontSize: 10,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: F,
            }}
          >
            {ci ? "🔔" : "🔕"}
          </button>
          <Btn ch="📤" sm />
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 3,
          padding: "5px 12px",
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
              padding: 5,
              textAlign: "center",
              borderRadius: 8,
              cursor: "pointer",
              background: tab === t.id ? C.o : "transparent",
              color: tab === t.id ? C.w : C.tM,
              fontSize: 9,
              fontWeight: 700,
              fontFamily: F,
            }}
          >
            {t.l}
          </div>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflow: "auto", padding: "6px 12px" }}>
        {tab === "chat" && (
          <div>
            {chatMessages.map((m, i) => (
              <div
                key={i}
                style={{
                  padding: "7px 9px",
                  borderRadius: 10,
                  marginBottom: 3,
                  background: m.pin ? C.goBg : m.host ? C.pLL : C.w,
                  border: `1px solid ${m.pin ? C.go + "25" : m.host ? C.p + "40" : C.bd}`,
                }}
              >
                {m.pin && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      marginBottom: 2,
                    }}
                  >
                    <span style={{ fontSize: 7 }}>📌</span>
                    <span
                      style={{
                        color: C.go,
                        fontSize: 7,
                        fontWeight: 800,
                        fontFamily: F,
                      }}
                    >
                      PINNED
                    </span>
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    marginBottom: 1,
                  }}
                >
                  <span
                    style={{
                      color: C.t,
                      fontWeight: 700,
                      fontSize: 10,
                      fontFamily: F,
                    }}
                  >
                    {m.u}
                  </span>
                  {m.host && <Bg ch="HOST" co={C.w} bg={C.o} />}
                  <span
                    style={{
                      color: C.tLL,
                      fontSize: 7,
                      marginLeft: "auto",
                      fontFamily: F,
                    }}
                  >
                    {m.time}
                  </span>
                </div>
                <div style={{ color: C.tM, fontSize: 10, fontFamily: F }}>
                  {m.t}
                </div>
                {m.img && (
                  <div style={{ marginTop: 2 }}>
                    <PhotoThumb label={m.img} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "events" && (
          <div>
            {foldEvents.map((ev, i) => (
              <div
                key={i}
                onClick={() => go("event")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "9px",
                  borderRadius: 10,
                  background: C.w,
                  border: `1px solid ${C.bd}`,
                  marginBottom: 4,
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 16 }}>{ev.e}</span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      color: C.t,
                      fontWeight: 800,
                      fontSize: 11,
                      fontFamily: F,
                    }}
                  >
                    {ev.t}
                  </div>
                  <div style={{ color: C.tL, fontSize: 8, fontFamily: F }}>
                    {ev.d}
                  </div>
                </div>
                {ev.live && <Bg ch="LIVE" co={C.w} bg={C.g} />}
              </div>
            ))}
          </div>
        )}

        {tab === "members" && (
          <div>
            {members.map((m, i) => (
              <div
                key={i}
                onClick={() => go("userProfile")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px",
                  borderRadius: 9,
                  background: C.w,
                  border: `1px solid ${C.bd}`,
                  marginBottom: 3,
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 9,
                    background: C.pLL,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    position: "relative",
                  }}
                >
                  {m.a}
                  {m.on && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: -1,
                        right: -1,
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: C.g,
                        border: `1.5px solid ${C.w}`,
                      }}
                    />
                  )}
                </div>
                <span
                  style={{
                    color: C.t,
                    fontWeight: 700,
                    fontSize: 10,
                    fontFamily: F,
                    flex: 1,
                  }}
                >
                  {m.n}
                </span>
                {m.r && <Bg ch={m.r} co={C.w} bg={C.o} />}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message input */}
      <div
        style={{
          padding: "6px 12px 8px",
          display: "flex",
          gap: 4,
          background: C.w,
          borderTop: `1px solid ${C.bd}`,
          alignItems: "center",
        }}
      >
        <Attach />
        <input
          placeholder="Message..."
          style={{
            flex: 1,
            padding: "7px 10px",
            background: C.bg,
            border: `1px solid ${C.bd}`,
            borderRadius: 9,
            color: C.t,
            fontSize: 10,
            fontFamily: F,
            outline: "none",
          }}
        />
        <button
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            background: C.o,
            border: "none",
            cursor: "pointer",
            color: C.w,
            fontSize: 12,
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
