import { useState } from "react";
import { C, F } from "../constants";
import { Hdr, Bk, Bg, Attach } from "../components";
import type { NavigableProps } from "../types";

export function DMScreen({ go }: NavigableProps) {
  const [active, setA] = useState<number | null>(null);
  const [msg, setMsg] = useState("");

  const threads = [
    {
      id: 1,
      name: "Maya J.",
      av: "😎",
      last: "Hey! Both at Kopi ☕",
      time: "2m",
      unread: 2,
      type: "user",
    },
    {
      id: 2,
      name: "Dev Community JKT",
      av: "☕",
      last: "Devraj: Who's coming?",
      time: "5m",
      unread: 4,
      type: "fold",
    },
    {
      id: 3,
      name: "JKT Runners",
      av: "🏃",
      last: "Fitri: Morning run?",
      time: "2h",
      unread: 1,
      type: "fold",
    },
    {
      id: 4,
      name: "Rio D.",
      av: "🧑‍💻",
      last: "Great Open Mic!",
      time: "3h",
      type: "user",
    },
    {
      id: 5,
      name: "Warung Bu Dewi",
      av: "🍜",
      last: "Reservation confirmed!",
      time: "5h",
      type: "brand",
    },
  ];

  const chatBubbles = [
    { f: "them", t: "Hey! Small world ☕" },
    { f: "me", t: "Haha! See you there 😄" },
    { f: "them", t: "Corner table!" },
  ];

  /* ── Active thread ── */
  if (active) {
    const th = threads.find((x) => x.id === active)!;

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
            padding: "10px 12px",
            background: C.w,
            borderBottom: `1px solid ${C.bd}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Bk onClick={() => setA(null)} />
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: th.type === "fold" ? 8 : "50%",
              background: C.pLL,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
            }}
          >
            {th.av}
          </div>
          <span
            style={{
              color: C.t,
              fontWeight: 700,
              fontSize: 11,
              fontFamily: F,
              flex: 1,
            }}
          >
            {th.name}
          </span>
          {th.type !== "user" && (
            <Bg
              ch={th.type === "fold" ? "FOLD" : "BRAND"}
              co={th.type === "fold" ? C.pu : C.b}
              bg={th.type === "fold" ? C.puBg : C.bBg}
            />
          )}
        </div>

        <div
          style={{
            flex: 1,
            overflow: "auto",
            padding: 10,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {chatBubbles.map((m, i) => (
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
                  padding: "7px 10px",
                  borderRadius: 12,
                  background: m.f === "me" ? C.o : C.w,
                  color: m.f === "me" ? C.w : C.t,
                  border: m.f === "me" ? "none" : `1px solid ${C.bd}`,
                  fontSize: 11,
                  fontFamily: F,
                }}
              >
                {m.t}
              </div>
            </div>
          ))}
        </div>

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
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type..."
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
              width: 30,
              height: 30,
              borderRadius: 8,
              background: C.o,
              border: "none",
              cursor: "pointer",
              color: C.w,
              fontSize: 11,
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

  /* ── Thread list ── */
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.bg,
      }}
    >
      <Hdr title="💬 Messages" onBack={() => go("home")} />
      <div style={{ flex: 1, overflow: "auto", padding: "6px 12px" }}>
        {threads.map((t) => (
          <div
            key={t.id}
            onClick={() => setA(t.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px",
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
                borderRadius: t.type === "fold" ? 10 : "50%",
                background: C.pLL,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                position: "relative",
              }}
            >
              {t.av}
              {(t.unread ?? 0) > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -2,
                    minWidth: 12,
                    height: 12,
                    borderRadius: 6,
                    background: C.o,
                    color: C.w,
                    fontSize: 7,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `2px solid ${C.w}`,
                    padding: "0 2px",
                  }}
                >
                  {t.unread}
                </div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <span
                  style={{
                    color: C.t,
                    fontWeight: t.unread ? 800 : 600,
                    fontSize: 10,
                    fontFamily: F,
                  }}
                >
                  {t.name}
                </span>
                {t.type === "fold" && <Bg ch="FOLD" co={C.pu} bg={C.puBg} />}
                {t.type === "brand" && <Bg ch="BRAND" co={C.b} bg={C.bBg} />}
              </div>
              <div style={{ color: C.tL, fontSize: 8, fontFamily: F }}>
                {t.last}
              </div>
            </div>
            <span style={{ color: C.tLL, fontSize: 7, fontFamily: F }}>
              {t.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
