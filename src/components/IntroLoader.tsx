'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface IntroLoaderProps {
  onComplete: () => void;
}

/**
 * Intro Loader simplificado e impactante.
 * Fundo vermelho, texto branco e animação de roleta por letra.
 */
export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
    // Bloqueia scroll durante a intro
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const line1Text = "IDE POR TODO";
  const line2Text = "O MUNDO";

  // Função para renderizar cada caractere em um wrapper para animação de roleta
  const renderChars = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char-wrapper inline-block overflow-hidden align-bottom">
        <span className="char-inner inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      </span>
    ));
  };

  useGSAP(() => {
    if (!shouldRender || !containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete();
      }
    });

    const chars1 = containerRef.current.querySelectorAll('.line-1 .char-inner');
    const chars2 = containerRef.current.querySelectorAll('.line-2 .char-inner');

    // Estado inicial: abaixo do campo de visão e rotacionado
    gsap.set([chars1, chars2], {
      yPercent: 120,
      rotateX: -90,
      opacity: 0,
      transformOrigin: "50% 50%"
    });

    tl
      // Animação da primeira linha
      .to(chars1, {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.035,
        ease: 'power4.out'
      })
      // Animação da segunda linha (com overlap)
      .to(chars2, {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.035,
        ease: 'power4.out'
      }, "-=0.45")
      // Pausa para leitura
      .to({}, { duration: 0.6 })
      // Saída do loader
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.45,
        ease: 'power2.inOut'
      })
      // Remove do DOM
      .set(containerRef.current, { display: 'none' });

  }, { scope: containerRef, dependencies: [shouldRender] });

  if (!shouldRender) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#ff1f17] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      <div className="flex flex-col items-center justify-center text-center perspective-[1000px] px-4">
        
        {/* Linha 1 */}
        <div className="line-1 font-headline text-white leading-[0.9] uppercase 
          text-[clamp(34px,10vw,64px)] md:text-[clamp(58px,7vw,110px)] lg:text-[clamp(72px,8vw,148px)]">
          {renderChars(line1Text)}
        </div>

        {/* Linha 2 */}
        <div className="line-2 font-headline text-white leading-[0.9] uppercase 
          text-[clamp(34px,10vw,64px)] md:text-[clamp(58px,7vw,110px)] lg:text-[clamp(72px,8vw,148px)] mt-4 md:mt-2">
          {renderChars(line2Text)}
        </div>

      </div>
    </div>
  );
}
