
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface IntroLoaderProps {
  onComplete: () => void;
}

/**
 * Intro Loader usando SVGs originais da estampa.
 * Implementa uma animação estilo roleta/reel editorial por linha.
 */
export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const referenceRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Verifica se já foi exibido nesta sessão se necessário, 
    // mas conforme pedido anterior, exibiremos sempre.
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

    // Estado Inicial (Line 1 & 2 com rotação e deslocamento)
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
      // Step 1: Animate Line 1
      .to(line1Ref.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.85,
        ease: 'power4.out'
      })
      // Step 2: Animate Line 2 (com overlap)
      .to(line2Ref.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.85,
        ease: 'power4.out'
      }, '-=0.45')
      // Step 3: Animate Reference
      .to(referenceRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out'
      })
      // Step 4: Hold Composition
      .to({}, { duration: 0.45 })
      // Step 5: Transition Out
      .to([line1Ref.current, line2Ref.current, referenceRef.current], {
        opacity: 0,
        y: -40,
        duration: 0.5,
        ease: 'power3.inOut'
      })
      // Step 6: Remove Loader Overlay
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
        {/* Main Artwork Group */}
        <div className="flex flex-col items-center gap-[10px] lg:gap-[14px]">
          {/* Line 1: IDE POR TODO O */}
          <div ref={line1Ref} className="relative overflow-visible w-[86vw] lg:w-[min(72vw,860px)]">
            <img 
              src="/IDE POR TODO O.svg" 
              alt="Ide por todo o" 
              className="w-full h-auto block"
            />
          </div>
          
          {/* Line 2: mundo */}
          <div ref={line2Ref} className="relative overflow-visible w-[68vw] lg:w-[min(56vw,620px)]">
            <img 
              src="/mundo.svg" 
              alt="mundo" 
              className="w-full h-auto block"
            />
          </div>
        </div>

        {/* Bible Reference */}
        <div ref={referenceRef} className="mt-[18px] lg:mt-[24px] w-[28vw] lg:w-[min(16vw,170px)]">
          <img 
            src="/MARCOS.svg" 
            alt="Marcos 16:15" 
            className="w-full h-auto block"
          />
        </div>
      </div>
    </div>
  );
}
