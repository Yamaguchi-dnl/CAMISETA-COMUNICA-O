
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

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    });

    tl.from('.purpose-reveal', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    })
    .from('.purpose-image', {
      scale: 0.9,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'expo.out'
    }, '-=0.5')
    .from('.purpose-shape', {
      scale: 0,
      rotate: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, '-=0.8');

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[#efefef] min-h-[760px] md:h-[760px] overflow-hidden py-20 md:py-0 flex items-center"
    >
      <div className="container mx-auto px-6 max-w-[1600px] h-full relative">
        
        {/* Decorative Shapes */}
        <div className="purpose-shape absolute hidden md:block left-[86px] bottom-[86px] w-[88px] h-[88px] bg-[#f3a012] rounded-[10px] -rotate-18 -z-0" />
        <div className="purpose-shape absolute hidden md:block right-[120px] top-[92px] w-[72px] h-[72px] bg-[#f3a012] rounded-[10px] rotate-14 -z-0" />
        <div className="purpose-shape absolute md:hidden right-4 top-4 w-10 h-10 bg-[#f3a012] rounded-[6px] rotate-12" />

        <div className="flex flex-col md:block h-full w-full">
          
          {/* Left Image (Top on Mobile) */}
          <div className="purpose-image relative md:absolute top-0 md:top-[52px] md:left-[90px] w-full max-w-[200px] md:max-w-[220px] aspect-[3/4] -rotate-4 md:-rotate-6 z-10 mb-12 md:mb-0 mx-auto md:mx-0">
            <Image 
              src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180209.jpg" 
              alt="Propósito IAP 1" 
              fill 
              className="object-cover"
              data-ai-hint="editorial fashion"
            />
          </div>

          {/* Central Title Block */}
          <div className="md:absolute top-1/2 md:top-[140px] md:left-[72%] md:-translate-x-1/2 w-full md:w-[900px] z-20 text-center md:text-left">
            <h2 className="purpose-reveal font-headline text-[#111111] leading-[1.02] md:leading-[0.98] tracking-[-0.03em] text-[clamp(42px,10vw,64px)] md:text-[clamp(82px,6.2vw,124px)] uppercase">
              A MENSAGEM<br />
              PRECISA SER OUVIDA
            </h2>

            {/* Body Text and CTA */}
            <div className="mt-8 md:mt-[60px] md:ml-[340px] max-w-full md:max-w-[520px]">
              <p className="purpose-reveal font-body text-[#333333] text-[15px] md:text-[20px] leading-[1.45] font-normal mb-8 text-center md:text-left">
                Adquirir essa camiseta é mais do que levar uma peça de roupa, é representar pessoas que acreditam que a comunicação pode levar mensagens mais longe. Você também contribui para fortalecer o Ministério de Comunicação e ajuda o Evangelho a alcançar mais vidas.
              </p>
              
              <div className="purpose-reveal flex justify-center md:justify-start">
                <a 
                  href="#ofertas" 
                  className="inline-flex items-center gap-2 text-[#b58b2d] font-body font-semibold text-[15px] md:text-[18px] underline underline-offset-8 hover:opacity-80 transition-opacity"
                >
                  Ver camisetas
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Image (Bottom on Mobile) */}
          <div className="purpose-image relative md:absolute md:right-[150px] md:top-[365px] w-full max-w-[260px] md:max-w-[300px] aspect-[4/3] rotate-4 md:rotate-6 z-10 mt-16 md:mt-0 mx-auto md:mx-0">
            <Image 
              src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_175533.jpg" 
              alt="Propósito IAP 2" 
              fill 
              className="object-cover"
              data-ai-hint="editorial fashion"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
