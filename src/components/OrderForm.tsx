
"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { Send } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

const formSchema = z.object({
  nome: z.string().min(3, { message: 'Por favor, informe seu nome completo.' }),
  whatsapp: z.string().min(10, { message: 'Informe um WhatsApp válido.' }),
  produto: z.string({ required_error: 'Selecione o produto.' }),
  tamanho: z.string({ required_error: 'Selecione um tamanho.' }),
  quantidade: z.coerce.number().min(1, { message: 'Mínimo 1 unidade.' }),
  pagamento: z.enum(['Pix', 'Parcelado'], { required_error: 'Selecione a forma de pagamento.' }),
  observacoes: z.string().optional(),
});

export function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const db = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Save to Firestore
      const orderData = {
        ...values,
        createdAt: new Date().toISOString(),
        status: 'Pendente WhatsApp'
      };

      await addDoc(collection(db, "pedidos_iap_camisetas"), orderData);

      // Construct WhatsApp Message
      const phoneNumber = '5541999999999'; // CHURCH NUMBER
      const paymentDetail = values.pagamento === 'Pix' 
        ? 'Desejo receber a chave Pix para realizar o pagamento.' 
        : 'Gostaria de conversar sobre as opções de parcelamento.';

      const message = `Olá! Quero comprar uma camiseta da Comunicação da IAP Barreirinha.

*Dados do Pedido:*
- *Nome:* ${values.nome}
- *WhatsApp:* ${values.whatsapp}
- *Produto:* ${values.produto}
- *Tamanho:* ${values.tamanho}
- *Quantidade:* ${values.quantidade}
- *Pagamento:* ${values.pagamento}
- *Observações:* ${values.observacoes || 'Nenhuma'}

${paymentDetail}`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      toast({
        title: "Dados Registrados!",
        description: "Redirecionando para o WhatsApp da equipe...",
      });

      window.location.href = whatsappUrl;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao processar",
        description: "Não foi possível registrar seu pedido. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div id="reserva" className="bg-white p-8 lg:p-12 rounded-[2rem] border border-[#dddddd] shadow-sm max-w-2xl mx-auto scroll-mt-24">
      <div className="text-center mb-10">
        <h3 className="font-headline text-2xl lg:text-3xl font-extrabold mb-2 uppercase tracking-tight">Finalize sua reserva</h3>
        <p className="text-muted-foreground">Preencha os campos abaixo para iniciarmos seu atendimento.</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-[#777777]">Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="Como podemos te chamar?" className="rounded-xl h-12 border-[#dddddd]" {...field} />
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
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-[#777777]">WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" className="rounded-xl h-12 border-[#dddddd]" {...field} />
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
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-[#777777]">Produto</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl h-12 border-[#dddddd]">
                        <SelectValue placeholder="Selecione o modelo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Camiseta Comunicação Preta">Camiseta Preta</SelectItem>
                      <SelectItem value="Camiseta Comunicação Branca">Camiseta Branca</SelectItem>
                      <SelectItem value="Kit Promocional">Kit Promocional (2 Peças)</SelectItem>
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
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-[#777777]">Tamanho</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl h-12 border-[#dddddd]">
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
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-[#777777]">Quantidade</FormLabel>
                  <FormControl>
                    <Input type="number" className="rounded-xl h-12 border-[#dddddd]" {...field} />
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
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-[#777777]">Forma de Pagamento</FormLabel>
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
                      <FormLabel className="font-semibold text-sm cursor-pointer">Pix (à vista)</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Parcelado" />
                      </FormControl>
                      <FormLabel className="font-semibold text-sm cursor-pointer">Parcelamento</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="observacoes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-[#777777]">Observações (Opcional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Algum detalhe específico?" 
                    className="resize-none rounded-xl border-[#dddddd] min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full h-14 bg-accent hover:bg-accent/90 text-white pill-button flex items-center justify-center gap-3 text-base shadow-lg shadow-accent/20"
            disabled={isSubmitting}
          >
            <Send className="h-5 w-5" />
            {isSubmitting ? 'REGISTRANDO...' : 'IR PARA O WHATSAPP'}
          </Button>
          
          <p className="text-[10px] text-center text-[#777777] uppercase tracking-widest mt-6">
            Pagamento e entrega alinhados diretamente via WhatsApp.
          </p>
        </form>
      </Form>
    </div>
  );
}
