import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Brújula Electoral',
  description: 'Brújula Electoral Colombia 2026'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
