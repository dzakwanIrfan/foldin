import { C, F } from "../constants";
import { Hdr, Btn, Bg, Sec } from "../components";
import type { NavigableProps } from "../types";

export function CircleScreen({ go }: NavigableProps) {
  const circlePeople = [
    { l: "You", x: 30, y: 40, c: C.o },
    { l: "Maya", x: 55, y: 35, c: C.pu },
    { l: "Budi", x: 42, y: 62, c: C.cy },
  ];

  const circleMembers = [
    {
      n: "Maya Jintana",
      a: "😎",
      r: "Friend",
      ls: "Kopi Kenangan · 2m",
      on: true,
    },
    { n: "Budi Ahmad", a: "👨", r: "Family", ls: "Home · 30m", on: true },
    { n: "Fitri N.", a: "🧕", r: "Friend", ls: "GBK Track · 3h" },
  ];

  const moments = [
    { p: "Kopi Kenangan", w: "You + Maya", t: "Today 2:30 PM", e: "☕" },
    { p: "GBK Track", w: "You + Fitri", t: "Yesterday 6 AM", e: "🏃" },
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
      <Hdr title="👥 Inner Circle" onBack={() => go("profile")} />

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
          🔒 Check-in based · Your location is never tracked live
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "8px 12px" }}>
        {/* Mini map */}
        <div
          style={{
            height: 130,
            borderRadius: 14,
            background: "#F0EBE5",
            border: `1px solid ${C.bd}`,
            marginBottom: 8,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {circlePeople.map((p, i) => (
            <div
              key={i}
              style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%` }}
            >
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: p.c,
                  border: `2px solid ${C.w}`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: -7,
                  left: 12,
                  fontSize: 6,
                  fontWeight: 700,
                  color: p.c,
                  fontFamily: F,
                  whiteSpace: "nowrap",
                }}
              >
                {p.l}
              </div>
            </div>
          ))}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <path
              d="M 93 52 Q 130 48 170 46"
              stroke={C.pu}
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 3"
              opacity=".4"
            />
            <path
              d="M 93 52 Q 110 68 130 81"
              stroke={C.cy}
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 3"
              opacity=".4"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              bottom: 5,
              right: 6,
              background: "rgba(255,255,255,.85)",
              padding: "2px 7px",
              borderRadius: 5,
              fontSize: 7,
              fontWeight: 700,
              color: C.go,
              fontFamily: F,
            }}
          >
            ✨ Paths crossed at Kopi Kenangan
          </div>
        </div>

        {/* Circle members */}
        <Sec
          t="Your Circle"
          r={<Btn ch="+ Add" pri sm />}
          ch={
            <div>
              {circleMembers.map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px",
                    borderRadius: 10,
                    background: C.w,
                    border: `1px solid ${C.bd}`,
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: C.pLL,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      position: "relative",
                    }}
                  >
                    {f.a}
                    {f.on && (
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
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <span
                        style={{
                          color: C.t,
                          fontWeight: 700,
                          fontSize: 10,
                          fontFamily: F,
                        }}
                      >
                        {f.n}
                      </span>
                      <Bg ch={f.r} co={C.pu} bg={C.puBg} />
                    </div>
                    <div style={{ color: C.tL, fontSize: 8, fontFamily: F }}>
                      📍 {f.ls}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        />

        {/* Shared moments */}
        <Sec
          t="Shared Moments"
          ch={
            <div>
              {moments.map((m, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px",
                    borderRadius: 9,
                    background: C.w,
                    border: `1px solid ${C.bd}`,
                    marginBottom: 3,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <span style={{ fontSize: 10 }}>{m.e}</span>
                    <span
                      style={{
                        color: C.t,
                        fontWeight: 700,
                        fontSize: 10,
                        fontFamily: F,
                      }}
                    >
                      {m.p}
                    </span>
                  </div>
                  <div style={{ color: C.tL, fontSize: 8, fontFamily: F }}>
                    {m.w} · {m.t}
                  </div>
                </div>
              ))}
            </div>
          }
        />
      </div>
    </div>
  );
}
