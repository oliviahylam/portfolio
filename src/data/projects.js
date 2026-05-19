// ============================================================
//  DATA — edit this file to add, remove, or update projects.
//  Every field used by ProjectCard and CaseStudy is defined here.
//  This is the ONLY file you need to edit to add new work.
// ============================================================

export const SITE = {
  name:         "Your Name",      // ← replace
  initials:     "YN",             // ← replace (used in nav logo)
  role:         "Communication Design",
  school:       "Parsons School of Design",
  location:     "New York",
  year:         "2025",
  volume:       "Vol. I",
  tagline:      "Multidisciplinary designer working across product, interaction, branding, AI systems, and immersive digital experiences.",
  availability: "Available for internships — Fall 2025",
  cvUrl:        "/cv.pdf",        // ← drop your CV in /public/
  email:        "yourname@newschool.edu", // ← replace
};

export const DISCIPLINES = [
  "UI/UX", "Interaction", "Branding",
  "Typography", "Creative Coding", "AI Design", "Web3", "Motion",
];

// Words floating in the kinetic background.
// Tweak size / position / opacity to taste.
export const BG_WORDS = [
  { text: "PRODUCT",     size: 110, x: 2,  y: 8,  rotate: -3, opacity: 0.055 },
  { text: "INTERACTION", size: 68,  x: 38, y: 18, rotate: 2,  opacity: 0.04  },
  { text: "BRANDING",    size: 82,  x: 55, y: 72, rotate: -1, opacity: 0.045 },
  { text: "EDITORIAL",   size: 90,  x: 5,  y: 50, rotate: 4,  opacity: 0.04  },
  { text: "SYSTEMS",     size: 100, x: 60, y: 88, rotate: -2, opacity: 0.05  },
  { text: "TYPOGRAPHY",  size: 60,  x: 10, y: 38, rotate: 6,  opacity: 0.038 },
  { text: "MOTION",      size: 120, x: 30, y: 60, rotate: -4, opacity: 0.06  },
  { text: "DESIGN",      size: 140, x: 48, y: 28, rotate: 1,  opacity: 0.035 },
  { text: "IMMERSIVE",   size: 72,  x: 5,  y: 80, rotate: -5, opacity: 0.042 },
  { text: "GENERATIVE",  size: 65,  x: 62, y: 44, rotate: 3,  opacity: 0.038 },
  { text: "PROCESS",     size: 95,  x: 20, y: 90, rotate: -2, opacity: 0.045 },
  { text: "IDENTITY",    size: 78,  x: 72, y: 14, rotate: 5,  opacity: 0.04  },
  { text: "SPATIAL",     size: 88,  x: 8,  y: 62, rotate: -6, opacity: 0.05  },
  { text: "AI",          size: 160, x: 70, y: 55, rotate: 0,  opacity: 0.03  },
  { text: "ARCHIVE",     size: 70,  x: 42, y: 82, rotate: 4,  opacity: 0.042 },
  { text: "FORM",        size: 130, x: 15, y: 22, rotate: -8, opacity: 0.04  },
];

// ============================================================
//  PROJECTS — add new objects here to add work to the site.
//  featured: true  → spans 2 columns in the grid (use for 1 project only)
//  thumbnail: null → shows the SVG placeholder; set to "/images/…" when ready
// ============================================================
export const PROJECTS = [
  {
    id:            "ai-design-system",
    slug:          "ai-design-system",
    featured:      true,
    title:         "Design System for AI Interfaces",
    subtitle:      "Building the language of machine interaction",
    category:      "ui-ux",
    categoryLabel: "UI/UX — Product Design",
    year:          "2025",
    role:          "Lead Designer",
    tools:         ["Figma", "React", "TypeScript", "Storybook"],
    tags:          ["AI", "Design Systems", "Accessibility", "Product"],
    shortDescription:
      "A comprehensive component library and design token system for conversational AI products, built with accessibility and adaptability at its core.",
    thumbnail:    null,                    // → "/images/projects/ai-system.jpg"
    thumbnailAlt: "AI design system component grid",
    thumbPattern: "grid",                 // fallback SVG pattern
    // ── Case study fields ──
    context:    "Placeholder context — describe the brief or course project.",
    problem:    "Placeholder problem — frame the challenge as a question.",
    process: [
      { phase: "Research",  description: "Placeholder research notes.", images: [] },
      { phase: "Ideation",  description: "Placeholder ideation notes.", images: [] },
      { phase: "Build",     description: "Placeholder build notes.",    images: [] },
    ],
    outcome:    "Placeholder outcome — describe what was shipped or shown.",
    reflection: "Placeholder reflection — one honest paragraph looking back.",
    processImages: [], prototypeUrl: null, liveUrl: null,
  },
  {
    id:            "kinetic-brand",
    slug:          "kinetic-brand",
    featured:      false,
    title:         "Kinetic Brand Identity",
    subtitle:      "Motion-first identity design",
    category:      "branding",
    categoryLabel: "Branding — Motion",
    year:          "2025",
    role:          "Brand Designer",
    tools:         ["After Effects", "Illustrator", "p5.js"],
    tags:          ["Motion", "Identity", "Typography"],
    shortDescription:
      "A motion-first brand system for a new creative studio, where the logo lives in four states: still, breathing, reactive, and generative.",
    thumbnail: null, thumbnailAlt: "Kinetic brand logo frames", thumbPattern: "circles",
    context: "", problem: "", process: [], outcome: "", reflection: "",
    processImages: [], prototypeUrl: null, liveUrl: null,
  },
  {
    id:            "generative-type",
    slug:          "generative-type",
    featured:      false,
    title:         "Generative Type Engine",
    subtitle:      "Real-time noise-field letterforms",
    category:      "coding",
    categoryLabel: "Creative Coding",
    year:          "2024",
    role:          "Creative Coder",
    tools:         ["p5.js", "Three.js", "GLSL"],
    tags:          ["Generative", "Typography", "Code"],
    shortDescription:
      "A real-time typographic tool that generates letterform variations using noise fields and mouse interaction.",
    thumbnail: null, thumbnailAlt: "Generative type screenshot", thumbPattern: "lines",
    context: "", problem: "", process: [], outcome: "", reflection: "",
    processImages: [], prototypeUrl: null, liveUrl: null,
  },
  {
    id:            "web3-game-ui",
    slug:          "web3-game-ui",
    featured:      false,
    title:         "Web3 Game Interface",
    subtitle:      "On-chain strategy game UI",
    category:      "ui-ux",
    categoryLabel: "UI/UX — Web3",
    year:          "2024",
    role:          "UI Designer",
    tools:         ["Figma", "React", "Ethers.js"],
    tags:          ["Web3", "Gaming", "Product"],
    shortDescription:
      "Interface design for an on-chain strategy game blending the tactility of physical tokens with blockchain immediacy.",
    thumbnail: null, thumbnailAlt: "Web3 game interface mockup", thumbPattern: "dots",
    context: "", problem: "", process: [], outcome: "", reflection: "",
    processImages: [], prototypeUrl: null, liveUrl: null,
  },
  {
    id:            "archival-typography",
    slug:          "archival-typography",
    featured:      false,
    title:         "Archival Typography",
    subtitle:      "Swiss modernism, reinterpreted",
    category:      "typography",
    categoryLabel: "Typography — Print",
    year:          "2024",
    role:          "Designer",
    tools:         ["InDesign", "Illustrator"],
    tags:          ["Print", "Editorial", "History"],
    shortDescription:
      "A printed specimen and editorial exploring the typographic legacy of modernist Swiss design through contemporary reinterpretation.",
    thumbnail: null, thumbnailAlt: "Typography specimen spread", thumbPattern: "text",
    context: "", problem: "", process: [], outcome: "", reflection: "",
    processImages: [], prototypeUrl: null, liveUrl: null,
  },
  {
    id:            "immersive-exhibition",
    slug:          "immersive-exhibition",
    featured:      false,
    title:         "Immersive Exhibition UI",
    subtitle:      "Sensor-driven spatial interface",
    category:      "experimental",
    categoryLabel: "Experimental — Immersive",
    year:          "2023",
    role:          "Interaction Designer",
    tools:         ["TouchDesigner", "Arduino", "Figma"],
    tags:          ["Spatial", "Interaction", "Installation"],
    shortDescription:
      "Spatial interface design for a museum exhibition using real-time sensor data to modulate generative visuals and ambient audio.",
    thumbnail: null, thumbnailAlt: "Exhibition installation view", thumbPattern: "wave",
    context: "", problem: "", process: [], outcome: "", reflection: "",
    processImages: [], prototypeUrl: null, liveUrl: null,
  },
];

export const FEATURED_PROJECT = PROJECTS.find((p) => p.featured) ?? PROJECTS[0];
