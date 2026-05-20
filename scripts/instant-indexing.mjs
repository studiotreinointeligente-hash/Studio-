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

// Todas as URLs do site (estáticas + dinâmicas dos content collections)
const ALL_URLS = [
  // Páginas estáticas
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
  `${SITE}/privacidade/`,
  `${SITE}/termos/`,
  // Pilates — bairros
  `${SITE}/pilates-em-alto-barroca/`,
  `${SITE}/pilates-em-barro-preto/`,
  `${SITE}/pilates-em-barroca/`,
  `${SITE}/pilates-em-belo-horizonte/`,
  `${SITE}/pilates-em-caicara/`,
  `${SITE}/pilates-em-calafate/`,
  `${SITE}/pilates-em-california/`,
  `${SITE}/pilates-em-carlos-prates/`,
  `${SITE}/pilates-em-gutierrez/`,
  `${SITE}/pilates-em-nova-suica/`,
  `${SITE}/pilates-em-padre-eustaquio/`,
  `${SITE}/pilates-em-prado/`,
  `${SITE}/pilates-em-santo-agostinho/`,
  // Pilates — hub
  `${SITE}/o-que-e-pilates/`,
  `${SITE}/pilates-para-coluna/`,
  `${SITE}/pilates-para-gestantes/`,
  `${SITE}/pilates-para-idosos/`,
  `${SITE}/pilates-pos-cirurgico/`,
  `${SITE}/pilates-vs-musculacao/`,
  `${SITE}/pilates-vs-yoga/`,
  // Musculação — bairros
  `${SITE}/musculacao-em-alto-barroca/`,
  `${SITE}/musculacao-em-barro-preto/`,
  `${SITE}/musculacao-em-barroca/`,
  `${SITE}/musculacao-em-belo-horizonte/`,
  `${SITE}/musculacao-em-caicara/`,
  `${SITE}/musculacao-em-calafate/`,
  `${SITE}/musculacao-em-california/`,
  `${SITE}/musculacao-em-carlos-prates/`,
  `${SITE}/musculacao-em-gutierrez/`,
  `${SITE}/musculacao-em-nova-suica/`,
  `${SITE}/musculacao-em-padre-eustaquio/`,
  `${SITE}/musculacao-em-prado/`,
  `${SITE}/musculacao-em-santo-agostinho/`,
  // Musculação — hub
  `${SITE}/o-que-e-musculacao/`,
  `${SITE}/musculacao-feminina/`,
  `${SITE}/musculacao-para-atletas/`,
  `${SITE}/musculacao-para-emagrecimento/`,
  `${SITE}/musculacao-para-idosos/`,
  `${SITE}/musculacao-para-iniciantes/`,
  `${SITE}/musculacao-vs-crossfit/`,
  `${SITE}/periodizacao-em-musculacao/`,
  // Funcional — bairros
  `${SITE}/treino-funcional-em-alto-barroca/`,
  `${SITE}/treino-funcional-em-barro-preto/`,
  `${SITE}/treino-funcional-em-barroca/`,
  `${SITE}/treino-funcional-em-belo-horizonte/`,
  `${SITE}/treino-funcional-em-caicara/`,
  `${SITE}/treino-funcional-em-calafate/`,
  `${SITE}/treino-funcional-em-california/`,
  `${SITE}/treino-funcional-em-carlos-prates/`,
  `${SITE}/treino-funcional-em-gutierrez/`,
  `${SITE}/treino-funcional-em-nova-suica/`,
  `${SITE}/treino-funcional-em-padre-eustaquio/`,
  `${SITE}/treino-funcional-em-prado/`,
  `${SITE}/treino-funcional-em-santo-agostinho/`,
  // Funcional — hub
  `${SITE}/o-que-e-treino-funcional/`,
  `${SITE}/fitbox/`,
  `${SITE}/treino-funcional-emagrecimento/`,
  `${SITE}/treino-funcional-vs-crossfit/`,
  // Yoga — bairros
  `${SITE}/yoga-em-alto-barroca/`,
  `${SITE}/yoga-em-barro-preto/`,
  `${SITE}/yoga-em-barroca/`,
  `${SITE}/yoga-em-belo-horizonte/`,
  `${SITE}/yoga-em-caicara/`,
  `${SITE}/yoga-em-calafate/`,
  `${SITE}/yoga-em-california/`,
  `${SITE}/yoga-em-carlos-prates/`,
  `${SITE}/yoga-em-gutierrez/`,
  `${SITE}/yoga-em-nova-suica/`,
  `${SITE}/yoga-em-padre-eustaquio/`,
  `${SITE}/yoga-em-prado/`,
  `${SITE}/yoga-em-santo-agostinho/`,
  // Yoga — hub
  `${SITE}/o-que-e-yoga/`,
  `${SITE}/tipos-de-yoga/`,
  `${SITE}/yoga-para-ansiedade/`,
  `${SITE}/yoga-para-flexibilidade/`,
  `${SITE}/yoga-para-idosos/`,
  `${SITE}/yoga-para-iniciantes/`,
  `${SITE}/yoga-vs-meditacao/`,
  // Krav Maga — bairros
  `${SITE}/krav-maga-em-alto-barroca/`,
  `${SITE}/krav-maga-em-barro-preto/`,
  `${SITE}/krav-maga-em-barroca/`,
  `${SITE}/krav-maga-em-belo-horizonte/`,
  `${SITE}/krav-maga-em-caicara/`,
  `${SITE}/krav-maga-em-calafate/`,
  `${SITE}/krav-maga-em-california/`,
  `${SITE}/krav-maga-em-carlos-prates/`,
  `${SITE}/krav-maga-em-gutierrez/`,
  `${SITE}/krav-maga-em-nova-suica/`,
  `${SITE}/krav-maga-em-padre-eustaquio/`,
  `${SITE}/krav-maga-em-prado/`,
  `${SITE}/krav-maga-em-santo-agostinho/`,
  // Krav Maga — hub
  `${SITE}/o-que-e-krav-maga/`,
  `${SITE}/krav-maga-feminino/`,
  `${SITE}/krav-maga-para-iniciantes/`,
  // Academia (outer/tier)
  `${SITE}/academia-em-alto-barroca/`,
  `${SITE}/academia-em-barro-preto/`,
  `${SITE}/academia-em-barroca/`,
  `${SITE}/academia-em-caicara/`,
  `${SITE}/academia-em-calafate/`,
  `${SITE}/academia-em-california/`,
  `${SITE}/academia-em-carlos-prates/`,
  `${SITE}/academia-em-gutierrez/`,
  `${SITE}/academia-em-nova-suica/`,
  `${SITE}/academia-em-padre-eustaquio/`,
  `${SITE}/academia-em-prado/`,
  `${SITE}/academia-em-santo-agostinho/`,
  // Tier0 — educacional
  `${SITE}/acsm-recomendacoes-2026/`,
  `${SITE}/sarcopenia/`,
  `${SITE}/treinar-com-glp-1/`,
  `${SITE}/wellhub-totalpass-classpass/`,
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

  const urls = singleUrl ? [singleUrl] : ALL_URLS;

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
