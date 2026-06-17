import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = 'C:/Users/User/Downloads/studioboxfuncional-imagens/Fotos-Studio-Box-28-scaled-r8qyaevrnat4mpc1ouzhb4c82p4jgdys7964fu8qzk.png';
const OUT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images', 'modalidades');
const BASE = 'funcional-studiobox';
const WIDTHS = [400, 800, 1200];

const meta = await sharp(SRC).metadata();
console.log(`Origem: ${meta.width}x${meta.height} (${meta.format})`);

// Base (largura 1200, mesma usada como fallback principal)
const baseInput = () => sharp(SRC).resize({ width: 1200, withoutEnlargement: true });

// Base .webp e .avif
await baseInput().webp({ quality: 80 }).toFile(path.join(OUT_DIR, `${BASE}.webp`));
await baseInput().avif({ quality: 55 }).toFile(path.join(OUT_DIR, `${BASE}.avif`));
console.log(`OK base: ${BASE}.webp / ${BASE}.avif`);

// Variantes responsivas
for (const w of WIDTHS) {
  await sharp(SRC).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(OUT_DIR, `${BASE}-${w}w.webp`));
  await sharp(SRC).resize({ width: w, withoutEnlargement: true }).avif({ quality: 55 }).toFile(path.join(OUT_DIR, `${BASE}-${w}w.avif`));
  console.log(`OK ${w}w: ${BASE}-${w}w.webp / ${BASE}-${w}w.avif`);
}

console.log('Concluido. Saida em:', OUT_DIR);
