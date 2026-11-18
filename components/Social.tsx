"use client";

import Image from "next/image";
import { business, social } from "@/lib/data";
import { InstagramIcon, Reveal, SectionHeading } from "./ui";

export default function Social() {
  return (
    <section className="bg-ivory py-20 lg:py-28" aria-labelledby="soc-title">
      <div className="container-lux">
        <div id="soc-title">
          <SectionHeading
            eyebrow="@tganbu"
            title={
              <>
                Follow the <em className="text-emerald">Flowers.</em>
              </>
            }
            subtitle="Fresh arrivals, wedding set-ups and behind-the-scenes from our garland workshop."
            action={
              <a href={business.instagram} target="_blank" rel="noreferrer" className="btn btn-primary">
                <InstagramIcon className="h-4 w-4" /> Follow T.G ANBU
              </a>
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          {social.map((s, i) => (
            <Reveal key={s.src} delay={(i % 4) * 0.06}>
              <a href={business.instagram} target="_blank" rel="noreferrer" className="group relative block aspect-square overflow-hidden rounded-[1.3rem]" aria-label={`Instagram post: ${s.label}`}>
                <Image src={s.src} alt={s.label} fill sizes="(min-width:640px) 25vw, 50vw" className="object-cover transition duration-[1.3s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-forest/0 p-4 text-center text-ivory opacity-0 transition duration-500 group-hover:bg-forest/55 group-hover:opacity-100">
                  <InstagramIcon className="h-7 w-7" />
                  <span className="text-xs font-medium">{s.label}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
