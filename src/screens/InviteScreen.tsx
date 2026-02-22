import { useState } from "react";
import { C, F } from "../constants";
import { Hdr } from "../components";
import type { NavigableWithUserProps } from "../types";

export function InviteScreen({ go, u }: NavigableWithUserProps) {
  const codes = u?.codes || [];
  const [cp, setCP] = useState(-1);

  return (
    <div style={{ height: "100%", overflow: "auto", background: C.bg }}>
      <Hdr title="🎟️ Invite" onBack={() => go("profile")} />

      <div style={{ padding: 12, textAlign: "center" }}>
        <div
          style={{ color: C.t, fontWeight: 900, fontSize: 24, fontFamily: F }}
        >
          5
        </div>
        <div
          style={{ color: C.tL, fontSize: 10, fontFamily: F, marginBottom: 8 }}
        >
          invites remaining
        </div>

        {codes.map((c, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 8px",
              background: C.pLL,
              borderRadius: 7,
              border: `1px solid ${C.o}15`,
              marginBottom: 3,
            }}
          >
            <div
              style={{
                flex: 1,
                color: C.o,
                fontSize: 8,
                fontWeight: 700,
                fontFamily: "monospace",
                letterSpacing: "1px",
                textAlign: "left",
              }}
            >
              {c}
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(c);
                setCP(i);
                setTimeout(() => setCP(-1), 1500);
              }}
              style={{
                background: cp === i ? C.g : C.o,
                color: C.w,
                border: "none",
                borderRadius: 5,
                padding: "3px 8px",
                fontSize: 8,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: F,
              }}
            >
              {cp === i ? "✓" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
