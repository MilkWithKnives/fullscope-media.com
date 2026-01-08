#!/usr/bin/env node
/**
 * Fetches fresh placeholder images for the site so you can swap in real photos later.
 * Uses picsum.photos (no API key). Adjust the `sets` array to change sizes/counts.
 *
 * Usage (from repo root or /opt/fullscope):
 *   node scripts/fetch-placeholders.mjs
 *
 * Images will be written to: static/assets/placeholders/<setName>/<index>.jpg
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';

const sets = [
	{ name: 'portfolio-wide', width: 1600, height: 900, count: 8 },
	{ name: 'portfolio-tall', width: 1200, height: 1600, count: 4 },
	{ name: 'team', width: 600, height: 600, count: 6 },
	{ name: 'studio', width: 1800, height: 1000, count: 3 }
];

const outputRoot = join(process.cwd(), 'static', 'assets', 'placeholders');

async function fetchImage(url) {
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`Failed to fetch ${url} (${res.status})`);
	}
	return new Uint8Array(await res.arrayBuffer());
}

async function main() {
	for (const set of sets) {
		const dir = join(outputRoot, set.name);
		await mkdir(dir, { recursive: true });

		for (let i = 1; i <= set.count; i++) {
			// Use a UUID seed so each run produces fresh imagery
			const seed = `${set.name}-${i}-${randomUUID()}`;
			const url = `https://picsum.photos/seed/${seed}/${set.width}/${set.height}`;
			const filePath = join(dir, `${i}.jpg`);

			process.stdout.write(`Downloading ${url} -> ${filePath}\n`);
			const data = await fetchImage(url);
			await writeFile(filePath, data);
		}
	}

	process.stdout.write('\nDone. Point your images to /assets/placeholders/<set>/<file>.jpg\n');
}

main().catch((err) => {
	console.error(err);
	process.exitCode = 1;
});
