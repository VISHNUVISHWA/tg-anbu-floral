"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data";
import { Reveal, SectionHeading, goTo } from "./ui";

const span: Record<string, string> = {
  tall: "sm:row-span-2",
  wide: "sm:col-span-2",
  std: "",
};

export default function Categories() {
  return (
    <section id="categories" className="relative bg-ivory py-20 lg:py-28" aria-labelledby="cat-title">
      <div className="container-lux">
        <div id="cat-title">
          <SectionHeading
            eyebrow="Discover"
            title={
              <>
                Explore Our <em className="text-emerald">Floral</em> World
              </>
            }
            subtitle="Everything you need to make every celebration unforgettable."
          />
        </div>

        <div className="grid grid-flow-dense auto-rows-[260px] grid-cols-1 gap-4 sm:auto-rows-[240px] sm:grid-cols-2 lg:auto-rows-[260px] lg:grid-cols-4 lg:gap-5">
          {categories.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 0.07} className={span[c.size]}>
              <button
                onClick={() => goTo(c.href)}
                className="group relative block h-full w-full overflow-hidden rounded-[1.75rem] text-left"
                aria-label={`Explore ${c.title}`}
              >
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/25 to-transparent transition-opacity duration-700 group-hover:from-forest/95" />
                <span className="absolute top-5 left-5 font-serif text-sm text-ivory/80 italic">0{i + 1}</span>
                <span className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-ivory/40 text-ivory backdrop-blur-sm transition duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-forest">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-6">
                  <span className="block font-serif text-[1.85rem] leading-none text-ivory">{c.title}</span>
                  <span className="mt-2 block max-w-xs translate-y-2 text-[0.82rem] leading-snug text-ivory/75 opacity-90 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {c.desc}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.2em] text-gold uppercase">
                    Explore
                    <span className="h-px w-6 bg-gold transition-all duration-500 group-hover:w-12" />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
