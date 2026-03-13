'use client';

import { useState, useMemo } from 'react';
import { collection, query, orderBy, where } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, FileText, Table as TableIcon, Filter, AlertCircle } from 'lucide-react';
import { exportOrdersToCSV } from '@/lib/admin-utils';
import { useToast } from '@/hooks/use-toast';

export default function ExportPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const [status, setStatus] = useState('Todos');
  const [period, setPeriod] = useState('Total');

  const ordersQuery = useMemo(() => query(collection(db, 'orders'), orderBy('createdAt', 'desc')), [db]);
  const { data: orders, isLoading } = useCollection(ordersQuery);

  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    return orders.filter(o => {
      const matchesStatus = status === 'Todos' || o.status === status;
      // Lógica de período poderia ser adicionada aqui
      return matchesStatus;
    });
  }, [orders, status]);

  const handleExport = () => {
    if (filteredOrders.length === 0) {
      toast({ variant: "destructive", title: "Nenhum pedido", description: "Não há pedidos com esses filtros para exportar." });
      return;
    }
    exportOrdersToCSV(filteredOrders);
    toast({ title: "Exportação Concluída", description: `${filteredOrders.length} pedidos exportados para CSV.` });
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-headline text-5xl uppercase tracking-tight text-[#111111] mb-2">Exportações</h1>
        <p className="text-[#6f6a63] font-medium text-sm">Gere relatórios para produção e financeiro</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="rounded-none border-[#d7d1ca] shadow-sm bg-white">
          <CardHeader className="p-8 border-b border-[#f5f3ef]">
            <CardTitle className="text-[12px] font-bold tracking-[0.15em] uppercase flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filtros de Exportação
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#6f6a63]">Status do Pedido</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-12 border border-[#d7d1ca] bg-white px-4 text-sm focus:outline-none focus:border-black"
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

            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#6f6a63]">Período</label>
              <select 
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full h-12 border border-[#d7d1ca] bg-white px-4 text-sm focus:outline-none focus:border-black"
              >
                <option value="Total">Todo o Período</option>
                <option value="30">Últimos 30 dias</option>
                <option value="7">Últimos 7 dias</option>
                <option value="Hoje">Hoje</option>
              </select>
            </div>

            <div className="pt-6">
              <Button 
                onClick={handleExport}
                className="w-full h-14 bg-black hover:bg-accent text-white rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3"
                disabled={isLoading}
              >
                <Download className="h-4 w-4" /> GERAR CSV AGORA
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-[#d7d1ca] shadow-sm bg-[#fafafa]">
          <CardHeader className="p-8">
            <CardTitle className="text-[12px] font-bold tracking-[0.15em] uppercase flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Informações
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white border border-[#d7d1ca] flex items-center justify-center shrink-0">
                <FileText className="h-4 w-4 text-black" />
              </div>
              <div>
                <p className="text-sm font-bold text-black mb-1">Formato de Saída</p>
                <p className="text-xs text-[#6f6a63] leading-relaxed">
                  Os dados são exportados em formato .CSV (valores separados por vírgula), compatível com Excel, Google Sheets e softwares de produção.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white border border-[#d7d1ca] flex items-center justify-center shrink-0">
                <TableIcon className="h-4 w-4 text-black" />
              </div>
              <div>
                <p className="text-sm font-bold text-black mb-1">Conteúdo do Relatório</p>
                <p className="text-xs text-[#6f6a63] leading-relaxed">
                  O arquivo contém: Nome, WhatsApp, Detalhes dos Itens (Cor/Tamanho), Valor Total, Status e Data da Reserva.
                </p>
              </div>
            </div>
            <div className="mt-10 p-6 bg-white border border-[#d7d1ca]">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-black mb-2">Pedidos Encontrados:</p>
              <p className="font-headline text-5xl leading-none text-black">{filteredOrders.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
