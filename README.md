# T.G ANBU — Floral & Event Design (landing page)

A single-page, e-commerce-style landing page for T.G ANBU, Cheyyar. It's built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion and Lucide icons.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Where to edit things

| What | File |
| --- | --- |
| Phone, WhatsApp, address, email, social links | `lib/data.ts` → `business` |
| Product names, prices (₹), images, sizes | `lib/data.ts` → `products`, `garlands` |
| Mega-menu categories, thumbnails, banners | `lib/data.ts` → `megaMenus` |
| Categories, wedding/event showcases, gallery | `lib/data.ts` |
| Testimonials (**demo content, so replace these with real reviews**) | `lib/data.ts` → `testimonials` |
| FAQs, announcement bar | `lib/data.ts` → `faqs`, `announcement` |
| Colours, fonts, buttons | `app/globals.css` (`@theme` tokens) |

**Placeholders to replace before going live:** the email, street address, Instagram, Facebook and YouTube handles in `business`, plus the demo testimonials.

## How the demo behaviour works

- **Cart and wishlist** are saved in the browser (`localStorage`). Checkout sends the basket as a pre-filled WhatsApp message to the business number.
- **Enquiry forms** (decoration, event and custom requests) open WhatsApp with the details already filled in. Nothing is sent to a server.
- **Account sign-in and the newsletter** are demo-only. They show a confirmation message and send nothing.
- Wedding and event submenu items open the enquiry modal with that service already selected. Flower submenu items scroll to the shop and filter the product grid.

## Images

- `public/images/*.jpg` contains T.G ANBU's own photos and the brand emblem. The `crop-*.jpg` files are detail crops of those photos.
- `public/images/lib/` contains supporting photography from Unsplash (Unsplash License) and Wikimedia Commons (CC licences). The source, licence and author for each file are in `public/images/credits.json`, which is linked from the footer. Some Commons images are CC BY-SA and need attribution, so keep the credits link, or replace those images with your own photos.
- The original mandap photo (`traditional-mandap.jpg`) shows another business's banner ("A. Vinoth"), so the page only uses detail crops that leave the banner out.
