'use client';

import { useUser } from '@/firebase';
import { Menu, User, Bell, PanelLeft, PanelLeftClose } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { AdminSidebar } from './AdminSidebar';
import { useState } from 'react';

interface AdminTopbarProps {
  onToggleSidebar?: () => void;
}

export function AdminTopbar({ onToggleSidebar }: AdminTopbarProps) {
  const { user } = useUser();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="h-20 bg-white border-b border-[#d7d1ca] flex items-center justify-between px-6 lg:px-10 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="lg:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-black">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 bg-black border-none">
              <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
              <AdminSidebar isCollapsed={false} />
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="hidden lg:block">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleSidebar}
            className="text-black hover:bg-[#f5f3ef]"
            title="Alternar Sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="hidden md:block">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#6f6a63] uppercase border-l border-[#d7d1ca] pl-4 ml-2">Status: Online</span>
        </div>
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
