'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { OrderForm } from '@/components/OrderForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Instagram, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 45, s: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const faqItems = [
    { q: "Qual a diferença entre a camiseta preta e a branca?", a: "A principal diferença é a cor. Ambas seguem a mesma proposta visual e podem ter a mesma modelagem, salvo ajuste específico de lote." },
    { q: "Quais tamanhos estarão disponíveis?", a: "Os tamanhos podem ser disponibilizados em PP, P, M, G, GG e XGG, conforme estoque ou produção definida." },
    { q: "O pagamento é feito no site?", a: "Não. O pedido é iniciado no site e finalizado pelo WhatsApp, com Pix ou alinhamento de parcelamento." },
    { q: "Como funciona a opção parcelada?", a: "Ao selecionar parcelamento, o sistema direciona você para o WhatsApp para combinar a melhor forma de pagamento." },
    { q: "Posso pedir mais de uma unidade?", a: "Sim. O formulário deve permitir escolher a quantidade desejada." },
    { q: "Como saberei se meu pedido foi registrado?", a: "Antes do redirecionamento ao WhatsApp, os dados do pedido devem ser salvos no Firebase Firestore." },
  ];

  const benefits = [
    { title: "Visual alinhado e representativo", text: "Uma camiseta pensada para transmitir unidade, cuidado visual e identidade do Ministério de Comunicação." },
    { title: "Conforto para cultos e eventos", text: "Modelagem confortável para uso em escalas, coberturas, ensaios, reuniões e programações especiais." },
    { title: "Duas opções de cor", text: "Disponível nas versões preta e branca, para que cada pessoa escolha a opção que melhor combina com seu estilo." },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <Toaster />

      <main className="flex-1">
        {/* EDITORIAL HERO SECTION */}
        <section className="relative min-h-[760px] h-[90vh] bg-[#f5f5f5] overflow-hidden flex items-center justify-center pt-[72px] lg:pt-[88px]">
          {/* Background Typography Layer */}
          <div className="absolute inset-0 z-[1] flex flex-col items-center justify-between pointer-events-none select-none py-[2%]">
            <h2 className="font-headline font-normal uppercase leading-[0.82] text-[#111111] opacity-95 text-[clamp(72px, 22vw, 132px)] lg:text-[clamp(140px, 18vw, 320px)] animate-fade-in">
              IAP
            </h2>
            <h2 className="font-headline font-normal uppercase leading-[0.82] text-[#111111] opacity-95 text-[clamp(42px, 12vw, 88px)] lg:text-[clamp(80px, 11vw, 220px)] animate-fade-in delay-150">
              BARREIRINHA
            </h2>
          </div>

          {/* Foreground Content Container */}
          <div className="container relative z-[3] max-w-[1400px] px-10 flex flex-col items-center justify-center">
            {/* Supporting Text (Desktop only) */}
            <div className="hidden lg:block absolute left-[7%] top-[48%] -translate-y-1/2 z-[4] space-y-4 max-w-[220px]">
              <p className="font-body font-medium text-lg leading-tight text-[#111111]">
                Camiseta oficial da Comunicação
              </p>
              <p className="font-body text-sm text-[#666666] leading-relaxed">
                Preta e branca para o time da IAP Barreirinha
              </p>
            </div>

            {/* Central Image Block */}
            <div className="relative group animate-fade-in delay-300">
              <div className="bg-[#e8e1da] p-4 border-[10px] border-white/65 shadow-[0_20px_60px_rgba(0,0,0,0.08)] w-[78vw] h-[96vw] lg:w-[420px] lg:h-[520px] relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                <Image
                  src="https://lh3.googleusercontent.com/pw/AP1GczMCULydqmuzcoaJMzEtt1VV0DTzSH8dLWzJVEBmGrBHl5o9_lE74bS8BLBQ9tFylUF4_pGzHvKz2YtFX5S34rL18g4L2LOsq-pDik8A1WmybflJMzlM-TRRd812mdxPWdO8uB9siPuBDcF9V5YPPNz3SQ=w513-h911-s-no-gm?authuser=0"
                  alt="camiseta da Comunicação IAP Barreirinha"
                  fill
                  className="object-cover grayscale-[0.2]"
                  priority
                  data-ai-hint="black t-shirt"
                />
              </div>
              
              {/* Decorative Bar */}
              <div className="hidden lg:block absolute -right-24 bottom-12 w-16 h-[2px] bg-[#111111] z-[4]" />
            </div>

            {/* CTA Area */}
            <div className="mt-12 z-[5] animate-fade-in delay-500">
              <Button asChild className="rounded-full bg-[#C62828] text-white font-semibold px-10 py-7 text-[14px] hover:bg-[#111111] transition-all shadow-xl hover:shadow-2xl border-none uppercase tracking-[0.05em]">
                <a href="#ofertas">Comprar agora</a>
              </Button>
            </div>
          </div>
        </section>

        {/* INTRO SECTION */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="mb-8">Muito mais que uma camiseta!</h2>
            <p className="text-lg lg:text-xl text-[#333333] font-normal leading-relaxed">
              As camisetas da Comunicação IAP Barreirinha unem identidade, qualidade e propósito.
            </p>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="py-24 bg-white border-t border-[#f0f0f0]">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative aspect-[3/4] w-full lg:max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://picsum.photos/seed/iap-white/800/1000"
                  alt="Camiseta Branca em Destaque"
                  fill
                  className="object-cover"
                  data-ai-hint="white t-shirt"
                />
              </div>
              <div className="space-y-12">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/10 group-hover:scale-125 transition-transform" />
                      {i !== benefits.length - 1 && <div className="w-px h-full bg-primary/20 mt-4" />}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold uppercase mb-3 tracking-wide font-headline">{benefit.title}</h4>
                      <p className="text-[#333333] font-normal leading-relaxed">{benefit.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* OFFER HIGHLIGHT */}
        <section id="ofertas" className="py-24 bg-[#efefef] scroll-mt-20">
          <div className="container mx-auto px-6 text-center">
            <h3 className="mb-4">ESCOLHA A MELHOR OPÇÃO PRA VOCÊ</h3>
            <p className="text-[#333333] mb-2 font-medium">Cada camiseta por R$ 78,00</p>
            <p className="text-[#333333] mb-12 font-bold uppercase text-xs tracking-[0.1em]">Ganhe 10% OFF no Pix ou 10% OFF comprando 2 ou mais</p>
            
            {/* Countdown */}
            <div className="flex flex-col items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#777777]">Condição especial por tempo limitado</span>
              <div className="flex gap-4">
                {[
                  { label: 'horas', val: timeLeft.h },
                  { label: 'minutos', val: timeLeft.m },
                  { label: 'segundos', val: timeLeft.s }
                ].map(box => (
                  <div key={box.label} className="bg-white border border-[#dddddd] w-20 h-24 flex flex-col items-center justify-center rounded-2xl shadow-sm">
                    <span className="text-2xl font-bold">{String(box.val).padStart(2, '0')}</span>
                    <span className="text-[10px] uppercase text-[#777777] font-bold">{box.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-[2rem] border border-[#dddddd] flex flex-col items-center hover:shadow-xl transition-all group">
                <div className="relative aspect-square w-full mb-8 rounded-2xl overflow-hidden bg-[#f5f5f5]">
                  <Image
                    src="https://lh3.googleusercontent.com/pw/AP1GczMCULydqmuzcoaJMzEtt1VV0DTzSH8dLWzJVEBmGrBHl5o9_lE74bS8BLBQ9tFylUF4_pGzHvKz2YtFX5S34rL18g4L2LOsq-pDik8A1WmybflJMzlM-TRRd812mdxPWdO8uB9siPuBDcF9V5YPPNz3SQ=w513-h911-s-no-gm?authuser=0"
                    alt="Camiseta Individual"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 p-8"
                    data-ai-hint="t-shirts"
                  />
                </div>
                <h4 className="text-lg font-normal uppercase tracking-widest mb-2 font-headline">LEVE 1 - Camiseta IAP</h4>
                <p className="text-xs text-[#777777] uppercase tracking-wider mb-6 font-body">Escolha preta ou branca</p>
                <div className="flex flex-col items-center gap-1 mb-8">
                  <span className="text-4xl font-normal tracking-tighter text-primary font-headline">R$ 78,00</span>
                  <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-tighter font-body">
                    <CheckCircle2 className="h-3 w-3" /> Por R$ 70,20 no Pix
                  </div>
                </div>
                <Button asChild className="w-full h-14 bg-primary text-white hover:bg-accent rounded-full font-bold uppercase tracking-[0.05em] text-[14px] border-none">
                  <a href="#reserva">COMPRAR AGORA</a>
                </Button>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border border-[#dddddd] flex flex-col items-center hover:shadow-xl transition-all group ring-2 ring-accent/20">
                <div className="relative aspect-square w-full mb-8 rounded-2xl overflow-hidden bg-[#f5f5f5]">
                  <Image
                    src="https://picsum.photos/seed/iap-kit-bundle/800/1000"
                    alt="Kit Promocional"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 p-8"
                    data-ai-hint="t-shirts bundle"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-white text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-widest font-body">
                    Melhor Oferta
                  </div>
                </div>
                <h4 className="text-lg font-normal uppercase tracking-widest mb-2 font-headline">LEVE 2 - Promoção Especial</h4>
                <p className="text-xs text-[#777777] uppercase tracking-wider mb-6 font-body">10% OFF comprando 2 camisetas</p>
                <div className="flex flex-col items-center gap-1 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#777777] line-through font-body">R$ 156,00</span>
                    <span className="text-4xl font-normal tracking-tighter text-primary font-headline">R$ 140,40</span>
                  </div>
                  <span className="text-xs text-[#777777] font-semibold font-body">R$ 70,20 por unidade</span>
                </div>
                <Button asChild className="w-full h-14 bg-primary text-white hover:bg-accent rounded-full font-bold uppercase tracking-[0.05em] text-[14px] border-none">
                  <a href="#reserva">APROVEITAR KIT</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ORDER FORM SECTION */}
        <section className="py-24 bg-white" id="produtos">
          <div className="container mx-auto px-6 text-center mb-12">
            <h3 className="uppercase">Reserva Online</h3>
          </div>
          <div className="container mx-auto px-6">
            <OrderForm />
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section className="py-20 bg-white border-y border-[#f0f0f0] overflow-hidden">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="relative min-w-[300px] lg:min-w-[350px] aspect-square rounded-2xl overflow-hidden group snap-center">
                <Image
                  src={`https://picsum.photos/seed/iap-galeria-${i}/800/800`}
                  alt={`Galeria ${i}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  data-ai-hint="lifestyle photo"
                />
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-24 bg-white scroll-mt-20">
          <div className="container mx-auto px-6 max-w-2xl">
            <h3 className="mb-12 text-center">Perguntas Frequentes</h3>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border rounded-2xl px-6 py-1 bg-white">
                  <AccordionTrigger className="text-left font-medium uppercase text-[14px] tracking-widest hover:no-underline font-body">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#333333] font-normal text-base leading-relaxed font-body">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#2f2f2f] text-[#f5f5f5] py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="font-headline text-[22px] font-normal tracking-wider mb-12 uppercase">
            <span>IAP</span><span className="text-accent">CAMISETAS</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-16">
            {['Meus pedidos', 'Rastrear pedido', 'Falar com a equipe', 'Trocas e devoluções', 'Política de privacidade'].map(link => (
              <Link key={link} href="#" className="text-[14px] font-medium uppercase tracking-[0.02em] hover:text-accent transition-colors font-body">
                {link}
              </Link>
            ))}
          </nav>

          <div className="flex justify-center gap-8 mb-16">
            <Link href="#" className="p-3 bg-white/5 rounded-full hover:bg-accent transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="p-3 bg-white/5 rounded-full hover:bg-accent transition-colors">
              <Send className="h-5 w-5" />
            </Link>
          </div>

          <div className="border-t border-white/10 pt-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 font-body">
            © {new Date().getFullYear()} Igreja Adventista da Promessa Barreirinha. Ministério de Comunicação.
          </div>
        </div>
      </footer>
    </div>
  );
}
