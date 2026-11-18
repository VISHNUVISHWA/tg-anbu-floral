"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
  User,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { business, customServices, garlands, megaMenus, products, waLink, type MenuLink, type Product } from "@/lib/data";
import { inr, useStore } from "@/lib/store";
import { Logo, runLink } from "./Header";
import { Stars, WhatsAppIcon, ease, goTo } from "./ui";

const allProducts = [...products, ...garlands];

/* ------------------------------------------------------------------ */
/* Shared shells                                                       */
/* ------------------------------------------------------------------ */
function Backdrop({ onClick, className = "" }: { onClick: () => void; className?: string }) {
  return (
    <motion.div
      className={`fixed inset-0 z-[80] bg-charcoal/50 backdrop-blur-sm ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      aria-hidden
    />
  );
}

function useEsc(active: boolean, fn: () => void) {
  useEffect(() => {
    if (!active) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && fn();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [active, fn]);
}

function Drawer({
  open,
  onClose,
  side = "right",
  label,
  children,
  width = "max-w-md",
}: {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  label: string;
  children: React.ReactNode;
  width?: string;
}) {
  useEsc(open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <>
          <Backdrop onClick={onClose} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className={`fixed top-0 bottom-0 z-[90] flex w-full ${width} flex-col bg-ivory shadow-2xl ${side === "right" ? "right-0" : "left-0"}`}
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ duration: 0.55, ease }}
          >
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Modal({ open, onClose, label, children, className = "" }: { open: boolean; onClose: () => void; label: string; children: React.ReactNode; className?: string }) {
  useEsc(open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <>
          <Backdrop onClick={onClose} />
          <div className="pointer-events-none fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={label}
              className={`pointer-events-auto relative max-h-[92vh] w-full overflow-y-auto rounded-t-[2rem] bg-ivory shadow-2xl sm:rounded-[2rem] ${className}`}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.5, ease }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-ivory/90 text-forest shadow-sm backdrop-blur transition hover:rotate-90 hover:bg-ivory"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function DrawerHead({ title, sub, onClose }: { title: string; sub?: string; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-forest/10 px-6 py-5">
      <div>
        <p className="font-serif text-2xl text-forest">{title}</p>
        {sub && <p className="text-xs text-charcoal/55">{sub}</p>}
      </div>
      <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full text-forest transition hover:rotate-90 hover:bg-forest/5" aria-label="Close">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile navigation                                                   */
/* ------------------------------------------------------------------ */
export function MobileNav() {
  const { mobileOpen, setMobileOpen, openEnquiry, setSearchOpen, setAccountOpen, setWishlistOpen } = useStore();
  const [expanded, setExpanded] = useState<string | null>("flowers");
  const close = () => setMobileOpen(false);
  const go = (l: MenuLink) => runLink(l, openEnquiry, close);

  return (
    <Drawer open={mobileOpen} onClose={close} side="left" label="Menu" width="max-w-full sm:max-w-md">
      <div className="flex items-center justify-between border-b border-forest/10 px-5 py-4">
        <Logo />
        <button onClick={close} className="grid h-11 w-11 place-items-center rounded-full text-forest hover:bg-forest/5" aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <button
          onClick={() => {
            close();
            setSearchOpen(true);
          }}
          className="mt-5 flex w-full items-center gap-3 rounded-full border border-forest/15 bg-white/60 px-5 py-3.5 text-sm text-charcoal/50"
        >
          <Search className="h-4 w-4" /> Search flowers, garlands, décor…
        </button>

        <nav className="mt-4" aria-label="Mobile">
          <a href="#top" onClick={close} className="flex items-center justify-between border-b border-forest/10 py-4 font-serif text-[1.6rem] text-forest">
            Home
          </a>
          {megaMenus.map((m) => {
            const isOpen = expanded === m.id;
            return (
              <div key={m.id} className="border-b border-forest/10">
                <button
                  onClick={() => setExpanded(isOpen ? null : m.id)}
                  className="flex w-full items-center justify-between py-4 text-left font-serif text-[1.6rem] text-forest"
                  aria-expanded={isOpen}
                >
                  {m.label}
                  <ChevronDown className={`h-5 w-5 text-gold-deep transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} className="overflow-hidden">
                      <button onClick={() => go({ label: m.banner.cta, href: m.banner.href })} className="relative mb-4 block h-36 w-full overflow-hidden rounded-2xl text-left">
                        <Image src={m.banner.image} alt="" fill sizes="100vw" className="object-cover" />
                        <span className="absolute inset-0 bg-gradient-to-t from-forest/90 to-forest/10" />
                        <span className="absolute bottom-0 p-4">
                          <span className="block font-serif text-xl leading-tight text-ivory">{m.banner.title}</span>
                          <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-gold">
                            {m.banner.cta} <ArrowRight className="h-3 w-3" />
                          </span>
                        </span>
                      </button>
                      <div className="grid grid-cols-2 gap-2 pb-5">
                        {m.columns.flatMap((c) => c.links).map((l) => (
                          <button key={l.label} onClick={() => go(l)} className="flex min-h-12 items-center gap-2.5 rounded-xl bg-white/60 p-2 text-left text-[0.8rem] text-charcoal/80 active:bg-blush/30">
                            {l.image && (
                              <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
                                <Image src={l.image} alt="" fill sizes="32px" className="object-cover" />
                              </span>
                            )}
                            <span className="leading-tight">{l.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button onClick={() => { close(); setAccountOpen(true); }} className="btn btn-ghost-dark">
            <User className="h-4 w-4" /> Account
          </button>
          <button onClick={() => { close(); setWishlistOpen(true); }} className="btn btn-ghost-dark">
            <Heart className="h-4 w-4" /> Wishlist
          </button>
        </div>
        <button onClick={() => { close(); openEnquiry("Decoration enquiry"); }} className="btn btn-primary mt-3 w-full">
          Plan Your Event
        </button>
        <a href={`tel:${business.phone}`} className="mt-6 flex items-center gap-3 text-sm text-forest">
          <Phone className="h-4 w-4 text-gold-deep" /> {business.phoneDisplay}
        </a>
      </div>
    </Drawer>
  );
}

/* ------------------------------------------------------------------ */
/* Search overlay                                                      */
/* ------------------------------------------------------------------ */
const searchIndex: { label: string; group: string; image?: string; link?: MenuLink; product?: Product }[] = [
  ...allProducts.map((p) => ({ label: p.name, group: "Products", image: p.image, product: p })),
  ...megaMenus.flatMap((m) => m.columns.flatMap((c) => c.links.map((l) => ({ label: l.label, group: m.label, image: l.image, link: l })))),
];

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, setQuickView, openEnquiry } = useStore();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const close = () => setSearchOpen(false);
  useEsc(searchOpen, close);

  useEffect(() => {
    if (searchOpen) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [searchOpen]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [setSearchOpen]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    const seen = new Set<string>();
    return searchIndex
      .filter((r) => r.label.toLowerCase().includes(s) || r.group.toLowerCase().includes(s))
      .filter((r) => (seen.has(r.label) ? false : (seen.add(r.label), true)))
      .slice(0, 12);
  }, [q]);

  const popular = ["Jasmine", "Varmala", "Rose", "Mandap", "Birthday", "Stage", "Lotus", "Corporate"];

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[95] overflow-y-auto bg-ivory/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div className="container-lux py-6 sm:py-10">
            <div className="flex justify-end">
              <button onClick={close} className="grid h-11 w-11 place-items-center rounded-full text-forest transition hover:rotate-90 hover:bg-forest/5" aria-label="Close search">
                <X className="h-6 w-6" />
              </button>
            </div>
            <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease, delay: 0.05 }} className="mx-auto mt-4 max-w-3xl">
              <p className="eyebrow mb-4 text-gold-deep">Search T.G ANBU</p>
              <label className="flex items-center gap-4 border-b-2 border-forest/20 pb-3 focus-within:border-gold">
                <Search className="h-7 w-7 text-forest/50" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Roses, jasmine garland, mandap…"
                  className="w-full bg-transparent font-serif text-3xl text-forest outline-none placeholder:text-forest/30 sm:text-5xl"
                  aria-label="Search"
                />
              </label>

              {!q && (
                <div className="mt-8">
                  <p className="mb-3 text-xs font-semibold tracking-widest text-charcoal/50 uppercase">Popular searches</p>
                  <div className="flex flex-wrap gap-2">
                    {popular.map((p) => (
                      <button key={p} onClick={() => setQ(p)} className="rounded-full border border-forest/15 px-4 py-2 text-sm text-forest transition hover:border-gold hover:bg-gold/10">
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {q && (
                <div className="mt-8">
                  {results.length === 0 ? (
                    <div className="rounded-3xl border border-forest/10 bg-white/50 p-8 text-center">
                      <p className="font-serif text-2xl text-forest">Nothing found for “{q}”</p>
                      <p className="mt-2 text-sm text-charcoal/60">Tell us what you need — we create custom florals every day.</p>
                      <button onClick={() => { close(); openEnquiry(`Custom request: ${q}`); }} className="btn btn-primary mt-5">
                        Request “{q}”
                      </button>
                    </div>
                  ) : (
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {results.map((r) => (
                        <li key={r.group + r.label}>
                          <button
                            onClick={() => {
                              close();
                              if (r.product) setQuickView(r.product);
                              else if (r.link) runLink(r.link, openEnquiry);
                            }}
                            className="group flex w-full items-center gap-4 rounded-2xl p-2.5 text-left transition hover:bg-white"
                          >
                            {r.image && (
                              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                                <Image src={r.image} alt="" fill sizes="56px" className="object-cover" />
                              </span>
                            )}
                            <span className="min-w-0 flex-1">
                              <span className="block truncate font-serif text-lg text-forest">{r.label}</span>
                              <span className="block text-xs text-charcoal/50">
                                {r.product ? `${r.product.type} · ${inr(r.product.price)}` : r.link?.enquiry ? `${r.group} · Enquire` : r.group}
                              </span>
                            </span>
                            <ArrowRight className="h-4 w-4 text-gold-deep opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Cart drawer                                                         */
/* ------------------------------------------------------------------ */
const FREE_DELIVERY = 1500;

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, cartTotal, cartCount } = useStore();
  const close = () => setCartOpen(false);
  const remaining = Math.max(0, FREE_DELIVERY - cartTotal);
  const orderText = () =>
    `Hello T.G ANBU, I'd like to order:\n${cart.map((l) => `• ${l.product.name} × ${l.qty} — ${inr(l.product.price * l.qty)}`).join("\n")}\nTotal: ${inr(cartTotal)}`;

  return (
    <Drawer open={cartOpen} onClose={close} label="Shopping cart">
      <DrawerHead title="Your Basket" sub={`${cartCount} item${cartCount === 1 ? "" : "s"}`} onClose={close} />
      {cart.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-blush/40 text-forest">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <p className="mt-5 font-serif text-2xl text-forest">Your basket is empty</p>
          <p className="mt-2 text-sm text-charcoal/60">Fresh flowers and garlands are waiting for you.</p>
          <button onClick={() => { close(); setTimeout(() => goTo("#shop"), 80); }} className="btn btn-primary mt-6">
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="border-b border-forest/10 px-6 py-4">
            <p className="flex items-center gap-2 text-xs text-charcoal/70">
              <Truck className="h-4 w-4 text-gold-deep" />
              {remaining > 0 ? (
                <>Add <b className="text-forest">{inr(remaining)}</b> more for free local delivery</>
              ) : (
                <b className="text-forest">You’ve unlocked free local delivery</b>
              )}
            </p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-forest/10">
              <motion.div className="h-full bg-gold" animate={{ width: `${Math.min(100, (cartTotal / FREE_DELIVERY) * 100)}%` }} transition={{ duration: 0.6, ease }} />
            </div>
          </div>
          <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
            <AnimatePresence initial={false}>
              {cart.map((l) => (
                <motion.li key={l.product.id} layout initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30, height: 0 }} className="flex gap-4">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl">
                    <Image src={l.product.image} alt={l.product.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-serif text-lg leading-tight text-forest">{l.product.name}</p>
                        <p className="text-xs text-charcoal/55">{l.product.type}</p>
                      </div>
                      <button onClick={() => removeFromCart(l.product.id)} className="grid h-8 w-8 place-items-center rounded-full text-charcoal/40 transition hover:bg-blush/40 hover:text-forest" aria-label={`Remove ${l.product.name}`}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <QtyStepper qty={l.qty} onChange={(n) => updateQty(l.product.id, n)} />
                      <p className="text-sm font-semibold text-forest">{inr(l.product.price * l.qty)}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <div className="border-t border-forest/10 bg-cream/60 px-6 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-charcoal/60">Subtotal</span>
              <span className="font-serif text-2xl text-forest">{inr(cartTotal)}</span>
            </div>
            <p className="mt-1 text-xs text-charcoal/50">Taxes and delivery calculated when we confirm your order.</p>
            <a href={waLink(orderText())} target="_blank" rel="noreferrer" className="btn btn-primary mt-4 w-full">
              <WhatsAppIcon className="h-4 w-4" /> Order on WhatsApp
            </a>
            <a href={`tel:${business.phone}`} className="btn btn-ghost-dark mt-2 w-full">
              <Phone className="h-4 w-4" /> Call to Order
            </a>
          </div>
        </>
      )}
    </Drawer>
  );
}

function QtyStepper({ qty, onChange }: { qty: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-forest/15">
      <button onClick={() => onChange(qty - 1)} className="grid h-9 w-9 place-items-center text-forest" aria-label="Decrease quantity">
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-6 text-center text-sm font-semibold text-forest" aria-live="polite">{qty}</span>
      <button onClick={() => onChange(qty + 1)} className="grid h-9 w-9 place-items-center text-forest" aria-label="Increase quantity">
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Wishlist drawer                                                     */
/* ------------------------------------------------------------------ */
export function WishlistDrawer() {
  const { wishlist, wishlistOpen, setWishlistOpen, toggleWishlist, addToCart } = useStore();
  const items = wishlist.map((id) => allProducts.find((p) => p.id === id)).filter(Boolean) as Product[];
  const close = () => setWishlistOpen(false);
  return (
    <Drawer open={wishlistOpen} onClose={close} label="Wishlist">
      <DrawerHead title="Wishlist" sub={`${items.length} saved`} onClose={close} />
      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-blush/40 text-forest">
            <Heart className="h-8 w-8" />
          </div>
          <p className="mt-5 font-serif text-2xl text-forest">Nothing saved yet</p>
          <p className="mt-2 text-sm text-charcoal/60">Tap the heart on any product to keep it here.</p>
        </div>
      ) : (
        <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
          {items.map((p) => (
            <li key={p.id} className="flex gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                <Image src={p.image} alt={p.name} fill sizes="80px" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col">
                <p className="font-serif text-lg leading-tight text-forest">{p.name}</p>
                <p className="text-sm font-semibold text-forest">{inr(p.price)}</p>
                <div className="mt-auto flex gap-2">
                  <button onClick={() => addToCart(p)} className="btn btn-primary min-h-9 px-4 text-xs">Add to cart</button>
                  <button onClick={() => toggleWishlist(p)} className="btn btn-ghost-dark min-h-9 px-4 text-xs">Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}

/* ------------------------------------------------------------------ */
/* Account modal (demo)                                                */
/* ------------------------------------------------------------------ */
export function AccountModal() {
  const { accountOpen, setAccountOpen, notify } = useStore();
  const [phone, setPhone] = useState("");
  const close = () => setAccountOpen(false);
  return (
    <Modal open={accountOpen} onClose={close} label="Account" className="max-w-md">
      <div className="p-8 pt-10">
        <p className="eyebrow text-gold-deep">Welcome</p>
        <p className="mt-2 font-serif text-3xl text-forest">Sign in to T.G ANBU</p>
        <p className="mt-2 text-sm text-charcoal/60">Track orders, save addresses and get early access to festive collections.</p>
        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            notify({ title: "Demo sign-in", body: `An OTP would be sent to +91 ${phone}` });
            close();
          }}
        >
          <label className="text-xs font-semibold tracking-wider text-charcoal/60 uppercase" htmlFor="acc-phone">Mobile number</label>
          <div className="mt-2 flex items-center rounded-2xl border border-forest/15 bg-white px-4 focus-within:border-gold">
            <span className="text-sm text-charcoal/50">+91</span>
            <input id="acc-phone" required inputMode="numeric" pattern="[0-9]{10}" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} className="w-full bg-transparent px-3 py-3.5 outline-none" placeholder="10-digit number" />
          </div>
          <button className="btn btn-primary mt-4 w-full">Send OTP</button>
        </form>
        <p className="mt-4 text-center text-xs text-charcoal/45">Demo only — no data is sent.</p>
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Quick view                                                          */
/* ------------------------------------------------------------------ */
export function QuickView() {
  const { quickView: p, setQuickView, addToCart, toggleWishlist, isWished } = useStore();
  const [qty, setQty] = useState(1);
  const [opt, setOpt] = useState(0);
  useEffect(() => {
    setQty(1);
    setOpt(0);
  }, [p?.id]);
  const close = () => setQuickView(null);

  return (
    <Modal open={!!p} onClose={close} label={p ? `Quick view: ${p.name}` : "Quick view"} className="max-w-4xl">
      {p && (
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[520px]">
            <Image src={p.image} alt={p.name} fill sizes="(min-width:768px) 450px, 100vw" className="object-cover md:rounded-l-[2rem]" />
            {p.badge && <span className="absolute top-4 left-4 rounded-full bg-ivory/90 px-3 py-1 text-[0.65rem] font-bold tracking-widest text-forest uppercase backdrop-blur">{p.badge}</span>}
          </div>
          <div className="flex flex-col p-6 sm:p-9">
            <p className="eyebrow text-gold-deep">{p.type}</p>
            <h3 className="mt-2 font-serif text-4xl leading-[1.05] text-forest">{p.name}</h3>
            <div className="mt-3 flex items-center gap-2 text-xs text-charcoal/60">
              <Stars value={p.rating} /> {p.rating.toFixed(1)} · {p.reviews} reviews
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-serif text-3xl text-forest">{inr(p.price)}</span>
              {p.mrp && <span className="text-sm text-charcoal/40 line-through">{inr(p.mrp)}</span>}
              {p.mrp && <span className="rounded-full bg-blush/50 px-2 py-0.5 text-xs font-semibold text-forest">Save {inr(p.mrp - p.price)}</span>}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/70">{p.description}</p>
            {p.options && (
              <div className="mt-5">
                <p className="mb-2 text-xs font-semibold tracking-wider text-charcoal/60 uppercase">Size</p>
                <div className="flex flex-wrap gap-2">
                  {p.options.map((o, i) => (
                    <button key={o} onClick={() => setOpt(i)} className={`rounded-full border px-4 py-2 text-sm transition ${opt === i ? "border-forest bg-forest text-ivory" : "border-forest/15 text-forest hover:border-forest/40"}`}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <ul className="mt-5 space-y-1.5">
              {p.details.map((d) => (
                <li key={d} className="flex items-center gap-2 text-sm text-charcoal/70">
                  <Check className="h-4 w-4 text-emerald" /> {d}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
              <QtyStepper qty={qty} onChange={(n) => setQty(Math.max(1, n))} />
              <button onClick={() => { addToCart(p, qty); close(); }} className="btn btn-primary flex-1">
                <ShoppingBag className="h-4 w-4" /> Add to Cart · {inr(p.price * qty)}
              </button>
              <button onClick={() => toggleWishlist(p)} className={`grid h-12 w-12 place-items-center rounded-full border transition ${isWished(p.id) ? "border-blush bg-blush/50 text-forest" : "border-forest/15 text-forest hover:border-forest/40"}`} aria-label="Toggle wishlist">
                <Heart className={`h-5 w-5 ${isWished(p.id) ? "fill-current" : ""}`} />
              </button>
            </div>
            <a href={waLink(`Hello T.G ANBU, I'm interested in ${p.name}${p.options ? ` (${p.options[opt]})` : ""}.`)} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-emerald">
              <WhatsAppIcon className="h-4 w-4" /> Ask about this on WhatsApp
            </a>
          </div>
        </div>
      )}
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Enquiry modal → WhatsApp                                            */
/* ------------------------------------------------------------------ */
export function EnquiryModal() {
  const { enquiry, closeEnquiry, notify } = useStore();
  const [form, setForm] = useState({ name: "", phone: "", date: "", service: "", venue: "", budget: "", message: "" });
  useEffect(() => {
    if (enquiry.open) setForm((f) => ({ ...f, service: enquiry.topic ?? f.service ?? "" }));
  }, [enquiry.open, enquiry.topic]);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello T.G ANBU! I'd like to enquire about decoration.\n\nName: ${form.name}\nPhone: ${form.phone}\nService: ${form.service}\nEvent date: ${form.date || "—"}\nVenue: ${form.venue || "—"}\nBudget: ${form.budget || "—"}\n\n${form.message}`;
    window.open(waLink(text), "_blank", "noopener");
    notify({ title: "Enquiry ready on WhatsApp", body: "Send the message to reach our floral team." });
    closeEnquiry();
  };

  const input = "w-full rounded-2xl border border-forest/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-gold";
  const serviceOptions = Array.from(new Set([form.service, ...customServices, "Wedding Decoration", "Reception Stage", "Event Decoration", "Flower Garlands"].filter(Boolean)));

  return (
    <Modal open={enquiry.open} onClose={closeEnquiry} label="Decoration enquiry" className="max-w-2xl">
      <div className="relative overflow-hidden bg-forest px-7 pt-10 pb-8 text-ivory sm:px-10">
        <Sparkles className="absolute top-6 right-16 h-6 w-6 text-gold/60" />
        <p className="eyebrow text-gold">Plan your celebration</p>
        <p className="mt-2 font-serif text-4xl leading-tight">{enquiry.topic ? enquiry.topic : "Tell us about your event"}</p>
        <p className="mt-2 max-w-md text-sm text-ivory/70">Share a few details — we’ll reply on WhatsApp with design ideas and a quote, usually within a few hours.</p>
      </div>
      <form onSubmit={submit} className="grid gap-4 p-7 sm:grid-cols-2 sm:p-10">
        <input required placeholder="Your name" className={input} value={form.name} onChange={set("name")} aria-label="Your name" />
        <input required placeholder="Phone / WhatsApp" inputMode="tel" className={input} value={form.phone} onChange={set("phone")} aria-label="Phone" />
        <select className={input} value={form.service} onChange={set("service")} aria-label="Service">
          <option value="">Select a service</option>
          {serviceOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <input type="date" className={input} value={form.date} onChange={set("date")} aria-label="Event date" />
        <input placeholder="Venue / City" className={input} value={form.venue} onChange={set("venue")} aria-label="Venue" />
        <select className={input} value={form.budget} onChange={set("budget")} aria-label="Budget">
          <option value="">Approx. budget</option>
          <option>Under ₹10,000</option>
          <option>₹10,000 – ₹25,000</option>
          <option>₹25,000 – ₹75,000</option>
          <option>₹75,000 – ₹2,00,000</option>
          <option>₹2,00,000+</option>
        </select>
        <textarea placeholder="Colours, theme, flowers you love…" rows={3} className={`${input} sm:col-span-2`} value={form.message} onChange={set("message")} aria-label="Message" />
        <button className="btn btn-primary sm:col-span-2">
          <WhatsAppIcon className="h-4 w-4" /> Send Enquiry on WhatsApp
        </button>
        <a href={`tel:${business.phone}`} className="text-center text-xs text-charcoal/60 sm:col-span-2">
          Prefer to talk? Call <b className="text-forest">{business.phoneDisplay}</b>
        </a>
      </form>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Lightbox                                                            */
/* ------------------------------------------------------------------ */
export function Lightbox() {
  const { lightbox, setLightbox } = useStore();
  const close = () => setLightbox(null);
  const step = (d: number) => lightbox && setLightbox({ ...lightbox, index: (lightbox.index + d + lightbox.items.length) % lightbox.items.length });
  useEsc(!!lightbox, close);
  useEffect(() => {
    if (!lightbox) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });
  const item = lightbox?.items[lightbox.index];

  return (
    <AnimatePresence>
      {lightbox && item && (
        <motion.div className="fixed inset-0 z-[96] flex flex-col bg-charcoal/95 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Image viewer">
          <div className="flex items-center justify-between p-4 text-ivory sm:p-6">
            <span className="text-xs tracking-widest text-ivory/60">
              {String(lightbox.index + 1).padStart(2, "0")} / {String(lightbox.items.length).padStart(2, "0")}
            </span>
            <button onClick={close} className="grid h-11 w-11 place-items-center rounded-full bg-ivory/10 transition hover:rotate-90 hover:bg-ivory/20" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="relative flex-1" onClick={close}>
            <AnimatePresence mode="wait">
              <motion.div
                key={item.src}
                className="absolute inset-4 sm:inset-x-24"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, i) => (i.offset.x < -60 ? step(1) : i.offset.x > 60 ? step(-1) : null)}
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={item.src} alt={item.title} fill sizes="100vw" className="object-contain" priority />
              </motion.div>
            </AnimatePresence>
            <button onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute top-1/2 left-3 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-ivory/10 text-ivory transition hover:bg-ivory/25 sm:grid" aria-label="Previous image">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute top-1/2 right-3 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-ivory/10 text-ivory transition hover:bg-ivory/25 sm:grid" aria-label="Next image">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          <div className="p-6 text-center text-ivory">
            <p className="font-serif text-2xl">{item.title}</p>
            {item.caption && <p className="mt-1 text-sm text-ivory/60">{item.caption}</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Toasts                                                              */
/* ------------------------------------------------------------------ */
export function Toasts() {
  const { toasts, setCartOpen } = useStore();
  return (
    <div className="pointer-events-none fixed top-24 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.4, ease }}
            className="glass pointer-events-auto flex items-center gap-3 rounded-2xl border border-forest/10 p-3 shadow-xl"
          >
            {t.image ? (
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                <Image src={t.image} alt="" fill sizes="48px" className="object-cover" />
              </span>
            ) : (
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-forest text-gold">
                <Check className="h-5 w-5" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-forest">{t.title}</p>
              {t.body && <p className="truncate text-xs text-charcoal/60">{t.body}</p>}
            </div>
            {t.title.includes("basket") && (
              <button onClick={() => setCartOpen(true)} className="rounded-full bg-forest px-3 py-1.5 text-xs font-semibold text-ivory">
                View
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* WhatsApp FAB & mobile bottom bar                                    */
/* ------------------------------------------------------------------ */
export function FloatingActions() {
  const { setCartOpen, cartCount, openEnquiry } = useStore();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 500);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <a
        href={waLink("Hello T.G ANBU! I'd like to know more about your flowers and decoration.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="group fixed right-4 bottom-24 z-[70] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.65)] transition hover:scale-105 sm:right-6 sm:bottom-6"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25" />
        <WhatsAppIcon className="relative h-7 w-7" />
        <span className="pointer-events-none absolute right-full mr-3 hidden rounded-full bg-charcoal px-3 py-1.5 text-xs whitespace-nowrap text-ivory opacity-0 transition group-hover:opacity-100 sm:block">
          Chat with us
        </span>
      </a>

      <AnimatePresence>
        {show && (
          <motion.nav
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.5, ease }}
            className="glass fixed inset-x-0 bottom-0 z-[60] border-t border-forest/10 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:hidden"
            aria-label="Quick actions"
          >
            <div className="grid grid-cols-4 gap-1 text-[0.65rem] font-semibold text-forest">
              <a href="#shop" className="flex flex-col items-center gap-1 rounded-xl py-1.5 active:bg-forest/5">
                <Sparkles className="h-5 w-5" /> Shop
              </a>
              <a href={`tel:${business.phone}`} className="flex flex-col items-center gap-1 rounded-xl py-1.5 active:bg-forest/5">
                <Phone className="h-5 w-5" /> Call
              </a>
              <button onClick={() => setCartOpen(true)} className="relative flex flex-col items-center gap-1 rounded-xl py-1.5 active:bg-forest/5">
                <ShoppingBag className="h-5 w-5" /> Basket
                {cartCount > 0 && <span className="absolute top-0 right-[28%] grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.55rem] text-forest">{cartCount}</span>}
              </button>
              <button onClick={() => openEnquiry("Decoration enquiry")} className="flex flex-col items-center justify-center rounded-xl bg-forest py-1.5 text-ivory">
                Book Décor
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
