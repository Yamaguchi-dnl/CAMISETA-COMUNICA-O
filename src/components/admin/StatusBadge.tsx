'use client';

import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Pago':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Em produção':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Enviado':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Concluído':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Cancelado':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Pendente WhatsApp':
      case 'Pendente':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <span className={cn(
      "px-3 py-1 text-[9px] font-bold uppercase tracking-[0.1em] border rounded-full",
      getStatusStyles()
    )}>
      {status}
    </span>
  );
}
