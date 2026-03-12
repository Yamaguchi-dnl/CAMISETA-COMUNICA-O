'use client';

import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Seção de Propósito com layout editorial de duas imagens sobrepostas e texto lateral.
 * Agora com título expandido e linha vermelha decorativa conforme solicitado.
 * Título padronizado conforme diretrizes visuais.
 */
export function PurposeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
      }
    });

    tl.from('.purpose-image-primary', { 
        opacity: 0, 
        x: -40, 
        duration: 1.2, 
        ease: 'power3.out' 
      })
      .from('.purpose-image-secondary', { 
        opacity: 0, 
        x: 40, 
        duration: 1.2, 
        ease: 'power3.out' 
      }, '-=0.8')
      .from('.purpose-text-content > *', { 
        opacity: 0, 
        y: 20, 
        stagger: 0.15, 
        duration: 0.8, 
        ease: 'power2.out' 
      }, '-=0.4');

  }, { scope: sectionRef });

  return (
    <section 
      id="proposito"
      ref={sectionRef} 
      className="bg-[#f5f3ef] py-20 lg:py-32 scroll-mt-20 overflow-hidden"
    >
      <div ref={containerRef} className="container mx-auto px-6 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Coluna de Composição de Imagem */}
          <div className="relative w-full max-w-[520px] h-[400px] md:h-[520px] mx-auto lg:mx-0">
            {/* Imagem Primária (Maior, fundo) */}
            <div className="purpose-image-primary absolute top-0 left-0 w-[75%] md:w-[420px] aspect-[3/4] z-[2] overflow-hidden">
              <Image 
                src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180801.jpg" 
                alt="Propósito IAP Camiseta Off-White" 
                fill 
                className="object-cover rounded-none"
                data-ai-hint="editorial model"
                priority
              />
            </div>

            {/* Imagem Secundária (Menor, sobreposta) - Sobrepõe no mobile */}
            <div className="purpose-image-secondary absolute bottom-[-40px] md:bottom-[-70px] right-0 w-[65%] md:w-[360px] aspect-square z-[3] overflow-hidden">
              <Image 
                src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180553.jpg" 
                alt="Propósito IAP Kit Camisetas" 
                fill 
                className="object-cover border-[4px] md:border-[6px] border-[#f5f3ef] rounded-none shadow-xl"
                data-ai-hint="editorial model"
                priority
              />
            </div>
          </div>

          {/* Coluna de Conteúdo de Texto */}
          <div className="purpose-text-content flex flex-col gap-6 max-w-[460px]">
            {/* Linha Vermelha Decorativa */}
            <div className="w-16 h-[5px] bg-accent mb-2" />
            
            <h2 className="font-headline text-[#111111] uppercase">
              A MENSAGEM PRECISA SER OUVIDA
            </h2>
            
            <div className="space-y-6">
              <p className="text-[18px] leading-[1.6] text-[#4f4f4f] font-body">
                Adquirir essa camiseta é mais do que levar uma peça de roupa, é representar pessoas que acreditam que a comunicação pode levar mensagens mais longe.
              </p>
              <p className="text-[18px] leading-[1.6] text-[#4f4f4f] font-body">
                Você também contribui para fortalecer o Ministério de Comunicação e ajuda o Evangelho a alcançar mais vidas.
              </p>
            </div>
            
            <div className="pt-4">
              <a 
                href="#ofertas" 
                className="pill-button bg-black text-white hover:bg-accent w-full md:w-auto min-w-[200px]"
              >
                VER CAMISETAS
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
