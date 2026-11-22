// bring-the-humans-03: the program copies VIDEO.json to the output folder.
// The video itself is the entry; the house reads its views from TikTok.
// Local run: mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
try {
  copyFileSync(join(botDir, 'VIDEO.json'), join(outDir, 'VIDEO.json'));
} catch (error) {
  console.error(`Could not copy VIDEO.json from ${botDir}: ${(error as Error).message}`);
  process.exit(1);
}
