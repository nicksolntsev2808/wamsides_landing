# Warmsides Design System

## Colors
```css
--ws-cream: #FDF6EE;       /* page background */
--ws-beige: #F0E6D3;       /* alternating section bg, tag fills */
--ws-terracotta: #C9603A;  /* primary CTA, links, accents */
--ws-terracotta-dark: #A84D2C; /* hover state for CTAs */
--ws-orange-soft: #E8895A; /* gradient end, highlights */
--ws-brown: #4A2E1A;       /* headings, footer background */
--ws-text: #5C3D2E;        /* body copy */
--ws-muted: #9E7A65;       /* captions, placeholder, labels */
--ws-white: #FFFAF5;       /* card surfaces, nav bg */
--ws-dark: #2C1A0E;        /* footer bg */
--ws-border: #E8D5C0;      /* card borders, input borders */
```

## Gradient
`linear-gradient(135deg, #C9603A, #E8895A)` — used for: W lettermark bg, gradient text on hero headline, decorative elements.

## Typography
- **Display/Headings**: Raleway 700–900, line-height 1.1–1.2
- **Body/UI**: Nunito 400–700, line-height 1.6–1.75
- Hero h1: Raleway 800, 3.5–5rem, color #4A2E1A (with gradient on key word)
- Section h2: Raleway 700–800, 2–2.5rem, color #4A2E1A
- Card h3: Raleway 700, 1.25rem, color #4A2E1A
- Body: Nunito 400–500, 1rem, color #5C3D2E
- Muted: Nunito 400, 0.875rem, color #9E7A65
- Tags: Raleway 700, 0.75rem, uppercase, letter-spacing 0.08em

## Buttons
- Primary: bg #C9603A, color #FFFAF5, Raleway 700, padding 0.875rem 2rem, radius 0.625rem, hover: bg #A84D2C + translateY(-2px) + shadow
- Outline: transparent bg, border 2px solid #C9603A, color #C9603A, same font/padding/radius, hover: fill

## Cards
- bg #FFFAF5, border 1px solid #E8D5C0, radius 1.25rem
- hover: translateY(-6px) + shadow 0 16px 48px rgba(74,46,26,0.12)

## Section Alternation
- Odd sections: bg #FFFAF5 (White)
- Even sections: bg #F0E6D3 (Beige)
- Footer: bg #2C1A0E (Dark)

## Spacing
- Section padding: 6rem 0 (desktop), 4rem 0 (mobile)
- Container max-width: 1200px, padding 0 1.5rem
- Card gap: 2rem desktop, 1.5rem mobile

## Motion
- Fade-up: opacity 0 → 1, translateY(32px → 0), 0.6s ease
- Stagger delays: 0.1s, 0.2s, 0.3s, 0.4s
- Button hover: 200ms ease
- Card hover: 250ms ease
- No bounce, no spring, no scale — warm and intentional

## Logo
- W lettermark: rounded square (0.625rem radius), gradient fill #C9603A→#E8895A at 135°, white "W" inside (Raleway 800)
- Wordmark: "Warmsides" in Raleway 800, color #4A2E1A (on light bg)

## Tags/Badges
- bg #F0E6D3, color #C9603A, Raleway 700, 0.75rem, uppercase, letter-spacing 0.08em, padding 0.375rem 0.875rem, radius 2rem
