"use client";

import Image from "next/image";
import { CalendarCheck, Flower2, HeartHandshake, Layers, Palette } from "lucide-react";
import { business, img } from "@/lib/data";
import { Reveal, SectionHeading } from "./ui";

const features = [
  { icon: Flower2, title: "Freshness First", text: "Carefully selected flowers for beautiful, fresh arrangements." },
  { icon: HeartHandshake, title: "Made With Love", text: "Every garland and floral arrangement is crafted with attention to detail." },
  { icon: Palette, title: "Custom Designs", text: "Decoration tailored to your event, style, theme, and budget." },
  { icon: Layers, title: "Complete Floral Solutions", text: "Flowers, garlands, wedding décor, stage decoration, and event decoration in one place." },
  { icon: CalendarCheck, title: "Reliable Event Service", text: "Planning and decoration support for important celebrations." },
];

export default function WhyChoose() {
  return (
    <section id="why" className="relative bg-ivory py-20 lg:py-28" aria-labelledby="why-title">
      <div className="container-lux grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div id="why-title">
            <SectionHeading
              eyebrow="Why T.G ANBU"
              title={
                <>
                  Flowers, Crafted <em className="text-emerald">With Care.</em>
                </>
              }
              subtitle="A family floral studio in Cheyyar — trusted for weddings, temple functions and every celebration in between."
            />
          </div>
          <Reveal className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-[400px] lg:mx-0">
              <div className="absolute inset-0 rotate-6 rounded-full border border-gold/40" />
              <div className="absolute inset-4 overflow-hidden rounded-full shadow-[0_30px_60px_-30px_rgba(23,59,43,0.45)]">
                <Image src={img.emblem} alt="T.G ANBU emblem — portrait of T.G. Anbu framed by roses" fill sizes="400px" className="object-cover" />
              </div>
            </div>
            <p className="mt-6 text-center font-serif text-xl text-forest italic lg:text-left">The face behind the flowers.</p>
            <p className="mt-1 text-center text-xs tracking-wide text-charcoal/55 lg:text-left">
              T.G. Anbu · Flower Decoration, Cheyyar · {business.phoneDisplay}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <ul className="grid gap-4 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 0.07} className={i === features.length - 1 ? "sm:col-span-2" : ""}>
                <div className="group relative h-full overflow-hidden rounded-[1.6rem] border border-forest/10 bg-white/60 p-7 transition duration-700 hover:-translate-y-1 hover:border-gold/50 hover:bg-white hover:shadow-[0_30px_60px_-35px_rgba(23,59,43,0.35)]">
                  <span className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blush/0 transition duration-700 group-hover:bg-blush/40" />
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-forest text-gold transition duration-700 group-hover:rotate-[8deg]">
                    <f.icon className="h-6 w-6" strokeWidth={1.4} />
                  </span>
                  <h3 className="relative mt-6 font-serif text-[1.7rem] leading-tight text-forest">{f.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-charcoal/65">{f.text}</p>
                  <span className="absolute right-6 bottom-5 font-serif text-5xl text-forest/[0.06] italic">0{i + 1}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
