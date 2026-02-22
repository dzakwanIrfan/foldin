import type { CSSProperties, ReactNode } from "react";
import { C, F } from "../constants";

/* ── Logo ── */
interface LogoProps {
  sz?: number;
  lt?: boolean;
}

export function Logo({ sz = 24, lt }: LogoProps) {
  return (
    <span
      style={{
        fontFamily: F,
        fontWeight: 800,
        fontSize: sz,
        letterSpacing: "-.5px",
      }}
    >
      <span style={{ color: C.o }}>Fold</span>
      <span style={{ color: lt ? C.p : "#D4A574" }}>in</span>
    </span>
  );
}

/* ── Avatar ── */
interface AvProps {
  l?: string;
  sz?: number;
  bd?: string;
  glow?: string;
}

export function Av({ l = "?", sz = 32, bd, glow }: AvProps) {
  return (
    <div
      style={{
        width: sz,
        height: sz,
        borderRadius: sz * 0.35,
        background: "linear-gradient(145deg,#F4A460,#D4733A)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: sz * 0.38,
        fontWeight: 900,
        color: C.w,
        fontFamily: F,
        border: bd || "none",
        boxShadow: glow || "none",
        flexShrink: 0,
      }}
    >
      {l}
    </div>
  );
}

/* ── Button ── */
interface BtnProps {
  ch: ReactNode;
  pri?: boolean;
  sm?: boolean;
  onClick?: () => void;
  sty?: CSSProperties;
  dis?: boolean;
  co?: string;
  bg?: string;
}

export function Btn({ ch, pri, sm, onClick, sty = {}, dis, co, bg }: BtnProps) {
  return (
    <button
      onClick={onClick}
      disabled={dis}
      style={{
        padding: sm ? "5px 10px" : "10px 16px",
        background: dis ? C.bdL : bg || (pri ? C.o : C.bg),
        color: dis ? C.tLL : co || (pri ? C.w : C.tM),
        border: pri || bg ? "none" : `1px solid ${C.bd}`,
        borderRadius: sm ? 8 : 12,
        fontSize: sm ? 10 : 13,
        fontWeight: 700,
        cursor: dis ? "default" : "pointer",
        fontFamily: F,
        ...sty,
      }}
    >
      {ch}
    </button>
  );
}

/* ── Back button ── */
interface BkProps {
  onClick: () => void;
}

export function Bk({ onClick }: BkProps) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 30,
        height: 30,
        borderRadius: 10,
        background: C.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: C.tM,
        fontSize: 14,
        border: `1px solid ${C.bd}`,
        flexShrink: 0,
      }}
    >
      ←
    </div>
  );
}

/* ── Badge ── */
interface BgProps {
  ch: string;
  co?: string;
  bg?: string;
}

export function Bg({ ch, co = C.o, bg = C.pLL }: BgProps) {
  return (
    <span
      style={{
        background: bg,
        color: co,
        fontSize: 7,
        fontWeight: 800,
        padding: "2px 6px",
        borderRadius: 4,
        fontFamily: F,
        whiteSpace: "nowrap",
      }}
    >
      {ch}
    </span>
  );
}

/* ── Nav item ── */
interface NvProps {
  icon: string;
  label: string;
  active?: boolean;
  onClick: () => void;
  badge?: number;
}

export function Nv({ icon, label, active, onClick, badge }: NvProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        cursor: "pointer",
        position: "relative",
        minWidth: 44,
      }}
    >
      {badge != null && badge > 0 && (
        <div
          style={{
            position: "absolute",
            top: -5,
            right: 0,
            minWidth: 14,
            height: 14,
            borderRadius: 7,
            background: C.r,
            color: C.w,
            fontSize: 7,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 3px",
          }}
        >
          {badge}
        </div>
      )}
      <div style={{ fontSize: 17, opacity: active ? 1 : 0.4 }}>{icon}</div>
      <div
        style={{
          fontSize: 7,
          fontWeight: active ? 800 : 600,
          color: active ? C.o : C.tL,
          fontFamily: F,
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ── Header ── */
interface HdrProps {
  title: string;
  onBack: () => void;
  right?: ReactNode;
}

export function Hdr({ title, onBack, right }: HdrProps) {
  return (
    <div
      style={{
        padding: "10px 12px",
        background: C.w,
        borderBottom: `1px solid ${C.bd}`,
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexShrink: 0,
      }}
    >
      <Bk onClick={onBack} />
      <span
        style={{
          color: C.t,
          fontWeight: 800,
          fontSize: 14,
          fontFamily: F,
          flex: 1,
        }}
      >
        {title}
      </span>
      {right}
    </div>
  );
}

/* ── Section ── */
interface SecProps {
  t: string;
  ch: ReactNode;
  r?: ReactNode;
}

export function Sec({ t, ch, r }: SecProps) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <span
          style={{ color: C.t, fontWeight: 800, fontSize: 12, fontFamily: F }}
        >
          {t}
        </span>
        {r}
      </div>
      {ch}
    </div>
  );
}

/* ── Attach (photo CTA) ── */
export function Attach() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        padding: "5px 9px",
        borderRadius: 7,
        background: C.bg,
        border: `1px dashed ${C.bd}`,
        cursor: "pointer",
      }}
    >
      <span style={{ fontSize: 11 }}>📎</span>
      <span
        style={{ color: C.tL, fontSize: 8, fontWeight: 600, fontFamily: F }}
      >
        Photo
      </span>
    </div>
  );
}

/* ── Photo thumbnail ── */
interface PhotoThumbProps {
  label?: string;
}

export function PhotoThumb({ label }: PhotoThumbProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        padding: "3px 7px",
        borderRadius: 5,
        background: C.bBg,
        border: `1px solid ${C.b}20`,
      }}
    >
      <span style={{ fontSize: 8 }}>🖼️</span>
      <span style={{ color: C.b, fontSize: 7, fontWeight: 700, fontFamily: F }}>
        {label || "photo.jpg"}
      </span>
    </div>
  );
}

/* ── Toggle ── */
interface ToggleProps {
  on: boolean;
  onTap: () => void;
  label: string;
  sub?: string;
}

export function Toggle({ on, onTap, label, sub }: ToggleProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "9px",
        borderRadius: 10,
        background: C.w,
        border: `1px solid ${C.bd}`,
      }}
    >
      <div
        onClick={onTap}
        style={{
          width: 36,
          height: 19,
          borderRadius: 10,
          background: on ? C.o : C.bdL,
          cursor: "pointer",
          position: "relative",
          transition: "background .2s",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 15,
            height: 15,
            borderRadius: 8,
            background: C.w,
            position: "absolute",
            top: 2,
            left: on ? 19 : 2,
            transition: "left .2s",
            boxShadow: "0 1px 3px rgba(0,0,0,.12)",
          }}
        />
      </div>
      <div>
        <div
          style={{ color: C.t, fontSize: 10, fontWeight: 700, fontFamily: F }}
        >
          {label}
        </div>
        {sub && (
          <div style={{ color: C.tL, fontSize: 7, fontFamily: F }}>{sub}</div>
        )}
      </div>
    </div>
  );
}

/* ── Passport Stamp ── */
interface StampProps {
  emoji: string;
  label: string;
  date: string;
  color?: string;
  big?: boolean;
}

export function Stamp({ emoji, label, date, color, big }: StampProps) {
  const c = color || C.o;

  return (
    <div
      className="stamp"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: big ? "14px 8px" : "8px 4px",
        borderRadius: big ? 14 : 10,
        background: C.w,
        border: `2px dashed ${c}50`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: big ? 4 : 3,
          background: `${c}30`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: big ? 4 : 3,
          background: `${c}30`,
        }}
      />
      <div style={{ fontSize: big ? 28 : 16, marginBottom: big ? 4 : 1 }}>
        {emoji}
      </div>
      <div
        style={{
          color: c,
          fontWeight: 900,
          fontSize: big ? 11 : 7,
          fontFamily: F,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: C.tL,
          fontSize: big ? 8 : 5,
          fontWeight: 700,
          fontFamily: F,
          marginTop: 1,
        }}
      >
        {date}
      </div>
      <div
        style={{
          position: "absolute",
          top: big ? 4 : 2,
          right: big ? 6 : 3,
          width: big ? 18 : 10,
          height: big ? 18 : 10,
          borderRadius: "50%",
          border: `1.5px solid ${c}35`,
          opacity: 0.5,
        }}
      />
    </div>
  );
}
