'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface IntroLoaderProps {
  onComplete: () => void;
}

/**
 * Intro Loader refinado com escala ampliada para máxima presença visual.
 * Replica a composição editorial da referência: texto dominante e globo integrado.
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

    // Estado Inicial
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
      // Revelação do Texto
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: 'power3.out'
      })
      // Revelação do Globo (com overlap para fluidez)
      .to(globeRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: 'power4.out'
      }, '-=0.35')
      // Pausa para impacto
      .to({}, { duration: 0.8 })
      // Saída sofisticada
      .to([textRef.current, globeRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.45,
        ease: 'power2.inOut'
      })
      // Remoção do overlay
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
      className="fixed inset-0 z-[9999] bg-[#efefef] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full max-w-full px-4">
        
        {/* 
            Arte de Texto Principal (Z-Index 3)
            Tamanho ampliado para dominar a tela conforme referência.
        */}
        <div 
          ref={textRef} 
          className="relative z-[3] w-[min(90vw,420px)] md:w-[min(82vw,820px)] lg:w-[min(78vw,980px)] mb-[-2px] md:mb-[-6px] lg:mb-[-10px]"
        >
          <img 
            src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/IDE%20POR%20TODO%20O%20MUNDO%202.svg" 
            alt="Ide por todo o mundo" 
            className="w-full h-auto block"
          />
        </div>

        {/* 
            Globo Vermelho (Z-Index 2)
            Posicionado visualmente atrás e encaixado sob o texto MUNDO.
        */}
        <div 
          ref={globeRef} 
          className="relative z-[2] w-[min(42vw,210px)] md:w-[min(38vw,340px)] lg:w-[min(34vw,430px)] mt-[-10px] md:mt-[-18px] lg:mt-[-30px]"
        >
          <img 
            src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/MUNDO%202.svg" 
            alt="Mundo Globo" 
            className="w-full h-auto block"
          />
        </div>

      </div>
    </div>
  );
}
