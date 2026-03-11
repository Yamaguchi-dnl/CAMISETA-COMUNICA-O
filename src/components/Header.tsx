'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Dynamically import Sheet components for mobile to save initial JS
const Sheet = dynamic(() => import('@/components/ui/sheet').then(mod => mod.Sheet), { ssr: false });
const SheetContent = dynamic(() => import('@/components/ui/sheet').then(mod => mod.SheetContent), { ssr: false });
const SheetTrigger = dynamic(() => import('@/components/ui/sheet').then(mod => mod.SheetTrigger), { ssr: false });
const SheetTitle = dynamic(() => import('@/components/ui/sheet').then(mod => mod.SheetTitle), { ssr: false });

const MENU_ITEMS = [
  { label: 'Início', href: '/' },
  { label: 'Ofertas', href: '/#ofertas' },
  { label: 'Reservar', href: '/#reserva' },
  { label: 'Dúvidas', href: '/#faq' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 z-[100] w-full transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md border-b border-black/5 py-3 shadow-sm" 
          : "bg-transparent py-4 lg:py-8"
      )}
    >
      <div className="container mx-auto max-w-[1400px] flex items-center justify-between px-6 lg:px-10 relative">
        
        {/* Mobile Menu Trigger */}
        <div className="lg:hidden">
          {Sheet && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-black hover:text-accent transition-colors">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full bg-white/95 backdrop-blur-lg pt-24 pb-12 border-none">
                <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
                <nav className="flex flex-col items-center gap-8">
                  {MENU_ITEMS.map((item) => (
                    <Link 
                      key={item.label} 
                      href={item.href} 
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-body font-medium text-black uppercase tracking-[0.05em] hover:text-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-12 mx-auto">
          {MENU_ITEMS.map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className={cn(
                "text-[14px] font-medium tracking-[0.02em] transition-all uppercase font-body relative group",
                "text-black"
              )}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block w-[24px]" />
      </div>
    </header>
  );
}
