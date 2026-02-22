import { useState } from "react";
import { C, F } from "./constants";
import { Nv } from "./components";
import {
  Onboarding,
  HomeScreen,
  EventsScreen,
  EventScreen,
  FoldScreen,
  GhostScreen,
  ProfileScreen,
  UserProfileScreen,
  ScanScreen,
  CircleScreen,
  DMScreen,
  PostsScreen,
  PopularScreen,
  CreateScreen,
  PaymentScreen,
  InviteScreen,
} from "./screens";
import type { ScreenId, UserData } from "./types";
import "./App.css";

/* ════════════════════════════════════════════
 *  MainApp — app shell with bottom navigation
 * ════════════════════════════════════════════ */
function MainApp({ u }: { u: UserData }) {
  const [s, setS] = useState<ScreenId>("home");

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 400,
        height: "100%",
        maxHeight: 850,
        background: C.bg,
        position: "relative",
        overflow: "hidden",
        fontFamily: F,
        borderRadius: 24,
        boxShadow: "0 16px 64px rgba(0,0,0,.12), 0 0 0 1px rgba(0,0,0,.04)",
      }}
    >
      {/* Screen area */}
      <div
        className="fi"
        key={s}
        style={{ height: "calc(100% - 50px)", overflow: "hidden" }}
      >
        {s === "home" && <HomeScreen go={setS} u={u} />}
        {s === "fold" && <FoldScreen go={setS} />}
        {s === "event" && <EventScreen go={setS} />}
        {s === "events" && <EventsScreen go={setS} />}
        {s === "create" && <CreateScreen go={setS} />}
        {s === "posts" && <PostsScreen go={setS} />}
        {s === "dm" && <DMScreen go={setS} />}
        {s === "profile" && <ProfileScreen go={setS} u={u} />}
        {s === "userProfile" && <UserProfileScreen go={setS} />}
        {s === "ghost" && <GhostScreen go={setS} u={u} />}
        {s === "popular" && <PopularScreen go={setS} />}
        {s === "scan" && <ScanScreen go={setS} u={u} />}
        {s === "circle" && <CircleScreen go={setS} />}
        {s === "payment" && <PaymentScreen go={setS} />}
        {s === "invite" && <InviteScreen go={setS} u={u} />}
      </div>

      {/* Bottom navigation */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 50,
          padding: "2px 6px 6px",
          background: C.w,
          borderTop: `1px solid ${C.bd}`,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Nv
          icon="🗺️"
          label="Map"
          active={s === "home"}
          onClick={() => setS("home")}
        />
        <Nv
          icon="📢"
          label="Posts"
          active={s === "posts"}
          onClick={() => setS("posts")}
          badge={2}
        />
        <div
          onClick={() => setS("create")}
          style={{
            width: 40,
            height: 40,
            borderRadius: 13,
            background: `linear-gradient(135deg,${C.o},${C.p})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            marginTop: -10,
            boxShadow: `0 4px 12px ${C.o}25`,
            fontSize: 18,
            border: `3px solid ${C.w}`,
            color: C.w,
            fontWeight: 800,
          }}
        >
          +
        </div>
        <Nv
          icon="💬"
          label="DMs"
          active={s === "dm"}
          onClick={() => setS("dm")}
          badge={7}
        />
        <Nv
          icon="👤"
          label="Me"
          active={s === "profile"}
          onClick={() => setS("profile")}
        />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
 *  Root — onboarding gate → main app
 * ════════════════════════════════════════ */
export default function App() {
  const [u, setU] = useState<UserData | null>(null);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: C.dk,
        fontFamily: F,
      }}
    >
      {!u ? (
        <Onboarding onDone={setU} />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <MainApp u={u} />
        </div>
      )}
    </div>
  );
}
