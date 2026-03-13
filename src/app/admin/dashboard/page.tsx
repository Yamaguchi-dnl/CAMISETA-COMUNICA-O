'use client';

import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Clock, CheckCircle, Truck, XCircle, DollarSign } from 'lucide-react';
import { OrderTable } from '@/components/admin/OrderTable';
import { useMemo } from 'react';

export default function DashboardPage() {
  const db = useFirestore();
  const ordersQuery = useMemo(() => query(collection(db, 'orders'), orderBy('createdAt', 'desc')), [db]);
  const { data: orders, isLoading } = useCollection(ordersQuery);

  const stats = useMemo(() => {
    if (!orders) return null;
    
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'Pendente WhatsApp' || o.status === 'Pendente').length,
      paid: orders.filter(o => o.status === 'Pago').length,
      shipped: orders.filter(o => o.status === 'Enviado').length,
      completed: orders.filter(o => o.status === 'Concluído').length,
      totalAmount: orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0)
    };
  }, [orders]);

  if (isLoading) return <div className="animate-pulse space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1,2,3,4].map(i => <div key={i} className="h-32 bg-white border border-[#d7d1ca]" />)}
    </div>
    <div className="h-[400px] bg-white border border-[#d7d1ca]" />
  </div>;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-headline text-5xl uppercase tracking-tight text-[#111111] mb-2">Painel de Controle</h1>
        <p className="text-[#6f6a63] font-medium text-sm">Visão geral do Ministério de Comunicação</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard label="Total Pedidos" value={stats?.total || 0} icon={ShoppingBag} color="text-black" />
        <StatCard label="Pendentes" value={stats?.pending || 0} icon={Clock} color="text-amber-600" />
        <StatCard label="Pagos" value={stats?.paid || 0} icon={CheckCircle} color="text-green-600" />
        <StatCard label="Enviados" value={stats?.shipped || 0} icon={Truck} color="text-blue-600" />
        <StatCard label="Concluídos" value={stats?.completed || 0} icon={CheckCircle} color="text-indigo-600" />
        <StatCard label="Receita Bruta" value={`R$ ${stats?.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} icon={DollarSign} color="text-black" />
      </div>

      <div className="bg-white border border-[#d7d1ca] overflow-hidden">
        <div className="p-8 border-b border-[#d7d1ca] flex justify-between items-center">
          <h2 className="font-headline text-2xl uppercase tracking-wide">Pedidos Recentes</h2>
        </div>
        <OrderTable orders={orders?.slice(0, 5) || []} />
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string, value: string | number, icon: any, color: string }) {
  return (
    <Card className="rounded-none border-[#d7d1ca] shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-[10px] font-bold tracking-[0.1em] text-[#6f6a63] uppercase">{label}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-headline uppercase tracking-tight">{value}</div>
      </CardContent>
    </Card>
  );
}
