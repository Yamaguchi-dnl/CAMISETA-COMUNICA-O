'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export function ManifestoSection() {
  const secondaryPhraseClasses = "font-headline uppercase leading-[0.96] tracking-[-0.025em] text-[#c9c9c9] transition-all duration-220 ease-in-out hover:text-[#111111] hover:-translate-y-0.5 cursor-default text-center block";
  
  const imageClasses = "relative overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition-all duration-220 ease-in-out hover:scale-[1.03] hover:shadow-[0_18px_34px_rgba(0,0,0,0.12)] bg-white";

  return (
    <section className="relative bg-[#efefef] py-[52px] lg:py-[88px] pb-[56px] lg:pb-[90px] overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="flex flex-col items-center">
          
          {/* TOP PHRASES */}
          <div className="w-full flex flex-col items-center gap-3 lg:gap-4 mb-[30px] lg:mb-[36px]">
            <h4 className={cn(secondaryPhraseClasses, "text-[clamp(24px,7vw,38px)] lg:text-[clamp(42px,4.3vw,76px)] mb-[8px] lg:mb-[14px]")}>
              ANUNCIAR BOAS NOVAS
            </h4>
            <h4 className={cn(secondaryPhraseClasses, "text-[clamp(26px,7.5vw,40px)] lg:text-[clamp(46px,4.8vw,84px)]")}>
              IDE POR TODO O MUNDO
            </h4>
          </div>

          {/* CENTER COMPOSITION */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-[42px]">
            
            {/* Image 1 - Square */}
            <div className={cn(imageClasses, "w-full max-w-[260px] lg:max-w-[360px] aspect-square order-2 lg:order-1")}>
              <Image 
                src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180209.jpg" 
                alt="Editorial IAP 1" 
                fill 
                className="object-cover"
                data-ai-hint="fashion editorial"
              />
            </div>

            {/* MAIN PHRASE - Point of Focus */}
            <div className="text-center order-1 lg:order-2 px-4 py-4 lg:py-0 lg:pt-8">
              <h3 className="font-headline text-[clamp(30px,10vw,54px)] lg:text-[clamp(58px,6vw,112px)] text-[#111111] uppercase leading-[0.92] tracking-[-0.028em] transition-all duration-220 hover:text-accent hover:scale-[1.01] cursor-default">
                COMUNICAR<br className="lg:hidden" /> É MISSÃO
              </h3>
              <span className="font-body text-[10px] lg:text-[12px] font-bold text-[#111111] uppercase tracking-[0.12em] block mt-3 lg:mt-[12px]">
                ROMANOS 10:14
              </span>
            </div>

            {/* Image 2 - Rectangle */}
            <div className={cn(imageClasses, "w-full max-w-[300px] lg:max-w-[360px] h-[300px] lg:h-[430px] order-3")}>
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
          <div className="w-full flex flex-col items-center gap-2 lg:gap-3 mt-[30px] lg:mt-[36px]">
            <h4 className={cn(secondaryPhraseClasses, "text-[clamp(24px,6.6vw,36px)] lg:text-[clamp(42px,4.4vw,74px)] mb-[4px] lg:mb-[6px]")}>
              FORMOSOS SÃO OS PÉS
            </h4>
            <h4 className={cn(secondaryPhraseClasses, "text-[clamp(20px,5.4vw,30px)] lg:text-[clamp(34px,3.7vw,60px)]")}>
              QUE A PALAVRA SEJA OUVIDA
            </h4>
          </div>

        </div>
      </div>
    </section>
  );
}
