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
      <div className="container mx-auto max-w-[1500px] flex items-center justify-between px-6 lg:px-10">
        
        {/* Desktop Left Nav */}
        <nav className="hidden lg:flex flex-1 items-center gap-10">
          {menuItems.slice(0, 2).map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="text-[12px] font-semibold tracking-[0.1em] text-[#000000] hover:text-[#ff1f17] transition-colors uppercase font-body"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logo - Centered */}
        <Link 
          href="/" 
          className="flex flex-1 lg:flex-none justify-center items-center"
        >
          <span className="font-headline text-[18px] lg:text-[22px] font-normal tracking-[0.15em] text-[#000000] uppercase leading-none">
            IAP <span className="text-[#ff1f17]">CAMISETAS</span>
          </span>
        </Link>

        {/* Desktop Right Nav / Cart */}
        <div className="hidden lg:flex flex-1 items-center justify-end gap-10">
          {menuItems.slice(2).map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="text-[12px] font-semibold tracking-[0.1em] text-[#000000] hover:text-[#ff1f17] transition-colors uppercase font-body"
            >
              {item.label}
            </Link>
          ))}
          <Link 
            href="#reserva" 
            className="flex items-center gap-2 text-[#000000] hover:text-[#ff1f17] transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="lg:hidden flex items-center gap-4">
           <Link 
            href="#reserva" 
            className="p-2 text-[#000000]"
          >
            <ShoppingBag className="h-5 w-5" />
          </Link>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2 text-[#000000]">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] p-0 bg-white border-l-0">
              <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
              <div className="flex flex-col h-full pt-20 px-10">
                <nav className="flex flex-col gap-10">
                  {menuItems.map((item) => (
                    <Link 
                      key={item.label} 
                      href={item.href} 
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-headline tracking-tight text-[#000000] border-b border-black/5 pb-5 hover:text-[#ff1f17] transition-colors uppercase"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
