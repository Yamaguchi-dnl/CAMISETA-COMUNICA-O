
import { Header } from '@/components/Header';
import { OrderForm } from '@/components/OrderForm';
import { getProductBySlug } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, Info } from 'lucide-react';
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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
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
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden border bg-muted cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                  <Image
                    src={`https://picsum.photos/seed/thumb${i}${product.id}/200/200`}
                    alt={`${product.name} thumb ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info & Form */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="font-headline text-3xl font-black mb-2 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-sm text-muted-foreground font-medium">A partir de</span>
                <span className="font-headline text-4xl font-black text-foreground">R$ {product.price}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.fullDescription}
              </p>
              
              <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 text-blue-800 text-sm mb-8 border border-blue-100">
                <Info className="h-5 w-5 shrink-0 mt-0.5" />
                <p>
                  <strong>Importante:</strong> Este é um sistema de reserva. Seus dados serão enviados para nossa equipe e o pagamento será combinado via WhatsApp.
                </p>
              </div>
            </div>

            <OrderForm product={product} />
          </div>
        </div>
      </main>

      <footer className="border-t bg-background py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Igreja Adventista Promessa da Barreirinha. <br className="sm:hidden" /> 
            Qualidade e Identidade em cada peça.
          </p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
