'use client';

import Link from 'next/link';
import { ShoppingBag, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Início', href: '#' },
    { label: 'Produtos', href: '#produtos' },
    { label: 'Ofertas', href: '#ofertas' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 z-[100] w-full transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md border-b border-black/5 py-3 shadow-sm" 
          : "bg-transparent py-6 lg:py-8"
      )}
    >
      <div className="container mx-auto max-w-[1500px] flex items-center justify-center px-6 lg:px-10 relative">
        
        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex items-center gap-12">
          {menuItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="text-[12px] font-semibold tracking-[0.15em] text-[#000000] hover:text-[#ff1f17] transition-all uppercase font-body relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#ff1f17] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <Link 
            href="#reserva" 
            className="flex items-center gap-2 text-[#000000] hover:text-[#ff1f17] transition-colors ml-4"
          >
            <ShoppingBag className="h-4 w-4" />
          </Link>
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="lg:hidden flex items-center justify-between w-full">
          <div className="w-10"></div> {/* Spacer to keep menu centered if needed, or just standard layout */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 text-[12px] font-bold tracking-[0.2em] uppercase text-[#000000]">
                <Menu className="h-5 w-5" />
                <span>Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full h-auto p-0 bg-white border-b border-black/5">
              <SheetTitle className="sr-only">Navegação</SheetTitle>
              <div className="flex flex-col items-center py-12 px-10">
                <nav className="flex flex-col items-center gap-8 w-full">
                  {menuItems.map((item) => (
                    <Link 
                      key={item.label} 
                      href={item.href} 
                      onClick={() => setIsOpen(false)}
                      className="text-xl font-headline tracking-tight text-[#000000] hover:text-[#ff1f17] transition-colors uppercase"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link 
                    href="#reserva" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm pt-4"
                  >
                    <ShoppingBag className="h-5 w-5" /> Reservar
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-10"></div>
        </div>
      </div>
    </header>
  );
}
