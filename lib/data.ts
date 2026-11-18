/**
 * T.G ANBU — site content & demo data.
 * Everything a shop owner would want to edit (prices, products, contact details,
 * menu items, testimonials, FAQs) lives in this single file.
 */

import { asset } from "./site";

const lib = (n: string) => asset(`/images/lib/${n}.jpg`);
const own = (n: string) => asset(`/images/${n}.jpg`);

/* ------------------------------------------------------------------ */
/* Business details — replace placeholders before going live           */
/* ------------------------------------------------------------------ */
export const business = {
  name: "T.G ANBU",
  tagline: "Floral & Event Design",
  phoneDisplay: "+91 99761 32618",
  phone: "+919976132618",
  whatsapp: "919976132618",
  email: "hello@tganbu.in", // placeholder
  address: "Main Road, Cheyyar, Tiruvannamalai District, Tamil Nadu", // placeholder street
  hours: "Open daily · 6:00 AM – 9:00 PM",
  instagram: "https://instagram.com/tganbu", // placeholder handle
  facebook: "https://facebook.com/tganbu", // placeholder
  youtube: "https://youtube.com/@tganbu", // placeholder
};

export const waLink = (text: string) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;

/* ------------------------------------------------------------------ */
/* Images                                                              */
/* ------------------------------------------------------------------ */
export const img = {
  // T.G ANBU's own work & brand
  heroStage: own("stage-arch-wide"),
  garlandStrands: own("garland-strands"),
  namingGreen: own("naming-ceremony-green"),
  storefront: own("inauguration-storefront"),
  emblem: own("tg-anbu-emblem"),
  archDetail: own("crop-arch-detail"),
  sideBouquet: own("crop-side-bouquet"),
  floorArrangement: own("crop-floor-arrangement"),
  mandapCanopy: own("crop-mandap-canopy"),
  strandTexture: own("crop-garland-strands-texture"),
  mandapPillar: own("crop-mandap-pillar"),

  // Supporting library photography (see public/images/credits.json)
  darkBouquet: lib("dark-bouquet"),
  weddingAisle: lib("wedding-aisle"),
  mixedBouquet: lib("mixed-bouquet"),
  redRoses: lib("red-roses"),
  singleRose: lib("single-red-rose"),
  receptionCouple: lib("floral-reception-couple"),
  receptionTable: lib("reception-table"),
  gardenChairs: lib("garden-chairs"),
  balloons: lib("balloons"),
  vaseArrangement: lib("vase-arrangement"),
  dahlias: lib("dahlias"),
  tulipsVase: lib("tulips-vase"),
  pinkWhiteBunch: lib("pink-white-bunch"),
  bouquetHand: lib("bouquet-in-hand"),
  mandapHall: lib("indian-mandap-hall"),
  pinkRosesVase: lib("pink-roses-vase"),
  weddingHands: lib("indian-wedding-hands"),
  bride: lib("indian-bride"),
  eventHall: lib("event-hall"),
  banquetTable: lib("banquet-table"),
  engagementHands: lib("engagement-hands"),
  heartFlowers: lib("heart-of-flowers"),
  daisies: lib("daisies"),
  marigoldGarland: lib("marigold-garland"),
  marigoldClose: lib("marigold-garland-close"),
  marigoldHanging: lib("marigold-garlands-hanging"),
  flowerMarket: lib("flower-market-stall"),
  jasmineGarlandTN: lib("jasmine-garland-tn"),
  nightJasmine: lib("night-jasmine-garland"),
  jasmineWhite: lib("jasmine-garlands-white"),
  malligai: lib("malligai-poo"),
  lotus: lib("lotus"),
  lotusPink: lib("lotus-pink-tn"),
  orchid: lib("orchid-pink"),
  chrysMix: lib("chrysanthemum-mix"),
  chrysYellow: lib("chrysanthemum-yellow"),
  carnations: lib("carnations-red"),
  roseCarnation: lib("rose-carnation-bouquet"),
  waterLily: lib("water-lily-white"),
  garlandMaker: lib("garland-maker"),
  handsStringing: lib("hands-stringing-garland"),
  southIndianWedding: lib("south-indian-wedding"),
};

/* ------------------------------------------------------------------ */
/* Products — prices are demo placeholders in ₹ INR                    */
/* ------------------------------------------------------------------ */
export type ProductTag = "Bouquets" | "Bundles" | "Garlands" | "Arrangements" | "Accessories";

export type Product = {
  id: string;
  name: string;
  type: string;
  tag: ProductTag;
  price: number;
  mrp?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  description: string;
  details: string[];
  options?: string[];
};

export const products: Product[] = [
  {
    id: "red-rose-bouquet",
    name: "Premium Red Rose Bouquet",
    type: "Bouquet · 20 stems",
    tag: "Bouquets",
    price: 1299,
    mrp: 1499,
    rating: 4.9,
    reviews: 214,
    image: img.singleRose,
    badge: "Best Seller",
    description: "Twenty long-stem red roses, hand-tied with seasonal greens and wrapped in ivory paper with a champagne ribbon.",
    details: ["20 premium long-stem roses", "Hand-tied with fresh foliage", "Same-day delivery in Cheyyar"],
    options: ["20 stems", "30 stems", "50 stems"],
  },
  {
    id: "fresh-jasmine-garland",
    name: "Fresh Jasmine Garland",
    type: "Garland · Malligai",
    tag: "Garlands",
    price: 349,
    rating: 4.8,
    reviews: 362,
    image: img.jasmineWhite,
    badge: "Fresh Today",
    description: "Tightly strung Madurai malli with a delicate fragrance — perfect for pooja, hair adornment and welcomes.",
    details: ["Strung fresh every morning", "Available in 1 ft – 4 ft", "Customisable accent colours"],
    options: ["1 ft", "2 ft", "4 ft"],
  },
  {
    id: "traditional-wedding-garland",
    name: "Traditional Wedding Garland",
    type: "Garland · Pair",
    tag: "Garlands",
    price: 2499,
    mrp: 2899,
    rating: 4.9,
    reviews: 128,
    image: img.marigoldHanging,
    description: "A classic marigold and jasmine kalyana maalai pair, layered thick for a regal South Indian ceremony.",
    details: ["Set of 2 (bride & groom)", "Marigold, jasmine & rose", "Made to order — 24 hrs notice"],
    options: ["Standard", "Heavy", "Extra heavy"],
  },
  {
    id: "pink-white-bunch",
    name: "Pink & White Floral Bunch",
    type: "Bunch · Mixed",
    tag: "Bouquets",
    price: 899,
    rating: 4.7,
    reviews: 96,
    image: img.pinkWhiteBunch,
    description: "Soft blush roses, white spray roses and baby's breath in a romantic, airy bunch.",
    details: ["Approx. 18 stems", "Blush & ivory palette", "Includes care card"],
  },
  {
    id: "mixed-flower-garland",
    name: "Premium Mixed Flower Garland",
    type: "Garland · Mixed",
    tag: "Garlands",
    price: 1199,
    rating: 4.8,
    reviews: 77,
    image: img.nightJasmine,
    description: "Fragrant jasmine woven with saffron accents for receptions, felicitations and temple offerings.",
    details: ["5 ft length", "Jasmine with saffron accents", "Ribbon-finished ends"],
  },
  {
    id: "royal-varmala",
    name: "Royal Wedding Varmala",
    type: "Garland · Bridal pair",
    tag: "Garlands",
    price: 4999,
    mrp: 5499,
    rating: 5.0,
    reviews: 58,
    image: img.marigoldGarland,
    badge: "Signature",
    description: "Our signature varmala — dense marigold layers, rose buds and jasmine drops crafted for the jaimala moment.",
    details: ["Set of 2", "Rose, marigold & jasmine", "Colour-matched to your outfit"],
    options: ["Classic", "Rose-rich", "Custom palette"],
  },
  {
    id: "rose-bundle",
    name: "Red Rose Bundle",
    type: "Bundle · 50 stems",
    tag: "Bundles",
    price: 1799,
    rating: 4.8,
    reviews: 143,
    image: img.redRoses,
    description: "Fifty fresh red roses, loosely bundled — for decorators, events or a grand gesture.",
    details: ["50 stems", "Farm-fresh, graded heads", "Bulk pricing on request"],
    options: ["50 stems", "100 stems"],
  },
  {
    id: "jasmine-bundle",
    name: "Jasmine Bundle (Malligai Poo)",
    type: "Bundle · 250 g",
    tag: "Bundles",
    price: 199,
    rating: 4.9,
    reviews: 488,
    image: img.malligai,
    description: "Loose jasmine buds picked at dawn, ideal for stringing, rangoli and pooja.",
    details: ["250 g loose buds", "Picked the same morning", "Bulk 1 kg available"],
    options: ["250 g", "500 g", "1 kg"],
  },
  {
    id: "mixed-bouquet",
    name: "Garden Mixed Bouquet",
    type: "Bouquet · Seasonal",
    tag: "Bouquets",
    price: 1099,
    rating: 4.7,
    reviews: 81,
    image: img.mixedBouquet,
    description: "A loose, garden-style bouquet of the week's best roses, lisianthus and textured greens.",
    details: ["Florist's choice of blooms", "Approx. 25 stems", "Changes with the season"],
  },
  {
    id: "artificial-arrangement",
    name: "Artificial Floral Arrangement",
    type: "Arrangement · Everlasting",
    tag: "Arrangements",
    price: 1499,
    rating: 4.6,
    reviews: 42,
    image: img.vaseArrangement,
    description: "Realistic silk blooms in a glass vase — a lasting centrepiece for homes, offices and reception desks.",
    details: ["Premium silk florals", "Glass vase included", "Reusable & dust-wipeable"],
  },
  {
    id: "lotus-pooja-pack",
    name: "Lotus Pooja Pack",
    type: "Accessory · 5 lotus",
    tag: "Accessories",
    price: 299,
    rating: 4.8,
    reviews: 65,
    image: img.lotus,
    description: "Five fresh lotus blooms with a small jasmine string — ready for temple and festival offerings.",
    details: ["5 fresh lotus", "Jasmine string included", "Festival pre-orders open"],
  },
  {
    id: "orchid-stems",
    name: "Cymbidium Orchid Stems",
    type: "Bundle · 3 stems",
    tag: "Bundles",
    price: 1399,
    rating: 4.7,
    reviews: 33,
    image: img.orchid,
    description: "Long-lasting cymbidium orchids for luxe stage accents, centrepieces and gifting.",
    details: ["3 stems", "Lasts up to 2 weeks", "Colours vary by availability"],
  },
];

export const productTags: ("All" | ProductTag)[] = ["All", "Bouquets", "Bundles", "Garlands", "Arrangements", "Accessories"];

/* ------------------------------------------------------------------ */
/* Garland collection (section 9)                                     */
/* ------------------------------------------------------------------ */
export const garlands: Product[] = [
  {
    id: "g-traditional",
    name: "Traditional Wedding Garland",
    type: "Marigold · Kalyana maalai",
    tag: "Garlands",
    price: 1899,
    rating: 4.9,
    reviews: 112,
    image: img.marigoldClose,
    description: "Dense, hand-packed marigold layers in the traditional Tamil wedding style.",
    details: ["Pair", "Marigold & jasmine", "24 hrs notice"],
  },
  {
    id: "g-rose",
    name: "Rose Garland",
    type: "Red rose · Jasmine edging",
    tag: "Garlands",
    price: 999,
    rating: 4.8,
    reviews: 90,
    image: img.garlandStrands,
    description: "Velvety rose heads strung close and edged with jasmine.",
    details: ["4 ft", "Fresh red roses", "Jasmine border"],
  },
  {
    id: "g-jasmine",
    name: "Jasmine Garland",
    type: "Madurai malli · Thick",
    tag: "Garlands",
    price: 649,
    rating: 4.9,
    reviews: 201,
    image: img.jasmineGarlandTN,
    description: "Heavy, fragrant jasmine woven in the Tamil Nadu tradition.",
    details: ["4 ft", "Fresh malli", "Highly fragrant"],
  },
  {
    id: "g-mixed",
    name: "Mixed Flower Garland",
    type: "Multi-flower · Vibrant",
    tag: "Garlands",
    price: 849,
    rating: 4.7,
    reviews: 64,
    image: img.flowerMarket,
    description: "Joyful marigold, jasmine and seasonal blooms for festivals and felicitations.",
    details: ["4 ft", "Seasonal mix", "Festive palette"],
  },
  {
    id: "g-bridal",
    name: "Premium Bridal Garland",
    type: "Rose · Crossandra · Jasmine",
    tag: "Garlands",
    price: 3499,
    rating: 5.0,
    reviews: 47,
    image: img.mandapCanopy,
    badge: "Bridal",
    description: "Layered stripes of rose, crossandra and jasmine — colour-matched to the bridal saree.",
    details: ["Pair", "Palette-matched", "48 hrs notice"],
  },
  {
    id: "g-custom",
    name: "Custom-Designed Garland",
    type: "Your flowers · Your colours",
    tag: "Garlands",
    price: 1499,
    rating: 4.9,
    reviews: 39,
    image: img.handsStringing,
    description: "Choose flowers, colours, length and thickness — our artisans hand-string it for you.",
    details: ["Any length", "Pick your blooms", "Starting price shown"],
  },
];

/* ------------------------------------------------------------------ */
/* Mega menus                                                          */
/* ------------------------------------------------------------------ */
export type MenuLink = {
  label: string;
  image?: string;
  /** anchor to scroll to */
  href?: string;
  /** opens the enquiry modal prefilled with this topic */
  enquiry?: string;
  /** filters the product grid */
  filter?: ProductTag | "All";
};

export type MegaMenu = {
  id: string;
  label: string;
  href: string;
  columns: { title: string; links: MenuLink[] }[];
  quickLinks?: MenuLink[];
  featuredProducts?: string[];
  tiles?: { label: string; image: string; note: string; href?: string; filter?: ProductTag | "All" }[];
  banner: { title: string; cta: string; image: string; href: string; eyebrow: string };
};

export const megaMenus: MegaMenu[] = [
  {
    id: "flowers",
    label: "Shop Flowers",
    href: "#shop",
    columns: [
      {
        title: "By Flower",
        links: [
          { label: "Fresh Flowers", image: img.dahlias, href: "#shop", filter: "All" },
          { label: "Roses", image: img.redRoses, href: "#shop", filter: "Bouquets" },
          { label: "Jasmine", image: img.malligai, href: "#shop", filter: "Bundles" },
          { label: "Marigold", image: img.marigoldClose, href: "#shop", filter: "Garlands" },
          { label: "Chrysanthemums", image: img.chrysMix, href: "#shop", filter: "Bundles" },
          { label: "Carnations", image: img.carnations, href: "#shop", filter: "Bouquets" },
          { label: "Orchids", image: img.orchid, href: "#shop", filter: "Bundles" },
        ],
      },
      {
        title: "More Blooms",
        links: [
          { label: "Lily", image: img.waterLily, href: "#shop", filter: "Bouquets" },
          { label: "Lotus", image: img.lotus, href: "#shop", filter: "Accessories" },
          { label: "Artificial Flowers", image: img.vaseArrangement, href: "#shop", filter: "Arrangements" },
          { label: "Loose Flowers", image: img.flowerMarket, href: "#shop", filter: "Bundles" },
          { label: "Flower Bunches", image: img.pinkWhiteBunch, href: "#shop", filter: "Bouquets" },
          { label: "Flower Combos", image: img.roseCarnation, href: "#shop", filter: "Bouquets" },
          { label: "Seasonal Flowers", image: img.daisies, href: "#shop", filter: "All" },
        ],
      },
    ],
    featuredProducts: ["red-rose-bouquet", "jasmine-bundle"],
    banner: {
      eyebrow: "Fresh every dawn",
      title: "Bring Nature Into Every Celebration",
      cta: "Explore Flowers",
      image: img.bouquetHand,
      href: "#shop",
    },
  },
  {
    id: "garlands",
    label: "Flower Garlands",
    href: "#garlands",
    columns: [
      {
        title: "Wedding & Bridal",
        links: [
          { label: "Wedding Garlands", image: img.marigoldClose, href: "#garlands" },
          { label: "Bridal Garlands", image: img.mandapCanopy, href: "#garlands" },
          { label: "Groom Garlands", image: img.garlandStrands, href: "#garlands" },
          { label: "Reception Garlands", image: img.nightJasmine, href: "#garlands" },
          { label: "Varmala", image: img.marigoldGarland, href: "#garlands" },
          { label: "Custom Garlands", image: img.handsStringing, enquiry: "Custom Garlands" },
        ],
      },
      {
        title: "By Style",
        links: [
          { label: "Traditional Garlands", image: img.marigoldHanging, href: "#garlands" },
          { label: "Rose Garlands", image: img.strandTexture, href: "#garlands" },
          { label: "Jasmine Garlands", image: img.jasmineGarlandTN, href: "#garlands" },
          { label: "Mixed Flower Garlands", image: img.flowerMarket, href: "#garlands" },
          { label: "Temple Garlands", image: img.jasmineWhite, href: "#garlands" },
          { label: "Corporate Garlands", image: img.chrysYellow, enquiry: "Corporate Garlands" },
        ],
      },
    ],
    featuredProducts: ["royal-varmala", "traditional-wedding-garland", "fresh-jasmine-garland"],
    banner: {
      eyebrow: "Hand-strung daily",
      title: "Made With Flowers. Designed With Love.",
      cta: "Explore Garlands",
      image: img.garlandMaker,
      href: "#garlands",
    },
  },
  {
    id: "wedding",
    label: "Wedding Decoration",
    href: "#wedding",
    columns: [
      {
        title: "Stages & Mandap",
        links: [
          { label: "Wedding Stage Decoration", image: img.mandapHall, enquiry: "Wedding Stage Decoration" },
          { label: "Reception Stage", image: img.receptionCouple, enquiry: "Reception Stage" },
          { label: "Mandap Decoration", image: img.mandapCanopy, enquiry: "Mandap Decoration" },
          { label: "Bride & Groom Stage", image: img.heroStage, enquiry: "Bride & Groom Stage" },
          { label: "Floral Backdrops", image: img.archDetail, enquiry: "Floral Backdrops" },
          { label: "Engagement Decoration", image: img.engagementHands, enquiry: "Engagement Decoration" },
        ],
      },
      {
        title: "Details & Arrivals",
        links: [
          { label: "Wedding Entrance", image: img.sideBouquet, enquiry: "Wedding Entrance" },
          { label: "Wedding Aisle", image: img.weddingAisle, enquiry: "Wedding Aisle" },
          { label: "Car Decoration", image: img.pinkRosesVase, enquiry: "Wedding Car Decoration" },
          { label: "Wedding Welcome Board", image: img.gardenChairs, enquiry: "Wedding Welcome Board" },
          { label: "Wedding Floral Decoration", image: img.floorArrangement, enquiry: "Wedding Floral Decoration" },
          { label: "Traditional Wedding Decoration", image: img.mandapCanopy, enquiry: "Traditional Wedding Decoration" },
        ],
      },
    ],
    quickLinks: [
      { label: "View wedding gallery", href: "#wedding" },
      { label: "Get a free quote", enquiry: "Wedding Decoration" },
      { label: "Bridal garlands", href: "#garlands" },
    ],
    banner: {
      eyebrow: "Signature weddings",
      title: "Your Wedding. Your Dream. Our Floral Art.",
      cta: "Explore Wedding Décor",
      image: img.mandapHall,
      href: "#wedding",
    },
  },
  {
    id: "events",
    label: "Event Decoration",
    href: "#events",
    columns: [
      {
        title: "Family Celebrations",
        links: [
          { label: "Birthday Decoration", image: img.balloons, enquiry: "Birthday Decoration" },
          { label: "Anniversary Decoration", image: img.gardenChairs, enquiry: "Anniversary Decoration" },
          { label: "Baby Shower", image: img.heartFlowers, enquiry: "Baby Shower Decoration" },
          { label: "Engagement", image: img.engagementHands, enquiry: "Engagement Decoration" },
          { label: "Naming Ceremony", image: img.namingGreen, enquiry: "Naming Ceremony Decoration" },
          { label: "Housewarming", image: img.lotusPink, enquiry: "Housewarming Decoration" },
          { label: "Stage Decoration", image: img.mandapPillar, enquiry: "Stage Decoration" },
        ],
      },
      {
        title: "Public & Corporate",
        links: [
          { label: "Corporate Events", image: img.banquetTable, enquiry: "Corporate Event Decoration" },
          { label: "Inauguration", image: img.storefront, enquiry: "Inauguration Decoration" },
          { label: "College Events", image: img.eventHall, enquiry: "College Event Decoration" },
          { label: "Political Events", image: img.marigoldHanging, enquiry: "Political Event Decoration" },
          { label: "Award Functions", image: img.receptionTable, enquiry: "Award Function Decoration" },
          { label: "Event Entrance Decoration", image: img.archDetail, enquiry: "Event Entrance Decoration" },
        ],
      },
    ],
    quickLinks: [
      { label: "Browse event styles", href: "#events" },
      { label: "Plan with our team", enquiry: "Event Decoration" },
    ],
    banner: {
      eyebrow: "Every occasion",
      title: "Every Event Deserves a Beautiful Beginning.",
      cta: "Explore Event Decoration",
      image: img.namingGreen,
      href: "#events",
    },
  },
  {
    id: "collections",
    label: "Collections",
    href: "#categories",
    columns: [
      {
        title: "Shop by Collection",
        links: [
          { label: "Best Sellers", href: "#shop", filter: "All" },
          { label: "Trending Designs", href: "#shop", filter: "Bouquets" },
          { label: "Traditional Collection", href: "#garlands" },
          { label: "Luxury Collection", href: "#shop", filter: "Bouquets" },
          { label: "Minimal Floral Collection", href: "#shop", filter: "Arrangements" },
          { label: "Seasonal Collection", href: "#shop", filter: "All" },
          { label: "Wedding Collection", href: "#wedding" },
          { label: "Premium Rose Collection", href: "#shop", filter: "Bouquets" },
          { label: "Festive Collection", href: "#shop", filter: "Accessories" },
          { label: "Custom Designs", enquiry: "Custom Floral Design" },
        ],
      },
    ],
    tiles: [
      { label: "Luxury Collection", image: img.darkBouquet, note: "Deep, dramatic, unforgettable", href: "#shop", filter: "Bouquets" },
      { label: "Traditional Collection", image: img.marigoldHanging, note: "Marigold, jasmine & heritage", href: "#garlands" },
      { label: "Premium Rose Collection", image: img.pinkRosesVase, note: "Hand-graded roses", href: "#shop", filter: "Bouquets" },
      { label: "Minimal Floral", image: img.tulipsVase, note: "Quiet, modern stems", href: "#shop", filter: "Arrangements" },
      { label: "Festive Collection", image: img.lotusPink, note: "Lotus & pooja florals", href: "#shop", filter: "Accessories" },
    ],
    banner: {
      eyebrow: "Curated by T.G ANBU",
      title: "Collections for Every Mood & Moment",
      cta: "Shop All Collections",
      image: img.bride,
      href: "#shop",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Category discovery (section 5)                                      */
/* ------------------------------------------------------------------ */
export const categories = [
  { title: "Fresh Flowers", desc: "Roses, jasmine, marigold & seasonal blooms — picked at dawn.", image: img.dahlias, href: "#shop", size: "tall" },
  { title: "Flower Garlands", desc: "Hand-strung for weddings, temples & welcomes.", image: img.garlandMaker, href: "#garlands", size: "wide" },
  { title: "Wedding Decoration", desc: "Mandaps, stages & entrances styled end to end.", image: img.southIndianWedding, href: "#wedding", size: "std" },
  { title: "Reception Decoration", desc: "Glamorous stages and tablescapes for the big night.", image: img.receptionTable, href: "#wedding", size: "std" },
  { title: "Event Decoration", desc: "Birthdays, openings, corporate & family functions.", image: img.eventHall, href: "#events", size: "std" },
  { title: "Stage Decoration", desc: "Statement floral stages built for the spotlight.", image: img.mandapPillar, href: "#events", size: "tall" },
  { title: "Floral Backdrops", desc: "Green walls, arches & photo-ready floral frames.", image: img.namingGreen, href: "#gallery", size: "wide" },
  { title: "Custom Floral Designs", desc: "Your colours, your concept — crafted from scratch.", image: img.bouquetHand, href: "#custom", size: "std" },
] as const;

/* ------------------------------------------------------------------ */
/* Wedding showcase (section 7)                                        */
/* ------------------------------------------------------------------ */
export const weddingShowcase = [
  { title: "Wedding Stage Decoration", note: "Grand hall stage with layered florals", image: img.mandapHall },
  { title: "Floral Entrance Arches", note: "Rose & carnation arch", image: img.archDetail },
  { title: "Reception Stage", note: "Evening glamour, floral wall", image: img.receptionCouple },
  { title: "Bride & Groom Stage", note: "Gilded seat, tropical florals", image: img.floorArrangement },
  { title: "Mandap Decoration", note: "Traditional striped flower mandap", image: img.mandapCanopy },
  { title: "Wedding Aisle Decoration", note: "Petal-lined aisle with urns", image: img.weddingAisle },
  { title: "Traditional Floral Arrangements", note: "Rose, crossandra & jasmine strand work", image: img.strandTexture },
];

/* ------------------------------------------------------------------ */
/* Event showcase (section 8)                                          */
/* ------------------------------------------------------------------ */
export const events = [
  { title: "Birthday Celebrations", desc: "Balloon & floral styling for every age.", image: img.balloons },
  { title: "Engagement Ceremonies", desc: "Romantic florals for the ring moment.", image: img.engagementHands },
  { title: "Anniversary Celebrations", desc: "Intimate setups for milestone years.", image: img.gardenChairs },
  { title: "Baby Showers", desc: "Soft pastel blooms for valaikappu & seemantham.", image: img.heartFlowers },
  { title: "Housewarming Ceremonies", desc: "Toran, lotus & pooja florals for griha pravesam.", image: img.lotusPink },
  { title: "Corporate Events", desc: "Polished florals for launches & conferences.", image: img.banquetTable },
  { title: "Grand Openings", desc: "Storefront garlands & ribbon-cutting arches.", image: img.storefront },
  { title: "Stage Decoration", desc: "Statement stages for functions & felicitations.", image: img.mandapPillar },
];

/* ------------------------------------------------------------------ */
/* Custom decoration services (section 10)                            */
/* ------------------------------------------------------------------ */
export const customServices = [
  "Custom Wedding Decoration",
  "Custom Stage Design",
  "Personalized Floral Arrangements",
  "Event Styling",
  "Custom Garlands",
  "Venue Decoration",
];

/* ------------------------------------------------------------------ */
/* Gallery (section 11)                                                */
/* ------------------------------------------------------------------ */
export const gallery = [
  { src: img.heroStage, title: "Luxury Floral Stage", caption: "Rose arch, gilded seat & tropical arrangements" },
  { src: img.southIndianWedding, title: "Traditional Indian Wedding", caption: "Garlands, kolam florals & ritual décor" },
  { src: img.darkBouquet, title: "Rose Arrangements", caption: "Moody, deep-toned rose work" },
  { src: img.archDetail, title: "Floral Arches", caption: "Dense rose and carnation arch" },
  { src: img.namingGreen, title: "Green Backdrop Stage", caption: "Grass wall, white roses & cradle" },
  { src: img.receptionTable, title: "Reception Decorations", caption: "Long-table florals & candlelight" },
  { src: img.marigoldHanging, title: "Flower Garlands", caption: "Marigold & jasmine strands" },
  { src: img.storefront, title: "Event Entrance Decoration", caption: "Storefront inauguration garland" },
  { src: img.sideBouquet, title: "Stage Floral Accents", caption: "Heliconia, lily & rose arrangement" },
  { src: img.weddingHands, title: "Wedding Rituals", caption: "Florals that frame every ritual" },
];

/* ------------------------------------------------------------------ */
/* Testimonials — DEMO CONTENT, replace with real customer reviews     */
/* ------------------------------------------------------------------ */
export const testimonials = [
  {
    name: "Priya & Karthik",
    event: "Wedding · Cheyyar",
    rating: 5,
    text: "We wanted something elegant and traditional for our wedding. The floral decoration was absolutely beautiful and every detail was perfectly arranged.",
    image: img.southIndianWedding,
  },
  {
    name: "Lakshmi Narayanan",
    event: "Naming Ceremony",
    rating: 5,
    text: "The green backdrop with white roses looked stunning in every photo. The team set everything up before we arrived and cleared it neatly afterwards.",
    image: img.namingGreen,
  },
  {
    name: "Ramesh V.",
    event: "Restaurant Grand Opening",
    rating: 5,
    text: "Our storefront garland drew people in from the street. Fresh flowers, on-time setup and a very professional crew.",
    image: img.storefront,
  },
  {
    name: "Divya R.",
    event: "Reception Stage",
    rating: 5,
    text: "The rose arch and candle pillars were exactly what I showed them on Pinterest — honestly even better in person. Guests kept asking who the decorator was.",
    image: img.heroStage,
  },
  {
    name: "Senthil Kumar",
    event: "Bridal Garlands",
    rating: 5,
    text: "Ordered varmala and jasmine strings for my sister's wedding. Thick, fragrant and colour-matched to the saree. Delivered early morning, perfectly fresh.",
    image: img.bride,
  },
];

/* ------------------------------------------------------------------ */
/* Social grid (section 15)                                            */
/* ------------------------------------------------------------------ */
export const social = [
  { src: img.handsStringing, label: "Behind the scenes · stringing malli" },
  { src: img.chrysMix, label: "Chrysanthemum season" },
  { src: img.garlandMaker, label: "Morning garland prep" },
  { src: img.carnations, label: "Carnation centrepieces" },
  { src: img.tulipsVase, label: "Minimal stems" },
  { src: img.roseCarnation, label: "Rose & carnation combo" },
  { src: img.waterLily, label: "Lily for the altar" },
  { src: img.chrysYellow, label: "Golden blooms" },
];

/* ------------------------------------------------------------------ */
/* FAQ (section 16)                                                    */
/* ------------------------------------------------------------------ */
export const faqs = [
  {
    q: "Do you provide wedding decoration services?",
    a: "Yes. We design and set up complete wedding décor — mandap, stage, entrance, aisle, reception and car decoration — in Cheyyar and surrounding areas.",
  },
  {
    q: "Can I order flower garlands separately?",
    a: "Absolutely. Garlands can be ordered on their own, from a single jasmine string to bridal varmala pairs, for pickup or delivery.",
  },
  {
    q: "Can I customize garland colors and flowers?",
    a: "Yes. Choose the flowers, colours, length and thickness — we can colour-match to your outfit or event theme.",
  },
  {
    q: "Do you provide decoration for corporate events?",
    a: "We do. We decorate inaugurations, product launches, conferences, award functions and office celebrations.",
  },
  {
    q: "Can I request decoration according to my budget?",
    a: "Of course. Share your budget and vision, and we'll suggest the best design options within it — no hidden costs.",
  },
  {
    q: "Do you deliver flowers?",
    a: "Yes, we deliver fresh flowers and garlands locally, including early-morning delivery for weddings and poojas.",
  },
  {
    q: "How early should I book wedding decoration?",
    a: "We recommend 3–6 weeks ahead, and earlier during peak muhurtham dates. Smaller events can often be booked within a few days.",
  },
  {
    q: "Can I request custom floral designs?",
    a: "Yes — send us a reference picture or idea on WhatsApp and our team will create a custom design and quote for you.",
  },
];

export const announcement = [
  "Floral Elegance for Every Celebration",
  "Wedding & Event Decoration",
  "Custom Orders Available",
  "Fresh Jasmine Strung Every Morning",
  "Call or WhatsApp +91 99761 32618",
];
