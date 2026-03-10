import type { Metadata } from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { Header } from '@/components/Header';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Bebas_Neue, Montserrat } from 'next/font/google';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'IAP Camisetas - Ministério de Comunicação',
  description: 'Vista a identidade do Ministério de Comunicação da IAP Barreirinha.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${bebasNeue.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="font-body selection:bg-accent selection:text-white antialiased">
        <FirebaseClientProvider>
          <SmoothScroll />
          <Header />
          {children}
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
