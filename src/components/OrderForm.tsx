"use client"

import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Minus, Plus, CreditCard, Smartphone } from 'lucide-react';
import { doc, setDoc, collection } from 'firebase/firestore';
import { useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  nome: z.string().min(3, { message: 'Por favor, informe seu nome completo.' }),
  whatsapp: z.string().min(10, { message: 'Informe um WhatsApp válido.' }),
  produto: z.string({ required_error: 'Selecione o produto.' }),
  tamanho: z.string({ required_error: 'Selecione um tamanho.' }),
  quantidade: z.number().min(1, { message: 'Mínimo 1 unidade.' }),
  pagamento: z.enum(['pix', 'credito'], { required_error: 'Selecione a forma de pagamento.' }),
  observacoes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const db = useFirestore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      whatsapp: '',
      produto: '',
      tamanho: '',
      quantidade: 1,
      pagamento: 'pix',
      observacoes: '',
    },
  });

  const watchedValues = useWatch({ control: form.control });
  
  const [summary, setSummary] = useState({
    unitPrice: 74.90,
    quantity: 1,
    isPix: true,
    isKit: false,
    total: 74.90
  });

  useEffect(() => {
    const qty = Number(watchedValues.quantidade) || 1;
    const isPix = watchedValues.pagamento === 'pix';
    
    let total = 0;
    let unit = 0;
    let kitActive = false;

    if (isPix) {
      if (qty >= 2) {
        // Lógica de Kit: 2 por 139.90 (69.95 cada)
        unit = 69.95;
        kitActive = true;
      } else {
        unit = 74.90;
      }
    } else {
      // Crédito: 79.90 fixo por unidade
      unit = 79.90;
    }

    total = unit * qty;

    setSummary({
      unitPrice: unit,
      quantity: qty,
      isPix: isPix,
      isKit: kitActive,
      total: total
    });
  }, [watchedValues.quantidade, watchedValues.pagamento]);

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    
    const orderRef = doc(collection(db, "orders"));
    const orderId = orderRef.id;

    const orderData = {
      id: orderId,
      productId: values.produto,
      customerName: values.nome,
      customerWhatsapp: values.whatsapp,
      selectedSize: values.tamanho,
      quantity: values.quantidade,
      paymentMethod: values.pagamento === 'pix' ? 'Pix' : 'Crédito',
      notes: values.observacoes || '',
      createdAt: new Date().toISOString(),
      status: 'Pendente WhatsApp',
      totalAmount: summary.total
    };

    setDoc(orderRef, orderData)
      .catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: `orders/${orderId}`,
          operation: 'create',
          requestResourceData: orderData
        }));
      });

    const phoneNumber = '5541996692392'; 
    
    const message = `Olá! Quero reservar minha camiseta da IAP Barreirinha.

*Dados do Pedido:*
- *Nome:* ${values.nome}
- *WhatsApp:* ${values.whatsapp}
- *Produto:* ${values.produto}
- *Tamanho:* ${values.tamanho}
- *Quantidade:* ${values.quantidade}
- *Pagamento:* ${values.pagamento === 'pix' ? 'Pix (Desconto aplicado)' : 'Crédito (3x s/ juros)'}
- *Total Estimado:* R$ ${summary.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

*Observações:* ${values.observacoes || 'Nenhuma'}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    toast({
      title: "Reserva Iniciada!",
      description: "Abrindo o WhatsApp para finalizar...",
    });

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
    }, 800);
  }

  return (
    <div className="max-w-[840px] mx-auto overflow-hidden shadow-2xl bg-white">
      {/* Header Escuro Estilo Editorial */}
      <div className="bg-[#050505] p-10 lg:p-16 text-white">
        <span className="text-[10px] lg:text-[12px] font-bold tracking-[0.2em] text-[#6f6a63] uppercase mb-4 block">
          FAÇA SUA RESERVA
        </span>
        <h2 className="font-headline text-[clamp(48px,8vw,86px)] leading-[0.9] uppercase mb-8">
          RESERVE SUA <br /> CAMISETA
        </h2>
        <p className="text-[11px] lg:text-[13px] font-medium text-white/70 tracking-tight leading-relaxed">
          R$ 74,90 no Pix &middot; R$ 79,90 no crédito (até 3x sem juros) &middot; Kit com 2 por R$ 139,90 no Pix
        </p>
      </div>

      {/* Corpo do Formulário */}
      <div className="p-8 lg:p-16 bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            
            {/* Grid de Campos Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold tracking-[0.15em] text-[#111111] uppercase">NOME COMPLETO *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Como podemos te chamar?" 
                        className="rounded-none border-0 border-b border-[#d7d1ca] bg-transparent h-14 px-0 focus-visible:ring-0 focus-visible:border-black transition-colors placeholder:text-[#d7d1ca]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold tracking-[0.15em] text-[#111111] uppercase">WHATSAPP *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="(00) 00000-0000" 
                        className="rounded-none border-0 border-b border-[#d7d1ca] bg-transparent h-14 px-0 focus-visible:ring-0 focus-visible:border-black transition-colors placeholder:text-[#d7d1ca]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="produto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold tracking-[0.15em] text-[#111111] uppercase">PRODUTO *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-none border-0 border-b border-[#d7d1ca] bg-transparent h-14 px-0 focus:ring-0 focus:border-black transition-colors">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none border-[#d7d1ca] bg-white">
                        <SelectItem value="Camiseta Comunicação Preta">Camiseta Preta</SelectItem>
                        <SelectItem value="Camiseta Comunicação Off-White">Camiseta Off-White</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tamanho"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold tracking-[0.15em] text-[#111111] uppercase">TAMANHO *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-none border-0 border-b border-[#d7d1ca] bg-transparent h-14 px-0 focus:ring-0 focus:border-black transition-colors">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none border-[#d7d1ca] bg-white">
                        {['PP', 'P', 'M', 'G', 'GG', 'XGG'].map(size => (
                          <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Seletor de Quantidade Customizado */}
            <FormField
              control={form.control}
              name="quantidade"
              render={({ field }) => (
                <FormItem className="max-w-[140px]">
                  <FormLabel className="text-[10px] font-bold tracking-[0.15em] text-[#111111] uppercase">QUANTIDADE *</FormLabel>
                  <div className="flex items-center border border-[#d7d1ca] bg-white h-12">
                    <button 
                      type="button"
                      onClick={() => field.onChange(Math.max(1, field.value - 1))}
                      className="w-12 h-full flex items-center justify-center hover:bg-black/5 transition-colors border-r border-[#d7d1ca]"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <div className="flex-1 text-center font-bold text-sm">
                      {field.value}
                    </div>
                    <button 
                      type="button"
                      onClick={() => field.onChange(field.value + 1)}
                      className="w-12 h-full flex items-center justify-center hover:bg-black/5 transition-colors border-l border-[#d7d1ca]"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Toggle de Pagamento Estilizado */}
            <FormField
              control={form.control}
              name="pagamento"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-[10px] font-bold tracking-[0.15em] text-[#111111] uppercase">FORMA DE PAGAMENTO *</FormLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => field.onChange('pix')}
                      className={cn(
                        "flex items-center justify-center gap-3 h-14 border transition-all text-xs font-bold uppercase tracking-wider",
                        field.value === 'pix' 
                          ? "bg-black text-white border-black" 
                          : "bg-white text-black border-[#d7d1ca] hover:border-black"
                      )}
                    >
                      <Smartphone className="h-4 w-4" />
                      Pix (6% desconto)
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange('credito')}
                      className={cn(
                        "flex items-center justify-center gap-3 h-14 border transition-all text-xs font-bold uppercase tracking-wider",
                        field.value === 'credito' 
                          ? "bg-black text-white border-black" 
                          : "bg-white text-black border-[#d7d1ca] hover:border-black"
                      )}
                    >
                      <CreditCard className="h-4 w-4" />
                      Crédito (3x s/ juros)
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Observações */}
            <FormField
              control={form.control}
              name="observacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold tracking-[0.15em] text-[#111111] uppercase">OBSERVAÇÕES</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Algum detalhe específico? Ex: tamanhos diferentes no kit..." 
                      className="rounded-none border-[#d7d1ca] bg-white min-h-[120px] focus-visible:ring-black placeholder:text-[#d7d1ca]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Card de Resumo */}
            <div className="bg-[#fcfcfc] border border-[#d7d1ca] p-8 space-y-4">
              <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#6f6a63] uppercase mb-6">RESUMO DO PEDIDO</h4>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#6f6a63]">Quantidade</span>
                <span className="font-bold text-black">{summary.quantity} {summary.quantity === 1 ? 'peça' : 'peças'}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#6f6a63]">Pagamento</span>
                <span className="font-bold text-black uppercase tracking-wider text-[11px]">
                  {summary.isPix ? 'Pix' : 'Crédito'}
                </span>
              </div>

              {summary.isPix && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#6f6a63]">Benefício</span>
                  <span className="text-green-600 font-bold uppercase tracking-wider text-[11px]">
                    {summary.isKit ? 'Preço de Kit Aplicado' : 'Desconto Pix Ativo'}
                  </span>
                </div>
              )}

              <Separator className="bg-[#d7d1ca] my-6" />

              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold tracking-[0.1em] text-black uppercase mb-1">Total estimado</span>
                <span className="text-4xl font-headline text-black">
                  R$ {summary.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Botão de Finalização */}
            <Button 
              type="submit" 
              className="w-full h-16 bg-[#050505] hover:bg-accent text-white rounded-full font-bold uppercase tracking-[0.2em] text-sm transition-all shadow-lg hover:shadow-accent/20 active:scale-[0.98]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'PROCESSANDO...' : 'FINALIZAR NO WHATSAPP'}
            </Button>
            
            <p className="text-[11px] text-[#6f6a63] text-center italic font-medium">
              Sua reserva será confirmada pela nossa equipe via WhatsApp. <br className="hidden sm:block" />
              O pagamento é feito no momento da retirada ou entrega combinada.
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
