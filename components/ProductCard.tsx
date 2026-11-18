"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/data";
import { inr, useStore } from "@/lib/store";
import { Stars } from "./ui";

export default function ProductCard({ p, priority = false, compact = false }: { p: Product; priority?: boolean; compact?: boolean }) {
  const { addToCart, toggleWishlist, isWished, setQuickView } = useStore();
  const [added, setAdded] = useState(false);
  const wished = isWished(p.id);

  const add = () => {
    addToCart(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-forest/[0.08] bg-white/70 shadow-[0_1px_0_rgba(23,59,43,0.04)] transition duration-700 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_30px_60px_-30px_rgba(23,59,43,0.35)]">
      <div className={`relative overflow-hidden bg-cream ${compact ? "aspect-[4/5]" : "aspect-[4/5]"}`}>
        <button onClick={() => setQuickView(p)} className="absolute inset-0" aria-label={`Quick view ${p.name}`}>
          <Image
            src={p.image}
            alt={p.name}
            fill
            priority={priority}
            sizes="(min-width:1280px) 22vw, (min-width:768px) 33vw, 75vw"
            className="object-cover transition duration-[1.3s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.08]"
          />
        </button>
        {p.badge && (
          <span className="pointer-events-none absolute top-3.5 left-3.5 rounded-full bg-ivory/90 px-3 py-1 text-[0.6rem] font-bold tracking-[0.18em] text-forest uppercase backdrop-blur">
            {p.badge}
          </span>
        )}
        {p.mrp && (
          <span className="pointer-events-none absolute bottom-3.5 left-3.5 rounded-full bg-blush px-2.5 py-1 text-[0.65rem] font-bold text-forest">
            −{Math.round(((p.mrp - p.price) / p.mrp) * 100)}%
          </span>
        )}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleWishlist(p)}
          className={`absolute top-3 right-3 grid h-10 w-10 place-items-center rounded-full backdrop-blur transition ${
            wished ? "bg-blush text-forest" : "bg-ivory/85 text-forest hover:bg-ivory"
          }`}
          aria-label={wished ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
          aria-pressed={wished}
        >
          <motion.span key={String(wished)} initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 14 }}>
            <Heart className={`h-[1.05rem] w-[1.05rem] ${wished ? "fill-current" : ""}`} />
          </motion.span>
        </motion.button>
        <button
          onClick={() => setQuickView(p)}
          className="absolute right-3 bottom-3 flex translate-y-2 items-center gap-1.5 rounded-full bg-ivory/90 px-3.5 py-2 text-[0.7rem] font-semibold text-forest opacity-0 backdrop-blur transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 max-lg:translate-y-0 max-lg:opacity-100"
        >
          <Eye className="h-3.5 w-3.5" /> Quick View
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[0.66rem] font-semibold tracking-[0.16em] text-emerald uppercase">{p.type}</p>
          <span className="flex items-center gap-1 text-[0.7rem] text-charcoal/55">
            <Stars value={p.rating} className="hidden sm:inline-flex" />
            <span className="sm:hidden">★</span> {p.rating.toFixed(1)}
          </span>
        </div>
        <h3 className="mt-2 font-serif text-[1.35rem] leading-[1.1] text-forest">{p.name}</h3>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="font-serif text-2xl leading-none text-forest">{inr(p.price)}</p>
            {p.mrp && <p className="mt-1 text-xs text-charcoal/40 line-through">{inr(p.mrp)}</p>}
          </div>
          <button
            onClick={add}
            className={`relative flex h-11 items-center gap-2 overflow-hidden rounded-full px-4 text-xs font-semibold transition duration-500 ${
              added ? "bg-emerald text-ivory" : "bg-forest text-ivory hover:bg-emerald"
            }`}
            aria-label={`Add ${p.name} to cart`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span key="ok" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> Added
                </motion.span>
              ) : (
                <motion.span key="add" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} className="flex items-center gap-1.5">
                  <ShoppingBag className="h-4 w-4" /> Add
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </article>
  );
}
