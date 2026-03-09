
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/products';
import { CheckCircle, MessageSquare, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Comunicação IAP Barreirinha
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80 sm:text-xl">
              Vista a identidade do nosso ministério. Escolha seu modelo e faça sua reserva de forma simples e rápida.
            </p>
            <a 
              href="#produtos" 
              className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 font-bold text-accent-foreground shadow transition-colors hover:bg-accent/90"
            >
              Ver Camisetas
            </a>
          </div>
        </section>

        {/* Product Grid */}
        <section id="produtos" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight mb-4">Nossa Vitrine</h2>
              <p className="text-muted-foreground">Selecione o modelo que mais combina com você.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-4xl lg:mx-auto">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-accent/10 p-4 text-accent">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="mb-2 font-headline text-xl font-bold">Início Online</h3>
                <p className="text-sm text-muted-foreground">
                  Você escolhe o produto e preenche os dados aqui no site.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-accent/10 p-4 text-accent">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="mb-2 font-headline text-xl font-bold">Finalização no WhatsApp</h3>
                <p className="text-sm text-muted-foreground">
                  O pedido é processado e finalizado diretamente no atendimento via WhatsApp.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-accent/10 p-4 text-accent">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="mb-2 font-headline text-xl font-bold">Pagamento Seguro</h3>
                <p className="text-sm text-muted-foreground">
                  Pagamento via Pix ou parcelado, combinado diretamente com nossa equipe.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Igreja Adventista Promessa da Barreirinha. <br className="sm:hidden" /> 
            Ministério de Comunicação.
          </p>
        </div>
      </footer>
    </div>
  );
}
