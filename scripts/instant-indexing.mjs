/**
 * Google Instant Indexing — Studio Livel
 * Service account: studio@studiointeligente.iam.gserviceaccount.com
 *
 * Uso:
 *   node scripts/instant-indexing.mjs            → envia todas as URLs
 *   node scripts/instant-indexing.mjs --dry-run  → lista URLs sem enviar
 *   node scripts/instant-indexing.mjs --url https://www.studiotreinointeligente.com.br/blog/slug/
 *
 * Pré-requisito: arquivo service-account.json na raiz do projeto
 * Quota Google: 200 requisições/dia por projeto
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { GoogleAuth } from 'google-auth-library';
import { argv } from 'process';

const SITE = 'https://www.studiotreinointeligente.com.br';
const __dirname = dirname(fileURLToPath(import.meta.url));
const KEY_FILE = resolve(__dirname, '..', 'service-account.json');
const API_ENDPOINT = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
const SCOPES = ['https://www.googleapis.com/auth/indexing'];

// Delay entre requisições para evitar rate limit
const DELAY_MS = 500;

// URLs estáticas do site (espelho do sitemap.xml.ts)
const STATIC_URLS = [
  `${SITE}/`,
  `${SITE}/modalidades/`,
  `${SITE}/quem-somos/`,
  `${SITE}/metodo-livel/`,
  `${SITE}/planos/`,
  `${SITE}/aula-avaliacao/`,
  `${SITE}/contato/`,
  `${SITE}/blog/`,
  `${SITE}/pilates/`,
  `${SITE}/musculacao/`,
  `${SITE}/treino-funcional/`,
  `${SITE}/yoga/`,
  `${SITE}/krav-maga/`,
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseArgs() {
  const args = argv.slice(2);
  return {
    dryRun: args.includes('--dry-run'),
    url: args.includes('--url') ? args[args.indexOf('--url') + 1] : null,
    deleted: args.includes('--deleted'),
  };
}

async function getAuthClient() {
  if (!existsSync(KEY_FILE)) {
    console.error('[ERRO] service-account.json nao encontrado na raiz do projeto.');
    console.error('       Baixe em: Google Cloud Console > IAM > Contas de servico > Chaves > Adicionar chave JSON');
    process.exit(1);
  }

  const auth = new GoogleAuth({
    keyFile: KEY_FILE,
    scopes: SCOPES,
  });

  return auth.getClient();
}

async function notifyUrl(client, url, type = 'URL_UPDATED') {
  const body = JSON.stringify({ url, type });

  try {
    const res = await client.request({
      url: API_ENDPOINT,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: body,
    });

    return { url, status: res.status, ok: true };
  } catch (err) {
    const status = err.response?.status ?? 'ERR';
    const message = err.response?.data?.error?.message ?? err.message;
    return { url, status, ok: false, message };
  }
}

async function main() {
  const { dryRun, url: singleUrl, deleted } = parseArgs();
  const type = deleted ? 'URL_DELETED' : 'URL_UPDATED';

  const urls = singleUrl ? [singleUrl] : STATIC_URLS;

  console.log('=== Google Instant Indexing — Studio Livel ===');
  console.log(`Tipo: ${type}`);
  console.log(`URLs: ${urls.length}`);
  if (dryRun) console.log('[DRY RUN] Nenhuma requisicao sera enviada.\n');
  console.log('');

  if (dryRun) {
    urls.forEach((u, i) => console.log(`  ${i + 1}. ${u}`));
    console.log('\nRemova --dry-run para enviar.');
    return;
  }

  const client = await getAuthClient();

  let ok = 0;
  let fail = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    process.stdout.write(`[${i + 1}/${urls.length}] ${url} ... `);

    const result = await notifyUrl(client, url, type);

    if (result.ok) {
      console.log(`OK (${result.status})`);
      ok++;
    } else {
      console.log(`FALHOU (${result.status}) — ${result.message}`);
      fail++;
    }

    if (i < urls.length - 1) await sleep(DELAY_MS);
  }

  console.log('');
  console.log(`=== Resultado: ${ok} OK | ${fail} falhas ===`);

  if (fail > 0) process.exit(1);
}

main();
