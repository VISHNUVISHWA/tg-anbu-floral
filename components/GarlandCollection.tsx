"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Plus } from "lucide-react";
import { useState } from "react";
import { garlands, img, type Product } from "@/lib/data";
import { inr, useStore } from "@/lib/store";
import { Reveal, Sparkle } from "./ui";

export default function GarlandCollection() {
  return (
    <section id="garlands" className="relative overflow-clip bg-gradient-to-b from-[#F7EDE8] via-ivory to-ivory py-20 lg:py-28" aria-labelledby="gar-title">
      <div className="pointer-events-none absolute top-20 -right-40 h-[500px] w-[500px] rounded-full bg-blush/50 blur-[130px]" />
      <div className="container-lux relative grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Intro (sticky on desktop) */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow mb-4 flex items-center gap-3 text-emerald">
                <Sparkle className="h-3 w-3 text-gold" /> The Garland Atelier
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="gar-title" className="font-serif text-[2.6rem] leading-[1] font-medium text-forest sm:text-6xl">
                Tradition, <em className="text-emerald">Woven</em> in Every Flower.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-md text-[0.97rem] leading-relaxed text-charcoal/65">
                Every garland is strung by hand the same morning it leaves our workshop — jasmine buds counted, roses graded, marigolds packed tight for that unmistakable fullness and fragrance.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="relative mt-8">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem]">
                <Image src={img.garlandMaker} alt="An artisan stringing marigold garlands by hand" fill sizes="(min-width:1024px) 38vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/70 to-transparent" />
                <div className="absolute bottom-0 grid w-full grid-cols-3 gap-2 p-5 text-ivory">
                  {[
                    ["Freshness", "Strung at dawn"],
                    ["Texture", "Hand-packed"],
                    ["Colour", "Matched to you"],
                  ].map(([t, s]) => (
                    <div key={t}>
                      <p className="font-serif text-xl italic">{t}</p>
                      <p className="text-[0.7rem] text-ivory/70">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-6 -right-4 hidden h-28 w-28 overflow-hidden rounded-full border-[5px] border-ivory shadow-xl sm:block">
                <Image src={img.malligai} alt="Fresh jasmine buds" fill sizes="112px" className="object-cover" />
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <a href="#shop" className="btn btn-primary mt-8">
                View Garland Collection <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
        </div>

        {/* Garland grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-7">
          {garlands.map((g, i) => (
            <Reveal key={g.id} delay={(i % 2) * 0.08} className={i % 2 ? "sm:mt-12" : ""}>
              <GarlandCard g={g} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GarlandCard({ g }: { g: Product }) {
  const { addToCart, setQuickView } = useStore();
  const [added, setAdded] = useState(false);
  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.6rem] bg-cream">
        <button onClick={() => setQuickView(g)} className="absolute inset-0" aria-label={`Quick view ${g.name}`}>
          <Image src={g.image} alt={g.name} fill sizes="(min-width:1024px) 28vw, 50vw" className="object-cover transition duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
        </button>
        {g.badge && <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-ivory/90 px-3 py-1 text-[0.6rem] font-bold tracking-[0.18em] text-forest uppercase">{g.badge}</span>}
        <button
          onClick={() => {
            addToCart(g);
            setAdded(true);
            setTimeout(() => setAdded(false), 1400);
          }}
          className="absolute right-3 bottom-3 left-3 flex h-11 items-center justify-center gap-2 rounded-full bg-ivory/90 text-xs font-semibold text-forest backdrop-blur transition duration-500 hover:bg-forest hover:text-ivory lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:focus-visible:translate-y-0 lg:focus-visible:opacity-100"
          aria-label={`Quick add ${g.name}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={String(added)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
              {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {added ? "Added" : "Quick Add"}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          <h3 className="font-serif text-lg leading-tight text-forest sm:text-xl">{g.name}</h3>
          <p className="mt-0.5 truncate text-[0.72rem] text-charcoal/55">{g.type}</p>
        </div>
        <p className="shrink-0 font-serif text-lg text-forest">{inr(g.price)}</p>
      </div>
    </article>
  );
}
