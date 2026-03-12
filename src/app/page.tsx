'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { CheckCircle2, Maximize2 } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { IntroLoader } from '@/components/IntroLoader';
import { PurposeSection } from '@/components/PurposeSection';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

// Dynamic imports for components below the fold or interactive only
const OrderForm = dynamic(() => import('@/components/OrderForm').then(mod => mod.OrderForm), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-[#f5f5f5] animate-pulse" />
});

const Accordion = dynamic(() => import('@/components/ui/accordion').then(mod => mod.Accordion), { ssr: false });
const AccordionContent = dynamic(() => import('@/components/ui/accordion').then(mod => mod.AccordionContent), { ssr: false });
const AccordionItem = dynamic(() => import('@/components/ui/accordion').then(mod => mod.AccordionItem), { ssr: false });
const AccordionTrigger = dynamic(() => import('@/components/ui/accordion').then(mod => mod.AccordionTrigger), { ssr: false });

const Dialog = dynamic(() => import('@/components/ui/dialog').then(mod => mod.Dialog), { ssr: false });
const DialogContent = dynamic(() => import('@/components/ui/dialog').then(mod => mod.DialogContent), { ssr: false });
const DialogTrigger = dynamic(() => import('@/components/ui/dialog').then(mod => mod.DialogTrigger), { ssr: false });
const DialogTitle = dynamic(() => import('@/components/ui/dialog').then(mod => mod.DialogTitle), { ssr: false });

const Button = dynamic(() => import('@/components/ui/button').then(mod => mod.Button), { ssr: false });

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Static data outside the component to prevent re-creation
const FAQ_ITEMS = [
  { q: "Qual a diferença entre a camiseta preta e a off-white?", a: "A principal diferença é a cor. Ambas seguem a mesma proposta visual e material premium." },
  { q: "Quais tamanhos estarão disponíveis?", a: "PP, P, M, G, GG e XGG." },
  { q: "O pagamento é feito no site?", a: "Não. O pedido é iniciado no site e finalizado pelo WhatsApp para sua segurança." },
  { q: "Como funciona a opção parcelada?", a: "Ao selecionar parcelamento (crédito), há um acréscimo de 7% e nossa equipe entrará em contato via WhatsApp para combinar as parcelas." },
];

const MOSAIC_ITEMS = [
  {
    id: "image_1",
    src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/PEDRO%20E%20SARA%20-%20COSTAS%20E%20FRENTE.jpg",
    className: "lg:col-span-6 lg:row-span-12 col-span-1 gallery-mosaic-item--1",
    start: { x: "-110vw", y: "-10vh" },
    sizes: "(min-width: 1200px) 60vw, (min-width: 768px) 50vw, 100vw"
  },
  {
    id: "image_2",
    src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180209.jpg",
    className: "lg:col-span-3 lg:row-span-6 col-span-1 gallery-mosaic-item--2",
    start: { x: "-20vw", y: "-100vh" },
    sizes: "(min-width: 1200px) 25vw, (min-width: 768px) 25vw, 50vw"
  },
  {
    id: "image_3",
    src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180506.jpg",
    className: "lg:col-span-3 lg:row-span-6 col-span-1 gallery-mosaic-item--3",
    start: { x: "110vw", y: "-12vh" },
    sizes: "(min-width: 1200px) 25vw, (min-width: 768px) 25vw, 50vw"
  },
  {
    id: "image_4",
    src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180553.jpg",
    className: "lg:col-span-3 lg:row-span-6 col-span-1 gallery-mosaic-item--4",
    start: { x: "-95vw", y: "90vh" },
    sizes: "(min-width: 1200px) 25vw, (min-width: 768px) 25vw, 50vw"
  },
  {
    id: "image_5",
    src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180837.jpg",
    className: "lg:col-span-3 lg:row-span-6 col-span-1 gallery-mosaic-item--5",
    start: { x: "0vw", y: "105vh" },
    sizes: "(min-width: 1200px) 25vw, (min-width: 768px) 25vw, 50vw"
  },
  {
    id: "image_6",
    src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180801.jpg",
    className: "lg:col-span-4 lg:row-span-8 col-span-1 gallery-mosaic-item--6",
    start: { x: "95vw", y: "95vh" },
    sizes: "(min-width: 1200px) 33vw, (min-width: 768px) 33vw, 50vw"
  },
  {
    id: "image_7",
    src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_175533.jpg",
    className: "lg:col-span-4 lg:row-span-8 col-span-1 gallery-mosaic-item--7",
    start: { x: "105vw", y: "0vh" },
    sizes: "(min-width: 1200px) 33vw, (min-width: 768px) 33vw, 50vw"
  },
  {
    id: "image_8",
    src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/Carol%20costas.jpg",
    className: "lg:col-span-4 lg:row-span-8 col-span-1 gallery-mosaic-item--8",
    start: { x: "-105vw", y: "20vh" },
    sizes: "(min-width: 1200px) 33vw, (min-width: 768px) 33vw, 50vw"
  },
  {
    id: "image_9",
    src: "https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180559.jpg",
    className: "lg:col-span-12 lg:row-span-10 col-span-2 gallery-mosaic-item--9",
    start: { x: "0vw", y: "-110vh" },
    sizes: "100vw"
  },
];

export default function Home() {
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gallerySectionRef = useRef<HTMLElement>(null);
  const offerSectionRef = useRef<HTMLElement>(null);

  const handleIntroComplete = () => {
    setIsIntroFinished(true);
  };

  useGSAP(() => {
    if (!containerRef.current || !isIntroFinished) return;

    ScrollTrigger.refresh();

    // Hero Animation
    const heroTl = gsap.timeline();
    
    gsap.set(['.hero-section', '.mobile-hero-section'], { opacity: 1 });
    gsap.set(['.hero-main-image', '.hero-bottom-word', '.hero-left-block', '.hero-right-line', '.mobile-hero-main-image', '.mobile-hero-left-block', '.mobile-hero-bottom-word'], { 
      opacity: 0,
    });

    heroTl
      .fromTo(['.hero-main-image', '.mobile-hero-main-image'], 
        { opacity: 0, scale: 0.94, y: 14 }, 
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power4.out' }
      )
      .fromTo(['.hero-bottom-word', '.mobile-hero-bottom-word'], 
        { opacity: 0, y: 12 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, 
        '-=0.85'
      )
      .fromTo(['.hero-left-block', '.hero-right-line', '.mobile-hero-left-block'], 
        { y: -20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, 
        '-=0.7'
      );

    // Gallery Refined Assembly Animation
    if (gallerySectionRef.current) {
      const galleryTl = gsap.timeline({
        scrollTrigger: {
          trigger: gallerySectionRef.current,
          start: "top 90%",
          once: true,
          toggleActions: "play none none none",
        }
      });

      // Initial State
      MOSAIC_ITEMS.forEach((item, i) => {
        gsap.set(`.gallery-mosaic-item--${i + 1}`, { 
          x: item.start.x, 
          y: item.start.y, 
          scale: 1.05,
          opacity: 0 
        });
      });

      // Phase: Multi-directional Assembly
      MOSAIC_ITEMS.forEach((item, i) => {
        galleryTl.to(`.gallery-mosaic-item--${i + 1}`, {
          x: "0vw",
          y: "0vh",
          scale: 1.012,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out"
        }, i * 0.04);
      });

      // Phase: Micro Settle
      galleryTl.to(".gallery-mosaic-item", {
        scale: 1,
        duration: 0.32,
        ease: "power2.out"
      }, "-=0.2");
    }

    // Offer Section Animation
    if (offerSectionRef.current) {
      const isMobile = window.innerWidth < 768;
      const yOffset = isMobile ? 30 : 50;

      const offerTl = gsap.timeline({
        scrollTrigger: {
          trigger: offerSectionRef.current,
          start: "top 78%",
          once: true,
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        }
      });

      // Initial State Setup
      gsap.set('.offer-section-title', { opacity: 0, y: yOffset, clipPath: 'inset(100% 0 0 0)' });
      gsap.set(['.offer-card--1', '.offer-card--2'], { opacity: 0, y: yOffset, scale: 0.98 });
      gsap.set('.offer-card-image', { opacity: 0, scale: 1.03 });
      gsap.set(['.offer-card-eyebrow', '.offer-card-support', '.offer-card-main-price', '.offer-card-secondary-price', '.offer-card-highlight', '.offer-card-button'], { opacity: 0, y: 18 });
      gsap.set('.offer-card-badge--best', { opacity: 0, scale: 0.85, y: -10 });

      offerTl
        // Phase: Title Reveal
        .to('.offer-section-title', {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.85,
          ease: 'power4.out'
        })
        // Phase: Cards Reveal
        .to('.offer-card--1', {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: 'power3.out'
        }, '-=0.2')
        .to('.offer-card--2', {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: 'power3.out'
        }, '-=0.45')
        // Phase: Card Details Reveal
        .to('.offer-card-image', {
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: 'power2.out'
        }, '-=0.3')
        .to(['.offer-card-eyebrow', '.offer-card-support', '.offer-card-main-price', '.offer-card-secondary-price', '.offer-card-highlight'], {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.1,
          ease: 'power2.out'
        }, '-=0.4')
        .to('.offer-card-button', {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out'
        }, '-=0.3')
        .to('.offer-card-badge--best', {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        }, '-=0.2');

      // Hover Micro-interactions
      const cards = document.querySelectorAll('.offer-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -6, duration: 0.25, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, duration: 0.25, ease: 'power2.out' });
        });

        const img = card.querySelector('.offer-card-image');
        if (img) {
          card.addEventListener('mouseenter', () => {
            gsap.to(img, { scale: 1.02, duration: 0.25, ease: 'power2.out' });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(img, { scale: 1, duration: 0.25, ease: 'power2.out' });
          });
        }

        const btn = card.querySelector('.offer-card-button');
        if (btn) {
          btn.addEventListener('mouseenter', () => {
            gsap.to(btn, { scale: 1.03, duration: 0.2, ease: 'power2.out' });
          });
          btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { scale: 1, duration: 0.2, ease: 'power2.out' });
          });
        }
      });
    }

    const reveals = gsap.utils.toArray('.gsap-reveal');
    reveals.forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

  }, { scope: containerRef, dependencies: [isIntroFinished] });

  return (
    <div ref={containerRef} className="flex min-h-screen flex-col bg-white">
      <IntroLoader onComplete={handleIntroComplete} />
      <Toaster />

      <main className="flex-1">
        {/* Desktop Hero */}
        <section className="hero-section hidden md:block opacity-0 relative bg-[#efefef] overflow-hidden h-[840px] md:h-[720px] lg:h-[800px]">
          <div className="mx-auto w-full max-w-[1600px] h-full relative px-0">
            <div className="hero-left-block absolute z-[5] top-[90px] left-[30px] md:top-[80px] md:left-[22px] max-w-none">
              <h2 className="font-headline text-[32px] md:text-[28px] lg:text-[36px] text-black uppercase leading-none mb-2 tracking-[-0.01em]">
                COMUNICAR É MISSÃO.
              </h2>
              <p className="font-body text-[16px] md:text-[14px] lg:text-[16px] text-[#222222] leading-[1.35] md:max-w-[200px] lg:max-w-[260px]">
                Uma camiseta para quem serve anunciando a mensagem.
              </p>
            </div>
            <div className="hero-right-line absolute z-[5] bg-[#111111] top-[108px] right-[48px] w-[72px] h-[3px] md:top-[98px] md:right-[28px] md:w-[64px]" />
            <div className="hero-main-image absolute z-[4] left-1/2 -translate-x-1/2 overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.10)] top-[5px] w-[820px] h-[500px] md:w-[700px] md:h-[430px]">
              <Image
                src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/PEDRO%20E%20SARA%20-%20COSTAS%20E%20FRENTE.jpg"
                alt="IAP Camisetas Campaign"
                fill
                sizes="(min-width: 1600px) 820px, (min-width: 768px) 700px, 100vw"
                className="object-cover object-top"
                priority
                quality={95}
              />
            </div>
            <div className="hero-bottom-word absolute z-[2] left-1/2 -translate-x-1/2 pointer-events-none text-center bottom-[190px] md:bottom-[180px]">
              <h1 className="font-headline text-black uppercase leading-[0.75] tracking-[-0.05em] whitespace-nowrap inline-block text-[clamp(150px,35vw,350px)]">
                CREATIVITY
              </h1>
            </div>
          </div>
        </section>

        {/* Mobile Hero */}
        <section className="mobile-hero-section mobile-hero-section--refined md:hidden block opacity-0 relative bg-[#efefef] overflow-hidden h-[100svh] min-h-[760px]">
          <div className="w-full h-full relative">
            <div className="mobile-hero-left-block absolute z-[5] top-[86px] left-[20px]">
              <h2 className="font-headline text-[28px] text-black uppercase leading-none mb-2 tracking-[-0.01em]">
                COMUNICAR É MISSÃO.
              </h2>
              <p className="font-body text-[14px] text-[#222222] leading-[1.3] max-w-[220px]">
                Uma camiseta para quem serve anunciando a mensagem.
              </p>
            </div>
            <div className="mobile-hero-main-image absolute z-[4] top-[85px] left-1/2 -translate-x-1/2 w-[292px] h-[325px] overflow-hidden shadow-[0_10px_24px_rgba(0,0,0,0.10)]">
              <Image
                src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/Carol%20costas.jpg"
                alt="IAP Camisetas Campaign Mobile"
                fill
                sizes="(min-width: 768px) 600px, 100vw"
                className="object-cover object-top"
                priority
                quality={90}
              />
            </div>
            <div className="mobile-hero-bottom-word absolute z-[2] left-1/2 -translate-x-1/2 pointer-events-none text-center bottom-[220px]">
              <h1 className="font-headline text-black uppercase leading-[0.75] tracking-[-0.05em] whitespace-nowrap inline-block text-[clamp(80px,38vw,150px)]">
                CREATIVITY
              </h1>
            </div>
          </div>
        </section>

        <section ref={gallerySectionRef} className="gallery-mosaic-section py-16 lg:py-32 bg-black overflow-hidden flex flex-col items-center justify-center">
          <div className="container mx-auto px-4 max-w-[1240px]">
            <div className="grid grid-cols-2 md:grid-cols-8 lg:grid-cols-12 gap-3 overflow-hidden bg-transparent h-auto auto-rows-[120px] md:auto-rows-[100px] lg:auto-rows-[42px]">
              {MOSAIC_ITEMS.map((item, i) => {
                return (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <div className={cn(
                        "gallery-mosaic-item relative overflow-hidden cursor-pointer bg-[#111111] group rounded-none will-change-transform",
                        item.className
                      )}>
                        <Image
                          src={item.src}
                          alt={`Galeria Mosaic ${i + 1}`}
                          fill
                          sizes={item.sizes}
                          className="object-cover"
                          priority={true}
                          quality={95}
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
                          sizes="90vw"
                          className="object-contain"
                          quality={95}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
          </div>
        </section>

        {/* Purpose Section */}
        <PurposeSection />

        <section id="ofertas" ref={offerSectionRef} className="offer-section py-24 bg-[#f5f3ef] scroll-mt-20">
          <div className="container mx-auto px-6 max-w-[980px]">
            <h3 className="offer-section-title mb-16 text-black uppercase text-[clamp(48px,8vw,64px)] text-center will-change-[transform,opacity,clip-path]">ESCOLHA A MELHOR OPÇÃO PRA VOCÊ</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Card 1 */}
              <div className="offer-card offer-card--1 bg-[#f8f6f2] rounded-[4px] border border-[#d7d1ca] overflow-hidden flex flex-col h-full will-change-[transform,opacity]">
                <div className="relative aspect-[16/10] w-full bg-white/50">
                  <Image
                    src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180837.jpg"
                    alt="Camiseta Individual"
                    fill
                    sizes="(min-width: 768px) 490px, 100vw"
                    className="offer-card-image object-cover will-change-transform"
                    loading="lazy"
                    quality={90}
                  />
                </div>
                <div className="p-[30px] lg:p-[32px] pb-[32px] flex flex-col items-start text-left flex-grow">
                  <span className="offer-card-eyebrow text-[12px] font-bold tracking-[0.12em] text-[#6b655f] uppercase mb-[24px]">LEVE 1 — CAMISETA IAP</span>
                  <p className="offer-card-support text-[16px] font-normal text-[#4f5d73] leading-[1.5] mb-[16px]">No cartão (até 3x sem juros)</p>
                  <div className="flex flex-col mb-[14px]">
                    <span className="offer-card-main-price text-[46px] font-extrabold leading-none text-[#111111] font-headline mb-[8px]">R$ 79,90</span>
                    <span className="offer-card-secondary-price text-[16px] font-normal text-[#4f5d73]">R$ 74,90 no Pix</span>
                  </div>
                  <span className="offer-card-highlight text-[12px] font-extrabold text-[#e01b2f] uppercase tracking-[0.08em] mb-8">6% DE DESCONTO NO PIX</span>
                  
                  <div className="mt-auto w-full">
                    <Button asChild className="offer-card-button h-[44px] bg-[#050505] text-white hover:bg-black/90 w-full max-w-[380px] rounded-full mx-auto font-extrabold uppercase tracking-[0.12em] text-[14px] flex">
                      <a href="#reserva">COMPRAR AGORA</a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Card 2 - Featured */}
              <div className="offer-card offer-card--2 bg-[#f8f6f2] rounded-[4px] border-2 border-[#e01b2f] overflow-hidden flex flex-col h-full will-change-[transform,opacity] relative">
                <div className="offer-card-badge--best absolute top-[20px] right-[20px] bg-[#e01b2f] text-white text-[12px] font-extrabold py-1 px-[14px] rounded-full uppercase tracking-[0.04em] z-10 will-change-[transform,opacity]">
                  Melhor Oferta
                </div>
                <div className="relative aspect-[16/10] w-full bg-white/50">
                  <Image
                    src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/PEDRO%20E%20SARA%20-%20COSTAS%20E%20FRENTE.jpg"
                    alt="Kit Promocional"
                    fill
                    sizes="(min-width: 768px) 490px, 100vw"
                    className="offer-card-image object-cover will-change-transform"
                    loading="lazy"
                    quality={95}
                  />
                </div>
                <div className="p-[30px] lg:p-[32px] pb-[32px] flex flex-col items-start text-left flex-grow">
                  <span className="offer-card-eyebrow text-[12px] font-bold tracking-[0.12em] text-[#6b655f] uppercase mb-[24px]">LEVE 2 — PROMOÇÃO ESPECIAL</span>
                  <p className="offer-card-support text-[16px] font-normal text-[#4f5d73] leading-[1.5] mb-[16px]">2 camisetas no cartão</p>
                  <div className="flex flex-col mb-[14px]">
                    <span className="offer-card-main-price text-[46px] font-extrabold leading-none text-[#111111] font-headline mb-[8px]">R$ 149,90</span>
                    <div className="flex flex-col">
                      <span className="offer-card-secondary-price text-[16px] font-normal text-[#4f5d73]">R$ 139,90 no Pix</span>
                      <span className="text-[14px] text-[#6f6a63] font-normal mt-1 italic">ou R$ 69,95 cada no Pix</span>
                    </div>
                  </div>
                  <span className="offer-card-highlight text-[12px] font-extrabold text-[#e01b2f] uppercase tracking-[0.08em] mb-8">ECONOMIA DE R$ 19,90</span>
                  
                  <div className="mt-auto w-full">
                    <Button asChild className="offer-card-button h-[44px] bg-[#e01b2f] text-white hover:bg-[#e01b2f]/90 w-full max-w-[380px] rounded-full mx-auto font-extrabold uppercase tracking-[0.12em] text-[14px] border-none flex">
                      <a href="#reserva">APROVEITAR KIT</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-12 text-center text-[13px] text-[#6f6a63] font-medium">* Os descontos de Pix são calculados sobre o valor unitário de R$ 79,90.</p>
          </div>
        </section>

        <section id="faq" className="py-24 bg-white scroll-mt-20 gsap-reveal">
          <div className="container mx-auto px-6 max-w-2xl">
            <h3 className="text-center text-black uppercase mb-12 text-[48px] lg:text-[56px]">Perguntas Frequentes</h3>
            {Accordion && (
              <Accordion type="single" collapsible className="w-full space-y-4">
                {FAQ_ITEMS.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border rounded-none px-6 py-1 bg-white">
                    <AccordionTrigger className="text-left font-medium uppercase text-[18px] tracking-widest hover:no-underline font-body text-black">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-black font-normal text-base leading-relaxed font-body">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </section>

        <section id="reserva" className="py-24 bg-white scroll-mt-20 gsap-reveal">
          <div className="container mx-auto px-6">
            <OrderForm />
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
