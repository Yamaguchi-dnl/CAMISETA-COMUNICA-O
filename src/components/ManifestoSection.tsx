'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export function ManifestoSection() {
  const phrases = [
    { id: '01', text: 'ANUNCIAR BOAS NOVAS', ref: 'Isaías 52:7', style: 'secondary' },
    { id: '02', text: 'IDE POR TODO O MUNDO', ref: 'Marcos 16:15', style: 'secondary' },
    { id: '03', text: 'COMUNICAR É MISSÃO', ref: 'Romanos 10:14', style: 'primary' },
    { id: '04', text: 'QUE A PALAVRA SEJA OUVIDA', ref: 'Romanos 10:17', style: 'secondary' },
    { id: '05', text: 'FORMOSOS SÃO OS PÉS', ref: 'Romanos 10:15', style: 'secondary' },
    { id: '06', text: 'LUZ PARA O MUNDO', ref: 'Mateus 5:14', style: 'secondary' },
  ];

  return (
    <section className="relative bg-[#efefef] py-24 lg:py-40 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        
        {/* DESKTOP/TABLET COLLAGE (Hidden on Mobile) */}
        <div className="hidden md:block relative h-[600px] lg:h-[800px] w-full">
          
          {/* Background Phrases (Secondary) */}
          <div className="absolute top-[5%] left-[10%] opacity-40 transform -rotate-2">
            <span className="text-[12px] font-bold mr-2 text-[#8f8f8f] font-body">(01)</span>
            <h4 className="inline font-headline text-[clamp(40px,5vw,80px)] text-[#8f8f8f] uppercase leading-none tracking-tighter">
              {phrases[0].text}
            </h4>
          </div>

          <div className="absolute top-[18%] right-[5%] opacity-40 transform rotate-1">
            <h4 className="inline font-headline text-[clamp(40px,5vw,80px)] text-[#8f8f8f] uppercase leading-none tracking-tighter">
              {phrases[1].text}
            </h4>
            <span className="text-[12px] font-bold ml-2 text-[#8f8f8f] font-body">(02)</span>
          </div>

          <div className="absolute top-[40%] left-[0%] opacity-40 transform rotate-[-1deg]">
            <span className="text-[12px] font-bold mr-2 text-[#8f8f8f] font-body">(04)</span>
            <h4 className="inline font-headline text-[clamp(35px,4vw,70px)] text-[#8f8f8f] uppercase leading-none tracking-tighter">
              {phrases[3].text}
            </h4>
          </div>

          {/* MAIN HIGHLIGHT (Primary) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full text-center">
             <h3 className="font-headline text-[clamp(60px,8vw,140px)] text-[#111111] uppercase leading-[0.85] tracking-[-0.05em] drop-shadow-sm">
               {phrases[2].text}
             </h3>
             <span className="text-[14px] font-bold text-black font-body mt-4 block uppercase tracking-widest">
               {phrases[2].ref}
             </span>
          </div>

          <div className="absolute bottom-[20%] left-[20%] opacity-40 transform rotate-2">
            <span className="text-[12px] font-bold mr-2 text-[#8f8f8f] font-body">(05)</span>
            <h4 className="inline font-headline text-[clamp(40px,5vw,80px)] text-[#8f8f8f] uppercase leading-none tracking-tighter">
              {phrases[4].text}
            </h4>
          </div>

          <div className="absolute bottom-[5%] right-[15%] opacity-40 transform -rotate-1">
            <h4 className="inline font-headline text-[clamp(40px,5vw,80px)] text-[#8f8f8f] uppercase leading-none tracking-tighter">
              {phrases[5].text}
            </h4>
            <span className="text-[12px] font-bold ml-2 text-[#8f8f8f] font-body">(06)</span>
          </div>

          {/* EDITORIAL IMAGES IN COLLAGE */}
          <div className="absolute left-[15%] top-[45%] z-[5] transform -translate-y-1/2 -rotate-3 shadow-2xl">
            <div className="relative w-[200px] lg:w-[300px] aspect-square overflow-hidden bg-white">
              <Image 
                src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180209.jpg" 
                alt="Editorial Communication" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          <div className="absolute right-[10%] top-[30%] z-[5] transform rotate-6 shadow-2xl">
            <div className="relative w-[180px] lg:w-[280px] aspect-[3/4] overflow-hidden bg-white">
              <Image 
                src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_175533.jpg" 
                alt="Editorial Costas" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>

        {/* MOBILE STACK (Visible only on Mobile) */}
        <div className="md:hidden flex flex-col items-center gap-12">
          <div className="text-center space-y-8">
            {phrases.map((phrase) => (
              <div key={phrase.id} className={cn(
                "flex flex-col items-center",
                phrase.style === 'primary' ? "opacity-100 scale-110 my-8" : "opacity-40"
              )}>
                <span className="text-[10px] font-bold text-black/50 mb-1">({phrase.id})</span>
                <h4 className={cn(
                  "font-headline uppercase leading-none tracking-tighter text-center",
                  phrase.style === 'primary' ? "text-3xl text-black" : "text-xl text-[#8f8f8f]"
                )}>
                  {phrase.text}
                </h4>
                {phrase.style === 'primary' && (
                   <span className="text-[10px] font-bold mt-2 uppercase tracking-widest">{phrase.ref}</span>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 w-full px-4">
             <div className="relative aspect-square shadow-lg rotate-[-3deg]">
                <Image 
                  src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180209.jpg" 
                  alt="Mobile Editorial 1" 
                  fill 
                  className="object-cover grayscale"
                />
             </div>
             <div className="relative aspect-square shadow-lg rotate-[3deg] translate-y-4">
                <Image 
                  src="https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_175533.jpg" 
                  alt="Mobile Editorial 2" 
                  fill 
                  className="object-cover grayscale"
                />
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
