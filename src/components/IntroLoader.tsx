'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface IntroLoaderProps {
  onComplete: () => void;
}

/**
 * Intro Loader usando o SVG consolidado da estampa.
 * Mantém o efeito de roleta editorial e a referência bíblica.
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
      // Passo 1: Revelação da Arte Principal (IDE POR TODO O MUNDO)
      .to(artworkRef.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        ease: 'power4.out'
      })
      // Passo 2: Referência Bíblica (MARCOS)
      .to(referenceRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4')
      // Passo 3: Pausa para apreciação
      .to({}, { duration: 0.8 })
      // Passo 4: Saída suave
      .to([artworkRef.current, referenceRef.current], {
        opacity: 0,
        y: -50,
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
      className="fixed inset-0 z-[9999] bg-[#efefef] flex flex-col items-center justify-center overflow-hidden pointer-events-auto"
    >
      <div className="flex flex-col items-center justify-center max-w-full px-6">
        {/* Arte Principal Consolidada */}
        <div ref={artworkRef} className="relative overflow-visible w-[90vw] lg:w-[min(65vw,820px)] mb-4 lg:mb-6">
          <img 
            src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/IDE%20POR%20TODO%20O%20MUNDO.svg" 
            alt="Ide por todo o mundo" 
            className="w-full h-auto block"
          />
        </div>

        {/* Referência Bíblica */}
        <div ref={referenceRef} className="w-[28vw] lg:w-[min(15vw,180px)] opacity-60">
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
