"use client";

import Image from "next/image";
import { ArrowRight, Expand } from "lucide-react";
import { gallery, waLink } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Reveal, SectionHeading, WhatsAppIcon, Sparkle } from "./ui";

export default function Gallery() {
  const { setLightbox, openEnquiry } = useStore();
  return (
    <section id="gallery" className="relative overflow-hidden bg-ivory py-20 lg:py-28" aria-labelledby="gal-title">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-blush/30 blur-[120px]" />
      <div className="container-lux relative">
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

        <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 lg:auto-rows-[210px] lg:grid-cols-4 lg:gap-5">
          {gallery.map((g, i) => {
            const feature = i === 0;
            return (
              <Reveal key={g.title} delay={(i % 4) * 0.06} className={`${layoutFor(i)} min-h-0`}>
                <button
                  onClick={() => setLightbox({ items: gallery, index: i })}
                  className="group relative block h-full w-full overflow-hidden rounded-[1.4rem] sm:rounded-[1.75rem]"
                  aria-label={`Expand ${g.title}`}
                >
                  <Image
                    src={g.src}
                    alt={g.title}
                    fill
                    sizes={feature ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 50vw"}
                    className={`object-cover transition duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110 ${g.concept ? "object-[50%_32%]" : ""}`}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-forest/75 via-forest/5 to-transparent opacity-80 transition duration-700 group-hover:opacity-100" />
                  <span className="absolute top-3 right-3 grid h-10 w-10 scale-75 place-items-center rounded-full bg-ivory/20 text-ivory opacity-0 backdrop-blur transition duration-500 group-hover:scale-100 group-hover:opacity-100 sm:top-4 sm:right-4">
                    <Expand className="h-4 w-4" />
                  </span>
                  {g.concept && (
                    <span className="absolute top-3 left-3 rounded-full bg-charcoal/70 px-2.5 py-1 text-[0.55rem] font-semibold tracking-wider text-ivory uppercase backdrop-blur sm:text-[0.62rem]">
                      Concept image
                    </span>
                  )}
                  <span className="absolute inset-x-0 bottom-0 p-3.5 text-left text-ivory sm:p-5">
                    <span className="block text-[0.6rem] font-semibold tracking-[0.2em] text-gold uppercase">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`mt-0.5 block font-serif leading-tight ${feature ? "text-2xl sm:text-4xl" : "text-base sm:text-xl"}`}>{g.title}</span>
                    <span className="mt-1 hidden max-h-0 overflow-hidden text-xs text-ivory/75 transition-all duration-500 group-hover:max-h-12 lg:block">{g.caption}</span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* closing call to action */}
        <Reveal className="mt-10 lg:mt-14">
          <div className="relative overflow-hidden rounded-[2rem] bg-forest px-7 py-9 text-ivory sm:px-12 sm:py-11">
            <Sparkle className="absolute top-6 right-8 h-6 w-6 animate-shimmer text-gold" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="eyebrow text-gold">Your turn</p>
                <p className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">Have a look in mind? We’ll bring it to bloom.</p>
                <p className="mt-2 max-w-xl text-sm text-ivory/65">Send us a reference photo or idea and we’ll shape it to your venue, colours and budget.</p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <button onClick={() => openEnquiry("Custom Floral Design")} className="btn btn-gold h-14 px-7">
                  Plan Your Event <ArrowRight className="h-4 w-4" />
                </button>
                <a href={waLink("Hello T.G ANBU! I have a decoration idea to share.")} target="_blank" rel="noreferrer" className="btn btn-ghost-light h-14 px-7">
                  <WhatsAppIcon className="h-4 w-4" /> Share on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Tile placement: explicit on desktop so edges align; simple spans on mobile. */
function layoutFor(i: number) {
  // Desktop (4 cols x 4 rows):
  //  r1: [0 0][1][2]
  //  r2: [0 0][3 3]
  //  r3: [4][5][6][7]
  //  r4: [8 8][9 9]
  const lg = [
    "lg:col-start-1 lg:row-start-1 lg:col-span-2 lg:row-span-2",
    "lg:col-start-3 lg:row-start-1",
    "lg:col-start-4 lg:row-start-1",
    "lg:col-start-3 lg:row-start-2 lg:col-span-2",
    "lg:col-start-1 lg:row-start-3",
    "lg:col-start-2 lg:row-start-3",
    "lg:col-start-3 lg:row-start-3",
    "lg:col-start-4 lg:row-start-3",
    "lg:col-start-1 lg:row-start-4 lg:col-span-2",
    "lg:col-start-3 lg:row-start-4 lg:col-span-2",
  ][i];
  // Mobile (2 cols): feature + two wide tiles, everything else 1x1 => fills evenly.
  const base = i === 0 || i === 3 || i === 8 || i === 9 ? "col-span-2" : "";
  return `${base} ${lg}`;
}
