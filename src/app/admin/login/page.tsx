'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Bem-vindo!",
        description: "Login realizado com sucesso.",
      });
      router.push('/admin/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Credenciais inválidas ou sem permissão.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-none bg-white">
        <CardHeader className="space-y-4 bg-black text-white p-8">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
            <Lock className="text-white h-6 w-6" />
          </div>
          <div className="text-center">
            <CardTitle className="font-headline text-4xl uppercase tracking-wider">Admin Portal</CardTitle>
            <CardDescription className="text-white/60 font-body uppercase text-[10px] tracking-widest font-bold">
              IAP Barreirinha - Ministério de Comunicação
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold tracking-[0.15em] text-[#111111] uppercase">Email</Label>
              <Input 
                type="email" 
                placeholder="admin@exemplo.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-none border-0 border-b border-[#d7d1ca] focus-visible:ring-0 focus-visible:border-black transition-colors px-0 h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold tracking-[0.15em] text-[#111111] uppercase">Senha</Label>
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-none border-0 border-b border-[#d7d1ca] focus-visible:ring-0 focus-visible:border-black transition-colors px-0 h-12"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-14 bg-black hover:bg-accent text-white rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all"
              disabled={isLoading}
            >
              {isLoading ? 'ENTRANDO...' : 'ACESSAR PAINEL'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
