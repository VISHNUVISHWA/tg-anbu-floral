"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { announcement, megaMenus, products, type MegaMenu, type MenuLink } from "@/lib/data";
import { inr, useStore } from "@/lib/store";
import { asset } from "@/lib/site";
import { Sparkle, ease, goTo } from "./ui";

export function AnnouncementBar() {
  const items = [...announcement, ...announcement];
  return (
    <div className="relative overflow-hidden bg-forest text-ivory/90">
      <div className="flex w-max animate-marquee items-center py-2 hover:[animation-play-state:paused]">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-5 px-5 text-[0.68rem] font-medium tracking-[0.22em] uppercase">
            <Sparkle className="h-2.5 w-2.5 animate-shimmer text-gold" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-2.5 sm:gap-3" aria-label="T.G ANBU — home">
      <span
        className={`relative block h-11 w-11 shrink-0 overflow-hidden rounded-full transition-transform duration-700 group-hover:scale-105 sm:h-12 sm:w-12 ${
          light ? "ring-2 ring-gold/60" : "ring-1 ring-gold/40"
        }`}
      >
        <Image src={asset("/images/tg-anbu-emblem.jpg")} alt="" fill sizes="48px" className="object-cover" priority />
      </span>
      <span className="leading-none">
        <span className={`block font-serif text-[1.2rem] font-semibold tracking-[0.05em] whitespace-nowrap sm:text-[1.45rem] ${light ? "text-ivory" : "text-forest"}`}>
          T.G ANBU
        </span>
        <span className={`mt-1 block text-[0.5rem] font-semibold tracking-[0.2em] whitespace-nowrap uppercase sm:text-[0.56rem] sm:tracking-[0.32em] ${light ? "text-gold" : "text-gold-deep"}`}>
          Floral &amp; Event Design
        </span>
      </span>
    </a>
  );
}

export function runLink(link: MenuLink, openEnquiry: (t?: string) => void, after?: () => void) {
  after?.();
  if (link.enquiry) {
    openEnquiry(link.enquiry);
    return;
  }
  // allow the menu to close before scrolling
  setTimeout(() => goTo(link.href, link.filter), 60);
}

export default function Header() {
  const { cartCount, wishlist, setCartOpen, setSearchOpen, setMobileOpen, setWishlistOpen, setAccountOpen, cartPulse } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  const enter = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(id);
  };
  const leave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 180);
  };

  const active = megaMenus.find((m) => m.id === open) ?? null;

  return (
    <header ref={headerRef} id="top" className="sticky top-0 z-50" onMouseLeave={leave}>
      <div
        className={`relative transition-all duration-500 ${
          scrolled || open ? "glass border-b border-forest/10 shadow-[0_10px_40px_-24px_rgba(23,59,43,0.45)]" : "border-b border-transparent bg-ivory"
        }`}
      >
        <div className={`container-lux flex items-center justify-between gap-6 transition-all duration-500 ${scrolled ? "h-[68px]" : "h-[84px]"}`}>
          <div className="flex items-center gap-3">
            <button
              className="-ml-2 grid h-11 w-11 place-items-center rounded-full text-forest hover:bg-forest/5 lg:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <Logo />
          </div>

          <nav className="hidden lg:block" aria-label="Main">
            <ul className="flex items-center gap-1 xl:gap-2">
              <li>
                <a href="#top" className="rounded-full px-3 py-2 text-[0.82rem] font-medium text-forest/80 transition hover:text-forest xl:px-4">
                  Home
                </a>
              </li>
              {megaMenus.map((m) => (
                <li key={m.id} onMouseEnter={() => enter(m.id)}>
                  <button
                    className={`group relative flex items-center gap-1 rounded-full px-3 py-2 text-[0.82rem] font-medium transition xl:px-4 ${
                      open === m.id ? "text-forest" : "text-forest/80 hover:text-forest"
                    }`}
                    aria-expanded={open === m.id}
                    aria-haspopup="true"
                    onClick={() => setOpen(open === m.id ? null : m.id)}
                  >
                    {m.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open === m.id ? "rotate-180" : ""}`} />
                    <span
                      className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-500 ${
                        open === m.id ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-0.5 text-forest sm:gap-1">
            <IconBtn label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-[1.15rem] w-[1.15rem]" />
            </IconBtn>
            <IconBtn label="Account" onClick={() => setAccountOpen(true)} className="hidden sm:grid">
              <User className="h-[1.15rem] w-[1.15rem]" />
            </IconBtn>
            <IconBtn label="Wishlist" onClick={() => setWishlistOpen(true)} badge={wishlist.length} className="hidden sm:grid">
              <Heart className="h-[1.15rem] w-[1.15rem]" />
            </IconBtn>
            <IconBtn label="Shopping cart" onClick={() => setCartOpen(true)} badge={cartCount} pulseKey={cartPulse}>
              <ShoppingBag className="h-[1.15rem] w-[1.15rem]" />
            </IconBtn>
          </div>
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              key="mega"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
              className="absolute inset-x-0 top-full hidden lg:block"
              onMouseEnter={() => enter(active.id)}
            >
              <MegaPanel menu={active} onClose={() => setOpen(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 -z-10 hidden bg-charcoal/25 backdrop-blur-[2px] lg:block"
            onMouseEnter={leave}
            aria-hidden
          />
        )}
      </AnimatePresence>
    </header>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  badge,
  className = "",
  pulseKey,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  badge?: number;
  className?: string;
  pulseKey?: number;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label + (badge ? ` (${badge})` : "")}
      className={`relative grid h-11 w-11 place-items-center rounded-full transition hover:bg-forest/5 ${className}`}
    >
      <motion.span key={pulseKey} initial={pulseKey ? { scale: 1.35, rotate: -12 } : false} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 400, damping: 12 }}>
        {children}
      </motion.span>
      <AnimatePresence>
        {!!badge && (
          <motion.span
            key={badge}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute top-1.5 right-1.5 grid h-[1.05rem] min-w-[1.05rem] place-items-center rounded-full bg-gold px-1 text-[0.6rem] font-bold text-forest"
          >
            {badge}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function MegaPanel({ menu, onClose }: { menu: MegaMenu; onClose: () => void }) {
  const { openEnquiry, setQuickView, addToCart } = useStore();
  const [preview, setPreview] = useState<MenuLink | null>(null);
  useEffect(() => setPreview(null), [menu.id]);

  const go = useCallback((l: MenuLink) => runLink(l, openEnquiry, onClose), [openEnquiry, onClose]);
  const featured = (menu.featuredProducts ?? []).map((id) => products.find((p) => p.id === id)!).filter(Boolean);
  const bannerImg = preview?.image ?? menu.banner.image;
  const hasTiles = !!menu.tiles;

  return (
    <div className="mega-panel border-b border-forest/10 shadow-[0_40px_80px_-40px_rgba(23,59,43,0.45)]">
      <div className="container-lux grid grid-cols-12 gap-8 py-9">
        {/* Link columns */}
        <div className={`${hasTiles ? "col-span-3" : featured.length ? "col-span-6" : "col-span-6"} grid gap-8 ${menu.columns.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
          {menu.columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-4 text-gold-deep">{col.title}</p>
              <ul className="space-y-1">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => go(l)}
                      onMouseEnter={() => l.image && setPreview(l)}
                      onFocus={() => l.image && setPreview(l)}
                      className="group flex w-full items-center gap-3 rounded-xl p-1.5 text-left transition hover:bg-forest/[0.04]"
                    >
                      {l.image && (
                        <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-forest/10">
                          <Image src={l.image} alt="" fill sizes="36px" className="object-cover transition duration-700 group-hover:scale-125" />
                        </span>
                      )}
                      <span className="flex-1 text-[0.86rem] text-charcoal/80 transition group-hover:translate-x-0.5 group-hover:text-forest">
                        {l.label}
                      </span>
                      {l.enquiry && <span className="text-[0.6rem] font-semibold tracking-wider text-gold-deep uppercase opacity-0 transition group-hover:opacity-100">Enquire</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Middle — featured products, quick links or collection tiles */}
        <div className={hasTiles ? "col-span-6" : "col-span-3"}>
          {hasTiles ? (
            <div className="grid h-full grid-cols-3 grid-rows-2 gap-3">
              {menu.tiles!.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => go({ label: t.label, href: t.href, filter: t.filter })}
                  className={`group relative overflow-hidden rounded-2xl text-left ${i === 0 ? "row-span-2" : ""}`}
                >
                  <Image src={t.image} alt={t.label} fill sizes="300px" className="object-cover transition duration-[1.2s] ease-out group-hover:scale-110" />
                  <span className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/10 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-4">
                    <span className="block font-serif text-xl leading-tight text-ivory">{t.label}</span>
                    <span className="mt-1 block text-[0.7rem] text-ivory/70">{t.note}</span>
                  </span>
                </button>
              ))}
            </div>
          ) : featured.length ? (
            <>
              <p className="eyebrow mb-4 text-gold-deep">Featured</p>
              <div className="space-y-3">
                {featured.map((p) => (
                  <div key={p.id} className="group flex items-center gap-3 rounded-2xl border border-forest/10 bg-ivory/70 p-2.5 transition hover:border-gold/50 hover:bg-ivory">
                    <button onClick={() => { onClose(); setQuickView(p); }} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl" aria-label={`Quick view ${p.name}`}>
                      <Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover transition duration-700 group-hover:scale-110" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-serif text-[1.05rem] leading-tight text-forest">{p.name}</p>
                      <p className="mt-0.5 text-xs text-charcoal/55">{p.type}</p>
                      <p className="mt-1 text-sm font-semibold text-forest">{inr(p.price)}</p>
                    </div>
                    <button
                      onClick={() => addToCart(p)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-forest text-ivory transition hover:bg-emerald"
                      aria-label={`Add ${p.name} to cart`}
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="eyebrow mb-4 text-gold-deep">Quick links</p>
              <ul className="space-y-2">
                {menu.quickLinks?.map((q) => (
                  <li key={q.label}>
                    <button onClick={() => go(q)} className="group flex items-center gap-2 font-serif text-xl text-forest">
                      <span className="link-underline">{q.label}</span>
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-gold/40 bg-gradient-to-br from-blush/30 to-transparent p-5">
                <p className="font-serif text-lg leading-snug text-forest">Free design consultation for weddings & events.</p>
                <button onClick={() => { onClose(); openEnquiry(menu.label); }} className="btn btn-primary mt-4 min-h-10 px-5 text-xs">
                  Book a consultation
                </button>
              </div>
            </>
          )}
        </div>

        {/* Banner */}
        <div className="col-span-3">
          <button
            onClick={() => go({ label: menu.banner.cta, href: menu.banner.href })}
            className="group relative block h-full min-h-[330px] w-full overflow-hidden rounded-3xl text-left"
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={bannerImg}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease }}
                className="absolute inset-0"
              >
                <Image src={bannerImg} alt="" fill sizes="360px" className="object-cover" />
              </motion.span>
            </AnimatePresence>
            <span className="absolute inset-0 bg-gradient-to-t from-forest via-forest/30 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-6">
              <span className="eyebrow block text-gold">{preview ? "Preview" : menu.banner.eyebrow}</span>
              <span className="mt-2 block font-serif text-[1.65rem] leading-[1.08] text-ivory">{preview ? preview.label : menu.banner.title}</span>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ivory">
                {menu.banner.cta}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
