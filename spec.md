# LuxeDrive Chauffeur

## Current State
New project. Empty backend and frontend scaffolding.

## Requested Changes (Diff)

### Add
- Full luxury chauffeur service website with conversion-focused design
- Sticky header: logo, click-to-call phone, Book Now CTA
- Hero section: full-screen background image, headline, subheadline, inline booking form
- Booking form: name, email, phone, pickup, destination, date/time, passengers count
- Services section: Airport Transfers, Corporate Chauffeur, Special Events, City Tours — with icons and SEO copy
- Fleet section: vehicle cards (Mercedes S-Class, Mercedes V-Class, BMW 7 Series, Range Rover) with specs
- Offers/packages section: highlighted promotional cards
- Reviews/testimonials section with star ratings and customer quotes
- Trust signals bar: years experience, rides completed, 5-star reviews, licensed & insured
- Footer: contact details, opening hours, quick links, services links, social media
- Cookie consent banner
- Multiple sections alternating between dark (near-black) and light (white/light gray) backgrounds
- Gold accent color throughout (#C9A84C or similar)
- Schema.org meta tags for LocalBusiness, Service, Review
- Smooth scroll, lazy loading images
- Mobile-first responsive design
- Backend: store booking requests with all fields

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Backend: Motoko actor to accept and store booking form submissions
2. Generate hero, fleet, and service images via image generation
3. Frontend: Full multi-section homepage with all required sections
4. Booking form wired to backend
5. SEO meta tags, schema.org JSON-LD
6. Dark/light mixed sections, gold accent design system
