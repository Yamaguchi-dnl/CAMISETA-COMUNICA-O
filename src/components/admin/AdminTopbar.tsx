'use client';

import { useUser } from '@/firebase';
import { Menu, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { AdminSidebar } from './AdminSidebar';
import { useState } from 'react';

export function AdminTopbar() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="h-20 bg-white border-b border-[#d7d1ca] flex items-center justify-between px-6 lg:px-10 sticky top-0 z-50">
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-black">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-black border-none">
            <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
            <AdminSidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#6f6a63] uppercase">Status: Online</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end hidden sm:flex">
          <span className="text-[11px] font-bold text-black uppercase tracking-tight">{user?.email?.split('@')[0]}</span>
          <span className="text-[9px] font-bold text-[#6f6a63] uppercase tracking-widest">Admin</span>
        </div>
        <div className="w-10 h-10 bg-[#f5f3ef] border border-[#d7d1ca] flex items-center justify-center">
          <User className="h-5 w-5 text-black" />
        </div>
      </div>
    </header>
  );
}
