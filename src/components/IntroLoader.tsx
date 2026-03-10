'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface IntroLoaderProps {
  onComplete: () => void;
}

/**
 * Intro Loader que garante a centralização perfeita do SVG principal na tela.
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
      y: 80,
      rotateX: -60,
      transformPerspective: 1000,
      transformOrigin: "center center"
    });

    gsap.set(referenceRef.current, {
      opacity: 0,
      y: 20
    });

    introTimeline
      // Passo 1: Revelação da Arte Principal Centralizada
      .to(artworkRef.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        ease: 'power4.out'
      })
      // Passo 2: Referência Bíblica (suavemente abaixo)
      .to(referenceRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.5')
      // Passo 3: Pausa
      .to({}, { duration: 1.0 })
      // Passo 4: Saída
      .to([artworkRef.current, referenceRef.current], {
        opacity: 0,
        y: -40,
        duration: 0.6,
        ease: 'power3.inOut'
      })
      // Passo 5: Fade out do overlay
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
      className="fixed inset-0 z-[9999] bg-[#efefef] flex items-center justify-center overflow-hidden pointer-events-auto"
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full px-6">
        
        {/* Container da Arte Principal - Este div define o centro exato */}
        <div ref={artworkRef} className="relative w-[90vw] lg:w-[min(60vw,780px)] flex justify-center">
          <img 
            src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/IDE%20POR%20TODO%20O%20MUNDO.svg" 
            alt="Ide por todo o mundo" 
            className="w-full h-auto block"
          />
          
          {/* Referência Bíblica - Posicionada de forma absoluta para não afetar o centro da arte principal */}
          <div 
            ref={referenceRef} 
            className="absolute top-full mt-6 lg:mt-8 w-[28vw] lg:w-[min(14vw,160px)] opacity-50"
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
