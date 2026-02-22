import { useEffect, useRef, type ReactNode } from "react";
import { C } from "../constants";

/* ── MapView — canvas-based stylised street map ── */
interface MapViewProps {
  zoom: number;
  children?: ReactNode;
}

export function MapView({ zoom, children }: MapViewProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const w = (cv.width = cv.offsetWidth * 2);
    const h = (cv.height = cv.offsetHeight * 2);
    ctx.scale(2, 2);

    const W = w / 2;
    const H = h / 2;
    const s = zoom / 5;

    ctx.save();
    ctx.translate((W * (1 - s)) / 2, (H * (1 - s)) / 2);
    ctx.scale(s, s);

    // background
    ctx.fillStyle = "#F7F2ED";
    ctx.fillRect(0, 0, W, H);

    // major roads
    ctx.strokeStyle = "#E8E0D8";
    ctx.lineWidth = 4 / s;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(0, H * 0.42);
    ctx.bezierCurveTo(W * 0.3, H * 0.4, W * 0.7, H * 0.44, W, H * 0.41);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(W * 0.48, 0);
    ctx.bezierCurveTo(W * 0.5, H * 0.35, W * 0.47, H * 0.65, W * 0.51, H);
    ctx.stroke();

    // minor roads
    ctx.strokeStyle = "#EDE6DE";
    ctx.lineWidth = 2 / s;

    const roads: [number, number][][] = [
      [
        [0.2, 0],
        [0.22, 0.5],
        [0.18, 1],
      ],
      [
        [0.75, 0],
        [0.73, 0.4],
        [0.78, 0.9],
      ],
      [
        [0, 0.22],
        [0.45, 0.24],
        [0.95, 0.2],
      ],
      [
        [0, 0.65],
        [0.5, 0.63],
        [1, 0.67],
      ],
      [
        [0.35, 0.1],
        [0.4, 0.5],
        [0.38, 0.9],
      ],
    ];

    roads.forEach((p) => {
      ctx.beginPath();
      ctx.moveTo(p[0][0] * W, p[0][1] * H);
      ctx.quadraticCurveTo(p[1][0] * W, p[1][1] * H, p[2][0] * W, p[2][1] * H);
      ctx.stroke();
    });

    // buildings
    ctx.fillStyle = "#F0EAE2";
    const buildings: [number, number, number, number][] = [
      [0.08, 0.3, 0.1, 0.08],
      [0.25, 0.28, 0.08, 0.06],
      [0.55, 0.3, 0.12, 0.07],
      [0.55, 0.5, 0.1, 0.06],
      [0.7, 0.45, 0.08, 0.08],
      [0.82, 0.28, 0.1, 0.1],
      [0.15, 0.55, 0.06, 0.05],
      [0.65, 0.6, 0.08, 0.06],
      [0.4, 0.18, 0.1, 0.05],
      [0.38, 0.65, 0.08, 0.04],
    ];
    buildings.forEach(([bx, by, bw, bh]) =>
      ctx.fillRect(bx * W, by * H, bw * W, bh * H),
    );

    // labels
    ctx.fillStyle = "#C8BDB2";
    const fs = Math.max(5, 6 / s);
    ctx.font = `600 ${fs}px sans-serif`;
    ctx.fillText("Jl. Sudirman", W * 0.42, H * 0.39);
    ctx.fillText("Jl. Thamrin", W * 0.22, H * 0.56);
    ctx.fillText("SCBD", W * 0.55, H * 0.33);

    ctx.restore();
  }, [zoom]);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <canvas
        ref={ref}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
      {children}
    </div>
  );
}

/* ── Map Pin ── */
interface PinProps {
  x: number;
  y: number;
  emoji: string;
  label?: string;
  alert?: boolean;
  onClick?: () => void;
  rank?: number;
  upcoming?: boolean;
  live?: boolean;
}

export function Pin({
  x,
  y,
  emoji,
  label,
  alert,
  onClick,
  rank,
  upcoming,
  live,
}: PinProps) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%,-100%)",
        zIndex: 10,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 35,
            height: 35,
            borderRadius: 10,
            background: upcoming ? C.puBg : alert ? C.rBg : C.w,
            border: upcoming
              ? `2px solid ${C.pu}`
              : alert
                ? `2px solid ${C.r}`
                : `1.5px solid ${C.bd}`,
            boxShadow: "0 2px 8px rgba(0,0,0,.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            position: "relative",
          }}
        >
          {emoji}
          {live && (
            <div
              style={{
                position: "absolute",
                top: -3,
                right: -3,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: C.g,
                border: `2px solid ${C.w}`,
                animation: "pu 2s infinite",
              }}
            />
          )}
          {rank && (
            <div
              style={{
                position: "absolute",
                top: -4,
                left: -4,
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: rank === 1 ? C.go : rank === 2 ? C.si : C.br,
                border: `1.5px solid ${C.w}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 6,
                fontWeight: 900,
                color: C.w,
              }}
            >
              {rank}
            </div>
          )}
        </div>
        {label && (
          <div
            style={{
              marginTop: 1,
              padding: "1px 5px",
              borderRadius: 5,
              background: upcoming ? C.pu : alert ? C.r : C.w,
              border: alert || upcoming ? "none" : `1px solid ${C.bdL}`,
            }}
          >
            <span
              style={{
                fontSize: 6,
                fontWeight: 700,
                fontFamily: "'Nunito', system-ui, sans-serif",
                color: alert || upcoming ? C.w : C.t,
              }}
            >
              {label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
