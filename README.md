# Vineeth & Alida — Modern Interactive Wedding Reception Invitation 💍💐

A complete, production-ready, standalone digital wedding reception invitation web application for **Vineeth (Groom) and Alida (Bride)**.

Designed with **95% wedding elegance and 5% playful personality**, this application delivers a luxurious first impression, a joyful celebration experience, and effortless usability for all guests—from friends on smartphones to parents and senior family members.

---

## 🌟 Key Features & Highlights

- **Mobile-First Opening Experience (Ceremonial Reveal)**:
  - Custom royal envelope & digital wedding card designed strictly for mobile viewports (`100dvh`).
  - Tactile **3D Antique Gold Wax Seal** (`V & A` monogram) with gentle pulsing aura.
  - One-tap action: **"Open Invitation"** triggers a cinematic reveal of the main invitation.
  - Optional user-controlled music initiation upon opening.
- **Modern Wedding Elegance & Mature Palette**:
  - Warm Pearl (`#FFF9F1`), Soft Champagne (`#F4E8D8`), Deep Botanical Green (`#315B4B`), Muted Peacock Teal (`#397F7A`), Antique Gold (`#B88A45`), and Dusty Rose (`#C77F83`).
  - Refined typography combining Google Fonts *Cormorant Garamond*, *Great Vibes*, and *Plus Jakarta Sans*.
- **The Grand Evening Reception Focus**:
  - Highlights clearly that this is the celebratory **evening wedding reception** (the official ceremony is observed privately).
  - Prominent **Get Directions** button linked to Google Maps.
  - Interactive **Add to Calendar** with Google Calendar & Apple/Outlook `.ics` download.
  - **Copy Address** with instant confirmation.
  - **Live Countdown Timer** with timezone support and completed-event state.
- **Subtle, Tasteful Personal Touches (Strictly Limited)**:
  - Two witty micro-one-liners on couple cards (accounting & law references kept subtle and playful).
  - Delicate animated `Dubai ✈ Kerala` travel route indicator symbolizing coming home for the celebration.
- **Cherished Moments (Photo Experience)**:
  - Responsive, swipe-friendly photo carousel with elegant gold-bordered frames.
  - Zero broken images: Includes graceful SVG vector monograms if photographs are pending upload.
- **Wishes & Blessings Interaction**:
  - Quick-tap preset blessing chips.
  - Sends formatted wishes directly to the couple via WhatsApp.
  - Celebratory confetti & gold/rose petals explosion.
- **Ambient Audio & Music Player**:
  - Optional background music with floating play/pause control.
  - Zero autoplay without user gesture.
  - Built-in Web Audio API ambient harp synthesizer fallback if MP3 is absent.
- **Personalized Guest Greetings**:
  - Supports `?guest=Suresh%20%26%20Family` in the URL to display a personalized welcome banner.

---

## 📁 Project Structure

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
│       ├── hero-couple.jpg      # Hero couple portrait (1080 × 1920, 9:16)
│       ├── groom-vineeth.jpg    # Groom portrait (800 × 1000, 4:5)
│       ├── bride-alida.jpg      # Bride portrait (800 × 1000, 4:5)
│       ├── moment-1.jpg         # Moment photograph 1 (1080 × 1350, 4:5)
│       ├── moment-2.jpg         # Moment photograph 2 (1080 × 1350, 4:5)
│       ├── moment-3.jpg         # Moment photograph 3 (1080 × 1350, 4:5)
│       ├── group-photo.jpg      # Optional group photo (1600 × 900, 16:9)
│       └── og-wedding.jpg       # WhatsApp preview image (1200 × 630 px)
└── src/
    ├── App.tsx                  # Main app coordinator
    ├── main.tsx                 # React entry point
    ├── index.css                # Global styles, safe-area insets & scrollbars
    ├── config/
    │   └── weddingConfig.ts     # ⭐ SINGLE FILE TO EDIT ALL WEDDING DETAILS
    ├── components/
    │   ├── OpeningCard.tsx      # Mobile-first wax-seal opening card
    │   ├── Navbar.tsx           # Floating header with monogram & audio controls
    │   ├── GuestGreeting.tsx    # Personalized guest greeting banner
    │   ├── CoupleSection.tsx    # Couple portraits, family note & Dubai ✈ Kerala
    │   ├── ReceptionSection.tsx # Central reception details, maps & countdown
    │   ├── MomentsSection.tsx   # Photo carousel & memory cards
    │   ├── WishesSection.tsx    # WhatsApp blessing sender & confetti
    │   ├── WeddingImage.tsx     # Resilient image component with SVG fallback
    │   ├── FloatingControls.tsx # Mobile floating directions & audio
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
3. Test the wax seal opening experience, audio toggle, and WhatsApp wishes directly on mobile!

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

### 2. Replace Placeholder Photos
Place your actual photos into the `public/images/` directory using these filenames:
- **`hero-couple.jpg`**: Vertical couple portrait (`1080 × 1920 px`, 9:16).
- **`groom-vineeth.jpg`**: Groom portrait (`800 × 1000 px`, 4:5).
- **`bride-alida.jpg`**: Bride portrait (`800 × 1000 px`, 4:5).
- **`moment-1.jpg`**, **`moment-2.jpg`**, **`moment-3.jpg`**: Carousel photos (`1080 × 1350 px`, 4:5).
- **`og-wedding.jpg`**: WhatsApp preview banner (`1200 × 630 px`, landscape).

> **Note**: Even if you haven't uploaded images yet, the application gracefully renders high-aesthetic gold and botanical monograms so the site never looks broken!

### 3. Add Custom Background Music
Place any romantic acoustic or instrumental MP3 file into:
```text
public/audio/wedding-bgm.mp3
```
If you don't provide an MP3, the built-in Web Audio API will play a gentle ambient acoustic harp arpeggio automatically whenever the guest taps to play music.

---

## 💌 Guest Personalization (`?guest=...`)

You can create personalized WhatsApp invitation links for individual guests or families:
```text
https://your-domain.vercel.app/?guest=Suresh%20%26%20Family
https://your-domain.vercel.app/?guest=Rahul%20%26%20Priya
https://your-domain.vercel.app/?guest=Uncle%20Thomas
```
When the guest opens their link:
1. The opening card features a personalized ribbon: *"For Suresh & Family"*.
2. The top of the invitation displays: *"Cordially Welcoming Suresh & Family"*.
3. The WhatsApp wishes form automatically fills in their name!

If no parameter is passed (`https://your-domain.vercel.app/`), it falls back to: *"Cordially Welcoming You & Your Family"*.

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

## 📱 WhatsApp Link-Preview Setup & Troubleshooting

When you share your website link in WhatsApp, WhatsApp crawls the page to show an image card, title, and description.

### How WhatsApp Previews Work:
- WhatsApp requires the link to be served over **HTTPS** (Vercel provides free HTTPS automatically).
- The preview image is configured in `index.html` as `public/images/og-wedding.jpg` with standard Open Graph tags (`og:title`, `og:description`, `og:image`).
- The recommended dimensions are **`1200 × 630 px`** (1.91:1 aspect ratio) and less than 300 KB for rapid mobile caching.

### WhatsApp Cache Refresh:
If you updated the preview image after testing:
1. WhatsApp caches link previews aggressively.
2. To test the latest preview, append a cache-buster query parameter when pasting into WhatsApp:
   ```text
   https://your-domain.vercel.app/?v=2
   ```
3. You can also inspect Open Graph tags using the free [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or [OpenGraph.xyz](https://www.opengraph.xyz/).

---

## ✅ Final Testing & Quality Checklist

Before sharing with guests, verify the following:

- [x] **Mobile Viewport Fit**: The opening screen fits within 100dvh on iPhone SE, iPhone 13/14/15, and Android without horizontal or vertical scrolling.
- [x] **Wax Seal Interaction**: Tapping the wax seal or "Open Invitation" button smoothly unfolds the invitation.
- [x] **Palette Contrast**: Text is dark charcoal (`#282B2A`) on warm pearl (`#FFF9F1`) with high readability.
- [x] **Directions Link**: Tapping "Get Directions" opens Google Maps to the exact venue in Kochi.
- [x] **Calendar**: "Add to Calendar" opens Google Calendar or downloads `.ics` for Apple Calendar.
- [x] **Countdown Timer**: Displays Days, Hours, Minutes, Seconds with live countdown to the reception date.
- [x] **Moments Carousel**: Photos can be navigated using arrows or dots.
- [x] **WhatsApp Wishes**: Tapping "Send Wishes via WhatsApp" triggers confetti and opens WhatsApp with a pre-formatted message.
- [x] **Audio Playback**: Music never autoplays; starts only on explicit user click, with visible floating pause/play controls.
- [x] **Zero Broken Assets**: If custom images or audio are pending, graceful vector fallbacks and Web Audio API synthesis ensure a flawless experience.
- [x] **Production Build**: Clean compilation with `npm run build` and zero TypeScript warnings.
