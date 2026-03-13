'use client';

import { use, useState, useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { useFirestore, useDoc, useMemoFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Phone, Package, Calendar, CreditCard, StickyNote, CheckCircle, PackageCheck, Image as ImageIcon, X, Upload, ExternalLink, AlertCircle, FileText } from 'lucide-react';
import Link from 'next/link';
import { StatusBadge } from '@/components/admin/StatusBadge';

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const db = useFirestore();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const orderRef = useMemoFirebase(() => doc(db, 'orders', id), [db, id]);
  const { data: order, isLoading } = useDoc(orderRef);
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkInput, setLinkInput] = useState('');

  const isPdf = order?.receiptUrl?.startsWith('data:application/pdf') || order?.receiptUrl?.toLowerCase().endsWith('.pdf');

  const handleStatusChange = async (newStatus: string) => {
    if (!order) return;
    setIsUpdating(true);
    try {
      await updateDoc(doc(db, 'orders', id), { status: newStatus });
      toast({ title: "Status Atualizado", description: `Pedido marcado como ${newStatus}.` });
    } catch (error) {
      toast({ variant: "destructive", title: "Erro ao atualizar", description: "Tente novamente." });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !order) return;

    // Limite de 800KB para persistência em Base64 no Firestore
    if (file.size > 800 * 1024) {
      toast({
        variant: "destructive",
        title: "Arquivo muito grande",
        description: "Por favor, anexe um arquivo de até 800KB.",
      });
      return;
    }

    setIsUpdating(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      const data = { receiptUrl: base64String };
      
      updateDoc(doc(db, 'orders', id), data)
        .then(() => {
          toast({ title: "Arquivo Anexado", description: "O comprovante foi salvo com sucesso." });
        })
        .catch(async (error) => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: `orders/${id}`,
            operation: 'update',
            requestResourceData: data,
          }));
        })
        .finally(() => setIsUpdating(false));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveLink = async () => {
    if (!order || !linkInput.trim()) return;
    setIsUpdating(true);
    const data = { receiptUrl: linkInput.trim() };
    
    updateDoc(doc(db, 'orders', id), data)
      .then(() => {
        toast({ title: "Link Salvo", description: "O comprovante foi anexado via link." });
        setShowLinkInput(false);
        setLinkInput('');
      })
      .catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: `orders/${id}`,
          operation: 'update',
          requestResourceData: data,
        }));
      })
      .finally(() => setIsUpdating(false));
  };

  const handleRemoveReceipt = async () => {
    if (!order) return;
    setIsUpdating(true);
    try {
      await updateDoc(doc(db, 'orders', id), { receiptUrl: null });
      toast({ title: "Comprovante Removido", description: "O anexo foi removido do pedido." });
    } catch (error) {
      toast({ variant: "destructive", title: "Erro ao remover", description: "Tente novamente." });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <div className="p-20 text-center animate-pulse text-[#6f6a63] font-bold uppercase tracking-widest text-sm">Carregando detalhes...</div>;
  if (!order) return <div className="p-20 text-center text-[#6f6a63] font-bold uppercase tracking-widest text-sm">Pedido não encontrado.</div>;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <Link href="/admin/pedidos" className="flex items-center gap-2 text-[#6f6a63] font-bold text-[10px] uppercase tracking-widest hover:text-black transition-colors">
          <ChevronLeft className="h-4 w-4" /> Voltar para lista
        </Link>
        
        <div className="flex flex-wrap gap-3">
          <select 
            className="h-10 border border-[#d7d1ca] rounded-none px-4 text-[10px] font-bold uppercase tracking-wider bg-white focus:outline-none focus:border-black disabled:opacity-50"
            value={order.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isUpdating}
          >
            <option value="Pendente WhatsApp">Pendente WhatsApp</option>
            <option value="Pago">Pago</option>
            <option value="Em produção">Em produção</option>
            <option value="Enviado">Enviado</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-[#d7d1ca] p-8 lg:p-12">
            <div className="flex justify-between items-start mb-12 border-b border-[#f0f0f0] pb-8">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#6f6a63] uppercase mb-2 block">Pedido #{order.id.substring(0, 8)}</span>
                <h2 className="font-headline text-5xl uppercase tracking-tight">{order.customerName}</h2>
              </div>
              <StatusBadge status={order.status} />
            </div>

            <div className="space-y-10">
              <section>
                <h3 className="text-[11px] font-bold tracking-[0.15em] text-[#111111] uppercase mb-6 flex items-center gap-2">
                  <Package className="h-4 w-4" /> Itens do Pedido
                </h3>
                <div className="space-y-4">
                  {order.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center p-6 border border-[#f0f0f0] bg-[#fafafa]">
                      <div>
                        <p className="font-bold text-black uppercase tracking-tight text-sm">Camiseta {item.produto}</p>
                        <p className="text-xs text-[#6f6a63] mt-1 font-medium">Tamanho: <span className="text-black">{item.tamanho}</span></p>
                      </div>
                      <div className="text-right">
                        <p className="font-headline text-2xl text-black">1 UN</p>
                        {item.tamanho === 'XGG' && <p className="text-[9px] font-bold text-accent uppercase tracking-tighter">+ R$ 3,00 (Acréscimo XGG)</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {order.notes && (
                <section>
                  <h3 className="text-[11px] font-bold tracking-[0.15em] text-[#111111] uppercase mb-4 flex items-center gap-2">
                    <StickyNote className="h-4 w-4" /> Observações do Cliente
                  </h3>
                  <div className="p-6 border border-[#d7d1ca] bg-[#fdfbf7] text-sm text-[#4f4f4f] italic leading-relaxed">
                    {order.notes}
                  </div>
                </section>
              )}
            </div>
          </div>

          <section className="bg-white border border-[#d7d1ca] p-8 lg:p-12">
            <h3 className="text-[11px] font-bold tracking-[0.15em] text-[#111111] uppercase mb-8 flex items-center gap-2">
              <ImageIcon className="h-4 w-4" /> Comprovante de Pagamento
            </h3>

            {order.receiptUrl ? (
              <div className="space-y-8">
                <div className="flex items-center justify-between p-6 bg-[#f5f3ef] border border-[#d7d1ca]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white flex items-center justify-center border border-[#d7d1ca]">
                      {isPdf ? <FileText className="h-5 w-5 text-black" /> : <ImageIcon className="h-5 w-5 text-black" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-[#6f6a63] uppercase tracking-wider mb-1">
                        {isPdf ? 'Comprovante em PDF' : 'Comprovante Imagem'}
                      </p>
                      <button 
                        onClick={() => window.open(order.receiptUrl, '_blank')}
                        className="text-sm font-bold text-black hover:text-accent underline underline-offset-4 decoration-[#d7d1ca] truncate block max-w-md text-left"
                      >
                        Abrir Documento Original
                      </button>
                    </div>
                  </div>
                  <Button 
                    variant="ghost"
                    onClick={handleRemoveReceipt}
                    disabled={isUpdating}
                    className="text-red-600 hover:bg-red-50 rounded-none h-10 w-10 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {isPdf ? (
                  <div className="p-12 border border-[#d7d1ca] bg-[#fafafa] flex flex-col items-center justify-center text-center">
                    <FileText className="h-16 w-16 text-[#d7d1ca] mb-4" />
                    <p className="text-[10px] font-bold text-[#6f6a63] uppercase tracking-widest mb-6">Documento PDF anexado</p>
                    <Button 
                      onClick={() => window.open(order.receiptUrl, '_blank')}
                      className="bg-black text-white rounded-none font-bold uppercase tracking-wider text-[10px] h-12 px-10 hover:bg-accent transition-colors"
                    >
                      VISUALIZAR PDF COMPLETO
                    </Button>
                  </div>
                ) : (
                  <div className="relative w-full border border-[#d7d1ca] overflow-hidden bg-[#fafafa] flex justify-center">
                     <img 
                       src={order.receiptUrl} 
                       alt="Comprovante" 
                       className="max-w-full h-auto max-h-[800px] object-contain"
                     />
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {!showLinkInput ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer text-center p-12 border-2 border-dashed border-[#d7d1ca] bg-[#fafafa] hover:bg-[#f5f3ef] transition-colors group"
                    >
                      <Upload className="h-12 w-12 text-[#d7d1ca] group-hover:text-black mx-auto mb-4 transition-colors" />
                      <p className="text-[10px] text-[#6f6a63] font-bold uppercase tracking-widest">Anexar Imagem ou PDF</p>
                      <input 
                        type="file" 
                        className="hidden" 
                        ref={fileInputRef} 
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div 
                      onClick={() => setShowLinkInput(true)}
                      className="cursor-pointer text-center p-12 border-2 border-dashed border-[#d7d1ca] bg-[#fafafa] hover:bg-[#f5f3ef] transition-colors group"
                    >
                      <ExternalLink className="h-12 w-12 text-[#d7d1ca] group-hover:text-black mx-auto mb-4 transition-colors" />
                      <p className="text-[10px] text-[#6f6a63] font-bold uppercase tracking-widest">Anexar via Link</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 border border-black space-y-4 animate-in fade-in duration-300">
                    <label className="text-[10px] font-bold text-[#6f6a63] uppercase tracking-widest block">Cole o link do arquivo (Imagem ou PDF)</label>
                    <div className="flex gap-3">
                      <Input 
                        placeholder="https://..." 
                        value={linkInput}
                        onChange={(e) => setLinkInput(e.target.value)}
                        className="rounded-none border-[#d7d1ca] focus-visible:ring-black flex-1 h-12"
                      />
                      <Button 
                        onClick={handleSaveLink}
                        disabled={isUpdating || !linkInput.trim()}
                        className="bg-black hover:bg-accent text-white rounded-none font-bold uppercase tracking-wider text-[10px] h-12 px-6"
                      >
                        SALVAR
                      </Button>
                      <Button 
                        variant="ghost"
                        onClick={() => setShowLinkInput(false)}
                        className="rounded-none h-12 px-4"
                      >
                        CANCELAR
                      </Button>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100">
                  <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                  <p className="text-[10px] text-amber-800 font-medium italic">Dica: Você pode anexar tanto fotos quanto documentos em PDF de até 800KB.</p>
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white border border-black p-8">
            <h3 className="text-[11px] font-bold tracking-[0.15em] text-[#111111] uppercase mb-6">Ações Rápidas</h3>
            <div className="space-y-3">
              <Button 
                onClick={() => handleStatusChange('Pago')}
                disabled={isUpdating || order.status === 'Pago'}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-none font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-2"
              >
                <CheckCircle className="h-4 w-4" /> VALIDAR PAGAMENTO
              </Button>
              <Button 
                onClick={() => handleStatusChange('Concluído')}
                disabled={isUpdating || order.status === 'Concluído'}
                className="w-full h-12 bg-black hover:bg-accent text-white rounded-none font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-2"
              >
                <PackageCheck className="h-4 w-4" /> CONFIRMAR ENTREGA
              </Button>
            </div>
          </section>

          <section className="bg-white border border-[#d7d1ca] p-8">
            <h3 className="text-[11px] font-bold tracking-[0.15em] text-[#111111] uppercase mb-6">Informações do Cliente</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#f5f3ef] flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-black" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-[#6f6a63] uppercase tracking-wider mb-1">WhatsApp</p>
                  <a href={`https://wa.me/${order.customerWhatsapp.replace(/\D/g, '')}`} target="_blank" className="text-sm font-bold text-black hover:text-accent underline underline-offset-4 decoration-[#d7d1ca]">
                    {order.customerWhatsapp}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#f5f3ef] flex items-center justify-center shrink-0">
                  <Calendar className="h-4 w-4 text-black" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-[#6f6a63] uppercase tracking-wider mb-1">Data da Reserva</p>
                  <p className="text-sm font-bold text-black">
                    {new Date(order.createdAt).toLocaleDateString('pt-BR')} às {new Date(order.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#f5f3ef] flex items-center justify-center shrink-0">
                  <CreditCard className="h-4 w-4 text-black" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-[#6f6a63] uppercase tracking-wider mb-1">Forma de Pagamento</p>
                  <p className="text-sm font-bold text-black uppercase tracking-tight">{order.paymentMethod}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-black text-white p-8">
            <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase mb-8">Resumo Financeiro</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm text-white/70">
                <span>Subtotal Itens</span>
                <span>R$ {order.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                <span className="text-white/40">Status de Pagamento</span>
                <span className={order.status === 'Pago' || order.status === 'Concluído' ? 'text-green-400' : 'text-amber-400'}>
                  {order.status === 'Pago' || order.status === 'Concluído' ? 'PAGO' : 'AGUARDANDO'}
                </span>
              </div>
            </div>
            <div className="border-t border-white/10 pt-6 flex justify-between items-end">
              <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-white/50 mb-1">Valor Total</span>
              <span className="font-headline text-5xl leading-none">R$ {order.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
