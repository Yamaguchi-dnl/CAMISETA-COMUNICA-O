'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface IntroLoaderProps {
  onComplete: () => void;
}

/**
 * Componente de Loader de Introdução com efeito de "roleta" por letra.
 * Cada caractere gira verticalmente antes de formar a frase final.
 */
export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainTextRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  const mainText = "IDE POR TODO O MUNDO";
  const subText = "Marcos 16:15";

  useEffect(() => {
    setShouldRender(true);
    document.body.style.overflow = 'hidden';
  }, []);

  useGSAP(() => {
    if (!shouldRender || !containerRef.current) return;

    const chars = mainTextRef.current?.querySelectorAll('.char');
    
    if (!chars) return;

    const introTimeline = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete();
      }
    });

    // Estado inicial: letras escondidas abaixo
    gsap.set(chars, { yPercent: 120, opacity: 0 });
    gsap.set(subTextRef.current, { opacity: 0, y: 10 });

    introTimeline
      // Animação de roleta (slot machine) para cada letra
      .to(chars, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.03,
      })
      // Revelação do subtítulo
      .to(subTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3')
      // Pausa para impacto
      .to({}, { duration: 1.2 })
      // Saída elegante
      .to([mainTextRef.current, subTextRef.current], {
        y: -40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.inOut'
      })
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
      className="fixed inset-0 z-[9999] bg-[#efefef] flex flex-col items-center justify-center overflow-hidden pointer-events-auto"
    >
      <div 
        ref={mainTextRef}
        className="flex flex-wrap justify-center font-headline text-[#111111] uppercase tracking-normal leading-[0.95] text-center px-6
          text-[clamp(34px,9vw,64px)] lg:text-[clamp(64px,7vw,130px)]"
      >
        {mainText.split("").map((char, index) => (
          <span 
            key={index} 
            className="inline-block overflow-hidden"
            style={{ minWidth: char === " " ? "0.25em" : "auto" }}
          >
            <span className="char inline-block">
              {char}
            </span>
          </span>
        ))}
      </div>
      
      <div 
        ref={subTextRef}
        className="font-body font-semibold text-[#111111] uppercase tracking-[0.08em] mt-6 lg:mt-8
          text-[12px] lg:text-[14px]"
      >
        {subText}
      </div>
    </div>
  );
}
