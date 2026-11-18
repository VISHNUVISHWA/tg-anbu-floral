"use client";

import Image from "next/image";
import { ArrowRight, Expand } from "lucide-react";
import { weddingShowcase } from "@/lib/data";
import { useStore } from "@/lib/store";
import Petals from "./Petals";
import { Reveal, SectionHeading } from "./ui";

// editorial placement on a 12-col grid (desktop)
const layout = [
  "lg:col-span-7 lg:row-span-3 col-span-2 row-span-2", // featured
  "lg:col-span-5 lg:row-span-1",
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-4 lg:row-span-2",
  "lg:col-span-4 lg:row-span-2",
  "lg:col-span-4 lg:row-span-2",
];

export default function WeddingShowcase() {
  const { setLightbox, openEnquiry } = useStore();
  const items = weddingShowcase.map((w) => ({ src: w.image, title: w.title, caption: w.note }));

  return (
    <section id="wedding" className="grain relative overflow-hidden bg-forest py-20 text-ivory lg:py-28" aria-labelledby="wed-title">
      <div className="pointer-events-none absolute -top-32 left-1/3 h-[480px] w-[480px] rounded-full bg-emerald/60 blur-[140px]" />
      <Petals count={8} className="opacity-60" />
      <div className="container-lux relative">
        <div id="wed-title">
          <SectionHeading
            tone="light"
            eyebrow="Wedding Decoration"
            title={
              <>
                Designed for the Moments <em className="text-gold">That Matter.</em>
              </>
            }
            subtitle="Mandaps, stages, entrances and aisles — styled end to end by our floral team, from the first sketch to the final petal."
            action={
              <button onClick={() => openEnquiry("Wedding Decoration")} className="btn btn-gold">
                Request Wedding Decoration <ArrowRight className="h-4 w-4" />
              </button>
            }
          />
        </div>

        <div className="grid auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[220px] lg:auto-rows-[190px] lg:grid-cols-12 lg:gap-4">
          {weddingShowcase.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06} className={layout[i]}>
              <button
                onClick={() => setLightbox({ items, index: i })}
                className="group relative block h-full w-full overflow-hidden rounded-[1.5rem] text-left"
                aria-label={`View ${w.title}`}
              >
                <Image
                  src={w.image}
                  alt={w.title}
                  fill
                  sizes={i === 0 ? "(min-width:1024px) 58vw, 100vw" : "(min-width:1024px) 33vw, 50vw"}
                  className="object-cover transition duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
                  priority={i === 0}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/5 to-transparent opacity-80 transition duration-700 group-hover:opacity-100" />
                <span className="absolute top-4 right-4 grid h-10 w-10 scale-75 place-items-center rounded-full bg-ivory/15 opacity-0 backdrop-blur transition duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <Expand className="h-4 w-4" />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  {i === 0 && <span className="eyebrow mb-2 block text-gold">Featured</span>}
                  <span className={`block font-serif leading-tight ${i === 0 ? "text-3xl sm:text-4xl lg:text-5xl" : "text-lg sm:text-xl"}`}>{w.title}</span>
                  <span className="mt-1 block max-h-0 overflow-hidden text-xs text-ivory/70 transition-all duration-500 group-hover:max-h-10 sm:text-sm">{w.note}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 lg:mt-14">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-gold/30 bg-ivory/[0.04] p-7 backdrop-blur sm:p-10 md:flex-row md:items-center">
            <div>
              <p className="font-serif text-3xl leading-tight sm:text-4xl">Create Your Dream Wedding Setup</p>
              <p className="mt-2 max-w-xl text-sm text-ivory/65">Share your date, venue and colour palette — we’ll send design ideas and a transparent quote on WhatsApp.</p>
            </div>
            <button onClick={() => openEnquiry("Wedding Decoration")} className="btn btn-gold h-14 shrink-0 px-8">
              Request Wedding Decoration <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
