
"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Product } from '@/lib/products';
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
import { MessageCircle } from 'lucide-react';

const formSchema = z.object({
  nome: z.string().min(3, { message: 'Por favor, informe seu nome completo.' }),
  whatsapp: z.string().min(10, { message: 'Informe um WhatsApp válido.' }),
  tamanho: z.string({ required_error: 'Selecione um tamanho.' }),
  quantidade: z.coerce.number().min(1, { message: 'Mínimo 1 unidade.' }),
  pagamento: z.enum(['Pix', 'Parcelado'], { required_error: 'Selecione a forma de pagamento.' }),
  observacoes: z.string().optional(),
});

interface OrderFormProps {
  product: Product;
}

export function OrderForm({ product }: OrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      whatsapp: '',
      tamanho: '',
      quantidade: 1,
      pagamento: 'Pix',
      observacoes: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Simulation of Firestore saving
      // In a real app, you'd use: await addDoc(collection(db, "pedidos_ou_reservas"), { ...values, product: product.name, createdAt: new Date() });
      console.log('Salvando no Firestore:', { ...values, produto: product.name });
      
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network

      // Construct WhatsApp Message
      const phoneNumber = '5541999999999'; // REPLACE WITH ACTUAL PHONE
      const paymentDetail = values.pagamento === 'Pix' 
        ? 'Desejo receber a chave Pix para realizar o pagamento.' 
        : 'Gostaria de conversar sobre as opções de parcelamento.';

      const message = `Olá! Quero comprar a ${product.name} da Comunicação da IAP Barreirinha.

*Dados do Pedido:*
- *Nome:* ${values.nome}
- *WhatsApp:* ${values.whatsapp}
- *Tamanho:* ${values.tamanho}
- *Quantidade:* ${values.quantidade}
- *Pagamento:* ${values.pagamento}
- *Observações:* ${values.observacoes || 'Nenhuma'}

${paymentDetail}`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      toast({
        title: "Reserva Iniciada!",
        description: "Redirecionando você para o WhatsApp...",
      });

      window.location.href = whatsappUrl;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao processar",
        description: "Não foi possível iniciar sua reserva. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-card p-6 rounded-xl border shadow-sm">
      <h3 className="font-headline text-xl font-bold mb-6">Ficha de Reserva</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome aqui" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tamanho"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tamanho</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {product.sizes.map(size => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="quantidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pagamento"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Forma de Pagamento</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Pix" />
                        </FormControl>
                        <FormLabel className="font-normal">Pix</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Parcelado" />
                        </FormControl>
                        <FormLabel className="font-normal">Parcelado</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="observacoes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações (Opcional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Ex: Preciso da camiseta até tal data..." 
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            <MessageCircle className="h-6 w-6" />
            {isSubmitting ? 'Processando...' : 'Comprar pelo WhatsApp'}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-2">
            O pagamento é finalizado via WhatsApp com nossa equipe.
          </p>
        </form>
      </Form>
    </div>
  );
}
