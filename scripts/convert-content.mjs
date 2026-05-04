/**
 * Conversor de conteúdo Studio Livel
 * Lê .html e .txt do diretório de conteúdo fonte e gera .mdx em src/content/
 *
 * Regras:
 * - Remove TODOS os travessões (—) do conteúdo
 * - Mantém slugs exatamente como definidos nas fontes
 * - Gera frontmatter YAML completo a partir dos metadados
 * - Incorpora schema JSON-LD do arquivo .json correspondente (para Pilates)
 * - Formato .mdx com HTML body preservado (MDX é compatível com HTML)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');
const SRC_ROOT  = path.resolve(__dirname, '../../studio livel');
const PILAR_DIR = path.join(SRC_ROOT, 'pilar');
const CONT_DIR  = path.join(SRC_ROOT, 'conteúdos/Studio livel treino inteligente');
const OUT_BASE  = path.join(ROOT, 'src/content');

const TODAY = new Date().toISOString().split('T')[0];

// ---------------------------------------------------------------------------
// Utilitários
// ---------------------------------------------------------------------------

function removeDashes(text) {
  return text
    .replace(/—/g, '')   // em dash —
    .replace(/–/g, '')   // en dash –
    .replace(/---/g, '')
    .replace(/--/g, '');
}

function yamlStr(val) {
  if (!val) return '""';
  const s = String(val).replace(/"/g, '\\"');
  return `"${s}"`;
}

function buildFrontmatter(data) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(data)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v)) {
      if (k === 'breadcrumb') {
        lines.push(`${k}:`);
        for (const b of v) {
          lines.push(`  - name: ${yamlStr(b.name)}`);
          lines.push(`    item: ${yamlStr(b.item)}`);
        }
      } else if (k === 'powerKeywords') {
        if (v.length === 0) {
          lines.push(`${k}: []`);
        } else {
          lines.push(`${k}:`);
          for (const kw of v) lines.push(`  - ${yamlStr(kw)}`);
        }
      } else {
        lines.push(`${k}: ${JSON.stringify(v)}`);
      }
    } else if (typeof v === 'object') {
      // Schema como string JSON single-quoted (YAML single-quote impede interpretação de `:`)
      const jsonStr = JSON.stringify(v).replace(/'/g, "''");
      lines.push(`${k}: '${jsonStr}'`);
    } else if (typeof v === 'boolean') {
      lines.push(`${k}: ${v}`);
    } else {
      lines.push(`${k}: ${yamlStr(v)}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

// Detecta metadados — suporta 4 formatos diferentes:
// A) Linha simples: TITLE: / META: / SLUG: / H1:
// B) Pipe-separated: LP /slug/ | Title: X | Slug: Y | Meta: Z
// C) Emoji label: 📌 META DESCRIPTION\nvalor na próxima linha
// D) HTML comment block: Title: / Slug: / Meta desc: nas linhas internas
function parseHTMLMeta(content) {
  const meta = {};

  // ── FORMATO C: 📌 LABEL\nvalor na próxima linha ──────────────────
  const emojiDesc = content.match(/📌\s*META\s*DESCRIPTION\s*[\r\n]+([^\r\n📌]+)/i);
  if (emojiDesc) meta.description = emojiDesc[1].trim();

  const emojiTitle = content.match(/📌\s*T[IÍ]TULO\s*PRINCIPAL[^\r\n]*[\r\n]+([^\r\n📌]+)/i);
  if (emojiTitle) meta.title = emojiTitle[1].trim();

  const emojiH1 = content.match(/📌\s*T[IÍ]TULO\s*PRINCIPAL[^\r\n]*[\r\n]+([^\r\n📌]+)/i);
  if (emojiH1) meta.h1 = emojiH1[1].trim();

  const emojiSlug = content.match(/📌\s*SLUG\s*[\r\n]+([^\r\n📌\s]+)/i);
  if (emojiSlug) meta.slug = emojiSlug[1].trim();

  // ── FORMATO B: pipe-separated na mesma linha ──────────────────────
  // Ex: LP /slug/ | Title: ... | Slug: ... | Meta: ...
  const pipeTitle = content.match(/\|\s*title\s*:\s*([^|]+?)(?:\s*\||\s*$)/im);
  if (!meta.title && pipeTitle) meta.title = pipeTitle[1].trim();

  const pipeMeta = content.match(/\|\s*meta(?:\s+desc)?\s*:\s*([^|]+?)(?:\s*\||\s*$)/im);
  if (!meta.description && pipeMeta) meta.description = pipeMeta[1].trim();

  const pipeSlug = content.match(/\|\s*slug\s*:\s*([^\s|]+)/im);
  if (!meta.slug && pipeSlug) meta.slug = pipeSlug[1].trim();

  // ── FORMATO A e D: linha própria (inclui dentro de comentários) ───
  if (!meta.title) {
    const titleM = content.match(/^[ \t]*title\s*:\s*(.+)$/im);
    if (titleM) meta.title = titleM[1].trim();
  }

  if (!meta.description) {
    const metaM = content.match(/^[ \t]*meta(?:\s+desc(?:ription)?)?\s*:\s*(.+)$/im);
    if (metaM) meta.description = metaM[1].trim();
  }

  if (!meta.slug) {
    const slugLine = content.match(/^[ \t]*slug\s*:\s*([^\s\/]+(?:\/)?[^\s\(]+)/im);
    if (slugLine) meta.slug = slugLine[1].replace(/\(.*\)/, '').trim();
  }

  if (!meta.h1) {
    // H1 do comentário HTML extenso (pilar page)
    const h1Comment = content.match(/H1\s+da\s+p[^:]*:\s*([\s\S]*?)(?:={4,}|-->)/i);
    if (h1Comment) meta.h1 = h1Comment[1].replace(/\s+/g, ' ').trim();
    // Formato C já capturado — fallback: linha H1:
    const h1Line = content.match(/^[ \t]*h1\s*:\s*(.+)$/im);
    if (!meta.h1 && h1Line) meta.h1 = h1Line[1].trim();
  }

  // Slug: limpar barra, espaços, parêntesis
  if (meta.slug) {
    meta.slug = meta.slug.replace(/\(.*\)/, '').replace(/\s+.*/s, '').trim();
  }

  // Power keywords
  const pkLine = content.match(/<!--.*PKs?\s*:\s*([^\n]+)/i);
  if (pkLine) {
    meta.powerKeywords = pkLine[1].replace(/-->.*/, '').split(/[|,]/).map(s => s.split('(')[0].trim()).filter(Boolean);
  }

  return meta;
}

// Extrai o corpo HTML (sem comentários, sem linhas de metadados)
function extractBody(content) {
  let body = content;

  // Formato C: remove bloco de cabeçalho com 📌 labels até "📌 CONTEÚDO COMPLETO"
  const emojiBodyIdx = body.search(/📌\s*CONTE[ÚU]DO\s*COMPLETO/i);
  if (emojiBodyIdx !== -1) {
    // Encontra o início do HTML após o label
    const afterLabel = body.indexOf('\n', emojiBodyIdx);
    body = afterLabel !== -1 ? body.slice(afterLabel + 1) : body;
  }

  // Remove blocos de flags/aviso antes do corpo (ex: ⚠️ FLAGS DE CONFIRMAÇÃO)
  body = body.replace(/^[⚠️✍️═]+[\s\S]*?(?=<[a-z])/i, '');

  // Remove linhas de metadados (Formatos A e D)
  body = body
    .replace(/^[ \t]*TITLE:.*$/gm, '')
    .replace(/^[ \t]*META:.*$/gm, '')
    .replace(/^[ \t]*H1:.*$/gm, '')
    .replace(/^[ \t]*SLUG:.*$/gm, '')
    .replace(/^<!--[^>]*STATUS:[^>]*-->\n?/gm, '')
    .replace(/^<!--[^>]*SILO:[^>]*-->\n?/gm, '')
    .replace(/^<!--[^>]*SLUG:[^>]*-->\n?/gm, '')
    .replace(/^<!--[^>]*PKs?:[^>]*-->\n?/gm, '')
    .replace(/^<!--[^>]*aggregate[^>]*-->\n?/gm, '')
    .replace(/^<!--[^>]*H1[^>]*-->\n?/gmi, '')
    .replace(/^<!--[\s\S]*?-->\n?/gm, '') // todos comentários restantes
    .trim();

  // Remove seção FAQ do corpo (renderizada pelo componente FAQSection via schema)
  body = body.replace(/<h2[^>]*>[^<]*(?:Perguntas|FAQ|perguntas)[^<]*<\/h2>[\s\S]*/i, '');

  return removeDashes(body);
}

// Determina tipo, modalidade, andar a partir do slug/path
function classifyPage(slug, dir) {
  const s = (slug || '').replace(/^\/|\/$/g, '');

  // Modalidade
  let modalidade = 'geral';
  if (s.includes('pilates') || dir.includes('pilates')) modalidade = 'pilates';
  else if (s.includes('musculacao') || dir.includes('musculacao')) modalidade = 'musculacao';
  else if (s.includes('treino-funcional') || s.includes('fitbox') || dir.includes('funcional')) modalidade = 'funcional';
  else if (s.includes('yoga') || dir.includes('yoga')) modalidade = 'yoga';
  else if (s.includes('krav-maga') || dir.includes('krav')) modalidade = 'krav-maga';

  // Andar
  const andarMap = { pilates: 'gold', musculacao: 'roxo', funcional: 'orange', yoga: 'roxo', 'krav-maga': 'roxo', geral: 'none' };
  const andar = andarMap[modalidade] || 'none';

  // Tipo
  let type = 'tier0';
  if (dir.includes('tier2') || s.includes('academia-em-')) type = 'tier2';
  else if (dir.includes('outer') || ['sarcopenia','treinar-com-glp-1','wellhub','acsm'].some(x => s.includes(x))) type = 'outer';
  else if (['prado','padre-eustaquio','caicara','barro-preto','santo-agostinho','barroca','alto-barroca','carlos-prates','california','calafate','gutierrez','nova-suica'].some(b => s.endsWith(b) || s.endsWith(b+'/'))) type = 'bairro';
  else if (['belo-horizonte'].some(b => s.includes(b))) type = 'hub';
  else if (['idosos','gestantes','pos-cirurgico','coluna','iniciantes','emagrecimento','feminina','atletas','ansiedade','flexibilidade','para-criancas','masculino','feminino'].some(x => s.includes(x))) type = 'subpublico';
  else if (['o-que-e','vs-','vs-musculacao','vs-yoga','vs-crossfit','periodizacao','tipos-de'].some(x => s.includes(x))) type = 'educacional';
  else if (modalidade !== 'geral' && !s.includes('-em-') && !s.includes('-para-') && !s.includes('-pos-') && !s.includes('-vs-')) {
    // Pilar: slug simples da modalidade sem subtipo
    const parts = s.split('/').filter(Boolean);
    if (parts.length === 1 && ['pilates','musculacao','treino-funcional','yoga','krav-maga','fitbox'].includes(parts[0])) type = 'pilar';
  }

  // YMYL
  const isYMYL = ['idosos','gestantes','pos-cirurgico','coluna','sarcopenia','glp-1'].some(x => s.includes(x));

  return { type, modalidade, andar, isYMYL };
}

function buildBreadcrumb(slug, h1, modalidade) {
  const s = (slug || '').replace(/^\/|\/$/g, '');
  const base = [
    { name: 'Início', item: 'https://studiotreinointeligente.com.br/' },
  ];

  const modalMap = {
    pilates: { name: 'Pilates', item: 'https://studiotreinointeligente.com.br/pilates/' },
    musculacao: { name: 'Musculação', item: 'https://studiotreinointeligente.com.br/musculacao/' },
    funcional: { name: 'Funcional', item: 'https://studiotreinointeligente.com.br/treino-funcional/' },
    yoga: { name: 'Yoga', item: 'https://studiotreinointeligente.com.br/yoga/' },
    'krav-maga': { name: 'Krav Magá', item: 'https://studiotreinointeligente.com.br/krav-maga/' },
  };

  if (modalidade && modalMap[modalidade] && s !== modalidade && !s.startsWith(modalidade.split('-')[0]+'/') && s !== 'treino-funcional') {
    base.push(modalMap[modalidade]);
  }

  base.push({ name: h1 || s, item: `https://studiotreinointeligente.com.br/${s}/` });
  return base;
}

// ---------------------------------------------------------------------------
// Processadores de arquivos
// ---------------------------------------------------------------------------

function processHTMLPage(htmlPath, jsonPath, outputDir, collectionSlug, overrideSlug) {
  const html  = fs.readFileSync(htmlPath, 'utf8');
  const meta  = parseHTMLMeta(html);
  const body  = extractBody(html);

  // Schema do JSON — parse robusto
  let schema = {};
  if (jsonPath && fs.existsSync(jsonPath)) {
    try {
      const raw = fs.readFileSync(jsonPath, 'utf8');
      // Tenta parse direto primeiro (os _comment* são chaves JSON válidas)
      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch {
        // Fallback: strip linhas _comment linha a linha, depois corrige trailing commas
        const stripped = raw
          .split('\n')
          .filter(line => !line.trim().match(/^"_comment/))
          .join('\n')
          .replace(/,(\s*[\]}])/g, '$1');
        parsed = JSON.parse(stripped);
      }
      // Remove _comment* do objeto de saída
      schema = Object.fromEntries(
        Object.entries(parsed).filter(([k]) => !k.startsWith('_comment'))
      );
    } catch (e) {
      console.warn(`  Aviso: schema JSON inválido em ${jsonPath}: ${e.message}`);
    }
  }

  // Slug — usa explícito se fornecido, senão extrai do HTML
  let slug = overrideSlug || meta.slug || '';
  slug = slug.replace(/^\/|\/$/g, '').trim();

  const { type, modalidade, andar, isYMYL } = classifyPage(slug, collectionSlug);

  const title       = removeDashes(meta.title || '');
  const description = removeDashes(meta.description || '');
  const h1          = removeDashes(meta.h1 || title);
  const canonical   = `https://studiotreinointeligente.com.br/${slug}/`;

  const frontmatter = {
    title,
    description,
    urlPath: `/${slug}/`,
    canonical,
    type,
    modalidade,
    andar,
    isYMYL,
    schema,
    breadcrumb: buildBreadcrumb(slug, h1, modalidade),
    powerKeywords: meta.powerKeywords || [],
    h1,
    datePublished: TODAY,
    dateModified:  TODAY,
  };

  const mdx = `${buildFrontmatter(frontmatter)}\n\n${body}\n`;

  // Determina nome do arquivo
  const fname = slug.split('/').filter(Boolean).pop() || 'index';
  const outPath = path.join(outputDir, `${fname}.mdx`);
  fs.writeFileSync(outPath, mdx, 'utf8');
  return fname;
}

function processTXTPage(txtPath, outputDir, collectionSlug, overrideSlug) {
  const txt  = fs.readFileSync(txtPath, 'utf8');
  const meta = parseHTMLMeta(txt);
  const body = extractBody(txt);

  let slug = overrideSlug || meta.slug || '';
  slug = slug.replace(/^\/|\/$/g, '').trim();

  const { type, modalidade, andar, isYMYL } = classifyPage(slug, collectionSlug);

  const title       = removeDashes(meta.title || '');
  const description = removeDashes(meta.description || '');
  const h1          = removeDashes(meta.h1 || title);
  const canonical   = `https://studiotreinointeligente.com.br/${slug || ''}/`;

  const frontmatter = {
    title,
    description,
    urlPath: slug ? `/${slug}/` : '/',
    canonical,
    type,
    modalidade,
    andar,
    isYMYL,
    schema: buildMinimalSchema(slug, title, description, type, modalidade, isYMYL),
    breadcrumb: buildBreadcrumb(slug, h1, modalidade),
    powerKeywords: meta.powerKeywords || [],
    h1,
    datePublished: TODAY,
    dateModified:  TODAY,
  };

  const mdx = `${buildFrontmatter(frontmatter)}\n\n${body}\n`;

  const fname = slug.split('/').filter(Boolean).pop() || 'index';
  const outPath = path.join(outputDir, `${fname}.mdx`);
  fs.writeFileSync(outPath, mdx, 'utf8');
  return fname;
}

function buildMinimalSchema(slug, title, description, type, modalidade, isYMYL) {
  const url = `https://studiotreinointeligente.com.br/${slug}/`;
  const org = { '@id': 'https://studiotreinointeligente.com.br/#organization' };

  const graph = [
    {
      '@type': ['HealthClub', 'Organization'],
      '@id': 'https://studiotreinointeligente.com.br/#organization',
      'name': 'Studio Livel Treino Inteligente',
      'url': 'https://studiotreinointeligente.com.br/',
      'foundingDate': '1986',
      'address': { '@type': 'PostalAddress', 'streetAddress': 'R. Chopin, 271', 'addressLocality': 'Belo Horizonte', 'addressRegion': 'MG', 'postalCode': '30410-180', 'addressCountry': 'BR' },
      'telephone': '+55-31-98845-1387',
      'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'reviewCount': '201', 'bestRating': '5', 'worstRating': '1' },
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      'url': url,
      'name': title,
      'description': description,
      'inLanguage': 'pt-BR',
      'isPartOf': { '@id': 'https://studiotreinointeligente.com.br/#website' },
      'publisher': org,
      'datePublished': TODAY,
      'dateModified': TODAY,
    },
  ];

  // BreadcrumbList
  const bcs = buildBreadcrumb(slug, title, modalidade);
  graph.push({
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    'itemListElement': bcs.map((b, i) => ({ '@type': 'ListItem', 'position': i + 1, 'name': b.name, 'item': b.item })),
  });

  // Service para páginas de modalidade
  if (['pilar','hub','bairro','subpublico'].includes(type) && modalidade !== 'geral') {
    const serviceTypeMap = { pilates: 'Pilates em Equipamentos', musculacao: 'Musculação com Acompanhamento', funcional: 'Treino Funcional FitBox', yoga: 'Yoga Supervisionado', 'krav-maga': 'Krav Magá Civil' };
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      'name': title,
      'serviceType': serviceTypeMap[modalidade] || title,
      'provider': org,
      'areaServed': { '@type': 'City', 'name': 'Belo Horizonte' },
      'description': description,
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

// ---------------------------------------------------------------------------
// Mapeamento de arquivos para coleções
// ---------------------------------------------------------------------------

const PILATES_PAGES = [
  { folder: '01-pilar-pilates',                         html: 'pilates.html',                        json: 'pilates-schema.json',                      collection: 'pilates', slug: 'pilates' },
  { folder: '02-cidade-hub-pilates-em-belo-horizonte',  html: 'pilates-em-belo-horizonte.html',       json: 'pilates-em-bh-schema.json',                collection: 'pilates', slug: 'pilates-em-belo-horizonte' },
  { folder: '03-lp-bairro-pilates-em-prado',            html: 'pilates-em-prado.html',                json: 'pilates-em-prado-schema.json',             collection: 'pilates', slug: 'pilates-em-prado' },
  { folder: '04-lp-bairro-pilates-em-padre-eustaquio',  html: 'pilates-em-padre-eustaquio.html',      json: 'pilates-em-padre-eustaquio-schema.json',   collection: 'pilates', slug: 'pilates-em-padre-eustaquio' },
  { folder: '05-lp-bairro-pilates-em-caicara',          html: 'pilates-em-caicara.html',              json: 'pilates-em-caicara-schema.json',            collection: 'pilates', slug: 'pilates-em-caicara' },
  { folder: '06-lp-bairro-pilates-em-barro-preto',      html: 'pilates-em-barro-preto.html',          json: 'pilates-em-barro-preto-schema.json',        collection: 'pilates', slug: 'pilates-em-barro-preto' },
  { folder: '07-lp-bairro-pilates-em-santo-agostinho',  html: 'pilates-em-santo-agostinho.html',      json: 'pilates-em-santo-agostinho-schema.json',   collection: 'pilates', slug: 'pilates-em-santo-agostinho' },
  { folder: '08-lp-bairro-pilates-em-barroca',          html: 'pilates-em-barroca.html',              json: 'pilates-em-barroca-schema.json',            collection: 'pilates', slug: 'pilates-em-barroca' },
  { folder: '09-lp-bairro-pilates-em-alto-barroca',     html: 'pilates-em-alto-barroca.html',         json: 'pilates-em-alto-barroca-schema.json',       collection: 'pilates', slug: 'pilates-em-alto-barroca' },
  { folder: '10-lp-bairro-pilates-em-carlos-prates',    html: 'pilates-em-carlos-prates.html',        json: 'pilates-em-carlos-prates-schema.json',      collection: 'pilates', slug: 'pilates-em-carlos-prates' },
  { folder: '11-lp-bairro-pilates-em-california',       html: 'pilates-em-california.html',           json: 'pilates-em-california-schema.json',         collection: 'pilates', slug: 'pilates-em-california' },
  { folder: '12-lp-bairro-pilates-em-calafate',         html: 'pilates-em-calafate.html',             json: 'pilates-em-calafate-schema.json',           collection: 'pilates', slug: 'pilates-em-calafate' },
  { folder: '13-lp-bairro-pilates-em-gutierrez',        html: 'pilates-em-gutierrez.html',            json: 'pilates-em-gutierrez-schema.json',          collection: 'pilates', slug: 'pilates-em-gutierrez' },
  { folder: '14-lp-bairro-pilates-em-nova-suica',       html: 'pilates-em-nova-suica.html',           json: 'pilates-em-nova-suica-schema.json',         collection: 'pilates', slug: 'pilates-em-nova-suica' },
  { folder: '15-sub-pilates-para-idosos',               html: 'pilates-para-idosos.html',             json: 'pilates-para-idosos-schema.json',           collection: 'pilates', slug: 'pilates-para-idosos' },
  { folder: '16-sub-pilates-para-gestantes',            html: 'pilates-para-gestantes.html',          json: 'pilates-para-gestantes-schema.json',        collection: 'pilates', slug: 'pilates-para-gestantes' },
  { folder: '17-sub-pilates-pos-cirurgico',             html: 'pilates-pos-cirurgico.html',           json: 'pilates-pos-cirurgico-schema.json',         collection: 'pilates', slug: 'pilates-pos-cirurgico' },
  { folder: '18-sub-pilates-para-coluna',               html: 'pilates-para-coluna.html',             json: 'pilates-para-coluna-schema.json',           collection: 'pilates', slug: 'pilates-para-coluna' },
  { folder: '19-edu-o-que-e-pilates',                   html: 'o-que-e-pilates.html',                 json: 'o-que-e-pilates-schema.json',               collection: 'pilates', slug: 'o-que-e-pilates' },
  { folder: '20-edu-pilates-vs-musculacao',             html: 'pilates-vs-musculacao.html',           json: 'pilates-vs-musculacao-schema.json',         collection: 'pilates', slug: 'pilates-vs-musculacao' },
  { folder: '21-edu-pilates-vs-yoga',                   html: 'pilates-vs-yoga.html',                 json: 'pilates-vs-yoga-schema.json',               collection: 'pilates', slug: 'pilates-vs-yoga' },
];

// Mapeamento de .txt para coleções
const TXT_PAGES = [
  // Musculação
  { file: 'musculacao.txt',                  collection: 'musculacao', slug: 'musculacao' },
  { file: 'musculacao-em-belo-horizonte.txt',collection: 'musculacao', slug: 'musculacao-em-belo-horizonte' },
  { file: 'musculacao-em-prado.txt',         collection: 'musculacao', slug: 'musculacao-em-prado' },
  { file: 'musculacao-em-barro-preto.txt',   collection: 'musculacao', slug: 'musculacao-em-barro-preto' },
  { file: 'musculacao-em-barroca.txt',       collection: 'musculacao', slug: 'musculacao-em-barroca' },
  { file: 'musculacao-em-alto-barroca.txt',  collection: 'musculacao', slug: 'musculacao-em-alto-barroca' },
  { file: 'musculacao-em-carlos-prates.txt', collection: 'musculacao', slug: 'musculacao-em-carlos-prates' },
  { file: 'musculacao-em-california.txt',    collection: 'musculacao', slug: 'musculacao-em-california' },
  { file: 'musculacao-em-calafate.txt',      collection: 'musculacao', slug: 'musculacao-em-calafate' },
  { file: 'musculacao-em-gutierrez.txt',     collection: 'musculacao', slug: 'musculacao-em-gutierrez' },
  { file: 'musculacao-em-nova-suica.txt',    collection: 'musculacao', slug: 'musculacao-em-nova-suica' },
  { file: 'musculacao-em-padre-eustaquio.txt',collection:'musculacao', slug: 'musculacao-em-padre-eustaquio' },
  { file: 'musculacao-em-santo-agostinho.txt',collection:'musculacao', slug: 'musculacao-em-santo-agostinho' },
  { file: 'musculacao-em-caicara.txt',       collection: 'musculacao', slug: 'musculacao-em-caicara' },
  { file: 'musculacao-para-idosos.txt',      collection: 'musculacao', slug: 'musculacao-para-idosos' },
  { file: 'musculacao-para-iniciantes.txt',  collection: 'musculacao', slug: 'musculacao-para-iniciantes' },
  { file: 'musculacao-para-emagrecimento.txt',collection:'musculacao', slug: 'musculacao-para-emagrecimento' },
  { file: 'musculacao-feminina.txt',         collection: 'musculacao', slug: 'musculacao-feminina' },
  { file: 'musculacao-para-atletas.txt',     collection: 'musculacao', slug: 'musculacao-para-atletas' },
  { file: 'o-que-e-musculacao.txt',          collection: 'musculacao', slug: 'o-que-e-musculacao' },
  { file: 'periodizacao-em-musculacao.txt',  collection: 'musculacao', slug: 'periodizacao-em-musculacao' },
  { file: 'musculacao-vs-crossfit.txt',      collection: 'musculacao', slug: 'musculacao-vs-crossfit' },
  // Funcional
  { file: 'treino-funcional.txt',                   collection: 'funcional', slug: 'treino-funcional' },
  { file: 'treino-funcional-em-belo-horizonte.txt',  collection: 'funcional', slug: 'treino-funcional-em-belo-horizonte' },
  { file: 'treino-funcional-em-prado.txt',           collection: 'funcional', slug: 'treino-funcional-em-prado' },
  { file: 'treino-funcional-em-barro-preto.txt',     collection: 'funcional', slug: 'treino-funcional-em-barro-preto' },
  { file: 'treino-funcional-em-barroca.txt',         collection: 'funcional', slug: 'treino-funcional-em-barroca' },
  { file: 'treino-funcional-em-alto-barroca.txt',    collection: 'funcional', slug: 'treino-funcional-em-alto-barroca' },
  { file: 'treino-funcional-em-carlos-prates.txt',   collection: 'funcional', slug: 'treino-funcional-em-carlos-prates' },
  { file: 'treino-funcional-em-california.txt',      collection: 'funcional', slug: 'treino-funcional-em-california' },
  { file: 'treino-funcional-em-calafate.txt',        collection: 'funcional', slug: 'treino-funcional-em-calafate' },
  { file: 'treino-funcional-em-gutierrez.txt',       collection: 'funcional', slug: 'treino-funcional-em-gutierrez' },
  { file: 'treino-funcional-em-nova-suica.txt',      collection: 'funcional', slug: 'treino-funcional-em-nova-suica' },
  { file: 'treino-funcional-em-padre-eustaquio.txt', collection: 'funcional', slug: 'treino-funcional-em-padre-eustaquio' },
  { file: 'treino-funcional-em-santo-agostinho.txt', collection: 'funcional', slug: 'treino-funcional-em-santo-agostinho' },
  { file: 'treino-funcional-em-caicara.txt',         collection: 'funcional', slug: 'treino-funcional-em-caicara' },
  { file: 'treino-funcional-emagrecimento.txt',      collection: 'funcional', slug: 'treino-funcional-emagrecimento' },
  { file: 'treino-funcional-vs-crossfit.txt',        collection: 'funcional', slug: 'treino-funcional-vs-crossfit' },
  { file: 'o-que-e-treino-funcional.txt',            collection: 'funcional', slug: 'o-que-e-treino-funcional' },
  { file: 'fitbox.txt',                              collection: 'funcional', slug: 'fitbox' },
  // Yoga
  { file: 'yoga.txt',                       collection: 'yoga', slug: 'yoga' },
  { file: 'yoga-em-belo-horizonte.txt',     collection: 'yoga', slug: 'yoga-em-belo-horizonte' },
  { file: 'yoga-em-prado.txt',              collection: 'yoga', slug: 'yoga-em-prado' },
  { file: 'yoga-em-barro-preto.txt',        collection: 'yoga', slug: 'yoga-em-barro-preto' },
  { file: 'yoga-em-barroca.txt',            collection: 'yoga', slug: 'yoga-em-barroca' },
  { file: 'yoga-em-alto-barroca.txt',       collection: 'yoga', slug: 'yoga-em-alto-barroca' },
  { file: 'yoga-em-carlos-prates.txt',      collection: 'yoga', slug: 'yoga-em-carlos-prates' },
  { file: 'yoga-em-california.txt',         collection: 'yoga', slug: 'yoga-em-california' },
  { file: 'yoga-em-calafate.txt',           collection: 'yoga', slug: 'yoga-em-calafate' },
  { file: 'yoga-em-gutierrez.txt',          collection: 'yoga', slug: 'yoga-em-gutierrez' },
  { file: 'yoga-em-nova-suica.txt',         collection: 'yoga', slug: 'yoga-em-nova-suica' },
  { file: 'yoga-em-padre-eustaquio.txt',    collection: 'yoga', slug: 'yoga-em-padre-eustaquio' },
  { file: 'yoga-em-santo-agostinho.txt',    collection: 'yoga', slug: 'yoga-em-santo-agostinho' },
  { file: 'yoga-em-caicara.txt',            collection: 'yoga', slug: 'yoga-em-caicara' },
  { file: 'yoga-para-ansiedade.txt',        collection: 'yoga', slug: 'yoga-para-ansiedade' },
  { file: 'yoga-para-flexibilidade.txt',    collection: 'yoga', slug: 'yoga-para-flexibilidade' },
  { file: 'yoga-para-idosos.txt',           collection: 'yoga', slug: 'yoga-para-idosos' },
  { file: 'yoga-para-iniciantes.txt',       collection: 'yoga', slug: 'yoga-para-iniciantes' },
  { file: 'o-que-e-yoga.txt',              collection: 'yoga', slug: 'o-que-e-yoga' },
  { file: 'tipos-de-yoga.txt',             collection: 'yoga', slug: 'tipos-de-yoga' },
  { file: 'yoga-vs-meditacao.txt',         collection: 'yoga', slug: 'yoga-vs-meditacao' },
  // Krav Magá
  { file: 'krav-maga.txt',                    collection: 'krav-maga', slug: 'krav-maga' },
  { file: 'krav-maga-em-belo-horizonte.txt',  collection: 'krav-maga', slug: 'krav-maga-em-belo-horizonte' },
  { file: 'krav-maga-em-prado.txt',           collection: 'krav-maga', slug: 'krav-maga-em-prado' },
  { file: 'krav-maga-em-barro-preto.txt',     collection: 'krav-maga', slug: 'krav-maga-em-barro-preto' },
  { file: 'krav-maga-em-barroca.txt',         collection: 'krav-maga', slug: 'krav-maga-em-barroca' },
  { file: 'krav-maga-em-alto-barroca.txt',    collection: 'krav-maga', slug: 'krav-maga-em-alto-barroca' },
  { file: 'krav-maga-em-carlos-prates.txt',   collection: 'krav-maga', slug: 'krav-maga-em-carlos-prates' },
  { file: 'krav-maga-em-california.txt',      collection: 'krav-maga', slug: 'krav-maga-em-california' },
  { file: 'krav-maga-em-calafate.txt',        collection: 'krav-maga', slug: 'krav-maga-em-calafate' },
  { file: 'krav-maga-em-gutierrez.txt',       collection: 'krav-maga', slug: 'krav-maga-em-gutierrez' },
  { file: 'krav-maga-em-nova-suica.txt',      collection: 'krav-maga', slug: 'krav-maga-em-nova-suica' },
  { file: 'krav-maga-em-padre-eustaquio.txt', collection: 'krav-maga', slug: 'krav-maga-em-padre-eustaquio' },
  { file: 'krav-maga-em-santo-agostinho.txt', collection: 'krav-maga', slug: 'krav-maga-em-santo-agostinho' },
  { file: 'krav-maga-em-caicara.txt',         collection: 'krav-maga', slug: 'krav-maga-em-caicara' },
  { file: 'krav-maga-feminino.txt',           collection: 'krav-maga', slug: 'krav-maga-feminino' },
  { file: 'krav-maga-para-iniciantes.txt',    collection: 'krav-maga', slug: 'krav-maga-para-iniciantes' },
  { file: 'o-que-e-krav-maga.txt',           collection: 'krav-maga', slug: 'o-que-e-krav-maga' },
  // Tier 0
  { file: 'home.txt',          collection: 'tier0', slug: '' },
  { file: 'quem-somos.txt',    collection: 'tier0', slug: 'quem-somos' },
  { file: 'planos.txt',        collection: 'tier0', slug: 'planos' },
  { file: 'aula-avaliacao.txt',collection: 'tier0', slug: 'aula-avaliacao' },
  { file: 'metodo-livel.txt',  collection: 'tier0', slug: 'metodo-livel' },
  // Tier 2
  { file: 'academia-em-prado.txt',           collection: 'tier2', slug: 'academia-em-prado' },
  { file: 'academia-em-barro-preto.txt',     collection: 'tier2', slug: 'academia-em-barro-preto' },
  { file: 'academia-em-barroca.txt',         collection: 'tier2', slug: 'academia-em-barroca' },
  { file: 'academia-em-alto-barroca.txt',    collection: 'tier2', slug: 'academia-em-alto-barroca' },
  { file: 'academia-em-carlos-prates.txt',   collection: 'tier2', slug: 'academia-em-carlos-prates' },
  { file: 'academia-em-california.txt',      collection: 'tier2', slug: 'academia-em-california' },
  { file: 'academia-em-calafate.txt',        collection: 'tier2', slug: 'academia-em-calafate' },
  { file: 'academia-em-gutierrez.txt',       collection: 'tier2', slug: 'academia-em-gutierrez' },
  { file: 'academia-em-nova-suica.txt',      collection: 'tier2', slug: 'academia-em-nova-suica' },
  { file: 'academia-em-padre-eustaquio.txt', collection: 'tier2', slug: 'academia-em-padre-eustaquio' },
  { file: 'academia-em-caicara.txt',         collection: 'tier2', slug: 'academia-em-caicara' },
  { file: 'academia-em-santo-agostinho.txt', collection: 'tier2', slug: 'academia-em-santo-agostinho' },
  // Outer
  { file: 'wellhub-totalpass-classpass.txt', collection: 'outer', slug: 'wellhub-totalpass-classpass' },
  { file: 'treinar-com-glp-1.txt',           collection: 'outer', slug: 'treinar-com-glp-1' },
  { file: 'sarcopenia.txt',                  collection: 'outer', slug: 'sarcopenia' },
  { file: 'acsm-recomendacoes-2026.txt',     collection: 'outer', slug: 'acsm-recomendacoes-2026' },
];

// ---------------------------------------------------------------------------
// Execução principal
// ---------------------------------------------------------------------------

let converted = 0;
let skipped   = 0;
const errors  = [];

console.log('🔄 Convertendo páginas Pilates (HTML + Schema JSON) ...');
for (const page of PILATES_PAGES) {
  const htmlPath = path.join(PILAR_DIR, page.folder, page.html);
  const jsonPath = path.join(PILAR_DIR, page.folder, page.json);
  const outDir   = path.join(OUT_BASE, 'pilates');

  if (!fs.existsSync(htmlPath)) {
    console.warn(`  ⚠️  Não encontrado: ${htmlPath}`);
    skipped++;
    continue;
  }
  try {
    const fname = processHTMLPage(htmlPath, jsonPath, outDir, 'pilates', page.slug);
    console.log(`  ✓ pilates/${fname}.mdx`);
    converted++;
  } catch (e) {
    console.error(`  ✗ Erro em ${page.html}: ${e.message}`);
    errors.push({ file: page.html, error: e.message });
  }
}

console.log('\n🔄 Convertendo páginas .txt ...');
for (const page of TXT_PAGES) {
  const txtPath = path.join(CONT_DIR, page.file);
  const outDir  = path.join(OUT_BASE, page.collection);

  if (!fs.existsSync(txtPath)) {
    console.warn(`  ⚠️  Não encontrado: ${page.file}`);
    skipped++;
    continue;
  }
  try {
    const fname = processTXTPage(txtPath, outDir, page.collection, page.slug);
    const fname2 = page.slug.split('/').filter(Boolean).pop() || 'index';
    console.log(`  ✓ ${page.collection}/${fname2}.mdx`);
    converted++;
  } catch (e) {
    console.error(`  ✗ Erro em ${page.file}: ${e.message}`);
    errors.push({ file: page.file, error: e.message });
  }
}

console.log(`\n✅ Concluído: ${converted} convertidas | ${skipped} puladas | ${errors.length} erros`);
if (errors.length) {
  console.log('\nErros:');
  for (const e of errors) console.log(`  - ${e.file}: ${e.error}`);
}
