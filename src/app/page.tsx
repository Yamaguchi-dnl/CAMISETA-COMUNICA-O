
'use client';

import Image from 'next/image';
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
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gallerySectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleIntroComplete = () => {
    setIsIntroFinished(true);
  };

  useGSAP(() => {
    if (!containerRef.current || !isIntroFinished) return;

    // Garante que as posições sejam recalculadas após o loader
    ScrollTrigger.refresh();

    // Hero Animation
    const heroTl = gsap.timeline();
    
    gsap.set(['.hero-section', '.mobile-hero-section'], { opacity: 1 });
    gsap.set(['.hero-main-image', '.hero-bottom-word', '.hero-left-block', '.hero-right-line', '.mobile-hero-main-image', '.mobile-hero-bottom-word', '.mobile-hero-left-block'], { 
      opacity: 0,
    });

    heroTl
      .fromTo(['.hero-main-image', '.mobile-hero-main-image'], 
        { opacity: 0, scale: 0.94, y: 34 }, 
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power4.out' }
      )
      .fromTo(['.hero-bottom-word', '.mobile-hero-bottom-word'], 
        { opacity: 0, y: 80 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, 
        '-=0.85'
      )
      .fromTo(['.hero-left-block', '.hero-right-line', '.mobile-hero-left-block'], 
        { y: -20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, 
        '-=0.7'
      );

    // Gallery Auto-Assemble Animation
    if (gallerySectionRef.current) {
      const galleryTl = gsap.timeline({
        scrollTrigger: {
          trigger: gallerySectionRef.current,
          start: "top 90%",
          once: true,
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        }
      });

      // Estado inicial forçado via GSAP para evitar flashes ou bugs de renderização
      gsap.set(".gallery-mosaic-item", { 
        opacity: 0, 
        willChange: "transform, opacity" 
      });

      const staggerTime = 0.08;
      const baseDuration = 1.8;
      
      galleryTl.fromTo(".gallery-mosaic-item--1", 
        { x: "-120vw", y: "4vh", scale: 1.08, opacity: 0 }, 
        { x: "0vw", y: "0vh", scale: 1, opacity: 1, duration: baseDuration, ease: "expo.out" }, 
        0
      );
      galleryTl.fromTo(".gallery-mosaic-item--2", 
        { x: "0vw", y: "-110vh", scale: 1.06, opacity: 0 }, 
        { x: "0vw", y: "0vh", scale: 1, opacity: 1, duration: baseDuration * 0.9, ease: "expo.out" }, 
        staggerTime
      );
      galleryTl.fromTo(".gallery-mosaic-item--3", 
        { x: "115vw", y: "-8vh", scale: 1.06, opacity: 0 }, 
        { x: "0vw", y: "0vh", scale: 1, opacity: 1, duration: baseDuration * 0.95, ease: "expo.out" }, 
        staggerTime * 2
      );
      galleryTl.fromTo(".gallery-mosaic-item--4", 
        { x: "-70vw", y: "105vh", scale: 1.04, opacity: 0 }, 
        { x: "0vw", y: "0vh", scale: 1, opacity: 1, duration: baseDuration * 0.92, ease: "expo.out" }, 
        staggerTime * 3
      );
      galleryTl.fromTo(".gallery-mosaic-item--5", 
        { x: "0vw", y: "115vh", scale: 1.04, opacity: 0 }, 
        { x: "0vw", y: "0vh", scale: 1, opacity: 1, duration: baseDuration * 0.92, ease: "expo.out" }, 
        staggerTime * 4
      );
      galleryTl.fromTo(".gallery-mosaic-item--6", 
        { x: "85vw", y: "105vh", scale: 1.04, opacity: 0 }, 
        { x: "0vw", y: "0vh", scale: 1, opacity: 1, duration: baseDuration * 0.94, ease: "expo.out" }, 
        staggerTime * 5
      );
      galleryTl.fromTo(".gallery-mosaic-item--7", 
        { x: "-110vw", y: "-6vh", scale: 1.05, opacity: 0 }, 
        { x: "0vw", y: "0vh", scale: 1, opacity: 1, duration: baseDuration, ease: "expo.out" }, 
        staggerTime * 6
      );
      galleryTl.fromTo(".gallery-mosaic-item--8", 
        { x: "0vw", y: "112vh", scale: 1.05, opacity: 0 }, 
        { x: "0vw", y: "0vh", scale: 1, opacity: 1, duration: baseDuration, ease: "expo.out" }, 
        staggerTime * 7
      );
      galleryTl.fromTo(".gallery-mosaic-item--9", 
        { x: "110vw", y: "-10vh", scale: 1.05, opacity: 0 }, 
        { x: "0vw", y: "0vh", scale: 1, opacity: 1, duration: baseDuration, ease: "expo.out" }, 
        staggerTime * 8
      );

      galleryTl.fromTo(".gallery-mosaic-item", 
        { scale: 1.012 }, 
        { scale: 1, duration: 0.55, ease: "power2.out" }, 
        "-=1.2"
      );
    }

    // Generic Section Reveal
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
    { q: "Qual a diferença entre a camiseta preta e a off-white?", a: "A principal diferença é a cor. Ambas seguem a mesma proposta visual e material premium." },
    { q: "Quais tamanhos estarão disponíveis?", a: "PP, P, M, G, GG e XGG." },
    { q: "O pagamento é feito no site?", a: "Não. O pedido é iniciado no site e finalizado pelo WhatsApp para sua segurança." },
    { q: "Como funciona a opção parcelada?", a: "Ao selecionar parcelamento (crédito), há um acréscimo de 7% e nossa equipe entrará em contato via WhatsApp para combinar as parcelas." },
  ];

  const benefits = [
    { title: "Visual alinhado e representativo", text: "Uma camiseta pensada para transmitir unidade e identidade do Ministério de Comunicação." },
    { title: "Conforto para cultos e eventos", text: "Modelagem confortável para uso em escalas e programações especiais." },
    { title: "Duas opções de cor", text: "Disponível nas versões preta e off-white." },
  ];

  const mosaicItems = [
    {
      id: "image_1",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/PEDRO%20E%20SARA%20-%20COSTAS%20E%20FRENTE.jpg",
      className: "lg:col-start-1 lg:col-span-6 lg:row-start-1 lg:row-span-6 md:col-start-1 md:col-span-4 md:row-start-1 md:row-span-4 col-span-1 row-span-1 md:row-span-4 md:col-span-4 gallery-mosaic-item--1",
    },
    {
      id: "image_2",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180209.jpg",
      className: "lg:col-start-7 lg:col-span-3 lg:row-start-1 lg:row-span-3 md:col-start-5 md:col-span-2 md:row-start-1 md:row-span-2 col-span-1 row-span-1 gallery-mosaic-item--2",
    },
    {
      id: "image_3",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180506.jpg",
      className: "lg:col-start-10 lg:col-span-3 lg:row-start-1 lg:row-span-3 md:col-start-7 md:col-span-2 md:row-start-1 md:row-span-2 col-span-1 row-span-1 gallery-mosaic-item--3",
    },
    {
      id: "image_4",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180553.jpg",
      className: "lg:col-start-7 lg:col-span-2 lg:row-start-4 lg:row-span-3 md:col-start-5 md:col-span-2 md:row-start-3 md:row-span-2 col-span-1 row-span-1 gallery-mosaic-item--4",
    },
    {
      id: "image_5",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180837.jpg",
      className: "lg:col-start-9 lg:col-span-2 lg:row-start-4 lg:row-span-3 md:col-start-7 md:col-span-2 md:row-start-3 md:row-span-2 col-span-1 row-span-1 gallery-mosaic-item--5",
    },
    {
      id: "image_6",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180801.jpg",
      className: "lg:col-start-11 lg:col-span-2 lg:row-start-4 lg:row-span-3 md:col-start-5 md:col-span-2 md:row-start-5 md:row-span-2 col-span-1 row-span-1 gallery-mosaic-item--6",
    },
    {
      id: "image_7",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_175533.jpg",
      className: "lg:col-start-1 lg:col-span-4 lg:row-start-7 lg:row-span-6 md:col-start-1 md:col-span-4 md:row-start-5 md:row-span-4 col-span-1 row-span-1 md:row-span-4 md:col-span-4 gallery-mosaic-item--7",
    },
    {
      id: "image_8",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/Carol%20costas.jpg",
      className: "lg:col-start-5 lg:col-span-4 lg:row-start-7 lg:row-span-6 md:col-start-1 md:col-span-4 md:row-start-9 md:row-span-2 col-span-1 row-span-1 md:row-span-2 md:col-span-4 gallery-mosaic-item--8",
    },
    {
      id: "image_9",
      src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180559.jpg",
      className: "lg:col-start-9 lg:col-span-4 lg:row-start-7 lg:row-span-6 md:col-start-5 md:col-span-4 md:row-start-7 md:row-span-4 col-span-1 row-span-1 md:row-span-4 md:col-span-4 gallery-mosaic-item--9",
    },
  ];

  return (
    <div ref={containerRef} className="flex min-h-screen flex-col bg-white">
      <IntroLoader onComplete={handleIntroComplete} />
      <Toaster />

      <main className="flex-1">
        <section className="hero-section hidden md:block opacity-0 relative bg-[#efefef] overflow-hidden h-[840px] md:h-[760px] lg:h-[840px]">
          <div className="mx-auto w-full max-w-[1600px] h-full relative px-0">
            <div className="hero-left-block absolute z-[5] top-[128px] left-[30px] md:top-[120px] md:left-[22px] max-w-none">
              <h2 className="font-headline text-[20px] md:text-[18px] lg:text-[20px] text-black uppercase leading-none mb-1.5 tracking-[-0.01em]">
                COMUNICAR É MISSÃO.
              </h2>
              <p className="font-body text-[16px] md:text-[14px] lg:text-[16px] text-[#222222] leading-[1.35] md:max-w-[200px] lg:max-w-[260px]">
                Uma camiseta para quem serve anunciando a mensagem.
              </p>
            </div>
            <div className="hero-right-line absolute z-[5] bg-[#111111] top-[146px] right-[48px] w-[72px] h-[3px] md:top-[136px] md:right-[28px] md:w-[64px]" />
            <div className="hero-main-image absolute z-[4] left-1/2 -translate-x-1/2 overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.10)] top-[198px] w-[820px] h-[610px] md:top-[190px] md:w-[700px] md:h-[520px]">
              <Image
                src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/PEDRO%20E%20SARA%20-%20COSTAS%20E%20FRENTE.jpg"
                alt="IAP Camisetas Campaign"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            <div className="hero-bottom-word absolute z-[2] left-1/2 -translate-x-1/2 pointer-events-none text-center bottom-[80px] md:bottom-[60px]">
              <h1 className="font-headline text-black uppercase leading-[0.82] tracking-[-0.04em] whitespace-nowrap inline-block text-[260px] md:text-[200px]">
                CREATIVITY
              </h1>
            </div>
          </div>
        </section>

        <section className="mobile-hero-section md:hidden block opacity-0 relative bg-[#efefef] overflow-hidden h-[100svh] min-h-[760px]">
          <div className="w-full h-full relative">
            <div className="mobile-hero-left-block absolute z-[5] top-[96px] left-[20px]">
              <h2 className="font-headline text-[18px] text-black uppercase leading-none mb-[6px] tracking-[-0.01em]">
                COMUNICAR É MISSÃO.
              </h2>
              <p className="font-body text-[14px] text-[#222222] leading-[1.3] max-w-[220px]">
                Uma camiseta para quem serve anunciando a mensagem.
              </p>
            </div>
            <div className="mobile-hero-main-image absolute z-[4] top-[190px] left-1/2 -translate-x-1/2 w-[292px] h-[424px] overflow-hidden shadow-[0_10px_24px_rgba(0,0,0,0.10)]">
              <Image
                src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/Carol%20costas.jpg"
                alt="IAP Camisetas Campaign Mobile"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            <div className="mobile-hero-bottom-word absolute z-[2] left-1/2 -translate-x-1/2 bottom-[140px] text-center pointer-events-none">
              <h1 className="font-headline text-black uppercase leading-[0.82] tracking-[-0.04em] whitespace-nowrap inline-block text-[70px]">
                CREATIVITY
              </h1>
            </div>
          </div>
        </section>

        <section ref={gallerySectionRef} className="gallery-mosaic-section py-16 lg:py-32 bg-[#efefef] overflow-hidden flex items-center justify-center min-h-[100vh]">
          <div className="container mx-auto px-4 max-w-[1240px]">
            <div className="grid grid-cols-2 md:grid-cols-8 lg:grid-cols-12 gap-3 overflow-hidden bg-transparent h-auto">
              {mosaicItems.map((item, i) => {
                return (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <div className={cn(
                        "gallery-mosaic-item relative overflow-hidden cursor-pointer bg-[#dddddd] group rounded-none",
                        item.className
                      )}>
                        <Image
                          src={item.src}
                          alt={`Galeria Mosaic ${i + 1}`}
                          fill
                          className="object-cover transition-all duration-[350ms] ease-in-out group-hover:scale-[1.05] group-hover:brightness-[1.05]"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Maximize2 className="text-white h-8 w-8 scale-75 group-hover:scale-100 transition-transform" />
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
          </div>
        </section>

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

        <section id="ofertas" className="py-24 bg-[#efefef] scroll-mt-20 gsap-reveal">
          <div className="container mx-auto px-6 text-center">
            <h3 className="mb-4 text-black uppercase">ESCOLHA A MELHOR OPÇÃO PRA VOCÊ</h3>
            <p className="text-black mb-12 font-medium">Cada camiseta por R$ 79,90 (no Pix)</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-none border border-[#dddddd] flex flex-col items-center justify-between hover:shadow-xl transition-all group">
                <div className="w-full text-center">
                  <div className="relative aspect-square w-full mb-8 rounded-none overflow-hidden bg-[#f5f5f5]">
                    <Image
                      src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180837.jpg"
                      alt="Camiseta Individual"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 p-8"
                    />
                  </div>
                  <h4 className="text-lg font-normal uppercase tracking-widest mb-2 font-headline text-black">LEVE 1 - Camiseta IAP</h4>
                  <div className="flex flex-col items-center gap-1 mb-8">
                    <span className="text-4xl font-normal tracking-tighter text-black font-headline">R$ 79,90</span>
                    <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-tighter">
                      <CheckCircle2 className="h-3 w-3" /> Preço no Pix
                    </div>
                  </div>
                </div>
                <Button asChild className="pill-button bg-black text-white hover:bg-accent w-full rounded-full">
                  <a href="#reserva">COMPRAR AGORA</a>
                </Button>
              </div>

              <div className="bg-white p-8 rounded-none border border-[#dddddd] flex flex-col items-center justify-between hover:shadow-xl transition-all group">
                <div className="w-full text-center">
                  <div className="relative aspect-square w-full mb-8 rounded-none overflow-hidden bg-[#f5f5f5]">
                    <Image
                      src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/PEDRO%20E%20SARA%20-%20COSTAS%20E%20FRENTE.jpg"
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
                    <span className="text-4xl font-normal tracking-tighter text-black font-headline">R$ 139,90</span>
                    <span className="text-xs text-black font-semibold">R$ 69,95 cada</span>
                  </div>
                </div>
                <Button asChild className="pill-button bg-black text-white hover:bg-accent w-full rounded-full">
                  <a href="#reserva">APROVEITAR KIT</a>
                </Button>
              </div>
            </div>
            <p className="mt-8 text-sm text-black/60 font-medium">* Pagamentos no cartão de crédito possuem acréscimo de 7%.</p>
          </div>
        </section>

        <section className="py-24 bg-white gsap-reveal" id="produtos">
          <div className="container mx-auto px-6">
            <OrderForm />
          </div>
        </section>

        <section id="faq" className="py-24 bg-white scroll-mt-20 gsap-reveal">
          <div className="container mx-auto px-6 max-w-2xl">
            <h3 className="mb-12 text-center text-black uppercase">Perguntas Frequentes</h3>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border rounded-none px-6 py-1 bg-white">
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

      <footer className="bg-white text-black py-24 border-t">
        <div className="container mx-auto px-6 text-center">
          <div className="border-t border-black/10 pt-12 text-[10px] font-bold uppercase tracking-[0.3em] text-black font-body opacity-40">
            © {new Date().getFullYear()} IAP Barreirinha. Ministério de Comunicação.
          </div>
        </div>
      </footer>
    </div>
  );
}
