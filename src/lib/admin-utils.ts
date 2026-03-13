/**
 * Exporta uma lista de pedidos para CSV.
 */
export function exportOrdersToCSV(orders: any[]) {
  if (orders.length === 0) return;

  const headers = [
    'ID Pedido',
    'Data',
    'Cliente',
    'WhatsApp',
    'Quantidade',
    'Itens',
    'Pagamento',
    'Valor Total',
    'Status',
    'Observacoes'
  ];

  const rows = orders.map(order => {
    const itemsDescription = order.items?.map((item: any) => 
      `${item.produto} (${item.tamanho})`
    ).join(' | ');

    return [
      order.id,
      new Date(order.createdAt).toLocaleDateString('pt-BR'),
      order.customerName,
      order.customerWhatsapp,
      order.quantity,
      `"${itemsDescription}"`,
      order.paymentMethod,
      order.totalAmount.toString().replace('.', ','),
      order.status,
      `"${order.notes || ''}"`
    ];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Adiciona BOM para suporte a acentos no Excel
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const dateStr = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `pedidos-iap-camisetas-${dateStr}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
