
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold tracking-tight">
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded">IAP</span>
          <span>Camisetas</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Loja
          </Link>
          <ShoppingBag className="h-5 w-5 opacity-70" />
        </div>
      </div>
    </header>
  );
}
