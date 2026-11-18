"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Plus } from "lucide-react";
import { useRef } from "react";
import { img, products } from "@/lib/data";
import { inr, useStore } from "@/lib/store";
import Petals from "./Petals";
import { FlowerMark, Sparkle, ease, goTo } from "./ui";

const headline = [
  { w: "Where", i: false },
  { w: "Flowers", i: true },
  { w: "Turn", i: false },
  { w: "Moments", i: false },
  { w: "Into", i: false },
  { w: "Memories.", i: true },
];

export default function Hero() {
  const { openEnquiry, addToCart } = useStore();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const jasmine = products.find((p) => p.id === "fresh-jasmine-garland")!;

  return (
    <section ref={ref} className="relative overflow-hidden bg-ivory pt-6 pb-16 sm:pt-10 lg:pb-10" aria-label="Introduction">
      {/* ambient blush & gold glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-blush/40 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-gold/15 blur-[120px]" />
      <Petals count={12} />

      <div className="container-lux relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <div className="relative z-10 lg:col-span-6 xl:col-span-6">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="eyebrow flex items-center gap-3 text-emerald">
            <span className="h-px w-10 bg-gold" />
            T.G ANBU · Floral &amp; Event Design
          </motion.p>

          <h1 className="mt-6 font-serif text-[3.1rem] leading-[0.95] font-medium tracking-[-0.02em] text-forest sm:text-[4.6rem] lg:text-[5.2rem] xl:text-[6.1rem]">
            {headline.map((h, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className={`inline-block ${h.i ? "italic text-emerald" : ""}`}
                  initial={reduce ? false : { y: "110%", rotate: 4 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ duration: 1.1, ease, delay: 0.15 + i * 0.08 }}
                >
                  {h.w}
                </motion.span>
                {i < headline.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.75 }} className="mt-7 max-w-lg text-[1.02rem] leading-relaxed text-charcoal/70">
            From timeless wedding garlands to breathtaking floral celebrations, discover the beauty of handcrafted decoration designed for your most special moments.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.88 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => goTo("#categories")} className="btn btn-primary h-14 px-8">
              Explore Floral Collections <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => openEnquiry("Event planning")} className="btn btn-ghost-dark h-14 px-8">
              Plan Your Event
            </button>
          </motion.div>

          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }} className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-forest/10 pt-6">
            {[
              ["Fresh", "Flowers picked every dawn"],
              ["Handmade", "Garlands strung by artisans"],
              ["Custom", "Décor for any budget"],
            ].map(([t, s]) => (
              <li key={t}>
                <p className="font-serif text-2xl text-forest italic">{t}</p>
                <p className="mt-1 text-[0.72rem] leading-snug text-charcoal/55">{s}</p>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Visual */}
        <div className="relative lg:col-span-6 xl:col-span-6">
          <motion.div
            initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0% round 999px 999px 32px 32px)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 999px 999px 32px 32px)" }}
            transition={{ duration: 1.6, ease, delay: 0.2 }}
            className="relative mx-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden rounded-t-[999px] rounded-b-[2rem] shadow-[0_50px_100px_-40px_rgba(23,59,43,0.55)] lg:ml-auto"
          >
            <motion.div style={{ y: imgY }} className="absolute -inset-y-[8%] inset-x-0">
              <motion.div initial={reduce ? false : { scale: 1.25 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease, delay: 0.2 }} className="absolute inset-0">
                <Image src={img.heroConcept} alt="Concept illustration of a rose-arch wedding stage with a gilded seat" fill priority sizes="(min-width:1024px) 560px, 100vw" className="object-cover object-[50%_45%]" />
              </motion.div>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full bg-charcoal/70 px-3 py-1 text-[0.65rem] font-semibold tracking-wider text-ivory uppercase backdrop-blur">
              Concept image · AI-generated
            </span>
          </motion.div>

          {/* arch outline accent */}
          <div className="pointer-events-none absolute -top-4 right-[-1rem] hidden aspect-[4/5] w-full max-w-[560px] rounded-t-[999px] rounded-b-[2rem] border border-gold/50 lg:block" />

          {/* rotating badge */}
          <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease, delay: 1.1 }} className="absolute top-8 -left-2 sm:left-4 lg:-left-6">
            <div className="relative grid h-28 w-28 place-items-center rounded-full bg-forest text-gold shadow-xl sm:h-32 sm:w-32">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite]" aria-hidden>
                <defs>
                  <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text fontSize="8.4" letterSpacing="2.6" fill="currentColor" fontFamily="var(--font-manrope)" fontWeight="600">
                  <textPath href="#circ">FLOWER DECORATION • CHEYYAR • </textPath>
                </text>
              </svg>
              <FlowerMark className="h-9 w-9 text-ivory" />
            </div>
          </motion.div>

          {/* floating product card */}
          <motion.div style={{ y: cardY }} className="absolute -bottom-6 left-0 sm:left-6 lg:-left-14">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 1.3 }} className="glass flex w-[17rem] items-center gap-3 rounded-3xl border border-white/60 p-3 shadow-[0_30px_60px_-25px_rgba(23,59,43,0.5)]">
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
                <Image src={jasmine.image} alt="" fill sizes="64px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.6rem] font-bold tracking-[0.2em] text-emerald uppercase">Fresh today</span>
                <span className="block truncate font-serif text-lg leading-tight text-forest">{jasmine.name}</span>
                <span className="text-sm font-semibold text-forest">{inr(jasmine.price)}</span>
              </span>
              <button onClick={() => addToCart(jasmine)} className="grid h-10 w-10 place-items-center rounded-full bg-forest text-ivory transition hover:rotate-90 hover:bg-emerald" aria-label={`Add ${jasmine.name} to cart`}>
                <Plus className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>

          {/* small round detail image */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease, delay: 1.45 }} className="absolute right-2 -bottom-10 hidden h-36 w-36 overflow-hidden rounded-full border-[6px] border-ivory shadow-2xl sm:block lg:-right-4">
            <Image src={img.vaseArrangement} alt="Fresh floral arrangement in a glass vase" fill sizes="144px" className="object-cover" />
          </motion.div>

          <Sparkle className="absolute top-1/3 -right-3 h-6 w-6 animate-shimmer text-gold" />
          <Sparkle className="absolute bottom-1/4 left-1/3 h-4 w-4 animate-shimmer text-gold [animation-delay:1.2s]" />
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        onClick={() => goTo("#categories")}
        className="mx-auto mt-16 hidden items-center gap-3 text-[0.68rem] font-semibold tracking-[0.3em] text-forest/60 uppercase lg:flex"
        aria-label="Scroll to explore"
      >
        <span className="grid h-10 w-6 place-items-start justify-center rounded-full border border-forest/25 pt-1.5">
          <motion.span animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="block">
            <ArrowDown className="h-3 w-3" />
          </motion.span>
        </span>
        Scroll to explore
      </motion.button>
    </section>
  );
}
