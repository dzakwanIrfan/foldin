import { useState } from "react";
import { C, F, PERSONAS } from "../constants";
import { Av, Btn, Stamp, Sec } from "../components";
import type { NavigableProps } from "../types";

export function UserProfileScreen({ go }: NavigableProps) {
  const [followed, setFl] = useState(false);
  const per = PERSONAS[3];

  return (
    <div style={{ height: "100%", overflow: "auto", background: C.bg }}>
      <div style={{ background: C.w, borderBottom: `1px solid ${C.bd}` }}>
        <div
          style={{
            height: 48,
            background: `linear-gradient(135deg,${per.c},${C.p})`,
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
        </div>

        <div style={{ padding: "0 12px 10px", marginTop: -18 }}>
          <Av l="D" sz={44} bd={`3px solid ${C.w}`} />
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
              Dian Kusuma
            </span>
          </div>
          <div style={{ color: C.tL, fontSize: 9, fontFamily: F }}>
            @dian_k · UX Designer 🎨
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

          {/* Stats */}
          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            {[
              { l: "Followers", v: "324" },
              { l: "Following", v: "156" },
              { l: "Folds", v: "8" },
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
                <div style={{ color: C.tL, fontSize: 7, fontFamily: F }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
            <button
              onClick={() => setFl(!followed)}
              style={{
                flex: 1,
                padding: 7,
                background: followed ? C.bg : C.o,
                color: followed ? C.tM : C.w,
                border: followed ? `1px solid ${C.bd}` : "none",
                borderRadius: 9,
                fontSize: 10,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: F,
              }}
            >
              {followed ? "✓ Following" : "Follow"}
            </button>
            <Btn
              ch={followed ? "Unfollow" : "🤝 Request"}
              sm
              sty={{ flex: 1 }}
              co={followed ? C.r : C.tM}
            />
            <Btn ch="💬" sm onClick={() => go("dm")} />
          </div>
        </div>
      </div>

      <div style={{ padding: "8px 12px" }}>
        {/* First met */}
        <div
          style={{
            padding: "8px 10px",
            borderRadius: 10,
            background: C.goBg,
            border: `1px solid ${C.go}20`,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              color: C.go,
              fontWeight: 800,
              fontSize: 10,
              fontFamily: F,
            }}
          >
            📍 You first met Dian at Coffee & Code
          </div>
          <div style={{ color: C.tM, fontSize: 9, fontFamily: F }}>
            January 15, 2026 · 5 weeks ago · 🔀 7 encounters since
          </div>
        </div>

        {/* Stamps */}
        <Sec
          t="📮 Stamps"
          ch={
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 4,
              }}
            >
              {[
                { e: "🎨", l: "Art Jam", d: "Feb 20", c: "#EC4899" },
                { e: "☕", l: "Coffee&Code", d: "Feb 15", c: C.o },
                { e: "📸", l: "Photo Walk", d: "Feb 10", c: C.b },
              ].map((s, i) => (
                <Stamp key={i} emoji={s.e} label={s.l} date={s.d} color={s.c} />
              ))}
            </div>
          }
        />
      </div>
    </div>
  );
}
