
'use client';

import Link from 'next/link';
import { ShoppingBag, User, Menu } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Início', href: '/' },
    { label: 'Ver Produto', href: '#produtos' },
    { label: 'Kit Promocional', href: '#ofertas' },
    { label: 'Perguntas Frequentes', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#eeeeee] bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 lg:px-12">
        {/* Desktop Left Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="text-xs font-semibold uppercase tracking-widest text-foreground hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 font-headline text-lg font-extrabold tracking-tighter">
          <span className="text-primary">IAP</span>
          <span className="text-accent">CAMISETAS</span>
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          <Link href="#" className="hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-widest hover:text-accent transition-colors">
            <User className="h-4 w-4" />
            <span>Entrar</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest cursor-pointer hover:text-accent transition-colors">
            <ShoppingBag className="h-4 w-4" />
            <span>Carrinho <span className="text-accent">0</span></span>
          </div>
          
          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2"><Menu className="h-5 w-5" /></button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-6 mt-12">
                  {menuItems.map((item) => (
                    <Link 
                      key={item.label} 
                      href={item.href} 
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-bold uppercase tracking-widest border-b pb-2"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
