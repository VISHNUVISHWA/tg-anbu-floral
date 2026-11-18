"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Phone, Plus } from "lucide-react";
import { useState } from "react";
import { business, faqs, waLink } from "@/lib/data";
import { Reveal, SectionHeading, WhatsAppIcon, ease } from "./ui";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-cream/70 py-20 lg:py-28" aria-labelledby="faq-title">
      <div className="container-lux grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div id="faq-title">
            <SectionHeading eyebrow="Questions" title={<>Good to <em className="text-emerald">Know</em></>} subtitle="Quick answers to what customers ask us most. Can’t find yours? We’re a message away." />
          </div>
          <Reveal className="rounded-[1.6rem] bg-forest p-7 text-ivory">
            <p className="font-serif text-2xl">Still have a question?</p>
            <p className="mt-2 text-sm text-ivory/65">{business.hours}</p>
            <div className="mt-5 flex flex-col gap-2">
              <a href={waLink("Hello T.G ANBU, I have a question.")} target="_blank" rel="noreferrer" className="btn btn-gold">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
              <a href={`tel:${business.phone}`} className="btn btn-ghost-light">
                <Phone className="h-4 w-4" /> {business.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <ul className="divide-y divide-forest/10 border-y border-forest/10">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal as="li" key={f.q} delay={i * 0.04}>
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      id={`faq-btn-${i}`}
                    >
                      <span className={`font-serif text-[1.35rem] leading-snug transition sm:text-2xl ${isOpen ? "text-emerald" : "text-forest group-hover:text-emerald"}`}>{f.q}</span>
                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition duration-500 ${isOpen ? "rotate-45 border-forest bg-forest text-ivory" : "border-forest/20 text-forest"}`}>
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`}
                        role="region"
                        aria-labelledby={`faq-btn-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 text-[0.95rem] leading-relaxed text-charcoal/65">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
