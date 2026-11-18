"use client";

import Image from "next/image";
import { Expand } from "lucide-react";
import { gallery } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Reveal, SectionHeading } from "./ui";

// varied aspect ratios create the masonry rhythm
const ratios = ["aspect-[4/5]", "aspect-[4/3]", "aspect-[3/4]", "aspect-square", "aspect-[4/3]", "aspect-[3/4]", "aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[4/3]"];

export default function Gallery() {
  const { setLightbox } = useStore();
  return (
    <section id="gallery" className="bg-ivory py-20 lg:py-28" aria-labelledby="gal-title">
      <div className="container-lux">
        <div id="gal-title">
          <SectionHeading
            align="center"
            eyebrow="Inspiration"
            title={
              <>
                Find Inspiration for Your <em className="text-emerald">Celebration</em>
              </>
            }
            subtitle="A curated look at floral stages, traditional mandaps, arches, backdrops and the small details in between. Tap any image to expand."
          />
        </div>

        <div className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4 lg:gap-5">
          {gallery.map((g, i) => (
            <Reveal key={g.src + i} delay={(i % 4) * 0.06} className="mb-3 break-inside-avoid sm:mb-4 lg:mb-5">
              <button
                onClick={() => setLightbox({ items: gallery, index: i })}
                className={`group relative block w-full overflow-hidden rounded-[1.4rem] ${ratios[i % ratios.length]}`}
                aria-label={`Expand ${g.title}`}
              >
                <Image src={g.src} alt={g.title} fill sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" className="object-cover transition duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
                <span className="absolute inset-0 bg-forest/0 transition duration-700 group-hover:bg-forest/45" />
                <span className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-ivory opacity-0 transition duration-500 group-hover:opacity-100">
                  <span className="grid h-11 w-11 scale-75 place-items-center rounded-full border border-ivory/50 transition duration-500 group-hover:scale-100">
                    <Expand className="h-4 w-4" />
                  </span>
                  <span className="mt-3 font-serif text-xl leading-tight">{g.title}</span>
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-ivory/85 px-3 py-1 text-[0.65rem] font-semibold text-forest backdrop-blur transition group-hover:opacity-0 sm:hidden">
                  {g.title}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
