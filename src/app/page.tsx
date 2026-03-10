'use client';

import Image from 'next/image';
import Link from 'next/link';
import { OrderForm } from '@/components/OrderForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Instagram, Send, Maximize2, Calculator } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { IntroLoader } from '@/components/IntroLoader';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleIntroComplete = () => {
    setIsIntroFinished(true);
  };

  useGSAP(() => {
    if (!containerRef.current || !isIntroFinished) return;

    ScrollTrigger.refresh();

    const heroTl = gsap.timeline();
    
    gsap.to('.hero-section', { opacity: 1, duration: 0.1 });
    
    gsap.set(['.hero-title-top', '.hero-image-frame', '.hero-title-bottom', '.hero-support', '.hero-cta'], { 
      opacity: 0,
      y: 20
    });

    heroTl
      .fromTo('.hero-title-top', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
      )
      .fromTo('.hero-image-frame', 
        { opacity: 0, scale: 0.94, y: 40 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power4.out' }, 
        '-=0.4'
      )
      .fromTo('.hero-title-bottom', 
        { y: 35, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 
        '-=0.5'
      )
      .fromTo('.hero-support', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 
        '-=0.3'
      )
      .fromTo('.hero-cta', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 
        '-=0.2'
      );

    const sections = gsap.utils.toArray('.gsap-reveal');
    sections.forEach((section: any) => {
      gsap.fromTo(section, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

  }, { scope: containerRef, dependencies: [isIntroFinished] });

  const faqItems = [
    { q: "Qual a diferença entre a camiseta preta e a branca?", a: "A principal diferença é a cor. Ambas seguem a mesma proposta visual e material premium." },
    { q: "Quais tamanhos estarão disponíveis?", a: "PP, P, M, G, GG e XGG." },
    { q: "O pagamento é feito no site?", a: "Não. O pedido é iniciado no site e finalizado pelo WhatsApp para sua segurança." },
    { q: "Como funciona a opção parcelada?", a: "Ao selecionar parcelamento, nossa equipe entrará em contato via WhatsApp para combinar as parcelas." },
  ];

  const benefits = [
    { title: "Visual alinhado e representativo", text: "Uma camiseta pensada para transmitir unidade e identidade do Ministério de Comunicação." },
    { title: "Conforto para cultos e eventos", text: "Modelagem confortável para uso em escalas e programações especiais." },
    { title: "Duas opções de cor", text: "Disponível nas versões preta e branca." },
  ];

  const mosaicItems = [
    {
      id: "image_1",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180559.jpg",
      className: "lg:col-start-1 lg:col-span-6 lg:row-start-1 lg:row-span-8 md:col-start-1 md:col-span-4 md:row-start-1 md:row-span-5 col-span-2",
    },
    {
      id: "image_2",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180209.jpg",
      className: "lg:col-start-7 lg:col-span-3 lg:row-start-1 lg:row-span-4 md:col-start-5 md:col-span-2 md:row-start-1 md:row-span-3 col-span-1",
    },
    {
      id: "image_3",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180506.jpg",
      className: "lg:col-start-10 lg:col-span-3 lg:row-start-1 lg:row-span-4 md:col-start-7 md:col-span-2 md:row-start-1 md:row-span-3 col-span-1",
    },
    {
      id: "image_4",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180553.jpg",
      className: "lg:col-start-7 lg:col-span-2 lg:row-start-5 lg:row-span-3 md:col-start-5 md:col-span-2 md:row-start-4 md:row-span-2 col-span-1",
    },
    {
      id: "image_5",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180837.jpg",
      className: "lg:col-start-9 lg:col-span-2 lg:row-start-5 lg:row-span-3 md:col-start-7 md:col-span-2 md:row-start-4 md:row-span-2 col-span-1",
    },
    {
      id: "image_6",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180801.jpg",
      className: "lg:col-start-11 lg:col-span-2 lg:row-start-5 lg:row-span-3 md:col-start-5 md:col-span-2 md:row-start-6 md:row-span-2 col-span-1",
    },
    {
      id: "image_7",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_175533.jpg",
      className: "lg:col-start-1 lg:col-span-4 lg:row-start-9 lg:row-span-4 md:col-start-1 md:col-span-4 md:row-start-6 md:row-span-3 col-span-2",
    },
    {
      id: "image_8",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/Carol%20costas.jpg",
      className: "lg:col-start-5 lg:col-span-4 lg:row-start-9 lg:row-span-4 md:col-start-1 md:col-span-4 md:row-start-9 md:row-span-2 col-span-2",
    },
    {
      id: "image_9",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/PEDRO%20E%20SARA%20-%20COSTAS%20E%20FRENTE.jpg",
      className: "lg:col-start-9 lg:col-span-4 lg:row-start-8 lg:row-span-5 md:col-start-5 md:col-span-4 md:row-start-8 md:row-span-3 col-span-2",
    },
  ];

  return (
    <div ref={containerRef} className="flex min-h-screen flex-col bg-white">
      <IntroLoader onComplete={handleIntroComplete} />
      <Toaster />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="hero-section opacity-0 relative bg-[#efefef] overflow-hidden flex flex-col items-center pt-20 pb-12 lg:pt-32 lg:pb-16 min-h-screen">
          <div className="container relative z-[10] max-w-[1600px] px-4 lg:px-10 flex flex-col items-center">
            {/* DESKTOP HERO VERSION */}
            <div className="hidden lg:flex flex-col items-center w-full">
              <h1 className="hero-title-top relative z-[1] font-headline text-black text-center uppercase leading-[0.9] tracking-[-0.04em] mb-[-10px] lg:mb-[-15px] xl:mb-[-20px] text-[clamp(62px,8vw,108px)] xl:text-[clamp(86px,8.6vw,180px)]">
                LET CREATIVITY
              </h1>
              <div className="hero-image-frame relative w-full flex items-center justify-center z-[3] mt-2 xl:mt-0">
                <div className="hidden xl:block absolute left-0 top-1/2 -translate-y-1/2 z-[10] max-w-[380px] hero-support">
                  <p className="font-body text-black text-[17px] leading-[1.4] mb-6">
                    <span className="font-headline text-[22px] leading-none tracking-[-0.015em] text-black uppercase block mb-3">
                      COMUNICAR É MISSÃO.
                    </span>
                    Uma camiseta para quem serve <br /> anunciando a mensagem.
                  </p>
                  <div className="w-[112px] h-[4px] bg-black" />
                </div>
                <div className="relative z-[3] shadow-[0_35px_70px_rgba(0,0,0,0.15)]">
                  <div className="bg-white p-0 w-[680px] h-[510px] xl:w-[820px] xl:h-[615px] relative overflow-hidden rounded-none border-none">
                    <Image
                      src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/PEDRO%20E%20SARA%20-%20COSTAS%20E%20FRENTE.jpg"
                      alt="IAP Camisetas Campaign"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
              <h2 className="hero-title-bottom relative z-[2] font-headline text-black text-center uppercase leading-[0.86] tracking-[-0.05em] mt-4 xl:mt-6 text-[clamp(82px,10vw,138px)] xl:text-[clamp(110px,10vw,250px)]">
                SPEAK
              </h2>
              <div className="hero-cta relative z-[5] mt-12 xl:mt-16">
                <Button asChild className="pill-button bg-[#ff1f17] text-white font-bold px-10 py-5 text-[16px] lg:px-12 lg:py-6 lg:text-[18px] xl:px-14 xl:py-8 hover:bg-black transition-all uppercase tracking-[0.02em] shadow-none min-w-[290px]">
                  <a href="#ofertas">COMPRAR AGORA</a>
                </Button>
              </div>
            </div>

            {/* MOBILE ONLY HERO VERSION */}
            <div className="flex lg:hidden flex-col items-center w-full pt-10">
              <h1 className="hero-title-top font-headline text-black text-center uppercase leading-[0.9] tracking-[-0.035em] mb-[-6px] text-[clamp(34px, 9.4vw, 56px)] z-[1]">
                LET CREATIVITY
              </h1>
              <div className="hero-image-frame relative z-[3] mt-2 mb-0 shadow-[0_25px_50px_rgba(0,0,0,0.1)]">
                <div className="bg-white p-0 w-[300px] h-[225px] relative overflow-hidden rounded-none border-none">
                  <Image
                    src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/Carol%20costas.jpg"
                    alt="Carol costas camiseta IAP"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <h2 className="hero-title-bottom relative z-[2] font-headline text-black text-center uppercase leading-[0.85] tracking-[-0.045em] mt-8 mb-[18px] text-[clamp(54px,16vw,86px)]">
                SPEAK
              </h2>
              <div className="hero-support flex flex-col items-center text-center px-4 mb-10 mt-1">
                <h3 className="font-headline text-black text-xl leading-[1.02] tracking-[-0.015em] uppercase">
                  COMUNICAR É MISSÃO.
                </h3>
              </div>
              <Button asChild className="hero-cta pill-button bg-[#ff1f17] text-white font-extrabold px-8 py-6 text-[15px] hover:bg-black transition-all uppercase tracking-[0.01em] shadow-none min-w-[208px]">
                <a href="#reserva">COMPRAR AGORA</a>
              </Button>
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="py-24 bg-white border-t border-[#f0f0f0] gsap-reveal">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative aspect-[3/4] w-full lg:max-w-md mx-auto rounded-none overflow-hidden shadow-2xl">
                <Image
                  src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_175533.jpg"
                  alt="Camiseta em Destaque"
                  fill
                  className="object-cover"
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
        <section id="ofertas" className="py-24 bg-[#efefef] scroll-mt-20 gsap-reveal">
          <div className="container mx-auto px-6 text-center">
            <h3 className="mb-4 text-black uppercase">ESCOLHA A MELHOR OPÇÃO PRA VOCÊ</h3>
            <p className="text-black mb-12 font-medium">Cada camiseta por R$ 78,00</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-[2rem] border border-[#dddddd] flex flex-col items-center justify-between hover:shadow-xl transition-all group">
                <div className="w-full text-center">
                  <div className="relative aspect-square w-full mb-8 rounded-2xl overflow-hidden bg-[#f5f5f5]">
                    <Image
                      src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/PEDRO%20E%20SARA%20-%20COSTAS%20E%20FRENTE.jpg"
                      alt="Camiseta Individual"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 p-8"
                    />
                  </div>
                  <h4 className="text-lg font-normal uppercase tracking-widest mb-2 font-headline text-black">LEVE 1 - Camiseta IAP</h4>
                  <div className="flex flex-col items-center gap-1 mb-8">
                    <span className="text-4xl font-normal tracking-tighter text-black font-headline">R$ 78,00</span>
                    <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-tighter">
                      <CheckCircle2 className="h-3 w-3" /> 10% OFF no Pix
                    </div>
                  </div>
                </div>
                <Button asChild className="w-full h-14 bg-black text-white hover:bg-accent pill-button border-none">
                  <a href="#reserva">COMPRAR AGORA</a>
                </Button>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border border-[#dddddd] flex flex-col items-center justify-between hover:shadow-xl transition-all group ring-2 ring-accent/20">
                <div className="w-full text-center">
                  <div className="relative aspect-square w-full mb-8 rounded-2xl overflow-hidden bg-[#f5f5f5]">
                    <Image
                      src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180837.jpg"
                      alt="Kit Promocional"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 p-8"
                    />
                    <div className="absolute top-4 right-4 bg-accent text-white text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-widest">
                      Melhor Oferta
                    </div>
                  </div>
                  <h4 className="text-lg font-normal uppercase tracking-widest mb-2 font-headline text-black">LEVE 2 - Promoção</h4>
                  <div className="flex flex-col items-center gap-1 mb-8">
                    <span className="text-4xl font-normal tracking-tighter text-black font-headline">R$ 140,40</span>
                    <span className="text-xs text-black font-semibold">R$ 70,20 cada</span>
                  </div>
                </div>
                <Button asChild className="w-full h-14 bg-black text-white hover:bg-accent pill-button border-none">
                  <a href="#reserva">APROVEITAR KIT</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ORDER FORM SECTION */}
        <section className="py-24 bg-white gsap-reveal" id="produtos">
          <div className="container mx-auto px-6 text-center mb-12">
            <h3 className="uppercase text-black">Reserva Online</h3>
          </div>
          <div className="container mx-auto px-6">
            <OrderForm />
          </div>
        </section>

        {/* GALLERY MOSAIC SECTION */}
        <section className="py-24 bg-[#efefef] gsap-reveal">
          <div className="container mx-auto px-6 max-w-[1400px]">
            <div className="grid grid-cols-2 md:grid-cols-8 lg:grid-cols-12 lg:grid-rows-[repeat(12,minmax(0,1fr))] gap-2 md:gap-2 lg:gap-2.5 aspect-auto lg:aspect-square">
              {mosaicItems.map((item, i) => (
                <Dialog key={item.id}>
                  <DialogTrigger asChild>
                    <div className={cn(
                      "relative overflow-hidden cursor-pointer bg-[#dddddd] transition-all duration-300 hover:z-10",
                      "group",
                      item.className
                    )}>
                      <Image
                        src={item.src}
                        alt={`Galeria Mosaic ${i + 1}`}
                        fill
                        className="object-cover transition-all duration-[220ms] ease-in-out group-hover:scale-[1.03] group-hover:brightness-[1.02]"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Maximize2 className="text-white h-8 w-8" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-0 border-none bg-transparent shadow-none flex items-center justify-center">
                    <DialogTitle className="sr-only">Foto da Galeria {i + 1}</DialogTitle>
                    <div className="relative w-[90vw] h-[70vh] sm:h-[85vh]">
                      <Image
                        src={item.src}
                        alt={`Galeria Full ${i + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
            
            <div className="mt-8 lg:mt-10 flex justify-center">
              <Button 
                variant="outline" 
                className="rounded-none border-[1.5px] border-[#111111] px-8 py-4 font-body font-bold text-[15px] uppercase tracking-[0.03em] text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300 h-auto"
              >
                VER TODAS AS FOTOS
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-24 bg-white scroll-mt-20 gsap-reveal">
          <div className="container mx-auto px-6 max-w-2xl">
            <h3 className="mb-12 text-center text-black uppercase">Perguntas Frequentes</h3>
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
          <div className="font-headline text-[22px] font-normal tracking-wider mb-12 uppercase text-black">
            <span>IAP</span><span className="text-accent">CAMISETAS</span>
          </div>
          <div className="border-t border-black/10 pt-12 text-[10px] font-bold uppercase tracking-[0.3em] text-black font-body opacity-40">
            © {new Date().getFullYear()} IAP Barreirinha. Ministério de Comunicação.
          </div>
        </div>
      </footer>
    </div>
  );
}
