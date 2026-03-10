'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface IntroLoaderProps {
  onComplete: () => void;
}

/**
 * Intro Loader usando SVGs oficiais da estampa.
 * Inclui o elemento "IDE" como abertura da sequência.
 */
export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ideRef = useRef<HTMLDivElement>(null);
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
    gsap.set([ideRef.current, line1Ref.current, line2Ref.current], {
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
      // Passo 1: IDE (Abertura)
      .to(ideRef.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'power4.out'
      })
      // Passo 2: IDE POR TODO O
      .to(line1Ref.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'power4.out'
      }, '-=0.5')
      // Passo 3: mundo (O foco principal)
      .to(line2Ref.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        ease: 'power4.out'
      }, '-=0.5')
      // Passo 4: Referência Bíblica (MARCOS)
      .to(referenceRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.3')
      // Passo 5: Pausa para apreciação
      .to({}, { duration: 0.6 })
      // Passo 6: Saída suave
      .to([ideRef.current, line1Ref.current, line2Ref.current, referenceRef.current], {
        opacity: 0,
        y: -50,
        duration: 0.6,
        ease: 'power3.inOut'
      })
      // Passo 7: Fade out do overlay
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
        {/* Grupo Principal da Arte */}
        <div className="flex flex-col items-center gap-[2px] lg:gap-[4px]">
          
          {/* Linha 0: IDE (Destaque inicial) */}
          <div ref={ideRef} className="relative overflow-visible w-[35vw] lg:w-[min(24vw,300px)] mb-2">
            <img 
              src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/IDE.svg" 
              alt="IDE" 
              className="w-full h-auto block"
            />
          </div>

          {/* Linha 1: IDE POR TODO O */}
          <div ref={line1Ref} className="relative overflow-visible w-[55vw] lg:w-[min(38vw,480px)]">
            <img 
              src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/IDE%20POR%20TODO%20O.svg" 
              alt="Ide por todo o" 
              className="w-full h-auto block"
            />
          </div>
          
          {/* Linha 2: mundo (O foco principal) */}
          <div ref={line2Ref} className="relative overflow-visible w-[88vw] lg:w-[min(62vw,780px)]">
            <img 
              src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/mundo.svg" 
              alt="mundo" 
              className="w-full h-auto block"
            />
          </div>
        </div>

        {/* Referência Bíblica */}
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
