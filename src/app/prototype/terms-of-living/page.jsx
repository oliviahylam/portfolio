// ============================================================
//  Prototype page — /prototype/terms-of-living
//  Clickable prototype built from the Figma app wireframes.
//  All screens and interactions live in TermsOfLiving.jsx.
// ============================================================

import { Questrial, Space_Grotesk } from "next/font/google";
import TermsOfLiving from "@/components/prototype/terms-of-living/TermsOfLiving";

const questrial = Questrial({
  subsets:  ["latin"],
  weight:   "400",
  variable: "--tol-display",
});

const spaceGrotesk = Space_Grotesk({
  subsets:  ["latin"],
  weight:   ["300", "400", "500"],
  variable: "--tol-body",
});

export const metadata = {
  title:       "Terms of Living — Prototype",
  description: "A clickable prototype of a speculative app that pre-selects your life.",
};

export default function TermsOfLivingPage() {
  return (
    <div className={`${questrial.variable} ${spaceGrotesk.variable}`}>
      <TermsOfLiving />
    </div>
  );
}
