'use client';

import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import { OrderTable } from '@/components/admin/OrderTable';
import { Input } from '@/components/ui/input';
import { useState, useMemo } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { exportOrdersToCSV } from '@/lib/admin-utils';

export default function OrdersPage() {
  const db = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const ordersQuery = useMemo(() => query(collection(db, 'orders'), orderBy('createdAt', 'desc')), [db]);
  const { data: orders, isLoading } = useCollection(ordersQuery);

  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    return orders.filter(order => {
      const matchesSearch = 
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerWhatsapp.includes(searchTerm);
      
      const matchesStatus = statusFilter === 'Todos' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const handleExport = () => {
    exportOrdersToCSV(filteredOrders);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-headline text-5xl uppercase tracking-tight text-[#111111] mb-2">Gerenciamento de Pedidos</h1>
          <p className="text-[#6f6a63] font-medium text-sm">Acompanhe e atualize as reservas</p>
        </div>
        <Button onClick={handleExport} className="bg-black hover:bg-accent text-white rounded-full font-bold uppercase tracking-[0.15em] text-[10px] h-12 px-8">
          <Download className="mr-2 h-4 w-4" /> Exportar Lista
        </Button>
      </div>

      <div className="bg-white border border-[#d7d1ca] p-6 lg:p-8 space-y-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#d7d1ca]" />
            <Input 
              placeholder="Buscar por nome, ID ou WhatsApp..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 rounded-none border-[#d7d1ca] focus-visible:ring-black h-12"
            />
          </div>
          <div className="w-full md:w-64">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-12 rounded-none border border-[#d7d1ca] bg-white px-4 text-sm font-medium focus:outline-none focus:border-black"
            >
              <option value="Todos">Todos os Status</option>
              <option value="Pendente WhatsApp">Pendente WhatsApp</option>
              <option value="Pago">Pago</option>
              <option value="Em produção">Em produção</option>
              <option value="Enviado">Enviado</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        <div className="border border-[#d7d1ca] overflow-hidden">
          {isLoading ? (
            <div className="p-20 text-center text-[#6f6a63] font-medium animate-pulse">Carregando pedidos...</div>
          ) : (
            <OrderTable orders={filteredOrders} />
          )}
        </div>
      </div>
    </div>
  );
}
