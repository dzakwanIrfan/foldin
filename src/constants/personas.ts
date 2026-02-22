import type { Persona } from "../types";
import { C } from "./tokens";

/** AI-assigned persona archetypes */
export const PERSONAS: Persona[] = [
  { t: "The Connector", d: "Always knows someone", e: "🌐", c: C.pu },
  { t: "The Explorer", d: "First to try new places", e: "🧭", c: C.cy },
  { t: "The Energizer", d: "Life of every event", e: "⚡", c: C.o },
  { t: "The Creator", d: "Makes things happen", e: "🎨", c: "#EC4899" },
  { t: "The Mentor", d: "Wisdom to share", e: "🧠", c: C.b },
  { t: "The Nightowl", d: "Best vibes after dark", e: "🦉", c: C.pu },
  { t: "The Athlete", d: "Always on the move", e: "🏅", c: C.g },
  { t: "The Foodie", d: "Eats their way through life", e: "🍳", c: C.go },
];
