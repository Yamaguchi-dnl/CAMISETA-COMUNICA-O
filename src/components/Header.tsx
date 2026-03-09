'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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
    { label: 'Ver produto', href: '#produtos' },
    { label: 'Kit promocional', href: '#ofertas' },
    { label: 'Perguntas frequentes', href: '#faq' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 z-[100] w-full transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md border-b border-black/5 py-4 shadow-sm" 
          : "bg-transparent py-6 lg:py-8"
      )}
    >
      <div className="container mx-auto max-w-[1400px] flex items-center justify-between px-6 lg:px-8">
        
        {/* Desktop Left Nav */}
        <nav className="hidden lg:flex flex-1 items-center gap-7">
          {menuItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="text-[13px] font-medium tracking-wide text-[#111111] hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logo - Centered on Desktop */}
        <Link 
          href="/" 
          className="flex flex-1 lg:flex-none justify-center items-center gap-1.5"
        >
          <span className="font-headline text-lg lg:text-xl font-bold tracking-tight text-[#111111]">
            IAP <span className="text-accent">CAMISETAS</span>
          </span>
        </Link>

        {/* Desktop Right Icons / Cart */}
        <div className="flex flex-1 items-center justify-end gap-6">
          <Link 
            href="#reserva" 
            className="flex items-center gap-2 text-[13px] font-medium tracking-wide text-[#111111] hover:text-accent transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Carrinho <span className="text-accent font-bold">0</span></span>
          </Link>
          
          {/* Mobile Menu Trigger */}
          <div className="lg:hidden ml-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 -mr-2 text-[#111111] hover:text-accent transition-colors">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[82vw] p-0 bg-white">
                <div className="flex flex-col h-full pt-20 px-8">
                  <nav className="flex flex-col gap-8">
                    {menuItems.map((item) => (
                      <Link 
                        key={item.label} 
                        href={item.href} 
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-semibold tracking-tight text-[#111111] border-b border-black/5 pb-4 hover:text-accent transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link 
                      href="#reserva" 
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-semibold tracking-tight text-[#111111] flex items-center justify-between border-b border-black/5 pb-4"
                    >
                      <span>Carrinho</span>
                      <div className="flex items-center gap-2">
                         <span className="text-accent">0</span>
                         <ShoppingBag className="h-5 w-5" />
                      </div>
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
