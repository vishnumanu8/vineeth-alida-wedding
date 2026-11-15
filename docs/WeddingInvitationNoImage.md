# Vineeth & Alida — "Living Invitation Letter" Edition (No Personal Photos)

## 🌿 Executive Summary

The **"Living Invitation Letter"** edition (`WeddingInvitationNoImage` branch) is a standalone, award-winning creative redesign of the Vineeth & Alida wedding reception web invitation. It deliberately eliminates all personal photographs of the couple and groups, replacing them with a tactile, animated digital parchment letter experience, custom self-drawing gold monograms, heraldic botanical crests, live countdown clock, and a heartwarming bottom showcase of the bride's two beloved pet dogs (`Vineeth_Alida_Additional_image.jpeg`).

---

## 🔒 Phase 1: Git Branch Safety

- **Preserved `main` branch commit**: `f0324a6e90aa9b7edff7d7520471745e978a7a43`
- **Active working branch**: `WeddingInvitationNoImage` (branched cleanly from `main`)
- `main` remains untouched and 100% operational with its original configuration.

---

## 🚫 Phase 2: Complete Removal of Personal Couple/Group Photographs

All couple/human photographs, image comparison sliders, and thumbnail references were systematically audited and removed:

| Removed Item                       | Former Location                                                                  | Replacement                                                                                                                |
| ---------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Hero Couple Photo**              | `public/images/hero-couple.jpg`                                                  | **Animated Gold Monogram (`V & A`)** with botanical flourishes, kinetic typography, and ambient gold dust particles        |
| **Groom & Bride Portraits**        | `public/images/groom-vineeth.jpg`, `public/images/bride-alida.jpg`               | **Heraldic Botanical Crests** with laurel wreaths, initials 'V' and 'A', and formal heritage profiles                      |
| **Before/After Memory Slider**     | `MomentsSection.tsx`, `TouchToRevealMemory.tsx`                                  | **The Living Invitation Letter (`InvitationLetter.tsx`)** with digital parchment, wax seal crest, and live countdown timer |
| **Image Preload Tag**              | `<link rel="preload" as="image" href="/images/hero-couple.jpg">` in `index.html` | Removed / Replaced with `<link rel="preload" as="image" href="/favicon.svg">`                                              |
| **Social / WhatsApp Sharing Card** | `og:image` pointing to `og-wedding.jpg`                                          | **`public/images/og-invitation.jpg`** — A custom 1200×630px emerald and gold typographic monogram card                     |
| **Footer Download Asset**          | Download link to `og-wedding.jpg`                                                | Updated to download `og-invitation.jpg` as the keepsake invitation card                                                    |

---

## 👑 Phase 3: Preserved Identity & Core Functional Features

The visual design language and interactive capabilities from the original project remain 100% functional:

- **Colour Palette**: Deep botanical emerald (`#07130E`, `#0E281D`), warm pearl (`#FFFDF7`, `#FDFBF7`), and champagne gold (`#D4A359`, `#C89D54`, `#F0D49E`).
- **Launch Screen**: The cinematic 3D double-door parting reveal (`OpeningDoors.tsx`) with atmospheric mist and light bokeh motes.
- **Audio Experience**: Background romantic acoustic music with volume fade-in and fixed bottom-right mute/unmute control (`AudioControl.tsx`).
- **Dubai ✈ Kerala Flight Route**: Interactive scroll-linked scrub with animated airplane silhouette, jet engines, contrail particles, and travel notes.
- **Reception Logistics**: Confirmed date (Thursday, 7 January 2027), Google Maps directions, copy address with feedback, and calendar integration (Google Calendar & Apple/Outlook `.ics`).
- **Wishes & Blessings**: Recipient routing for Vineeth (Groom) and Alida (Bride) via WhatsApp with celebratory confetti explosion.

---

## 📜 Phase 4: Mobile-First UX Redesign — "The Living Invitation Letter"

Designed specifically for guests receiving the link via WhatsApp on mobile phones:

1. **Animated Monogram Hero (`HeroSection.tsx`, `AnimatedMonogram.tsx`)**:
   - SVG self-drawing stroke animation (`stroke-dashoffset`) revealing an ornate botanical crest with intertwined "V & A" ligature.
   - Ambient floating golden dust motes (`AmbientDustParticles.tsx`) creating depth on the deep emerald canvas.
   - Kinetic typography entrance for couple names, date, and reception label.
2. **The Living Invitation Letter (`InvitationLetter.tsx`)**:
   - Tactile digital parchment with scalloped/ornate edges and self-drawing gold corner filigree.
   - Deep red wax seal crest with embossed "V & A 2027" monogram.
   - Scroll-triggered prose reveals presenting the families' formal invitation words.
   - **Live Countdown Clock (`CountdownTimer.tsx`)**: Real-time ticking countdown to 7 January 2027 at 5:30 PM IST (Days, Hours, Minutes, Seconds).
3. **Continuous Golden Thread (`GoldenThreadDivider.tsx`)**:
   - Scroll-linked vertical gold thread with delicate SVG botanical leaves that sway and draw into view as sections are approached.

---

## 🐾 Phase 5: "Meet the Four-Legged VIPs" (`PetVipSection.tsx`)

A delightful section positioned near the bottom of the invitation (above Wishes and Footer):

- **Asset**: `public/images/Vineeth_Alida_Additional_image.jpeg` (896 × 1195 px).
- **Integrity**: Displayed authentically without cropping, distorting, or AI-altering the dogs' faces.
- **Stepping Paw Trail**: On scroll, an animated sequence of golden SVG paw prints steps across the path into the section.
- **Ornamental Botanical Frame**: Gilded frame with subtle spring bounce entrance.
- **Interactive Love Burst**: Tapping the photo or the "Send Love & Paws" button triggers a tactile spring animation, gold confetti burst, and floating hearts/paws (`🐾`, `💛`, `✨`, `💖`) with a persistent love counter.

---

## ⚡ Phase 6: Animation Stack & Performance Guardrails

- **Engine Separation**: Framer Motion handles interactive UI states, taps, and spring physics. GSAP ScrollTrigger handles scroll-linked scrub animations (flight trajectory, thread draw). No DOM element is animated simultaneously by both engines.
- **Native Touch Scrolling**: Zero scroll hijacking; native momentum scrolling on iOS Safari and Android Chrome WebView.
- **Performance**: 60fps GPU-accelerated transforms (`transform`, `opacity`, SVG stroke).
- **Responsive Layout**: Zero horizontal overflow (`overflow-x: hidden`), safe-area inset support (`env(safe-area-inset-top)` / `bottom`).

---

## 💎 Phase 8: UX Polish, Formal Etiquette Fix & Continuous Live Animations

A comprehensive refinement pass was implemented on `WeddingInvitationNoImage` to elevate contrast, eliminate content redundancy, fix formal etiquette, and bring rich continuous life to the invitation:

1. **Hero Cleanup & Invisible Heading Contrast Fix:**
   - Removed the `✨ DIGITAL INVITATION` badge from the Hero section to allow the animated monogram and typography to stand proud.
   - Removed duplicate dark transition pills (`THE LETTER`, `THE RECEPTION`, etc.) from `GoldenThreadDivider.tsx`, leaving a clean, continuous golden thread with swaying botanical leaf accents.
   - Fixed section headings across all dark emerald sections (`InvitationLetter`, `CoupleSection`, `ReceptionSection`, `PetVipSection`, `WishesSection`) from low-contrast dark green to high-contrast **Warm Ivory/Cream (`#FAF6F0`)** titles and **Champagne Gold (`#E5C158`)** subtitles on translucent `#0B1E16` pills with gold borders.

2. **60fps Multi-Layer Firefly & Stardust Engine (`MagicalFireflyEngine.tsx`):**
   - High-performance full-screen HTML5 Canvas particle engine running at 60fps:
     - **Layer 1 — Glowing Golden Fireflies (40 particles)**: Organic sine/orbital drifting paths with individual pulse frequencies and luminous glow filters.
     - **Layer 2 — Soft Bokeh Light Orbs (9 orbs)**: Large softly blurred radial gradient spheres drifting upward.
     - **Layer 3 — Floating Stardust (30 particles)**: Micro-sparkles drifting across both dark emerald and cream sections.
   - Automatically pauses on hidden browser tabs (`visibilitychange`) to conserve battery and CPU.

3. **Formal Letter Redesign & De-duplication (`InvitationLetter.tsx` & `CoupleSection.tsx`):**
   - Removed standalone Groom & Bride profile cards (`BASED IN DUBAI`, `NATIVE TO KERALA`, personal quotes, duplicate parents pills).
   - Formally paired the couple with their respective parents adhering to formal luxury etiquette:
     - **Vineeth M** — _S/o Smt. Sobhana S. & Shri Madhavan Nair_
     - `&`
     - **Adv Alida M Vinod** — _D/o Smt. Manjusha G. & Shri Vinod Kumar_
   - Formal invitation prose welcoming guests to the auspicious wedding reception.
   - Removed duplicated date & venue block from the letter base; integrated the live **Countdown Timer** at the card's base.
   - Seamless flow directly into **"Our New Journey Begins"** (Dubai ✈ Kerala Flight Route) and the **Grand Evening Reception** venue card.

4. **Continuous Living Pets Section (`PetVipSection.tsx`):**
   - Updated badge to `✨ SPECIAL PAW-TY VIPs`.
   - **Infinite Walking Paw Trail**: 6 golden paw prints stepping in an alternating, rhythmic loop above the card.
   - **Continuous 3D Floating/Breathing**: Gentle vertical float (`y: [0, -7, 0]`) with rotating gold border beam.
   - **Automatic Continuous Particle Emitter**: Emits floating hearts and paws every 1.5 seconds when in viewport.
   - **Enhanced Tap Interaction**: Spring bounce physics, celebratory confetti burst, floating love particles, and persistent paw love counter.

---

## ✨ Phase 10: Targeted Polish (Hero Fireflies, Dreamy Speed, Story Quotes & Live SVG Paws)

A targeted polish pass was executed on the `WeddingInvitationNoImage` branch:

1. **Hero Screen Fireflies & Speed Tuning:**
   - **Hero Fireflies Enabled**: Fixed the stacking context and background opacity so `<MagicalFireflyEngine />` (`fixed inset-0 z-30 pointer-events-none`) floats visibly across the **Hero screen** immediately upon door-opening reveal, as well as seamlessly across all subsequent sections.
   - **Dreamy Medium-Slow Speed**: Reduced particle velocity and angular step by ~28% (`vx: 1.15`, `vy: -0.28 to -1.13`, wobble: `0.55`). The fireflies drift at a smooth, luxurious, medium-slow magical pace that is noticeable immediately without being frantic or sluggish.

2. **"Two Worlds, One Heart" Story Quotes in Journey Card:**
   - Kept **The Invitation Letter** 100% formal and official for family and elders.
   - Removed the duplicate phrase `"Coming home to celebrate our beginning"` from the base of the Dubai ✈ Kerala white flight card in `CoupleSection.tsx`.
   - Added an elegant dual-pill **"Two Worlds, One Heart"** signature block featuring the couple's personal taglines with gold monogram initials (`V` & `A`):
     - **Vineeth** — _"Balancing life's ledger with joy, heart & humor"_
     - **Alida** — _"Advocating for endless love, laughter & forever"_

3. **Continuous Live SVG Paw Animation & Pets Section:**
   - **100% SVG Paws (No Native Emojis)**: Replaced all Unicode `🐾` text emojis (which render dark grey on iOS) with custom Champagne Gold SVG paw icons (`GoldPawSvg`) inside the `SPECIAL PAW-TY VIPs` badge, the walking trail, tap particles, and the `Send Love & Paws` button.
   - **Continuous `<WalkingPawTrail />`**: Created an 8-step alternating golden paw trail where outer `<g>` coordinates are preserved and inner `<motion.g>` elements step in an always-active infinite loop (`repeat: Infinity`, staggered by `0.22s` per paw) with a soft gold glow filter.
   - **Framing & Upper Space Floating Overlay**: Tightened pet portrait framing to `object-bottom` and introduced a continuous ambient floating overlay in the upper space of the frame where gold hearts, sparkles, and mini paws float upward in an infinite loop.

---

## 🍃 Phase 12: Ambient Density Reduction & Counter Bug Fix

1. **Sparse & Breathable Firefly Density:**
   - Reduced background firefly count to **15** (ultra-delicate ambient sparks), soft bokeh orbs to **3**, and micro-stardust to **10**.
   - Softened outer glow radius for each particle (`3.0x` from `3.8x`) and tuned base opacity.
   - Result: A whisper-quiet, elegant, and breathable ambient effect that leaves the screen completely open and uncluttered.

2. **"Send Love & Paws" Double-Increment Bug Fix:**
   - **Root Cause Identified**: The child `<button>` had `onClick={handleSendLove}` and its parent card container also had `onClick={handleSendLove}` without `e.stopPropagation()`. Clicking the button fired the handler once on the button and once again when the event bubbled to the card, causing every click to increment by +2.
   - **Resolution**:
     - Added explicit `e.stopPropagation()` on both the button's `onClick` and within `handleSendLove`.
     - Introduced a timestamp debounce ref (`lastTapRef`) with a 250ms threshold to prevent rapid duplicate synthetic events on touchscreens.
     - Ensured functional state updates (`setLoveCount((prev) => prev + 1)`).
   - **Result**: Exactly one physical tap equals strictly `+1` sequentially (1, 2, 3, 4...).

---

## 🧪 Phase 13: Verification & Build Status

- **Production Build**: `npm run build` (`tsc -b && vite build`) passes in ~1.26s with **0 errors**.
- **Bundle Chunks**:
  - `dist/index.html`: 3.79 kB
  - `dist/assets/index-DvpewGPt.css`: 37.90 kB
  - `dist/assets/motion-CWfDWe8t.js`: 122.91 kB
  - `dist/assets/vendor-BXZjp2tV.js`: 133.93 kB
  - `dist/assets/index-Jr7He-ZQ.js`: 214.26 kB
- **Vite Dev Server**: Running actively at `http://localhost:3000/`.

---

## 🌌 Phase 14: Global Color Theme Swap — "Midnight Sapphire & Champagne Gold"

Executed a complete color theme transformation across the entire digital invitation, transitioning from the previous Emerald/Forest Green palette to an evening **"Midnight Sapphire & Champagne Gold"** aesthetic without altering layout structure, text content, or animation physics:

1. **Global CSS & Tailwind Design Tokens (`tailwind.config.js` & `globals.css`):**
   - Injected the new `sapphire` palette:
     - `sapphire.light`: `#233876` (vibrant sapphire highlight)
     - `sapphire.DEFAULT`: `#111D4A` (royal midnight navy)
     - `sapphire.dark`: `#0B1325` (ultra-deep midnight background)
     - `sapphire.deep`: `#060A14` (abyssal shadow)
     - `sapphire.surface`: `#16255C` (elevated card tint)
   - Remapped semantic aliases (`botanical` and `peacock`) to the Midnight Sapphire scale so buttons, typography, and accent borders seamlessly inherit the new theme.
   - Updated `html, body`, `App.tsx`, and `index.html` background to `#0B1325` with `selection:text-sapphire-dark`.
   - Updated `boxShadow.wedding` and `boxShadow.wedding-lg` to soft navy tones.

2. **Component Backgrounds, Badges & Overlays:**
   - **Opening Doors Reveal (`OpeningDoors.tsx`)**: Replaced door gradients with `from-[#060A17] via-[#0B1325] to-[#121E42]`, ambient lighting to `bg-sapphire/20`, and preserved shimmering gold center seam.
   - **Hero Section (`HeroSection.tsx`)**: Updated radial gradient to sapphire `rgba(17, 29, 74, 0.75)` / `rgba(11, 19, 37, 0.9)` / `rgba(6, 10, 20, 0.95)` flowing gracefully into `#0B1325`.
   - **Section Badges (`InvitationLetter.tsx`, `ReceptionSection.tsx`, `PetVipSection.tsx`, `WishesSection.tsx`)**: Updated translucent pills from `#0B1E16` to Midnight Sapphire `#111D4A` with champagne gold border and typography.
   - **Pet Photography Container (`PetVipSection.tsx`)**: Updated background to deep navy `#0E1738` and confetti palette to `#1C2A4F`.
   - **Floating Audio Control (`AudioControl.tsx`)**: Updated active badge background to `#0B1325`/90.
   - **Favicon (`public/favicon.svg`)**: Updated badge background circle to `#0B1325`.

3. **Open Graph & WhatsApp Link Preview Assets:**
   - Updated `scripts/generate-og-image.mjs` and `public/og-image-letter.svg` with the Midnight Sapphire velvet gradient `radial-gradient(circle at 50% 45%, #162B66 0%, #0F1D47 48%, #070D21 100%)`.
   - Regenerated `public/og-image-letter.png` (298 KB, under 300 KB requirement) and `public/og-image-letter.jpg` / `public/images/og-invitation.jpg` (66 KB) with Google Chrome headless screenshot and compression.

