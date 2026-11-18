"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { testimonials } from "@/lib/data";
import { SectionHeading, Stars, ease } from "./ui";

export default function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  const go = useCallback((d: number) => setState(([i]) => [(i + d + n) % n, d]), [n]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [paused, go]);

  const t = testimonials[index];

  return (
    <section className="relative overflow-hidden bg-cream/70 py-20 lg:py-28" aria-labelledby="tst-title" aria-roledescription="carousel">
      <div className="pointer-events-none absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-blush/40 blur-[110px]" />
      <div className="container-lux relative">
        <div id="tst-title">
          <SectionHeading
            eyebrow="Kind Words"
            title={
              <>
                Moments Made Beautiful. <em className="text-emerald">Memories Made Forever.</em>
              </>
            }
          />
        </div>

        <div
          className="relative grid overflow-hidden rounded-[2rem] border border-forest/10 bg-ivory shadow-[0_40px_80px_-50px_rgba(23,59,43,0.4)] md:grid-cols-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative aspect-[16/10] md:col-span-5 md:aspect-auto md:min-h-[460px]">
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={t.image + index}
                custom={dir}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease }}
                className="absolute inset-0"
              >
                <Image src={t.image} alt={`${t.event} decoration`} fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/50 to-transparent md:bg-gradient-to-r md:from-transparent md:to-ivory/10" />
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            className="relative flex flex-col p-7 sm:p-10 md:col-span-7 lg:p-14"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => (info.offset.x < -50 ? go(1) : info.offset.x > 50 ? go(-1) : null)}
          >
            <Quote className="h-10 w-10 text-gold" strokeWidth={1.2} />
            <div className="relative mt-4 min-h-[220px] sm:min-h-[200px]">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.55, ease }}
                  aria-live="polite"
                >
                  <Stars value={t.rating} />
                  <blockquote className="mt-4 font-serif text-[1.65rem] leading-[1.25] text-forest sm:text-[2rem]">“{t.text}”</blockquote>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-forest font-serif text-lg text-gold">{t.name.charAt(0)}</span>
                    <div>
                      <p className="font-semibold text-forest">{t.name}</p>
                      <p className="text-xs text-charcoal/55">{t.event}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-auto flex items-center justify-between pt-8">
              <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Testimonial ${i + 1}`}
                    onClick={() => setState([i, i > index ? 1 : -1])}
                    className="grid h-6 place-items-center"
                  >
                    <span className={`block h-1 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-forest" : "w-3 bg-forest/20 hover:bg-forest/40"}`} />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-forest/15 text-forest transition hover:border-forest hover:bg-forest hover:text-ivory" aria-label="Previous testimonial">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full border border-forest/15 text-forest transition hover:border-forest hover:bg-forest hover:text-ivory" aria-label="Next testimonial">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        <p className="mt-4 text-center text-[0.7rem] tracking-wide text-charcoal/40">Demo testimonials shown for layout — replace with genuine customer reviews.</p>
      </div>
    </section>
  );
}
