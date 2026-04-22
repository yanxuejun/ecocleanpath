export const runtime = 'edge';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'EcoCleanPath', template: '%s | EcoCleanPath' },
  description: 'High-quality robot vacuum accessories and replacement parts. Compatible with Ecovacs, Roborock, Tineco, Bissell, Eufy, Karcher, Qihoo, and Shark.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
