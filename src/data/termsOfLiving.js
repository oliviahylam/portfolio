// ============================================================
//  DATA — Terms of Living prototype (/prototype/terms-of-living)
//  Copy and options for each screen, taken from the Figma
//  wireframes ("Thesis Proposals (Bento)" → App wireframes).
// ============================================================

export const CITIZEN_ID = "046-0314-2291";

// The Inventory tab opens the Archive Scanner (oliviahylam/archive-scanner).
export const SCANNER_URL = "https://archive-scanner.vercel.app";

export const ONBOARDING = {
  title:    "Your life is ready",
  subtitle: "We have prepared 2,118 choices for you this week.",
  cta:      "Agree & Continue",
  manual:   "Choose manually (est. review: 14 days)",
  options: [
    { id: "career",  label: "Select my career",  tag: "Recommended", required: false },
    { id: "network", label: "Choose my network", tag: "Recommended", required: false },
    { id: "beliefs", label: "Refine my beliefs", tag: "Required",    required: true  },
  ],
};

export const TODAY = {
  greeting: "Good morning",
  subtitle: "A glimpse at today",
  choices:  7,
  stats: {
    preSelected: "7 of 7",
    forecast:    "+240 P",
    firstChoice: "07:30",
    alignment:   "100%",
  },
};

export const EVENING = {
  title: "How will you spend your evening?",
  label: "Evening",
  // The selected option fills the 18:30 slot on the day schedule.
  defaultChoice: "gallery",
  options: [
    { id: "home",    title: "Home · recharge",            tag: "Pre-selected",               points: "+40" },
    { id: "walk",    title: "Evening walk",               tag: "Recommended",                points: "+20" },
    { id: "dinner",  title: "Dinner, outside Group C-17", tag: "Based on connections",       points: "+3"  },
    { id: "locked",  title: "-",                          tag: "Not available at your tier", points: "-", disabled: true },
    { id: "gallery", title: "Gallery Visit",              tag: "Purchased choice" },
  ],
};

export const SCHEDULE = [
  { time: "07:30", item: "Nutri-Blend No.4" },
  { time: "08:15", item: "Line 4, carriage 2" },
  { time: "12:30", item: "Grain bowl, Kiosk 4" },
  { time: "15:00", item: "Coffee with 044-2081-7730" },
  { time: "18:30", item: null }, // ← evening choice
  { time: "19:45", item: "Episode 4 of 6, Harbour" },
  { time: "23:05", item: "Sleep" },
];
