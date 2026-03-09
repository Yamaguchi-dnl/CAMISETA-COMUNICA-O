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
    { label: 'Ver produto', href: '#produtos' },
    { label: 'Kit promocional', href: '#ofertas' },
    { label: 'Perguntas frequentes', href: '#faq' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 z-[100] w-full transition-all duration-300 ease-in-out hidden lg:block",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md border-b border-black/5 py-3 shadow-sm" 
          : "bg-transparent py-6 lg:py-8"
      )}
    >
      <div className="container mx-auto max-w-[1400px] flex items-center justify-center px-6 lg:px-10 relative">
        
        {/* Desktop Navigation - Centered (Logo removed as requested) */}
        <nav className="flex items-center gap-12">
          {menuItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className={cn(
                "text-[14px] font-medium tracking-[0.02em] transition-all uppercase font-body relative group",
                isScrolled ? "text-[#111111]" : "text-[#111111]"
              )}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <Link 
            href="#reserva" 
            className="flex items-center gap-2 text-[#111111] hover:text-accent transition-colors ml-4"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="text-[14px] font-medium uppercase tracking-[0.02em]">Carrinho 0</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
