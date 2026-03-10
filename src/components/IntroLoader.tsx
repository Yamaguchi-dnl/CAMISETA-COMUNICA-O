'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface IntroLoaderProps {
  onComplete: () => void;
}

/**
 * Intro Loader com animação de roleta por letra e saída em slide vertical.
 * O fundo preto sobe como um painel, revelando o conteúdo por baixo.
 * Fonte Bebas Neue em tamanho gigante para impacto máximo.
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
        // Cleanup final se necessário
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
      // Animação da primeira linha (roleta)
      .to(chars1, {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.035,
        ease: 'power4.out'
      })
      // Animação da segunda linha (roleta com overlap)
      .to(chars2, {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.035,
        ease: 'power4.out'
      }, "-=0.45")
      // Pausa para leitura (hold)
      .to({}, { duration: 0.4 })
      // Saída do loader: Slide para cima (Painel)
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.85,
        ease: 'power4.inOut',
        onStart: () => {
          // Libera o scroll e sinaliza ao componente pai para começar a revelar a Hero
          document.body.style.overflow = '';
          onComplete();
        }
      })
      // Remove da visualização
      .set(containerRef.current, { display: 'none' });

  }, { scope: containerRef, dependencies: [shouldRender] });

  if (!shouldRender) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center text-center perspective-[1000px] px-4 w-full">
        
        {/* Linha 1 - Tamanho GIGANTE */}
        <div className="line-1 font-headline text-white leading-[0.85] uppercase 
          text-[clamp(60px,18vw,140px)] md:text-[clamp(120px,15vw,280px)] lg:text-[clamp(180px,20vw,450px)]">
          {renderChars(line1Text)}
        </div>

        {/* Linha 2 - Tamanho GIGANTE */}
        <div className="line-2 font-headline text-white leading-[0.85] uppercase 
          text-[clamp(60px,18vw,140px)] md:text-[clamp(120px,15vw,280px)] lg:text-[clamp(180px,20vw,450px)] mt-2 md:mt-0">
          {renderChars(line2Text)}
        </div>

      </div>
    </div>
  );
}
