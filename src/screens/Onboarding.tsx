import { useState, useEffect } from "react";
import { C, F, ALL_CATEGORIES } from "../constants";
import { VLD, genCh, getUN, isOG, getPersona } from "../utils/engine";
import { Logo, Av, Toggle } from "../components";
import type { UserData } from "../types";

interface OnboardingProps {
  onDone: (user: UserData) => void;
}

export function Onboarding({ onDone }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [code, setCode] = useState("");
  const [err, setErr] = useState(false);
  const [un, setU] = useState("");
  const [dn, setDN] = useState("");
  const [bio, setBio] = useState("");
  const [ig, setIG] = useState("");
  const [tw, setTW] = useState("");
  const [li, setLI] = useState("");
  const [tt, setTT] = useState("");
  const [ints, setInts] = useState<string[]>([]);
  const [priv, setPriv] = useState(false);
  const [vc, setVC] = useState("");
  const [mc, setMC] = useState<string[]>([]);
  const [cp, setCP] = useState(-1);

  useEffect(() => {
    if (step === 4) {
      onDone({
        code: vc,
        username: un,
        displayName: dn,
        bio,
        socials: { ig, tw, li, tt },
        interests: ints,
        isPrivate: priv,
        userNum: getUN(vc),
        og: isOG(getUN(vc)),
        codes: mc,
        persona: getPersona(getUN(vc)),
      });
    }
  }, [step]);

  const verify = () => {
    const c = code.toUpperCase().trim();
    if (VLD.has(c)) {
      setVC(c);
      setMC(genCh(c));
      setStep(2);
    } else {
      setErr(true);
      setTimeout(() => setErr(false), 2000);
    }
  };

  const tog = (id: string) =>
    setInts((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  /* ── Step 0: Welcome ── */
  if (step === 0) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: C.dk,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          textAlign: "center",
        }}
      >
        <div className="fi">
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: `linear-gradient(135deg,${C.o},${C.p})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              animation: "gl 3s ease infinite",
            }}
          >
            <Logo sz={24} lt />
          </div>
          <h1
            style={{
              fontFamily: F,
              fontWeight: 900,
              fontSize: 24,
              color: C.w,
              marginBottom: 6,
            }}
          >
            Welcome to Foldin
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,.5)",
              fontSize: 12,
              lineHeight: 1.6,
              fontFamily: F,
              maxWidth: 270,
              margin: "0 auto 20px",
            }}
          >
            Join communities. Attend events. Meet people IRL.
          </p>
          <button
            onClick={() => setStep(1)}
            style={{
              width: "100%",
              maxWidth: 270,
              padding: 12,
              background: C.o,
              color: C.w,
              border: "none",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: F,
            }}
          >
            I have an invite code
          </button>
          <p
            style={{
              color: "rgba(255,255,255,.22)",
              fontSize: 9,
              fontFamily: F,
              marginTop: 8,
            }}
          >
            Invite-only · 5 codes per person
          </p>
        </div>
      </div>
    );
  }

  /* ── Step 1: Enter code ── */
  if (step === 1) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: C.dk,
          display: "flex",
          flexDirection: "column",
          padding: 24,
        }}
      >
        <div
          onClick={() => setStep(0)}
          style={{
            color: C.p,
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: F,
            marginBottom: 32,
          }}
        >
          ← Back
        </div>
        <div
          className="fi"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: 320,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 10 }}>🔑</div>
          <h2
            style={{
              fontFamily: F,
              fontWeight: 900,
              fontSize: 20,
              color: C.w,
              marginBottom: 16,
            }}
          >
            Enter invite code
          </h2>
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setErr(false);
            }}
            placeholder="FOLDIN-XXXX-XXXX"
            style={{
              width: "100%",
              padding: 14,
              background: "rgba(255,255,255,.06)",
              border: err
                ? "2px solid #E8534A"
                : "2px solid rgba(255,255,255,.08)",
              borderRadius: 12,
              color: C.w,
              fontSize: 15,
              fontFamily: "monospace",
              letterSpacing: "2px",
              outline: "none",
              textAlign: "center",
              marginBottom: 10,
            }}
          />
          <button
            onClick={verify}
            disabled={!code}
            style={{
              width: "100%",
              padding: 12,
              background: code ? C.o : C.dkL,
              color: code ? C.w : "rgba(255,255,255,.2)",
              border: "none",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 800,
              cursor: code ? "pointer" : "default",
              fontFamily: F,
            }}
          >
            Verify →
          </button>
          {err && (
            <div
              style={{
                color: C.r,
                fontSize: 10,
                fontFamily: F,
                marginTop: 6,
                textAlign: "center",
              }}
            >
              Invalid code
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── Step 2: Profile setup ── */
  if (step === 2) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: C.dk,
          overflow: "auto",
          padding: 24,
        }}
      >
        <div className="fi" style={{ maxWidth: 320, margin: "0 auto" }}>
          {/* Progress bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background: `${C.o}30`,
              }}
            >
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  borderRadius: 2,
                  background: C.o,
                }}
              />
            </div>
            <span style={{ color: C.tLL, fontSize: 9, fontFamily: F }}>
              1/2
            </span>
          </div>

          <h2
            style={{
              fontFamily: F,
              fontWeight: 900,
              fontSize: 18,
              color: C.w,
              marginBottom: 12,
            }}
          >
            Set up your profile
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <Av
              l={dn ? dn[0].toUpperCase() : "?"}
              sz={48}
              bd={`3px solid ${C.go}`}
            />
          </div>

          {/* Text fields */}
          {(
            [
              ["Username", un, setU, "@handle"],
              ["Display Name", dn, setDN, "Your Name"],
              ["Bio", bio, setBio, "Tell us about yourself"],
            ] as [string, string, (v: string) => void, string][]
          ).map(([lb, v, s, ph], i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div
                style={{
                  color: "rgba(255,255,255,.45)",
                  fontSize: 9,
                  fontWeight: 700,
                  fontFamily: F,
                  marginBottom: 3,
                }}
              >
                {lb}
              </div>
              <input
                value={v}
                onChange={(e) => s(e.target.value)}
                placeholder={ph}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: "rgba(255,255,255,.06)",
                  border: "1.5px solid rgba(255,255,255,.08)",
                  borderRadius: 10,
                  color: C.w,
                  fontSize: 13,
                  fontFamily: F,
                  outline: "none",
                }}
              />
            </div>
          ))}

          {/* Socials */}
          <div
            style={{
              color: "rgba(255,255,255,.45)",
              fontSize: 9,
              fontWeight: 700,
              fontFamily: F,
              marginBottom: 4,
            }}
          >
            Socials
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 5,
              marginBottom: 10,
            }}
          >
            {(
              [
                ["📸 IG", ig, setIG],
                ["𝕏 Twitter", tw, setTW],
                ["💼 LinkedIn", li, setLI],
                ["🎵 TikTok", tt, setTT],
              ] as [string, string, (v: string) => void][]
            ).map(([ph, v, s], i) => (
              <input
                key={i}
                value={v}
                onChange={(e) => s(e.target.value)}
                placeholder={ph}
                style={{
                  padding: "8px",
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.06)",
                  borderRadius: 8,
                  color: C.w,
                  fontSize: 10,
                  fontFamily: F,
                  outline: "none",
                }}
              />
            ))}
          </div>

          {/* Interests */}
          <div
            style={{
              color: "rgba(255,255,255,.45)",
              fontSize: 9,
              fontWeight: 700,
              fontFamily: F,
              marginBottom: 4,
            }}
          >
            Interests
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              marginBottom: 10,
            }}
          >
            {ALL_CATEGORIES.map((c) => (
              <div
                key={c.id}
                onClick={() => tog(c.id)}
                style={{
                  padding: "4px 8px",
                  borderRadius: 6,
                  cursor: "pointer",
                  background: ints.includes(c.id)
                    ? `${C.o}20`
                    : "rgba(255,255,255,.04)",
                  border: ints.includes(c.id)
                    ? `1px solid ${C.o}40`
                    : "1px solid rgba(255,255,255,.06)",
                  color: ints.includes(c.id) ? C.p : "rgba(255,255,255,.35)",
                  fontSize: 9,
                  fontWeight: 600,
                  fontFamily: F,
                }}
              >
                {c.e} {c.l}
              </div>
            ))}
          </div>

          <Toggle
            on={priv}
            onTap={() => setPriv(!priv)}
            label={priv ? "🔒 Private" : "🌐 Public"}
            sub={
              priv ? "Followers need approval" : "Anyone can see your activity"
            }
          />

          <button
            onClick={() => setStep(3)}
            disabled={!un || !dn}
            style={{
              width: "100%",
              padding: 12,
              background: un && dn ? C.o : C.dkL,
              color: un && dn ? C.w : "rgba(255,255,255,.2)",
              border: "none",
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 800,
              cursor: un && dn ? "pointer" : "default",
              fontFamily: F,
              marginTop: 10,
            }}
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  /* ── Step 3: Welcome + invite codes ── */
  if (step === 3) {
    const per = getPersona(getUN(vc));

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: C.dk,
          overflow: "auto",
          padding: 24,
        }}
      >
        <div
          className="fi"
          style={{ maxWidth: 320, margin: "0 auto", textAlign: "center" }}
        >
          {/* Progress complete */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background: `${C.o}30`,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 2,
                  background: C.o,
                }}
              />
            </div>
            <span style={{ color: C.tLL, fontSize: 9, fontFamily: F }}>
              2/2
            </span>
          </div>

          <div style={{ fontSize: 32, marginBottom: 4 }}>🎉</div>
          <h2
            style={{
              fontFamily: F,
              fontWeight: 900,
              fontSize: 18,
              color: C.w,
              marginBottom: 2,
            }}
          >
            Welcome, {dn}!
          </h2>
          <p
            style={{
              color: C.p,
              fontSize: 11,
              fontFamily: F,
              fontWeight: 600,
              marginBottom: 2,
            }}
          >
            User #{getUN(vc)}
            {isOG(getUN(vc)) ? " · 👑 OG" : ""}
          </p>

          {/* AI Persona reveal */}
          <div
            style={{
              margin: "8px auto 12px",
              padding: "10px 16px",
              borderRadius: 12,
              background: `${per.c}15`,
              border: `1.5px solid ${per.c}30`,
              maxWidth: 240,
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 2 }}>{per.e}</div>
            <div
              style={{
                color: per.c,
                fontWeight: 900,
                fontSize: 13,
                fontFamily: F,
              }}
            >
              {per.t}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,.5)",
                fontSize: 9,
                fontFamily: F,
              }}
            >
              {per.d}
            </div>
          </div>

          {/* Invite codes */}
          <p
            style={{
              color: "rgba(255,255,255,.35)",
              fontSize: 10,
              fontFamily: F,
              marginBottom: 10,
            }}
          >
            Your 5 invite codes:
          </p>
          {mc.map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "7px 9px",
                background: "rgba(255,255,255,.04)",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,.06)",
                marginBottom: 3,
              }}
            >
              <div
                style={{
                  flex: 1,
                  color: C.p,
                  fontSize: 9,
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
                  padding: "3px 9px",
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

          <button
            onClick={() => setStep(4)}
            style={{
              width: "100%",
              padding: 12,
              background: C.o,
              color: C.w,
              border: "none",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: F,
              marginTop: 10,
            }}
          >
            Enter Foldin →
          </button>
        </div>
      </div>
    );
  }

  /* ── Step 4: Loading ── */
  if (step === 4) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: C.dk,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            animation: "gl 1s ease infinite",
            width: 52,
            height: 52,
            borderRadius: 16,
            background: `linear-gradient(135deg,${C.o},${C.p})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo sz={18} lt />
        </div>
      </div>
    );
  }

  return null;
}
