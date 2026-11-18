import Header, { AnnouncementBar } from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import WeddingShowcase from "@/components/WeddingShowcase";
import EventShowcase from "@/components/EventShowcase";
import GarlandCollection from "@/components/GarlandCollection";
import CustomDecoration from "@/components/CustomDecoration";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import WhyChoose from "@/components/WhyChoose";
import PromoBanner from "@/components/PromoBanner";
import Social from "@/components/Social";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import {
  AccountModal,
  CartDrawer,
  EnquiryModal,
  FloatingActions,
  Lightbox,
  MobileNav,
  QuickView,
  SearchOverlay,
  Toasts,
  WishlistDrawer,
} from "@/components/Overlays";
import { StoreProvider } from "@/lib/store";

export default function Home() {
  return (
    <StoreProvider>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <WeddingShowcase />
        <EventShowcase />
        <GarlandCollection />
        <CustomDecoration />
        <Gallery />
        <Testimonials />
        <WhyChoose />
        <PromoBanner />
        <Social />
        <FAQ />
      </main>
      <Footer />

      {/* Overlays & floating UI */}
      <MobileNav />
      <SearchOverlay />
      <CartDrawer />
      <WishlistDrawer />
      <AccountModal />
      <QuickView />
      <EnquiryModal />
      <Lightbox />
      <Toasts />
      <FloatingActions />
    </StoreProvider>
  );
}
