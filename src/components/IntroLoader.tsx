'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface IntroLoaderProps {
  onComplete: () => void;
}

/**
 * Intro Loader que garante a centralização perfeita da arte principal.
 */
export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
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

    // Estado Inicial
    gsap.set(artworkRef.current, {
      opacity: 0,
      y: 60,
      rotateX: -45,
      transformPerspective: 1000,
      transformOrigin: "center center"
    });

    gsap.set(referenceRef.current, {
      opacity: 0,
      y: 20
    });

    introTimeline
      // Passo 1: Revelação da Arte Principal
      .to(artworkRef.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.4,
        ease: 'power4.out'
      })
      // Passo 2: Referência Bíblica (suavemente abaixo)
      .to(referenceRef.current, {
        opacity: 0.5,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.7')
      // Passo 3: Pausa para impacto
      .to({}, { duration: 1.2 })
      // Passo 4: Saída suave
      .to([artworkRef.current, referenceRef.current], {
        opacity: 0,
        y: -30,
        duration: 0.7,
        ease: 'power3.inOut'
      })
      // Passo 5: Fade out do overlay total
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        display: 'none'
      });

  }, { scope: containerRef, dependencies: [shouldRender] });

  if (!shouldRender) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#efefef] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* 
          Este wrapper garante que o artworkRef seja o centro absoluto da tela. 
          A referência bíblica é posicionada de forma absoluta em relação a este centro 
          para não deslocar o SVG principal.
      */}
      <div className="relative flex items-center justify-center w-full h-full">
        
        <div 
          ref={artworkRef} 
          className="relative w-[85vw] lg:w-[min(65vw,820px)]"
        >
          <img 
            src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/IDE%20POR%20TODO%20O%20MUNDO.svg" 
            alt="Ide por todo o mundo" 
            className="w-full h-auto block"
          />
          
          {/* 
              Referência Bíblica: 
              Posicionada absolutamente ABAIXO do centro para manter a arte principal no meio exato. 
          */}
          <div 
            ref={referenceRef} 
            className="absolute left-1/2 -translate-x-1/2 top-full mt-8 lg:mt-12 w-[30vw] lg:w-[min(16vw,180px)]"
          >
            <img 
              src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/MARCOS.svg" 
              alt="Marcos 16:15" 
              className="w-full h-auto block"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
