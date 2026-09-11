# Inventario pre-migración a Astro

> Generado automáticamente por Claude Code en sesión desatendida (Fase 0).
> Rama: `astro-migration`. `main` no se ha tocado.

## Confirmación del stack actual

- **Next.js 14.2.35**, App Router, `output: "export"` (export estático puro, sin servidor).
- React 18.3.1 / React DOM 18.3.1.
- TypeScript 5.5.3, Tailwind CSS 3.4.4 (config en `tailwind.config.ts`), PostCSS + Autoprefixer.
- ESLint con `eslint-config-next`.
- Scripts (`package.json`): `dev` (next dev), `build` (next build), `start` (next start), `lint` (next lint).
- No hay CMS, base de datos, ni backend. Todo el contenido vive en `src/dictionaries/*.json` y `src/lib/site-config.ts`.
- El stack coincide con lo descrito en `claude.md` (documento de instrucciones del proyecto ya existente en el repo). No hay sorpresas: se puede seguir a Fase 1.

## Rutas / páginas actuales

Estructura de rutas con segmento dinámico `[lang]` (`ca`, `es`, `en`, generadas vía `generateStaticParams`):

| Ruta | Fichero | Notas |
|---|---|---|
| `/` | `src/app/page.tsx` | Sin `[lang]`. Redirige a `./ca/` vía `<meta httpEquiv="refresh">` + enlace manual de respaldo. |
| `/[lang]/` | `src/app/[lang]/page.tsx` | Home, compone las secciones de `src/components/home/*`. |
| `/[lang]/tarifes/` | `src/app/[lang]/tarifes/page.tsx` | Tabla de precios (mensualidad, drop-in, privada) desde `site-config.ts`. |
| `/[lang]/camps/` | `src/app/[lang]/camps/page.tsx` | Listado/índice de camps. |
| `/[lang]/camps/2026/` | `src/app/[lang]/camps/2026/page.tsx` | Detalle del Ganbaru Camp 2026 (página añadida recientemente, ver commits `ddfc631`/`5a28bb2`). |
| `/[lang]/guies/` | `src/app/[lang]/guies/page.tsx` | Enlaza los PDFs de `public/docs/` vía `docs` en `site-config.ts` + `docLanguageLabels`. |
| `/[lang]/botiga/` | `src/app/[lang]/botiga/page.tsx` | Placeholder "properament" (usa `ComingSoon.tsx`). |
| `/[lang]/apuntat/` | `src/app/[lang]/apuntat/page.tsx` | CTA de inscripción, enlace WhatsApp (`whatsappHref` de `site-config.ts`). |

Todas las páginas bajo `[lang]` existen en los tres idiomas (ca/es/en) porque se generan por `generateStaticParams`, no por ficheros duplicados — un único `.tsx` por ruta cubre los 3 idiomas leyendo el diccionario correspondiente.

Confirmado también contra `out/`: hay páginas generadas para `ca`, `es`, `en` × (`apuntat`, `botiga`, `camps`, `camps/2026`, `guies`, `tarifes`, index) + `404.html` + `index.html` raíz — 22 páginas HTML en total, coincide con lo anterior.

## Componentes

- `src/components/Header.tsx` (158 líneas) — nav + selector de idioma + CTA "Apunta't". El más grande, con lógica de idioma.
- `src/components/Footer.tsx` (31 líneas) — sello Team Ganbaru, contacto.
- `src/components/ComingSoon.tsx` (24 líneas) — usado en Botiga (y quizá Camps antes del contenido real).
- `src/components/HtmlLangSync.tsx` (11 líneas, client component) — sincroniza `document.documentElement.lang` en cliente porque el `<html lang="ca">` fijo está en el root layout compartido.
- `src/components/home/`:
  - `Hero.tsx` (68 líneas) — logo, foto de grupo, claim, doble CTA.
  - `Escola.tsx` (33 líneas) — qué es la escuela, afiliación Team Ganbaru.
  - `Instructor.tsx` (48 líneas) — Pablo, foto de medallas, linaje (Ases Jiu-Jitsu / Ezekiel Zayas / Team Ganbaru).
  - `Horaris.tsx` (42 líneas) — horario semanal, badge BJJ infantil.
  - `Galeria.tsx` (35 líneas) — fotos de clase.
  - `Ubicacio.tsx` (60 líneas) — mapa OpenStreetMap embebido, contacto.

Total código de componentes/páginas de aplicación: ~536 líneas en componentes (sin contar páginas de ruta), tamaño pequeño-medio, migración manual sin herramientas automáticas es viable.

## Layouts

- `src/app/layout.tsx` — root layout: `<html lang="ca">` fijo, importa `globals.css`, aplica `bg-offwhite text-ink antialiased`.
- `src/app/[lang]/layout.tsx` — layout por idioma: `generateStaticParams`, `generateMetadata` (title/description/OG desde diccionario), monta `HtmlLangSync` + `Header` + `Footer` alrededor de `children`.

## Diccionarios (i18n)

- `src/dictionaries/{ca,es,en}.json` — mismas claves de primer nivel en los 3: `site`, `nav`, `trialBadge`, `home`, `tarifes`, `camps`, `guies`, `botiga`, `apuntat`, `footer`.
- Acceso vía `src/lib/dictionaries.ts`: `locales = ["ca","es","en"]`, `defaultLocale = "ca"`, `getDictionary(locale)` hace `import()` dinámico del JSON correspondiente y devuelve un objeto tipado (`Dictionary = typeof caDict`, ca es la fuente de verdad del tipo).
- Todo el texto visible sale de los diccionarios (regla explícita del proyecto en `claude.md`); nada hardcodeado en componentes.

## Assets

### `public/images/`
- `logo.png`, `logo-64.png` — logo principal y variante pequeña (nota: `claude.md`/instrucciones de la fase de migración mencionan `logo-360.png`, pero el fichero real usado por la web en `public/` es `logo-64.png`; `logo-360.png` solo existe en `BJJ/` como material fuente sin procesar — **revisar con Suso si hace falta generar un `logo-360.png` de verdad o si la instrucción original se refería a otra cosa**).
- `pablo-instructor.png` — foto del instructor sin overlays de medallas (parece una versión antigua/alternativa).
- `pablo-medalles-480.webp`, `pablo-medalles-800.webp`, `pablo-medalles-800.jpg` — foto de Pablo con medallas, responsive (webp + fallback jpg), usada en la sección Instructor (ver commits `dbff95d`/`9fc2ec0`).
- `camp-2026-480.webp`, `camp-2026-800.webp`, `camp-2026-1200.webp`, `camp-2026-1200.jpg` — cartel del Ganbaru Camp 2026, responsive.

### `public/docs/` (PDFs de guías, ca/es/en)
- `manual-tecnic-bjj-ca.pdf` / `manual-tecnico-bjj.pdf` / `bjj-technical-manual-en.pdf` — manual técnico.
- `guia-competicio-bjj-ca.pdf` / `guia-competicion-bjj.pdf` / `bjj-competition-guide-en.pdf` — guía de competición.
- Referenciados por rutas absolutas (`/docs/...`) en `docs` de `site-config.ts`, combinadas con `assetPath()` para el `basePath` en producción.

### `public/.nojekyll`
- Necesario para GitHub Pages (evita que Jekyll procese `_next/`). **Imprescindible conservarlo/recrearlo también en el output de Astro.**

### `BJJ/` (material fuente, NO servido por la web)
- Carpeta de trabajo con originales sin procesar: `Logo MBJJ.png`, `Logo Montanya Jiu-Jitsu.png` (con fondo desenfocado, mencionado en `claude.md` como pendiente de recorte), `Pablo.png`, `Pablo con niños en clase.png` (con overlays incrustados, pendiente de confirmar consentimiento de familias — ver `claude.md`), `Foto Pablo con medallas.png`, `Foto grupal Clase.png` (overlay navideño), `Camp estiu 2026.png`, `Horaris Classes BJJ.png` (fuente de datos del horario, no se publica como imagen), `logo.png`, `logo-360.png`, y PDFs duplicados de las guías en `BJJ/branding Muntanyabjj/`.
- **No migrar ni tocar esta carpeta** — es material de trabajo/referencia, no assets de producción. Mantenerla igual en `astro-migration`.

## Config de export / Pages

- `next.config.mjs`: `output: "export"`, `trailingSlash: true`, `images: { unoptimized: true }`, y solo en CI (`isGithubActions`) aplica `basePath` + `assetPrefix`.
- `basepath.mjs`: `repoName = "muntanyabjj"`, `isGithubActions = process.env.GITHUB_ACTIONS === "true"`, `basePath = isGithubActions ? "/muntanyabjj" : ""`, `siteOrigin` (`https://bybert832408.github.io` en CI, `http://localhost:3000` en local) — usado para URLs absolutas de metadata (OG), nunca en contenido visible.
- `src/lib/asset-path.ts`: helper `assetPath(path)` que antepone `basePath` — usado para imágenes/PDFs referenciados con ruta absoluta (`/images/...`, `/docs/...`) porque `next/image` con `unoptimized: true` y rutas de `public/` no aplican el basePath automáticamente en todos los casos.
- `.github/workflows/nextjs.yml`: workflow oficial de Next.js para Pages. Trigger: push a `main` (+ `workflow_dispatch`). Build con `actions/configure-pages@v5` (`static_site_generator: next`), `next build`, sube `./out` con `upload-pages-artifact@v3`, despliega con `deploy-pages@v4`. **Este workflow es el que sirve la producción — NO TOCAR.**
- Repo remoto: `github.com/bybert832408/muntanyabjj` (origin).

## Otros ficheros relevantes

- `src/app/globals.css` — no revisado línea a línea en esta fase, pero es el único CSS global (aparte de Tailwind).
- `src/app/favicon.ico` — favicon de la app Next (además hay `out/favicon.ico` generado).
- `tsconfig.json` — alias `@/*` → `src/*` (usado en todos los imports `@/lib/...`, `@/components/...`, `@/dictionaries/...`).
- `.eslintrc.json` — config de lint basada en `eslint-config-next`.
- `out/` — build estático ya generado (probablemente de una build local anterior), no versionar cambios manuales ahí, es artefacto reproducible por `next build`.

## Cosas a vigilar en la migración (posible pérdida de fidelidad)

1. **`assetPath()` / `basePath` condicional**: Astro tiene su propio mecanismo (`base` en `astro.config.mjs` + `import.meta.env.BASE_URL` o el helper de rutas de Astro). Hay que decidir un equivalente y no perder el comportamiento "sin basePath en local, con basePath en Pages".
2. **`generateMetadata` con OG dinámico por idioma** — portar a `getStaticPaths` + frontmatter/`Astro.props` con las mismas claves de diccionario.
3. **`HtmlLangSync` (client component)** — en Astro esto es trivial (el `lang` se puede fijar directamente en el `<html>` de cada página/layout sin necesitar JS de cliente), pero hay que asegurarse de no perder el `lang` correcto por ruta.
4. **Redirección `/` → `/ca/`** — replicar con página estática mínima equivalente en Astro (meta refresh o `Astro.redirect` si se sirve algo más que estático puro; con export estático puro, meta refresh es lo más parecido).
5. **`.nojekyll`** — debe seguir presente en el output final de Astro para Pages.
6. **PDFs y imágenes responsive (`srcset` manual con .webp/.jpg)** — verificar cómo están consumidos en `Galeria.tsx`, `Instructor.tsx`, `camps/2026/page.tsx` antes de portar, para no perder los breakpoints ya optimizados.
7. **Tipado del diccionario derivado de `ca.json`** (`Dictionary = typeof caDict`) — en Astro/TS puro se puede mantener el mismo patrón sin problema, pero hay que revisar el `tsconfig.json` (alias `@/*`) al configurar Astro.
8. **Discrepancia `logo-360.png`** (ver arriba en Assets) — pendiente de aclarar con Suso, no se ha inventado ni generado nada nuevo.

## Conclusión de la Fase 0

Todo cuadra con lo descrito en las instrucciones: es Next.js App Router con export estático, estructura `[lang]`, diccionarios JSON, `basePath` condicional para Pages. **No hay sorpresas que obliguen a parar** → se continúa a la Fase 1 en la misma rama `astro-migration`.
