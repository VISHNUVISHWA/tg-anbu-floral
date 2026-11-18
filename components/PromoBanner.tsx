"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { img } from "@/lib/data";
import { useStore } from "@/lib/store";
import Petals from "./Petals";
import { Reveal, Sparkle, goTo } from "./ui";

export default function PromoBanner() {
  const { openEnquiry } = useStore();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden py-28 text-ivory sm:py-36 lg:py-44" aria-label="Promotion">
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0 -z-20">
        <Image src={img.darkBouquet} alt="" fill sizes="100vw" className="object-cover object-center" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(23,59,43,0.95)_0%,rgba(23,59,43,0.75)_40%,rgba(29,36,33,0.25)_100%)]" />
      <Petals count={10} />
      <div className="container-lux">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-gold">
              <Sparkle className="h-3 w-3" /> Season of Celebrations
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-serif text-[2.9rem] leading-[0.98] font-medium sm:text-6xl lg:text-7xl">
              Make Your Next Celebration <em className="text-gold">Bloom.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-ivory/75">
              Explore floral collections, discover beautiful garlands, and create unforgettable event decorations.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => goTo("#shop")} className="btn btn-gold h-14 px-8">
              Shop Flowers <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => openEnquiry("Decoration booking")} className="btn btn-ghost-light h-14 px-8">
              Book Decoration
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
