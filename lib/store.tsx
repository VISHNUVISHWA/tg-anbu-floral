"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "./data";

export type CartLine = { product: Product; qty: number };
export type Toast = { id: number; title: string; body?: string; image?: string };
export type LightboxState = { items: { src: string; title: string; caption?: string }[]; index: number } | null;

type Store = {
  cart: CartLine[];
  cartCount: number;
  cartTotal: number;
  addToCart: (p: Product, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  wishlist: string[];
  toggleWishlist: (p: Product) => void;
  isWished: (id: string) => boolean;

  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  accountOpen: boolean;
  setAccountOpen: (v: boolean) => void;
  quickView: Product | null;
  setQuickView: (p: Product | null) => void;
  enquiry: { open: boolean; topic?: string };
  openEnquiry: (topic?: string) => void;
  closeEnquiry: () => void;
  lightbox: LightboxState;
  setLightbox: (l: LightboxState) => void;

  toasts: Toast[];
  notify: (t: Omit<Toast, "id">) => void;
  cartPulse: number;
};

const Ctx = createContext<Store | null>(null);

const CART_KEY = "tg-anbu-cart";
const WISH_KEY = "tg-anbu-wishlist";

function safeRead<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function safeWrite(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — demo keeps working in memory */
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [enquiry, setEnquiry] = useState<{ open: boolean; topic?: string }>({ open: false });
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cartPulse, setCartPulse] = useState(0);

  useEffect(() => {
    setCart(safeRead<CartLine[]>(CART_KEY, []));
    setWishlist(safeRead<string[]>(WISH_KEY, []));
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (hydrated) safeWrite(CART_KEY, cart);
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) safeWrite(WISH_KEY, wishlist);
  }, [wishlist, hydrated]);

  // Lock page scroll while any overlay is open
  const overlayOpen =
    cartOpen || wishlistOpen || searchOpen || mobileOpen || accountOpen || !!quickView || enquiry.open || !!lightbox;
  useEffect(() => {
    document.documentElement.style.overflow = overlayOpen ? "hidden" : "";
  }, [overlayOpen]);

  const notify = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-2), { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 3200);
  }, []);

  const addToCart = useCallback(
    (p: Product, qty = 1) => {
      setCart((prev) => {
        const found = prev.find((l) => l.product.id === p.id);
        if (found) return prev.map((l) => (l.product.id === p.id ? { ...l, qty: l.qty + qty } : l));
        return [...prev, { product: p, qty }];
      });
      setCartPulse((n) => n + 1);
      notify({ title: "Added to your basket", body: p.name, image: p.image });
    },
    [notify]
  );

  const updateQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((l) => l.product.id !== id) : prev.map((l) => (l.product.id === id ? { ...l, qty } : l))
    );
  }, []);
  const removeFromCart = useCallback((id: string) => setCart((prev) => prev.filter((l) => l.product.id !== id)), []);

  const toggleWishlist = useCallback(
    (p: Product) => {
      const has = wishlist.includes(p.id);
      setWishlist((prev) => (prev.includes(p.id) ? prev.filter((x) => x !== p.id) : [...prev, p.id]));
      notify({ title: has ? "Removed from wishlist" : "Saved to wishlist", body: p.name, image: p.image });
    },
    [notify, wishlist]
  );
  const isWished = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const value = useMemo<Store>(
    () => ({
      cart,
      cartCount: cart.reduce((s, l) => s + l.qty, 0),
      cartTotal: cart.reduce((s, l) => s + l.qty * l.product.price, 0),
      addToCart,
      updateQty,
      removeFromCart,
      wishlist,
      toggleWishlist,
      isWished,
      cartOpen,
      setCartOpen,
      wishlistOpen,
      setWishlistOpen,
      searchOpen,
      setSearchOpen,
      mobileOpen,
      setMobileOpen,
      accountOpen,
      setAccountOpen,
      quickView,
      setQuickView,
      enquiry,
      openEnquiry: (topic?: string) => setEnquiry({ open: true, topic }),
      closeEnquiry: () => setEnquiry({ open: false }),
      lightbox,
      setLightbox,
      toasts,
      notify,
      cartPulse,
    }),
    [cart, wishlist, cartOpen, wishlistOpen, searchOpen, mobileOpen, accountOpen, quickView, enquiry, lightbox, toasts, cartPulse, addToCart, updateQty, removeFromCart, toggleWishlist, isWished, notify]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
