'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function PurposeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Configuração inicial (Initial State Setup)
    const setInitialState = () => {
      gsap.set('.purpose-square--top-right', { opacity: 0, scale: 0.7, y: -20 });
      gsap.set('.purpose-square--bottom-left', { opacity: 0, scale: 0.7, y: 20 });
      gsap.set('.purpose-image--left', { opacity: 0, x: -80, y: 24, rotation: -10, scale: 0.96 });
      gsap.set('.purpose-image--right', { opacity: 0, x: 80, y: 26, rotation: 10, scale: 0.96 });
      gsap.set(['.purpose-title-line-1', '.purpose-title-line-2'], { 
        opacity: 0, 
        y: 60, 
        clipPath: 'inset(100% 0 0 0)' 
      });
      gsap.set(['.purpose-body-p1', '.purpose-body-p2'], { opacity: 0, y: 22 });
      gsap.set('.purpose-cta', { opacity: 0, y: 14 });
    };

    setInitialState();

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 78%',
        once: true,
        toggleActions: 'play none none none',
        invalidateOnRefresh: true,
      }
    });

    masterTl
      // Phase: Decorative Shapes In
      .to('.purpose-square--top-right', {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out'
      })
      .to('.purpose-square--bottom-left', {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out'
      }, '-=0.3')

      // Phase: Side Images In
      .to('.purpose-image--left', {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: -6,
        scale: 1,
        duration: 0.95,
        ease: 'power3.out'
      }, '-=0.2')
      .to('.purpose-image--right', {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 6,
        scale: 1,
        duration: 0.95,
        ease: 'power3.out'
      }, '-=0.6')

      // Phase: Title Reveal
      .to('.purpose-title-line-1', {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0 0 0)',
        duration: 0.8,
        ease: 'power4.out'
      }, '-=0.5')
      .to('.purpose-title-line-2', {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0 0 0)',
        duration: 0.8,
        ease: 'power4.out'
      }, '-=0.45')

      // Phase: Body Text Reveal
      .to('.purpose-body-p1', {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power2.out'
      }, '-=0.3')
      .to('.purpose-body-p2', {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power2.out'
      }, '-=0.2')

      // Phase: CTA Reveal
      .to('.purpose-cta', {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out'
      }, '-=0.1');

    // Hover Micro-interactions
    const images = ['.purpose-image--left', '.purpose-image--right'];
    images.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) {
        el.addEventListener('mouseenter', () => {
          gsap.to(el, { scale: 1.02, duration: 0.25, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { scale: 1, duration: 0.25, ease: 'power2.out' });
        });
      }
    });

    const cta = document.querySelector('.purpose-cta');
    if (cta) {
      cta.addEventListener('mouseenter', () => {
        gsap.to(cta, { x: 4, duration: 0.2, ease: 'power2.out' });
      });
      cta.addEventListener('mouseleave', () => {
        gsap.to(cta, { x: 0, duration: 0.2, ease: 'power2.out' });
      });
    }

  }, { scope: sectionRef });

  return (
    <section 
      id="proposito"
      ref={sectionRef} 
      className="purpose-section relative bg-[#efefef] min-h-[760px] md:h-[760px] overflow-hidden py-20 md:py-0 flex items-center scroll-mt-20"
    >
      <div ref={containerRef} className="container mx-auto px-6 max-w-[1600px] h-full relative">
        
        {/* Decorative Shapes */}
        <div className="purpose-square--bottom-left absolute hidden md:block left-[86px] bottom-[86px] w-[88px] h-[88px] bg-black rounded-[10px] -rotate-18 -z-0 will-change-transform" />
        <div className="purpose-square--top-right absolute hidden md:block right-[120px] top-[92px] w-[72px] h-[72px] bg-black rounded-[10px] rotate-14 -z-0 will-change-transform" />
        <div className="purpose-shape absolute md:hidden right-4 top-4 w-10 h-10 bg-black rounded-[6px] rotate-12" />

        <div className="flex flex-col md:block h-full w-full">
          
          {/* Left Image (Top on Mobile) */}
          <div className="purpose-image--left relative md:absolute top-0 md:top-[52px] md:left-[90px] w-full max-w-[200px] md:max-w-[220px] aspect-[3/4] z-10 mb-12 md:mb-0 mx-auto md:mx-0 will-change-transform">
            <Image 
              src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180209.jpg" 
              alt="Propósito IAP 1" 
              fill 
              sizes="(min-width: 768px) 220px, 200px"
              className="object-cover"
              data-ai-hint="editorial fashion"
            />
          </div>

          {/* Central Title Block */}
          <div className="md:absolute top-1/2 md:top-[140px] md:left-[60%] md:-translate-x-1/2 w-full md:w-[900px] z-20 text-center md:text-left">
            <h2 className="font-headline text-[#111111] leading-[1.02] md:leading-[0.98] tracking-[-0.03em] text-[clamp(42px,10vw,64px)] md:text-[clamp(82px,6.2vw,124px)] uppercase">
              <span className="purpose-title-line-1 block will-change-[transform,opacity,clip-path]">A MENSAGEM</span>
              <span className="purpose-title-line-2 block will-change-[transform,opacity,clip-path]">PRECISA SER OUVIDA</span>
            </h2>

            {/* Body Text and CTA */}
            <div className="mt-8 md:mt-[60px] max-w-full md:max-w-[520px]">
              <p className="purpose-body-p1 font-body text-[#333333] text-[15px] md:text-[20px] leading-[1.45] font-normal mb-4 text-center md:text-left will-change-[transform,opacity]">
                Adquirir essa camiseta é mais do que levar uma peça de roupa, é representar pessoas que acreditam que a comunicação pode levar mensagens mais longe.
              </p>
              <p className="purpose-body-p2 font-body text-[#333333] text-[15px] md:text-[20px] leading-[1.45] font-normal mb-8 text-center md:text-left will-change-[transform,opacity]">
                Você também contribui para fortalecer o Ministério de Comunicação e ajuda o Evangelho a alcançar mais vidas.
              </p>
              
              <div className="purpose-cta flex justify-center md:justify-start will-change-[transform,opacity]">
                <a 
                  href="#ofertas" 
                  className="inline-flex items-center gap-2 text-accent font-body font-semibold text-[15px] md:text-[18px] underline underline-offset-8 hover:opacity-80 transition-opacity"
                >
                  Ver camisetas
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Image (Bottom on Mobile) */}
          <div className="purpose-image--right relative md:absolute md:right-[60px] md:top-[365px] w-full max-w-[260px] md:max-w-[300px] aspect-[4/3] z-10 mt-16 md:mt-0 mx-auto md:mx-0 will-change-transform">
            <Image 
              src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_175533.jpg" 
              alt="Propósito IAP 2" 
              fill 
              sizes="(min-width: 768px) 300px, 260px"
              className="object-cover"
              data-ai-hint="editorial fashion"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
