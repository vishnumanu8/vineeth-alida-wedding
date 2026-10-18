# Vineeth & Alida — Modern Cinematic Wedding Reception Invitation 💍💐

A complete, production-ready, standalone digital wedding reception invitation web application for **Vineeth (Groom) and Alida (Bride)**.

Designed with **95% modern wedding elegance and 5% playful personality**, this application delivers an unforgettable first impression, an immersive full-screen opening, and effortless usability for all guests—from friends on smartphones to parents and senior family members.

---

## 🌟 Key Features & Highlights

- **Cinematic Double-Door Parting Reveal**:
  - Two majestic botanical-green panels parted down the center seam with restrained gold accents and a royal `V & A` crest.
  - Minimal, intuitive interaction cue: `⟨ Tap to Enter ⟩`.
  - Zero loading delay: Instantly parts left and right via GPU-accelerated CSS 3D transforms (`translate3d`), with background music beginning immediately.
  - The full-screen hero couple screen is pre-rendered underneath, immersing guests the moment the doors part.
- **Unforgettable Full-Screen Hero Screen**:
  - Full-viewport (`100dvh`) atmospheric couple portrait with dark botanical vignetting.
  - Minimal, app-like composition: Couple names, short invitation note, reception date badge, and the `Dubai ✈ Kerala` travel route.
  - Natural audio control integrated discreetly in the top-right corner—never floating or covering content.
  - Gentle scroll cue: *Reception Details ↓*.
- **Pure Native Touch Scrolling (Zero Lag)**:
  - 100% native momentum scrolling preserved without scroll hijacking, forced snapping, or heavy scroll-linked state updates.
  - Smooth background transitions from deep botanical green to warm pearl and champagne.
- **Visual Clarity & Zero Clutter**:
  - No top navigation bar stealing vertical screen height.
  - No persistent floating buttons or obstructive widgets.
  - Actions naturally placed in their relevant sections:
    - **Get Directions** (Google Maps) in the Reception Section.
    - **Add to Calendar** (Google Calendar & Apple/Outlook `.ics`) in the Reception Section.
    - **Copy Address** in the Reception Section.
    - **Send Wishes via WhatsApp** with celebratory confetti in the Wishes Section.
- **Genuine Curated Editorial Photography**:
  - Real high-resolution, magazine-grade wedding editorial photography in `public/images/`.
  - No blank green panels or fabricated fake portraits.
  - Resilient `WeddingImage` component with an elegant gold & botanical monogram fallback.
- **Live Countdown Timer**:
  - Accurate countdown to Sunday, 29 November 2026 with completed-event state.
- **Personalized Guest Greetings**:
  - Supports `?guest=Suresh%20%26%20Family` in the URL to display personalized greetings on the opening doors and hero screen, while pre-filling the WhatsApp blessing form.

---

## 📁 Clean Project Structure

```text
WeddingInvitationApp_2/
├── index.html                   # HTML entry with Open Graph & WhatsApp metadata
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite bundler configuration
├── tailwind.config.js           # Tailored wedding color palette & typography
├── vercel.json                  # Free Vercel SPA routing & cache headers
├── public/
│   ├── favicon.svg              # Gold & Botanical Green monogram favicon
│   ├── audio/
│   │   └── wedding-bgm.mp3      # Optional background music file
│   └── images/
│       ├── hero-couple.jpg      # Full-screen couple hero portrait (1080 × 1920)
│       ├── groom-vineeth.jpg    # Groom portrait (800 × 1000)
│       ├── bride-alida.jpg      # Bride portrait (800 × 1000)
│       ├── moment-1.jpg         # Moment 1: Hands & rings (1080 × 1350)
│       ├── moment-2.jpg         # Moment 2: Evening lights (1080 × 1350)
│       ├── moment-3.jpg         # Moment 3: Celebration toast (1080 × 1350)
│       ├── group-photo.jpg      # Optional group photo (1600 × 900)
│       └── og-wedding.jpg       # WhatsApp preview image (1200 × 630 px)
└── src/
    ├── App.tsx                  # Clean coordinator for doors & sections
    ├── main.tsx                 # React entry point
    ├── index.css                # Global styles & safe-area insets
    ├── config/
    │   └── weddingConfig.ts     # ⭐ SINGLE FILE TO EDIT ALL WEDDING DETAILS
    ├── components/
    │   ├── OpeningDoors.tsx     # Cinematic double-door parting reveal
    │   ├── HeroSection.tsx      # Full-screen immersive couple hero
    │   ├── CoupleSection.tsx    # Couple profiles & family blessings
    │   ├── ReceptionSection.tsx # Reception details, maps, calendar & countdown
    │   ├── MomentsSection.tsx   # Moments gallery with touch swipe
    │   ├── WishesSection.tsx    # WhatsApp blessing sender & confetti
    │   ├── WeddingImage.tsx     # Resilient image component with SVG fallback
    │   └── Footer.tsx           # Family blessing & WhatsApp share
    └── utils/
        ├── audioPlayer.ts       # Audio manager + Web Audio API synthesizer
        ├── calendar.ts          # Google Calendar & .ics file generator
        ├── confetti.ts          # Gold & floral celebratory confetti
        └── url.ts               # Guest name extraction & sanitization
```

---

## 🚀 Beginner Setup Guide (Local Development)

### Step 1. Prerequisites
Make sure you have Node.js installed (v18 or higher recommended, Node v20 is ideal):
- Download from: [https://nodejs.org/](https://nodejs.org/)
- Verify in your terminal:
  ```bash
  node -v
  npm -v
  ```

### Step 2. Install Dependencies
In the project directory, run:
```bash
npm install
```

### Step 3. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```text
http://localhost:3000
```

### Step 4. Test on a Physical Smartphone (Same Wi-Fi)
Vite will show a `Network:` URL in the terminal (for example: `http://192.168.1.5:3000`).
1. Connect your smartphone to the same Wi-Fi network as your computer.
2. Open Safari (iPhone) or Chrome (Android) and type the `Network:` address.
3. Test the double-door parting reveal, audio playback, native momentum scrolling, and WhatsApp wishes directly on mobile!

---

## 🎨 How to Customize (The 1-Minute Guide)

You **do not** need to edit complex React code to update the wedding details! All editable content is centralized in **`src/config/weddingConfig.ts`**.

### 1. Update Wedding Dates, Venue & WhatsApp Number
Open `src/config/weddingConfig.ts` and update:
```typescript
reception: {
  isoDateTime: "2026-11-29T18:00:00+05:30", // Your ISO date & time
  formattedDate: "Sunday, 29 November 2026",
  formattedTime: "6:00 PM Onwards",
  venueName: "The Grand Pavilion",
  venueHall: "Imperial Banquet Hall",
  fullAddress: "The Grand Pavilion, Marine Drive Road, Kochi, Kerala 682011",
  googleMapsUrl: "https://maps.google.com/?q=The+Grand+Pavilion+Kochi",
  ...
},
wishes: {
  // Your 10-digit WhatsApp number with country code (e.g. 91 for India, no + or spaces)
  whatsappNumber: "919876543210",
  ...
}
```

### 2. Replace Photographs
Place your actual photos into the `public/images/` directory using these filenames:
- **`hero-couple.jpg`**: Vertical full-screen couple portrait (`1080 × 1920 px`, 9:16).
- **`groom-vineeth.jpg`**: Groom portrait (`800 × 1000 px`, 4:5).
- **`bride-alida.jpg`**: Bride portrait (`800 × 1000 px`, 4:5).
- **`moment-1.jpg`**, **`moment-2.jpg`**, **`moment-3.jpg`**: Gallery photos (`1080 × 1350 px`, 4:5).
- **`og-wedding.jpg`**: WhatsApp preview banner (`1200 × 630 px`, landscape).

---

## 💌 Guest Personalization (`?guest=...`)

You can create personalized WhatsApp invitation links for individual guests or families:
```text
https://your-domain.vercel.app/?guest=Suresh%20%26%20Family
https://your-domain.vercel.app/?guest=Rahul%20%26%20Priya
https://your-domain.vercel.app/?guest=Uncle%20Thomas
```
When the guest opens their link:
1. The double doors feature a personalized badge: *"Prepared for Suresh & Family"*.
2. The full-screen hero displays: *"Cordially Welcoming Suresh & Family"*.
3. The WhatsApp wishes form automatically fills in their name!

---

## 🌐 100% Free Vercel Deployment Guide

Deploy your wedding invitation in less than 3 minutes on Vercel:

### Step 1. Push Code to GitHub
1. Create a free account on [GitHub](https://github.com/) if you don't already have one.
2. Create a new repository (e.g., `vineeth-alida-wedding`).
3. Push your local project:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/vineeth-alida-wedding.git
   git push -u origin main
   ```

### Step 2. Deploy on Vercel (Free)
1. Sign up or log in at [Vercel](https://vercel.com/) (using your GitHub account).
2. Click **"Add New Project"** -> **"Project"**.
3. Select your GitHub repository (`vineeth-alida-wedding`) and click **"Import"**.
4. Vercel automatically detects **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**.
6. Within ~30 seconds, your site is live at:
   ```text
   https://vineeth-alida-wedding.vercel.app
   ```

---

## ✅ Final Verification Checklist

- [x] **Cinematic Double-Door Reveal**: Parting botanical panels with GPU transform, zero delay, and immediate music start.
- [x] **Full-Screen Couple Hero Screen**: `100dvh` immersive couple photography with atmospheric lighting and uncropped composition.
- [x] **Zero Visual Clutter**: Removed top navbar and persistent floating buttons covering content.
- [x] **Immediate Native Momentum Touch Scrolling**: Restored 100% native scrolling without lag or hijacking.
- [x] **Real Curated Editorial Photography**: Authentic high-resolution imagery in `public/images/`. No empty green boxes.
- [x] **Essential Actions Preserved**: Get Directions, Add to Calendar (.ics and Google Calendar), Copy Address, and WhatsApp Wishes with Confetti.
- [x] **Production Build Clean**: 100% clean compilation in Vite with zero TypeScript or console errors.
