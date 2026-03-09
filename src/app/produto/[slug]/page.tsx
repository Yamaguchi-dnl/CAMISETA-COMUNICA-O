import { OrderForm } from '@/components/OrderForm';
import { getProductBySlug } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, Info, BadgePercent } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const basePrice = 78.00;
  const pixPrice = 70.20;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 container mx-auto px-4 py-8 pt-12 lg:pt-16">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-black hover:text-accent mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar para a vitrine
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-lg border">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
                data-ai-hint="t-shirt product main image"
              />
            </div>
          </div>

          {/* Product Info & Form */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="font-headline text-3xl font-black mb-2 leading-tight uppercase text-black">
                {product.name}
              </h1>
              <div className="flex flex-col gap-1 mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-black font-medium">Preço Base:</span>
                  <span className="font-headline text-3xl font-black text-black">R$ {basePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-tighter">
                  <BadgePercent className="h-4 w-4" /> R$ {pixPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} no Pix (10% OFF)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 mb-8">
                <p className="text-accent font-bold text-[10px] uppercase tracking-widest mb-1">Promoção Ativa</p>
                <p className="text-sm text-black font-medium">Na compra de 2 ou mais camisetas, ganhe 10% OFF automaticamente no seu pedido!</p>
              </div>

              <p className="text-black leading-relaxed mb-6 font-light">
                {product.fullDescription}
              </p>
              
              <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 text-blue-800 text-sm mb-8 border border-blue-100">
                <Info className="h-5 w-5 shrink-0 mt-0.5" />
                <p>
                  <strong>Importante:</strong> Este é um sistema de reserva. Seus dados serão enviados para nossa equipe e o pagamento será combinado via WhatsApp.
                </p>
              </div>
            </div>

            <OrderForm />
          </div>
        </div>
      </main>

      <footer className="border-t bg-white py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-black">
            © {new Date().getFullYear()} Igreja Adventista Promessa da Barreirinha. <br className="sm:hidden" /> 
            Qualidade e Identidade em cada peça.
          </p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
