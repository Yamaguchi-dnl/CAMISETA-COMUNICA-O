'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface IntroLoaderProps {
  onComplete: () => void;
}

/**
 * Componente de Loader de Introdução usando GSAP.
 * Exibe uma tipografia impactante antes de carregar a Hero.
 */
export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Verifica se a intro já foi exibida nesta sessão
    if (typeof window !== 'undefined') {
      const hasPlayed = sessionStorage.getItem('introPlayed');
      if (!hasPlayed) {
        setShouldRender(true);
        // Bloqueia o scroll durante a intro
        document.body.style.overflow = 'hidden';
      } else {
        // Se já foi exibida, sinaliza conclusão imediata
        onComplete();
      }
    }
  }, [onComplete]);

  useGSAP(() => {
    if (!shouldRender || !containerRef.current || !textRef.current) return;

    // Timeline mestre para a sequência de intro
    const introTimeline = gsap.timeline({
      onComplete: () => {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('introPlayed', 'true');
        }
        // Libera o scroll
        document.body.style.overflow = '';
        onComplete();
      }
    });

    // Step 2: Revelação do texto da marca
    introTimeline.fromTo(textRef.current, 
      { 
        y: 80, 
        opacity: 0 
      }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.9, 
        ease: 'power4.out',
        delay: 0.5 
      }
    )
    // Step 3: Hold (Pausa para impacto)
    .to({}, { duration: 0.6 })
    // Step 4: Transição de saída do texto
    .to(textRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.inOut'
    })
    // Step 6: Remoção do loader
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
      <div 
        ref={textRef}
        className="font-headline text-[#111111] uppercase tracking-[-0.04em] leading-[0.9] text-center px-6
          text-[clamp(34px,10vw,64px)] lg:text-[clamp(64px,8vw,140px)]"
      >
        COMUNICAR É MISSÃO
      </div>
    </div>
  );
}
