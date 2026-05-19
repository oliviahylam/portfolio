// src/app/layout.jsx
// Root layout — applies global CSS and sets metadata.
// Edit SITE in data/projects.js to update the title/description.

import "@/styles/globals.css";
import { SITE } from "@/data/projects";

export const metadata = {
  title: `${SITE.name} — ${SITE.role}`,
  description: SITE.tagline,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
