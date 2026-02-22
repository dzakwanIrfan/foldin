import { useState } from "react";
import { C, F, ALL_CATEGORIES } from "../constants";
import { Hdr, Toggle, Attach } from "../components";
import type { NavigableProps } from "../types";

export function CreateScreen({ go }: NavigableProps) {
  const [mode, setMode] = useState("fold");

  // Fold fields
  const [fn, setFN] = useState("");
  const [fDesc, setFD] = useState("");
  const [fCats, setFC] = useState<string[]>([]);
  const [fPriv, setFP] = useState(false);

  // Event fields
  const [en, setEN] = useState("");
  const [eVenue, setEV] = useState("");
  const [eHost, setEH] = useState("fold");
  const [eFree, setEF] = useState(true);
  const [ePrice, setEP] = useState("");

  // Post field
  const [pt, setPT] = useState("");

  const modes = [
    { id: "fold", l: "👥 Fold" },
    { id: "event", l: "📅 Event" },
    { id: "post", l: "📝 Post" },
  ];

  const hostTypes = [
    { id: "fold", l: "👥 Fold" },
    { id: "brand", l: "🏪 Brand" },
    { id: "user", l: "👤 You" },
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
      <Hdr title="Create" onBack={() => go("home")} />

      {/* Mode tabs */}
      <div
        style={{
          display: "flex",
          gap: 3,
          padding: "6px 12px",
          background: C.w,
          borderBottom: `1px solid ${C.bd}`,
        }}
      >
        {modes.map((m) => (
          <div
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              flex: 1,
              padding: 6,
              textAlign: "center",
              borderRadius: 8,
              cursor: "pointer",
              background: mode === m.id ? C.o : "transparent",
              color: mode === m.id ? C.w : C.tM,
              fontWeight: 700,
              fontSize: 10,
              fontFamily: F,
            }}
          >
            {m.l}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "10px 12px" }}>
        {/* ── Create Fold ── */}
        {mode === "fold" && (
          <div className="fi">
            <div
              style={{
                padding: "7px 9px",
                borderRadius: 9,
                background: C.puBg,
                border: `1px solid ${C.pu}15`,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  color: C.pu,
                  fontSize: 8,
                  fontWeight: 700,
                  fontFamily: F,
                }}
              >
                👥 Folds are permanent communities. Open forever unless you
                delete.
              </div>
            </div>

            <div style={{ marginBottom: 8 }}>
              <div
                style={{
                  color: C.t,
                  fontWeight: 700,
                  fontSize: 10,
                  fontFamily: F,
                  marginBottom: 3,
                }}
              >
                Fold Name
              </div>
              <input
                value={fn}
                onChange={(e) => setFN(e.target.value)}
                placeholder="e.g. Dev Community JKT"
                style={{
                  width: "100%",
                  padding: 10,
                  background: C.w,
                  border: `1.5px solid ${fn ? C.o : C.bd}`,
                  borderRadius: 10,
                  color: C.t,
                  fontSize: 12,
                  fontFamily: F,
                  outline: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <div
                style={{
                  color: C.t,
                  fontWeight: 700,
                  fontSize: 10,
                  fontFamily: F,
                  marginBottom: 3,
                }}
              >
                Description
              </div>
              <textarea
                value={fDesc}
                onChange={(e) => setFD(e.target.value)}
                placeholder="What's this community about?"
                rows={2}
                style={{
                  width: "100%",
                  padding: 10,
                  background: C.w,
                  border: `1.5px solid ${C.bd}`,
                  borderRadius: 10,
                  color: C.t,
                  fontSize: 11,
                  fontFamily: F,
                  outline: "none",
                  resize: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <div
                style={{
                  color: C.t,
                  fontWeight: 700,
                  fontSize: 10,
                  fontFamily: F,
                  marginBottom: 3,
                }}
              >
                Interests
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {ALL_CATEGORIES.map((c) => (
                  <div
                    key={c.id}
                    onClick={() =>
                      setFC((p) =>
                        p.includes(c.id)
                          ? p.filter((x) => x !== c.id)
                          : [...p, c.id],
                      )
                    }
                    style={{
                      padding: "4px 7px",
                      borderRadius: 6,
                      cursor: "pointer",
                      background: fCats.includes(c.id) ? C.pLL : C.w,
                      border: `1px solid ${fCats.includes(c.id) ? C.o + "40" : C.bd}`,
                      fontSize: 8,
                      fontFamily: F,
                      color: fCats.includes(c.id) ? C.o : C.tM,
                    }}
                  >
                    {c.e} {c.l}
                  </div>
                ))}
              </div>
            </div>

            <Toggle
              on={fPriv}
              onTap={() => setFP(!fPriv)}
              label={fPriv ? "🔒 Private" : "🌐 Public"}
              sub={fPriv ? "Members need approval" : "Anyone can join"}
            />

            <button
              onClick={() => go("fold")}
              disabled={!fn}
              style={{
                width: "100%",
                padding: 11,
                background: fn ? C.o : C.bdL,
                color: fn ? C.w : C.tLL,
                border: "none",
                borderRadius: 11,
                fontSize: 12,
                fontWeight: 800,
                cursor: fn ? "pointer" : "default",
                fontFamily: F,
                marginTop: 8,
              }}
            >
              Create Fold
            </button>
          </div>
        )}

        {/* ── Create Event ── */}
        {mode === "event" && (
          <div className="fi">
            {(
              [
                ["Event Name", en, setEN, "e.g. Coffee & Code"],
                ["📍 Venue", eVenue, setEV, "Restaurant or location"],
              ] as [string, string, (v: string) => void, string][]
            ).map(([lb, v, s, ph], i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div
                  style={{
                    color: C.t,
                    fontWeight: 700,
                    fontSize: 10,
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
                    padding: 10,
                    background: C.w,
                    border: `1.5px solid ${v ? C.o : C.bd}`,
                    borderRadius: 10,
                    color: C.t,
                    fontSize: 12,
                    fontFamily: F,
                    outline: "none",
                  }}
                />
              </div>
            ))}

            {/* Host type */}
            <div style={{ marginBottom: 8 }}>
              <div
                style={{
                  color: C.t,
                  fontWeight: 700,
                  fontSize: 10,
                  fontFamily: F,
                  marginBottom: 3,
                }}
              >
                Host Type
              </div>
              <div style={{ display: "flex", gap: 3 }}>
                {hostTypes.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => setEH(h.id)}
                    style={{
                      flex: 1,
                      padding: 6,
                      textAlign: "center",
                      borderRadius: 8,
                      cursor: "pointer",
                      background: eHost === h.id ? C.pu : C.w,
                      color: eHost === h.id ? C.w : C.tM,
                      border: eHost === h.id ? "none" : `1px solid ${C.bd}`,
                      fontSize: 9,
                      fontWeight: 700,
                      fontFamily: F,
                    }}
                  >
                    {h.l}
                  </div>
                ))}
              </div>
            </div>

            {/* Date/time */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 4,
                marginBottom: 8,
              }}
            >
              {["Date", "Start", "End"].map((ph, i) => (
                <input
                  key={i}
                  placeholder={ph}
                  type={i === 0 ? "date" : "time"}
                  style={{
                    padding: 8,
                    background: C.w,
                    border: `1px solid ${C.bd}`,
                    borderRadius: 8,
                    fontSize: 10,
                    fontFamily: F,
                    outline: "none",
                    color: C.t,
                  }}
                />
              ))}
            </div>

            {/* Map placeholder */}
            <div
              style={{
                height: 55,
                borderRadius: 9,
                background: "#EDE6DE",
                border: `1px solid ${C.bd}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 8,
              }}
            >
              <span style={{ color: C.tL, fontSize: 8, fontFamily: F }}>
                📍 Set location on map
              </span>
            </div>

            {/* Pricing */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", gap: 4 }}>
                <div
                  onClick={() => setEF(true)}
                  style={{
                    flex: 1,
                    padding: 7,
                    textAlign: "center",
                    borderRadius: 9,
                    cursor: "pointer",
                    background: eFree ? C.gBg : C.w,
                    color: eFree ? C.g : C.tM,
                    border: `1.5px solid ${eFree ? C.g : C.bd}`,
                    fontWeight: 700,
                    fontSize: 10,
                    fontFamily: F,
                  }}
                >
                  🆓 Free
                </div>
                <div
                  onClick={() => setEF(false)}
                  style={{
                    flex: 1,
                    padding: 7,
                    textAlign: "center",
                    borderRadius: 9,
                    cursor: "pointer",
                    background: !eFree ? C.goBg : C.w,
                    color: !eFree ? C.go : C.tM,
                    border: `1.5px solid ${!eFree ? C.go : C.bd}`,
                    fontWeight: 700,
                    fontSize: 10,
                    fontFamily: F,
                  }}
                >
                  💰 Paid
                </div>
              </div>
              {!eFree && (
                <input
                  value={ePrice}
                  onChange={(e) => setEP(e.target.value)}
                  placeholder="Price in IDR"
                  style={{
                    width: "100%",
                    padding: 9,
                    background: C.w,
                    border: `1.5px solid ${C.go}`,
                    borderRadius: 9,
                    color: C.t,
                    fontSize: 11,
                    fontFamily: F,
                    outline: "none",
                    marginTop: 4,
                  }}
                />
              )}
            </div>

            <button
              onClick={() => go("event")}
              disabled={!en}
              style={{
                width: "100%",
                padding: 11,
                background: en ? C.o : C.bdL,
                color: en ? C.w : C.tLL,
                border: "none",
                borderRadius: 11,
                fontSize: 12,
                fontWeight: 800,
                cursor: en ? "pointer" : "default",
                fontFamily: F,
              }}
            >
              Create Event
            </button>
          </div>
        )}

        {/* ── Create Post ── */}
        {mode === "post" && (
          <div className="fi">
            <textarea
              value={pt}
              onChange={(e) => setPT(e.target.value.slice(0, 200))}
              placeholder="What's happening nearby?"
              rows={3}
              style={{
                width: "100%",
                padding: 10,
                background: C.w,
                border: `1.5px solid ${pt ? C.o : C.bd}`,
                borderRadius: 10,
                color: C.t,
                fontSize: 12,
                fontFamily: F,
                outline: "none",
                resize: "none",
                marginBottom: 4,
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  color: pt.length > 180 ? C.r : C.tLL,
                  fontSize: 8,
                  fontFamily: F,
                }}
              >
                {pt.length}/200
              </span>
              <Attach />
            </div>
            <button
              onClick={() => go("posts")}
              disabled={!pt.trim()}
              style={{
                width: "100%",
                padding: 11,
                background: pt.trim() ? C.o : C.bdL,
                color: pt.trim() ? C.w : C.tLL,
                border: "none",
                borderRadius: 11,
                fontSize: 12,
                fontWeight: 800,
                cursor: pt.trim() ? "pointer" : "default",
                fontFamily: F,
              }}
            >
              Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
