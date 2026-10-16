"use client";

// ============================================================
//  Terms of Living — clickable prototype
//  Flow (matches the Figma frame order):
//    1. onboarding → "Agree & Continue"
//    2. home       → "Accept my day"
//    3. evening    → pick an option, "Confirm"
//    4. schedule   → "Done" returns home
//  The tab bar jumps between Home and Choices; Inventory and
//  Permit have no wireframes yet, so they show a notice.
// ============================================================

import { useCallback, useEffect, useRef, useState } from "react";
import { GlowRing, Check, ChoicesIcon, InventoryIcon, PermitIcon } from "./Icons";
import {
  CITIZEN_ID, ONBOARDING, TODAY, EVENING, SCHEDULE,
} from "@/data/termsOfLiving";
import styles from "./TermsOfLiving.module.css";

const PHONE_W = 402;
const PHONE_H = 874;

export default function TermsOfLiving() {
  const [screen, setScreen]   = useState("onboarding");
  const [checked, setChecked] = useState(() => ONBOARDING.options.map((o) => o.id));
  const [evening, setEvening] = useState(EVENING.defaultChoice);
  const [dayAccepted, setDayAccepted] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [toast, showToast, clearToast] = useToast();
  const scale = useFitScale();

  // Notices belong to the screen they were raised on
  useEffect(clearToast, [screen, sheet, clearToast]);

  const restart = () => {
    setScreen("onboarding");
    setChecked(ONBOARDING.options.map((o) => o.id));
    setEvening(EVENING.defaultChoice);
    setDayAccepted(false);
    setSheet(false);
  };

  const onTab = (tab) => {
    if (tab === "home")    return setScreen("home");
    if (tab === "choices") return setScreen("evening");
    showToast(`${tab === "inventory" ? "Inventory" : "Permit"} isn't in the wireframes yet`);
  };

  const eveningTitle = EVENING.options.find((o) => o.id === evening)?.title;
  const activeTab = screen === "evening" ? "choices" : screen === "onboarding" ? null : "home";

  return (
    <main className={styles.stage}>
      <div className={styles.toolbar}>
        <span>Terms of Living — prototype</span>
        <button type="button" onClick={restart}>Restart</button>
      </div>

      <div
        className={styles.viewport}
        style={{ width: PHONE_W * scale, height: PHONE_H * scale }}
      >
        <div className={styles.phone} style={{ transform: `scale(${scale})` }}>
          <div key={screen} className={styles.screen}>
            {screen === "onboarding" && (
              <Onboarding
                checked={checked}
                onToggle={(opt) => {
                  if (opt.required) return showToast("This choice is required by your terms");
                  setChecked((c) => c.includes(opt.id) ? c.filter((id) => id !== opt.id) : [...c, opt.id]);
                }}
                onContinue={() => setScreen("home")}
                onManual={() => setSheet(true)}
              />
            )}
            {screen === "home" && (
              <Home
                accepted={dayAccepted}
                onAccept={() => setScreen(dayAccepted ? "schedule" : "evening")}
              />
            )}
            {screen === "evening" && (
              <Evening
                selected={evening}
                onSelect={setEvening}
                onConfirm={() => setScreen("schedule")}
              />
            )}
            {screen === "schedule" && (
              <Schedule
                evening={eveningTitle}
                onDone={() => { setDayAccepted(true); setScreen("home"); }}
              />
            )}
          </div>

          {activeTab && <TabBar active={activeTab} onTab={onTab} />}

          {sheet && <ManualSheet onClose={() => setSheet(false)} />}

          <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`} role="status">
            {toast}
          </div>
        </div>
      </div>
    </main>
  );
}

// ── Screens ──────────────────────────────────────────────────

function Onboarding({ checked, onToggle, onContinue, onManual }) {
  return (
    <>
      <div className={styles.orb}><GlowRing size={112} stroke={13} blur={9} /></div>
      <p className={styles.citizen}>Citizen: {CITIZEN_ID}</p>
      <h1 className={styles.onboardTitle}>{ONBOARDING.title}</h1>
      <p className={styles.onboardSub}>{ONBOARDING.subtitle}</p>

      <ul className={styles.optionCard}>
        {ONBOARDING.options.map((opt) => {
          const isOn = checked.includes(opt.id);
          return (
            <li key={opt.id}>
              <button
                type="button"
                role="checkbox"
                aria-checked={isOn}
                className={styles.optionRow}
                onClick={() => onToggle(opt)}
              >
                <span className={`${styles.checkbox} ${isOn ? styles.checkboxOn : ""}`}>
                  {isOn && <Check />}
                </span>
                <span className={styles.optionLabel}>{opt.label}</span>
                <span className={styles.optionTag}>{opt.tag}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <PillButton onClick={onContinue}>{ONBOARDING.cta}</PillButton>
      <button type="button" className={styles.manualLink} onClick={onManual}>
        {ONBOARDING.manual}
      </button>
    </>
  );
}

function Home({ accepted, onAccept }) {
  const { stats } = TODAY;
  return (
    <>
      <Logo />
      <h1 className={styles.homeTitle}>{TODAY.greeting}</h1>
      <p className={styles.homeSub}>{TODAY.subtitle}</p>

      <div className={styles.dial}>
        <div className={styles.dialHole} />
        <Stat className={styles.statPre}      label="Pre-selected" value={stats.preSelected} />
        <Stat className={styles.statForecast} label="Forecast"     value={stats.forecast} />
        <Stat className={styles.statFirst}    label="First choice" value={stats.firstChoice} />
        <Stat className={styles.statAlign}    label="Alignment"    value={stats.alignment} />
        <div className={styles.dialCenter}>
          <span className={styles.dialCount}>{TODAY.choices}</span>
          <span className={styles.dialLabel}>Choices</span>
        </div>
      </div>

      <PillButton onClick={onAccept}>{accepted ? "View my day" : "Accept my day"}</PillButton>
    </>
  );
}

function Evening({ selected, onSelect, onConfirm }) {
  return (
    <>
      <Logo />
      <h1 className={styles.pageTitle}>{EVENING.title}</h1>
      <p className={styles.pageLabel}>{EVENING.label}</p>

      <div className={styles.choiceList} role="radiogroup" aria-label={EVENING.title}>
        {EVENING.options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={selected === opt.id}
            disabled={opt.disabled}
            className={`${styles.choice} ${selected === opt.id ? styles.choiceSelected : ""}`}
            onClick={() => onSelect(opt.id)}
          >
            <span className={styles.choiceText}>
              <span className={styles.choiceTitle}>{opt.title}</span>
              <span className={styles.choiceTag}>{opt.tag}</span>
            </span>
            {opt.points && <span className={styles.choicePoints}>{opt.points}</span>}
          </button>
        ))}
      </div>

      <PillButton onClick={onConfirm}>Confirm</PillButton>
    </>
  );
}

function Schedule({ evening, onDone }) {
  return (
    <>
      <Logo />
      <h1 className={styles.pageTitle}>Your day is set</h1>

      <ol className={styles.schedule}>
        {SCHEDULE.map((row) => (
          <li key={row.time} className={styles.scheduleRow}>
            <span className={styles.scheduleTime}>{row.time}</span>
            <span className={styles.scheduleItem}>{row.item ?? evening}</span>
          </li>
        ))}
      </ol>

      <PillButton onClick={onDone}>Done</PillButton>
    </>
  );
}

// ── Shared pieces ────────────────────────────────────────────

function Logo() {
  return (
    <div className={styles.logo}>
      <GlowRing size={30} />
      <span>terms of<br />living</span>
    </div>
  );
}

function Stat({ className, label, value }) {
  return (
    <div className={`${styles.stat} ${className}`}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  );
}

function PillButton({ children, onClick }) {
  return (
    <button type="button" className={styles.pill} onClick={onClick}>
      {children}
    </button>
  );
}

const TABS = [
  { id: "home",      label: "Home",      icon: <GlowRing size={23} /> },
  { id: "choices",   label: "Choices",   icon: <ChoicesIcon /> },
  { id: "inventory", label: "Inventory", icon: <InventoryIcon /> },
  { id: "permit",    label: "Permit",    icon: <PermitIcon /> },
];

function TabBar({ active, onTab }) {
  return (
    <nav className={styles.tabBar} aria-label="Primary">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={styles.tab}
          aria-current={active === tab.id ? "page" : undefined}
          onClick={() => onTab(tab.id)}
        >
          <span className={styles.tabIcon}>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

function ManualSheet({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={styles.sheetScrim} onClick={onClose}>
      <div
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tol-sheet-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="tol-sheet-title" className={styles.sheetTitle}>Manual review requested</h2>
        <p className={styles.sheetBody}>
          Estimated review: 14 days. Your recommended choices stay active until then.
        </p>
        <PillButton onClick={onClose}>Return</PillButton>
      </div>
    </div>
  );
}

// ── Hooks ────────────────────────────────────────────────────

// Scales the fixed 402×874 phone to fit the window.
function useFitScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      const compact = window.innerWidth < 500;
      const gutter  = compact ? 0 : 48;
      const toolbar = compact ? 0 : 56;
      setScale(Math.min(
        compact ? Infinity : 1,
        (window.innerWidth - gutter) / PHONE_W,
        (window.innerHeight - gutter - toolbar) / PHONE_H,
      ));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return scale;
}

function useToast() {
  const [message, setMessage] = useState("");
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  const show = useCallback((text) => {
    clearTimeout(timer.current);
    setMessage(text);
    timer.current = setTimeout(() => setMessage(""), 2200);
  }, []);
  const clear = useCallback(() => {
    clearTimeout(timer.current);
    setMessage("");
  }, []);
  return [message, show, clear];
}
