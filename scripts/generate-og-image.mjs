import { writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alida & Vineeth — Wedding Invitation Card</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html, body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      background: #0B1325;
      font-family: 'Cormorant Garamond', Georgia, serif;
      -webkit-font-smoothing: antialiased;
    }
    .canvas {
      position: relative;
      width: 1200px;
      height: 630px;
      background: radial-gradient(circle at 50% 45%, #162B66 0%, #0F1D47 48%, #070D21 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 40px;
    }

    /* Minimalist luxury gold border */
    .frame-border {
      position: absolute;
      inset: 26px;
      border: 1px solid rgba(212, 163, 89, 0.4);
      border-radius: 16px;
      pointer-events: none;
    }
    .frame-border-inner {
      position: absolute;
      inset: 34px;
      border: 1px solid rgba(240, 212, 158, 0.18);
      border-radius: 10px;
      pointer-events: none;
    }
    .corner-tick {
      position: absolute;
      width: 24px;
      height: 24px;
      border-color: #D4AF37;
      pointer-events: none;
    }
    .corner-tl { top: 40px; left: 40px; border-top: 2px solid; border-left: 2px solid; }
    .corner-tr { top: 40px; right: 40px; border-top: 2px solid; border-right: 2px solid; }
    .corner-bl { bottom: 40px; left: 40px; border-bottom: 2px solid; border-left: 2px solid; }
    .corner-br { bottom: 40px; right: 40px; border-bottom: 2px solid; border-right: 2px solid; }

    /* Top event badge */
    .header-badge {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: #D4AF37;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .header-badge-line {
      width: 36px;
      height: 1px;
      background: linear-gradient(90deg, transparent, #D4AF37, transparent);
    }

    /* Modern Monogram Circle Emblem */
    .monogram-emblem {
      margin-bottom: 14px;
      filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.6));
    }

    /* Couple Names */
    .names {
      font-size: 72px;
      font-weight: 500;
      color: #FAF6F0;
      letter-spacing: 0.01em;
      line-height: 1.05;
      text-shadow: 0 4px 24px rgba(0, 0, 0, 0.85);
      margin-bottom: 10px;
    }
    .names .amp {
      font-family: 'Great Vibes', cursive;
      font-weight: 400;
      font-size: 64px;
      color: #E5C158;
      padding: 0 10px;
    }

    /* Delicate divider line with gold star */
    .divider {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 12px;
    }
    .divider-line {
      width: 110px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(212, 163, 89, 0.65), transparent);
    }
    .divider-diamond {
      color: #E5C158;
      font-size: 13px;
    }

    /* Date and Destination */
    .date {
      font-size: 28px;
      font-weight: 600;
      font-style: italic;
      color: #E5C158;
      letter-spacing: 0.04em;
      text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
      margin-bottom: 6px;
    }
    .venue {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: rgba(240, 212, 158, 0.88);
      letter-spacing: 0.22em;
      text-transform: uppercase;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
      margin-bottom: 10px;
    }

    /* Subtle footer */
    .family-note {
      font-size: 17px;
      font-style: italic;
      color: rgba(250, 246, 240, 0.65);
      letter-spacing: 0.05em;
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="frame-border"></div>
    <div class="frame-border-inner"></div>
    <div class="corner-tick corner-tl"></div>
    <div class="corner-tick corner-tr"></div>
    <div class="corner-tick corner-bl"></div>
    <div class="corner-tick corner-br"></div>

    <!-- Header Badge -->
    <div class="header-badge">
      <span class="header-badge-line"></span>
      <span>The Wedding Reception</span>
      <span class="header-badge-line"></span>
    </div>

    <!-- Modern Minimalist Monogram Emblem -->
    <div class="monogram-emblem">
      <svg width="180" height="110" viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#C89D54" />
            <stop offset="50%" stop-color="#F5E2B8" />
            <stop offset="100%" stop-color="#D4A359" />
          </linearGradient>
          <filter id="monogramGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Outer Double Circular Crest -->
        <circle cx="120" cy="70" r="58" stroke="url(#goldGradient)" stroke-width="1.2" stroke-opacity="0.45" fill="none" />
        <circle cx="120" cy="70" r="52" stroke="url(#goldGradient)" stroke-width="0.8" stroke-dasharray="3 3" stroke-opacity="0.35" fill="none" />

        <!-- Botanical Laurel Accents -->
        <path d="M 52 70 Q 55 50 68 38 Q 62 52 64 70" stroke="url(#goldGradient)" stroke-width="1.2" fill="none" stroke-linecap="round" />
        <path d="M 52 70 Q 55 90 68 102 Q 62 88 64 70" stroke="url(#goldGradient)" stroke-width="1.2" fill="none" stroke-linecap="round" />
        <path d="M 188 70 Q 185 50 172 38 Q 178 52 176 70" stroke="url(#goldGradient)" stroke-width="1.2" fill="none" stroke-linecap="round" />
        <path d="M 188 70 Q 185 90 172 102 Q 178 88 176 70" stroke="url(#goldGradient)" stroke-width="1.2" fill="none" stroke-linecap="round" />

        <!-- Monogram Letter A -->
        <text x="96" y="85" text-anchor="middle" font-size="52" font-weight="600" fill="url(#goldGradient)" font-family="'Cormorant Garamond', Georgia, serif" filter="url(#monogramGlow)">A</text>
        
        <!-- Ampersand -->
        <text x="120" y="80" text-anchor="middle" font-size="36" font-weight="400" fill="#F0D49E" font-family="'Great Vibes', cursive" filter="url(#monogramGlow)">&amp;</text>
        
        <!-- Monogram Letter V -->
        <text x="144" y="85" text-anchor="middle" font-size="52" font-weight="600" fill="url(#goldGradient)" font-family="'Cormorant Garamond', Georgia, serif" filter="url(#monogramGlow)">V</text>
      </svg>
    </div>

    <!-- Couple Names -->
    <h1 class="names">
      Alida <span class="amp">&amp;</span> Vineeth
    </h1>

    <!-- Divider -->
    <div class="divider">
      <div class="divider-line"></div>
      <span class="divider-diamond">✦</span>
      <div class="divider-line"></div>
    </div>

    <!-- Date & Time -->
    <div class="date">
      Thursday, 7 January 2027 • 5:30 PM
    </div>

    <!-- Venue & Location -->
    <div class="venue">
      Kariyilakallu Lake View • Paravoor, Kerala
    </div>

    <!-- Family note -->
    <div class="family-note">
      Together with our families, we cordially invite you
    </div>
  </div>
</body>
</html>`;

const tempHtmlPath = '/tmp/og-simple-template.html';
const outputPngPath = resolve(rootDir, 'public/og-image-letter.png');
const sapphirePngPath = resolve(rootDir, 'public/og-image-sapphire.png');
const outputJpgPath = resolve(rootDir, 'public/og-image-letter.jpg');
const sapphireJpgPath = resolve(rootDir, 'public/og-image-sapphire.jpg');
const legacyJpgPath = resolve(rootDir, 'public/images/og-invitation.jpg');
const legacyWeddingJpgPath = resolve(rootDir, 'public/images/og-wedding.jpg');

writeFileSync(tempHtmlPath, htmlContent, 'utf-8');

const chromeBin = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const cmd = `"${chromeBin}" --headless --disable-gpu --screenshot="${outputPngPath}" --window-size=1200,630 "file://${tempHtmlPath}"`;

console.log('Rendering modern, simple 1200x630 OG image...');
execSync(cmd, { stdio: 'inherit' });

console.log('Generated:', outputPngPath);

// Compress with python zlib level 9 to keep under 300KB
execSync(`python3 -c "
import struct, zlib
with open('${outputPngPath}', 'rb') as f:
    data = f.read()
pos = 8
chunks, idat_data = [], []
while pos < len(data):
    length = struct.unpack('>I', data[pos:pos+4])[0]
    ctype = data[pos+4:pos+8]
    cdata = data[pos+8:pos+8+length]
    pos += 12 + length
    if ctype == b'IDAT': idat_data.append(cdata)
    elif ctype == b'IEND': break
    else: chunks.append((ctype, cdata))
compressed = zlib.compress(zlib.decompress(b''.join(idat_data)), 9)
out = bytearray(b'\\\\x89PNG\\\\r\\\\n\\\\x1a\\\\n')
for ctype, cdata in chunks:
    out.extend(struct.pack('>I', len(cdata)) + ctype + cdata + struct.pack('>I', zlib.crc32(ctype + cdata) & 0xffffffff))
out.extend(struct.pack('>I', len(compressed)) + b'IDAT' + compressed + struct.pack('>I', zlib.crc32(b'IDAT' + compressed) & 0xffffffff))
out.extend(struct.pack('>I', 0) + b'IEND' + struct.pack('>I', zlib.crc32(b'IEND') & 0xffffffff))
with open('${outputPngPath}', 'wb') as f: f.write(out)
with open('${sapphirePngPath}', 'wb') as f: f.write(out)
"`);

// Generate JPEGs for fastest WhatsApp link unfurling across all asset names
try {
  execSync(`sips -s format jpeg "${outputPngPath}" --out "${outputJpgPath}"`, { stdio: 'inherit' });
  execSync(`sips -s format jpeg "${outputPngPath}" --out "${sapphireJpgPath}"`, { stdio: 'inherit' });
  execSync(`sips -s format jpeg "${outputPngPath}" --out "${legacyJpgPath}"`, { stdio: 'inherit' });
  execSync(`sips -s format jpeg "${outputPngPath}" --out "${legacyWeddingJpgPath}"`, { stdio: 'inherit' });
  console.log('Updated JPEGs:', outputJpgPath, sapphireJpgPath, legacyJpgPath, legacyWeddingJpgPath);
} catch (e) {
  console.warn(e.message);
}
