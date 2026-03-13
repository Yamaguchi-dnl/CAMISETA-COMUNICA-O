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

export function AdminSidebar() {
  const pathname = usePathname();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  return (
    <aside className="w-72 bg-black text-white flex flex-col hidden lg:flex">
      <div className="p-10 mb-8 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <Package className="h-4 w-4 text-white" />
          </div>
          <span className="font-headline text-2xl uppercase tracking-wider">IAP ADMIN</span>
        </div>
        <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">Painel de Gestão</p>
      </div>

      <nav className="flex-1 px-6 space-y-2">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-6 py-4 transition-all uppercase tracking-widest text-[11px] font-bold",
              pathname.startsWith(item.href)
                ? "bg-accent text-white"
                : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-8 mt-auto border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-6 py-4 w-full text-white/60 hover:text-accent transition-colors uppercase tracking-widest text-[11px] font-bold"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
