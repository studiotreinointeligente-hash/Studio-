/**
 * Converte imagens JPG para AVIF + WebP usando sharp
 * Gera srcset responsivo: 400w, 800w, original
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, '../public/images');

const SIZES = [400, 800, 1200];

async function convertImage(srcPath, destDir, baseName) {
  const img = sharp(srcPath);
  const meta = await img.metadata();
  const results = [];

  for (const w of SIZES) {
    if (meta.width && meta.width < w) continue; // não upscale

    // AVIF
    const avifName = `${baseName}-${w}w.avif`;
    await sharp(srcPath).resize(w).avif({ quality: 72 }).toFile(path.join(destDir, avifName));
    results.push(avifName);

    // WebP
    const webpName = `${baseName}-${w}w.webp`;
    await sharp(srcPath).resize(w).webp({ quality: 82 }).toFile(path.join(destDir, webpName));
    results.push(webpName);
  }

  // Versão full sem resize (AVIF + WebP)
  await sharp(srcPath).avif({ quality: 72 }).toFile(path.join(destDir, `${baseName}.avif`));
  await sharp(srcPath).webp({ quality: 82 }).toFile(path.join(destDir, `${baseName}.webp`));
  results.push(`${baseName}.avif`, `${baseName}.webp`);

  return results;
}

async function run() {
  const dirs = [
    { src: path.join(PUBLIC, 'banner'),  dest: path.join(PUBLIC, 'banner') },
    { src: path.join(PUBLIC, 'galeria'), dest: path.join(PUBLIC, 'galeria') },
    { src: path.join(PUBLIC, 'logos'),   dest: path.join(PUBLIC, 'logos') },
  ];

  let converted = 0;
  const errors = [];

  for (const { src, dest } of dirs) {
    if (!fs.existsSync(src)) continue;
    const files = fs.readdirSync(src).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

    for (const file of files) {
      const srcPath = path.join(src, file);
      const baseName = path.basename(file, path.extname(file))
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      try {
        await convertImage(srcPath, dest, baseName);
        console.log(`  v ${path.relative(PUBLIC, src)}/${file} -> AVIF + WebP`);
        converted++;
      } catch (e) {
        console.error(`  x Erro em ${file}: ${e.message}`);
        errors.push(file);
      }
    }
  }

  // Copiar SVGs dos selos como WebP fallback (na verdade SVG é vetorial, deixamos como .svg)
  // Criar versão .webp dos logos PNG para uso no footer
  const selosDir = path.join(PUBLIC, 'selos');
  if (fs.existsSync(selosDir)) {
    const pngs = fs.readdirSync(selosDir).filter(f => f.endsWith('.png'));
    for (const f of pngs) {
      const base = path.basename(f, '.png').toLowerCase().replace(/\s+/g, '-');
      try {
        await sharp(path.join(selosDir, f)).webp({ quality: 90 }).toFile(path.join(selosDir, `${base}.webp`));
        console.log(`  v selos/${f} -> ${base}.webp`);
        converted++;
      } catch (e) {
        console.error(`  x selos/${f}: ${e.message}`);
      }
    }
  }

  console.log(`\n OK: ${converted} convertidas | ${errors.length} erros`);
}

run();
