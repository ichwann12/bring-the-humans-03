// bring-the-humans-03: the program copies VIDEO.json to the output folder.
// The video itself is the entry; the house reads its views from TikTok.
// Local run: mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The entry is only valid when VIDEO.json names a TikTok video address, so
// refuse a placeholder or a malformed file here instead of shipping it.
const videoPath = join(botDir, 'VIDEO.json');
let videoUrl: unknown;
try {
  videoUrl = JSON.parse(readFileSync(videoPath, 'utf8')).url;
} catch (error) {
  console.error(`VIDEO.json could not be read from ${botDir}: ${(error as Error).message}`);
  process.exit(1);
}
if (typeof videoUrl !== 'string' || !/^https:\/\/(www\.|m\.)?tiktok\.com\/@[^/]+\/video\/[0-9]+/.test(videoUrl)) {
  console.error(`VIDEO.json does not name a TikTok video address: ${String(videoUrl)}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
try {
  copyFileSync(videoPath, join(outDir, 'VIDEO.json'));
} catch (error) {
  console.error(`Could not copy VIDEO.json from ${botDir}: ${(error as Error).message}`);
  process.exit(1);
}
