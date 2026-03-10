'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface IntroLoaderProps {
  onComplete: () => void;
}

/**
 * Intro Loader usando SVGs originais da estampa.
 * Ajustado para seguir a hierarquia visual da referência: "MUNDO" como foco principal.
 */
export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const referenceRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
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

    // Estado Inicial (Line 1 & 2 com rotação e deslocamento vertical para efeito de roleta)
    gsap.set([line1Ref.current, line2Ref.current], {
      opacity: 0,
      y: 100,
      rotateX: -80,
      transformPerspective: 1000,
      transformOrigin: "center center"
    });

    gsap.set(referenceRef.current, {
      opacity: 0,
      y: 30
    });

    introTimeline
      // Passo 1: Animar Linha 1 (IDE POR TODO O)
      .to(line1Ref.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.9,
        ease: 'power4.out'
      })
      // Passo 2: Animar Linha 2 (mundo) - Maior e com overlap
      .to(line2Ref.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        ease: 'power4.out'
      }, '-=0.5')
      // Passo 3: Animar Referência Bíblica (MARCOS)
      .to(referenceRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.3')
      // Passo 4: Pausa para apreciação
      .to({}, { duration: 0.6 })
      // Passo 5: Saída suave
      .to([line1Ref.current, line2Ref.current, referenceRef.current], {
        opacity: 0,
        y: -50,
        duration: 0.6,
        ease: 'power3.inOut'
      })
      // Passo 6: Fade out do overlay
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
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
        {/* Grupo Principal da Arte - Espaçamento reduzido para fidelidade à estampa */}
        <div className="flex flex-col items-center gap-[2px] lg:gap-[4px]">
          {/* Linha 1: IDE POR TODO O (Tamanho menor relativo ao MUNDO) */}
          <div ref={line1Ref} className="relative overflow-visible w-[55vw] lg:w-[min(38vw,480px)]">
            <img 
              src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/IDE%20POR%20TODO%20O.svg" 
              alt="Ide por todo o" 
              className="w-full h-auto block"
            />
          </div>
          
          {/* Linha 2: mundo (O foco principal, maior e mais largo) */}
          <div ref={line2Ref} className="relative overflow-visible w-[88vw] lg:w-[min(62vw,780px)]">
            <img 
              src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/mundo.svg" 
              alt="mundo" 
              className="w-full h-auto block"
            />
          </div>
        </div>

        {/* Referência Bíblica - Posicionada logo abaixo com respiro elegante */}
        <div ref={referenceRef} className="mt-[14px] lg:mt-[20px] w-[26vw] lg:w-[min(14vw,160px)] opacity-60">
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
