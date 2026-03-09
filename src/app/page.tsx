'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { OrderForm } from '@/components/OrderForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { PRODUCTS } from '@/lib/products';
import { ArrowRight, ChevronRight, Clock, Instagram, Send, CheckCircle2, BadgePercent } from 'lucide-react';
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
    { q: "Qual a diferença entre a camiseta preta e a branca?", a: "A principal diferença é a cor. Ambas seguem a mesma proposta visual e material premium." },
    { q: "Quais tamanhos estarão disponíveis?", a: "Disponibilizamos do PP ao XGG, atendendo a todos os perfis com modelagem moderna." },
    { q: "O pagamento é feito no site?", a: "Não. Você inicia o pedido aqui e finaliza o pagamento via WhatsApp com nossa equipe." },
    { q: "Como funciona a opção parcelada?", a: "Ao escolher parcelamento, te direcionamos para o WhatsApp para alinhar as parcelas." },
    { q: "Posso pedir mais de uma unidade?", a: "Sim. O formulário permite escolher a quantidade desejada e aplica 10% de desconto para 2 ou mais unidades." },
    { q: "Como saberei se meu pedido foi registrado?", a: "Antes do redirecionamento ao WhatsApp, os dados do pedido são salvos em nosso banco de dados seguro." },
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

      <main className="flex-1 pt-16">
        {/* HERO SECTION */}
        <section className="bg-[#efefef] py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="max-w-xl animate-fade-in">
                <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight uppercase">
                  A camiseta da Comunicação que você precisa
                </h1>
                <p className="text-lg lg:text-xl text-[#777777] mb-8 font-light">
                  Camisetas oficiais da Comunicação por R$ 78,00 cada, com condições especiais no Pix e na compra de 2 ou mais.
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#dddddd] shadow-sm">
                    <BadgePercent className="h-4 w-4 text-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">10% OFF no Pix</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#dddddd] shadow-sm">
                    <BadgePercent className="h-4 w-4 text-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">10% OFF em 2+ camisetas</span>
                  </div>
                </div>
                <Button asChild className="pill-button bg-primary text-white hover:bg-accent h-14">
                  <a href="#ofertas">Ver ofertas <ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
                <div className="mt-12 flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="w-2 h-2 rounded-full bg-[#ccc]" />
                  <div className="w-2 h-2 rounded-full bg-[#ccc]" />
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-[1.2/1] w-full transform hover:scale-[1.02] transition-transform duration-700">
                <Image
                  src="https://picsum.photos/seed/iap-black-hero/1200/1000"
                  alt="Destaque Camiseta Preta"
                  fill
                  className="object-cover rounded-3xl"
                  priority
                  data-ai-hint="black t-shirt"
                />
              </div>
            </div>
          </div>
        </section>

        {/* INTRO SECTION */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-6">Identidade IAP</h2>
            <h3 className="text-3xl lg:text-5xl font-extrabold mb-8 uppercase leading-tight">Muito mais que uma camiseta!</h3>
            <p className="text-lg lg:text-xl text-[#777777] font-light leading-relaxed">
              As camisetas da Comunicação IAP Barreirinha unem identidade, qualidade e propósito para quem serve com excelência.
            </p>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="py-24 bg-white border-t border-[#f0f0f0]">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative aspect-[3/4] w-full lg:max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://picsum.photos/seed/iap-detail/800/1000"
                  alt="Detalhe Produto"
                  fill
                  className="object-cover"
                  data-ai-hint="modern t-shirt"
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
                      <h4 className="text-xl font-bold uppercase mb-3 tracking-wide">{benefit.title}</h4>
                      <p className="text-[#777777] font-light leading-relaxed">{benefit.text}</p>
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
            <h3 className="text-2xl lg:text-4xl font-extrabold mb-4 uppercase tracking-tight">ESCOLHA A MELHOR OPÇÃO PRA VOCÊ</h3>
            <p className="text-[#777777] mb-4">Cada camiseta por R$ 78,00</p>
            <p className="text-[#777777] mb-12 font-bold uppercase text-xs tracking-widest">Ganhe 10% OFF no Pix ou 10% OFF comprando 2 ou mais</p>
            
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
              {/* Individual Card */}
              <div className="bg-white p-8 rounded-[2rem] border border-[#dddddd] flex flex-col items-center hover:shadow-xl transition-all group">
                <div className="relative aspect-square w-full mb-8 rounded-2xl overflow-hidden">
                  <Image
                    src="https://picsum.photos/seed/iap-black/800/1000"
                    alt="Camisetas"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-white text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-widest">
                    Destaque
                  </div>
                </div>
                <h4 className="text-lg font-bold uppercase tracking-widest mb-2">LEVE 1 - Camiseta IAP</h4>
                <p className="text-xs text-[#777777] uppercase tracking-wider mb-6">Escolha preta ou branca</p>
                <div className="flex flex-col items-center gap-1 mb-8">
                  <span className="text-4xl font-extrabold tracking-tighter text-primary">R$ 78,00</span>
                  <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-tighter">
                    <CheckCircle2 className="h-3 w-3" /> Por R$ 70,20 no Pix
                  </div>
                </div>
                <Button asChild className="w-full pill-button bg-primary text-white hover:bg-accent h-14">
                  <a href="#reserva">COMPRAR AGORA</a>
                </Button>
              </div>

              {/* Promo Card */}
              <div className="bg-white p-8 rounded-[2rem] border border-[#dddddd] flex flex-col items-center hover:shadow-xl transition-all group ring-2 ring-accent/20">
                <div className="relative aspect-square w-full mb-8 rounded-2xl overflow-hidden">
                  <Image
                    src="https://picsum.photos/seed/iap-kit/800/1000"
                    alt="Kit Promo"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-white text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-widest">
                    Melhor Oferta
                  </div>
                </div>
                <h4 className="text-lg font-bold uppercase tracking-widest mb-2">LEVE 2 - Promoção Especial</h4>
                <p className="text-xs text-[#777777] uppercase tracking-wider mb-6">10% OFF comprando 2 camisetas</p>
                <div className="flex flex-col items-center gap-1 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#777777] line-through">R$ 156,00</span>
                    <span className="text-4xl font-extrabold tracking-tighter text-primary">R$ 140,40</span>
                  </div>
                  <span className="text-xs text-[#777777] font-semibold">R$ 70,20 por unidade</span>
                </div>
                <Button asChild className="w-full pill-button bg-primary text-white hover:bg-accent h-14">
                  <a href="#reserva">APROVEITAR KIT</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ORDER FORM SECTION */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <OrderForm />
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section className="py-12 bg-white border-y border-[#f0f0f0] overflow-hidden">
          <div className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide px-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="relative min-w-[280px] aspect-square rounded-2xl overflow-hidden group">
                <Image
                  src={`https://picsum.photos/seed/iap-gal-${i}/600/600`}
                  alt={`Galeria ${i}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-24 bg-white scroll-mt-20">
          <div className="container mx-auto px-6 max-w-2xl">
            <h3 className="text-3xl font-extrabold mb-12 uppercase text-center tracking-tight">Perguntas Frequentes</h3>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border rounded-2xl px-6 py-1 bg-white">
                  <AccordionTrigger className="text-left font-bold uppercase text-sm tracking-widest hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#777777] font-light text-base leading-relaxed">
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
          <div className="font-headline text-2xl font-extrabold tracking-tighter mb-12">
            <span>IAP</span><span className="text-accent">CAMISETAS</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-16">
            {['Meus pedidos', 'Rastrear pedido', 'Falar com a equipe', 'Trocas e devoluções', 'Política de privacidade'].map(link => (
              <Link key={link} href="#" className="text-xs font-semibold uppercase tracking-widest hover:text-accent transition-colors">
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

          <div className="border-t border-white/10 pt-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            © {new Date().getFullYear()} Igreja Adventista da Promessa Barreirinha. Ministério de Comunicação.
          </div>
        </div>
      </footer>
    </div>
  );
}
