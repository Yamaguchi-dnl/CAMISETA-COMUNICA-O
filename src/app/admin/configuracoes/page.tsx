'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Settings, Shield, Bell } from 'lucide-react';
import { useUser } from '@/firebase';

export default function SettingsPage() {
  const { user } = useUser();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-headline text-5xl uppercase tracking-tight text-[#111111] mb-2">Configurações</h1>
        <p className="text-[#6f6a63] font-medium text-sm">Gerencie sua conta e preferências</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="rounded-none border-[#d7d1ca] shadow-sm bg-white">
          <CardHeader className="p-8 border-b border-[#f5f3ef]">
            <CardTitle className="text-[12px] font-bold tracking-[0.15em] uppercase flex items-center gap-2">
              <User className="h-4 w-4" /> Perfil Admin
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="space-y-6">
              <div>
                <label className="text-[9px] font-bold uppercase tracking-widest text-[#6f6a63] block mb-2">E-mail de Acesso</label>
                <p className="text-sm font-bold text-black border-b border-[#f0f0f0] pb-2">{user?.email}</p>
              </div>
              <div>
                <label className="text-[9px] font-bold uppercase tracking-widest text-[#6f6a63] block mb-2">Nível de Acesso</label>
                <p className="text-sm font-bold text-black border-b border-[#f0f0f0] pb-2 uppercase tracking-tight">Administrador Geral</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-[#d7d1ca] shadow-sm bg-[#fafafa]">
          <CardHeader className="p-8 border-b border-[#f5f3ef]">
            <CardTitle className="text-[12px] font-bold tracking-[0.15em] uppercase flex items-center gap-2">
              <Shield className="h-4 w-4" /> Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="p-6 bg-white border border-[#d7d1ca]">
              <p className="text-xs text-[#6f6a63] leading-relaxed italic">
                Para alterar sua senha ou gerenciar outros administradores, utilize o console do Firebase ou solicite ao suporte técnico do ministério.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
