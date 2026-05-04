import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import compress from '@playform/compress';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://studiotreinointeligente.com.br',
  output: 'static',
  integrations: [
    mdx(),
    partytown({
      // Scripts com type="text/partytown" rodam em Web Worker (GTM, GA, etc.)
      config: {
        forward: ['dataLayer.push', 'gtag'],
      },
    }),
    icon({
      // Iconify collections usadas no projeto
      include: {
        'material-symbols': ['*'],
        'ph': ['*'],
      },
    }),
    // Compress deve ser o ÚLTIMO — roda sobre o output final
    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
          removeComments: true,
          collapseWhitespace: true,
        },
      },
      Image: false, // sharp já cuida das imagens
      JavaScript: true,
      SVG: true,
    }),
  ],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  vite: {
    build: {
      cssMinify: true,
      assetsInlineLimit: 2048,
    },
  },
});
