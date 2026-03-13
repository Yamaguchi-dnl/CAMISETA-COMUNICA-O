'use client';

import Link from 'next/link';
import { StatusBadge } from './StatusBadge';
import { Eye, ExternalLink, Image as ImageIcon, FileText } from 'lucide-react';

interface OrderTableProps {
  orders: any[];
}

export function OrderTable({ orders }: OrderTableProps) {
  if (orders.length === 0) {
    return (
      <div className="p-20 text-center">
        <p className="text-[#6f6a63] font-medium uppercase tracking-widest text-sm">Nenhum pedido encontrado.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#fafafa] border-b border-[#d7d1ca]">
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#6f6a63]">ID Pedido</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#6f6a63]">Cliente</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#6f6a63]">Itens</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#6f6a63]">Total</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#6f6a63]">Status</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#6f6a63]">Data</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#6f6a63] text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f0f0f0]">
          {orders.map((order) => {
            const isPdf = order.receiptUrl?.startsWith('data:application/pdf') || order.receiptUrl?.toLowerCase().endsWith('.pdf');
            
            return (
              <tr key={order.id} className="hover:bg-[#fcfcfc] transition-colors group">
                <td className="px-6 py-5">
                  <span className="text-[11px] font-bold text-[#6f6a63] font-mono">#{order.id.substring(0, 8)}</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-black uppercase tracking-tight">{order.customerName}</span>
                      {order.receiptUrl && (
                        isPdf 
                          ? <FileText className="h-3.5 w-3.5 text-blue-600" title="Possui comprovante PDF" />
                          : <ImageIcon className="h-3.5 w-3.5 text-green-600" title="Possui comprovante Imagem" />
                      )}
                    </div>
                    <span className="text-[10px] font-medium text-[#6f6a63]">{order.customerWhatsapp}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-[11px] font-bold text-black uppercase tracking-tighter">
                    {order.quantity} {order.quantity === 1 ? 'PEÇA' : 'PEÇAS'}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm font-bold text-black">R$ {order.totalAmount?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </td>
                <td className="px-6 py-5">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-5">
                  <span className="text-[11px] font-bold text-[#6f6a63] uppercase tracking-tight">
                    {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-3">
                    <Link 
                      href={`/admin/pedidos/${order.id}`}
                      className="p-2 hover:bg-black hover:text-white transition-all border border-[#d7d1ca]"
                      title="Ver Detalhes"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <a 
                      href={`https://wa.me/${order.customerWhatsapp.replace(/\D/g, '')}`} 
                      target="_blank"
                      className="p-2 hover:bg-green-600 hover:text-white transition-all border border-[#d7d1ca]"
                      title="Chamar WhatsApp"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
