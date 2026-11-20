// news-image-20261120 — write the day's front page to the output folder.
//
// The front page is already drawn and stored in this repo as
// asset/entry.png: a newspaper page for Friday 20 November 2026.
// All this program does is place that finished image at
// <output>/entry.png. It touches no network, reads no clock and
// rolls no dice, so run one and run two produce identical bytes.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PNG_MAGIC = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);
const MAX_BYTES = 1024 * 1024;
const SIDE = 1024;

const here = new URL(".", import.meta.url).pathname;
const source = join(here, "asset", "entry.png");

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outputDir, "entry.png");

function checkImage(bytes) {
  if (bytes.length === 0 || !bytes.subarray(0, 8).equals(PNG_MAGIC)) {
    throw new Error("asset/entry.png does not start with a PNG signature");
  }
  if (bytes.length > MAX_BYTES) {
    throw new Error(
      `asset/entry.png is ${bytes.length} bytes, above the 1 MiB cap`,
    );
  }
  const w = bytes.readUInt32BE(16);
  const h = bytes.readUInt32BE(20);
  if (w !== SIDE || h !== SIDE) {
    throw new Error(`asset/entry.png is ${w}x${h}, expected 1024x1024`);
  }
  return { w, h };
}

const image = readFileSync(source);
const { w, h } = checkImage(image);

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}
writeFileSync(target, image);

// Read the file back and compare it with the asset: a short write
// would still leave a file behind, so only a byte-equal copy counts.
const written = readFileSync(target);
if (!written.equals(image)) {
  throw new Error("entry.png on disk differs from asset/entry.png");
}

console.log(`wrote ${target} (${written.length} bytes, ${w}x${h})`);
