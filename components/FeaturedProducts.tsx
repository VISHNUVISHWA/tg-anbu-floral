"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { productTags, products, type ProductTag } from "@/lib/data";
import ProductCard from "./ProductCard";
import { SectionHeading, ease } from "./ui";

export default function FeaturedProducts() {
  const [tag, setTag] = useState<"All" | ProductTag>("All");
  const rail = useRef<HTMLDivElement>(null);

  // Mega-menu / collection links can set the active filter
  useEffect(() => {
    const h = (e: Event) => {
      const v = (e as CustomEvent<string>).detail as "All" | ProductTag;
      if (productTags.includes(v)) setTag(v);
    };
    window.addEventListener("tg:filter", h);
    return () => window.removeEventListener("tg:filter", h);
  }, []);

  const list = tag === "All" ? products : products.filter((p) => p.tag === tag);
  const scroll = (d: number) => rail.current?.scrollBy({ left: d * rail.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section id="shop" className="relative overflow-hidden bg-cream/60 py-20 lg:py-28" aria-labelledby="shop-title">
      <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-blush/30 blur-[120px]" />
      <div className="container-lux relative">
        <div id="shop-title">
          <SectionHeading
            eyebrow="Shop the Collection"
            title={
              <>
                Flowers Worth <em className="text-emerald">Falling</em> For
              </>
            }
            subtitle="Fresh bunches, fragrant garlands and everlasting arrangements — hand-finished and delivered with care."
            action={
              <div className="hidden gap-2 md:flex">
                <button onClick={() => scroll(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-forest/20 text-forest transition hover:border-forest hover:bg-forest hover:text-ivory lg:hidden" aria-label="Scroll products left">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button onClick={() => scroll(1)} className="grid h-12 w-12 place-items-center rounded-full border border-forest/20 text-forest transition hover:border-forest hover:bg-forest hover:text-ivory lg:hidden" aria-label="Scroll products right">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            }
          />
        </div>

        <div className="no-scrollbar -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0" role="tablist" aria-label="Filter products">
          {productTags.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tag === t}
              onClick={() => setTag(t)}
              className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${tag === t ? "text-ivory" : "text-forest hover:bg-forest/5"}`}
            >
              {tag === t && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-forest" transition={{ duration: 0.5, ease }} />}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>

        {/* mobile/tablet: swipeable rail · desktop: grid */}
        <div
          ref={rail}
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0"
        >
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease, delay: Math.min(i, 7) * 0.04 }}
                className="w-[72%] shrink-0 snap-start sm:w-[44%] md:w-[31%] lg:w-auto"
              >
                <ProductCard p={p} priority={i < 2} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <p className="mt-6 text-center text-xs text-charcoal/45">Prices are indicative and may vary with season and flower availability.</p>
      </div>
    </section>
  );
}
