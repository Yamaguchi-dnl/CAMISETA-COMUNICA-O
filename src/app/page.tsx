
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { OrderForm } from '@/components/OrderForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Maximize2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
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
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleIntroComplete = () => {
    setIsIntroFinished(true);
  };

  useGSAP(() => {
    if (!containerRef.current || !isIntroFinished) return;

    ScrollTrigger.refresh();

    // 1. HERO LOAD SEQUENCE
    const heroTl = gsap.timeline();
    
    gsap.set('.hero-section', { opacity: 1 });
    gsap.set(['.hero-image-wrapper', '.hero-bg-text', '.hero-label'], { 
      opacity: 0,
      y: 20
    });

    heroTl
      .fromTo('.hero-image-wrapper', 
        { opacity: 0, scale: 0.94, y: 34 }, 
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power4.out' }
      )
      .fromTo('.hero-bg-text', 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, 
        '-=0.85'
      )
      .fromTo('.hero-label', 
        { y: 16, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 
        '-=0.5'
      );

    // 2. GENERAL REVEALS
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
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/PEDRO%20E%20SARA%20-%20COSTAS%20E%20FRENTE.jpg",
      className: "lg:col-start-1 lg:col-span-6 lg:row-start-1 lg:row-span-6 md:col-start-1 md:col-span-4 md:row-start-1 md:row-span-4 col-span-2",
    },
    {
      id: "image_2",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180209.jpg",
      className: "lg:col-start-7 lg:col-span-3 lg:row-start-1 lg:row-span-3 md:col-start-5 md:col-span-2 md:row-start-1 md:row-span-2 col-span-1",
    },
    {
      id: "image_3",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180506.jpg",
      className: "lg:col-start-10 lg:col-span-3 lg:row-start-1 lg:row-span-3 md:col-start-7 md:col-span-2 md:row-start-1 md:row-span-2 col-span-1",
    },
    {
      id: "image_4",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180553.jpg",
      className: "lg:col-start-7 lg:col-span-2 lg:row-start-4 lg:row-span-3 md:col-start-5 md:col-span-2 md:row-start-3 md:row-span-2 col-span-1",
    },
    {
      id: "image_5",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180837.jpg",
      className: "lg:col-start-9 lg:col-span-2 lg:row-start-4 lg:row-span-3 md:col-start-7 md:col-span-2 md:row-start-3 md:row-span-2 col-span-1",
    },
    {
      id: "image_6",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180801.jpg",
      className: "lg:col-start-11 lg:col-span-2 lg:row-start-4 lg:row-span-3 md:col-start-5 md:col-span-2 md:row-start-5 md:row-span-2 col-span-1",
    },
    {
      id: "image_7",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_175533.jpg",
      className: "lg:col-start-1 lg:col-span-4 lg:row-start-7 lg:row-span-6 md:col-start-1 md:col-span-4 md:row-start-5 md:row-span-4 col-span-2",
    },
    {
      id: "image_8",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/Carol%20costas.jpg",
      className: "lg:col-start-5 lg:col-span-4 lg:row-start-7 lg:row-span-6 md:col-start-1 md:col-span-4 md:row-start-9 md:row-span-2 col-span-2",
    },
    {
      id: "image_9",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/PEDRO%20E%20SARA%20-%20COSTAS%20E%20FRENTE.jpg",
      className: "lg:col-start-9 lg:col-span-4 lg:row-start-7 lg:row-span-6 md:col-start-5 md:col-span-4 md:row-start-7 md:row-span-4 col-span-2",
    },
  ];

  return (
    <div ref={containerRef} className="flex min-h-screen flex-col bg-white">
      <IntroLoader onComplete={handleIntroComplete} />
      <Toaster />

      <main className="flex-1">
        {/* PREMIUM EDITORIAL HERO */}
        <section className="hero-section opacity-0 relative bg-[#efefef] overflow-hidden min-h-[620px] md:min-h-[760px] lg:min-h-[920px] flex items-center justify-center py-12 lg:py-24">
          <div className="container relative z-10 max-w-[1440px] px-4 md:px-6 lg:px-8 h-full flex flex-col items-center justify-center">
            
            {/* INSTITUTIONAL LABEL - TOP LEFT */}
            <div className="hero-label absolute top-6 left-4 md:top-10 md:left-6 lg:top-[70px] lg:left-8 z-[4]">
              <span className="font-body font-medium text-[13px] md:text-[18px] lg:text-[22px] tracking-[0.08em] uppercase text-[#6f6f6f] whitespace-nowrap">
                COMUNICAÇÃO • BARREIRINHA
              </span>
            </div>

            {/* BACKGROUND TYPOGRAPHY - Larger and Positioned towards the bottom of the image */}
            <div className="hero-bg-text absolute left-1/2 top-[60%] md:top-[65%] lg:top-[70%] -translate-x-1/2 -translate-y-1/2 z-[1] w-[96%] md:w-[94%] lg:w-[94%] pointer-events-none text-center">
              <h1 className="font-headline text-black uppercase leading-[0.88] tracking-[-0.025em] text-[clamp(54px,15vw,120px)] md:text-[clamp(100px,14vw,200px)] lg:text-[clamp(160px,16vw,340px)] whitespace-nowrap inline-block">
                CREATIVITY
              </h1>
            </div>

            {/* MAIN IMAGE - Relative and Centered Over Word */}
            <div className="hero-image-wrapper relative z-[3] w-[min(92vw,400px)] aspect-[4/5] md:w-[min(72vw,640px)] md:aspect-[4/3] lg:w-[min(58vw,760px)] lg:aspect-[4/3] overflow-hidden shadow-none">
              <Image
                src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/PEDRO%20E%20SARA%20-%20COSTAS%20E%20FRENTE.jpg"
                alt="IAP Camisetas Campaign"
                fill
                className="object-cover object-center"
                priority
              />
            </div>

          </div>
        </section>

        {/* GALLERY MOSAIC SECTION */}
        <section className="py-16 bg-[#efefef] gsap-reveal overflow-hidden">
          <div className="container mx-auto px-6 max-w-[1240px]">
            <div className={cn(
              "grid grid-cols-2 md:grid-cols-8 lg:grid-cols-12 gap-2 overflow-hidden bg-transparent transition-all duration-500",
              isMounted && isGalleryExpanded 
                ? "lg:grid-rows-[repeat(12,minmax(0,1fr))] lg:aspect-square md:grid-rows-[repeat(10,minmax(0,1fr))] md:aspect-[8/10] h-auto" 
                : "h-[400px] lg:h-[600px]"
            )}>
              {mosaicItems.map((item, i) => {
                if (!isGalleryExpanded && i >= 6) return null;
                
                return (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <div className={cn(
                        "relative overflow-hidden cursor-pointer bg-[#dddddd] transition-all duration-300 group",
                        item.className
                      )}>
                        <Image
                          src={item.src}
                          alt={`Galeria Mosaic ${i + 1}`}
                          fill
                          className="object-cover transition-all duration-[220ms] ease-in-out group-hover:scale-[1.025] group-hover:brightness-[1.03]"
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
                );
              })}
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button 
                onClick={() => setIsGalleryExpanded(!isGalleryExpanded)}
                className="rounded-full px-10 py-5 transition-all duration-300 font-bold uppercase tracking-[0.05em] text-sm flex items-center justify-center gap-2 h-14 bg-black text-white hover:bg-accent min-w-[240px]"
              >
                {isGalleryExpanded ? 'VER MENOS FOTOS' : 'VER TODAS AS FOTOS'}
              </Button>
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION - BLACK BACKGROUND */}
        <section className="py-24 bg-black border-t border-white/5 gsap-reveal">
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
                      <div className="w-4 h-4 rounded-full bg-white ring-4 ring-white/10 group-hover:scale-125 transition-transform" />
                      {i !== benefits.length - 1 && <div className="w-px h-full bg-white/20 mt-4" />}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold uppercase mb-3 tracking-wide font-headline text-white">{benefit.title}</h4>
                      <p className="text-white/80 font-normal leading-relaxed">{benefit.text}</p>
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
                <Button asChild className="rounded-full px-10 py-5 transition-all duration-300 font-bold uppercase tracking-[0.05em] text-sm flex items-center justify-center gap-2 h-14 bg-black text-white hover:bg-accent w-full">
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
                <Button asChild className="rounded-full px-10 py-5 transition-all duration-300 font-bold uppercase tracking-[0.05em] text-sm flex items-center justify-center gap-2 h-14 bg-black text-white hover:bg-accent w-full">
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
