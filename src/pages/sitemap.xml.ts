import { getCollection } from 'astro:content';

const SITE = 'https://studiotreinointeligente.com.br';

const STATIC_PAGES = [
  { url: '/',                 priority: '1.0', changefreq: 'weekly'  },
  { url: '/modalidades/',     priority: '0.9', changefreq: 'monthly' },
  { url: '/quem-somos/',      priority: '0.8', changefreq: 'monthly' },
  { url: '/metodo-livel/',    priority: '0.8', changefreq: 'monthly' },
  { url: '/planos/',          priority: '0.8', changefreq: 'monthly' },
  { url: '/aula-avaliacao/',  priority: '0.9', changefreq: 'monthly' },
  { url: '/contato/',         priority: '0.7', changefreq: 'monthly' },
  { url: '/blog/',            priority: '0.7', changefreq: 'weekly'  },
  { url: '/pilates/',         priority: '0.9', changefreq: 'monthly' },
  { url: '/musculacao/',      priority: '0.9', changefreq: 'monthly' },
  { url: '/treino-funcional/',priority: '0.9', changefreq: 'monthly' },
  { url: '/yoga/',            priority: '0.9', changefreq: 'monthly' },
  { url: '/krav-maga/',       priority: '0.9', changefreq: 'monthly' },
];

const PRIORITY_MAP: Record<string, string> = {
  pilar:       '0.9',
  hub:         '0.8',
  bairro:      '0.7',
  subpublico:  '0.7',
  educacional: '0.6',
  tier0:       '0.8',
  tier2:       '0.6',
  outer:       '0.5',
};

export async function GET() {
  const cols = ['pilates','musculacao','funcional','yoga','krav-maga','tier0','tier2','outer'] as const;

  const entries = (await Promise.all(cols.map(c => getCollection(c)))).flat();

  const dynamicUrls = entries
    .filter(e => e.data.canonical)
    .map(e => ({
      url: e.data.canonical.replace(SITE, ''),
      priority: PRIORITY_MAP[e.data.type] ?? '0.6',
      changefreq: e.data.type === 'pilar' ? 'monthly' : 'yearly',
      lastmod: e.data.dateModified || e.data.datePublished || '',
    }));

  const seenUrls = new Set<string>();
  const staticSet = new Set(STATIC_PAGES.map(p => p.url));

  const allUrls = [
    ...STATIC_PAGES.map(p => ({ ...p, lastmod: '', canonical: `${SITE}${p.url}` })),
    ...dynamicUrls
      .filter(u => !staticSet.has(u.url))
      .map(u => ({ ...u, canonical: `${SITE}${u.url}` })),
  ].filter(u => {
    if (seenUrls.has(u.canonical)) return false;
    seenUrls.add(u.canonical);
    return true;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${u.canonical}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
