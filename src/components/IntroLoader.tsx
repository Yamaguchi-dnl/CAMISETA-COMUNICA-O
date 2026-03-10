'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface IntroLoaderProps {
  onComplete: () => void;
}

/**
 * Intro Loader usando SVGs originais da estampa hospedados no ImageKit.
 * Implementa uma animação estilo roleta/reel editorial por linha.
 */
export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const referenceRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Exibiremos sempre ao carregar a página para manter o impacto visual
    setShouldRender(true);
    document.body.style.overflow = 'hidden';
  }, []);

  useGSAP(() => {
    if (!shouldRender || !containerRef.current) return;

    const introTimeline = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete();
      }
    });

    // Estado Inicial (Line 1 & 2 com rotação e deslocamento vertical)
    gsap.set([line1Ref.current, line2Ref.current], {
      opacity: 0,
      y: 90,
      rotateX: -70,
      transformPerspective: 1000,
      transformOrigin: "center center"
    });

    gsap.set(referenceRef.current, {
      opacity: 0,
      y: 26
    });

    introTimeline
      // Passo 1: Animar Linha 1
      .to(line1Ref.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.85,
        ease: 'power4.out'
      })
      // Passo 2: Animar Linha 2 (com sobreposição de tempo)
      .to(line2Ref.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.85,
        ease: 'power4.out'
      }, '-=0.45')
      // Passo 3: Animar Referência Bíblica
      .to(referenceRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out'
      })
      // Passo 4: Segurar a composição para leitura
      .to({}, { duration: 0.45 })
      // Passo 5: Transição de Saída
      .to([line1Ref.current, line2Ref.current, referenceRef.current], {
        opacity: 0,
        y: -40,
        duration: 0.5,
        ease: 'power3.inOut'
      })
      // Passo 6: Remover o Overlay do Loader
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        display: 'none'
      });

  }, { scope: containerRef, dependencies: [shouldRender] });

  if (!shouldRender) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#efefef] flex flex-col items-center justify-center overflow-hidden pointer-events-auto"
    >
      <div className="flex flex-col items-center justify-center max-w-full px-6">
        {/* Grupo Principal da Arte */}
        <div className="flex flex-col items-center gap-[10px] lg:gap-[14px]">
          {/* Linha 1: IDE POR TODO O */}
          <div ref={line1Ref} className="relative overflow-visible w-[86vw] lg:w-[min(72vw,860px)]">
            <img 
              src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/IDE%20POR%20TODO%20O.svg" 
              alt="Ide por todo o" 
              className="w-full h-auto block"
            />
          </div>
          
          {/* Linha 2: mundo */}
          <div ref={line2Ref} className="relative overflow-visible w-[68vw] lg:w-[min(56vw,620px)]">
            <img 
              src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/mundo.svg" 
              alt="mundo" 
              className="w-full h-auto block"
            />
          </div>
        </div>

        {/* Referência Bíblica */}
        <div ref={referenceRef} className="mt-[18px] lg:mt-[24px] w-[28vw] lg:w-[min(16vw,170px)]">
          <img 
            src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/MARCOS.svg" 
            alt="Marcos 16:15" 
            className="w-full h-auto block"
          />
        </div>
      </div>
    </div>
  );
}
