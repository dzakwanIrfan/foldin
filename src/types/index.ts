/** A single activity category */
export interface Category {
  id: string;
  e: string;
  l: string;
}

/** AI persona archetype */
export interface Persona {
  t: string;
  d: string;
  e: string;
  c: string;
}

/** Social handles */
export interface Socials {
  ig: string;
  tw: string;
  li: string;
  tt: string;
}

/** Authenticated user data produced by onboarding */
export interface UserData {
  code: string;
  username: string;
  displayName: string;
  bio: string;
  socials: Socials;
  interests: string[];
  isPrivate: boolean;
  userNum: number;
  og: boolean;
  codes: string[];
  persona: Persona;
}

/** Common screen-navigation helper */
export type ScreenId =
  | "home"
  | "fold"
  | "event"
  | "events"
  | "create"
  | "posts"
  | "dm"
  | "profile"
  | "userProfile"
  | "ghost"
  | "popular"
  | "scan"
  | "circle"
  | "payment"
  | "invite";

export interface NavigableProps {
  go: (screen: ScreenId) => void;
}

export interface NavigableWithUserProps extends NavigableProps {
  u: UserData | null;
}
