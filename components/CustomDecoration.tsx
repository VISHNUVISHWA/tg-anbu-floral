"use client";

import Image from "next/image";
import { ArrowRight, Check, Phone } from "lucide-react";
import { business, customServices, img, waLink } from "@/lib/data";
import { useStore } from "@/lib/store";
import Petals from "./Petals";
import { FlowerMark, Reveal, Sparkle, WhatsAppIcon } from "./ui";

export default function CustomDecoration() {
  const { openEnquiry } = useStore();
  return (
    <section id="custom" className="grain relative overflow-hidden bg-forest py-20 text-ivory lg:py-28" aria-labelledby="custom-title">
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-emerald blur-[140px]" />
      <div className="pointer-events-none absolute top-10 right-10 h-64 w-64 rounded-full bg-gold/15 blur-[100px]" />
      <Petals count={10} className="opacity-70" />
      {/* gold line ornament */}
      <svg className="pointer-events-none absolute top-0 left-1/2 hidden h-full -translate-x-1/2 text-gold/15 lg:block" viewBox="0 0 2 800" preserveAspectRatio="none" aria-hidden>
        <line x1="1" y1="0" x2="1" y2="800" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
      </svg>

      <div className="container-lux relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3 text-gold">
              <Sparkle className="h-3 w-3" /> Custom Decoration &amp; Consultation
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="custom-title" className="font-serif text-[2.8rem] leading-[0.98] font-medium sm:text-6xl lg:text-[4.4rem]">
              Your Vision. <br />
              <em className="text-gold">Our Floral Art.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-lg text-[1rem] leading-relaxed text-ivory/70">
              Every celebration is unique. Tell us your vision, and our floral team will create a decoration experience designed around your event, venue, colors, and style.
            </p>
          </Reveal>

          <ul className="mt-9 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {customServices.map((s, i) => (
              <Reveal as="li" key={s} delay={0.18 + i * 0.05}>
                <button onClick={() => openEnquiry(s)} className="group flex w-full items-center gap-3 border-b border-ivory/10 py-3 text-left">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/40 text-gold transition group-hover:bg-gold group-hover:text-forest">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="flex-1 text-[0.95rem] text-ivory/85 transition group-hover:text-ivory">{s}</span>
                  <ArrowRight className="h-4 w-4 -translate-x-2 text-gold opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                </button>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => openEnquiry("Custom Decoration")} className="btn btn-gold h-14 px-8">
              Discuss Your Decoration <ArrowRight className="h-4 w-4" />
            </button>
            <a href={waLink("Hello T.G ANBU! I'd like to discuss a custom decoration.")} target="_blank" rel="noreferrer" className="btn btn-ghost-light h-14 px-8">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
            </a>
          </Reveal>
          <Reveal delay={0.34}>
            <a href={`tel:${business.phone}`} className="mt-5 inline-flex items-center gap-2 text-sm text-ivory/60 hover:text-ivory">
              <Phone className="h-4 w-4 text-gold" /> Or call {business.phoneDisplay}
            </a>
          </Reveal>
        </div>

        {/* collage */}
        <Reveal delay={0.1} className="relative mx-auto w-full max-w-[540px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-gold/30 p-3">
            <div className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-[1.5rem]">
              <Image src={img.handsStringing} alt="Hands stringing a fresh flower garland" fill sizes="(min-width:1024px) 540px, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
            </div>
          </div>
          <div className="absolute -bottom-8 -left-4 w-[46%] overflow-hidden rounded-[1.5rem] border-[6px] border-forest shadow-2xl sm:-left-10">
            <div className="relative aspect-square">
              <Image src={img.mandapPillar} alt="Detail of traditional striped floral stage work" fill sizes="260px" className="object-cover" />
            </div>
          </div>
          <div className="glass-dark absolute top-10 -right-2 flex items-center gap-3 rounded-2xl border border-ivory/15 p-4 sm:-right-8">
            <FlowerMark className="h-9 w-9 text-gold" />
            <div>
              <p className="font-serif text-xl leading-none">Free consultation</p>
              <p className="mt-1 text-[0.7rem] text-ivory/60">Ideas + quote on WhatsApp</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
