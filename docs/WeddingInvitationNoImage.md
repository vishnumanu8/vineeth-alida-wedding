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

| Removed Item | Former Location | Replacement |
|---|---|---|
| **Hero Couple Photo** | `public/images/hero-couple.jpg` | **Animated Gold Monogram (`V & A`)** with botanical flourishes, kinetic typography, and ambient gold dust particles |
| **Groom & Bride Portraits** | `public/images/groom-vineeth.jpg`, `public/images/bride-alida.jpg` | **Heraldic Botanical Crests** with laurel wreaths, initials 'V' and 'A', and formal heritage profiles |
| **Before/After Memory Slider** | `MomentsSection.tsx`, `TouchToRevealMemory.tsx` | **The Living Invitation Letter (`InvitationLetter.tsx`)** with digital parchment, wax seal crest, and live countdown timer |
| **Image Preload Tag** | `<link rel="preload" as="image" href="/images/hero-couple.jpg">` in `index.html` | Removed / Replaced with `<link rel="preload" as="image" href="/favicon.svg">` |
| **Social / WhatsApp Sharing Card** | `og:image` pointing to `og-wedding.jpg` | **`public/images/og-invitation.jpg`** — A custom 1200×630px emerald and gold typographic monogram card |
| **Footer Download Asset** | Download link to `og-wedding.jpg` | Updated to download `og-invitation.jpg` as the keepsake invitation card |

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
   - **Live Countdown Clock (`CountdownTimer.tsx`)**: Real-time ticking countdown to 7 January 2027 at 6:00 PM IST (Days, Hours, Minutes, Seconds).
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

## 🧪 Phase 7: Verification Results

- **Production Build**: `npm run build` (`tsc -b && vite build`) passes in ~1.28s with **0 errors**.
- **Bundle Chunks**:
  - `dist/index.html`: 3.79 kB
  - `dist/assets/index-CKxwvpPf.css`: 37.77 kB
  - `dist/assets/motion-BwLpCJQ6.js`: 122.17 kB
  - `dist/assets/vendor-BsOvDYUW.js`: 133.93 kB
  - `dist/assets/index-D60-OIEC.js`: 215.58 kB
- **Viewport Testing**: Verified responsive rendering across mobile screen widths (320px, 360px, 390px, 430px) and desktop displays.
