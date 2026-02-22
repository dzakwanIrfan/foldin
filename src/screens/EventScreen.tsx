import { useState } from "react";
import { C, F } from "../constants";
import { Hdr, Btn, Bg, Attach, PhotoThumb } from "../components";
import type { NavigableProps } from "../types";

export function EventScreen({ go }: NavigableProps) {
  const [joined, setJ] = useState(false);
  const [ci, setCI] = useState(false);

  const details = [
    ["📍", "Kopi Kenangan, SCBD, Jakarta Selatan"],
    ["🏠", "Hosted by Dev Community JKT"],
    ["📅", "Feb 22 · 7:00 PM – 10:00 PM"],
    ["👥", "12 / 30 joined"],
    ["💰", "FREE"],
  ];

  const messages = [
    {
      u: "Devraj K.",
      t: "Setting up at the corner table ☕",
      time: "2m",
      host: true,
    },
    { u: "Maya J.", t: "On my way! 10 min", time: "5m" },
    {
      u: "Alex K.",
      t: "Already here, saved seats!",
      time: "8m",
      img: "table.jpg",
    },
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
      <Hdr title="Event" onBack={() => go("home")} />

      <div style={{ flex: 1, overflow: "auto", padding: "8px 12px" }}>
        {/* Event card */}
        <div
          style={{
            padding: "14px",
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
                width: 48,
                height: 48,
                borderRadius: 14,
                background: C.pLL,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
              }}
            >
              ☕
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: C.t,
                  fontWeight: 900,
                  fontSize: 15,
                  fontFamily: F,
                }}
              >
                Coffee & Code Session
              </div>
              <Bg ch="🔴 LIVE" co={C.w} bg={C.g} />
            </div>
          </div>

          {details.map(([ic, tx], i) => (
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
              <span style={{ color: C.tM, fontSize: 10, fontFamily: F }}>
                {tx}
              </span>
            </div>
          ))}

          <div
            style={{
              height: 70,
              borderRadius: 10,
              background: "#EDE6DE",
              border: `1px solid ${C.bd}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "8px 0",
            }}
          >
            <span style={{ color: C.tL, fontSize: 9, fontFamily: F }}>
              📍 View on Map
            </span>
          </div>

          <div style={{ display: "flex", gap: 4 }}>
            <button
              onClick={() => setJ(!joined)}
              style={{
                flex: 1,
                padding: 9,
                background: joined ? C.g : C.o,
                color: C.w,
                border: "none",
                borderRadius: 10,
                fontSize: 11,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: F,
              }}
            >
              {joined ? "✓ Joined" : "Join Event"}
            </button>
            {joined && (
              <button
                onClick={() => setCI(!ci)}
                style={{
                  padding: "9px 12px",
                  background: ci ? C.gBg : C.bg,
                  color: ci ? C.g : C.tM,
                  border: `1px solid ${ci ? C.g : C.bd}`,
                  borderRadius: 10,
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: F,
                }}
              >
                {ci ? "🔔" : "🔕"}
              </button>
            )}
            <Btn ch="📅" sm />
            <Btn ch="📤" sm />
          </div>
        </div>

        {/* Chat messages */}
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              padding: "7px 9px",
              borderRadius: 10,
              marginBottom: 3,
              background: m.host ? C.pLL : C.w,
              border: `1px solid ${m.host ? C.p + "40" : C.bd}`,
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
          placeholder="Say something..."
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
