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
  // A real PNG needs room for the signature, a full IHDR chunk and an
  // IEND trailer; anything shorter cannot be checked, so reject it
  // outright instead of reading past the end of the buffer.
  if (bytes.length < 45) {
    throw new Error(
      `asset/entry.png is only ${bytes.length} bytes, too short to be a PNG`,
    );
  }
  if (!bytes.subarray(0, 8).equals(PNG_MAGIC)) {
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
  // The width and height above only mean something if the first chunk
  // really is IHDR, so read its four-letter label instead of trusting
  // the offsets blindly.
  if (bytes.subarray(12, 16).toString("ascii") !== "IHDR") {
    throw new Error("asset/entry.png has no IHDR chunk after the signature");
  }
  // A truncated download still starts with a valid header, so require
  // the file to close with a proper IEND chunk as well.
  const tail = bytes.subarray(bytes.length - 12);
  if (
    tail.readUInt32BE(0) !== 0 ||
    tail.subarray(4, 8).toString("ascii") !== "IEND"
  ) {
    throw new Error("asset/entry.png is missing its IEND trailer");
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
