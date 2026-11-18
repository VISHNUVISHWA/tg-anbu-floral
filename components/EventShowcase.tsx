"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { events } from "@/lib/data";
import { useStore } from "@/lib/store";
import { SectionHeading } from "./ui";

export default function EventShowcase() {
  const { openEnquiry } = useStore();
  const rail = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: rail });
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollXProgress, "change", (v) => setProgress(v));

  const scroll = (d: number) => rail.current?.scrollBy({ left: d * Math.min(rail.current.clientWidth * 0.75, 760), behavior: "smooth" });

  return (
    <section id="events" className="relative overflow-hidden bg-ivory py-20 lg:py-28" aria-labelledby="evt-title">
      <div className="container-lux">
        <div id="evt-title">
          <SectionHeading
            eyebrow="Event Decoration"
            title={
              <>
                Make Every Celebration <em className="text-emerald">Extraordinary.</em>
              </>
            }
            subtitle="From a first birthday to a grand inauguration — floral styling that sets the mood the moment guests arrive."
            action={
              <div className="flex gap-2">
                <button onClick={() => scroll(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-forest/20 text-forest transition hover:border-forest hover:bg-forest hover:text-ivory" aria-label="Previous events">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button onClick={() => scroll(1)} className="grid h-12 w-12 place-items-center rounded-full border border-forest/20 text-forest transition hover:border-forest hover:bg-forest hover:text-ivory" aria-label="Next events">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            }
          />
        </div>
      </div>

      <div
        ref={rail}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 md:gap-6 md:px-8 xl:px-[max(3rem,calc((100vw-88rem)/2+3rem))]"
      >
        {events.map((e, i) => (
          <motion.article
            key={e.title}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative w-[78%] shrink-0 snap-start overflow-hidden rounded-[1.75rem] sm:w-[46%] lg:w-[30%] xl:w-[23%] ${i % 2 ? "lg:mt-12" : ""}`}
          >
            <div className="relative aspect-[3/4]">
              <Image src={e.image} alt={e.title} fill sizes="(min-width:1280px) 23vw, (min-width:1024px) 30vw, 78vw" className="object-cover transition duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent" />
              <span className="absolute top-5 left-5 font-serif text-5xl text-ivory/25 italic">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
              <h3 className="font-serif text-[1.9rem] leading-none">{e.title}</h3>
              <p className="mt-2 text-sm text-ivory/70">{e.desc}</p>
              <button
                onClick={() => openEnquiry(e.title)}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-ivory/30 px-4 py-2.5 text-xs font-semibold backdrop-blur transition hover:border-gold hover:bg-gold hover:text-forest"
              >
                Explore designs <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:rotate-45" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="container-lux mt-8">
        <div className="h-px w-full bg-forest/10">
          <div className="h-px bg-gold transition-[width] duration-200" style={{ width: `${Math.max(12, progress * 100)}%` }} />
        </div>
      </div>
    </section>
  );
}
