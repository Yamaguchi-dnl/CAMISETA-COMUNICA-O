'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface IntroLoaderProps {
  onComplete: () => void;
}

/**
 * Intro Loader refinado para corresponder exatamente à referência visual.
 * Apresenta fundo cinza claro, texto centralizado e globo vermelho sobreposto.
 */
export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
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

    // Estado Inicial - Step 1: initial_screen_state
    gsap.set(textRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.98,
    });

    gsap.set(globeRef.current, {
      opacity: 0,
      y: 40,
      scale: 0.96,
    });

    introTimeline
      // Step 2: reveal_text_artwork
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: 'power3.out'
      })
      // Step 3: reveal_globe_artwork (com overlap de 0.35s)
      .to(globeRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: 'power4.out'
      }, '-=0.35')
      // Step 4: hold_final_composition
      .to({}, { duration: 0.6 })
      // Step 5: exit_loader
      .to([textRef.current, globeRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.45,
        ease: 'power2.inOut'
      })
      // Step 6: remove_loader_overlay
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.25,
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
      <div className="relative flex flex-col items-center justify-center w-full h-full max-w-[1440px]">
        
        {/* 
            Glow/Shadow effect container para o Globo 
            O globo fica visualmente atrás da palavra MUNDO.
        */}
        <div 
          ref={globeRef} 
          className="absolute z-[1] w-[min(62vw,250px)] md:w-[min(42vw,360px)] lg:w-[min(36vw,420px)] mt-[72px] md:mt-[100px] lg:mt-[110px]"
        >
          <img 
            src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/MUNDO%202.svg" 
            alt="Mundo Globo" 
            className="w-full h-auto block"
          />
        </div>

        {/* 
            Arte de Texto Principal
            Fica na frente do globo (z-index maior).
        */}
        <div 
          ref={textRef} 
          className="relative z-[2] w-[min(84vw,360px)] md:w-[min(66vw,560px)] lg:w-[min(58vw,620px)]"
        >
          <img 
            src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/IDE%20POR%20TODO%20O%20MUNDO%202.svg" 
            alt="Ide por todo o mundo" 
            className="w-full h-auto block"
          />
        </div>

      </div>
    </div>
  );
}
