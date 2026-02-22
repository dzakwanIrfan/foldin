import type { Category } from "../types";

/** Activity categories grouped by theme */
export const CATS: Record<string, Category[]> = {
  meet: [
    { id: "coffee", e: "☕", l: "Coffee" },
    { id: "drink", e: "🍺", l: "Drinks" },
    { id: "lunch", e: "🍜", l: "Lunch" },
    { id: "dinner", e: "🍽️", l: "Dinner" },
    { id: "breakfast", e: "🥞", l: "Breakfast" },
  ],
  sports: [
    { id: "run", e: "🏃", l: "Running" },
    { id: "gym", e: "💪", l: "Gym" },
    { id: "yoga", e: "🧘", l: "Yoga" },
    { id: "basketball", e: "🏀", l: "Basketball" },
    { id: "football", e: "⚽", l: "Football" },
    { id: "badminton", e: "🏸", l: "Badminton" },
  ],
  network: [
    { id: "class", e: "📚", l: "Class" },
    { id: "workshop", e: "🔧", l: "Workshop" },
    { id: "seminar", e: "🎓", l: "Seminar" },
    { id: "meetup", e: "🤝", l: "Meetup" },
    { id: "pitch", e: "📊", l: "Pitch" },
  ],
  lifestyle: [
    { id: "music", e: "🎵", l: "Music" },
    { id: "art", e: "🎨", l: "Art" },
    { id: "photo", e: "📸", l: "Photo" },
    { id: "travel", e: "✈️", l: "Travel" },
    { id: "food", e: "🍕", l: "Foodies" },
    { id: "gaming", e: "🎮", l: "Gaming" },
  ],
};

/** Flat array of every category */
export const ALL_CATEGORIES: Category[] = [
  ...CATS.meet,
  ...CATS.sports,
  ...CATS.network,
  ...CATS.lifestyle,
];
