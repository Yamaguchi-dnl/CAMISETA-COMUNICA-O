'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Download, Settings, LogOut, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

const MENU_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Pedidos', href: '/admin/pedidos', icon: ShoppingBag },
  { label: 'Exportações', href: '/admin/exportacoes', icon: Download },
  { label: 'Configurações', href: '/admin/configuracoes', icon: Settings },
];

interface AdminSidebarProps {
  isCollapsed?: boolean;
}

export function AdminSidebar({ isCollapsed = false }: AdminSidebarProps) {
  const pathname = usePathname();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  return (
    <aside 
      className={cn(
        "bg-black text-white flex flex-col hidden lg:flex transition-all duration-300 ease-in-out border-r border-white/10",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      <div className={cn(
        "p-6 mb-8 border-b border-white/10 overflow-hidden transition-all duration-300",
        isCollapsed ? "items-center justify-center flex flex-col h-32" : "p-10"
      )}>
        <div className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "mb-2")}>
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center shrink-0">
            <Package className="h-4 w-4 text-white" />
          </div>
          {!isCollapsed && (
            <span className="font-headline text-2xl uppercase tracking-wider whitespace-nowrap animate-in fade-in duration-300">
              IAP ADMIN
            </span>
          )}
        </div>
        {!isCollapsed && (
          <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] whitespace-nowrap animate-in fade-in duration-300">
            Painel de Gestão
          </p>
        )}
      </div>

      <nav className={cn("flex-1 space-y-2", isCollapsed ? "px-2" : "px-6")}>
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center transition-all uppercase tracking-widest text-[11px] font-bold h-12",
              isCollapsed ? "justify-center rounded-md" : "px-6 gap-4",
              pathname.startsWith(item.href)
                ? "bg-accent text-white"
                : "text-white/60 hover:text-white hover:bg-white/5"
            )}
            title={isCollapsed ? item.label : ""}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!isCollapsed && (
              <span className="whitespace-nowrap animate-in fade-in duration-300">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>

      <div className={cn("mt-auto border-t border-white/10", isCollapsed ? "p-2" : "p-8")}>
        <button 
          onClick={handleLogout}
          className={cn(
            "flex items-center transition-colors uppercase tracking-widest text-[11px] font-bold h-12 w-full",
            isCollapsed ? "justify-center rounded-md" : "px-6 gap-4",
            "text-white/60 hover:text-accent"
          )}
          title={isCollapsed ? "Logout" : ""}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!isCollapsed && (
            <span className="whitespace-nowrap animate-in fade-in duration-300">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
}
