const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Generate an elegant, decorative BMP image and convert it via sips
function createWeddingPlaceholder(filename, width, height, theme = 'green') {
  // To keep processing fast, generate a 400xScaled version and sips scales or we generate at reasonable size
  const w = Math.min(width, 400);
  const h = Math.round((height / width) * w);

  const rowSize = Math.floor((24 * w + 31) / 32) * 4;
  const pixelArraySize = rowSize * h;
  const fileSize = 54 + pixelArraySize;
  const buf = Buffer.alloc(fileSize);

  // BMP Header
  buf.write('BM');
  buf.writeUInt32LE(fileSize, 2);
  buf.writeUInt32LE(54, 10);
  buf.writeUInt32LE(40, 14);
  buf.writeInt32LE(w, 18);
  buf.writeInt32LE(h, 22);
  buf.writeUInt16LE(1, 26);
  buf.writeUInt16LE(24, 28);
  buf.writeUInt32LE(pixelArraySize, 34);

  // Palette colors (BGR)
  const colors = {
    // Deep Botanical Green
    green: { b: 0x4B, g: 0x5B, r: 0x31 },
    // Soft Champagne
    champagne: { b: 0xD8, g: 0xE8, r: 0xF4 },
    // Antique Gold
    gold: { b: 0x45, g: 0x8A, r: 0xB8 },
    // Warm Pearl
    pearl: { b: 0xF1, g: 0xF9, r: 0xFF },
  };

  const base = colors[theme] || colors.green;
  const gold = colors.gold;

  for (let y = 0; y < h; y++) {
    const isBorder = y < 8 || y >= h - 8;
    for (let x = 0; x < w; x++) {
      const isColBorder = x < 8 || x >= w - 8;
      const offset = 54 + y * rowSize + x * 3;

      if (isBorder || isColBorder) {
        // Gold border
        buf[offset] = gold.b;
        buf[offset + 1] = gold.g;
        buf[offset + 2] = gold.r;
      } else {
        // Subtle vertical gradient
        const factor = 0.85 + (0.3 * y) / h;
        buf[offset] = Math.min(255, Math.floor(base.b * factor));
        buf[offset + 1] = Math.min(255, Math.floor(base.g * factor));
        buf[offset + 2] = Math.min(255, Math.floor(base.r * factor));
      }
    }
  }

  const bmpPath = path.join(targetDir, `${filename}.bmp`);
  const jpgPath = path.join(targetDir, `${filename}.jpg`);

  fs.writeFileSync(bmpPath, buf);
  try {
    execSync(`sips -s format jpeg "${bmpPath}" --out "${jpgPath}" > /dev/null 2>&1`);
    fs.unlinkSync(bmpPath);
    console.log(`Created: ${jpgPath}`);
  } catch (err) {
    console.error(`Failed to convert ${filename}:`, err);
  }
}

const assets = [
  { name: 'hero-couple', w: 1080, h: 1920, theme: 'green' },
  { name: 'groom-vineeth', w: 800, h: 1000, theme: 'green' },
  { name: 'bride-alida', w: 800, h: 1000, theme: 'champagne' },
  { name: 'moment-1', w: 1080, h: 1350, theme: 'green' },
  { name: 'moment-2', w: 1080, h: 1350, theme: 'champagne' },
  { name: 'moment-3', w: 1080, h: 1350, theme: 'gold' },
  { name: 'group-photo', w: 1600, h: 900, theme: 'green' },
  { name: 'og-wedding', w: 1200, h: 630, theme: 'green' },
];

assets.forEach((a) => createWeddingPlaceholder(a.name, a.w, a.h, a.theme));
console.log('All image placeholders generated successfully.');
