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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Calculator, Info } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  nome: z.string().min(3, { message: 'Por favor, informe seu nome completo.' }),
  whatsapp: z.string().min(10, { message: 'Informe um WhatsApp válido.' }),
  produto: z.string({ required_error: 'Selecione o produto.' }),
  tamanho: z.string({ required_error: 'Selecione um tamanho.' }),
  quantidade: z.coerce.number().min(1, { message: 'Mínimo 1 unidade.' }),
  pagamento: z.enum(['Pix', 'Parcelado'], { required_error: 'Selecione a forma de pagamento.' }),
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
      pagamento: 'Pix',
      observacoes: '',
    },
  });

  const watchedValues = useWatch({ control: form.control });
  
  const [summary, setSummary] = useState({
    basePrice: 0,
    quantity: 1,
    discountLabel: 'Sem desconto',
    discountAmount: 0,
    total: 0
  });

  useEffect(() => {
    const unitPrice = 78.00;
    const qty = Number(watchedValues.quantidade) || 0;
    const isPix = watchedValues.pagamento === 'Pix';
    const isBulk = qty >= 2;

    const baseTotal = unitPrice * qty;

    let discountPercent = 0;
    let label = 'Sem desconto';

    if (isPix) {
      discountPercent = 0.10;
      label = '10% OFF no Pix';
    } else if (isBulk) {
      discountPercent = 0.10;
      label = '10% OFF em 2+ camisetas';
    }

    const discountValue = baseTotal * discountPercent;
    const finalTotal = baseTotal - discountValue;

    setSummary({
      basePrice: baseTotal,
      quantity: qty,
      discountLabel: label,
      discountAmount: discountValue,
      total: finalTotal
    });
  }, [watchedValues.quantidade, watchedValues.pagamento, watchedValues.produto]);

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    
    const orderData = {
      ...values,
      summary,
      createdAt: new Date().toISOString(),
      status: 'Pendente WhatsApp'
    };

    addDoc(collection(db, "pedidos_iap_camisetas"), orderData)
      .catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: 'pedidos_iap_camisetas',
          operation: 'create',
          requestResourceData: orderData
        }));
      });

    const phoneNumber = '5541999999999'; 
    
    const message = `Olá! Quero comprar uma camiseta da Comunicação da IAP Barreirinha.

*Dados do Pedido:*
- *Nome:* ${values.nome}
- *WhatsApp:* ${values.whatsapp}
- *Produto:* ${values.produto}
- *Tamanho:* ${values.tamanho}
- *Quantidade:* ${values.quantidade}
- *Pagamento:* ${values.pagamento}
- *Desconto aplicado:* ${summary.discountLabel}
- *Total:* R$ ${summary.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
- *Observações:* ${values.observacoes || 'Nenhuma'}

${values.pagamento === 'Pix' ? 'Desejo receber a chave Pix para pagamento.' : 'Desejo conversar sobre parcelamento.'}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    toast({
      title: "Dados Registrados!",
      description: "Redirecionando para o WhatsApp...",
    });

    setTimeout(() => {
      window.location.href = whatsappUrl;
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <div id="reserva" className="bg-white p-8 lg:p-12 rounded-[2rem] border border-[#dddddd] shadow-sm max-w-2xl mx-auto scroll-mt-24">
      <div className="text-center mb-10">
        <h3 className="font-headline text-2xl lg:text-3xl font-normal mb-2 uppercase tracking-tight text-black">Finalize sua reserva</h3>
        <p className="text-black text-sm font-medium">O desconto de 10% será aplicado automaticamente se você escolher Pix ou levar 2+ unidades.</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-medium tracking-wide text-black">Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="Como podemos te chamar?" className="rounded-xl h-12 border-[#dddddd] font-body text-black" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] font-medium tracking-wide text-black">WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" className="rounded-xl h-12 border-[#dddddd] font-body text-black" {...field} />
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
                  <FormLabel className="text-[14px] font-medium tracking-wide text-black">Produto</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl h-12 border-[#dddddd] font-body text-black">
                        <SelectValue placeholder="Selecione o modelo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Camiseta Comunicação Preta">Camiseta Preta</SelectItem>
                      <SelectItem value="Camiseta Comunicação Branca">Camiseta Branca</SelectItem>
                      <SelectItem value="Kit Promocional (2 Peças)">Promoção Especial (2 Peças)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="tamanho"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] font-medium tracking-wide text-black">Tamanho</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl h-12 border-[#dddddd] font-body text-black">
                        <SelectValue placeholder="Seu tamanho" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {['PP', 'P', 'M', 'G', 'GG', 'XGG'].map(size => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] font-medium tracking-wide text-black">Quantidade</FormLabel>
                  <FormControl>
                    <Input type="number" className="rounded-xl h-12 border-[#dddddd] font-body text-black" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="pagamento"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="text-[14px] font-medium tracking-wide text-black">Forma de Pagamento</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-wrap gap-8"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Pix" />
                      </FormControl>
                      <FormLabel className="font-semibold text-sm cursor-pointer text-black">Pix (10% OFF)</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Parcelado" />
                      </FormControl>
                      <FormLabel className="font-semibold text-sm cursor-pointer text-black">Parcelamento</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ORDER SUMMARY */}
          <div className="bg-[#f9f9f9] rounded-2xl p-6 border border-[#eeeeee] space-y-3 font-body">
            <div className="flex items-center gap-2 mb-2 text-black font-bold text-xs uppercase tracking-widest">
              <Calculator className="h-4 w-4" /> Resumo do Pedido
            </div>
            <div className="flex justify-between text-sm text-black">
              <span>Preço Base (R$ 78,00 x {summary.quantity})</span>
              <span>R$ {summary.basePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            {summary.discountAmount > 0 && (
              <div className="flex justify-between text-sm text-accent font-semibold">
                <span>Desconto ({summary.discountLabel})</span>
                <span>- R$ {summary.discountAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            <Separator className="bg-[#dddddd]" />
            <div className="flex justify-between font-bold text-lg text-black">
              <span>TOTAL FINAL</span>
              <span>R$ {summary.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <FormField
            control={form.control}
            name="observacoes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-medium tracking-wide text-black">Observações (Opcional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Algum detalhe específico?" 
                    className="resize-none rounded-xl border-[#dddddd] min-h-[100px] font-body text-black" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full h-14 bg-black hover:bg-accent text-white rounded-full flex items-center justify-center gap-3 text-[14px] shadow-lg transition-all font-semibold uppercase tracking-[0.04em]"
            disabled={isSubmitting}
          >
            <Send className="h-5 w-5" />
            {isSubmitting ? 'REGISTRANDO...' : 'IR PARA O WHATSAPP'}
          </Button>
          
          <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl text-[12px] text-blue-800 font-medium border border-blue-100">
            <Info className="h-4 w-4 shrink-0" />
            <span>O desconto será calculado automaticamente conforme a forma de pagamento ou quantidade escolhida.</span>
          </div>
        </form>
      </Form>
    </div>
  );
}
