import { Bebas_Neue, Space_Grotesk, DM_Mono } from 'next/font/google';
import "@/styles/globals.css";
import { SITE } from "@/data/projects";

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: `${SITE.name} — ${SITE.role}`,
  description: SITE.tagline,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${dmMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
