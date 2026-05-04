/**
 * Divide parágrafos longos em 2.
 * Regra: > 420 chars → busca ponto no terço central e divide.
 * Nao reescreve texto, apenas insere </p><p> no ponto natural.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT = path.join(__dirname, '../src/content');
const MAX_CHARS = 420; // ~4 linhas em tablet 768px

function splitParagraphs(text) {
  let changed = 0;

  // Encontra <p>...</p> com conteudo longo (exceto .summarization)
  const result = text.replace(/<p(?!(?:[^>]*class="summarization")[^>]*)>([\s\S]{420,}?)<\/p>/g, (match, inner) => {
    // Ignorar paragrafos com tags HTML internas complexas (table, ul, etc.)
    if (/<(?:table|ul|ol|h[1-6]|details)/i.test(inner)) return match;

    const len = inner.length;
    const start = Math.floor(len * 0.30);
    const end   = Math.floor(len * 0.70);

    // Verifica se posicao esta dentro de uma tag HTML aberta
    function isInsideTag(text, pos) {
      const before = text.slice(0, pos);
      // Conta tags abertas vs fechadas de inline elements
      const openTags  = (before.match(/<(?:strong|em|a|span|b|i)[^>]*>/gi) || []).length;
      const closeTags = (before.match(/<\/(?:strong|em|a|span|b|i)>/gi) || []).length;
      return openTags !== closeTags;
    }

    // Busca ". " (ponto + espaco) no terco central — fora de tags abertas
    let splitIdx = -1;
    for (let i = start; i <= end; i++) {
      if (inner[i] === '.' && inner[i + 1] === ' ' && inner[i + 2] !== undefined) {
        const before = inner[i - 1];
        if (before && /[a-zA-ZÀ-ÿ]/.test(before) && !/\d/.test(inner.slice(Math.max(0,i-3),i))) {
          if (!isInsideTag(inner, i)) {
            splitIdx = i + 1;
            break;
          }
        }
      }
    }

    // Fallback: busca ", " se nao achou ponto (parágrafos muito densos)
    if (splitIdx === -1 && len > 600) {
      for (let i = start; i <= end; i++) {
        if (inner[i] === ',' && inner[i + 1] === ' ') {
          splitIdx = i + 1;
          break;
        }
      }
    }

    if (splitIdx === -1) return match; // nao achou ponto natural — mantem

    const part1 = inner.slice(0, splitIdx).trim();
    const part2 = inner.slice(splitIdx).trim();

    if (part1.length < 80 || part2.length < 80) return match; // partes muito pequenas

    changed++;
    return `<p>${part1}</p>\n\n<p>${part2}</p>`;
  });

  return { result, changed };
}

// Processa todas as colecoes
const collections = ['pilates','musculacao','funcional','yoga','krav-maga','tier0','tier2','outer'];
let totalFiles = 0;
let totalSplits = 0;

for (const col of collections) {
  const dir = path.join(CONTENT, col);
  if (!fs.existsSync(dir)) continue;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    const raw = fs.readFileSync(filePath, 'utf8');

    // So processa o corpo (apos o frontmatter)
    const fmEnd = raw.indexOf('\n---\n', 4);
    if (fmEnd === -1) continue;

    const frontmatter = raw.slice(0, fmEnd + 5);
    const body = raw.slice(fmEnd + 5);

    const { result, changed } = splitParagraphs(body);

    if (changed > 0) {
      fs.writeFileSync(filePath, frontmatter + result, 'utf8');
      console.log(`  v ${col}/${file}: ${changed} paragrafo(s) dividido(s)`);
      totalSplits += changed;
      totalFiles++;
    }
  }
}

console.log(`\nConcluido: ${totalFiles} arquivos, ${totalSplits} paragrafos divididos.`);
