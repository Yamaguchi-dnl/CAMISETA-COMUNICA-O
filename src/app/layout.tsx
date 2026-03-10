
import type { Metadata } from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { Header } from '@/components/Header';
import { SmoothScroll } from '@/components/SmoothScroll';

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
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body selection:bg-accent selection:text-white">
        <FirebaseClientProvider>
          <SmoothScroll />
          <Header />
          {children}
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
