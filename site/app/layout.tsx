import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jungle Spa — массаж и SPA в Королёве',
  description: 'Тайский и балийский массаж, SPA-программы и ритуалы для двоих в Королёве.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
