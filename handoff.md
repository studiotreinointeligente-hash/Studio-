# Handoff — Studio Livel Astro
**Data:** 2026-05-12  
**Repo:** github.com/studiotreinointeligente-hash/Studio-Livel-Astro  
**Branch:** main

---

## Objetivo

Refinar o site Astro do Studio Livel após a migração tipográfica para **Univers LT** (self-hosted) + **Open Sans** (Google Fonts), corrigir inconsistências visuais, remover elementos desnecessários e preencher placeholders de conteúdo no `quem-somos.mdx`.

---

## Estado atual do código

### Concluído nesta sessão

| Arquivo | O que foi feito |
|---|---|
| `src/styles/tokens.css` | `--font-display` e `--font-poster` simplificados para apenas `'Univers LT'` (Bebas Neue removida do stack) |
| `src/styles/global.css` | Troca completa da pilha tipográfica: Instrument Serif → Univers LT (6 pesos via @font-face local), DM Sans → Open Sans (Google Fonts) |
| `src/layouts/BaseLayout.astro` | Preload das fontes críticas Univers LT 75 Black e 55 Roman |
| `src/components/Hero.astro` | `.em-roxo/gold/orange`: adicionado `font-weight:700; font-size:inherit; font-style:normal` — corrige ilusão óptica de tamanho e herança de italic do `<em>` |
| `src/components/FAQSection.astro` | `.faq-title em`: idem — `font-weight:700; font-size:inherit; font-style:normal` |
| `src/pages/index.astro` | `.home-hero__h1 em` e `.sec-h2 em`: idem. **Timeline 1986→2016→2026 removida** (HTML + CSS do `.home-sobre__arco`) |
| `src/pages/modalidades.astro` | `.mod-hero__h1 em`: idem — `font-style:normal` |
| `src/pages/blog/[...page].astro` | Todos os acentos corrigidos: Educação, Musculação, Página, Próxima, publicações, conteúdo, Método, paginação |
| `src/data/siloData.ts` | Ponto final adicionado ao final de `whatIsTitle`, `howTitle`, `forWhomTitle` em todas as 5 modalidades |
| `vercel.json` | CSP: `frame-src 'none'` → `frame-src 'self'` (desbloqueia iframe Google Maps em /contato/) |

### Pendente (não feito ainda)

**`src/content/tier0/quem-somos.mdx`** — ainda tem 8 placeholders `[A CONFIRMAR COM CLIENTE …]`:

- Linha 28: nome do(a) fundador(a)
- Linha 32: história de origem (1986)
- Linha 33: qual modalidade existia em 1986
- Linha 49: nome e formação — instrutor de Pilates
- Linha 50: nome e formação — instrutor de Musculação
- Linha 51: nome e formação — instrutor de Funcional
- Linha 52: nome e formação — instrutor de Yoga
- Linha 53: nome e formação — instrutor de Krav Maga

---

## O que foi tentado e falhou

### Busca de dados do cliente no zip
- **Zip:** `C:\Users\User\Downloads\Livel Design System.zip` → extraído em `…\Livel-Design-System-extracted\`
- Vasculhei TODOS os arquivos do zip: `README.md`, `BRIEFING_DESIGN_SYSTEM_LIVEL_v2.md`, todas as imagens de `uploads/`, `ui_kits/livel-website/*.jsx`, `ui_kits/livel-app/*.jsx`, `preview/*.html`, `screenshots/*.png`
- **Resultado:** o zip contém apenas o design system (cores, tipografia, componentes). **Não contém** nome do fundador, história de 1986, nem nomes dos instrutores de Yoga e Krav Maga
- **Único dado pessoal encontrado:** mockup do app (`Screens.jsx`) usa `Prof. Renato` (Studio), `Prof. Joana` (Pilates) e `Prof. Pedro` (FitBox) — podem ser nomes reais ou placeholders de design. **Não foram usados no site** pois não foram confirmados pelo usuário

### Git push — erro de autenticação
- Conta ativa era `pedrosocrates23-code`, repo pertence a `studiotreinointeligente-hash`
- **Fix:** `gh auth switch --user studiotreinointeligente-hash` antes do push

---

## Próximo passo imediato

1. **Obter do cliente** os dados reais para `quem-somos.mdx`:
   - Nome do(a) fundador(a) e história de 1986
   - Nomes completos + formações dos 5 instrutores
   - Confirmar se Renato/Joana/Pedro são os instrutores reais

2. **Preencher** `src/content/tier0/quem-somos.mdx` com os dados confirmados

3. **Push das mudanças desta sessão** via `@devops`:
   ```
   gh auth switch --user studiotreinointeligente-hash
   git add src/ vercel.json
   git commit -m "feat: tipografia Univers LT, correções de acentos, remove timeline home"
   git push origin main
   ```
   Vercel faz deploy automático após o push.

---

## Informações de contexto do projeto

| Item | Valor |
|---|---|
| Framework | Astro 5 (SSG) |
| Deploy | Vercel (auto-deploy no push para main) |
| Conta GitHub para push | `studiotreinointeligente-hash` |
| Domínio | studiotreinointeligente.com.br |
| Páginas totais | ~128 páginas estáticas |
| Font display | Univers LT (self-hosted em `/public/fonts/Univers_LT_*.ttf`) |
| Font body | Open Sans (Google Fonts) |
| Design system fonte | `C:\Users\User\Downloads\Livel-Design-System-extracted\` |
