'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export function ManifestoSection() {
  const secondaryPhraseClasses = "font-headline uppercase leading-[0.95] tracking-tighter text-[#c9c9c9] transition-all duration-300 hover:text-[#111111] hover:-translate-y-0.5 cursor-default text-center block";
  const imageClasses = "relative overflow-hidden shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_16px_32px_rgba(0,0,0,0.12)] bg-white";

  return (
    <section className="relative bg-[#efefef] py-12 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex flex-col items-center">
          
          {/* TOP PHRASES */}
          <div className="w-full flex flex-col items-center gap-0.5 lg:gap-1 mb-6 lg:mb-8">
            <h4 className={cn(secondaryPhraseClasses, "text-[clamp(24px,6vw,82px)]")}>
              ANUNCIAR BOAS NOVAS
            </h4>
            <h4 className={cn(secondaryPhraseClasses, "text-[clamp(26px,6.5vw,90px)]")}>
              IDE POR TODO O MUNDO
            </h4>
          </div>

          {/* CENTER COMPOSITION (Desktop/Tablet Grid, Mobile Stack) */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-14">
            
            {/* Image 1 - Visible on Mobile and as start of Grid on Desktop */}
            <div className={cn(imageClasses, "w-full max-w-[280px] aspect-square order-2 lg:order-1")}>
              <Image 
                src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180209.jpg" 
                alt="Editorial IAP 1" 
                fill 
                className="object-cover"
                data-ai-hint="fashion editorial"
              />
            </div>

            {/* MAIN PHRASE */}
            <div className="text-center order-1 lg:order-2 px-4 py-4 lg:py-0">
              <h3 className="font-headline text-[clamp(32px,10vw,125px)] text-[#111111] uppercase leading-[0.88] tracking-[-0.04em] transition-all duration-300 hover:text-accent hover:scale-[1.01] cursor-default">
                COMUNICAR É MISSÃO
              </h3>
              <span className="font-body text-[11px] lg:text-[12px] font-bold text-[#111111] uppercase tracking-[0.12em] block mt-3 lg:mt-5">
                ROMANOS 10:14
              </span>
            </div>

            {/* Image 2 - Visible on Mobile and as end of Grid on Desktop */}
            <div className={cn(imageClasses, "w-full max-w-[280px] aspect-[3/4] order-3")}>
              <Image 
                src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_175533.jpg" 
                alt="Editorial IAP 2" 
                fill 
                className="object-cover"
                data-ai-hint="fashion editorial"
              />
            </div>

          </div>

          {/* BOTTOM PHRASES */}
          <div className="w-full flex flex-col items-center gap-0.5 lg:gap-1 mt-6 lg:mt-8">
            <h4 className={cn(secondaryPhraseClasses, "text-[clamp(22px,5.5vw,76px)]")}>
              FORMOSOS SÃO OS PÉS
            </h4>
          </div>

        </div>
      </div>
    </section>
  );
}
