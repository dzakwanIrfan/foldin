import { PERSONAS } from "../constants";

/* ── Seed codes & validation ── */

const SEEDS = [
  "FOLDIN-001-GENESIS",
  "FOLDIN-002-ALPHA",
  "FOLDIN-003-ALPHA",
  "FOLDIN-004-ALPHA",
  "FOLDIN-005-ALPHA",
  "FOLDIN-006-ALPHA",
  "DEMO",
];

/** Generate 5 child invite codes from a parent code */
export function genCh(parent: string): string[] {
  const cl = parent.replace(/[^A-Z0-9]/g, "");

  const hash = (s: string, i: number): string => {
    let v = i * 2654435761;
    for (let c = 0; c < s.length; c++) {
      v = ((v << 5) - v + s.charCodeAt(c)) | 0;
    }
    return Math.abs(v).toString(36).toUpperCase().slice(0, 4);
  };

  return [1, 2, 3, 4, 5].map(
    (i) =>
      `FOLDIN-${hash(cl, i)}-${String(i).padStart(2, "0")}W${cl.slice(-2)}`,
  );
}

/** Pre-computed set of all valid invite codes (seeds + 3 recursive generations) */
export const VLD: Set<string> = (() => {
  const s = new Set(SEEDS);

  const expand = (codes: string[], depth: number) => {
    if (depth > 3) return;
    codes.forEach((x) => {
      genCh(x).forEach((k) => {
        s.add(k);
        expand([k], depth + 1);
      });
    });
  };

  expand(SEEDS, 0);
  return s;
})();

/** Derive a deterministic user number from a code */
export function getUN(code: string): number {
  const x = code.toUpperCase().trim();
  const gi = SEEDS.indexOf(x);

  if (gi >= 0) return gi === 6 ? 42 : gi + 1;

  const cl = x.replace(/[^A-Z0-9]/g, "");
  let h = 0;
  for (let i = 0; i < cl.length; i++) {
    h = ((h << 5) - h + cl.charCodeAt(i)) | 0;
  }
  return 7 + (Math.abs(h) % 993);
}

/** OG status — first 1 000 users */
export function isOG(num: number): boolean {
  return num <= 1000;
}

/** Get the AI persona for a given user number */
export function getPersona(num: number) {
  return PERSONAS[num % PERSONAS.length];
}
