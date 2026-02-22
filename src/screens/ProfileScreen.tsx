import { C, F, PERSONAS } from "../constants";
import { Av, Btn, Bg, Stamp, Sec } from "../components";
import type { NavigableWithUserProps } from "../types";

export function ProfileScreen({ go, u }: NavigableWithUserProps) {
  const n = u?.userNum || 1;
  const og = u?.og !== false;
  const per = u?.persona || PERSONAS[0];

  const quickActions = [
    { l: "📅 Events", s: "events" as const },
    { l: "👥 Circle", s: "circle" as const },
    { l: "👻 Ghosts", s: "ghost" as const },
    { l: "🎟️ Invite", s: "invite" as const },
    { l: "💳 Wallet", s: "payment" as const },
  ];

  const activityMetrics = [
    { e: "🤝", t: "Met 14 new people", s: "This month", c: C.pu },
    { e: "🔀", t: "23 ghost encounters", s: "6 unique people", c: C.cy },
    { e: "📍", t: "47km explored", s: "Across Jakarta", c: C.g },
    { e: "⏱️", t: "38 hours at events", s: "Avg 1.6h per event", c: C.o },
  ];

  const milestones = [
    { n: "Maya J.", a: "😎", e: "Coffee & Code", ago: "5 weeks ago", x: 12 },
    { n: "Devraj K.", a: "🧑‍💻", e: "Startup Pitch", ago: "3 weeks ago", x: 8 },
    { n: "Fitri N.", a: "🧕", e: "GBK Morning Run", ago: "2 weeks ago", x: 5 },
  ];

  const stamps = [
    { e: "👑", l: "OG Member", d: `#${n}`, c: C.go },
    { e: "☕", l: "Coffee&Code", d: "Feb 22", c: C.o },
    { e: "🏃", l: "GBK Run Club", d: "Feb 21", c: C.g },
    { e: "🔥", l: "FIRE Responder", d: "Feb 20", c: C.r },
    { e: "🍜", l: "Nasi Goreng Fest", d: "Feb 19", c: "#D4733A" },
    { e: "🎸", l: "Open Mic Night", d: "Feb 18", c: C.pu },
    { e: "📊", l: "Startup Pitch", d: "Feb 15", c: C.b },
    { e: "🎨", l: "Art Jam", d: "Feb 12", c: "#EC4899" },
    { e: "📸", l: "Photo Walk", d: "Feb 10", c: C.cy },
  ];

  return (
    <div style={{ height: "100%", overflow: "auto", background: C.bg }}>
      {/* Banner */}
      <div style={{ background: C.w, borderBottom: `1px solid ${C.bd}` }}>
        <div
          style={{
            height: 52,
            background: og
              ? `linear-gradient(135deg,${C.go},${C.o},${C.p})`
              : `linear-gradient(135deg,${C.o},${C.p})`,
            position: "relative",
          }}
        >
          <div
            onClick={() => go("home")}
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              width: 26,
              height: 26,
              borderRadius: 8,
              background: "rgba(255,255,255,.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: C.w,
              fontSize: 11,
            }}
          >
            ←
          </div>
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              padding: "3px 8px",
              borderRadius: 6,
              background: "rgba(255,255,255,.25)",
              fontSize: 7,
              fontWeight: 700,
              color: C.w,
              fontFamily: F,
            }}
          >
            {u?.isPrivate ? "🔒 Private" : "🌐 Public"}
          </div>
        </div>

        <div style={{ padding: "0 12px 10px", marginTop: -20 }}>
          {/* Avatar */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <Av
              l={u?.displayName?.[0] || "R"}
              sz={46}
              bd={og ? `3px solid ${C.go}` : `3px solid ${C.w}`}
              glow={og ? `0 3px 12px ${C.go}40` : ""}
            />
            {og && (
              <div
                style={{
                  position: "absolute",
                  bottom: -1,
                  right: -1,
                  width: 15,
                  height: 15,
                  borderRadius: 5,
                  background: `linear-gradient(135deg,${C.go},#FFD700)`,
                  border: `2px solid ${C.w}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 7,
                }}
              >
                👑
              </div>
            )}
          </div>

          {/* Name + badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              marginTop: 4,
            }}
          >
            <span
              style={{
                color: C.t,
                fontWeight: 800,
                fontSize: 14,
                fontFamily: F,
              }}
            >
              {u?.displayName || "You"}
            </span>
            {og && (
              <Bg
                ch="OG"
                co={C.w}
                bg={`linear-gradient(135deg,${C.go},#FFD700)`}
              />
            )}
            <Bg ch={`#${n}`} />
          </div>

          <div style={{ color: C.tL, fontSize: 9, fontFamily: F }}>
            @{u?.username || "user"}
          </div>

          {/* AI Persona */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 10px",
              borderRadius: 7,
              background: `${per.c}12`,
              border: `1px solid ${per.c}25`,
              marginTop: 4,
            }}
          >
            <span style={{ fontSize: 12 }}>{per.e}</span>
            <div>
              <div
                style={{
                  color: per.c,
                  fontWeight: 800,
                  fontSize: 9,
                  fontFamily: F,
                }}
              >
                {per.t}
              </div>
              <div style={{ color: C.tL, fontSize: 7, fontFamily: F }}>
                {per.d}
              </div>
            </div>
          </div>

          <div
            style={{
              color: C.tM,
              fontSize: 10,
              lineHeight: 1.4,
              fontFamily: F,
              marginTop: 3,
            }}
          >
            {u?.bio || "Hello world"}
          </div>

          {/* Socials */}
          {u?.socials && (
            <div
              style={{
                display: "flex",
                gap: 3,
                marginTop: 3,
                flexWrap: "wrap",
              }}
            >
              {Object.entries(u.socials)
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      padding: "2px 6px",
                      borderRadius: 5,
                      background: C.bg,
                      border: `1px solid ${C.bd}`,
                      fontSize: 7,
                      fontWeight: 700,
                      fontFamily: F,
                      color: C.tM,
                    }}
                  >
                    {k === "ig"
                      ? "📸"
                      : k === "tw"
                        ? "𝕏"
                        : k === "li"
                          ? "💼"
                          : "🎵"}{" "}
                    {v}
                  </div>
                ))}
            </div>
          )}

          {/* Stats */}
          <div style={{ display: "flex", gap: 10, marginTop: 5 }}>
            {[
              { l: "Followers", v: "142" },
              { l: "Following", v: "89" },
              { l: "Folds", v: "5" },
              { l: "Events", v: "23" },
            ].map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    color: C.t,
                    fontWeight: 800,
                    fontSize: 12,
                    fontFamily: F,
                  }}
                >
                  {s.v}
                </div>
                <div style={{ color: C.tL, fontSize: 6, fontFamily: F }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "8px 12px" }}>
        {/* Quick actions */}
        <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
          {quickActions.map((b, i) => (
            <Btn
              key={i}
              ch={b.l}
              sm
              onClick={() => go(b.s)}
              sty={{ flex: 1, fontSize: 7, padding: "5px 4px" }}
            />
          ))}
        </div>

        {/* Activity */}
        <Sec
          t="📊 Your Activity"
          ch={
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 4,
              }}
            >
              {activityMetrics.map((m, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px",
                    borderRadius: 10,
                    background: C.w,
                    border: `1px solid ${C.bd}`,
                  }}
                >
                  <div style={{ fontSize: 14, marginBottom: 2 }}>{m.e}</div>
                  <div
                    style={{
                      color: m.c,
                      fontWeight: 800,
                      fontSize: 10,
                      fontFamily: F,
                    }}
                  >
                    {m.t}
                  </div>
                  <div style={{ color: C.tL, fontSize: 7, fontFamily: F }}>
                    {m.s}
                  </div>
                </div>
              ))}
            </div>
          }
        />

        {/* Friend milestones */}
        <Sec
          t="🤝 Friend Milestones"
          ch={
            <div>
              {milestones.map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "7px 8px",
                    borderRadius: 10,
                    background: C.w,
                    border: `1px solid ${C.bd}`,
                    marginBottom: 3,
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
                    }}
                  >
                    {f.a}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        color: C.t,
                        fontWeight: 700,
                        fontSize: 10,
                        fontFamily: F,
                      }}
                    >
                      {f.n}
                    </div>
                    <div style={{ color: C.tL, fontSize: 7, fontFamily: F }}>
                      Met at {f.e} · {f.ago}
                    </div>
                  </div>
                  <div
                    style={{
                      color: C.o,
                      fontWeight: 800,
                      fontSize: 9,
                      fontFamily: F,
                    }}
                  >
                    {f.x}× seen
                  </div>
                </div>
              ))}
            </div>
          }
        />

        {/* Passport stamps */}
        <Sec
          t="📮 Passport Stamps"
          r={
            <span style={{ color: C.tL, fontSize: 7, fontFamily: F }}>
              From events attended
            </span>
          }
          ch={
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 5,
                paddingBottom: 8,
              }}
            >
              {stamps.map((s, i) => (
                <Stamp key={i} emoji={s.e} label={s.l} date={s.d} color={s.c} />
              ))}
            </div>
          }
        />
      </div>
    </div>
  );
}
