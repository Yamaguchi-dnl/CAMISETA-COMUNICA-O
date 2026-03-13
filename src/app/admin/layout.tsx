'use client';

import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AuthGuard } from '@/components/admin/AuthGuard';
import { Toaster } from '@/components/ui/toaster';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  // Se for página de login, renderiza sem o layout do dashboard
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] font-body text-black relative z-[2000]">
        {children}
        <Toaster />
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#f5f3ef] font-body text-black relative z-[2000]">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminTopbar />
          <main className="flex-1 p-6 lg:p-10 overflow-auto">
            {children}
          </main>
        </div>
        <Toaster />
      </div>
    </AuthGuard>
  );
}
