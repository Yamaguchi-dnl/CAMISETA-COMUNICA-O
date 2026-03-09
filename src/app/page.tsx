'use client';

import Image from 'next/image';
import Link from 'next/link';
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
    { title: "Conforto para cultos e eventos", text: "Modelagem confortável para uso em escalas, coberturas, ensaios, reuniões e programações especial.)" },
    { title: "Duas opções de cor", text: "Disponível nas versões preta e branca, para que cada pessoa escolha a opção que melhor combina com seu estilo." },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Toaster />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative bg-[#efefef] overflow-hidden flex flex-col items-center pt-20 pb-40 lg:pt-32 lg:pb-40 min-h-[920px]">
          
          <div className="container relative z-[10] max-w-[1600px] px-4 lg:px-10 flex flex-col items-center">
            
            {/* DESKTOP HERO VERSION (lg and above) */}
            <div className="hidden lg:flex flex-col items-center w-full">
              {/* Top Large Wording */}
              <h1 className="relative z-[1] font-headline text-black text-center uppercase leading-[0.9] tracking-[-0.04em] 
                mb-[-10px] lg:mb-[-15px] xl:mb-[-20px] 
                text-[clamp(62px,8vw,108px)] xl:text-[clamp(86px,8.6vw,180px)]">
                LET CREATIVITY
              </h1>

              {/* Center Visual Block */}
              <div className="relative w-full flex items-center justify-center z-[3] mt-2 xl:mt-0">
                
                {/* Left Text Block - Desktop Only (xl and above) */}
                <div className="hidden xl:block absolute left-0 top-1/2 -translate-y-1/2 z-[10] max-w-[380px]">
                  <p className="font-body text-[17px] leading-[1.4] text-black mb-6">
                    <span className="font-headline text-[22px] leading-none tracking-[-0.015em] text-black uppercase block mb-3">
                      COMUNICAR É MISSÃO.
                    </span>
                    Uma camiseta para quem serve <br /> anunciando a mensagem.
                  </p>
                  <div className="w-[112px] h-[4px] bg-black" />
                </div>

                {/* The Image Frame */}
                <div className="relative z-[3] transform rotate-[-2deg] xl:rotate-[-2deg] transition-transform duration-700">
                  <div className="bg-white p-0 border-[16px] border-[#ff1f17] shadow-[0_16px_40px_rgba(0,0,0,0.12)] 
                    w-[72vw] h-[52vw] lg:w-[680px] lg:h-[480px] xl:w-[820px] xl:h-[580px] 
                    max-w-[850px] relative overflow-hidden rounded-[2.5rem]">
                    <Image
                      src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/PEDRO%20E%20SARA%20-%20COSTAS%20E%20FRENTE.jpg"
                      alt="IAP Camisetas Campaign"
                      fill
                      className="object-cover"
                      priority
                      data-ai-hint="fashion models"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Large Wording - Overlays Image */}
              <h2 className="relative z-[4] font-headline text-black text-center uppercase leading-[0.86] tracking-[-0.05em] 
                mt-[-25px] xl:mt-[-35px] 
                text-[clamp(82px,10vw,138px)] xl:text-[clamp(110px,10vw,250px)]">
                SPEAK
              </h2>

              {/* CTA Area */}
              <div className="relative z-[5] mt-10 xl:mt-12">
                <Button asChild className="rounded-none bg-[#ff1f17] text-white font-bold 
                  px-10 py-5 text-[16px] lg:px-12 lg:py-6 lg:text-[18px] xl:px-14 xl:py-8 
                  hover:bg-black transition-all uppercase tracking-[0.02em] shadow-none min-w-[290px]">
                  <a href="#ofertas">COMPRAR AGORA</a>
                </Button>
              </div>
            </div>

            {/* TABLET ONLY LAYOUT (md to lg) */}
            <div className="hidden md:flex lg:hidden flex-col items-center w-full">
               <h1 className="relative z-[1] font-headline text-black text-center uppercase leading-[0.9] tracking-[-0.04em] 
                mb-[-10px] text-[clamp(62px,8vw,108px)]">
                LET CREATIVITY
              </h1>

              <div className="relative z-[3] transform rotate-[-3deg] mt-2 mb-0">
                <div className="bg-white p-0 border-[12px] border-[#ff1f17] shadow-[0_12px_28px_rgba(0,0,0,0.08)] w-[620px] h-[470px] relative overflow-hidden max-w-[82vw] max-h-[62vw] rounded-[2rem]">
                  <Image
                    src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/PEDRO%20E%20SARA%20-%20COSTAS%20E%20FRENTE.jpg"
                    alt="IAP Camisetas Campaign"
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint="fashion models"
                  />
                </div>
              </div>

              <h2 className="relative z-[4] font-headline text-black text-center uppercase leading-[0.86] tracking-[-0.05em] 
                mt-[-34px] mb-[18px] text-[clamp(82px,10vw,138px)]">
                SPEAK
              </h2>

              <div className="flex flex-col items-center text-center px-4 mb-8 mt-4">
                <h3 className="font-headline text-black text-[clamp(24px,3vw,34px)] leading-[1.02] tracking-[-0.015em] uppercase">
                  COMUNICAR É MISSÃO.
                </h3>
                <p className="font-body text-black text-[clamp(18px,2vw,22px)] leading-[1.45] mt-2.5 max-w-[520px]">
                  Uma camiseta para quem serve anunciando a mensagem.
                </p>
                <div className="w-[110px] h-[4px] bg-black mt-4 mx-auto" />
              </div>

              <Button asChild className="rounded-none bg-[#ff1f17] text-white font-extrabold px-10 py-6 text-[18px] hover:bg-black transition-all uppercase tracking-[0.01em] shadow-none min-w-[290px]">
                <a href="#ofertas">COMPRAR AGORA</a>
              </Button>
            </div>

            {/* MOBILE ONLY HERO VERSION (below md) */}
            <div className="flex md:hidden flex-col items-center w-full pt-10">
              {/* Top Text */}
              <h1 
                className="font-headline text-black text-center uppercase leading-[0.9] tracking-[-0.035em] mb-[-6px] text-[clamp(34px, 9.4vw, 56px)] z-[1]"
              >
                LET CREATIVITY
              </h1>

              {/* Image Block Inclined */}
              <div className="relative z-[3] mt-2 transform rotate-[-8deg] mb-0">
                <div className="bg-white p-0 border-[8px] border-[#ff1f17] shadow-[0_8px_22px_rgba(0,0,0,0.08)] w-[260px] h-[360px] relative overflow-hidden rounded-[1.5rem]">
                  <Image
                    src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/Carol%20costas.jpg"
                    alt="Carol costas camiseta IAP"
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint="t-shirt model"
                  />
                </div>
              </div>

              {/* Bottom Text Overlapping Image */}
              <h2 
                className="relative z-[4] font-headline text-black text-center uppercase leading-[0.85] tracking-[-0.045em] mt-[-24px] mb-[18px] text-[clamp(54px,16vw,86px)]"
              >
                SPEAK
              </h2>

              {/* Support Text Block */}
              <div className="flex flex-col items-center text-center px-4 mb-10 mt-1">
                <h3 className="font-headline text-black text-xl leading-[1.02] tracking-[-0.015em] uppercase">
                  COMUNICAR É MISSÃO.
                </h3>
                <p className="font-body text-black text-sm leading-[1.4] mt-2.5 max-w-[340px]">
                  Uma camiseta para quem serve anunciando a mensagem.
                </p>
              </div>

              {/* CTA Button Rectangular */}
              <Button asChild className="rounded-none bg-[#ff1f17] text-white font-extrabold px-8 py-6 text-[15px] hover:bg-black transition-all uppercase tracking-[0.01em] shadow-none min-w-[208px]">
                <a href="#ofertas">COMPRAR AGORA</a>
              </Button>
            </div>

          </div>
        </section>

        {/* INTRO SECTION */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="mb-8 text-black">Muito mais que uma camiseta!</h2>
            <p className="text-lg lg:text-xl text-black font-normal leading-relaxed">
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
                      <div className="w-4 h-4 rounded-full bg-black ring-4 ring-black/10 group-hover:scale-125 transition-transform" />
                      {i !== benefits.length - 1 && <div className="w-px h-full bg-black/20 mt-4" />}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold uppercase mb-3 tracking-wide font-headline text-black">{benefit.title}</h4>
                      <p className="text-black font-normal leading-relaxed">{benefit.text}</p>
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
            <h3 className="mb-4 text-black">ESCOLHA A MELHOR OPÇÃO PRA VOCÊ</h3>
            <p className="text-black mb-2 font-medium">Cada camiseta por R$ 78,00</p>
            <p className="text-black mb-12 font-bold uppercase text-xs tracking-[0.1em]">Ganhe 10% OFF no Pix ou 10% OFF comprando 2 ou mais</p>
            
            {/* Countdown */}
            <div className="flex flex-col items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60">Condição especial por tempo limitado</span>
              <div className="flex gap-4">
                {[
                  { label: 'horas', val: timeLeft.h },
                  { label: 'minutos', val: timeLeft.m },
                  { label: 'segundos', val: timeLeft.s }
                ].map(box => (
                  <div key={box.label} className="bg-white border border-[#dddddd] w-20 h-24 flex flex-col items-center justify-center rounded-2xl shadow-sm">
                    <span className="text-2xl font-bold text-black">{String(box.val).padStart(2, '0')}</span>
                    <span className="text-[10px] uppercase text-black font-bold">{box.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-[2rem] border border-[#dddddd] flex flex-col items-center hover:shadow-xl transition-all group">
                <div className="relative aspect-square w-full mb-8 rounded-2xl overflow-hidden bg-[#f5f5f5]">
                  <Image
                    src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/PEDRO%20E%20SARA%20-%20COSTAS%20E%20FRENTE.jpg"
                    alt="Camiseta Individual"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 p-8"
                    data-ai-hint="t-shirts"
                  />
                </div>
                <h4 className="text-lg font-normal uppercase tracking-widest mb-2 font-headline text-black">LEVE 1 - Camiseta IAP</h4>
                <p className="text-xs text-black uppercase tracking-wider mb-6 font-body">Escolha preta ou branca</p>
                <div className="flex flex-col items-center gap-1 mb-8">
                  <span className="text-4xl font-normal tracking-tighter text-black font-headline">R$ 78,00</span>
                  <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-tighter font-body">
                    <CheckCircle2 className="h-3 w-3" /> Por R$ 70,20 no Pix
                  </div>
                </div>
                <Button asChild className="w-full h-14 bg-black text-white hover:bg-accent rounded-full font-bold uppercase tracking-[0.05em] text-[14px] border-none">
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
                <h4 className="text-lg font-normal uppercase tracking-widest mb-2 font-headline text-black">LEVE 2 - Promoção Especial</h4>
                <p className="text-xs text-black uppercase tracking-wider mb-6 font-body">10% OFF comprando 2 camisetas</p>
                <div className="flex flex-col items-center gap-1 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-black/60 line-through font-body">R$ 156,00</span>
                    <span className="text-4xl font-normal tracking-tighter text-black font-headline">R$ 140,40</span>
                  </div>
                  <span className="text-xs text-black font-semibold font-body">R$ 70,20 por unidade</span>
                </div>
                <Button asChild className="w-full h-14 bg-black text-white hover:bg-accent rounded-full font-bold uppercase tracking-[0.05em] text-[14px] border-none">
                  <a href="#reserva">APROVEITAR KIT</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ORDER FORM SECTION */}
        <section className="py-24 bg-white" id="produtos">
          <div className="container mx-auto px-6 text-center mb-12">
            <h3 className="uppercase text-black">Reserva Online</h3>
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
            <h3 className="mb-12 text-center text-black">Perguntas Frequentes</h3>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border rounded-2xl px-6 py-1 bg-white">
                  <AccordionTrigger className="text-left font-medium uppercase text-[14px] tracking-widest hover:no-underline font-body text-black">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-black font-normal text-base leading-relaxed font-body">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white text-black py-24 border-t">
        <div className="container mx-auto px-6 text-center">
          <div className="font-headline text-[22px] font-normal tracking-wider mb-12 uppercase">
            <span>IAP</span><span className="text-accent">CAMISETAS</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-16">
            {['Meus pedidos', 'Rastrear pedido', 'Falar com a equipe', 'Trocas e devoluções', 'Política de privacidade'].map(link => (
              <Link key={link} href="#" className="text-[14px] font-medium uppercase tracking-[0.02em] hover:text-accent transition-colors font-body text-black">
                {link}
              </Link>
            ))}
          </nav>

          <div className="flex justify-center gap-8 mb-16">
            <Link href="#" className="p-3 bg-black/5 rounded-full hover:bg-accent transition-colors">
              <Instagram className="h-5 w-5 text-black" />
            </Link>
            <Link href="#" className="p-3 bg-black/5 rounded-full hover:bg-accent transition-colors">
              <Send className="h-5 w-5 text-black" />
            </Link>
          </div>

          <div className="border-t border-black/10 pt-12 text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 font-body">
            © {new Date().getFullYear()} Igreja Adventista da Promessa Barreirinha. Ministério de Comunicação.
          </div>
        </div>
      </footer>
    </div>
  );
}
