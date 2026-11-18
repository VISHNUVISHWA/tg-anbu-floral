"use client";

import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { business, waLink } from "@/lib/data";
import { asset } from "@/lib/site";
import { useStore } from "@/lib/store";
import { Logo } from "./Header";
import { FacebookIcon, FlowerMark, InstagramIcon, WhatsAppIcon, YoutubeIcon, goTo } from "./ui";

export default function Footer() {
  const { openEnquiry, notify } = useStore();
  const [email, setEmail] = useState("");

  const col = (title: string, links: { label: string; onClick: () => void }[]) => (
    <div>
      <p className="eyebrow mb-5 text-gold">{title}</p>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <button onClick={l.onClick} className="link-underline text-left text-sm text-ivory/70 transition hover:text-ivory">
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="grain relative overflow-hidden bg-charcoal pt-20 pb-28 text-ivory sm:pb-10">
      <FlowerMark className="pointer-events-none absolute -right-24 -bottom-24 h-[420px] w-[420px] text-ivory/[0.03]" />
      <div className="container-lux relative">
        {/* Newsletter */}
        <div className="grid gap-8 border-b border-ivory/10 pb-14 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="font-serif text-4xl leading-tight sm:text-5xl">
              Floral inspiration, <em className="text-gold">delivered.</em>
            </p>
            <p className="mt-3 max-w-md text-sm text-ivory/60">Get floral inspiration, new collections, and special offers.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              notify({ title: "You’re subscribed!", body: `We’ll write to ${email} with new collections.` });
              setEmail("");
            }}
            className="flex w-full flex-col gap-3 sm:flex-row lg:justify-self-end"
          >
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input
              id="nl-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="h-14 w-full rounded-full border border-ivory/15 bg-ivory/5 px-6 text-sm text-ivory outline-none placeholder:text-ivory/40 focus:border-gold lg:w-80"
            />
            <button className="btn btn-gold h-14 shrink-0 px-7">
              Subscribe <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-5 max-w-xs font-serif text-xl leading-snug text-ivory/80 italic">Bringing flowers, celebrations, and beautiful moments together.</p>
            <ul className="mt-6 space-y-3 text-sm text-ivory/65">
              <li>
                <a href={`tel:${business.phone}`} className="flex items-center gap-3 hover:text-ivory">
                  <Phone className="h-4 w-4 text-gold" /> {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="flex items-center gap-3 hover:text-ivory">
                  <Mail className="h-4 w-4 text-gold" /> {business.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {business.address}
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gold" /> {business.hours}
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              {[
                { href: business.instagram, icon: InstagramIcon, label: "Instagram" },
                { href: business.facebook, icon: FacebookIcon, label: "Facebook" },
                { href: business.youtube, icon: YoutubeIcon, label: "YouTube" },
                { href: waLink("Hello T.G ANBU!"), icon: WhatsAppIcon, label: "WhatsApp" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-full border border-ivory/15 text-ivory/80 transition hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-forest">
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            {col("Shop", [
              { label: "Fresh Flowers", onClick: () => goTo("#shop", "All") },
              { label: "Flower Garlands", onClick: () => goTo("#garlands") },
              { label: "Floral Collections", onClick: () => goTo("#categories") },
              { label: "Best Sellers", onClick: () => goTo("#shop", "All") },
            ])}
          </div>
          <div className="lg:col-span-3">
            {col("Decoration Services", [
              { label: "Wedding Decoration", onClick: () => goTo("#wedding") },
              { label: "Reception Decoration", onClick: () => openEnquiry("Reception Decoration") },
              { label: "Stage Decoration", onClick: () => openEnquiry("Stage Decoration") },
              { label: "Event Decoration", onClick: () => goTo("#events") },
              { label: "Custom Decoration", onClick: () => goTo("#custom") },
            ])}
          </div>
          <div className="lg:col-span-3">
            {col("Customer Support", [
              { label: "Contact Us", onClick: () => openEnquiry("General enquiry") },
              { label: "WhatsApp", onClick: () => window.open(waLink("Hello T.G ANBU!"), "_blank", "noopener") },
              { label: "FAQs", onClick: () => goTo("#faq") },
              { label: "Order Support", onClick: () => window.open(waLink("Hello T.G ANBU, I need help with my order."), "_blank", "noopener") },
            ])}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-ivory/10 pt-8 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} T.G ANBU Floral &amp; Event Design, Cheyyar. All rights reserved.</p>
          <p>
            Some photography via Unsplash &amp; Wikimedia Commons —{" "}
            <a href={asset("/images/credits.json")} className="underline hover:text-ivory" target="_blank">
              credits
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
